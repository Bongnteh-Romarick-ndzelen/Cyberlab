import React, { useState } from 'react';

interface ChallengeSubmissionFormProps {
  onSubmit: (flag: string) => void;
  status: 'idle' | 'success' | 'error';
  isSolved: boolean;
}

const ChallengeSubmissionForm: React.FC<ChallengeSubmissionFormProps> = ({ 
  onSubmit, 
  status, 
  isSolved 
}) => {
  const [flag, setFlag] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (flag.trim()) {
      onSubmit(flag.trim());
      setFlag('');
    }
  };

  if (isSolved) {
    return (
      <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
        <div className="text-green-600 font-bold text-lg mb-2">✅ Challenge Completed!</div>
        <p className="text-green-700">You've successfully solved this challenge.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="flag" className="block text-sm font-medium text-gray-700 mb-2">
          Enter Flag
        </label>
        <input
          type="text"
          id="flag"
          value={flag}
          onChange={(e) => setFlag(e.target.value)}
          placeholder="FLAG{...}"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          disabled={status === 'success'}
        />
      </div>
      
      <button
        type="submit"
        disabled={!flag.trim() || status === 'success'}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {status === 'success' ? 'Challenge Solved!' : 'Submit Flag'}
      </button>
    </form>
  );
};

export default ChallengeSubmissionForm;