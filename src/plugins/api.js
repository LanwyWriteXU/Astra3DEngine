const createPluginApi = ({
  sceneObjects,
  setSceneObjects,
  selectedObjectId,
  setSelectedObjectId,
  assets,
  setAssets,
  prefabs,
  setPrefabs,
  theme,
  setTheme,
  locale,
  setLocale,
  showNotification,
  viewportRef,
  sceneRef,
  cameraRef,
  rendererRef,
}) => {
  return {
    scene: {
      getObjects: () => sceneObjects,
      setObjects: setSceneObjects,
      getSelectedId: () => selectedObjectId,
      setSelectedId: setSelectedObjectId,
      
      addObject: (object) => {
        setSceneObjects(prev => [...prev, object]);
      },
      
      removeObject: (id) => {
        setSceneObjects(prev => prev.filter(obj => obj.id !== id));
      },
      
      updateObject: (id, updates) => {
        setSceneObjects(prev => prev.map(obj => 
          obj.id === id ? { ...obj, ...updates } : obj
        ));
      },
      
      getObject: (id) => {
        return sceneObjects.find(obj => obj.id === id);
      },
    },
    
    assets: {
      getAll: () => assets,
      setAll: setAssets,
      
      add: (asset) => {
        setAssets(prev => [...prev, asset]);
      },
      
      remove: (id) => {
        setAssets(prev => prev.filter(a => a.id !== id));
      },
      
      get: (id) => {
        return assets.find(a => a.id === id);
      },
    },
    
    prefabs: {
      getAll: () => prefabs,
      setAll: setPrefabs,
      
      add: (prefab) => {
        setPrefabs(prev => [...prev, prefab]);
      },
      
      remove: (id) => {
        setPrefabs(prev => prev.filter(p => p.id !== id));
      },
      
      get: (id) => {
        return prefabs.find(p => p.id === id);
      },
    },
    
    ui: {
      getTheme: () => theme,
      setTheme: setTheme,
      getLocale: () => locale,
      setLocale: setLocale,
      showNotification,
    },
    
    viewport: {
      getRef: () => viewportRef,
      getScene: () => sceneRef?.current,
      getCamera: () => cameraRef?.current,
      getRenderer: () => rendererRef?.current,
    },
    
    utils: {
      generateId: () => Date.now() + Math.random(),
      
      deepClone: (obj) => JSON.parse(JSON.stringify(obj)),
      
      debounce: (fn, delay) => {
        let timer;
        return (...args) => {
          clearTimeout(timer);
          timer = setTimeout(() => fn(...args), delay);
        };
      },
      
      throttle: (fn, limit) => {
        let inThrottle;
        return (...args) => {
          if (!inThrottle) {
            fn(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
          }
        };
      },
    },
  };
};

export default createPluginApi;
