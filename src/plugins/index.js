import PluginManager from './PluginManager';

const pluginManager = new PluginManager();

export const initPlugins = async () => {
  await pluginManager.loadPlugins();
  return pluginManager;
};

export const getPluginManager = () => pluginManager;

export const setPluginLocale = (locale) => {
  pluginManager.setLocale(locale);
};

export const subscribePluginLocale = (callback) => {
  return pluginManager.subscribeLocale(callback);
};

export const pluginMsg = (pluginId, key, ...args) => {
  return pluginManager.msg(pluginId, key, ...args);
};

export default pluginManager;
