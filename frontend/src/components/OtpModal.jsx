import React, { useState } from 'react';
import { X, ShieldCheck } from 'lucide-react';

export default function OtpModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1); // 1: Enter Phone, 2: Enter OTP
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');

  if (!isOpen) return null;

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (phone.length < 10) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }
    setStep(2);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp.length < 4) {
      alert('Please enter a valid 4-digit OTP');
      return;
    }
    alert('🎉 Login successful! Welcome to VibeCart Luxe.');
    onClose();
    setStep(1);
    setPhone('');
    setOtp('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md px-4">
      <div className="bg-[#120b15] border border-rose-900/60 w-full max-w-md rounded-3xl p-6 sm:p-8 relative shadow-2xl space-y-6">
        
        {/* Close Button */}
        <button 
          onClick={() => { onClose(); setStep(1); }}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-2"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-rose-950/80 border border-rose-800/50 flex items-center justify-center mx-auto text-rose-400 shadow-inner">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-black text-white">
            {step === 1 ? 'Luxe Member Sign In' : 'Verify Mobile OTP'}
          </h3>
          <p className="text-xs text-slate-400">
            {step === 1 ? 'Enter your mobile number to get instant access.' : `Enter the 4-digit code sent to +91 ${phone}`}
          </p>
        </div>

        {step === 1 ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div className="flex items-center bg-[#07050a] border border-rose-950 rounded-xl px-4 py-3 focus-within:border-rose-500 transition">
              <span className="text-xs text-slate-400 font-bold mr-2">+91</span>
              <input 
                type="tel" 
                maxLength="10"
                placeholder="Enter mobile number" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="bg-transparent border-none outline-none text-xs w-full text-slate-200 tracking-wider"
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 hover:opacity-90 text-white font-bold py-3 rounded-xl text-xs transition shadow-lg shadow-rose-600/30"
            >
              Send OTP ✨
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="bg-[#07050a] border border-rose-950 rounded-xl px-4 py-3 focus-within:border-rose-500 transition">
              <input 
                type="text" 
                maxLength="4"
                placeholder="Enter 4-digit OTP (e.g. 1234)" 
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="bg-transparent border-none outline-none text-center text-sm font-mono w-full text-slate-200 tracking-widest"
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 hover:opacity-90 text-white font-bold py-3 rounded-xl text-xs transition shadow-lg shadow-rose-600/30"
            >
              Verify & Proceed 🚀
            </button>
            <div className="text-center">
              <button 
                type="button" 
                onClick={() => setStep(1)} 
                className="text-[11px] text-rose-400 hover:underline"
              >
                Change Mobile Number?
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}