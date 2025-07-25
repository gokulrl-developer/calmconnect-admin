import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', hover = false }) => {
  return (
    <div className={`glass-card ${hover ? 'hover:shadow-xl hover:scale-[1.02]' : ''} transition-all duration-300 ${className}`}>
      {children}
    </div>
  );
};

export default Card;