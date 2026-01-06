import React from 'react';
import { Link } from 'react-router-dom'; 
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">

          {/* Section 1: Company Info */}
          <div className="space-y-8 xl:col-span-1">
            <h3 className="text-2xl font-bold text-yellow-400">Arcades Lebanon</h3>
            <p className="text-gray-400 text-base">
              Your premier destination for arcade machine sales, rentals, and event bookings in Lebanon.
            </p>
            <div className="flex space-x-6">
              
            </div>
          </div>


          {/* Section 2: Quick Links */}
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-yellow-400 tracking-wider uppercase">
                  Quick Links
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link to="/" className="text-base text-gray-400 hover:text-white">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/aboutus" className="text-base text-gray-400 hover:text-white">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/contactus" className="text-base text-gray-400 hover:text-white">
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link to="/login" className="text-base text-gray-400 hover:text-white">
                       Login
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-yellow-400 tracking-wider uppercase">
                  Services
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link to="/sellmachines" className="text-base text-gray-400 hover:text-white">
                      Buy Machines
                    </Link>
                  </li>
                  <li>
                    <Link to="/rentmachines" className="text-base text-gray-400 hover:text-white">
                      Rent Machines
                    </Link>
                  </li>
                  <li>
                    <Link to="/events" className="text-base text-gray-400 hover:text-white">
                      Book Events
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Section 3: Contact Info */}
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-yellow-400 tracking-wider uppercase">
                  Contact
                </h3>
                <ul className="mt-4 space-y-4 text-gray-400">
                  <li>
                    <p>Beirut, Lebanon</p>
                  </li>
                  <li>
                    <a href="https://wa.me/96170420110" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500 transition-colors">+961 70 420 110</a>
                  </li>
                  <li>
                    <p>info@arcadeslebanon.com</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </footer>
  );
};

export default Footer;
