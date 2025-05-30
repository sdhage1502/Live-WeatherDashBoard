import React from 'react';

const Button = ({ onClick, icon: Icon, variant = 'primary', children, className = '', ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl focus:ring-blue-500 hover:scale-105 active:scale-95',
    secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-700 shadow-md hover:shadow-lg focus:ring-slate-500 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-200 dark:focus:ring-slate-400',
    glass: 'bg-white/80 hover:bg-white/90 backdrop-blur-sm text-slate-700 shadow-lg hover:shadow-xl focus:ring-blue-500 border border-white/20 hover:scale-105 active:scale-95 dark:bg-slate-800/80 dark:hover:bg-slate-700/90 dark:text-slate-200 dark:border-slate-700/50',
    minimal: 'bg-transparent hover:bg-slate-100 text-slate-600 hover:text-slate-900 focus:ring-slate-500 dark:hover:bg-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
  };

  return (
    <button 
      onClick={onClick} 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4 shrink-0" />}
      {children}
    </button>
  );
};

export default Button;