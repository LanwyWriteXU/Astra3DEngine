const activate = async (ctx) => {
  ctx.log(ctx.msg('activated'));
  
  const showStats = () => {
    if (!ctx.api) return;
    
    const objects = ctx.api.scene.getObjects();
    const assets = ctx.api.assets.getAll();
    const prefabs = ctx.api.prefabs.getAll();
    
    const typeCount = {};
    objects.forEach(obj => {
      const type = obj.type || 'unknown';
      typeCount[type] = (typeCount[type] || 0) + 1;
    });
    
    ctx.log(ctx.msg('statsTitle'));
    ctx.log(ctx.msg('totalObjects', objects.length));
    ctx.log(ctx.msg('totalAssets', assets.length));
    ctx.log(ctx.msg('totalPrefabs', prefabs.length));
    ctx.log(ctx.msg('typeDistribution'), typeCount);
  };
  
  ctx.registerHook('onObjectAdd', () => {
    showStats();
  });
  
  ctx.registerHook('onObjectDelete', () => {
    showStats();
  });
  
  showStats();
  
  return {
    showStats,
  };
};

const deactivate = async (ctx, instance) => {
  ctx.log(ctx.msg('deactivated'));
};

export default {
  activate,
  deactivate,
};
