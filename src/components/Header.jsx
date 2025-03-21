import React from 'react';

const Header = () => {
  const navItems = [
    { label: 'About FIRST', url: '#' },
    { label: 'Membership', url: '#' },
    { label: 'Solutions', url: '#' },
    { label: 'Standards & Publications', url: '#' },
    { label: 'Events', url: '#' },
    { label: 'Education', url: '#' },
    { label: 'News', url: '#' }
  ];

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto">
        {/* Top bar with social icons */}
        <div className="bg-[#008751] text-white py-1 px-4 flex justify-end space-x-4">
          <a href="#" className="hover:text-gray-200">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="hover:text-gray-200">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="hover:text-gray-200">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a href="#" className="hover:text-gray-200">
            <i className="fab fa-youtube"></i>
          </a>
        </div>

        {/* Main header with logo and navigation */}
        <div className="py-4 px-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-[#008751]">FIRST</div>
            <nav className="hidden md:flex space-x-6">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.url}
                  className="text-gray-700 hover:text-[#008751] text-sm"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;