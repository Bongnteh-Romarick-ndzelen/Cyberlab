import React from 'react';

interface BadgeIconProps {
  type: string;
  className?: string;
}

const BadgeIcon: React.FC<BadgeIconProps> = ({ type, className = '' }) => {
  const getBadgeContent = (type: string) => {
    switch (type) {
      case 'first_blood':
        return '🩸';
      case 'solver':
        return '✅';
      case 'streak':
        return '🔥';
      case 'master':
        return '👑';
      default:
        return '🏆';
    }
  };

  return (
    <span className={`inline-flex items-center justify-center ${className}`}>
      {getBadgeContent(type)}
    </span>
  );
};

export default BadgeIcon