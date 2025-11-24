import React from "react";
import { useToast } from "../../contexts/ToastContext";
import type { Toast } from "../../contexts/ToastContext";

import ToastMessage from "./ToastMessage";

const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-[100] space-y-3 max-w-sm w-full">
      {toasts.map((toast) => (
        <ToastMessage
          key={toast.id}
          toast={toast}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

export default ToastContainer;
