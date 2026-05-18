const activate = async (ctx) => {
  ctx.log(ctx.msg('activated'));
  
  const AUTO_SAVE_KEY = 'astra3d-autosave';
  const AUTO_SAVE_INTERVAL = 60000;
  
  let saveTimer = null;
  
  const autoSave = () => {
    if (!ctx.api) return;
    
    const objects = ctx.api.scene.getObjects();
    const assets = ctx.api.assets.getAll();
    const prefabs = ctx.api.prefabs.getAll();
    
    const data = {
      timestamp: Date.now(),
      objects,
      assets,
      prefabs,
    };
    
    try {
      localStorage.setItem(AUTO_SAVE_KEY, JSON.stringify(data));
      ctx.log(ctx.msg('saved'));
    } catch (e) {
      ctx.error(ctx.msg('failed', e.message));
    }
  };
  
  const startAutoSave = () => {
    if (saveTimer) clearInterval(saveTimer);
    saveTimer = setInterval(autoSave, AUTO_SAVE_INTERVAL);
    ctx.log(ctx.msg('started', AUTO_SAVE_INTERVAL / 1000));
  };
  
  const stopAutoSave = () => {
    if (saveTimer) {
      clearInterval(saveTimer);
      saveTimer = null;
    }
  };
  
  ctx.registerHook('onSceneLoad', () => {
    startAutoSave();
  });
  
  startAutoSave();
  
  return {
    stopAutoSave,
    manualSave: autoSave,
  };
};

const deactivate = async (ctx, instance) => {
  if (instance?.stopAutoSave) {
    instance.stopAutoSave();
  }
  ctx.log(ctx.msg('deactivated'));
};

export default {
  activate,
  deactivate,
};
