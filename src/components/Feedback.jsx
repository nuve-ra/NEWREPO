import React, { useState } from 'react';

const Feedback = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    country: '',
    state: '',
    email: '',
    mobile: '',
    feedback: ''
  });
  const [emailError, setEmailError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    if (name === 'email') {
      setEmailError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email.includes('@')) {
      setEmailError('Please enter a valid e-mail');
      return;
    }
    console.log('Form submitted:', formData);
    setIsOpen(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
          <img 
            src="https://via.placeholder.com/40" 
            alt="Reader" 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h2 className="font-medium text-sm">Hi Reader,</h2>
          <p className="text-xs text-gray-600">Here's your News!</p>
        </div>
      </div>

      <h3 className="font-medium text-sm mb-3">Have a Feedback?</h3>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full py-2 px-4 bg-pink-200 text-pink-700 rounded-md hover:bg-pink-300 transition-colors text-sm"
      >
        We're Listening!
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
          <div className="max-w-2xl mx-auto px-6 py-8 h-screen overflow-y-auto">
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            
            <h2 className="text-xl font-medium text-gray-800 mb-2">
              Thank you so much for taking the time!
            </h2>
            <p className="text-gray-600 mb-6">
              Please provide the below details!
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-gray-300"
                  placeholder="Enter Your Full Name"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-gray-300"
                  placeholder="Enter your full Postal Address"
                  rows="3"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Country
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-gray-300 pr-10"
                      placeholder="Enter Your Country Name"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <i className="fas fa-search text-gray-400 text-sm"></i>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    State
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-gray-300 pr-10"
                      placeholder="Enter Your State Name"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <i className="fas fa-search text-gray-400 text-sm"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Email Id
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${
                      emailError ? 'border-red-500' : 'border-gray-200'
                    } rounded focus:outline-none focus:border-gray-300`}
                    placeholder="Enter Your Mail Id"
                  />
                  {emailError && (
                    <p className="text-red-500 text-xs mt-1">{emailError}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Mobile Number
                  </label>
                  <div className="flex">
                    <div className="w-12 flex items-center justify-center border border-gray-200 border-r-0 rounded-l bg-gray-50">
                      <img 
                        src="https://flagcdn.com/w20/in.png" 
                        alt="India" 
                        className="w-5"
                      />
                    </div>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-r focus:outline-none focus:border-gray-300"
                      placeholder="Enter Your Mobile Number"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Write Your Feedback
                </label>
                <textarea
                  name="feedback"
                  value={formData.feedback}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-gray-300"
                  placeholder="Write Your Feedback"
                  rows="4"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 bg-emerald-400 text-white rounded-md hover:bg-emerald-500 focus:outline-none"
                >
                  Submit Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feedback;