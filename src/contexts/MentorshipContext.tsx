import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export interface Mentor {
  id: string;
  name: string;
  expertise: string[];
  bio: string;
  experience: string;
  rating: number;
  studentsHelped: number;
  avatar: string;
  region: string;
  online: boolean;
}

export interface Forum {
  id: string;
  name: string;
  description: string;
  mentorId: string;
  memberCount: number;
  category:
    | "web-security"
    | "cryptography"
    | "network"
    | "forensics"
    | "career";
  isPublic: boolean;
  joined: boolean;
}

export interface Message {
  id: string;
  userId: string;
  username: string;
  content: string;
  timestamp: Date;
  isMentor: boolean;
}

interface MentorshipContextType {
  mentors: Mentor[];
  forums: Forum[];
  currentForum: Forum | null;
  messages: Message[];
  hasJoinedForum: boolean;
  joinForum: (forumId: string) => void;
  leaveForum: (forumId: string) => void;
  setCurrentForum: (forum: Forum | null) => void;
  sendMessage: (content: string) => void;
}

const MentorshipContext = createContext<MentorshipContextType | undefined>(
  undefined
);

export const MentorshipProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [mentors, setMentors] = useState<Mentor[]>([
    {
      id: "1",
      name: "Dr. Kwasi Mensah",
      expertise: ["Web Security", "Ethical Hacking", "OWASP"],
      bio: "Senior Cybersecurity Consultant with 8+ years experience. Specialized in web application security and penetration testing.",
      experience: "8 years",
      rating: 4.9,
      studentsHelped: 127,
      avatar: "👨‍💼",
      region: "Centre",
      online: true,
    },
    {
      id: "2",
      name: "Amina Bello",
      expertise: ["Cryptography", "Network Security", "Digital Forensics"],
      bio: "Security Researcher and University Lecturer. Passionate about teaching cryptography fundamentals.",
      experience: "6 years",
      rating: 4.8,
      studentsHelped: 89,
      avatar: "👩‍🏫",
      region: "Littoral",
      online: false,
    },
    {
      id: "3",
      name: "Chijioke Nwankwo",
      expertise: ["Network Defense", "SOC Operations", "Incident Response"],
      bio: "CERT Team Lead. Focused on practical network defense strategies and real-world incident handling.",
      experience: "10 years",
      rating: 4.9,
      studentsHelped: 156,
      avatar: "👨‍🔬",
      region: "Southwest",
      online: true,
    },
  ]);

  const [forums, setForums] = useState<Forum[]>([
    {
      id: "1",
      name: "Web App Security Mastery",
      description:
        "Discuss OWASP Top 10, penetration testing methodologies, and secure coding practices.",
      mentorId: "1",
      memberCount: 45,
      category: "web-security",
      isPublic: true,
      joined: false,
    },
    {
      id: "2",
      name: "Cryptography & Encryption",
      description:
        "Learn about encryption algorithms, hashing, and cryptographic protocols.",
      mentorId: "2",
      memberCount: 32,
      category: "cryptography",
      isPublic: true,
      joined: true,
    },
    {
      id: "3",
      name: "Network Defense Strategies",
      description:
        "Share network monitoring techniques, firewall configurations, and intrusion detection.",
      mentorId: "3",
      memberCount: 28,
      category: "network",
      isPublic: true,
      joined: false,
    },
    {
      id: "4",
      name: "Career Guidance & Internships",
      description:
        "Get advice on cybersecurity career paths, certifications, and job opportunities.",
      mentorId: "1",
      memberCount: 67,
      category: "career",
      isPublic: true,
      joined: false,
    },
  ]);

  const [currentForum, setCurrentForum] = useState<Forum | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [hasJoinedForum, setHasJoinedForum] = useState<boolean>(false);

  const joinForum = (forumId: string) => {
    setForums((prev) =>
      prev.map((forum) =>
        forum.id === forumId
          ? { ...forum, joined: true, memberCount: forum.memberCount + 1 }
          : forum
      )
    );
    setHasJoinedForum(true);
  };

  const leaveForum = (forumId: string) => {
    setForums((prev) =>
      prev.map((forum) =>
        forum.id === forumId
          ? { ...forum, joined: false, memberCount: forum.memberCount - 1 }
          : forum
      )
    );
    setHasJoinedForum(false);
    setCurrentForum(null);
  };

  const sendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      userId: "current-user",
      username: "You",
      content,
      timestamp: new Date(),
      isMentor: false,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <MentorshipContext.Provider
      value={{
        mentors,
        forums,
        currentForum,
        messages,
        hasJoinedForum,
        joinForum,
        leaveForum,
        setCurrentForum,
        sendMessage,
      }}
    >
      {children}
    </MentorshipContext.Provider>
  );
};

export const useMentorship = () => {
  const context = useContext(MentorshipContext);
  if (!context) {
    throw new Error("useMentorship must be used within a MentorshipProvider");
  }
  return context;
};
