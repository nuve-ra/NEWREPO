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
      <h3 className="font-medium text-sm mb-3">Have a Feedback?</h3>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full py-2 px-4 bg-green-200 text-green-700 rounded-md hover:bg-green-300 transition-colors text-sm"
      >
        We're Listening!
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
          <div className="max-w-2xl mx-auto px-6 py-8 h-screen overflow-y-auto">
            {/* Reader Icon with Text */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww" 
                  alt="Reader" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="font-medium text-sm">Hi Reader,</h2>
                <p className="text-xs text-gray-600">Here's your News!</p>
              </div>
            </div>

            <div className="flex justify-end mb-4">
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>

            <h2 className="text-2xl font-bold mb-6">Thank you so much for taking the time!</h2>
            <p className="text-gray-600 mb-8">Please provide the below details!</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded-md ${emailError ? 'border-red-500' : ''}`}
                    required
                  />
                  {emailError && (
                    <p className="text-red-500 text-xs mt-1">{emailError}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile
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
                      className="flex-1 p-2 border rounded-r rounded-md"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Feedback
                </label>
                <textarea
                  name="feedback"
                  value={formData.feedback}
                  onChange={handleChange}
                  rows="4"
                  className="w-full p-2 border rounded-md"
                  required
                ></textarea>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
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