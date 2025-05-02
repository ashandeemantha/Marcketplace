/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import AllProduct from '../component/AllProduct';
import { addCartItem } from '../redux/productslide';
import { FaLeaf, FaTruck, FaShieldAlt, FaShoppingCart, FaHeart, FaShare } from 'react-icons/fa';

const Menu = () => {
  const { filterby } = useParams();
  const productData = useSelector(state => state.product.productList);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const productDisplay = productData.filter(el => el._id === filterby)[0];

  const handleAddCartProduct = () => {
    dispatch(addCartItem({
      _id: productDisplay._id,
      name: productDisplay.name,
      price: productDisplay.price,
      category: productDisplay.category,
      image: productDisplay.image,
      quantity: quantity
    }));
  };

  const handleBuyNow = () => {
    handleAddCartProduct();
    // Navigate to checkout - you'll need to implement this
  };

  if (!productDisplay) {
    return (
      <div className="p-8 text-center">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-semibold text-red-600 mb-2">Product Not Found</h3>
          <p className="text-gray-600">The product you're looking for is not available.</p>
        </div>
      </div>
    );
  }

  // For demonstration - you might have multiple images in your actual product data
  const productImages = [
    productDisplay.image,
    productDisplay.image, // Replace with actual secondary images
    productDisplay.image  // Replace with actual secondary images
  ];

  return (
    <div className='p-2 md:p-8 bg-gray-50 min-h-screen'>
      <div className='w-full max-w-6xl m-auto bg-white rounded-xl shadow-md overflow-hidden md:flex'>
        {/* Product Images */}
        <div className='md:w-1/2 p-4'>
          <div className='h-80 md:h-96 overflow-hidden rounded-lg mb-4'>
            <img 
              src={productImages[selectedImage]} 
              className='w-full h-full object-contain hover:scale-105 transition-transform duration-300'
            />
          </div>
          <div className='flex gap-2 justify-center'>
            {productImages.map((img, index) => (
              <div 
                key={index}
                className={`w-16 h-16 border-2 rounded-md cursor-pointer ${selectedImage === index ? 'border-green-500' : 'border-gray-200'}`}
                onClick={() => setSelectedImage(index)}
              >
                <img src={img} className='w-full h-full object-cover' />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className='md:w-1/2 p-6 flex flex-col'>
          {/* Product Header */}
          <div className='mb-4'>
            <span className='inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mb-2'>
              {productDisplay.category}
            </span>
            <h1 className='text-2xl md:text-3xl font-bold text-gray-800'>{productDisplay.name}</h1>
            <div className='flex items-center mt-2'>
              <span className='text-yellow-500'>★★★★☆</span>
              <span className='text-gray-500 text-sm ml-2'>(24 reviews)</span>
            </div>
          </div>

          {/* Price Section */}
          <div className='mb-6'>
            <p className='text-3xl font-bold text-green-600'>
              Rs. {productDisplay.price.toLocaleString()}
              {productDisplay.originalPrice && (
                <span className='text-gray-400 text-lg line-through ml-2'>
                  Rs. {productDisplay.originalPrice.toLocaleString()}
                </span>
              )}
            </p>
            {productDisplay.stock && (
              <p className={`text-sm mt-1 ${productDisplay.stock > 10 ? 'text-green-600' : 'text-orange-600'}`}>
                {productDisplay.stock > 10 ? 'In Stock' : `Only ${productDisplay.stock} left`}
              </p>
            )}
          </div>

          {/* Quality Badges */}
          <div className='flex flex-wrap gap-2 mb-6'>
            <span className='flex items-center bg-green-50 text-green-800 px-3 py-1 rounded-full text-sm'>
              <FaLeaf className='mr-1' /> Organic
            </span>
            <span className='flex items-center bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-sm'>
              <FaShieldAlt className='mr-1' /> Quality Verified
            </span>
            <span className='flex items-center bg-purple-50 text-purple-800 px-3 py-1 rounded-full text-sm'>
              <FaTruck className='mr-1' /> Islandwide Delivery
            </span>
          </div>

          {/* Quantity Selector */}
          <div className='mb-6'>
            <label className='block text-gray-700 mb-2'>Quantity (Kg):</label>
            <div className='flex items-center'>
              <button 
                className='bg-gray-200 px-3 py-1 rounded-l-lg'
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <span className='bg-gray-100 px-4 py-1'>{quantity}</span>
              <button 
                className='bg-gray-200 px-3 py-1 rounded-r-lg'
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className='flex flex-wrap gap-3 mb-6'>
            <button 
              className='flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center'
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
            <button 
              className='flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center'
              onClick={handleAddCartProduct}
            >
              <FaShoppingCart className='mr-2' /> Add to Cart
            </button>
          </div>
          <div className='flex gap-3'>
            <button className='flex items-center text-gray-600 hover:text-green-600'>
              <FaHeart className='mr-1' /> Save
            </button>
            <button className='flex items-center text-gray-600 hover:text-green-600'>
              <FaShare className='mr-1' /> Share
            </button>
          </div>

          {/* Product Details */}
          <div className='mt-8 border-t pt-6'>
            <h3 className='text-lg font-semibold text-gray-800 mb-3'>Product Details</h3>
            <p className='text-gray-600 mb-4'>{productDisplay.description}</p>
            
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <h4 className='font-medium text-gray-700'>Crop Type</h4>
                <p className='text-gray-600'>{productDisplay.category}</p>
              </div>
              <div>
                <h4 className='font-medium text-gray-700'>Harvest Date</h4>
                <p className='text-gray-600'>15 Aprill 2025</p>
              </div>
              <div>
                <h4 className='font-medium text-gray-700'>Moisture Content</h4>
                <p className='text-gray-600'>12%</p>
              </div>
              <div>
                <h4 className='font-medium text-gray-700'>Origin</h4>
                <p className='text-gray-600'>Monaragala</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className='mt-12'>
        <AllProduct heading={"You May Also Like"} filter={productDisplay.category} excludeId={productDisplay._id} />
      </div>
    </div>
  );
};

export default Menu;