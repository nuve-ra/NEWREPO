import React from 'react';

const ViewToggle = ({ view, setView }) => {
  return (
    <div className="flex rounded-md overflow-hidden">
      <button
        onClick={() => setView('list')}
        className={`flex-1 py-2 px-4 ${
          view === 'list'
            ? 'bg-emerald-100 text-emerald-700'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        <i className="fas fa-list-ul"></i>
      </button>
      <button
        onClick={() => setView('grid')}
        className={`flex-1 py-2 px-4 ${
          view === 'grid'
            ? 'bg-emerald-100 text-emerald-700'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        <i className="fas fa-th-large"></i>
      </button>
    </div>
  );
};

export default ViewToggle;