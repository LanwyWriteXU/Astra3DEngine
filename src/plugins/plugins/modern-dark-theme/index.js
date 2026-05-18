const THEME_ID = 'modern-dark';

const themeDefinition = {
  id: THEME_ID,
  name: '现代深色',
  nameEn: 'Modern Dark',
  variables: {
    '--bg-dark': '#0d1117',
    '--bg-panel': '#161b22',
    '--bg-toolbar': '#21262d',
    '--accent': '#30363d',
    '--accent-hover': '#484f58',
    '--accent-active': '#58a6ff',
    '--text-primary': '#c9d1d9',
    '--text-secondary': '#8b949e',
    '--text-muted': '#6e7681',
    '--border': '#30363d',
    '--success': '#3fb950',
    '--danger': '#f85149',
  }
};

const activate = async (ctx) => {
  ctx.log(ctx.msg('activated'));
  
  const { registerTheme } = await import('../../../utils/themeManager.js');
  
  const success = registerTheme(themeDefinition);
  if (success) {
    ctx.log(ctx.msg('registered', THEME_ID));
  } else {
    ctx.error(ctx.msg('registerFailed'));
  }
  
  return {
    themeId: THEME_ID
  };
};

const deactivate = async (ctx, instance) => {
  ctx.log(ctx.msg('deactivated'));
  
  const { unregisterTheme, applyTheme } = await import('../../../utils/themeManager.js');
  
  if (instance?.themeId) {
    const success = unregisterTheme(instance.themeId);
    if (success) {
      ctx.log(ctx.msg('unregistered', instance.themeId));
      
      const currentTheme = localStorage.getItem('astra-theme');
      if (currentTheme === instance.themeId) {
        localStorage.setItem('astra-theme', 'dark');
        applyTheme('dark');
      }
    }
  }
};

export default {
  activate,
  deactivate,
};
