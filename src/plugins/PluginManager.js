class PluginManager {
  constructor() {
    this.plugins = new Map();
    this.enabledPlugins = new Set();
    this.hooks = {
      onObjectAdd: [],
      onObjectDelete: [],
      onObjectUpdate: [],
      onSceneLoad: [],
      onSceneSave: [],
      onViewportRender: [],
      onToolbarRender: [],
      onPanelRender: [],
      onContextMenu: [],
      onKeyPress: [],
      onMouseDown: [],
      onMouseMove: [],
      onMouseUp: [],
      onAssetImport: [],
      onAssetDelete: [],
    };
    this.api = null;
    this.settings = this.loadSettings();
    this.l10n = new Map();
    this.currentLocale = 'zh';
    this.localeListeners = new Set();
  }

  loadSettings() {
    try {
      const saved = localStorage.getItem('astra3d-plugin-settings');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  }

  saveSettings() {
    localStorage.setItem('astra3d-plugin-settings', JSON.stringify(this.settings));
  }

  setApi(api) {
    this.api = api;
  }

  setLocale(locale) {
    if (locale !== this.currentLocale) {
      this.currentLocale = locale;
      this.localeListeners.forEach(callback => callback(locale));
    }
  }

  subscribeLocale(callback) {
    this.localeListeners.add(callback);
    return () => this.localeListeners.delete(callback);
  }

  msg(pluginId, key, ...args) {
    const locale = this.currentLocale;
    const localeData = this.l10n.get(pluginId)?.get(locale);
    
    if (localeData && localeData[key]) {
      return this.formatMessage(localeData[key], ...args);
    }
    
    const fallbackData = this.l10n.get(pluginId)?.get('en');
    if (fallbackData && fallbackData[key]) {
      return this.formatMessage(fallbackData[key], ...args);
    }
    
    return key;
  }

  formatMessage(template, ...args) {
    if (args.length === 0) return template;
    return template.replace(/\{(\d+)\}/g, (match, index) => {
      return args[parseInt(index)] ?? match;
    });
  }

  async loadPlugins() {
    const manifestModules = import.meta.glob('./plugins/*/manifest.json', { eager: false });
    const scriptModules = import.meta.glob('./plugins/*/index.js', { eager: false });
    
    for (const [path, loader] of Object.entries(manifestModules)) {
      try {
        const match = path.match(/\.\/plugins\/([^/]+)\/manifest\.json$/);
        if (!match) continue;
        
        const pluginId = match[1];
        const manifest = await loader();
        
        await this.loadPluginL10n(pluginId, pluginId);
        
        const userscript = manifest.default?.userscript || manifest.userscript || 'index.js';
        const scriptPath = `./plugins/${pluginId}/${userscript}`;
        const scriptLoader = scriptModules[scriptPath];
        
        if (!scriptLoader) {
          console.warn(`Plugin ${pluginId}: userscript not found at ${scriptPath}`);
          this.plugins.set(pluginId, {
            id: pluginId,
            manifest: manifest.default || manifest,
            activate: () => {},
            deactivate: () => {},
            instance: null,
          });
          continue;
        }
        
        const module = await scriptLoader();
        const plugin = module.default || module;
        
        this.plugins.set(pluginId, {
          id: pluginId,
          manifest: manifest.default || manifest,
          activate: plugin.activate || (() => {}),
          deactivate: plugin.deactivate || (() => {}),
          instance: null,
        });
        
        const isEnabled = this.settings[pluginId]?.enabled ?? (manifest.default?.enabledByDefault || manifest.enabledByDefault || false);
        if (isEnabled) {
          await this.enablePlugin(pluginId);
        }
      } catch (error) {
        console.error(`Failed to load plugin from ${path}:`, error);
      }
    }
  }

  async loadPluginL10n(pluginId, pluginDir) {
    const l10nModules = import.meta.glob('./plugins/*/l10n/*.json', { eager: false });
    const pluginL10n = new Map();
    
    for (const [path, loader] of Object.entries(l10nModules)) {
      const expectedPrefix = `./plugins/${pluginDir}/l10n/`;
      if (!path.startsWith(expectedPrefix)) continue;
      
      const match = path.match(/\/([^/]+)\.json$/);
      if (!match) continue;
      
      const locale = match[1];
      try {
        const data = await loader();
        pluginL10n.set(locale, data.default || data);
      } catch (error) {
        console.warn(`Failed to load l10n for ${pluginId}/${locale}:`, error);
      }
    }
    
    if (pluginL10n.size > 0) {
      this.l10n.set(pluginId, pluginL10n);
    }
  }

  async enablePlugin(pluginId) {
    const plugin = this.plugins.get(pluginId);
    if (!plugin || this.enabledPlugins.has(pluginId)) return;

    try {
      const context = this.createPluginContext(pluginId);
      plugin.instance = await plugin.activate(context);
      this.enabledPlugins.add(pluginId);
      
      if (!this.settings[pluginId]) {
        this.settings[pluginId] = {};
      }
      this.settings[pluginId].enabled = true;
      this.saveSettings();
      
      console.log(`Plugin "${plugin.manifest.name}" enabled`);
    } catch (error) {
      console.error(`Failed to enable plugin ${pluginId}:`, error);
    }
  }

  async disablePlugin(pluginId) {
    const plugin = this.plugins.get(pluginId);
    if (!plugin || !this.enabledPlugins.has(pluginId)) return;

    try {
      const context = this.createPluginContext(pluginId);
      await plugin.deactivate(context, plugin.instance);
      plugin.instance = null;
      this.enabledPlugins.delete(pluginId);
      
      this.settings[pluginId].enabled = false;
      this.saveSettings();
      
      this.removeAllPluginHooks(pluginId);
      
      console.log(`Plugin "${plugin.manifest.name}" disabled`);
    } catch (error) {
      console.error(`Failed to disable plugin ${pluginId}:`, error);
    }
  }

  removeAllPluginHooks(pluginId) {
    for (const hookName of Object.keys(this.hooks)) {
      this.hooks[hookName] = this.hooks[hookName].filter(
        h => h.pluginId !== pluginId
      );
    }
  }

  createPluginContext(pluginId) {
    const self = this;
    return {
      pluginId,
      
      get manifest() {
        return self.plugins.get(pluginId)?.manifest;
      },
      
      get api() {
        return self.api;
      },
      
      msg(key, ...args) {
        return self.msg(pluginId, key, ...args);
      },
      
      registerHook(hookName, callback) {
        if (!self.hooks[hookName]) {
          console.warn(`Unknown hook: ${hookName}`);
          return;
        }
        self.hooks[hookName].push({ pluginId, callback });
      },
      
      unregisterHook(hookName, callback) {
        if (!self.hooks[hookName]) return;
        self.hooks[hookName] = self.hooks[hookName].filter(
          h => h.pluginId !== pluginId || h.callback !== callback
        );
      },
      
      showNotification(message, type = 'info') {
        if (self.api?.showNotification) {
          self.api.showNotification(message, type);
        }
      },
      
      log(...args) {
        console.log(`[${pluginId}]`, ...args);
      },
      
      error(...args) {
        console.error(`[${pluginId}]`, ...args);
      },
      
      getSetting(key, defaultValue) {
        return self.settings[pluginId]?.[key] ?? defaultValue;
      },
      
      setSetting(key, value) {
        if (!self.settings[pluginId]) {
          self.settings[pluginId] = {};
        }
        self.settings[pluginId][key] = value;
        self.saveSettings();
      },
    };
  }

  async executeHook(hookName, ...args) {
    const hooks = this.hooks[hookName] || [];
    for (const { callback } of hooks) {
      try {
        await callback(...args);
      } catch (error) {
        console.error(`Hook ${hookName} error:`, error);
      }
    }
  }

  getPlugins() {
    return Array.from(this.plugins.values());
  }

  getEnabledPlugins() {
    return Array.from(this.enabledPlugins).map(id => this.plugins.get(id));
  }

  isPluginEnabled(pluginId) {
    return this.enabledPlugins.has(pluginId);
  }
}

export default PluginManager;
