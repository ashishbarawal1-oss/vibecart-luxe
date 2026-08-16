import React from 'react';
import { Check, Sparkles } from 'lucide-react';

export default function SuccessModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div onClick={onClose} className="absolute inset-0 bg-black/90 backdrop-blur-md"></div>
      
      {/* Modal Box */}
      <div className="relative bg-[#120b15] border border-rose-900/60 rounded-3xl max-w-md w-full p-8 text-center shadow-2xl z-10 space-y-5">
        
        {/* Success Icon Badge */}
        <div className="w-16 h-16 rounded-2xl bg-rose-950/80 text-rose-400 flex items-center justify-center mx-auto border border-rose-500/40 shadow-inner shadow-rose-950">
          <Check className="w-8 h-8 stroke-[3]" />
        </div>

        {/* Heading & Text */}
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1 text-[10px] font-black tracking-widest text-amber-300 uppercase bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30">
            <Sparkles className="w-3 h-3" /> Order Confirmed
          </div>
          <h2 className="text-xl font-black text-white pt-1">Order Placed Successfully!</h2>
          <p className="text-xs text-slate-400 leading-relaxed px-2">
            Thank you for shopping with <span className="text-rose-300 font-bold">VibeCart Luxe</span>. Your discreet order is successfully placed and on its way! ✨
          </p>
        </div>

        {/* Continue Shopping Button */}
        <button
          onClick={onClose}
          className="w-full bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 hover:opacity-90 text-white font-bold py-3.5 rounded-xl text-xs shadow-xl shadow-rose-600/30 transition active:scale-95 flex items-center justify-center gap-2"
        >
          <span>Continue Shopping</span>
          <span>🛍️</span>
        </button>
        
      </div>
    </div>
  );
}