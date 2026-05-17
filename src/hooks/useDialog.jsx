import React, { useState, useCallback, createContext, useContext, useEffect } from 'react';
import { AlertDialog, ConfirmDialog, PromptDialog } from '../components/Dialog.jsx';
import { msg } from '../i18n/index.js';

const DialogContext = createContext(null);

export function DialogProvider({ children }) {
  const [dialog, setDialog] = useState(null);

  const alert = useCallback((message, title) => {
    return new Promise(resolve => {
      setDialog({
        type: 'alert',
        message,
        title,
        onClose: () => {
          setDialog(null);
          resolve();
        }
      });
    });
  }, []);

  const confirm = useCallback((message, title, options = {}) => {
    return new Promise(resolve => {
      setDialog({
        type: 'confirm',
        message,
        title,
        confirmText: options.confirmText,
        cancelText: options.cancelText,
        onConfirm: () => {
          setDialog(null);
          resolve(true);
        },
        onCancel: () => {
          setDialog(null);
          resolve(false);
        }
      });
    });
  }, []);

  const prompt = useCallback((message, defaultValue = '', title, placeholder = '') => {
    return new Promise(resolve => {
      setDialog({
        type: 'prompt',
        message,
        title,
        defaultValue,
        placeholder,
        onConfirm: (value) => {
          setDialog(null);
          resolve(value);
        },
        onCancel: () => {
          setDialog(null);
          resolve(null);
        }
      });
    });
  }, []);

  useEffect(() => {
    const originalAlert = window.alert;
    const originalConfirm = window.confirm;
    const originalPrompt = window.prompt;

    window.alert = (message) => alert(message);
    window.confirm = (message) => confirm(message);
    window.prompt = (message, defaultValue) => prompt(message, defaultValue);

    return () => {
      window.alert = originalAlert;
      window.confirm = originalConfirm;
      window.prompt = originalPrompt;
    };
  }, [alert, confirm, prompt]);

  const renderDialog = () => {
    if (!dialog) return null;

    switch (dialog.type) {
      case 'alert':
        return (
          <AlertDialog
            isOpen={true}
            title={dialog.title}
            message={dialog.message}
            onClose={dialog.onClose}
          />
        );
      case 'confirm':
        return (
          <ConfirmDialog
            isOpen={true}
            title={dialog.title}
            message={dialog.message}
            confirmText={dialog.confirmText}
            cancelText={dialog.cancelText}
            onConfirm={dialog.onConfirm}
            onCancel={dialog.onCancel}
          />
        );
      case 'prompt':
        return (
          <PromptDialog
            isOpen={true}
            title={dialog.title}
            message={dialog.message}
            defaultValue={dialog.defaultValue}
            placeholder={dialog.placeholder}
            onConfirm={dialog.onConfirm}
            onCancel={dialog.onCancel}
          />
        );
      default:
        return null;
    }
  };

  return (
    <DialogContext.Provider value={{ alert, confirm, prompt }}>
      {children}
      {renderDialog()}
    </DialogContext.Provider>
  );
}

export function useDialog() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider');
  }
  return context;
}
