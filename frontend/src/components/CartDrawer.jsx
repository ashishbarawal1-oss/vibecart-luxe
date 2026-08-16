import React from 'react';
import { X, ShoppingBag, Sparkles, Trash2, ArrowRight } from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  totalCartCount,
  updateQty,
  subtotal,
  startCheckoutProcess,
  getFormattedPrice
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div onClick={onClose} className="absolute inset-0 bg-black/85 backdrop-blur-md"></div>

      {/* Drawer Box */}
      <div className="relative bg-[#120b15] border-l border-rose-900/60 w-full max-w-md h-full flex flex-col z-10 shadow-2xl">
        
        {/* Header */}
        <div className="p-6 border-b border-rose-950 flex items-center justify-between">
          <h2 className="text-base font-black text-white flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-rose-400" />
            <span>Shopping Cart</span>
            <span className="bg-rose-950/80 text-rose-300 border border-rose-500/40 text-[10px] px-2.5 py-0.5 rounded-full font-bold shadow-sm">
              {totalCartCount} items
            </span>
          </h2>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-white p-2 rounded-full hover:bg-rose-950/45 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-24 text-slate-400 space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-rose-950/50 border border-rose-900/40 flex items-center justify-center mx-auto text-rose-400 shadow-inner">
                <ShoppingBag className="w-8 h-8 opacity-70" />
              </div>
              <p className="text-xs font-bold text-slate-300">Your cart is empty!</p>
              <p className="text-[11px] text-slate-500">Explore our exclusive luxury drops and add items.</p>
            </div>
          ) : (
            cartItems.map((item) => {
              const itemId = item._id || item.id;
              return (
                <div key={itemId} className="bg-[#07050a] border border-rose-950 rounded-2xl p-3.5 flex items-center gap-4 shadow-inner group">
                  <div className="w-16 h-16 bg-[#120b15] rounded-xl p-2 flex items-center justify-center shrink-0 border border-rose-950/80 shadow-md">
                    <img src={item.image} alt={item.title || item.name} className="max-h-full max-w-full object-contain" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-200 truncate group-hover:text-rose-300 transition">
                      {item.title || item.name}
                    </h4>
                    <p className="text-xs font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-300 to-amber-200 mt-0.5">
                      {getFormattedPrice(item)}
                    </p>
                    
                    <div className="flex items-center gap-2.5 mt-2.5">
                      <button 
                        onClick={() => updateQty(itemId, -1)} 
                        className="w-6 h-6 rounded-lg bg-rose-950/60 border border-rose-900/50 text-rose-300 font-bold flex items-center justify-center hover:bg-rose-900 transition"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold text-slate-200 w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQty(itemId, 1)} 
                        className="w-6 h-6 rounded-lg bg-rose-950/60 border border-rose-900/50 text-rose-300 font-bold flex items-center justify-center hover:bg-rose-900 transition"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Subtotal & Checkout */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-rose-950 bg-[#07050a] space-y-4 shadow-2xl">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400">
              <span className="uppercase tracking-wider">Subtotal</span>
              <span className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-300 to-amber-200">
                ₹{subtotal.toFixed(2)}
              </span>
            </div>
            
            <button
              onClick={startCheckoutProcess}
              className="w-full bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 hover:opacity-90 text-white font-bold py-3.5 rounded-2xl text-xs shadow-xl shadow-rose-600/30 transition active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Proceed to Secure Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}