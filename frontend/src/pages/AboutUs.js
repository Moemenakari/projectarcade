
import React from 'react';
import TeamImage from '../assets/hero_image1000.jpg'; 
//import { Rating } from '@mui/material'; 

{/* 
// Customer  data
const testimonials = [
  {
    id: 1,
    name: "Doctor Ahmad Trad  :) ",
    city: "Daher El Ain - LIU North Campus",
    rating: 5, 
    review: "Ha nj7ak lmede ;) ",
  },
  {
    id: 2,
    name: "Lina Samah",
    city: "Tripoli",
    rating: 5,
    review: "Bought the Boxing Combo Machine. The quality is very good.",
  },
  {
    id: 3,
    name: "Event Planner Ziad",
    city: "Jounieh",
    rating: 4,
    review: "Rented machines for a festival. Great variety. Overall, highly recommended!",
  },
  {
    id: 4,
    name: "Rami Makhoul",
    city: "Sidon",
    rating: 5,
    review: "The best arcade experience in Lebanon. Their machines are always clean and well-maintained. True professionals.",
  },
];            */ }

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* Page Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-4">
          About Our Company: Next Level Games
        </h1>
        <p className="text-xl text-center text-red-600 mb-12">
          Your #1 Source for Outdoor Arcade Fun in Lebanon
        </p>

        {/* Vision & Mission Section */}
        <div className="bg-white p-8 rounded-xl shadow-2xl mb-12">
          <h2 className="text-3xl font-bold text-yellow-600 mb-4 border-b pb-2">Our Vision</h2>
          <p className="text-gray-700 text-lg mb-6">
            Our vision is to be the leading provider of arcade entertainment and gaming solutions across Lebanon. We aim to bring joy, excitement, and a touch of nostalgia to every corner of the country, making high-quality arcade experiences accessible to all.
          </p>
          
          <h2 className="text-3xl font-bold text-yellow-600 mb-4 border-b pb-2">Our Mission</h2>
          <p className="text-gray-700 text-lg">
            We are dedicated to supplying the best arcade machines for sale and rent, specializing in transforming festivals, corporate events, and private parties into unforgettable, high-energy gaming zones. We pride ourselves on reliability, quality service, and a passion for fun.
          </p>
        </div>

        {/* Meet the Team Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-white p-8 rounded-xl shadow-2xl mb-12">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold text-red-600 mb-4">Meet the Team</h2>
            <p className="text-gray-700 mb-4">
              Arcade Lebanon was founded by a group of passionate gamers who believe in the power of classic arcade games to bring people together. We are a small, dedicated team based in Tripoli, committed to providing personalized service and expert advice.
            </p>
            <ul className="list-disc list-inside text-gray-600">
              <li>Local Expertise in the Lebanese Market</li>
              <li>24/7 Technical Support for Rentals</li>
              <li>Commitment to Quality and Reliability</li>
            </ul>
          </div>
          <div className="order-1 md:order-2">
            <img 
              src={TeamImage} 
              alt="Arcade Lebanon Team" 
              className="w-full h-auto rounded-xl shadow-lg object-cover"
            />
          </div>
        </div>
        
        {/* Testimonials Section 
        <section className="py-12 bg-gray-100 rounded-xl shadow-inner">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10">
              What Our Customers Say:
            </h2>
            { 
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-lg text-left border-t-4 border-red-600">
                  

                  {/* Star rating from MUI 
                   <Rating 
                    name={`rating-${testimonial.id}`} 
                    value={testimonial.rating} 
                    readOnly 
                    precision={0.5} 
                    size="medium"
                  />
                  
                  {/* Review Text 
                  <p className="text-gray-700 italic mt-3 mb-4">
                    "{testimonial.review}"
                  </p>
                  
                  {/* Customer Profile Info 
                  {/* The <img /> tag has been removed from here 
                  <div className="flex items-center mt-4">
                    <div>
                      <p className="font-bold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.city}</p>
                    </div>
                  </div>
                </div>
            </div>
          )} 
          </div>
        </section> }


        */ }

      </div>  
    </div>
  );
};

export default AboutUs;
