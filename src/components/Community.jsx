import React, { useState } from 'react';
import { Twitter, Linkedin, Facebook, Github, Youtube, Trophy, ChevronDown } from 'lucide-react';

function Community() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header with Logo and Navigation */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto">
          {/* Logo Section */}
          <div className="relative">
            <div className="absolute top-0 left-0 w-full h-32 bg-[url('https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80')] bg-cover bg-center"></div>
            <div className="relative pt-4 px-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <img 
                    src="https://images.unsplash.com/photo-1633409361618-c73427e4e206?ixlib=rb-1.2.1&auto=format&fit=crop&w=80&h=80&q=80"
                    alt="FIRST Logo"
                    className="h-16 w-auto"
                  />
                </div>
                <div className="flex space-x-2">
                  <Twitter className="w-5 h-5 text-gray-600 hover:text-blue-400 cursor-pointer" />
                  <Linkedin className="w-5 h-5 text-gray-600 hover:text-blue-700 cursor-pointer" />
                  <Facebook className="w-5 h-5 text-gray-600 hover:text-blue-600 cursor-pointer" />
                  <Github className="w-5 h-5 text-gray-600 hover:text-gray-900 cursor-pointer" />
                  <Youtube className="w-5 h-5 text-gray-600 hover:text-red-600 cursor-pointer" />
                  <Trophy className="w-5 h-5 text-gray-600 hover:text-yellow-500 cursor-pointer" />
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="bg-[#006400] text-white mt-4">
            <div className="flex justify-between items-center px-4">
              <div className="flex space-x-4">
                <NavItem 
                  text="About FIRST" 
                  items={[
                    'Mission & Vision',
                    'Board of Directors',
                    'Staff',
                    'History',
                    'Contact Us'
                  ]} 
                />
                <NavItem 
                  text="Membership" 
                  items={[
                    'Benefits',
                    'How to Join',
                    'Member Directory',
                    'Member Resources'
                  ]} 
                />
                <NavItem 
                  text="Initiatives" 
                  items={[
                    'Global Programs',
                    'Research',
                    'Working Groups',
                    'Special Projects'
                  ]} 
                />
                <NavItem 
                  text="Standards & Publications" 
                  items={[
                    'Best Practices',
                    'Technical Documents',
                    'White Papers',
                    'Annual Reports'
                  ]} 
                />
                <NavItem 
                  text="Events" 
                  items={[
                    'Annual Conference',
                    'Technical Colloquia',
                    'Workshops',
                    'Calendar'
                  ]} 
                />
                <NavItem 
                  text="Education" 
                  items={[
                    'Training',
                    'Certifications',
                    'Academic Programs',
                    'Resources'
                  ]} 
                />
                <NavItem text="Blog" />
              </div>
              <button className="px-4 py-2 bg-green-700 hover:bg-green-800 rounded">
                Sign in
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 flex">
        {/* Sidebar */}
        <aside className="w-64 pr-8">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-lg font-bold text-green-800 mb-4">FIRST Blog</h2>
            <p className="text-sm text-gray-700 mb-4">
              FIRST runs a blog open to members and invited guest authors. It publishes contributions relevant to incident responders. Articles should focus on general topics interesting to members.
            </p>
            <p className="text-sm text-gray-700 mb-4">
              Learn more about the Forum of Incident Response and Security Teams through regular blog posts about our organization, events and other programs.
            </p>
            <p className="text-sm text-gray-700">
              Questions or comments? Contact first-blog@first.org
            </p>
          </div>
        </aside>

        {/* Main Article */}
        <article className="flex-1">
          <h1 className="text-2xl font-bold text-green-800 mb-4">
            Thank You FIRST Community for Helping Team Cymru Reach a New CSIRT Assistance Program Milestone
          </h1>
          <p className="text-gray-600 italic mb-6">
            Together, We're Creating Better Threat Intelligence Sharing for the World
          </p>
          <div className="text-sm text-gray-600 mb-6">
            by Jacomo Piccolini, Outreach Team Lead, Team Cymru
            <br />
            Monday, January 28th, 2020
          </div>
          <div className="prose max-w-none">
            <p className="mb-4">
              Since 2005, Team Cymru's mission has been to save and improve lives by working with public and private sector entities to discover, track, and take down threat actors and criminals worldwide.
            </p>
            <p>
              We do this by delivering comprehensive visibility into global cyber threat activity. For over 15 years, we've built data sharing partnerships on a global scale that allows us to collect, process and aggregate global network traffic and 50+ other types of data.
            </p>
          </div>
        </article>
      </main>
    </div>
  );
}

// Navigation Item Component
function NavItem({ text, items = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const hasDropdown = items.length > 0;

  return (
    <div 
      className="relative group py-4"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="flex items-center space-x-1 hover:text-green-200">
        <span>{text}</span>
        {hasDropdown && (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>
      
      {hasDropdown && isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          {items.map((item, index) => (
            <a
              key={index}
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default Community;