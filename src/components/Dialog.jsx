import React, { useState, useCallback } from 'react';
import { msg } from '../i18n/index.js';
import IconClose from '../icons/close.svg?react';

export function AlertDialog({ isOpen, title, message, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog-content dialog-alert" onClick={e => e.stopPropagation()}>
        <div className="dialog-header">
          {title && <h3 className="dialog-title">{title}</h3>}
          <button className="dialog-close-btn" onClick={onClose}>
            <IconClose className="dialog-close-icon" />
          </button>
        </div>
        <div className="dialog-body">
          <p className="dialog-message">{message}</p>
        </div>
        <div className="dialog-footer">
          <button className="btn btn-primary" onClick={onClose}>
            {msg('dialog.ok')}
          </button>
        </div>
      </div>
    </div>
  );
}

export function ConfirmDialog({ isOpen, title, message, confirmText, cancelText, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="dialog-overlay" onClick={onCancel}>
      <div className="dialog-content dialog-confirm" onClick={e => e.stopPropagation()}>
        <div className="dialog-header">
          {title && <h3 className="dialog-title">{title}</h3>}
          <button className="dialog-close-btn" onClick={onCancel}>
            <IconClose className="dialog-close-icon" />
          </button>
        </div>
        <div className="dialog-body">
          <p className="dialog-message">{message}</p>
        </div>
        <div className="dialog-footer">
          <button className="btn" onClick={onCancel}>
            {cancelText || msg('dialog.cancel')}
          </button>
          <button className="btn btn-primary" onClick={onConfirm}>
            {confirmText || msg('dialog.confirm')}
          </button>
        </div>
      </div>
    </div>
  );
}

export function PromptDialog({ isOpen, title, message, defaultValue, placeholder, onConfirm, onCancel }) {
  const [value, setValue] = useState(defaultValue || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(value);
  };

  if (!isOpen) return null;

  return (
    <div className="dialog-overlay" onClick={onCancel}>
      <div className="dialog-content dialog-prompt" onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <div className="dialog-header">
            {title && <h3 className="dialog-title">{title}</h3>}
            <button type="button" className="dialog-close-btn" onClick={onCancel}>
              <IconClose className="dialog-close-icon" />
            </button>
          </div>
          <div className="dialog-body">
            {message && <p className="dialog-message">{message}</p>}
            <input
              type="text"
              className="dialog-input"
              value={value}
              onChange={e => setValue(e.target.value)}
              placeholder={placeholder}
              autoFocus
            />
          </div>
          <div className="dialog-footer">
            <button type="button" className="btn" onClick={onCancel}>
              {msg('dialog.cancel')}
            </button>
            <button type="submit" className="btn btn-primary">
              {msg('dialog.ok')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
