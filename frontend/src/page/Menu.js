/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import AllProduct from '../component/AllProduct'
import { addCartItem } from '../redux/productslide'

const Menu = () => {
  const { filterby } = useParams()
  const productData = useSelector(state => state.product.productList)
  const dispatch = useDispatch()

  const productDisplay = productData.filter(el => el._id === filterby)[0]

  const handleAddCartProduct = () => {
    dispatch(addCartItem({
      _id: productDisplay._id,
      name: productDisplay.name,
      price: productDisplay.price,
      category: productDisplay.category,
      image: productDisplay.image
    }))
  }

  if (!productDisplay) {
    return <div className="p-4 text-center text-red-500 font-semibold">Product not found</div>
  }

  return (
    <div className='p-2 md:p-4'>
     <div className='w-full max-w-4xl m-auto md:flex bg-white'>
      <div className='max-w-sm overflow-hidden w-full p-5'>
        <img src={productDisplay.image} className='hover:scale-105 transition-all h-full'/>
      </div>
      <div className='flex flex-col gap-1'>
      <h3 className='font-semibold text-slate-600  capitalize text-3xl md:text-4xl'>{productDisplay.name}</h3>
        <p className=' text-slate-500 font-medium text-2xl'>{productDisplay.category}</p>
        <p className='font-bold md:text-2xl'>
          <span className='text-red-500'>RS.</span>
          <span>{productDisplay.price}</span>
        </p>

        <div className='flex gap-3'>
        <button className='bg-green-400 py-1 my-2 rounded hover:bg-yellow-400 min-w-[100px]'>Buy</button>
        <button className='bg-green-400 py-1 my-2 rounded hover:bg-yellow-400 min-w-[100px]' onClick={handleAddCartProduct}>Add Cart</button>
        </div>
        <div>
          <p className='text-slate-600 font-medium'>Description :</p>
          <p>{productDisplay.description}</p>
        </div>
        
      </div>
     </div>
     <AllProduct heading={"Related Product"}/>
    </div>
  )
}

export default Menu
