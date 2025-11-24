import React, { useState } from 'react';
import { useMentorship } from '../contexts/MentorshipContext';
import MentorCard from '../components/mentorship/MentorCard';
import ForumCard from '../components/mentorship/ForumCard';
import JoinForumModal from '../components/mentorship/JoinForumModal';
import ForumChat from '../components/mentorship/ForumChat';

const Mentorship: React.FC = () => {
  const { 
    mentors, 
    forums, 
    currentForum, 
    setCurrentForum, 
    joinForum 
  } = useMentorship();
  
  const [selectedMentorId, setSelectedMentorId] = useState<string | null>(null);
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [forumToJoin, setForumToJoin] = useState<string | null>(null);

  // Filter forums by selected mentor
  const filteredForums = selectedMentorId 
    ? forums.filter(forum => forum.mentorId === selectedMentorId)
    : forums;

  const handleViewForums = (mentorId: string) => {
    setSelectedMentorId(mentorId);
  };

  const handleBackToMentors = () => {
    setSelectedMentorId(null);
  };

  const handleJoinForum = (forumId: string) => {
    setForumToJoin(forumId);
    setJoinModalOpen(true);
  };

  const handleConfirmJoin = (forumId: string) => {
    joinForum(forumId);
    setJoinModalOpen(false);
    setForumToJoin(null);
  };

  const handleEnterForum = (forum: (typeof forums)[number]) => {
    setCurrentForum(forum);
  };

  const handleLeaveForum = () => {
    setCurrentForum(null);
  };

  // If user is in a forum chat, show the chat interface
  if (currentForum) {
    return (
      <div className="p-4 md:p-8 max-w-6xl mx-auto mt-5">
        <ForumChat forum={currentForum} onLeave={handleLeaveForum} />
      </div>
    );
  }

  // If viewing forums for a specific mentor
  if (selectedMentorId) {
    const mentor = mentors.find(m => m.id === selectedMentorId);
    
    return (
      <div className="p-4 md:p-8 max-w-6xl mx-auto mt-5">
        {/* Header */}
        <div className="mb-6 mt-10">
          <button
            onClick={handleBackToMentors}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
          >
            <span>←</span>
            Back to All Mentors
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {mentor?.name}'s Forums
          </h1>
          <p className="text-gray-600 mt-2">
            Join forums led by {mentor?.name} to get expert guidance
          </p>
        </div>

        {/* Forums Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-15">
          {filteredForums.map(forum => (
            <ForumCard
              key={forum.id}
              forum={forum}
              onJoin={handleJoinForum}
              onEnter={handleEnterForum}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredForums.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💬</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Forums Available
            </h3>
            <p className="text-gray-600">
              {mentor?.name} hasn't created any forums yet.
            </p>
          </div>
        )}

        {/* Join Modal */}
        <JoinForumModal
          forum={forumToJoin ? forums.find(f => f.id === forumToJoin) || null : null}
          isOpen={joinModalOpen}
          onClose={() => setJoinModalOpen(false)}
          onConfirm={handleConfirmJoin}
        />
      </div>
    );
  }

  // Main mentors view
  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto mt-8 pt-8">
      {/* Header */}
      <div className="mb-8 mt-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Cybersecurity Mentorship
        </h1>
        <p className="text-gray-600 text-lg">
          Connect with experienced cybersecurity professionals and join specialized forums
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 mt-8">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-700">{mentors.length}</div>
          <div className="text-blue-600">Expert Mentors</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-700">
            {forums.reduce((sum, forum) => sum + forum.memberCount, 0)}
          </div>
          <div className="text-green-600">Active Members</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-700">{forums.length}</div>
          <div className="text-purple-600">Specialized Forums</div>
        </div>
      </div>

      {/* Mentors Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {mentors.map(mentor => (
          <MentorCard
            key={mentor.id}
            mentor={mentor}
            onViewForums={handleViewForums}
          />
        ))}
      </div>

      {/* Join Modal */}
      <JoinForumModal
        forum={forumToJoin ? forums.find(f => f.id === forumToJoin) || null : null}
        isOpen={joinModalOpen}
        onClose={() => setJoinModalOpen(false)}
        onConfirm={handleConfirmJoin}
      />
    </div>
  );
};

export default Mentorship;