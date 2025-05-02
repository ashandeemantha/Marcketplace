import React from 'react';
import { Link } from 'react-router-dom';

const HomeCard = ({ name, image, category, price, loading, id }) => {
  return (
    <div className='w-full max-w-xs bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group'>
      {name ? (
        <>
          <Link 
            to={`/menu/${id}`} 
            onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}
            className="block"
          >
            <div className='relative pt-[100%] bg-gray-100 overflow-hidden'>
              <img 
                src={image} 
                className='absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300' 
                alt={name}
                loading="lazy"
              />
              <div className='absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-800 shadow-sm'>
                {category}
              </div>
            </div>
            
            <div className='p-4'>
              <h3 className='font-semibold text-gray-800 text-lg mb-1 line-clamp-2'>{name}</h3>
              <div className='flex items-center justify-between mt-3'>
                <span className='text-lg font-bold text-gray-900'>
                  RS.{price.toLocaleString()}
                </span>
                <button className='bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200'>
                  View Details
                </button>
              </div>
            </div>
          </Link>
        </>
      ) : (
        <div className='h-64 flex flex-col items-center justify-center p-4'>
          <div className="animate-pulse flex flex-col w-full">
            <div className="h-40 bg-gray-200 rounded mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomeCard;