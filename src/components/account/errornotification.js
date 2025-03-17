// components/ErrorNotification.js
const ErrorNotification = ({ message, onClose }) => {
  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-md flex items-center justify-between">
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-4 text-red-700 hover:text-red-900 focus:outline-none"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ErrorNotification;
