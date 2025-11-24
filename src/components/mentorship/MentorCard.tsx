import React from "react";
import type { Mentor } from "../../contexts/MentorshipContext";

interface MentorCardProps {
  mentor: Mentor;
  onViewForums: (mentorId: string) => void;
}

const MentorCard: React.FC<MentorCardProps> = ({ mentor, onViewForums }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-2xl">
            {mentor.avatar}
          </div>
          <div
            className={`w-3 h-3 rounded-full mt-2 mx-auto ${
              mentor.online ? "bg-green-500" : "bg-gray-400"
            }`}
          ></div>
        </div>

        {/* Mentor Info */}
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {mentor.name}
              </h3>
              <p className="text-sm text-gray-600">{mentor.region} Region</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">⭐</span>
                <span className="font-semibold">{mentor.rating}</span>
              </div>
              <p className="text-xs text-gray-500">
                {mentor.studentsHelped} students
              </p>
            </div>
          </div>

          {/* Expertise */}
          <div className="mt-3">
            <div className="flex flex-wrap gap-1">
              {mentor.expertise.map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Bio */}
          <p className="text-sm text-gray-600 mt-3 line-clamp-2">
            {mentor.bio}
          </p>

          {/* Stats */}
          <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
            <span>Experience: {mentor.experience}</span>
            <span>{mentor.online ? "🟢 Online" : "⚫ Offline"}</span>
          </div>

          {/* Action Button */}
          <button
            onClick={() => onViewForums(mentor.id)}
            className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            View Forums
          </button>
        </div>
      </div>
    </div>
  );
};

export default MentorCard;
