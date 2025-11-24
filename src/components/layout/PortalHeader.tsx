import React, { useState } from 'react';
import { useAuth } from '../../contexts';
import { usePortal } from '../../contexts';
import MobileMenu from './MobileMenu';
import LogoutModal from './LogoutModal';

const PortalHeader: React.FC = () => {
  const { user, logout } = useAuth();
  const { activeView, Maps, userStats } = usePortal();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const navigationItems = [
    { key: "challenges", label: "Challenges", icon: "🎯" },
    { key: "leaderboard", label: "Leaderboard", icon: "🏆" },
    { key: "mentorship", label: "Mentorship", icon: "👥" },
    { key: "profile", label: "Profile", icon: "👤" },
  ];

  const handleNavigation = (key: string) => {
    Maps(key);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsLogoutModalOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white shadow-lg border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Single row for all screen sizes */}
          <div className="flex justify-between items-center h-16">
            {/* Left: Logo and Brand */}
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center mr-3 shadow-md">
                <span className="text-white font-bold text-sm">YC</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-900">CyberLab</h1>
                <p className="text-xs text-gray-500">Youth Cyber Bootcamp</p>
              </div>
            </div>

            {/* Center: Desktop Navigation (Hidden on mobile) */}
            <nav className="hidden md:flex space-x-1">
              {navigationItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleNavigation(item.key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    activeView === item.key
                      ? "bg-blue-100 text-blue-700 shadow-inner"
                      : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Right: User Info and Actions */}
            <div className="flex items-center space-x-3">
              {/* User Info - Show on all screens */}
              <div className="flex items-center space-x-3">
                {/* Points - Hidden on smallest mobile, shown on sm+ */}
                <div className="hidden xs:flex flex-col items-end">
                  <p className="text-sm font-semibold text-gray-900 leading-tight">
                    {user?.username}
                  </p>
                  <p className="text-xs text-gray-500 font-medium leading-tight">
                    {userStats.points} pts
                  </p>
                </div>
                
                {/* Avatar - Always visible */}
                <div className="w-9 h-9 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-sm">
                  {user?.username?.charAt(0).toUpperCase() || "U"}
                </div>
              </div>

              {/* Mobile Menu Button - Only on mobile */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                aria-label="Open menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              {/* Desktop Logout Button */}
              <button
                onClick={() => setIsLogoutModalOpen(true)}
                className="hidden md:flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors shadow-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>

              {/* Mobile Logout Button */}
              <button
                onClick={() => setIsLogoutModalOpen(true)}
                className="md:hidden bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-colors"
                aria-label="Logout"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>

          {/* Remove the separate mobile points bar - everything is now in one row */}
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navigationItems={navigationItems}
        activeView={activeView}
        onNavigate={handleNavigation}
      />

      {/* Logout Confirmation Modal */}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
        username={user?.username}
      />
    </>
  );
};

export default PortalHeader;