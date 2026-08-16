import React from 'react';
import { ShieldCheck, X, CreditCard, Zap } from 'lucide-react';

export default function PaymentModal({
  isOpen,
  onClose,
  checkoutForm,
  setCheckoutForm,
  paymentMethod,
  setPaymentMethod,
  processPayment,
  subtotal
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div onClick={onClose} className="absolute inset-0 bg-black/85 backdrop-blur-md"></div>
      
      {/* Modal Box */}
      <div className="relative bg-[#120b15] border border-rose-900/60 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl z-10 space-y-6">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-full hover:bg-rose-950/40 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 bg-rose-950/80 text-rose-300 border border-rose-500/40 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5" /> Secure Checkout
          </div>
          <h2 className="text-xl font-black text-white pt-1">Checkout & Delivery</h2>
          <p className="text-xs text-slate-400">Enter your discreet shipping details and preferred payment.</p>
        </div>

        {/* Form */}
        <form onSubmit={processPayment} className="space-y-4">
          
          {/* Full Name */}
          <div>
            <label className="text-[11px] font-bold text-slate-300 block mb-1">Full Name</label>
            <input 
              type="text"
              required
              value={checkoutForm.name}
              onChange={(e) => setCheckoutForm({ ...checkoutForm, name: e.target.value })}
              placeholder="Enter your name"
              className="w-full bg-[#07050a] text-slate-100 px-3.5 py-2.5 rounded-xl border border-rose-950 text-xs focus:border-rose-500 focus:outline-none transition shadow-inner"
            />
          </div>

          {/* Delivery Address */}
          <div>
            <label className="text-[11px] font-bold text-slate-300 block mb-1">Delivery Address</label>
            <textarea 
              required
              rows="2"
              value={checkoutForm.address}
              onChange={(e) => setCheckoutForm({ ...checkoutForm, address: e.target.value })}
              placeholder="Street, City, Pincode"
              className="w-full bg-[#07050a] text-slate-100 px-3.5 py-2.5 rounded-xl border border-rose-950 text-xs focus:border-rose-500 focus:outline-none transition shadow-inner resize-none"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="text-[11px] font-bold text-slate-300 block mb-1">Phone Number (For Order OTP)</label>
            <input 
              type="tel"
              required
              value={checkoutForm.phone}
              onChange={(e) => setCheckoutForm({ ...checkoutForm, phone: e.target.value })}
              placeholder="+91 98765 43210"
              className="w-full bg-[#07050a] text-slate-100 px-3.5 py-2.5 rounded-xl border border-rose-950 text-xs focus:border-rose-500 focus:outline-none transition shadow-inner tracking-wider"
            />
          </div>

          {/* Payment Method Selector */}
          <div className="pt-1">
            <label className="text-[11px] font-bold text-slate-300 block mb-2">Select Payment Method</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`py-2.5 px-4 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-2 ${
                  paymentMethod === 'upi' 
                    ? 'bg-rose-950/80 border-rose-500 text-rose-300 shadow-lg shadow-rose-950/50' 
                    : 'bg-[#07050a] border-rose-950/80 text-slate-400 hover:border-rose-900'
                }`}
              >
                <Zap className="w-3.5 h-3.5 text-amber-400" /> UPI / QR
              </button>
              
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`py-2.5 px-4 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-2 ${
                  paymentMethod === 'card' 
                    ? 'bg-rose-950/80 border-rose-500 text-rose-300 shadow-lg shadow-rose-950/50' 
                    : 'bg-[#07050a] border-rose-950/80 text-slate-400 hover:border-rose-900'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5 text-rose-400" /> Card Payment
              </button>
            </div>
          </div>

          {/* Conditional Input based on Payment Method */}
          {paymentMethod === 'upi' ? (
            <div>
              <label className="text-[11px] font-bold text-slate-300 block mb-1">UPI ID / VPA</label>
              <input 
                type="text"
                placeholder="username@oksbi / paytm"
                value={checkoutForm.upiId || ''}
                onChange={(e) => setCheckoutForm({ ...checkoutForm, upiId: e.target.value })}
                className="w-full bg-[#07050a] text-slate-100 px-3.5 py-2.5 rounded-xl border border-rose-950 text-xs focus:border-rose-500 focus:outline-none transition shadow-inner"
              />
            </div>
          ) : (
            <div>
              <label className="text-[11px] font-bold text-slate-300 block mb-1">Card Number</label>
              <input 
                type="text"
                placeholder="4532 •••• •••• 8901"
                value={checkoutForm.cardNumber || ''}
                onChange={(e) => setCheckoutForm({ ...checkoutForm, cardNumber: e.target.value })}
                className="w-full bg-[#07050a] text-slate-100 px-3.5 py-2.5 rounded-xl border border-rose-950 text-xs focus:border-rose-500 focus:outline-none transition shadow-inner tracking-wider"
              />
            </div>
          )}

          {/* Submit Button */}
          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 hover:opacity-90 text-white font-bold py-3.5 rounded-xl transition shadow-xl shadow-rose-600/30 text-xs mt-2 flex items-center justify-center gap-2"
          >
            <span>Pay ₹{subtotal.toFixed(2)} & Verify OTP</span>
            <span>🚀</span>
          </button>
        </form>

      </div>
    </div>
  );
}