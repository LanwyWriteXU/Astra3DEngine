import React, { useState, useCallback, useRef, useEffect } from 'react';
import Viewport from './Viewport.jsx';
import { msg } from '../i18n/index.js';
import IconLayoutSingle from '../icons/layout-single.svg?react';
import IconLayoutQuad from '../icons/layout-quad.svg?react';

const VIEW_CONFIGS = {
  perspective: {
    label: 'viewport.perspective',
    cameraType: 'perspective',
    cameraPosition: [5, 5, 5],
    cameraLookAt: [0, 0, 0]
  },
  top: {
    label: 'viewport.top',
    cameraType: 'orthographic',
    cameraPosition: [0, 10, 0],
    cameraLookAt: [0, 0, 0]
  },
  front: {
    label: 'viewport.front',
    cameraType: 'orthographic',
    cameraPosition: [0, 0, 10],
    cameraLookAt: [0, 0, 0]
  },
  side: {
    label: 'viewport.side',
    cameraType: 'orthographic',
    cameraPosition: [10, 0, 0],
    cameraLookAt: [0, 0, 0]
  }
};

function MultiViewport({
  objects,
  assets,
  selectedObject,
  onSelectObject,
  currentTool,
  onToolChange,
  isPlaying,
  onUpdateObject,
  onRecordHistory,
  theme
}) {
  const [layoutMode, setLayoutMode] = useState('single');
  const [activeView, setActiveView] = useState('perspective');
  const [viewStates, setViewStates] = useState({
    perspective: { cameraType: 'perspective' },
    top: { cameraType: 'orthographic' },
    front: { cameraType: 'orthographic' },
    side: { cameraType: 'orthographic' }
  });

  const handleLayoutToggle = useCallback(() => {
    setLayoutMode(prev => prev === 'single' ? 'quad' : 'single');
  }, []);

  const handleViewClick = useCallback((e, viewName) => {
    if (layoutMode === 'quad') {
      setActiveView(viewName);
    }
  }, [layoutMode]);

  const handleViewportCameraChange = useCallback((viewName, cameraType) => {
    setViewStates(prev => ({
      ...prev,
      [viewName]: { ...prev[viewName], cameraType }
    }));
  }, []);

  const renderViewport = (viewName, style = {}) => {
    const config = VIEW_CONFIGS[viewName];
    const isActive = activeView === viewName;
    const viewState = viewStates[viewName];

    return (
      <div 
        key={viewName}
        className={`multi-viewport-item ${isActive ? 'active' : ''}`}
        style={style}
        onClick={(e) => handleViewClick(e, viewName)}
      >
        <Viewport
          objects={objects}
          assets={assets}
          selectedObject={selectedObject}
          onSelectObject={onSelectObject}
          currentTool={currentTool}
          onToolChange={onToolChange}
          isPlaying={isPlaying}
          onUpdateObject={onUpdateObject}
          onRecordHistory={onRecordHistory}
          theme={theme}
          initialCameraType={viewState?.cameraType || config.cameraType}
          initialCameraPosition={config.cameraPosition}
          initialCameraLookAt={config.cameraLookAt}
          showToolbar={layoutMode === 'single' || isActive}
          showDock={layoutMode === 'single' || isActive}
          showViewCube={layoutMode === 'single' ? true : isActive}
          viewLabel={msg(config.label)}
          onCameraTypeChange={(type) => handleViewportCameraChange(viewName, type)}
        />
      </div>
    );
  };

  return (
    <div className="multi-viewport-container">
      <div className="multi-viewport-layout-toggle">
        <button 
          className={`layout-toggle-btn ${layoutMode === 'single' ? 'active' : ''}`}
          onClick={() => setLayoutMode('single')}
          title={msg('viewport.singleView')}
        >
          <IconLayoutSingle className="layout-icon" />
        </button>
        <button 
          className={`layout-toggle-btn ${layoutMode === 'quad' ? 'active' : ''}`}
          onClick={() => setLayoutMode('quad')}
          title={msg('viewport.quadView')}
        >
          <IconLayoutQuad className="layout-icon" />
        </button>
      </div>
      
      {layoutMode === 'single' ? (
        renderViewport(activeView, { top: 0, left: 0, right: 0, bottom: 0 })
      ) : (
        <>
          {renderViewport('top', { top: 0, left: 0, width: '50%', height: '50%' })}
          {renderViewport('front', { top: 0, right: 0, width: '50%', height: '50%' })}
          {renderViewport('side', { bottom: 0, left: 0, width: '50%', height: '50%' })}
          {renderViewport('perspective', { bottom: 0, right: 0, width: '50%', height: '50%' })}
        </>
      )}
    </div>
  );
}

export default MultiViewport;
