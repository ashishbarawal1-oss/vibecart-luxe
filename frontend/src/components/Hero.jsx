import React, { useState, useEffect } from 'react';

// Hero Slider Data (6 Luxury Intimate Collections)
const HERO_SLIDES = [
  {
    title: 'Luxe Silk & Lace Lingerie Drop',
    tagline: 'Unleash confidence with our ultra-soft satin chemises, lace bodysuits, and delicate intimates.',
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=1600&auto=format&fit=crop&q=80',
    badge: '✨ Sensual Drop 2026'
  },
  {
    title: 'Seamless Microfiber Panty Collection',
    tagline: 'Invisible fits, breathable comfort, and sleek contours crafted for everyday glamour.',
    image: 'https://images.unsplash.com/photo-1616150638538-ffb0679a3fc4?w=1600&auto=format&fit=crop&q=80',
    badge: '💎 Premium Intimates'
  },
  {
    title: 'Sheer Mesh Babydoll & Nightwear',
    tagline: 'Elegance meets provocative style. High-grade sheer mesh with matching G-string sets.',
    image: 'https://images.unsplash.com/photo-1596475638428-2330a8c2f1f4?w=1600&auto=format&fit=crop&q=80',
    badge: '🌙 Midnight Series'
  },
  {
    title: 'Elegance Floral Lace Bodysuits',
    tagline: 'Deep V-neck stretchy floral lace bodysuits designed to highlight absolute perfection.',
    image: 'https://images.unsplash.com/photo-1516575334481-f85287c2c82d?w=1600&auto=format&fit=crop&q=80',
    badge: '🔥 Designer Pick'
  },
  {
    title: 'Luxury Satin Sleepwear Sets',
    tagline: 'Wrap yourself in pure comfort and rich texture designed for relaxed elite evenings.',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1600&auto=format&fit=crop&q=80',
    badge: '⭐ Best Seller'
  },
  {
    title: 'Exclusive Velvet Intimates Collection',
    tagline: 'Rich touch, stunning fit, and gorgeous silhouettes built for unforgettable moments.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1600&auto=format&fit=crop&q=80',
    badge: '👑 Royal Edition'
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto rotate every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  return (
    <section className="relative w-full h-[480px] sm:h-[540px] rounded-3xl overflow-hidden shadow-2xl border border-rose-900/40 group my-6 max-w-6xl mx-auto">
      
      {/* Background Images Mapping (All 6 images with smooth fade) */}
      {HERO_SLIDES.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            currentSlide === index ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
          }`}
          style={{ transition: 'opacity 1s ease-in-out, transform 7s ease-out' }}
        >
          <img 
            src={slide.image} 
            alt={slide.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07050a] via-[#07050a]/70 to-black/30"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#07050a]/95 via-[#07050a]/50 to-transparent"></div>
        </div>
      ))}

      {/* Floating Glassmorphism Content Box */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center p-6 sm:p-12 max-w-2xl space-y-4">
        <div className="inline-flex items-center gap-2 bg-rose-950/80 text-rose-300 border border-rose-500/40 px-3.5 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest backdrop-blur-xl shadow-lg w-max">
          <span>{HERO_SLIDES[currentSlide].badge}</span>
        </div>
        
        <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight drop-shadow-lg">
          {HERO_SLIDES[currentSlide].title}
        </h1>
        
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed drop-shadow max-w-lg">
          {HERO_SLIDES[currentSlide].tagline}
        </p>

        <div className="pt-2 flex items-center gap-4">
          <a 
            href="#marketplace" 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-bold px-7 py-3 rounded-xl text-xs shadow-xl shadow-rose-600/40 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <span>Explore Collection</span>
            <span>✨</span>
          </a>
        </div>
      </div>

      {/* Left & Right Arrow Navigation Buttons */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-rose-600 text-white w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/10 transition shadow-lg opacity-70 group-hover:opacity-100"
      >
        ❮
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-rose-600 text-white w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/10 transition shadow-lg opacity-70 group-hover:opacity-100"
      >
        ❯
      </button>

      {/* Custom Slide Counter & Interactive Dots (1 to 6) */}
      <div className="absolute bottom-6 right-6 sm:right-12 z-20 flex items-center gap-3 bg-black/60 px-4 py-2.5 rounded-2xl backdrop-blur-md border border-white/10 shadow-xl">
        <span className="text-xs font-mono font-bold text-rose-300">
          0{currentSlide + 1} / 0{HERO_SLIDES.length}
        </span>
        <div className="flex gap-1.5">
          {HERO_SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'bg-rose-400 w-5' : 'bg-white/40 w-1.5 hover:bg-white'
              }`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
}