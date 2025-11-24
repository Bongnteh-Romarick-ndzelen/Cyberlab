import React from "react";
import { useAuth } from "./contexts";
import { usePortal } from "./contexts";
import AuthLayout from "./components/common/AuthLayout";
import {PortalLayout} from "./components/layout/PortalLayout";
import Login from "./pages/LoginAndSignUp/Login";
import SignUp from "./pages/LoginAndSignUp/Signup";
import CyberChallenges from "./pages/CyberChallenges";
import ChallengeDetail from "./pages/ChallengeDetails";
import Leaderboard from "./pages/Leaderboard";
import Mentorship from "./pages/Mentorship";
import Profile from "./pages/Profile";

const App: React.FC = () => {
  const { user, isLoading } = useAuth();
  const { activeView } = usePortal();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <div className="text-lg text-gray-600">Loading CyberLab...</div>
        </div>
      </div>
    );
  }

  // Authentication pages
  if (!user) {
    return (
      <AuthLayout
        title={activeView === "login" ? "Welcome Back" : "Join CyberLab"}
        subtitle={
          activeView === "login"
            ? "Sign in to continue your cybersecurity journey"
            : "Start your cybersecurity journey today"
        }
      >
        {activeView === "login" ? <Login /> : <SignUp />}
      </AuthLayout>
    );
  }

  // Main portal with navigation
  return (
    <PortalLayout>
      {activeView === "challenges" && <CyberChallenges />}
      {activeView.startsWith("challenge-") && <ChallengeDetail />}
      {activeView === "leaderboard" && <Leaderboard />}
      {activeView === "mentorship" && <Mentorship />}
      {activeView === "profile" && <Profile />}

      {/* Default to challenges if no matching route */}
      {!["challenges", "leaderboard", "mentorship", "profile"].some(
        (view) => activeView === view || activeView.startsWith("challenge-")
      ) && <CyberChallenges />}
    </PortalLayout>
  );
};

export default App;
