import React from 'react';

const Card = ({ children, className = '', variant = 'default', ...props }) => {
  const baseClasses = 'rounded-2xl transition-all duration-300 hover:shadow-xl';
  
  const variantClasses = {
    default: 'bg-white/80 backdrop-blur-sm shadow-lg border border-white/20 dark:bg-slate-800/80 dark:border-slate-700/50',
    glass: 'bg-white backdrop-blur-md shadow-xl border border-white/30 dark:bg-slate-800/60 dark:border-slate-700/30',
    solid: 'bg-white shadow-lg border border-slate-200 dark:bg-slate-800 dark:border-slate-700',
    gradient: 'bg-gradient-to-br from-white/90 to-slate-50/90 backdrop-blur-sm shadow-lg border border-white/20 dark:from-slate-800/90 dark:to-slate-900/90 dark:border-slate-700/50'
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