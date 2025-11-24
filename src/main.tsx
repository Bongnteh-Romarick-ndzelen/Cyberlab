import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { AuthProvider } from './contexts';
import { PortalProvider } from './contexts';
import { MentorshipProvider } from './contexts/MentorshipContext';
import { ToastProvider } from './contexts/ToastContext'; 
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <PortalProvider>
        <MentorshipProvider>
          <ToastProvider> 
            <App />
          </ToastProvider>
        </MentorshipProvider>
      </PortalProvider>
    </AuthProvider>
  </React.StrictMode>
);