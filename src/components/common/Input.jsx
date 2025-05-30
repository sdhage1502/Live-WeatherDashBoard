function Input({ className = '', ...props }) {
  return (
    <input
      className={`flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white transition-colors duration-300 ${className}`}
      {...props}
    />
  );
}

export default Input;