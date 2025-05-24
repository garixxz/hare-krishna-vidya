
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you within 24 hours.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Contact <span className="text-orange-600">Us</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions about our work or want to get involved? 
            We'd love to hear from you!
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email Us</h3>
                    <p className="text-gray-600">info@hopekits.org</p>
                    <p className="text-gray-600">donate@hopekits.org</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Call Us</h3>
                    <p className="text-gray-600">+91 98765 43210</p>
                    <p className="text-gray-600">+91 87654 32109</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Visit Us</h3>
                    <p className="text-gray-600">
                      123 Hope Street<br />
                      Connaught Place<br />
                      New Delhi - 110001
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Office Hours</h3>
                    <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <Card className="p-6 bg-orange-50 border-orange-200">
                <h3 className="font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Emergency Assistance</span>
                    <Button size="sm" variant="outline">+91 98765 43210</Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Volunteer Inquiries</span>
                    <Button size="sm" variant="outline">volunteer@hopekits.org</Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Media Inquiries</span>
                    <Button size="sm" variant="outline">media@hopekits.org</Button>
                  </div>
                </div>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">Message *</Label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <Button 
                  type="submit"
                  className="w-full bg-orange-600 hover:bg-orange-700 py-3"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Response Time:</strong> We typically respond within 24 hours. 
                  For urgent matters, please call us directly.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Find Us</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
              <p className="text-gray-600">Interactive Map Coming Soon</p>
            </div>
            <div className="mt-6 text-center">
              <p className="text-gray-600 mb-4">
                Located in the heart of New Delhi, our office is easily accessible by metro and bus.
              </p>
              <div className="flex justify-center space-x-4">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">📍 Rajiv Chowk Metro</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">🚌 Bus Stop Nearby</span>
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">🅿️ Parking Available</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
