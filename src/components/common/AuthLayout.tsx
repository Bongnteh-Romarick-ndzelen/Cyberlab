import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-[350px]">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8 items-center justify-center">
            <img className="w-8 h-8 rounded-full " src="" alt="logo"/>
            <h1 className="text-3xl font-bold text-gray-900">CyberLab</h1>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;