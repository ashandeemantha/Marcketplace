
import React from 'react'
import { Link } from 'react-router-dom';
import backgroundImage from '../assest/vegetable-background.jpeg';

const HomeCard = ({name,image,category,price, loading,id}) => {
  return (
<div className='shadow-md p-2 rounded min-w-[150px] min-h-[200px] bg-cover bg-center bg-gray-200 hover:scale-110 transition-transform duration-300 ease-in-out' style={{backgroundImage: `url(${backgroundImage})`}}>
        { name ? (
         <>
         <Link to={`/menu/${id}`} onClick={()=>window.scrollTo({top:"0",behavior : "smooth"})}> 
        <div className='w-40 min-h-[150px] bg-transparent'>
        <img src={image} className='h-full w-full' alt=''/>
        </div>
        <h3 className='font-semibold text-white text-center capitalize text-lg'>{name}</h3>
        <p className='text-center text-white font-medium'>{category}</p>
        <p className='text-center font-bold text-white'><span className='text-red-500'>RS.</span><span>{price}</span></p>
        </Link>
         </>
            )
            :
            <div className='flex justify-center items-center h-full'>
                <p>{loading}</p> 
            </div>
        }
    </div>
  )
}

export default HomeCard
