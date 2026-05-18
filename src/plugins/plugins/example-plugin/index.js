const activate = async (ctx) => {
  ctx.log(ctx.msg('activated'));
  
  ctx.registerHook('onObjectAdd', (object) => {
    ctx.log(ctx.msg('objectAdded', object.name));
  });
  
  ctx.registerHook('onObjectDelete', (objectId) => {
    ctx.log(ctx.msg('objectDeleted', objectId));
  });
  
  ctx.registerHook('onSceneSave', (sceneData) => {
    ctx.log(ctx.msg('sceneSaved'));
  });
  
  const instance = {
    sayHello: () => {
      ctx.showNotification(ctx.msg('hello'), 'info');
    },
  };
  
  return instance;
};

const deactivate = async (ctx, instance) => {
  ctx.log(ctx.msg('deactivated'));
};

export default {
  activate,
  deactivate,
};
