import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className='flex flex-col md:flex-row md:justify-start justify-center items-center py-1'>
        <div className="flex flex-col md:flex-row logo mx-5 mt-3 mb-3">
            <Image className=' rounded-3xl' width={50} height={40} src="/logo.jpg" alt='Logo' />
            <h3 className=' font-bold text-gray-700 mt-3 md:text-xl'>TrendyClothes</h3>

            </div>
            <div className="nav">
                <ul className="flex items-center space-x-2 md:text-lg font-semibold">
                    <Link href={"/"}><li>Tshirts</li></Link>
                    <Link href={"/"}><li>Hoodies</li></Link>
                    <Link href={"/"}><li>Stickers</li></Link>
                    <Link href={"/"}><li>Mugs</li></Link>
                </ul>
                </div>  
                <div className='cart absolute right-0 top-2 mx-5'>
                    <FaShoppingCart className=' text-xl md:text-4xl mt-3'/>
                    </div>   
    </div>
  )
}

export default Navbar