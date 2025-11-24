import React from "react";
import type { Forum } from "../../contexts/MentorshipContext";

interface ForumCardProps {
  forum: Forum;
  onJoin: (forumId: string) => void;
  onEnter: (forum: Forum) => void;
}

const ForumCard: React.FC<ForumCardProps> = ({ forum, onJoin, onEnter }) => {
  const getCategoryColor = (category: string) => {
    const colors = {
      "web-security": "bg-red-100 text-red-800",
      cryptography: "bg-purple-100 text-purple-800",
      network: "bg-blue-100 text-blue-800",
      forensics: "bg-green-100 text-green-800",
      career: "bg-orange-100 text-orange-800",
    };
    return (
      colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
    );
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      "web-security": "🌐",
      cryptography: "🔐",
      network: "📡",
      forensics: "🔍",
      career: "💼",
    };
    return icons[category as keyof typeof icons] || "💬";
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">{getCategoryIcon(forum.category)}</span>
          <h3 className="text-lg font-semibold text-gray-900">{forum.name}</h3>
        </div>
        <span
          className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(
            forum.category
          )}`}
        >
          {forum.category.replace("-", " ")}
        </span>
      </div>

      <p className="text-gray-600 text-sm mb-4">{forum.description}</p>

      <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
        <span>👥 {forum.memberCount} members</span>
        <span>{forum.isPublic ? "🔓 Public" : "🔒 Private"}</span>
      </div>

      {forum.joined ? (
        <button
          onClick={() => onEnter(forum)}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium"
        >
          Enter Forum
        </button>
      ) : (
        <button
          onClick={() => onJoin(forum.id)}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Join Forum
        </button>
      )}
    </div>
  );
};

export default ForumCard;
