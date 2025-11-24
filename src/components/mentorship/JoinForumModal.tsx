import React from 'react';
import type { Forum } from '../../contexts/MentorshipContext';

interface JoinForumModalProps {
  forum: Forum | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (forumId: string) => void;
}

const JoinForumModal: React.FC<JoinForumModalProps> = ({ 
  forum, 
  isOpen, 
  onClose, 
  onConfirm 
}) => {
  if (!isOpen || !forum) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 mt-5">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">👥</span>
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Join {forum.name}?
          </h3>
          
          <p className="text-gray-600 mb-6">
            You're about to join this forum. Once joined, you can participate in discussions, 
            ask questions, and interact with the mentor and other members.
          </p>

          <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
            <h4 className="font-semibold text-blue-900 mb-2">Forum Rules:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>✅ Be respectful to all members</li>
              <li>✅ Stay on topic related to cybersecurity</li>
              <li>✅ No sharing of illegal content</li>
              <li>✅ Help other learners when possible</li>
            </ul>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-400 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={() => onConfirm(forum.id)}
              className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Join Forum
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinForumModal;