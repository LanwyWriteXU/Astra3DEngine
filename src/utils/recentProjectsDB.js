const DB_NAME = 'astra-recent-projects';
const STORE_NAME = 'handles';
const MAX_RECENT_PROJECTS = 10;

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
  });
}

async function getAllHandles() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const request = store.getAll();
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

async function saveHandle(handle) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const request = store.put(handle);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

async function deleteHandle(id) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const request = store.delete(id);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

async function clearAllHandles() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const request = store.clear();
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

export async function addRecentProject(name, fileHandle) {
  const handles = await getAllHandles();
  const existingIndex = handles.findIndex(h => h.name === name);
  
  if (existingIndex !== -1) {
    await deleteHandle(handles[existingIndex].id);
  }

  const newHandle = {
    id: Date.now(),
    name: name,
    handle: fileHandle,
    lastOpened: Date.now()
  };

  const updated = [newHandle, ...handles.filter(h => h.name !== name)]
    .slice(0, MAX_RECENT_PROJECTS);

  await clearAllHandles();
  for (const h of updated) {
    await saveHandle(h);
  }

  return updated.map(h => ({ id: h.id, name: h.name, lastOpened: h.lastOpened }));
}

export async function getRecentProjects() {
  const handles = await getAllHandles();
  return handles.map(h => ({ id: h.id, name: h.name, lastOpened: h.lastOpened }));
}

export async function getProjectHandle(id) {
  const handles = await getAllHandles();
  const found = handles.find(h => h.id === id);
  return found?.handle;
}

export async function removeRecentProject(id) {
  await deleteHandle(id);
  return getRecentProjects();
}

export async function clearRecentProjects() {
  await clearAllHandles();
  return [];
}
