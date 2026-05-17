import React from 'react';

const DB_NAME = 'Astra3DEngine';
const DB_VERSION = 2;
const STORE_NAME = 'snapshots';

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('savedAt', 'savedAt', { unique: false });
      }
    };
  });
}

async function saveSnapshotToIndexedDB(snapshot, maxSnapshots) {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    
    const request = store.put(snapshot);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
    
    transaction.oncomplete = async () => {
      const allSnapshots = await getAllSnapshotsFromIndexedDB();
      if (allSnapshots.length > maxSnapshots) {
        const toDelete = allSnapshots
          .sort((a, b) => b.savedAt - a.savedAt)
          .slice(maxSnapshots);
        
        for (const snap of toDelete) {
          await deleteSnapshotFromIndexedDB(snap.id);
        }
      }
      db.close();
    };
  });
}

async function getAllSnapshotsFromIndexedDB() {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    
    const request = store.getAll();
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result || []);
    
    transaction.oncomplete = () => db.close();
  });
}

async function getSnapshotFromIndexedDB(id) {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    
    const request = store.get(id);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result || null);
    
    transaction.oncomplete = () => db.close();
  });
}

async function deleteSnapshotFromIndexedDB(id) {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    
    const request = store.delete(id);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
    
    transaction.oncomplete = () => db.close();
  });
}

async function clearAllSnapshotsFromIndexedDB() {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    
    const request = store.clear();
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
    
    transaction.oncomplete = () => db.close();
  });
}

function generateSnapshotId() {
  return `snap_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function useAutoSave(getProjectData, interval = 60000, maxSnapshots = 10) {
  const lastSaveRef = React.useRef(null);
  const timerRef = React.useRef(null);
  const pendingRef = React.useRef(false);
  
  const save = React.useCallback(async () => {
    try {
      const data = getProjectData();
      const snapshot = {
        id: generateSnapshotId(),
        name: data.name || 'Untitled Project',
        data: data,
        savedAt: Date.now()
      };
      
      await saveSnapshotToIndexedDB(snapshot, maxSnapshots);
      lastSaveRef.current = Date.now();
      pendingRef.current = false;
      console.log('[AutoSave] Snapshot saved to IndexedDB');
      return snapshot;
    } catch (error) {
      console.error('[AutoSave] Save failed:', error);
      return null;
    }
  }, [getProjectData, maxSnapshots]);
  
  const scheduleSave = React.useCallback(() => {
    pendingRef.current = true;
    
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    timerRef.current = setTimeout(() => {
      if (pendingRef.current) {
        save();
      }
    }, interval);
  }, [save, interval]);
  
  const loadSnapshots = React.useCallback(async () => {
    try {
      const snapshots = await getAllSnapshotsFromIndexedDB();
      console.log(`[AutoSave] Loaded ${snapshots.length} snapshots`);
      return snapshots.sort((a, b) => b.savedAt - a.savedAt);
    } catch (error) {
      console.error('[AutoSave] Load snapshots failed:', error);
      return [];
    }
  }, []);
  
  const loadSnapshot = React.useCallback(async (id) => {
    try {
      const snapshot = await getSnapshotFromIndexedDB(id);
      if (snapshot) {
        console.log('[AutoSave] Loaded snapshot:', snapshot.name);
        return snapshot;
      }
      return null;
    } catch (error) {
      console.error('[AutoSave] Load snapshot failed:', error);
      return null;
    }
  }, []);
  
  const deleteSnapshot = React.useCallback(async (id) => {
    try {
      await deleteSnapshotFromIndexedDB(id);
      console.log('[AutoSave] Deleted snapshot:', id);
      return true;
    } catch (error) {
      console.error('[AutoSave] Delete snapshot failed:', error);
      return false;
    }
  }, []);
  
  const clearAll = React.useCallback(async () => {
    try {
      await clearAllSnapshotsFromIndexedDB();
      console.log('[AutoSave] Cleared all snapshots');
      return true;
    } catch (error) {
      console.error('[AutoSave] Clear all failed:', error);
      return false;
    }
  }, []);
  
  React.useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);
  
  return { 
    save, 
    scheduleSave, 
    loadSnapshots,
    loadSnapshot,
    deleteSnapshot,
    clearAll, 
    getLastSave: () => lastSaveRef.current 
  };
}

export { getAllSnapshotsFromIndexedDB, deleteSnapshotFromIndexedDB, clearAllSnapshotsFromIndexedDB };
