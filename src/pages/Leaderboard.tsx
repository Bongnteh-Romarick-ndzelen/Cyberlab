import React from "react";
import { usePortal } from "../contexts";
import { useAuth } from "../contexts";

const Leaderboard: React.FC = () => {
  const { leaderboard } = usePortal();
  const { user } = useAuth();

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
        Leaderboard
      </h1>

      {/* Main Leaderboard */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        {/* Header - Hidden on mobile, shown on tablet+ */}
        <div className="hidden md:grid md:grid-cols-12 gap-4 p-4 bg-gray-50 font-semibold text-gray-700">
          <div className="col-span-1">Rank</div>
          <div className="col-span-5">User</div>
          <div className="col-span-3">Points</div>
          <div className="col-span-3">Solved</div>
        </div>

        {/* Leaderboard Items */}
        <div className="divide-y divide-gray-200">
          {leaderboard.map((entry, index) => (
            <div
              key={entry.userId}
              className={`p-4 sm:p-6 ${
                entry.userId === user?.id ? "bg-blue-50" : ""
              }`}
            >
              {/* Mobile Layout */}
              <div className="md:hidden">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-semibold ${
                            entry.userId === user?.id
                              ? "text-blue-600"
                              : "text-gray-900"
                          }`}
                        >
                          {entry.username}
                        </span>
                        {entry.userId === user?.id && (
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                            You
                          </span>
                        )}
                      </div>
                      <div className="flex gap-4 mt-1 text-sm text-gray-600">
                        <span>{entry.points} pts</span>
                        <span>•</span>
                        <span>{Math.floor(entry.points / 100)} solved</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden md:grid md:grid-cols-12 md:gap-4 md:items-center">
                <div className="col-span-1 font-bold text-lg">{index + 1}</div>
                <div className="col-span-5 flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {entry.username.charAt(0).toUpperCase()}
                  </div>
                  <span
                    className={
                      entry.userId === user?.id
                        ? "font-semibold text-blue-600"
                        : ""
                    }
                  >
                    {entry.username}
                    {entry.userId === user?.id && " (You)"}
                  </span>
                </div>
                <div className="col-span-3 font-semibold text-gray-900">
                  {entry.points} pts
                </div>
                <div className="col-span-3 text-gray-600">
                  {Math.floor(entry.points / 100)} challenges
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Regional Leaderboards Section */}
      <div className="mt-8">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">
          Regional Rankings
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3">
              Centre Region
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span>cybermaster</span>
                <span className="font-semibold">1,200 pts</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>techlearner</span>
                <span className="font-semibold">950 pts</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>codeguard</span>
                <span className="font-semibold">780 pts</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3">
              Littoral Region
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span>securitypro</span>
                <span className="font-semibold">1,150 pts</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>netdefender</span>
                <span className="font-semibold">890 pts</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>webguard</span>
                <span className="font-semibold">720 pts</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3">
              Northwest Region
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span>hackerman</span>
                <span className="font-semibold">980 pts</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>cybershield</span>
                <span className="font-semibold">850 pts</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>digitaldojo</span>
                <span className="font-semibold">690 pts</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats - Mobile Only */}
      <div className="md:hidden mt-6 bg-blue-50 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">Your Position</h3>
        {user && (
          <div className="flex justify-between items-center">
            <span className="text-blue-800">
              {leaderboard.findIndex((entry) => entry.userId === user.id) + 1}{" "}
              of {leaderboard.length}
            </span>
            <span className="text-blue-700 font-semibold">
              {leaderboard.find((entry) => entry.userId === user.id)?.points ||
                0}{" "}
              pts
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
