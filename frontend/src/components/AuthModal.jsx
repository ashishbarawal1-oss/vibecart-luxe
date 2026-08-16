import React from 'react';
import { X, ShieldCheck, Sparkles, Mail, Lock, User } from 'lucide-react';

export default function AuthModal({ 
  isOpen, 
  onClose, 
  authMode, 
  setAuthMode, 
  authForm, 
  setAuthForm, 
  handleAuthSubmit 
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
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-rose-950/80 border border-rose-800/50 flex items-center justify-center mx-auto text-rose-400 shadow-inner">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="inline-flex items-center gap-1 text-[10px] font-black tracking-widest text-amber-300 uppercase bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30">
            <Sparkles className="w-3 h-3" /> Secure Access
          </div>
          <h2 className="text-xl font-black text-white">
            {authMode === 'login' ? 'Welcome Back to VibeCart' : 'Create Luxe Account'}
          </h2>
          <p className="text-xs text-slate-400">
            {authMode === 'login' ? 'Enter your credentials for security verification' : 'Sign up securely with instant verification'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleAuthSubmit} className="space-y-4">
          
          {authMode === 'signup' && (
            <div>
              <label className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5 mb-1">
                <User className="w-3.5 h-3.5 text-rose-400" /> Full Name
              </label>
              <input 
                type="text" 
                required
                placeholder="Your Name"
                value={authForm.name}
                onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                className="w-full bg-[#07050a] text-slate-100 px-3.5 py-2.5 rounded-xl border border-rose-950 text-xs focus:border-rose-500 focus:outline-none transition shadow-inner"
              />
            </div>
          )}

          <div>
            <label className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5 mb-1">
              <Mail className="w-3.5 h-3.5 text-rose-400" /> Email Address
            </label>
            <input 
              type="email" 
              required
              placeholder="name@example.com"
              value={authForm.email}
              onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
              className="w-full bg-[#07050a] text-slate-100 px-3.5 py-2.5 rounded-xl border border-rose-950 text-xs focus:border-rose-500 focus:outline-none transition shadow-inner tracking-wider"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5 mb-1">
              <Lock className="w-3.5 h-3.5 text-rose-400" /> Password
            </label>
            <input 
              type="password" 
              required
              placeholder="••••••••"
              value={authForm.password}
              onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
              className="w-full bg-[#07050a] text-slate-100 px-3.5 py-2.5 rounded-xl border border-rose-950 text-xs focus:border-rose-500 focus:outline-none transition shadow-inner"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 hover:opacity-90 text-white font-bold py-3.5 rounded-xl transition shadow-xl shadow-rose-600/30 text-xs mt-2 flex items-center justify-center gap-2"
          >
            <span>Send Verification OTP</span>
            <span>📲</span>
          </button>
        </form>

        {/* Footer switch */}
        <div className="text-center border-t border-rose-950 pt-4">
          <span className="text-xs text-slate-400">
            {authMode === 'login' ? "Don't have an account? " : "Already have an account? "}
          </span>
          <button 
            onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
            className="text-xs font-bold text-rose-400 hover:text-rose-300 transition underline ml-1"
          >
            {authMode === 'login' ? 'Sign Up' : 'Log In'}
          </button>
        </div>

      </div>
    </div>
  );
}