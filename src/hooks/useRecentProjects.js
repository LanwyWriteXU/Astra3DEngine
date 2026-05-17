import React, { useState, useCallback, useEffect } from 'react';
import {
  addRecentProject as addProjectToDB,
  getRecentProjects as getProjectsFromDB,
  getProjectHandle,
  removeRecentProject as removeProjectFromDB,
  clearRecentProjects as clearProjectsFromDB
} from '../utils/recentProjectsDB.js';

export function useRecentProjects() {
  const [recentProjects, setRecentProjects] = useState([]);

  useEffect(() => {
    getProjectsFromDB().then(setRecentProjects);
  }, []);

  const addRecentProject = useCallback(async (name, fileHandle) => {
    const updated = await addProjectToDB(name, fileHandle);
    setRecentProjects(updated);
    return updated;
  }, []);

  const openRecentProject = useCallback(async (id) => {
    const handle = await getProjectHandle(id);
    if (!handle) return null;
    
    try {
      const permission = await handle.queryPermission({ mode: 'read' });
      if (permission === 'granted') {
        return handle;
      }
      
      const requestPermission = await handle.requestPermission({ mode: 'read' });
      if (requestPermission === 'granted') {
        return handle;
      }
    } catch (e) {
      return null;
    }
    
    return null;
  }, []);

  const removeRecentProject = useCallback(async (id) => {
    const updated = await removeProjectFromDB(id);
    setRecentProjects(updated);
  }, []);

  const clearRecentProjects = useCallback(async () => {
    await clearProjectsFromDB();
    setRecentProjects([]);
  }, []);

  return {
    recentProjects,
    addRecentProject,
    openRecentProject,
    removeRecentProject,
    clearRecentProjects
  };
}
