/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */

import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import HomeCard from '../component/HomeCard';
import { useSelector } from "react-redux";
import CardFeature from '../component/CardFeature';
import { GrPrevious, GrNext } from "react-icons/gr";
import { FiTruck, FiShield, FiClock, FiGift } from "react-icons/fi";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import FilterProduct from '../component/FilterProduct';
import AllProduct from "../component/AllProduct";
import backgroundImage from '../assest/f4bd50b70115b07d5b768021e09396a5.jpg';

const Home = () => {
  const productData = useSelector((state) => state.product.productList);
  const homeProductCartList = productData.slice(0, 5);
  const homeProductCartListVegetables = productData.filter(
    (el) => el.category === "vegetable"
  );
  const [activeCategory, setActiveCategory] = useState("all");

  const loadingArray = new Array(4).fill(null);
  const loadingArrayFeature = new Array(10).fill(null);

  const slideProductRef = useRef();

  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 300;
  };

  const prevProduct = () => {
    slideProductRef.current.scrollLeft -= 300;
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        <div className="absolute inset-0 bg-black opacity-40 z-0"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 text-white mb-10 md:mb-0">
              <div className="flex items-center bg-white bg-opacity-20 backdrop-blur-sm rounded-full w-max px-4 py-2 mb-6">
                <FiTruck className="text-white mr-2" />
                <span className="text-sm font-medium">Fast Delivery in 30 Minutes</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                Fresh <span className="text-green-400">Farm</span> Produce Delivered to Your Door
              </h1>
              <p className="text-lg md:text-xl text-gray-100 mb-8 max-w-lg">
                Discover farm-fresh vegetables, handpicked for quality and delivered with care. Join thousands of happy customers enjoying healthier meals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/menu" 
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg text-center transition duration-300 transform hover:scale-105"
                >
                  Shop Now
                </Link>
                <Link 
                  to="/about" 
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-bold py-3 px-8 rounded-lg text-center transition duration-300 border border-white border-opacity-30"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="grid grid-cols-2 gap-4">
                {homeProductCartList[0]
                  ? homeProductCartList.map((el, index) => (
                      <div 
                        key={el._id}
                        className={`transform transition-all duration-500 hover:-translate-y-2 ${index === 0 || index === 3 ? 'mt-8' : ''}`}
                      >
                        <HomeCard
                          id={el._id}
                          image={el.image}
                          name={el.name}
                          price={el.price}
                          category={el.category}
                        />
                      </div>
                    ))
                  : loadingArray.map((_, index) => (
                      <HomeCard key={index + "loading"} loading={"Loading..."} />
                    ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Value Propositions */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTruck className="text-green-600 text-2xl" />
              </div>
              <h3 className="font-bold text-lg mb-2">Fast Delivery</h3>
              <p className="text-gray-600 text-sm">Delivery in 30-60 minutes</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiShield className="text-green-600 text-2xl" />
              </div>
              <h3 className="font-bold text-lg mb-2">Quality Guarantee</h3>
              <p className="text-gray-600 text-sm">Farm-fresh products</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiClock className="text-green-600 text-2xl" />
              </div>
              <h3 className="font-bold text-lg mb-2">24/7 Support</h3>
              <p className="text-gray-600 text-sm">Always here to help</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiGift className="text-green-600 text-2xl" />
              </div>
              <h3 className="font-bold text-lg mb-2">Special Offers</h3>
              <p className="text-gray-600 text-sm">Discounts for regulars</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">Shop by Category</h2>
            <div className="flex space-x-2">
              <button 
                onClick={prevProduct}
                className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 text-gray-700"
              >
                <GrPrevious />
              </button>
              <button 
                onClick={nextProduct}
                className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 text-gray-700"
              >
                <GrNext />
              </button>
            </div>
          </div>

          <div 
            className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide scroll-smooth"
            ref={slideProductRef}
          >
            {homeProductCartListVegetables[0]
              ? homeProductCartListVegetables.map(el => (
                  <CardFeature
                    key={el._id + "vegetable"}
                    id={el._id}
                    name={el.name}
                    category={el.category}
                    price={el.price}
                    image={el.image}
                  />
                ))
              : loadingArrayFeature.map((_, index) => (
                  <CardFeature key={index + "cartLoading"} loading="Loading..." />
                ))}
          </div>
        </div>
      </div>

      {/* Seasonal Specials */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Seasonal Specials</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {homeProductCartList[0]
              ? homeProductCartList.map(el => (
                  <HomeCard
                    key={el._id}
                    id={el._id}
                    image={el.image}
                    name={el.name}
                    price={el.price}
                    category={el.category}
                  />
                ))
              : loadingArray.map((_, index) => (
                  <HomeCard key={index + "loading"} loading={"Loading..."} />
                ))}
          </div>
        </div>
      </div>

      {/* All Products Section */}
      <AllProduct heading={"Browse All Products"} />

      {/* Newsletter */}
      <div className="bg-green-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Join Our Newsletter</h2>
          <p className="text-green-100 mb-8 max-w-2xl mx-auto">
            Subscribe to get updates on special offers, new products, and farming tips.
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-2">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
            />
            <button className="bg-green-800 hover:bg-green-900 text-white font-bold px-6 py-3 rounded-lg transition duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-green-400 mb-4">Field Crops</h3>
              <p className="text-gray-400 mb-6">
                Bringing farm-fresh produce to your table since 2020. Quality you can trust.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <FaFacebook size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <FaTwitter size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <FaInstagram size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <FaYoutube size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Shop</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white transition">All Products</Link></li>
                <li><Link to="/" className="text-gray-400 hover:text-white transition">Vegetables</Link></li>
                <li><Link to="/" className="text-gray-400 hover:text-white transition">Fruits</Link></li>
                <li><Link to="/" className="text-gray-400 hover:text-white transition">Seasonal Specials</Link></li>
                <li><Link to="/" className="text-gray-400 hover:text-white transition">Organic Range</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><Link to="/contact" className="text-gray-400 hover:text-white transition">Contact Us</Link></li>
                <li><Link to="/faq" className="text-gray-400 hover:text-white transition">FAQs</Link></li>
                <li><Link to="/shipping" className="text-gray-400 hover:text-white transition">Shipping Policy</Link></li>
                <li><Link to="/returns" className="text-gray-400 hover:text-white transition">Returns & Refunds</Link></li>
                <li><Link to="/privacy" className="text-gray-400 hover:text-white transition">Privacy Policy</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-400 hover:text-white transition">About Us</Link></li>
                <li><Link to="/blog" className="text-gray-400 hover:text-white transition">Blog</Link></li>
                <li><Link to="/careers" className="text-gray-400 hover:text-white transition">Careers</Link></li>
                <li><Link to="/farmers" className="text-gray-400 hover:text-white transition">Our Farmers</Link></li>
                <li><Link to="/sustainability" className="text-gray-400 hover:text-white transition">Sustainability</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 Field Crops. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visa/visa-original.svg" className="h-8" alt="Visa" />
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mastercard/mastercard-original.svg" className="h-8" alt="Mastercard" />
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/paypal/paypal-original.svg" className="h-8" alt="PayPal" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;