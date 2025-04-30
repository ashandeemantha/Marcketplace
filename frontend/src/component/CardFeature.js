import React from 'react';
import { Link } from 'react-router-dom';

const CardFeature = ({ image, name, price, category, loading, id }) => {
  const handleAddCartProduct = (e)=>{
    e.stopPropagation()
  }
  return (
    <div className='w-full min-w-[200px] max-w-[200px] bg-white hover:shadow-lg drop-shadow-lg py-5 px-4 cursor-pointer flex flex-col'>
      {
        image ? (
          <>
            <Link to={`/menu/${id}`} onClick={()=>window.scrollTo({top:"0",behavior : "smooth"})}> {/* ✅ Fixed here using backticks */}
              <div className='h-20 flex flex-col justify-center items-center'>
                <img src={image} className='h-full' alt='' />
              </div>
              <h3 className='font-semibold text-slate-600 capitalize text-lg mt-4 whitespace-nowrap overflow-hidden'>{name}</h3>
              <p className='text-slate-500 font-medium'>{category}</p>
              <p className='font-bold'><span className='text-red-500'>RS.</span><span>{price}</span></p>
              </Link>
              <button className='bg-green-400 py-1 my-2 rounded hover:bg-yellow-400 w-full' onClick={()=>handleAddCartProduct}>Add Cart</button>
            
          </>
        ) : (
          <div className='min-h-[1500px] flex justify-center items-center'> {/* Fixed typo: 'item-center' → 'items-center' */}
            <p>{loading}</p>
          </div>
        )
      }
    </div>
  );
}

export default CardFeature;