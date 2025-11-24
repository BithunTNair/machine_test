import React from 'react'
import { ShoppingCart, Menu, ChevronDown, Globe } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate= useNavigate();
  return (
    <>
      <header className="w-full bg-white">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="p-2"><Menu size={20} /></button>
            <a href="#" className="text-lg font-bold">
              amazon<span className="text-orange-500">.in</span>
            </a>
          </div>

       
          {/* <div className="hidden sm:flex flex-1 mx-6 items-center gap-2">
            <input
              type="search"
              placeholder="Search Amazon"
              className="flex-1 px-3 py-2 text-sm border rounded"
            />
            <button className="px-3 py-2 bg-yellow-400 rounded">Search</button>
          </div> */}

        
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 text-sm hover:underline">
              <span className="text-xs">Hello,</span>
              <span className="font-medium">Sign in</span>
              <ChevronDown size={14} />
            </button>

            <button className="flex items-center gap-1 text-sm hover:underline">
              <span className="text-xs">Returns</span>
              <span className="font-medium">& Orders</span>
            </button>

            <a className="relative flex items-center gap-2">
              <ShoppingCart size={20} onClick={()=>{navigate('/cart')}}  />
              <span className="text-sm font-medium" >Cart</span>
              <span className="absolute -top-2 -right-3 bg-yellow-400 text-black text-xs font-semibold rounded-full px-2">0</span>
            </a>
          </div>
        </div>

     
        <nav className="bg-[#13181A] text-sm text-white/90">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-10 gap-6 overflow-x-auto">
              <a href="#" className="flex items-center gap-2 hover:text-white">
                <Globe size={14} />
                <span>EN</span>
              </a>
              <a href="#" className="hover:text-white">All</a>
              <a href="#" className="hover:text-white">Amazon mini TV</a>
              <a href="#" className="hover:text-white">Best Sellers</a>
              <a href="#" className="hover:text-white">Today's Deals</a>
              <a href="#" className="hover:text-white">Mobiles</a>
              <a href="#" className="hover:text-white">Customer Service</a>
              <a href="#" className="hover:text-white">Prime</a>
              <a href="#" className="hover:text-white">Electronics</a>
              <a href="#" className="hover:text-white">Fashion</a>
              <a href="#" className="hover:text-white">New Releases</a>
              <a href="#" className="hover:text-white">Home & Kitchen</a>
            </div>
          </div>
        </nav>

        <div className="sm:hidden bg-white px-4 py-2 border-t">
          <div className="flex items-center gap-2">
            <input
              type="search"
              placeholder="Search Amazon"
              className="flex-1 px-3 py-2 text-sm border rounded"
            />
            <button className="px-3 py-2 bg-yellow-400 rounded">Search</button>
          </div>
        </div>
      </header>
    </>
  )
}

export default Navbar
