import React, { useState } from "react";
import type { ReactNode } from "react";
import {
  INITIAL_CHALLENGES,
  INITIAL_USER_STATS,
  INITIAL_LEADERBOARD,
} from "../../utils/constants";
import type { Challenge, UserStats } from "../../utils/constants";
import { PortalContext } from "./PortalContext";
import type { PortalContextType } from "./PortalContext";

interface PortalProviderProps {
  children: ReactNode;
}

export const PortalProvider: React.FC<PortalProviderProps> = ({ children }) => {
  const [activeView, setActiveView] = useState("challenges");
  const [challenges, setChallenges] = useState<Challenge[]>(INITIAL_CHALLENGES);
  const [userStats, setUserStats] = useState<UserStats>(INITIAL_USER_STATS);
  const [leaderboard, setLeaderboard] = useState(INITIAL_LEADERBOARD);

  const Maps = (view: string) => {
    console.log("Navigating to:", view);
    setActiveView(view);
  };

  const handleChallengeSolve = (challengeId: string, userId: string) => {
    setChallenges((prevChallenges) =>
      prevChallenges.map((challenge) =>
        challenge.id === challengeId
          ? { ...challenge, isSolved: true }
          : challenge
      )
    );

    const solvedChallenge = challenges.find((c) => c.id === challengeId);
    if (solvedChallenge) {
      setUserStats((prevStats) => ({
        ...prevStats,
        points: prevStats.points + solvedChallenge.points,
        challengesSolved: prevStats.challengesSolved + 1,
        rank: Math.max(1, prevStats.rank - 1),
      }));

      setLeaderboard((prev) =>
        prev
          .map((entry) =>
            entry.userId === userId
              ? {
                  ...entry,
                  points: entry.points + solvedChallenge.points,
                }
              : entry
          )
          .sort((a, b) => b.points - a.points)
      );
    }
  };

  const updateUserStats = (newStats: Partial<UserStats>) => {
    setUserStats((prev) => ({ ...prev, ...newStats }));
  };

  const contextValue: PortalContextType = {
    activeView,
    Maps,
    challenges,
    userStats,
    leaderboard,
    handleChallengeSolve,
    updateUserStats,
  };

  return (
    <PortalContext.Provider value={contextValue}>
      {children}
    </PortalContext.Provider>
  );
};

export default PortalProvider;
