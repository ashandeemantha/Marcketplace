import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addCartItem } from "../redux/productslide";

const CardFeature = ({ image, name, price, category, loading, id }) => {
  const dispatch = useDispatch();

  const handleAddCartProduct = (e) => {
    e.stopPropagation();
    dispatch(addCartItem({
      _id: id,
      name: name,
      price: price,
      category: category,
      image: image
    }));
    
    // Add visual feedback
    e.target.classList.add('animate-ping');
    setTimeout(() => {
      e.target.classList.remove('animate-ping');
    }, 500);
  };

  return (
    <div className='w-full min-w-[200px] max-w-[200px] bg-white rounded-xl hover:shadow-xl drop-shadow-md py-5 px-4 cursor-pointer flex flex-col transition-all duration-300 ease-in-out hover:-translate-y-2 group'>
      {image ? (
        <>
          <Link 
            to={`/menu/${id}`} 
            onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}
            className="flex flex-col flex-1"
          >
            <div className='h-40 flex flex-col justify-center items-center mb-4 overflow-hidden rounded-lg'>
              <img 
                src={image} 
                className='h-full object-cover group-hover:scale-105 transition-transform duration-300' 
                alt={name} 
                loading="lazy"
              />
            </div>
            <div className="flex-1">
              <h3 className='font-semibold text-gray-700 capitalize text-lg mb-1 line-clamp-2'>{name}</h3>
              <p className='text-gray-500 text-sm font-medium mb-2'>{category}</p>
              <p className='font-bold text-lg'>
                <span className='text-red-500'>RS.</span>
                <span>{price.toLocaleString()}</span>
              </p>
            </div>
          </Link>
          <button 
            className='bg-green-500 hover:bg-green-600 text-white py-2 mt-3 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center gap-1'
            onClick={handleAddCartProduct}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
            Add to Cart
          </button>
        </>
      ) : (
        <div className='min-h-[150px] flex justify-center items-center'>
          <div className="animate-pulse flex flex-col space-y-3 w-full">
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CardFeature;