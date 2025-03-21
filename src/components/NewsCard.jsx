import React from 'react';
import { X } from 'lucide-react';

const NewsCard = ({ image, date, title, onRemove }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm relative">
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded-full"
      >
        <X className="w-4 h-4 text-gray-400" />
      </button>
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover rounded-lg mb-3"
      />
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs text-gray-500">{date}</span>
      </div>
      <p className="text-sm text-gray-700">{title}</p>
    </div>
  );
};

export default NewsCard;