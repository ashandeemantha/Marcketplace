/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */

import React, { useEffect, useRef, useState } from 'react';
import HomeCard from '../component/HomeCard';
import { useSelector } from "react-redux";
import CardFeature from '../component/CardFeature';
import { GrPrevious, GrNext } from "react-icons/gr";
import FilterProduct from '../component/FilterProduct';
import AllProduct from "../component/AllProduct";

const Home = () => {
  const productData = useSelector((state) => state.product.productList);
  const homeProductCartList = productData.slice(0, 5);
  const homeProductCartListVegetables = productData.filter(
    (el) => el.category === "vegetable"
  );

  const loadingArray = new Array(4).fill(null);
  const loadingArrayFeature = new Array(10).fill(null);

  const slideProductRef = useRef();

  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 200;
  };

  const prevProduct = () => {
    slideProductRef.current.scrollLeft -= 200;
  };

  return (
    <div className="p-2 md:p-4">
      {/* Hero Section */}
      <div className="md:flex gap-4 py-2">
        <div className="md:w-1/2">
          <div className="flex gap-3 bg-slate-300 w-36 px-2 items-center rounded-full">
            <p className="text-sm font-medium text-slate-900">Bike Delivery</p>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png"
              className="h-7"
              alt="Bike Delivery Icon"
            />
          </div>
          <h2 className="text-4xl md:text-7xl font-bold py-3">
            The Fastest Delivery in{" "}
            <span className="text-red-600">Your Home</span>
          </h2>
          <p className="py-3 text-base">
            Welcome to Field Crops, your trusted destination for fresh, high-quality vegetables delivered straight from farms to your doorstep.
            We are committed to providing customers with naturally grown, nutrient-rich produce that supports a healthy lifestyle and promotes sustainable farming practices.
            With a smooth shopping experience, quick delivery, and unbeatable quality, we make sure that healthy eating is just one click away!
          </p>
          <button className="font-bold bg-red-500 text-slate-200 px-4 py-2 rounded-md">
            Order Now
          </button>
        </div>

        {/* Product Cards */}
        <div className="md:w-1/2 flex flex-wrap gap-5 p-4 justify-center">
          {homeProductCartList[0]
            ? homeProductCartList.map((el) => (
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

      {/* Scrollable Feature Section */}
      <div>
        <div className="flex w-full items-center">
          <h2 className="font-bold text-3xl text-slate-800 mb-6">Fresh vegetables</h2>
          <div className="ml-auto flex gap-4">
            <button onClick={prevProduct} className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded">
              <GrPrevious />
            </button>
            <button onClick={nextProduct} className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded">
              <GrNext />
            </button>
          </div>
        </div>

        <div className="flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all" ref={slideProductRef}>
          {homeProductCartListVegetables[0]
            ? homeProductCartListVegetables.map(el => (
                <CardFeature
                  key={el._id +"vegetable"}
                  id={el._id}
                  name={el.name}
                  category={el.category}
                  price={el.price}
                  image={el.image}
                />
              ))
            : loadingArrayFeature.map((_, index) => (
                <CardFeature key={index+ "cartLoading"} loading="Loading..." />
              ))}
        </div>
      </div>

      <AllProduct heading={"Your Product"}/>
      
      {/* GreenCart Footer */}
<footer className="bg-green-100 mt-10 p-0 border-t border-gray-200 ">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
<h2 className="text-2xl font-bold text-green-600 mb-1">Filed Crops Marcket Place</h2>
              <p className="text-gray-600 ">
                We deliver fresh vegetables and snacks straight to your door. Trusted by thousands, 
                we aim to make your shopping experience simple and affordable.
              </p>
            </div>
            
            <div className="flex justify-between gap-8">
<div>
                <h3 className="font-semibold text-lg mb-0">Quick Links</h3>
                <ul className="space-y-0">
                  <li><a href="#" className="text-gray-600 hover:text-green-600">Home</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-green-600">Menu</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-green-600">About</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-green-600">Contact</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-green-600">FAQs</a></li>
                </ul>
              </div>
              
<div>
<h3 className="font-semibold text-lg mb-0">Need help?</h3>
<ul className="space-y-0">
  <li><a href="#" className="text-gray-600 hover:text-green-600">Delivery Information</a></li>
  <li><a href="#" className="text-gray-600 hover:text-green-600">Return & Refund Policy</a></li>
  <li><a href="#" className="text-gray-600 hover:text-green-600">Payment Methods</a></li>
  <li><a href="#" className="text-gray-600 hover:text-green-600">Track your Order</a></li>
  <li><a href="#" className="text-gray-600 hover:text-green-600">Contact Us</a></li>
</ul>
</div>
              
<div>
<h3 className="font-semibold text-lg mb-0">Follow Us</h3>
<ul className="space-y-0">
  <li><a href="#" className="text-gray-600 hover:text-green-600">Instagram</a></li>
  <li><a href="#" className="text-gray-600 hover:text-green-600">Twitter</a></li>
  <li><a href="#" className="text-gray-600 hover:text-green-600">Facebook</a></li>
  <li><a href="#" className="text-gray-600 hover:text-green-600">YouTube</a></li>
</ul>
</div>
            </div>
          </div>
          
<div className="border-t border-gray-200 mt-8 pt-2 text-center text-sm text-gray-500">
            <p>1.17 / 10.87.15</p>
            <p>Copyright 2025 © dissanayakam.dev All Right Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;