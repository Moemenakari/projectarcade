
import API_URL from "../config";
import React, { useState } from 'react';

const Events = () => {
//   form datausestate
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: '',
    date: '',
    attendee: '',
    price: '',
    note: '',
  });
  //   handle change

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //    send data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/addEvent", {
        method: "POST",
       headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        setFormData({
          name: "",
          email: "",
          phone: "",
          type: "",
          date: "",
          attendee: "",
          price: "",
          note: "",
        });
        alert("Added Successful!");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        
        {/*         title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-4">
          Book Your Arcade Event 
        </h1>
        <p className="text-xl text-center text-gray-600 mb-12">
          Let us transform your festival, corporate event, or party into the ultimate arcade zone!
        </p>

        {/*   form start */}
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-2xl border border-red-600">
          
          {/*   info */}
          <h2 className="text-2xl font-bold text-yellow-600 mb-6 border-b pb-2">Your Contact Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            
            {/* name */}
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

            {/* mail */}
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
            
            {/* phone */}
            <div className="md:col-span-2">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500 transition duration-150"
              />
            </div>
          </div>

          {/* details */}
          <h2 className="text-2xl font-bold text-yellow-600 mb-6 border-b pb-2">Event Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            
            {/* event shu */}
            <div>
              <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 mb-1">Type of Event</label>
              <select
                name="type"
                id="eventType"
                value={formData.type}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500 transition duration-150 bg-white"
              >
                <option value="">-- Select Type --</option>
                <option value="Festival">Festival / Fair</option>
                <option value="Corporate">Corporate Event / Team Building</option>
                <option value="Birthday">Birthday Party / Private Event</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* date */}
            <div>
              <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700 mb-1">Event Date</label>
              <input
                type="date"
                name="date"
                id="eventDate"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500 transition duration-150"
              />
            </div>
            
            {/* ppl in events how much laen mhm ele */}
            <div>
              <label htmlFor="attendees" className="block text-sm font-medium text-gray-700 mb-1">Expected Number of Attendees</label>
              <input
                type="number"
                name="attendee"
                id="attendees"
                value={formData.attendee}
                onChange={handleChange}
                required
                min="1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500 transition duration-150"
              />
            </div>

            {/*  option budget */}
            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">Approximate Budget (USD)</label>
              <select
                name="price"
                id="budget"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500 transition duration-150 bg-white"
              >
                <option value="">-- Select Budget --</option>
                <option value="<1000">Less than $200</option>
                <option value="1000-3000">$200 - $500</option>
                <option value="1000-3000">$500 - $800</option>
                <option value="3000-5000">$7500 - $1000</option>
                <option value="5000+">$1000+</option>
              </select>
            </div>
            
            {/* DIV note */}
            <div className="md:col-span-2">
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Additional Notes / Machine Requests</label>
              <textarea
                name="note"
                id="notes"
                value={formData.note}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500 transition duration-150"
              ></textarea>
            </div>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full py-3 mt-6 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition duration-300 shadow-lg uppercase"
          >
            Submit Event Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default Events;
