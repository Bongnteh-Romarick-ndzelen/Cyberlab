import { createContext } from "react";
import type { Challenge, UserStats } from "../../utils/constants";

export interface PortalContextType {
  activeView: string;
  Maps: (view: string) => void;
  challenges: Challenge[];
  userStats: UserStats;
  leaderboard: Array<{
    userId: string;
    username: string;
    points: number;
    region?: string;
    avatar?: string;
  }>;
  handleChallengeSolve: (challengeId: string, userId: string) => void;
  updateUserStats: (newStats: Partial<UserStats>) => void;
}

// Context creation only - no provider logic
export const PortalContext = createContext<PortalContextType | undefined>(
  undefined
);
