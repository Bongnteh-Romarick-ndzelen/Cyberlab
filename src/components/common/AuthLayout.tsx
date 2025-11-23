import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-[350px]">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Perfectly centered logo section */}
          <div className="flex flex-col items-center justify-center mb-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full flex items-center justify-center mb-1 shadow-md">
              <span className="text-white font-bold text-sm">CYCB</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">CyberLab</h1>
            <p className="text-gray-600 text-sm mt-1">Cameroon Youth Cyber Bootcamp</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
