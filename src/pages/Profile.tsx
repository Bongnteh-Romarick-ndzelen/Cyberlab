import React from "react";
import { useAuth } from "../contexts";
import { usePortal } from "../contexts";

const Profile: React.FC = () => {
  const { user } = useAuth();
  const { userStats, challenges } = usePortal();

  type Challenge = {
    id: string;
    title: string;
    points: number;
    difficulty: "easy" | "medium" | "hard";
    isSolved: boolean;
  };

  const solvedChallenges: Challenge[] = (challenges as Challenge[]).filter(
    (c) => c.isSolved
  );
  const totalPoints = solvedChallenges.reduce(
    (sum, challenge) => sum + challenge.points,
    0
  );

  return (
    <div className="px-4 py-8 sm:p-6 max-w-4xl mx-auto mt-5">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">User Profile</h1>
        <p className="text-gray-600 text-sm sm:text-base mt-1">
          Manage your account and track your progress
        </p>
      </div>

      {/* Profile Overview */}
      <div className="bg-white rounded-xl sm:rounded-lg shadow-sm sm:shadow-md p-4 sm:p-6 mb-4 sm:mb-6">
        {/* User Info - Stack on mobile, side-by-side on larger screens */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-4 sm:mb-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-bold flex-shrink-0">
            {user?.username?.charAt(0).toUpperCase() || "U"}
          </div>
          <div className="text-center sm:text-left flex-1">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{user?.username}</h2>
            <p className="text-gray-600 text-sm sm:text-base mt-1">{user?.email}</p>
            <p className="text-gray-500 text-xs sm:text-sm mt-1">
              Member since {new Date().toLocaleDateString()}
            </p>
            {user?.region && (
              <p className="text-blue-600 text-xs sm:text-sm mt-1">
                📍 {user.region} Region
              </p>
            )}
          </div>
        </div>

        {/* Stats Grid - Single column on mobile, 3 columns on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div className="bg-blue-50 p-3 sm:p-4 rounded-lg text-center border border-blue-100">
            <div className="text-xl sm:text-2xl font-bold text-blue-700">
              {solvedChallenges.length}
            </div>
            <div className="text-blue-600 text-sm sm:text-base">Challenges Solved</div>
          </div>
          <div className="bg-green-50 p-3 sm:p-4 rounded-lg text-center border border-green-100">
            <div className="text-xl sm:text-2xl font-bold text-green-700">
              {totalPoints}
            </div>
            <div className="text-green-600 text-sm sm:text-base">Total Points</div>
          </div>
          <div className="bg-purple-50 p-3 sm:p-4 rounded-lg text-center border border-purple-100">
            <div className="text-xl sm:text-2xl font-bold text-purple-700">
              #{userStats.rank}
            </div>
            <div className="text-purple-600 text-sm sm:text-base">Global Rank</div>
          </div>
        </div>
      </div>

      {/* Solved Challenges */}
      <div className="bg-white rounded-xl sm:rounded-lg shadow-sm sm:shadow-md p-4 sm:p-6 mb-4 sm:mb-6">
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900">Solved Challenges</h3>
          <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
            {solvedChallenges.length} solved
          </span>
        </div>
        
        {solvedChallenges.length === 0 ? (
          <div className="text-center py-6 sm:py-8">
            <div className="text-gray-400 text-4xl mb-3">🎯</div>
            <p className="text-gray-500 text-sm sm:text-base">
              No challenges solved yet.
            </p>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">
              Start solving challenges to see your progress here!
            </p>
          </div>
        ) : (
          <div className="space-y-2 sm:space-y-3">
            {solvedChallenges.map((challenge) => (
              <div
                key={challenge.id}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 bg-gray-50 rounded-lg border border-gray-100"
              >
                <div className="flex-1 mb-2 sm:mb-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="font-medium text-sm sm:text-base text-gray-900">
                      {challenge.title}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs rounded-full w-fit ${
                        challenge.difficulty === "easy"
                          ? "bg-green-100 text-green-800"
                          : challenge.difficulty === "medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {challenge.difficulty}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between sm:justify-end items-center gap-4">
                  <span className="font-bold text-green-600 text-sm sm:text-base">
                    +{challenge.points} pts
                  </span>
                  <div className="w-2 h-2 bg-green-500 rounded-full hidden sm:block"></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Account Settings */}
      <div className="bg-white rounded-xl sm:rounded-lg shadow-sm sm:shadow-md p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Account Settings</h3>
        <div className="space-y-3 sm:space-y-4">
          <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base">
            <span>Change Password</span>
            <span className="text-gray-400">›</span>
          </button>
          <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base">
            <span>Notification Preferences</span>
            <span className="text-gray-400">›</span>
          </button>
          <button className="w-full flex items-center justify-between p-3 border border-red-200 rounded-lg text-red-600 hover:bg-red-50 transition-colors text-sm sm:text-base">
            <span>Delete Account</span>
            <span className="text-red-400">›</span>
          </button>
        </div>

        {/* Additional Info - Mobile Only */}
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100 sm:hidden">
          <p className="text-blue-800 text-xs text-center">
            📱 Profile optimized for mobile
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;