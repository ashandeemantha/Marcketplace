import React from "react";
import { CiForkAndKnife } from "react-icons/ci";

const FilterProduct = ({ category, onClick, isActive }) => {
  return (
    <div 
      onClick={onClick}
      className={`flex flex-col items-center transition-all duration-200 cursor-pointer group ${isActive ? 'opacity-100' : 'opacity-80 hover:opacity-100'}`}
    >
      <div className={`
        text-3xl p-5 rounded-full 
        ${isActive ? 'bg-green-500 text-white shadow-lg' : 'bg-gray-100 text-gray-700'} 
        transition-all duration-300 
        group-hover:bg-green-400 group-hover:text-white
        flex items-center justify-center
      `}>
        <CiForkAndKnife className="transform group-hover:scale-110 transition-transform" />
      </div>
      <p className={`
        text-center font-medium mt-3 capitalize 
        ${isActive ? 'text-green-600 font-semibold' : 'text-gray-600'}
        transition-colors duration-300
        group-hover:text-green-500
      `}>
        {category}
      </p>
    </div>
  );
};

export default FilterProduct;