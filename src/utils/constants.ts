// src/utils/constants.ts

// User Interface
export interface User {
  id: string;
  username: string;
  email: string;
  fullName?: string;
  institution?: string;
  region?: string;
  role?: "student" | "mentor" | "admin";
}

// User Stats Interface
export interface UserStats {
  points: number;
  challengesSolved: number;
  rank: number;
  badges: string[];
  joinDate?: Date;
  lastActive?: Date;
}

// Challenge Interface
export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  points: number;
  category: string;
  isSolved: boolean;
  solution_flag: string;
  resources?: {
    name: string;
    url: string;
    description: string;
  }[];
  hints?: {
    content: string;
    pointCost: number;
  }[];
  maxAttempts?: number;
  timeLimit?: number;
}

// Initial Challenges Data
export const INITIAL_CHALLENGES: Challenge[] = [
  {
    id: "1",
    title: "Basic Password Cracking",
    description:
      "Learn the fundamentals of password security and cracking techniques.",
    difficulty: "easy",
    points: 100,
    category: "Cryptography",
    isSolved: false,
    solution_flag: "FLAG{basic_pass_123}",
    resources: [
      {
        name: "Password Cracking Guide",
        url: "https://example.com/password-guide",
        description: "Comprehensive guide to password security",
      },
    ],
    hints: [
      {
        content: "Try looking for common password patterns",
        pointCost: 10,
      },
    ],
    maxAttempts: 3,
  },
  {
    id: "2",
    title: "SQL Injection Attack",
    description:
      "Understand and exploit SQL injection vulnerabilities in web applications.",
    difficulty: "medium",
    points: 250,
    category: "Web Security",
    isSolved: false,
    solution_flag: "FLAG{sql_master_456}",
    resources: [
      {
        name: "SQL Injection Tutorial",
        url: "https://example.com/sql-tutorial",
        description: "Learn about SQL injection techniques",
      },
    ],
    maxAttempts: 5,
  },
  {
    id: "3",
    title: "Network Packet Analysis",
    description:
      "Analyze network traffic to identify security threats and anomalies.",
    difficulty: "hard",
    points: 500,
    category: "Network Security",
    isSolved: false,
    solution_flag: "FLAG{packet_expert_789}",
    resources: [
      {
        name: "Wireshark Documentation",
        url: "https://www.wireshark.org/docs/",
        description: "Official Wireshark documentation",
      },
    ],
  },
];

// Initial User Stats
export const INITIAL_USER_STATS: UserStats = {
  points: 0,
  challengesSolved: 0,
  rank: 999,
  badges: ["beginner"],
  joinDate: new Date(),
  lastActive: new Date(),
};

// Initial Leaderboard Data
export const INITIAL_LEADERBOARD = [
  { userId: "1", username: "cybermaster", points: 1200, region: "Centre" },
  { userId: "2", username: "securitypro", points: 950, region: "Littoral" },
  { userId: "3", username: "hackerman", points: 800, region: "Northwest" },
  { userId: "4", username: "codebreaker", points: 750, region: "Southwest" },
  { userId: "5", username: "netdefender", points: 600, region: "West" },
];

// Cameroon Regions for Forms
export const CAMEROON_REGIONS = [
  "Adamawa",
  "Centre",
  "East",
  "Far North",
  "Littoral",
  "North",
  "Northwest",
  "South",
  "Southwest",
  "West",
];

// Difficulty Colors
export const DIFFICULTY_COLORS = {
  easy: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  hard: "bg-red-100 text-red-800",
};

// Category Icons
export const CATEGORY_ICONS = {
  Cryptography: "🔐",
  "Web Security": "🌐",
  "Network Security": "📡",
  Forensics: "🔍",
  OSINT: "📊",
  "Reverse Engineering": "⚙️",
};

// YCBP Configuration
export const YCBP_CONFIG = {
  APP_NAME: "Youth Cyber Bootcamp Portal",
  VERSION: "1.0.0",
  NATIONAL_CERTIFICATION_LEVELS: {
    BRONZE: 500,
    SILVER: 1500,
    GOLD: 3000,
    PLATINUM: 5000,
  },
  CONTACT_EMAIL: "support@cyberlab-cm.org",
  SUPPORTED_LANGUAGES: ["en", "fr"],
};
