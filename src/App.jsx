import React, { useState, lazy, Suspense } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

// Lazy Loading Components
const NewsFeed = lazy(() => import('./components/NewsFeed'));
const Feedback = lazy(() => import('./components/Feedback'));
const ViewToggle = lazy(() => import('./components/ViewToggle'));
const Community = lazy(() => import('./components/Community'));

// Sidebar Component
const Sidebar = ({ view, setView, navigate }) => (
  <div className="col-span-3">
    {/* User Info */}
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
          <img src="https://via.placeholder.com/40" alt="User" className="w-full h-full object-cover" />
        </div>
        <div>
          <h2 className="font-medium text-sm">Hi Reader,</h2>
          <p className="text-xs text-gray-600">Here's your News!</p>
        </div>
      </div>
    </div>

    {/* View Toggle */}
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <h3 className="font-medium text-sm mb-3">View Toggle</h3>
      <ViewToggle view={view} setView={setView} />
    </div>

    {/* Community Button */}
    <div
      className="bg-white rounded-lg shadow-sm p-4 mb-4 cursor-pointer hover:bg-gray-50"
      onClick={() => navigate('/community')}
    >
      <div className="flex items-center gap-2">
        <FontAwesomeIcon icon={faUsers} className="text-gray-600" />
        <span className="font-medium text-sm">Community</span>
      </div>
    </div>

    {/* Feedback */}
    <Feedback />
  </div>
);

function App() {
  const [view, setView] = useState('grid');
  const navigate = useNavigate();

  return (
    <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
      <Routes>
        <Route path="/community" element={<Community />} />
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-gray-100">
              <main className="container mx-auto px-4 py-8">
                <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8">
                  {/* Sidebar */}
                  <Sidebar view={view} setView={setView} navigate={navigate} />

                  {/* Main Content */}
                  <div className="col-span-9">
                    <NewsFeed view={view} />
                  </div>
                </div>
              </main>
            </div>
          }
        />
      </Routes>
    </Suspense>
  );
}

export default App;
