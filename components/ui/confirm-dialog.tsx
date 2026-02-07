'use client';

import React from 'react';
import { AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
  isLoading?: boolean;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
  isLoading = false,
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  const variantConfig = {
    danger: {
      icon: <AlertCircle className="icon-lg text-red-600" />,
      confirmVariant: 'destructive' as const,
    },
    warning: {
      icon: <AlertTriangle className="icon-lg text-orange-500" />,
      confirmVariant: 'warning' as const,
    },
    info: {
      icon: <Info className="icon-lg text-blue-500" />,
      confirmVariant: 'default' as const,
    },
  };

  const config = variantConfig[variant];

  return (
    <>
      {/* Backdrop*/}
      <div
        className="fixed inset-0 bg-black/50 z-50 animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white rounded-2xl shadow-floating max-w-md w-full p-6 animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialog-title"
          aria-describedby="dialog-description"
        >
          {/* Icon + Title */}
          <div className="flex items-start gap-4 mb-4">
            <div className="shrink-0">{config.icon}</div>
            <div className="flex-1">
              <h3
                id="dialog-title"
                className="header-05-bold text-grey-900 mb-2"
              >
                {title}
              </h3>
              <p
                id="dialog-description"
                className="body-01-regular text-grey-600"
              >
                {description}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end mt-6">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              {cancelText}
            </Button>
            <Button
              variant={config.confirmVariant}
              onClick={onConfirm}
              isLoading={isLoading}
              disabled={isLoading}
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

// Hook for easier usage
export function useConfirmDialog() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const open = () => setIsOpen(true);
  const close = () => {
    setIsOpen(false);
    setIsLoading(false);
  };

  const confirm = async (callback: () => Promise<void> | void) => {
    setIsLoading(true);
    try {
      await callback();
      close();
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  return {
    isOpen,
    isLoading,
    open,
    close,
    confirm,
  };
}
