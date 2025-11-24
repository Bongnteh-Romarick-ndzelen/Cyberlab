import React, { useState } from "react";
import { useAuth } from "../contexts";
import { usePortal } from "../contexts";

const ChallengeDetail: React.FC = () => {
  const { user } = useAuth();
  const { activeView, challenges, handleChallengeSolve, Maps } = usePortal();

  // State for user input (the "flag") and submission status
  const [submission, setSubmission] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Extract challenge ID from activeView (format: "challenge-{id}")
  const challengeId = activeView.replace('challenge-', '');
  
  // Find the current challenge
  const challenge = challenges.find(c => c.id === challengeId);

  if (!challenge) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-red-600">Challenge Not Found</h1>
        <p>The requested challenge could not be found.</p>
      </div>
    );
  }

  // --- Submission Logic ---
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage("");
    setSubmissionStatus('idle');

    if (challenge.isSolved) {
      setStatusMessage("Already completed!");
      setSubmissionStatus('error');
      return;
    }

    if (submission.trim() === challenge.solution_flag) {
      handleChallengeSolve(challenge.id, user?.id || '');
      setStatusMessage(`Success! You earned ${challenge.points} points.`);
      setSubmissionStatus('success');
      
      setTimeout(() => {
        Maps('challenges'); // Go back to the challenges list
      }, 2000);
    } else {
      setStatusMessage("Incorrect flag. Try again.");
      setSubmissionStatus('error');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto mt-8">
      <button
        onClick={() => Maps('challenges')}
        className="mb-6 text-blue-600 hover:text-blue-500 flex items-center text-sm font-medium"
      >
        <span className="mr-1">&larr;</span> Back to Challenges
      </button>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{challenge.title}</h1>
            <div className="flex items-center gap-4 mt-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                challenge.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                challenge.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {challenge.difficulty.toUpperCase()}
              </span>
              <span className="text-gray-600">{challenge.points} points</span>
              {challenge.isSolved && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  SOLVED
                </span>
              )}
            </div>
          </div>
        </div>

        <p className="text-gray-700 mb-6 text-lg">{challenge.description}</p>

        {/* Challenge Resources */}
        {challenge.resources && challenge.resources.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Resources & Links</h3>
            <div className="space-y-2">
              {challenge.resources.map((resource, index) => (
                <a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <span className="font-medium text-blue-700">{resource.name}</span>
                  <p className="text-sm text-blue-600 mt-1">{resource.description}</p>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Instructions Block */}
        <div className="p-4 rounded-lg mb-6 bg-gray-50 border border-gray-200">
          <h4 className="font-bold mb-2 text-md text-gray-900">Instructions:</h4>
          <p className="text-sm text-gray-700">
            {"{...}"}'.
            {challenge.hints && challenge.hints.length > 0 && (
              <span className="block mt-2 text-amber-700">
                💡 Hint: {challenge.hints[0].content}
              </span>
            )}
          </p>
        </div>
      </div>

      {/* --- Submission Form --- */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Submit Flag</h2>
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="flag-input"
            className="block font-semibold mb-2 text-gray-700"
          >
            Submit Flag:
          </label>
          <input
            id="flag-input"
            type="text"
            value={submission}
            onChange={(e) => setSubmission(e.target.value)}
            placeholder="Enter the flag you found (e.g., FLAG{...})"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
            disabled={challenge.isSolved}
          />

          <button
            type="submit"
            className={`mt-4 w-full py-3 rounded-lg font-bold transition duration-200 ${
              challenge.isSolved
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            }`}
            disabled={challenge.isSolved}
          >
            {challenge.isSolved ? "Challenge Complete" : "Submit Solution"}
          </button>

          {statusMessage && (
            <p
              className={`mt-3 text-center font-medium ${
                submissionStatus === 'success'
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {statusMessage}
            </p>
          )}

          {submissionStatus === 'success' && (
            <div className="mt-4 p-4 bg-green-100 border border-green-400 rounded-lg">
              <p className="text-green-800 font-medium">🎉 Correct! Challenge completed!</p>
              <p className="text-green-700 text-sm mt-1">
                +{challenge.points} points added to your score.
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ChallengeDetail;