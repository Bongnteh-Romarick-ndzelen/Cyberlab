import React from "react";
import { useAuth } from "../../contexts";
import { usePortal } from "../../contexts";

const PortalHeader: React.FC = () => {
  const { user, logout } = useAuth();
  const { activeView, Maps, userStats } = usePortal();

  const navigationItems = [
    { key: "challenges", label: "Challenges", icon: "🎯" },
    { key: "leaderboard", label: "Leaderboard", icon: "🏆" },
    { key: "mentorship", label: "Mentorship", icon: "👥" },
    { key: "profile", label: "Profile", icon: "👤" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white font-bold text-sm">YC</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">CyberLab</h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navigationItems.map((item) => (
              <button
                key={item.key}
                onClick={() => Maps(item.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  activeView === item.key
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>

          {/* User Info and Logout */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {user?.username}
                </p>
                <p className="text-xs text-gray-500">
                  {userStats.points} points
                </p>
              </div>
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                {user?.username?.charAt(0).toUpperCase() || "U"}
              </div>
            </div>
            <button
              onClick={logout}
              className="bg-red-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-gray-200">
          <nav className="flex overflow-x-auto py-2 space-x-1">
            {navigationItems.map((item) => (
              <button
                key={item.key}
                onClick={() => Maps(item.key)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 whitespace-nowrap ${
                  activeView === item.key
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <span className="text-xs">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default PortalHeader;
