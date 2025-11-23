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
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">User Profile</h1>

      {/* Profile Overview */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center gap-6 mb-6">
          <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {user?.username?.charAt(0).toUpperCase() || "U"}
          </div>
          <div>
            <h2 className="text-2xl font-bold">{user?.username}</h2>
            <p className="text-gray-600">{user?.email}</p>
            <p className="text-sm text-gray-500">
              Member since {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-700">
              {solvedChallenges.length}
            </div>
            <div className="text-blue-600">Challenges Solved</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-700">
              {totalPoints}
            </div>
            <div className="text-green-600">Total Points</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-700">
              {userStats.rank}
            </div>
            <div className="text-purple-600">Global Rank</div>
          </div>
        </div>
      </div>

      {/* Solved Challenges */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold mb-4">Solved Challenges</h3>
        {solvedChallenges.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            No challenges solved yet.
          </p>
        ) : (
          <div className="space-y-3">
            {solvedChallenges.map((challenge) => (
              <div
                key={challenge.id}
                className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <span className="font-medium">{challenge.title}</span>
                  <span
                    className={`ml-3 px-2 py-1 text-xs rounded-full ${
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
                <span className="font-bold text-green-600">
                  +{challenge.points} pts
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Account Settings */}
      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <h3 className="text-xl font-bold mb-4">Account Settings</h3>
        <div className="space-y-4">
          <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
            Change Password
          </button>
          <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
            Notification Preferences
          </button>
          <button className="w-full text-left p-3 border border-red-200 rounded-lg text-red-600 hover:bg-red-50">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
