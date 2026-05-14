import React from 'react';
import { msg, localeNames } from '../i18n/index.js';
import DropdownMenu from './DropdownMenu.jsx';

function Toolbar({ 
  isPlaying, 
  setIsPlaying, 
  onToggleLocale, 
  currentLocale,
  onSaveProject,
  onLoadProject,
  onNewProject
}) {
  const fileMenuItems = [
    {
      label: msg('menu.newProject'),
      icon: '📄',
      shortcut: 'Ctrl+N',
      onClick: onNewProject
    },
    {
      label: msg('menu.openProject'),
      icon: '📂',
      shortcut: 'Ctrl+O',
      onClick: onLoadProject
    },
    { divider: true },
    {
      label: msg('menu.saveProject'),
      icon: '💾',
      shortcut: 'Ctrl+S',
      onClick: onSaveProject
    },
    {
      label: msg('menu.saveAs'),
      icon: '📁',
      onClick: onSaveProject
    }
  ];

  const editMenuItems = [
    {
      label: msg('menu.undo'),
      icon: '↩️',
      shortcut: 'Ctrl+Z',
      disabled: true
    },
    {
      label: msg('menu.redo'),
      icon: '↪️',
      shortcut: 'Ctrl+Y',
      disabled: true
    }
  ];

  const viewMenuItems = [
    {
      label: msg('viewport.perspective'),
      icon: '🎯'
    },
    {
      label: msg('viewport.orthographic'),
      icon: '📦'
    }
  ];

  const runMenuItems = [
    {
      label: isPlaying ? msg('toolbar.stop') : msg('toolbar.play'),
      icon: isPlaying ? '⏹️' : '▶️',
      shortcut: 'F5',
      onClick: () => setIsPlaying(!isPlaying)
    }
  ];

  return (
    <div className="toolbar">
      <div className="toolbar-left">
        <div className="toolbar-logo">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
              height="24" viewBox="0,0,69.99346,66.43688">
              <g transform="translate(-205.00327,-146.78156)">
                  <g stroke="#000000" strokeWidth="0" strokeMiterlimit="10">
                      <path d="M274.99673,190.93032l-11.95866,22.28812h-44.44009l13.31277,-22.10459z"
                          fill="#0073bf" />
                      <path d="M216.31868,212.14198l-11.31541,-21.28864l24.21416,-0.00471z" fill="#66ccff" />
                      <path d="M227.50821,146.78156l23.50249,0.00667l23.98603,44.14209l-11.95866,22.28812z"
                          fill="#0099ff" />
                      <path d="M205.06042,188.54619l22.44779,-41.76463l23.50249,0.00667l-20.58917,41.73314z"
                          fill="#66ccff" />
                  </g>
              </g>
          </svg>
        </div>
        <div className="toolbar-menus">
          <DropdownMenu 
            label={msg('menu.file')} 
            items={fileMenuItems} 
          />
          <DropdownMenu 
            label={msg('menu.edit')} 
            items={editMenuItems} 
          />
          <DropdownMenu 
            label={msg('menu.view')} 
            items={viewMenuItems} 
          />
          <DropdownMenu 
            label={msg('menu.run')} 
            items={runMenuItems} 
          />
        </div>
      </div>

      <div className="toolbar-right">
        <button
          className={`toolbar-btn ${isPlaying ? 'stop' : 'play'}`}
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? msg('toolbar.stop') : msg('toolbar.play')}
        </button>
        <button
          className="menu-btn"
          onClick={onToggleLocale}
          title={localeNames[currentLocale === 'en' ? 'zh' : 'en']}
        >
          {currentLocale === 'en' ? '中文' : 'EN'}
        </button>
      </div>
    </div>
  );
}

export default Toolbar;
