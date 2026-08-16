import React, { useState } from 'react';
import { ShieldCheck, PlusCircle, ArrowLeft, Sparkles, Image, Tag, DollarSign, Type } from 'lucide-react';

export default function Admin() {
  const [newProduct, setNewProduct] = useState({
    title: '',
    category: '',
    priceCents: '',
    image: ''
  });

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.title || !newProduct.priceCents) {
      alert('Please fill title and price!');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newProduct.title,
          category: newProduct.category || 'General',
          priceCents: Number(newProduct.priceCents),
          image: newProduct.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80',
          rating: { stars: 5.0 }
        })
      });

      const data = await response.json();
      if (response.ok) {
        alert('⚡ Product successfully saved in MongoDB database!');
        setNewProduct({ title: '', category: '', priceCents: '', image: '' });
      } else {
        alert('Error: ' + data.error);
      }
    } catch (err) {
      console.error('API Error:', err);
      alert('Server se connect nahi ho pa raha!');
    }
  };

  return (
    <div className="min-h-screen bg-[#07050a] text-slate-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#120b15] border border-rose-900/60 rounded-3xl p-6 sm:p-8 shadow-2xl relative space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-rose-950/80 border border-rose-800/50 flex items-center justify-center mx-auto text-rose-400 shadow-inner">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="inline-flex items-center gap-1 text-[10px] font-black tracking-widest text-amber-300 uppercase bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30">
            <Sparkles className="w-3 h-3" /> Management Portal
          </div>
          <h2 className="text-xl font-black text-white">Admin Dashboard</h2>
          <p className="text-xs text-slate-400">Deploy new items straight into the MongoDB Database.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleAddProduct} className="space-y-4">
          
          {/* Title */}
          <div>
            <label className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5 mb-1">
              <Type className="w-3.5 h-3.5 text-rose-400" /> Product Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Luxe Velvet Hoodie"
              value={newProduct.title}
              onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
              className="w-full bg-[#07050a] text-slate-100 px-3.5 py-2.5 rounded-xl border border-rose-950 text-xs focus:border-rose-500 focus:outline-none transition shadow-inner"
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5 mb-1">
              <Tag className="w-3.5 h-3.5 text-rose-400" /> Category
            </label>
            <input
              type="text"
              placeholder="e.g. Apparel / Electronics"
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              className="w-full bg-[#07050a] text-slate-100 px-3.5 py-2.5 rounded-xl border border-rose-950 text-xs focus:border-rose-500 focus:outline-none transition shadow-inner"
            />
          </div>

          {/* Price */}
          <div>
            <label className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5 mb-1">
              <DollarSign className="w-3.5 h-3.5 text-rose-400" /> Price in Cents (e.g. 19999)
            </label>
            <input
              type="number"
              required
              placeholder="19999"
              value={newProduct.priceCents}
              onChange={(e) => setNewProduct({ ...newProduct, priceCents: e.target.value })}
              className="w-full bg-[#07050a] text-slate-100 px-3.5 py-2.5 rounded-xl border border-rose-950 text-xs focus:border-rose-500 focus:outline-none transition shadow-inner"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5 mb-1">
              <Image className="w-3.5 h-3.5 text-rose-400" /> Image URL
            </label>
            <input
              type="text"
              placeholder="https://images.unsplash.com/..."
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
              className="w-full bg-[#07050a] text-slate-100 px-3.5 py-2.5 rounded-xl border border-rose-950 text-xs focus:border-rose-500 focus:outline-none transition shadow-inner"
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 hover:opacity-90 text-white font-bold py-3.5 rounded-xl text-xs transition shadow-xl shadow-rose-600/30 flex items-center justify-center gap-2 mt-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Deploy Product to Database 🚀</span>
          </button>
        </form>

        {/* Back Link */}
        <div className="text-center pt-2">
          <a href="/" className="inline-flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 font-bold transition">
            <ArrowLeft className="w-3.5 h-3.5" /> Go back to Store
          </a>
        </div>

      </div>
    </div>
  );
}