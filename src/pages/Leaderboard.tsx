import React, { useContext } from "react";
import { PortalContext } from "../contexts/Portal/PortalContext";
import { AuthContext } from "../contexts/Auth/AuthContext";
import BadgeIcon from "../components/common/BadgeIcon";

const Leaderboard: React.FC = () => {
  const { leaderboard } = useContext(PortalContext);
  const { user } = useContext(AuthContext);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Leaderboard</h1>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 font-semibold text-gray-700">
          <div className="col-span-1">Rank</div>
          <div className="col-span-5">User</div>
          <div className="col-span-3">Points</div>
          <div className="col-span-3">Solved</div>
        </div>

        <div className="divide-y divide-gray-200">
          {leaderboard.map((entry, index) => (
            <div
              key={entry.userId}
              className={`grid grid-cols-12 gap-4 p-4 items-center ${
                entry.userId === user?.id ? "bg-blue-50" : ""
              }`}
            >
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
          ))}
        </div>
      </div>

      {/* Regional Leaderboards Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Regional Rankings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="font-semibold text-lg mb-3">Centre Region</h3>
            {/* Add regional leaderboard data here */}
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="font-semibold text-lg mb-3">Littoral Region</h3>
            {/* Add regional leaderboard data here */}
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="font-semibold text-lg mb-3">Northwest Region</h3>
            {/* Add regional leaderboard data here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
