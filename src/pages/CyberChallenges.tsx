import React, { useContext } from "react";
import { PortalContext } from "../contexts/Portal/PortalContext";
import { AuthContext } from "../contexts/Auth/AuthContext";

const CyberChallenges: React.FC = () => {
  const { challenges, Maps } = useContext(PortalContext);
  const { user } = useContext(AuthContext);

  const handleChallengeClick = (challengeId: string) => {
    Maps(`challenge-${challengeId}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Cyber Security Challenges</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map((challenge) => (
          <div
            key={challenge.id}
            className={`bg-white rounded-lg shadow-md overflow-hidden border-2 ${
              challenge.isSolved ? "border-green-500" : "border-gray-200"
            } transition-transform hover:scale-105 cursor-pointer`}
            onClick={() => handleChallengeClick(challenge.id)}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold text-gray-900">
                  {challenge.title}
                </h3>
                {challenge.isSolved && (
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    SOLVED
                  </span>
                )}
              </div>

              <p className="text-gray-600 mb-4 line-clamp-2">
                {challenge.description}
              </p>

              <div className="flex justify-between items-center">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    challenge.difficulty === "easy"
                      ? "bg-green-100 text-green-800"
                      : challenge.difficulty === "medium"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {challenge.difficulty.toUpperCase()}
                </span>
                <span className="font-bold text-gray-900">
                  {challenge.points} pts
                </span>
              </div>

              <button
                className={`w-full mt-4 py-2 px-4 rounded-lg font-medium ${
                  challenge.isSolved
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
                disabled={challenge.isSolved}
                onClick={(e) => {
                  e.stopPropagation();
                  handleChallengeClick(challenge.id);
                }}
              >
                {challenge.isSolved ? "Completed" : "Start Challenge"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CyberChallenges;
