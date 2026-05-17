import React, { useState, useCallback, createContext, useContext } from 'react';
import { ToastContainer } from '../components/Toast.jsx';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const show = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type, duration }]);
    return id;
  }, []);

  const success = useCallback((message, duration = 3000) => {
    return show(message, 'success', duration);
  }, [show]);

  const error = useCallback((message, duration = 4000) => {
    return show(message, 'error', duration);
  }, [show]);

  const warning = useCallback((message, duration = 3500) => {
    return show(message, 'warning', duration);
  }, [show]);

  const info = useCallback((message, duration = 3000) => {
    return show(message, 'info', duration);
  }, [show]);

  const close = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const closeAll = useCallback(() => {
    setToasts([]);
  }, []);

  return (
    <ToastContext.Provider value={{ show, success, error, warning, info, close, closeAll }}>
      {children}
      <ToastContainer toasts={toasts} onClose={close} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
