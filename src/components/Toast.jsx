import React, { useState, useEffect } from 'react';
import IconClose from '../icons/close.svg?react';

function Toast({ id, message, type = 'info', duration = 3000, onClose }) {
  const [progress, setProgress] = useState(100);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);
      
      if (remaining === 0) {
        clearInterval(interval);
        handleClose();
      }
    }, 50);

    return () => clearInterval(interval);
  }, [duration, id]);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => onClose(id), 200);
  };

  const typeClass = {
    success: 'toast-success',
    error: 'toast-error',
    warning: 'toast-warning',
    info: 'toast-info'
  }[type];

  return (
    <div className={`toast ${typeClass} ${isLeaving ? 'toast-leaving' : ''}`}>
      <span className="toast-message">{message}</span>
      <button className="toast-close" onClick={handleClose}>
        <IconClose className="toast-close-icon" />
      </button>
      <div className="toast-progress" style={{ width: `${progress}%` }} />
    </div>
  );
}

export function ToastContainer({ toasts, onClose }) {
  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          {...toast}
          onClose={onClose}
        />
      ))}
    </div>
  );
}

export default Toast;
