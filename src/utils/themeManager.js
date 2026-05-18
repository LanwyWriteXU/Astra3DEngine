const themes = new Map([
  ['dark', {
    id: 'dark',
    name: '暗色模式',
    nameEn: 'Dark Mode',
    builtIn: true,
    variables: {}
  }],
  ['light', {
    id: 'light',
    name: '明亮模式',
    nameEn: 'Light Mode',
    builtIn: true,
    variables: {}
  }]
]);

const listeners = new Set();

export const registerTheme = (theme) => {
  if (!theme || !theme.id) {
    console.error('Invalid theme object');
    return false;
  }
  
  if (themes.has(theme.id) && themes.get(theme.id).builtIn) {
    console.warn(`Cannot override built-in theme: ${theme.id}`);
    return false;
  }
  
  themes.set(theme.id, {
    ...theme,
    builtIn: false
  });
  
  listeners.forEach(fn => fn(getAllThemes()));
  return true;
};

export const unregisterTheme = (themeId) => {
  const theme = themes.get(themeId);
  if (!theme || theme.builtIn) {
    return false;
  }
  
  themes.delete(themeId);
  listeners.forEach(fn => fn(getAllThemes()));
  return true;
};

export const getTheme = (themeId) => {
  return themes.get(themeId);
};

export const getAllThemes = () => {
  return Array.from(themes.values());
};

export const subscribe = (callback) => {
  listeners.add(callback);
  return () => listeners.delete(callback);
};

export const applyTheme = (themeId) => {
  const theme = themes.get(themeId);
  if (!theme) return false;
  
  document.documentElement.setAttribute('data-theme', themeId);
  
  if (theme.variables && Object.keys(theme.variables).length > 0) {
    const root = document.documentElement;
    Object.entries(theme.variables).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }
  
  return true;
};
