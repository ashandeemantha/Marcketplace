/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { FaLeaf, FaHandHoldingUsd, FaChartLine, FaTruck, FaShieldAlt, FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaLinkedin, FaRobot, FaCheckCircle } from 'react-icons/fa';

const About = () => {
  return (
    <div className="font-sans text-gray-800 bg-gray-50">
      {/* Hero Section */}
      <div 
        className="relative bg-green-900 text-white py-32 px-4 text-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            🌾 Welcome to Field Crops Marketplace
          </h1>
          <p className="text-xl md:text-2xl">
            Sri Lanka's Premier Digital Platform for Quality Agricultural Trade
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
            🚜 Our Mission
          </h2>
          <p className="text-xl mb-12">
            To empower Sri Lankan farmers with fair trade opportunities while ensuring buyers receive quality-assured crops through our advanced verification system.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-green-50 p-8 rounded-lg shadow-md">
              <FaHandHoldingUsd className="text-4xl text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Fair Profits</h3>
              <p>Direct farmer-to-buyer connections eliminate middlemen and maximize farmer income.</p>
            </div>

            <div className="bg-green-50 p-8 rounded-lg shadow-md">
              <FaRobot className="text-4xl text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">AI Quality Verification</h3>
              <p>Our intelligent system assesses crop quality with 95% accuracy before listing.</p>
            </div>

            <div className="bg-green-50 p-8 rounded-lg shadow-md">
              <FaLeaf className="text-4xl text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Sustainable Growth</h3>
              <p>Promoting eco-friendly farming practices across Sri Lanka.</p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Quality Section */}
      <section className="py-20 px-4 bg-green-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-6">
                <FaRobot className="inline mr-3" />
                Smart Quality Assurance
              </h2>
              <p className="text-lg mb-6">
                Our AI-powered quality check system revolutionizes agricultural trade in Sri Lanka by:
              </p>
              <ul className="space-y-4 text-lg">
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-600 mt-1 mr-3 flex-shrink-0" />
                  <span>Automatically grading crops based on Sri Lankan agricultural standards</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-600 mt-1 mr-3 flex-shrink-0" />
                  <span>Detecting moisture levels and potential contaminants</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-600 mt-1 mr-3 flex-shrink-0" />
                  <span>Providing instant quality certificates for each listing</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-600 mt-1 mr-3 flex-shrink-0" />
                  <span>Reducing disputes between farmers and buyers</span>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="AI analyzing crop quality"
                className="rounded-lg"
              />
              <p className="mt-4 text-sm italic text-gray-600">
                Our AI system verifying paddy quality in Anuradhapura
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-12 text-center">
            Why Choose Our Marketplace?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start mb-4">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <FaShieldAlt className="text-green-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Verified Network</h3>
                  <p className="text-gray-600">All farmers and buyers are authenticated through our rigorous verification process.</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start mb-4">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <FaChartLine className="text-green-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Real-Time Market Data</h3>
                  <p className="text-gray-600">Access to live pricing and demand trends across Sri Lanka.</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start mb-4">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <FaHandHoldingUsd className="text-green-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Secure Payments</h3>
                  <p className="text-gray-600">Escrow system ensures safe transactions in LKR.</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start mb-4">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <FaTruck className="text-green-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Islandwide Logistics</h3>
                  <p className="text-gray-600">We coordinate transportation across all provinces.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 bg-green-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-6">
            🌱 Our Sri Lankan Journey
          </h2>
          <div className="space-y-6 text-lg">
            <p>
              Founded in 2023 by agricultural technologists in Colombo, we recognized the challenges Sri Lankan farmers face in getting fair prices while buyers struggled to verify crop quality.
            </p>
            <p>
              After piloting in the North Central Province, we've expanded to serve farmers across all 25 districts, with special focus on major crops like rice, corn, and vegetables.
            </p>
            <p>
              Today, our AI quality system processes over 5,000 crop verifications monthly, helping farmers increase their earnings by an average of 22%.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-green-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Sri Lanka's Agricultural Revolution
          </h2>
          <p className="text-xl mb-12">
            Whether you're a farmer looking to sell your harvest or a buyer sourcing quality Sri Lankan crops, we're here to help.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <FaPhone className="text-3xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Call Us</h3>
              <p>+94 76 123 4567</p>
            </div>

            <div className="p-6">
              <FaEnvelope className="text-3xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Email Us</h3>
              <p>info@fieldcrops.lk</p>
            </div>

            <div className="p-6">
              <FaMapMarkerAlt className="text-3xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
              <p>123 Agricultural Lane, Colombo 05</p>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex justify-center space-x-6">
              <a href="#" className="hover:text-green-300 transition-colors">
                <FaFacebook className="text-2xl" />
              </a>
              <a href="#" className="hover:text-green-300 transition-colors">
                <FaTwitter className="text-2xl" />
              </a>
              <a href="#" className="hover:text-green-300 transition-colors">
                <FaLinkedin className="text-2xl" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Banner */}
      <div className="py-12 bg-green-800 text-white text-center">
        <p className="text-2xl font-bold">
          Growing Sri Lanka's agricultural future, together. 🌾
        </p>
      </div>
    </div>
  );
};

export default About;