import React from 'react';

export default function Footer() {
  return (
    <footer className="relative bg-[#07050a] border-t border-rose-950/50 pt-20 pb-12 overflow-hidden mt-20">
      
      {/* Background Glowing Ambient Light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-40 bg-gradient-to-r from-rose-600/10 via-pink-600/10 to-amber-500/10 blur-[140px] pointer-events-none rounded-full"></div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        
        {/* Top Banner Box inside Footer */}
        <div className="bg-gradient-to-r from-rose-950/40 via-[#120b10] to-rose-950/40 border border-rose-900/40 rounded-3xl p-8 mb-16 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-xl shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[10px] font-black tracking-widest uppercase text-rose-400 bg-rose-950/60 px-3 py-1 rounded-full border border-rose-500/30">
              ✨ Exclusive Perks
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">Get 15% Off Your First Luxe Order</h3>
            <p className="text-xs text-slate-400 max-w-md">
              Join our private circle to unlock secret drops, VIP styling tips, and private discounts instantly.
            </p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed successfully! 🎉 Check your email for the 15% off code.'); }} className="flex w-full md:w-auto gap-2">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              required
              className="bg-[#07050a] border border-rose-900/60 text-slate-200 text-xs px-4 py-3 rounded-xl focus:outline-none focus:border-rose-500 min-w-[240px] shadow-inner"
            />
            <button 
              type="submit"
              className="bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 hover:opacity-90 text-white font-bold px-6 py-3 rounded-xl text-xs transition shadow-lg shadow-rose-600/30 shrink-0"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 pb-12 border-b border-rose-950/50">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 via-pink-500 to-amber-400 flex items-center justify-center font-black text-white shadow-lg shadow-rose-500/30">
                💎
              </div>
              <span className="text-lg font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-300 to-amber-200">
                VibeCart Luxe
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Redefining modern elegance with curated luxury collections, ultra-soft silhouettes, and timeless designs built for absolute confidence.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-rose-400">Navigation</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><a href="#marketplace" className="hover:text-rose-300 transition">Explore Collection</a></li>
              <li><a href="#marketplace" className="hover:text-rose-300 transition">Lingerie & Panties</a></li>
              <li><a href="#marketplace" className="hover:text-rose-300 transition">Designer Drops</a></li>
              <li><a href="#marketplace" className="hover:text-rose-300 transition">Best Sellers</a></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-rose-400">Customer Care</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><a href="#track" className="hover:text-rose-300 transition">Track Order</a></li>
              <li><a href="#shipping" className="hover:text-rose-300 transition">Shipping & Delivery</a></li>
              <li><a href="#returns" className="hover:text-rose-300 transition">Returns & Exchanges</a></li>
              <li><a href="#faq" className="hover:text-rose-300 transition">Size Guide & FAQ</a></li>
            </ul>
          </div>

          {/* Secure Experience Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-rose-400">Secure Experience</h4>
            <p className="text-xs text-slate-400">
              All transactions are encrypted with end-to-end industry standard security protocols.
            </p>
            <div className="pt-2 flex items-center gap-3 text-lg">
              <span className="bg-rose-950/40 border border-rose-900/40 px-3 py-1.5 rounded-lg text-xs font-bold text-rose-300">🔒 SSL Secured</span>
              <span className="bg-rose-950/40 border border-rose-900/40 px-3 py-1.5 rounded-lg text-xs font-bold text-amber-300">⚡ UPI / Cards</span>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Legal Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 VibeCart Luxe Inc. Crafted with absolute precision.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-rose-300 transition">Privacy Policy</a>
            <a href="#terms" className="hover:text-rose-300 transition">Terms of Service</a>
            <a href="#security" className="hover:text-rose-300 transition">Security Protocol</a>
          </div>
        </div>

      </div>
    </footer>
  );
}