import React, { useEffect, useState } from 'react';
import type { Toast } from '../../contexts/ToastContext';

interface ToastMessageProps {
  toast: Toast;
  onClose: () => void;
}

const ToastMessage: React.FC<ToastMessageProps> = ({ toast, onClose }) => {
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, toast.duration);

      return () => clearTimeout(timer);
    }
  }, [toast.duration]);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      onClose();
    }, 300); // Match the transition duration
  };

  const getToastStyles = (type: string) => {
    const baseStyles = "rounded-xl shadow-lg border-l-4 p-4 transform transition-all duration-300 ease-in-out";
    
    const typeStyles = {
      success: "bg-green-50 border-green-500 text-green-800 shadow-green-100",
      error: "bg-red-50 border-red-500 text-red-800 shadow-red-100",
      warning: "bg-yellow-50 border-yellow-500 text-yellow-800 shadow-yellow-100",
      info: "bg-blue-50 border-blue-500 text-blue-800 shadow-blue-100"
    };

    const animationStyles = isLeaving 
      ? "translate-x-full opacity-0" 
      : "translate-x-0 opacity-100";

    return `${baseStyles} ${typeStyles[type as keyof typeof typeStyles]} ${animationStyles}`;
  };

  const getToastIcon = (type: string) => {
    const icons = {
      success: (
        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      ),
      error: (
        <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      ),
      warning: (
        <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
      ),
      info: (
        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      )
    };

    return icons[type as keyof typeof icons] || icons.info;
  };

  return (
    <div className={getToastStyles(toast.type)}>
      <div className="flex items-start gap-3">
        {/* Icon */}
        {getToastIcon(toast.type)}
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm leading-5">
            {toast.title}
          </h4>
          {toast.message && (
            <p className="text-sm mt-1 opacity-90 leading-5">
              {toast.message}
            </p>
          )}
        </div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="flex-shrink-0 ml-2 p-1 rounded-full hover:bg-black hover:bg-opacity-10 transition-colors"
          aria-label="Close notification"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Progress Bar - Only for auto-dismiss toasts */}
      {toast.duration && toast.duration > 0 && (
        <div className="mt-3 w-full bg-current bg-opacity-20 rounded-full h-1">
          <div 
            className="h-1 bg-current rounded-full transition-all duration-100 ease-linear"
            style={{ 
              width: isLeaving ? '0%' : '100%',
              transition: `width ${toast.duration}ms linear`
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ToastMessage;