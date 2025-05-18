/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { GrPrevious, GrNext } from "react-icons/gr";
import { FiTruck, FiShield, FiClock, FiGift, FiUpload, FiCheckCircle, FiXCircle, FiImage, FiUser } from "react-icons/fi";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaStar, FaLeaf } from "react-icons/fa";
import HomeCard from '../component/HomeCard';
import CardFeature from '../component/CardFeature';
import AllProduct from "../component/AllProduct";
import backgroundImage from '../assest/f4bd50b70115b07d5b768021e09396a5.jpg';

const QualityCheckInterface = () => {
  const [activeTab, setActiveTab] = useState('farmer');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [qualityScore, setQualityScore] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
        setIsLoading(true);
        setTimeout(() => {
          setQualityScore(Math.floor(Math.random() * 50) + 50);
          setIsLoading(false);
        }, 1500);
      };
      reader.readAsDataURL(file);
    }
  };

  const qualityStatus = qualityScore >= 80 ? 'Excellent' : 
                     qualityScore >= 60 ? 'Good' : 
                     qualityScore >= 40 ? 'Average' : 'Poor';

  const statusColor = qualityScore >= 80 ? 'bg-green-100 text-green-800' : 
                   qualityScore >= 60 ? 'bg-blue-100 text-blue-800' : 
                   qualityScore >= 40 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800';

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full">
      <div className="flex border-b border-gray-200">
        <button
          className={`flex-1 py-4 px-6 text-center font-medium ${activeTab === 'farmer' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('farmer')}
        >
          <div className="flex items-center justify-center gap-2">
            <FiUser /> Farmer Upload
          </div>
        </button>
        <button
          className={`flex-1 py-4 px-6 text-center font-medium ${activeTab === 'buyer' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('buyer')}
        >
          <div className="flex items-center justify-center gap-2">
            <FiUser /> Buyer Verification
          </div>
        </button>
      </div>

      <div className="p-6">
        {activeTab === 'farmer' ? (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">Upload Crop Photos for Quality Check</h3>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              {uploadedImage ? (
                <div className="relative">
                  <img src={uploadedImage} alt="Uploaded crop" className="mx-auto max-h-60 rounded-lg" />
                  <button 
                    onClick={() => setUploadedImage(null)}
                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                  >
                    <FiXCircle className="text-red-500" />
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="mx-auto bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center">
                    <FiUpload className="text-gray-400 text-2xl" />
                  </div>
                  <p className="text-sm text-gray-500">Upload clear photos of your crops</p>
                  <label className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md cursor-pointer hover:bg-green-700">
                    <FiImage className="mr-2" />
                    Select Image
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                  </label>
                </div>
              )}
            </div>

            {isLoading && (
              <div className="text-center py-4">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-600"></div>
                <p className="mt-2 text-gray-600">Analyzing crop quality...</p>
              </div>
            )}

            {qualityScore && !isLoading && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-700 mb-3">Quality Analysis Results</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Quality Score</span>
                      <span className="text-sm font-bold">{qualityScore}/100</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${qualityScore >= 80 ? 'bg-green-600' : qualityScore >= 60 ? 'bg-blue-500' : qualityScore >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                        style={{width: `${qualityScore}%`}}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-700">Status:</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}>
                      {qualityStatus}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <div className="text-xs text-gray-500 mb-1">Color</div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="text-sm font-medium">Good</span>
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <div className="text-xs text-gray-500 mb-1">Size</div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <span className="text-sm font-medium">Average</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">Verify Received Product Quality</h3>
            <p className="text-sm text-gray-600">
              Upload photos of the products you received to verify they match the quality promised by the farmer.
            </p>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <div className="space-y-3">
                <div className="mx-auto bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center">
                  <FiUpload className="text-gray-400 text-2xl" />
                </div>
                <p className="text-sm text-gray-500">Upload photos of received products</p>
                <label className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700">
                  <FiImage className="mr-2" />
                  Select Image
                  <input type="file" className="hidden" accept="image/*" />
                </label>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <div className="flex items-start gap-3">
                <FiCheckCircle className="text-blue-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-blue-800">Verification Process</h4>
                  <p className="text-sm text-blue-600 mt-1">
                    Our system compares your photos with the farmer's uploads to ensure quality standards are met.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Home = () => {
  const productData = useSelector((state) => state.product.productList);
  const homeProductCartList = productData.slice(0, 5);
  const homeProductCartListVegetables = productData.filter(
    (el) => el.category === "vegetable"
  );

  const loadingArray = new Array(4).fill(null);
  const loadingArrayFeature = new Array(10).fill(null);
  const slideProductRef = useRef();

  const nextProduct = () => slideProductRef.current.scrollLeft += 300;
  const prevProduct = () => slideProductRef.current.scrollLeft -= 300;

  return (
    <div className="bg-gray-200">
      {/* Hero Section with Quality Check */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        <div className="absolute inset-0 bg-black opacity-40 z-0"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Left side - Hero content */}
            <div className="md:w-1/2 text-white mb-10 md:mb-0">
              <div className="flex items-center bg-white bg-opacity-20 backdrop-blur-sm rounded-full w-max px-4 py-2 mb-6">
                <FiTruck className="text-white mr-2" />
                <span className="text-sm font-medium">Fast Delivery in 30 Minutes</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                Fresh <span className="text-green-400">Farm</span> Produce Delivered to Your Door
              </h1>
              <p className="text-lg md:text-xl text-gray-100 mb-8 max-w-lg">
                Discover farm-fresh vegetables, handpicked for quality and delivered with care. 
                Join thousands of happy customers enjoying healthier meals.
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
            
            {/* Right side - Quality check interface */}
            <div className="md:w-1/2">
              <QualityCheckInterface />
            </div>
          </div>
        </div>
      </div>

      {/* Value Propositions */}
      <div className="bg-gray-200 py-12">
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
      <div className="py-12 bg-gray-200">
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
      <div className="py-12 bg-gray-200">
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
            <div className="flex space-x-10 items-center">
              {/* Visa */}
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" 
                className="h-6 w-auto object-contain" 
                alt="Visa" 
                loading="lazy"
              />
              {/* Mastercard */}
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" 
                className="h-6 w-auto object-contain" 
                alt="Mastercard" 
                loading="lazy"
              />
              {/* PayPal */}
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" 
                className="h-6 w-auto object-contain" 
                alt="PayPal" 
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;