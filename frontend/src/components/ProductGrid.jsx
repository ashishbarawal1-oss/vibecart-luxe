import React from 'react';
import { Loader2, Sparkles, Star, ShoppingBag } from 'lucide-react';

export default function ProductGrid({ products, loading, error, addToCart, onSelectProduct }) {
  return (
    <section id="marketplace" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex justify-between items-end mb-8">
        <div>
          <span className="inline-flex items-center gap-1 text-[10px] font-black tracking-widest text-rose-400 uppercase bg-rose-950/80 px-2.5 py-1 rounded-full border border-rose-900/50 mb-2 shadow-sm">
            <Sparkles className="w-3 h-3 text-amber-400" /> Exclusive Collection
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">Featured Luxury Drops</h2>
          <p className="text-slate-400 text-xs mt-1">Fetched directly from MongoDB Database ✨</p>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-20 text-rose-400">
          <Loader2 className="w-8 h-8 animate-spin mr-3" />
          <span className="font-bold text-sm tracking-wide">Loading Products from Database...</span>
        </div>
      )}

      {error && (
        <div className="bg-rose-950/40 text-rose-300 p-4 rounded-2xl border border-rose-900/60 text-center font-medium my-8 text-xs shadow-lg">
          ⚠️ {error}
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((item) => {
            const itemId = item._id || item.id;
            return (
              <div 
                key={itemId} 
                className="bg-[#120b15] rounded-3xl p-4 border border-rose-950 hover:border-rose-900/80 transition duration-300 shadow-xl group flex flex-col justify-between"
              >
                <div>
                  {/* Product Image Box */}
                  <div 
                    onClick={() => onSelectProduct && onSelectProduct(item)}
                    className="relative overflow-hidden rounded-2xl bg-[#07050a] mb-4 h-52 flex items-center justify-center border border-rose-950 cursor-pointer shadow-inner"
                  >
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500 drop-shadow-xl"
                    />
                    <span className="absolute top-2.5 right-2.5 bg-[#07050a]/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-amber-300 border border-rose-950 flex items-center gap-1 shadow-md">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {item.rating || "4.8"}
                    </span>
                  </div>

                  <span className="text-[10px] font-black uppercase tracking-widest text-rose-400">{item.category}</span>
                  <h3 
                    onClick={() => onSelectProduct && onSelectProduct(item)}
                    className="font-bold text-slate-100 text-sm mt-1 line-clamp-2 cursor-pointer hover:text-rose-300 transition"
                  >
                    {item.name || item.title}
                  </h3>
                </div>
                
                {/* Price & Action */}
                <div className="flex items-center justify-between mt-5 pt-3 border-t border-rose-950/80">
                  <span className="text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-300 to-amber-200">
                    ₹{Number(item.price).toLocaleString('en-IN')}
                  </span>
                  
                  <button 
                    onClick={(e) => addToCart(item, e)}
                    className="bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 hover:opacity-90 text-white text-xs font-bold px-3.5 py-2.5 rounded-xl transition shadow-md shadow-rose-600/20 active:scale-95 flex items-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}