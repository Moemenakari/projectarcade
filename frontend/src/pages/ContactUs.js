
import React, { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/addContact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Thank you for contacting us! We will respond to your message shortly.');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* tile  */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-4">
          Get in Touch
        </h1>
        <p className="text-xl text-center text-gray-600 mb-12">
          We'd love to hear from you! Send us a message or find our contact details below.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* left box data */}
          <div className="lg:col-span-1 bg-white p-8 rounded-xl shadow-2xl h-full">
            <h2 className="text-2xl font-bold text-red-600 mb-4 border-b pb-2">Contact Info</h2>
            
            <div className="space-y-4 text-gray-700">
              <div className="flex items-center">
                <i className="fas fa-map-marker-alt text-yellow-600 mr-3"></i>
                <p>Tripoli, North Lebanon</p>
              </div>
              <div className="flex items-center">
                <i className="fas fa-phone-alt text-yellow-600 mr-3"></i>
                <p>+961 70 123 456</p>
              </div>
              <div className="flex items-center">
                <i className="fas fa-envelope text-yellow-600 mr-3"></i>
                <p>nextlevelgame@gmail.com</p>
              </div>
              <div className="flex items-center">
                <i className="fas fa-clock text-yellow-600 mr-3"></i>
                <p>24/7 services</p>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-red-600 mt-8 mb-4 border-b pb-2">Follow Us</h2>
            <div className="flex space-x-4">
              {/* socoal media bs lesa ma aande */}
              
            </div>
          </div>

          {/* in right div lal zbun */}
          <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-2xl border border-red-600">
            <h2 className="text-2xl font-bold text-red-600 mb-6 border-b pb-2">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* name li aam ybaatli msg */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500 transition duration-150"
                />
              </div>

              {/* email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500 transition duration-150"
                />
              </div>
              
              {/* maain */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500 transition duration-150"
                />
              </div>

              {/* label w input lmessage */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message / Feedback</label>
                <textarea
                  name="message"
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500 transition duration-150"
                ></textarea>
              </div>

              {/* submit the message */}
              <button
                type="submit"
                className="w-full py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition duration-300 shadow-lg uppercase"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ContactUs;