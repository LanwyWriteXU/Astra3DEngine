import React from 'react';
import { msg } from '../i18n/index.js';
import DropdownMenu from './DropdownMenu.jsx';

import IconNewProject from '../icons/new-project.svg?react';
import IconOpenProject from '../icons/open-project.svg?react';
import IconSave from '../icons/save.svg?react';
import IconSaveAs from '../icons/save-as.svg?react';
import IconUndo from '../icons/undo.svg?react';
import IconRedo from '../icons/redo.svg?react';
import IconTheme from '../icons/theme.svg?react';
import IconLanguage from '../icons/language.svg?react';
import IconSettings from '../icons/settings.svg?react';
import IconPlay from '../icons/play.svg?react';
import IconStop from '../icons/stop.svg?react';

function Toolbar({ 
  isPlaying, 
  setIsPlaying, 
  onToggleLocale,
  onSaveProject,
  onSaveAsProject,
  onLoadProject,
  onNewProject,
  projectFileName,
  onToggleTheme,
  theme
}) {
  const fileMenuItems = [
    {
      label: msg('menu.newProject'),
      icon: <IconNewProject className="menu-icon" />,
      shortcut: 'Ctrl+Alt+N',
      onClick: onNewProject
    },
    {
      label: msg('menu.openProject'),
      icon: <IconOpenProject className="menu-icon" />,
      shortcut: 'Ctrl+O',
      onClick: onLoadProject
    },
    { divider: true },
    {
      label: msg('menu.saveProject'),
      icon: <IconSave className="menu-icon" />,
      shortcut: 'Ctrl+S',
      onClick: onSaveProject
    },
    {
      label: msg('menu.saveAs'),
      icon: <IconSaveAs className="menu-icon" />,
      shortcut: 'Ctrl+Shift+S',
      onClick: onSaveAsProject
    }
  ];

  const editMenuItems = [
    {
      label: msg('menu.undo'),
      icon: <IconUndo className="menu-icon" />,
      shortcut: 'Ctrl+Z',
      disabled: true
    },
    {
      label: msg('menu.redo'),
      icon: <IconRedo className="menu-icon" />,
      shortcut: 'Ctrl+Y',
      disabled: true
    }
  ];

  const viewMenuItems = [
    {
      label: theme === 'dark' ? msg('menu.lightMode') : msg('menu.darkMode'),
      icon: <IconTheme className="menu-icon" />,
      onClick: onToggleTheme
    },
    {
      label: msg('menu.language'),
      icon: <IconLanguage className="menu-icon" />,
      onClick: onToggleLocale
    },
    { divider: true },
    {
      label: msg('menu.preferences'),
      icon: <IconSettings className="menu-icon" />
    }
  ];

  const runMenuItems = [
    {
      label: isPlaying ? msg('toolbar.stop') : msg('toolbar.play'),
      icon: isPlaying ? <IconStop className="menu-icon" /> : <IconPlay className="menu-icon" />,
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
            roundedCorners="bottom"
          />
          <DropdownMenu 
            label={msg('menu.edit')} 
            items={editMenuItems}
            roundedCorners="bottom"
          />
          <DropdownMenu 
            label={msg('menu.view')} 
            items={viewMenuItems}
            roundedCorners="bottom"
          />
          <DropdownMenu 
            label={msg('menu.run')} 
            items={runMenuItems}
            roundedCorners="bottom"
          />
        </div>
        {projectFileName && (
          <div className="toolbar-filename">
            <span className="filename-text">{projectFileName}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Toolbar;
