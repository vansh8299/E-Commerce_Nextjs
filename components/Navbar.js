import Image from 'next/image'
import Link from 'next/link'
import React, { useRef } from 'react'
import { FaShoppingCart } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { CiCirclePlus } from "react-icons/ci";
import { FaCircleMinus } from "react-icons/fa6";
import { FaCirclePlus } from "react-icons/fa6";
import { IoBagCheckSharp } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";

const Navbar = ({cart, addToCart, removeFromCart, clearCart, subtotal}) => {
   const toggleCart = () => {
    if(ref.current.classList.contains('translate-x-full')){
      ref.current.classList.remove('translate-x-full')
      ref.current.classList.add('translate-x-0')
    }
   else if(ref.current.classList.contains('translate-x-0')){
      ref.current.classList.remove('translate-x-0')
      ref.current.classList.add('translate-x-full')
    }

   }

   const ref = useRef()

  return (
    <div className='flex flex-col md:flex-row md:justify-start justify-center items-center py-1 my-1 shadow-md sticky top-0 bg-white z-10'>
        <div className="flex flex-col md:flex-row logo mx-5 mt-3 mb-3">
            <Link href={"/"} className='cursor-pointer'><Image className=' rounded-3xl' width={50} height={40} src="/logo.jpg" alt='Logo' /></Link>
            <h3 className=' font-bold text-gray-700 mt-3 md:text-xl'>TrendyClothes</h3>

            </div>
            <div className="nav">
                <ul className="flex items-center space-x-6 md:text-md ml-1 md:ml-16 font-semibold">
                    <Link href={"/tshirt"}><li>Tshirts</li></Link>
                    <Link href={"/hoodies"}><li>Hoodies</li></Link>
                    <Link href={"/stickers"}><li>Stickers</li></Link>
                    <Link href={"/mugs"}><li>Mugs</li></Link>
                </ul>
                </div>  
                <div className='cart absolute right-0 top-4 mx-5 flex'>
                   <Link href={"/login"}><MdAccountCircle className='text-xl md:text-2xl mx-2 mt-3 mr-2'/></Link>
                    <FaShoppingCart onClick={toggleCart} className=' text-xl md:text-2xl mt-3 cursor-pointer'/>
                    </div> 

                 <div ref={ref} className='w-72 h-{100vh} siideCart absolute top-0 right-0 bg-purple-100 px-4 py-10 transform transition-transform translate-x-full z-50'>
                  <h2 className='font-bold text-xl text-center'>Shopping Cart</h2>
                  <span onClick={toggleCart} className='absolute top-5 right-2 cursor-pointer text-2xl text-purple-500'><IoMdCloseCircle/></span>
                  <ol className='list-decimal font-semibold ml-4'>
                    {Object.keys(cart).length===0 && <div className='my-4 font-semibold'>Your cart is Empty!</div>}
                   {Object.keys(cart).map((k)=>{return <li key={k}>
                      <div className="item flex my-5">
                      <div className='w-2/3 font-semibold'>{cart[k].name}</div>
                      <div className='flex font-semibold items-center justify-center w-1/3 text-lg'><FaCircleMinus onClick={()=>{removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant)}} className='cursor-pointer text-purple-500'/> <span className='mx-2 text-sm'>{cart[k].qty}</span> <FaCirclePlus onClick={()=>{addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant)}} className='cursor-pointer text-purple-500'/></div>
                      </div>
                    </li>})}
                  
                  </ol>
                  <div className="total font-semibold mx-2 p-2">Subtotal = ₹{subtotal}</div>
                  <div className="flex">
                  <Link href={"/checkout"}><button className="flex ml-5 text-white bg-purple-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-sm"><IoBagCheckSharp className='m-1'/>Check Out</button></Link>
                  <button onClick={clearCart} className="flex ml-5 text-white bg-purple-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-sm">Clear Cart</button>
                  </div>
                  </div>     
    </div>
  )
}

export default Navbar