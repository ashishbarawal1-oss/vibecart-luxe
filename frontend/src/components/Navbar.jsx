import React from 'react';
import { ShoppingBag, Search, User, ShoppingCart, Heart, Menu, X } from 'lucide-react';

export default function Navbar({ cartCount, onOpenCart, isMenuOpen, setIsMenuOpen }) {
  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-rose-950 via-[#1a0c16] to-rose-950 text-rose-200 text-xs text-center py-2 px-4 font-medium tracking-wide border-b border-rose-900/40">
        ✨ FREE Express Discreet Delivery on all orders above ₹999! Code: <span className="text-amber-400 font-bold">LUXE2026</span>
      </div>

      {/* Sticky Main Navigation */}
      <nav className="sticky top-0 z-40 bg-[#07050a]/90 backdrop-blur-xl border-b border-rose-950/60 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Brand Logo */}
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 via-pink-500 to-amber-400 flex items-center justify-center font-black text-white shadow-lg shadow-rose-500/30">
                💎
              </div>
              <span className="text-xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-300 to-amber-200">
                VibeCart Luxe
              </span>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8 font-medium text-xs uppercase tracking-wider text-slate-300">
              <a href="#home" className="text-rose-400 font-bold hover:text-rose-300 transition">Home</a>
              <a href="#marketplace" className="hover:text-rose-400 transition">Explore Collection</a>
              <a href="#categories" className="hover:text-rose-400 transition">Categories</a>
              <a href="#deals" className="hover:text-rose-400 transition text-amber-300">Hot Drops 🔥</a>
            </div>

            {/* Search Bar */}
            <div className="hidden lg:flex items-center bg-[#120b15] border border-rose-950 rounded-full px-4 py-2 w-72 focus-within:ring-2 focus-within:ring-rose-500/50 transition shadow-inner">
              <Search className="w-4 h-4 text-rose-400 mr-2" />
              <input 
                type="text" 
                placeholder="Search luxury intimates, satin sets..." 
                className="bg-transparent border-none outline-none text-xs w-full text-slate-200 placeholder-slate-500"
              />
            </div>

            {/* Action Buttons (Wishlist, User, Cart, Mobile Menu) */}
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-rose-950/40 rounded-full text-slate-300 hover:text-rose-300 transition">
                <Heart className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-rose-950/40 rounded-full text-slate-300 hover:text-rose-300 transition">
                <User className="w-5 h-5" />
              </button>
              
              {/* Shopping Cart Button with Badge */}
              <button 
                onClick={onOpenCart}
                className="relative p-2.5 bg-rose-950/60 border border-rose-900/50 text-rose-300 rounded-full hover:bg-rose-900/50 transition shadow-lg shadow-rose-950/50"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-rose-600 to-pink-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#07050a] shadow-md animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle Button */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-slate-300 hover:bg-rose-950/40 rounded-lg transition"
              >
                {isMenuOpen ? <X className="w-6 h-6 text-rose-400" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-rose-950/60 bg-[#07050a]/95 backdrop-blur-2xl px-6 py-5 space-y-4">
            <a href="#home" className="block text-rose-400 font-bold text-xs uppercase tracking-wider">Home</a>
            <a href="#marketplace" className="block text-slate-300 hover:text-rose-300 font-medium text-xs uppercase tracking-wider transition">Explore Collection</a>
            <a href="#categories" className="block text-slate-300 hover:text-rose-300 font-medium text-xs uppercase tracking-wider transition">Categories</a>
            <a href="#deals" className="block text-amber-300 font-medium text-xs uppercase tracking-wider transition">Hot Drops 🔥</a>
          </div>
        )}
      </nav>
    </>
  );
}