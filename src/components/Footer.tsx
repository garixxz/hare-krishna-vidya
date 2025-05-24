
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-orange-400">HopeKits</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Empowering communities through essential kits that create lasting change and hope for a better tomorrow.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center hover:bg-orange-700 cursor-pointer transition-colors">
                <span className="text-sm font-bold">f</span>
              </div>
              <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center hover:bg-orange-700 cursor-pointer transition-colors">
                <span className="text-sm font-bold">t</span>
              </div>
              <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center hover:bg-orange-700 cursor-pointer transition-colors">
                <span className="text-sm font-bold">in</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-gray-300">
              <li><a href="#" className="hover:text-orange-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Our Work</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Volunteer</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Impact Stories</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Info</h4>
            <div className="space-y-3 text-gray-300">
              <p>📧 donate@hopekits.org</p>
              <p>📞 +91 98765 43210</p>
              <p>📍 123 Hope Street, New Delhi, India</p>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">Stay Updated</h4>
            <p className="text-gray-300 mb-4">Get the latest updates on our impact and new initiatives</p>
            <div className="flex space-x-2">
              <Input 
                type="email" 
                placeholder="Your email"
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
              <Button className="bg-orange-600 hover:bg-orange-700">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; 2024 HopeKits. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
