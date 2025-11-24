import React from 'react'

const Footer = () => {
  return (
    <div>
        <footer className="bg-[#232F3E] text-gray-200 text-sm">
   
      <div className="bg-[#37475A] text-center py-3 text-white text-sm hover:bg-[#485769] cursor-pointer">
        Back to Top
      </div>
 
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-semibold mb-3">Get to Know Us</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">About Us</a></li>
            <li><a href="#" className="hover:underline">Careers</a></li>
            <li><a href="#" className="hover:underline">Press Releases</a></li>
            <li><a href="#" className="hover:underline">Amazon Science</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Connect with Us</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Facebook</a></li>
            <li><a href="#" className="hover:underline">Twitter</a></li>
            <li><a href="#" className="hover:underline">Instagram</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Make Money with Us</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Sell on Amazon</a></li>
            <li><a href="#" className="hover:underline">Sell under Amazon Accelerator</a></li>
            <li><a href="#" className="hover:underline">Protect and Build Your Brand</a></li>
            <li><a href="#" className="hover:underline">Amazon Global Selling</a></li>
            <li><a href="#" className="hover:underline">Become an Affiliate</a></li>
            <li><a href="#" className="hover:underline">Fulfilment by Amazon</a></li>
            <li><a href="#" className="hover:underline">Advertise Your Products</a></li>
            <li><a href="#" className="hover:underline">Amazon Pay on Merchants</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Let Us Help You</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Your Account</a></li>
            <li><a href="#" className="hover:underline">Returns Centre</a></li>
            <li><a href="#" className="hover:underline">100% Purchase Protection</a></li>
            <li><a href="#" className="hover:underline">Amazon App Download</a></li>
            <li><a href="#" className="hover:underline">Help</a></li>
          </ul>
        </div>
      </div>

  
      <div className="border-t border-gray-700 py-6 flex flex-col md:flex-row items-center justify-center gap-4">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold text-white">amazon</span>
          <span className="text-orange-500 text-lg">.in</span>
        </div>
        <div className="flex space-x-3">
          <button className="border border-gray-500 px-3 py-1 rounded-md flex items-center gap-2 hover:bg-gray-700">
            🌐 English
          </button>
          <button className="border border-gray-500 px-3 py-1 rounded-md flex items-center gap-2 hover:bg-gray-700">
            🇮🇳 India
          </button>
        </div>
      </div>

    
      <div className="bg-[#131A22] text-gray-400 text-xs py-6 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 text-center md:text-left">
          <div>
            <p className="font-semibold text-gray-300 mb-1">AbeBooks</p>
            <p>Books, art & collectibles</p>
          </div>
          <div>
            <p className="font-semibold text-gray-300 mb-1">Amazon Web Services</p>
            <p>Scalable Cloud Computing Services</p>
          </div>
          <div>
            <p className="font-semibold text-gray-300 mb-1">Audible</p>
            <p>Download Audio Books</p>
          </div>
          <div>
            <p className="font-semibold text-gray-300 mb-1">IMDb</p>
            <p>Movies, TV & Celebrities</p>
          </div>
          <div>
            <p className="font-semibold text-gray-300 mb-1">Amazon Prime Music</p>
            <p>100 million songs, ad-free</p>
          </div>
        </div>

     
        <div className="text-center mt-6 space-x-4">
          <a href="#" className="hover:underline text-gray-300">Conditions of Use & Sale</a>
          <a href="#" className="hover:underline text-gray-300">Privacy Notice</a>
          <a href="#" className="hover:underline text-gray-300">Interest-Based Ads</a>
        </div>

        <p className="text-center mt-2 text-gray-400">
          © 1996–2024, Amazon.com, Inc. or its affiliates
        </p>
      </div>
    </footer>
    </div>
  )
}

export default Footer
