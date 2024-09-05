import Image from 'next/image'
import Link from 'next/link'
import React, { useRef } from 'react'
import { FaShoppingCart } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { CiCirclePlus } from "react-icons/ci";
import { FaCircleMinus } from "react-icons/fa6";
import { FaCirclePlus } from "react-icons/fa6";
import { IoBagCheckSharp } from "react-icons/io5";

const Navbar = () => {
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
    <div className='flex flex-col md:flex-row md:justify-start justify-center items-center py-1 my-1 shadow-md'>
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
                <div onClick={toggleCart} className='cart absolute right-0 top-2 mx-5'>
                    <FaShoppingCart className=' text-xl md:text-4xl mt-3 cursor-pointer'/>
                    </div> 

                 <div ref={ref} className='slidebar w-100 h-full absolute top-0 right-0 bg-purple-100 px-4 py-10 transform transition-transform translate-x-full z-50'>
                  <h2 className='font-bold text-xl text-center'>Shopping Cart</h2>
                  <span onClick={toggleCart} className='absolute top-5 right-2 cursor-pointer text-2xl text-purple-500'><IoMdCloseCircle/></span>
                  <ol className='list-decimal font-semibold ml-4'>
                    <li>
                      <div className="item flex my-5">
                      <div className='w-2/3 font-semibold'>Tshirt - wear the trend</div>
                      <div className='flex font-semibold items-center justify-center w-1/3 text-lg'><FaCircleMinus className='cursor-pointer text-purple-500'/> <span className='mx-2 text-sm'>1</span> <FaCirclePlus className='cursor-pointer text-purple-500'/></div>
                      </div>
                    </li>
                    <li>
                      <div className="item flex my-5">
                      <div className='w-2/3 font-semibold'>Tshirt - wear the trend</div>
                      <div className='flex font-semibold items-center justify-center w-1/3 text-lg'><FaCircleMinus className='cursor-pointer text-purple-500'/> <span className='mx-2 text-sm'>1</span> <FaCirclePlus className='cursor-pointer text-purple-500'/></div>
                      </div>
                    </li>
                    <li>
                      <div className="item flex my-5">
                      <div className='w-2/3 font-semibold'>Tshirt - wear the trend</div>
                      <div className='flex font-semibold items-center justify-center w-1/3 text-lg'><FaCircleMinus className='cursor-pointer text-purple-500'/> <span className='mx-2 text-sm'>1</span> <FaCirclePlus className='cursor-pointer text-purple-500'/></div>
                      </div>
                    </li>
                    <li>
                      <div className="item flex my-5">
                      <div className='w-2/3 font-semibold'>Tshirt - wear the trend</div>
                      <div className='flex font-semibold items-center justify-center w-1/3 text-lg'><FaCircleMinus className='cursor-pointer text-purple-500'/> <span className='mx-2 text-sm'>1</span> <FaCirclePlus className='cursor-pointer text-purple-500'/></div>
                      </div>
                    </li>
                    <li>
                      <div className="item flex my-5">
                      <div className='w-2/3 font-semibold'>Tshirt - wear the trend</div>
                      <div className='flex font-semibold items-center justify-center w-1/3 text-lg'><FaCircleMinus className='cursor-pointer text-purple-500'/> <span className='mx-2 text-sm'>1</span> <FaCirclePlus className='cursor-pointer text-purple-500'/></div>
                      </div>
                    </li>
                   
                  </ol>
                  <div className="flex">
                  <button className="flex ml-5 text-white bg-purple-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-sm"><IoBagCheckSharp className='m-1'/>Check Out</button>
                  <button className="flex ml-5 text-white bg-purple-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-sm">Clear Cart</button>
                  </div>
                  </div>     
    </div>
  )
}

export default Navbar