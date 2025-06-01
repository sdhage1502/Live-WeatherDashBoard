import React from 'react';

const Card = ({ children, className = '', variant = 'default', ...props }) => {
  const baseClasses = 'rounded-2xl transition-all duration-300 hover:shadow-xl';
  
  const variantClasses = {
    default: 'bg-slate-800/80 backdrop-blur-sm shadow-lg border border-slate-700/50',
    glass: 'bg-slate-800/60 backdrop-blur-md shadow-xl border border-slate-700/30',
    solid: 'bg-gray-800 shadow-lg border border-slate-700',
    gradient: 'bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm shadow-lg border border-slate-700/50'
  };

  return (
    <div 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;