import React from "react";
import { TbPlus, TbMinus } from "react-icons/tb";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { deleteCartItem, increaseQty, decreaseQty } from "../redux/productslide";

const CartProduct = ({ _id, name, image, category, qty, total, price }) => {
  const dispatch = useDispatch();

  const handleIncrease = () => {
    dispatch(increaseQty(_id));
  };

  const handleDecrease = () => {
    if (qty > 1) {
      dispatch(decreaseQty(_id));
    }
  };

  return (
    <div className="bg-white p-4 flex gap-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
      <div className="flex-shrink-0">
        <div className="h-32 w-32 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
          <img 
            src={image} 
            className="h-full w-full object-cover" 
            alt={name}
            loading="lazy"
          />
        </div>
      </div>
      
      <div className="flex flex-col gap-2 flex-grow">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-gray-800 text-lg line-clamp-1">
              {name}
            </h3>
            <p className="text-gray-500 text-sm">{category}</p>
          </div>
          <button 
            onClick={() => dispatch(deleteCartItem(_id))}
            className="text-gray-400 hover:text-red-500 transition-colors p-1"
            aria-label="Remove item"
          >
            <AiFillDelete className="text-xl" />
          </button>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-gray-200 rounded-full">
              <button
                onClick={handleDecrease}
                disabled={qty <= 1}
                className={`p-2 rounded-l-full ${qty <= 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
                aria-label="Decrease quantity"
              >
                <TbMinus />
              </button>
              <span className="px-3 font-medium text-gray-800">{qty}</span>
              <button
                onClick={handleIncrease}
                className="p-2 rounded-r-full text-gray-600 hover:bg-gray-100"
                aria-label="Increase quantity"
              >
                <TbPlus />
              </button>
            </div>
            
            <span className="text-gray-500 text-sm hidden md:inline">
              RS.{price} each
            </span>
          </div>

          <div className="flex flex-col items-end">
            <p className="text-gray-500 text-sm line-through hidden md:block">
              RS.{(price * 1.1).toFixed(2)}
            </p>
            <p className="font-bold text-lg text-gray-800">
              RS.{total.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;