const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld("electronAPI", {
  minimize: () => ipcRenderer.send("window:minimize"),
  maximize: () => ipcRenderer.send("window:maximize"),
  close: () => ipcRenderer.send("window:close"),
  forceClose: () => ipcRenderer.send("window:force-close"),
  isMaximized: () => ipcRenderer.invoke("window:isMaximized"),
  onMaximize: (callback) => {
    ipcRenderer.on("window:maximized", callback);
    return () => ipcRenderer.removeListener("window:maximized", callback);
  },
  onUnmaximize: (callback) => {
    ipcRenderer.on("window:unmaximized", callback);
    return () => ipcRenderer.removeListener("window:unmaximized", callback);
  },
  onBeforeClose: (callback) => {
    ipcRenderer.on("window:before-close", callback);
    return () => ipcRenderer.removeListener("window:before-close", callback);
  },
  openGame: () => ipcRenderer.send("game:open"),
  onMenuNewProject: (callback) => {
    ipcRenderer.on("menu:new-project", callback);
    return () => ipcRenderer.removeListener("menu:new-project", callback);
  },
  onMenuOpenProject: (callback) => {
    ipcRenderer.on("menu:open-project", (event, filePath) => callback(filePath));
    return () => ipcRenderer.removeListener("menu:open-project", callback);
  },
  onMenuSaveProject: (callback) => {
    ipcRenderer.on("menu:save-project", callback);
    return () => ipcRenderer.removeListener("menu:save-project", callback);
  },
  onMenuSaveAsProject: (callback) => {
    ipcRenderer.on("menu:save-as-project", (event, filePath) => callback(filePath));
    return () => ipcRenderer.removeListener("menu:save-as-project", callback);
  },
  onMenuUndo: (callback) => {
    ipcRenderer.on("menu:undo", callback);
    return () => ipcRenderer.removeListener("menu:undo", callback);
  },
  onMenuRedo: (callback) => {
    ipcRenderer.on("menu:redo", callback);
    return () => ipcRenderer.removeListener("menu:redo", callback);
  },
  onMenuPlay: (callback) => {
    ipcRenderer.on("menu:play", callback);
    return () => ipcRenderer.removeListener("menu:play", callback);
  },
  onMenuStop: (callback) => {
    ipcRenderer.on("menu:stop", callback);
    return () => ipcRenderer.removeListener("menu:stop", callback);
  },
  onMenuAbout: (callback) => {
    ipcRenderer.on("menu:about", callback);
    return () => ipcRenderer.removeListener("menu:about", callback);
  },
  showSaveDialog: (options) => ipcRenderer.invoke("dialog:showSave", options),
  showOpenDialog: (options) => ipcRenderer.invoke("dialog:showOpen", options),
  showMessage: (options) => ipcRenderer.invoke("dialog:showMessage", options)
});
