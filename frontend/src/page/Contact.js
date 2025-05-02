/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.firstName || !formData.phone || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Create WhatsApp message
    const whatsappMessage = `New Contact Inquiry%0A%0A*Name:* ${formData.firstName} ${formData.lastName}%0A*Email:* ${formData.email}%0A*Phone:* ${formData.phone}%0A*Subject:* ${formData.subject}%0A*Message:* ${formData.message}`;
    
    // Open WhatsApp with pre-filled message
    window.open(`https://wa.me/94717826336?text=${whatsappMessage}`, '_blank');
    
    // Show success message
    toast.success('Redirecting to WhatsApp to send your message');
    
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Contact Us
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Reach out to our fieldcrops marketplace team in Sri Lanka
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Contact Information - Sri Lanka Specific */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Sri Lanka Office</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-green-100 p-3 rounded-full">
                  <FaMapMarkerAlt className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Headquarters</h3>
                  <p className="mt-1 text-gray-600">No. 123, Galle Road</p>
                  <p className="text-gray-600">Colombo 03</p>
                  <p className="text-gray-600">Sri Lanka</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 bg-green-100 p-3 rounded-full">
                  <FaPhone className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Phone</h3>
                  <p className="mt-1 text-gray-600">+94 11 234 5678 (Colombo)</p>
                  <p className="text-gray-600">+94 77 123 4567 (Mobile)</p>
                  <p className="text-gray-600">Mon-Fri, 8:30am-5:30pm</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 bg-green-100 p-3 rounded-full">
                  <FaEnvelope className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Email</h3>
                  <p className="mt-1 text-gray-600">info@cropmarketsl.com</p>
                  <p className="text-gray-600">support@cropmarketsl.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 bg-green-100 p-3 rounded-full">
                  <FaWhatsapp className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">WhatsApp</h3>
                  <p className="mt-1 text-gray-600">+94 71 782 6336</p>
                  <p className="text-gray-600">Available 24/7</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="bg-gray-100 p-3 rounded-full text-gray-700 hover:bg-green-100 hover:text-green-600 transition-colors">
                  <FaFacebook className="h-6 w-6" />
                </a>
                <a href="#" className="bg-gray-100 p-3 rounded-full text-gray-700 hover:bg-green-100 hover:text-green-600 transition-colors">
                  <FaTwitter className="h-6 w-6" />
                </a>
                <a href="#" className="bg-gray-100 p-3 rounded-full text-gray-700 hover:bg-green-100 hover:text-green-600 transition-colors">
                  <FaInstagram className="h-6 w-6" />
                </a>
                <a href="#" className="bg-gray-100 p-3 rounded-full text-gray-700 hover:bg-green-100 hover:text-green-600 transition-colors">
                  <FaLinkedin className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone (Sri Lanka) <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+94 XX XXX XXXX"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Select a subject</option>
                  <option value="Crop Prices Inquiry">Crop Prices Inquiry</option>
                  <option value="Farm Equipment">Farm Equipment</option>
                  <option value="Organic Certification">Organic Certification</option>
                  <option value="Export Opportunities">Export Opportunities</option>
                  <option value="Technical Support">Technical Support</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Send via WhatsApp
                  <FaWhatsapp className="ml-2" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFormData({
                      firstName: '',
                      lastName: '',
                      email: '',
                      phone: '',
                      subject: '',
                      message: ''
                    });
                  }}
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Clear Form
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Sri Lanka Map Section */}
        <div className="mt-12 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Location in Sri Lanka</h2>
          <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.7985117576865!2d79.85275541539326!3d6.914657295003623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2596d3cb8fe07%3A0x2b0ae2edd563a661!2sColombo!5e0!3m2!1sen!2slk!4v1620000000000!5m2!1sen!2slk"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Our Sri Lanka Location"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;