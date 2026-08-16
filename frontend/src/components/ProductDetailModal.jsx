import React from 'react';
import { X, Sparkles, Star, ShoppingBag } from 'lucide-react';

export default function ProductDetailModal({ 
  selectedProduct, 
  setSelectedProduct, 
  addToCart, 
  getFormattedPrice 
}) {
  if (!selectedProduct) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div onClick={() => setSelectedProduct(null)} className="absolute inset-0 bg-black/85 backdrop-blur-md"></div>
      
      {/* Modal Box */}
      <div className="relative bg-[#120b15] border border-rose-900/60 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl z-10 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
        
        {/* Close Button */}
        <button 
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-full hover:bg-rose-950/40 transition z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image */}
        <div className="aspect-square bg-[#07050a] rounded-2xl p-6 flex items-center justify-center border border-rose-950 shadow-inner relative group">
          <img 
            src={selectedProduct.image} 
            alt={selectedProduct.title} 
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-300 drop-shadow-2xl"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-4">
          <div>
            <span className="inline-flex items-center gap-1 text-[10px] font-black tracking-widest text-rose-400 uppercase bg-rose-950/80 px-2.5 py-1 rounded-full border border-rose-900/50 mb-2">
              <Sparkles className="w-3 h-3 text-amber-400" /> {selectedProduct.category}
            </span>
            <h2 className="text-base sm:text-lg font-black text-white leading-snug">
              {selectedProduct.title || selectedProduct.name}
            </h2>
          </div>

          <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
            {selectedProduct.description || "High quality product crafted with premium standards for ultimate luxury and comfort."}
          </p>
          
          <div className="flex items-center justify-between pt-1">
            <div>
              <span className="text-[9px] text-slate-400 block font-bold uppercase tracking-wider">Price</span>
              <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-300 to-amber-200">
                {getFormattedPrice(selectedProduct)}
              </span>
            </div>
            
            <div className="flex items-center gap-1 bg-amber-500/10 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-bold shadow-inner">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{selectedProduct.rating?.stars || selectedProduct.rating?.rate || "4.8"}</span>
            </div>
          </div>

          <button 
            onClick={(e) => { addToCart(selectedProduct, e); setSelectedProduct(null); }}
            className="w-full bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 hover:opacity-90 text-white font-bold py-3 rounded-xl transition text-xs shadow-lg shadow-rose-600/30 active:scale-95 flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add to Cart ✨</span>
          </button>
        </div>

      </div>
    </div>
  );
}