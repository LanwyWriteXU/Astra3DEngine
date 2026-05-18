import React, { useState, useEffect } from 'react';
import { getPluginManager, pluginMsg, subscribePluginLocale } from '../plugins';
import { msg } from '../i18n/index.js';

const PluginSettingsModal = ({ isOpen, onClose }) => {
  const [plugins, setPlugins] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [, forceUpdate] = useState(0);
  const pluginManager = getPluginManager();

  useEffect(() => {
    if (isOpen) {
      setPlugins(pluginManager.getPlugins());
    }
  }, [isOpen]);

  useEffect(() => {
    const unsubscribe = subscribePluginLocale(() => {
      forceUpdate(n => n + 1);
    });
    return unsubscribe;
  }, []);

  const handleTogglePlugin = async (pluginId, enabled) => {
    if (enabled) {
      await pluginManager.disablePlugin(pluginId);
    } else {
      await pluginManager.enablePlugin(pluginId);
    }
    setPlugins(pluginManager.getPlugins());
  };

  const getPluginName = (plugin) => {
    const l10nName = pluginMsg(plugin.id, 'name');
    return l10nName !== 'name' ? l10nName : plugin.manifest.name;
  };

  const getPluginDescription = (plugin) => {
    const l10nDesc = pluginMsg(plugin.id, 'description');
    return l10nDesc !== 'description' ? l10nDesc : plugin.manifest.description;
  };

  const filteredPlugins = plugins.filter(plugin => {
    const name = getPluginName(plugin).toLowerCase();
    const desc = getPluginDescription(plugin).toLowerCase();
    return name.includes(searchQuery.toLowerCase()) || desc.includes(searchQuery.toLowerCase());
  });

  if (!isOpen) return null;

  return (
    <div className="plugin-settings-overlay" onClick={onClose}>
      <div className="plugin-settings-modal" onClick={e => e.stopPropagation()}>
        <div className="plugin-settings-header">
          <h2>{msg('pluginSettings.title')}</h2>
          <button className="plugin-settings-close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="plugin-settings-search-bar">
          <input
            type="text"
            placeholder={msg('pluginSettings.searchPlaceholder')}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="plugin-settings-plugin-list">
          {filteredPlugins.length === 0 ? (
            <div className="plugin-settings-empty-message">
              {searchQuery ? msg('pluginSettings.noResults') : msg('pluginSettings.noPlugins')}
            </div>
          ) : (
            filteredPlugins.map(plugin => {
              const isEnabled = pluginManager.isPluginEnabled(plugin.id);
              return (
                <div key={plugin.id} className="plugin-settings-plugin-item">
                  <div className="plugin-settings-plugin-info">
                    <div className="plugin-settings-plugin-header">
                      <span className="plugin-settings-plugin-name">{getPluginName(plugin)}</span>
                      <span className="plugin-settings-plugin-version">v{plugin.manifest.version || '1.0.0'}</span>
                    </div>
                    <p className="plugin-settings-plugin-description">{getPluginDescription(plugin)}</p>
                    {plugin.manifest.author && (
                      <span className="plugin-settings-plugin-author">{msg('pluginSettings.author', { 0: plugin.manifest.author })}</span>
                    )}
                  </div>
                  <div className="plugin-settings-plugin-controls">
                    <label className="plugin-settings-switch">
                      <input
                        type="checkbox"
                        checked={isEnabled}
                        onChange={() => handleTogglePlugin(plugin.id, isEnabled)}
                      />
                      <span className="plugin-settings-slider"></span>
                    </label>
                  </div>
                </div>
              );
            })
          )}
        </div>
        
        <div className="plugin-settings-footer">
          <p className="plugin-settings-hint">
            {msg('pluginSettings.hint')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PluginSettingsModal;
