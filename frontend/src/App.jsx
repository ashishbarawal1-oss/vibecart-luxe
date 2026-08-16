import React, { useState, useEffect } from 'react';
import CartDrawer from './components/CartDrawer';
import AuthModal from './components/AuthModal';
import OtpModal from './components/OtpModal';
import PaymentModal from './components/PaymentModal';
import SuccessModal from './components/SuccessModal';
import ProductDetailModal from './components/ProductDetailModal';
import Footer from './components/Footer';

// Hero Slider Banners (Ab 6 Full Images ke sath)
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
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1600&auto=format&fit=crop&q=80',
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

// Custom Lingerie Products Injection
const LINGERIE_PRODUCTS = [
  {
    id: 101,
    title: 'Satin & Delicate Lace Trim Chemise Nightwear',
    price: 29.99,
    description: 'Ultra-soft premium satin chemise nightgown featuring intricate floral lace border details and adjustable spaghetti straps.',
    category: 'lingerie',
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&auto=format&fit=crop&q=80',
    rating: { rate: 4.9, count: 240 }
  },
  {
    id: 102,
    title: 'Seamless Stretch Microfiber High-Waist Panty Set (3-Pack)',
    price: 19.99,
    description: 'Ultra-breathable, invisible fit microfiber panties designed for maximum laser-cut smooth edge contouring.',
    category: 'lingerie',
    image: 'https://images.unsplash.com/photo-1616150638538-ffb0679a3fc4?w=800&auto=format&fit=crop&q=80',
    rating: { rate: 4.8, count: 412 }
  },
  {
    id: 103,
    title: 'Sheer Mesh Babydoll Nightgown with G-String Set',
    price: 34.50,
    description: 'Sensual sheer babydoll with soft embroidered bust cups and matching sheer lace string underwear.',
    category: 'lingerie',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEmz9LgwHf1lYodPSRjMoGEvzXOT0wF4BRhCKzMi_GqQ&s=10',
    rating: { rate: 4.7, count: 189 }
  },
  {
    id: 104,
    title: 'Elegance Floral Lace Halter Teddy Bodysuit',
    price: 27.99,
    description: 'Deep V-neck stretchy floral lace bodysuit with plunging neckline and snap-crotch design.',
    category: 'lingerie',
    image: 'https://images.unsplash.com/photo-1516575334481-f85287c2c82d?w=800&auto=format&fit=crop&q=80',
    rating: { rate: 4.9, count: 305 }
  }
];

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Hero Slider State
  const [currentSlide, setCurrentSlide] = useState(0);

  // Cart & Modals States
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '' });
  
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('1234');
  const [userEnteredOtp, setUserEnteredOtp] = useState('');
  const [otpTimer, setOtpTimer] = useState(30);
  const [otpActionType, setOtpActionType] = useState('login');

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({ name: '', address: '', phone: '', upiId: '', cardNumber: '' });
  const [paymentMethod, setPaymentMethod] = useState('upi');
  
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // ── 1. API FETCHING & INJECTING CUSTOM COLLECTION ──
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts([...LINGERIE_PRODUCTS, ...data]);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching products:", err);
        setProducts(LINGERIE_PRODUCTS);
        setLoading(false);
      });
  }, []);

  // ── 2. HERO SLIDER AUTO ROTATE (Har 5 Second me Change Hoga) ──
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Manual Slide Changers
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  // Filter products based on category
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(item => item.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const addToCart = (product, e) => {
    if (e) e.stopPropagation();
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    alert('Added to Cart! 🛍️');
  };

  const updateQty = (id, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const getFormattedPrice = (item) => `$${item.price.toFixed(2)}`;

  const startCheckoutProcess = () => {
    setIsCartOpen(false);
    setIsPaymentModalOpen(true);
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setIsAuthModalOpen(false);
    setIsOtpModalOpen(true);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setIsOtpModalOpen(false);
    alert('OTP Verified Successfully! 🎉');
  };

  const sendOtpNotification = (type, contact) => {
    alert(`New OTP sent to ${contact}`);
  };

  const processPayment = (e) => {
    e.preventDefault();
    setIsPaymentModalOpen(false);
    setIsCheckoutSuccess(true);
    setCartItems([]);
  };

  return (
    <div className="min-h-screen bg-[#07050a] text-slate-100 font-sans">
      
      {/* Navbar */}
      <header className="border-b border-rose-950/40 sticky top-0 bg-[#07050a]/90 backdrop-blur-md z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 via-pink-500 to-amber-400 flex items-center justify-center font-black text-white shadow-lg shadow-rose-500/30">
              💎
            </div>
            <span className="text-xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-300 to-amber-200">
              VibeCart Luxe
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsAuthModalOpen(true)}
              className="text-xs font-bold bg-slate-900/90 border border-slate-800 hover:border-rose-500 hover:bg-rose-950/30 hover:text-rose-300 px-4 py-2.5 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 shadow-sm"
            >
              Login / Signup
            </button>

            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative text-xs font-bold bg-gradient-to-r from-rose-600 to-pink-500 hover:from-rose-500 hover:to-pink-400 text-white px-4 py-2.5 rounded-xl transition-all duration-300 shadow-lg shadow-rose-600/30 flex items-center gap-2 transform hover:-translate-y-0.5"
            >
              <span>🛒 Cart</span>
              {totalCartCount > 0 && (
                <span className="bg-white text-rose-950 px-1.5 py-0.5 rounded-full text-[10px] font-black">
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 py-10 space-y-12">
        
        {/* ── 6-SLIDES IMMERSIVE HERO BANNER WITH MANUAL CONTROLS ── */}
        <section className="relative w-full h-[460px] sm:h-[520px] rounded-3xl overflow-hidden shadow-2xl border border-rose-900/40 group">
          
          {/* Background Images Mapping (All 6 images) */}
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
              <div className="absolute inset-0 bg-gradient-to-r from-[#07050a]/90 via-transparent to-transparent"></div>
            </div>
          ))}

          {/* Floating Glassmorphism Content Box */}
          <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 sm:p-12 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-rose-950/80 text-rose-300 border border-rose-500/40 px-3.5 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest backdrop-blur-xl shadow-lg">
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

        {/* ── CATEGORY FILTER TABS ── */}
        <section id="marketplace" className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-rose-950/40 pb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white">Explore Collections</h2>
              <p className="text-xs text-slate-400 mt-1">Discover luxury intimates, apparel, and live catalog items.</p>
            </div>

            {/* Category Buttons */}
            <div className="flex flex-wrap gap-2">
              {['all', 'lingerie', "women's clothing", 'jewelery', 'electronics', "men's clothing"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition border ${
                    selectedCategory === cat 
                      ? 'bg-rose-600 text-white border-rose-400 shadow-lg shadow-rose-500/30' 
                      : 'bg-[#120a11] text-slate-300 border-slate-800 hover:border-rose-900/50 hover:bg-rose-950/20'
                  }`}
                >
                  {cat === 'lingerie' ? '✨ Lingerie & Panties' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="text-center py-24 text-rose-400 font-bold text-sm animate-pulse">
              Loading catalog from API... ⚡
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div 
                  key={product.id} 
                  onClick={() => setSelectedProduct(product)}
                  className="bg-[#120b10] border border-rose-950/60 hover:border-rose-500/50 p-5 rounded-3xl space-y-4 cursor-pointer transition group flex flex-col justify-between shadow-xl relative"
                >
                  <div className="h-60 bg-slate-900/60 rounded-2xl p-4 flex items-center justify-center relative overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-500" 
                    />
                  </div>

                  <div className="space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-black tracking-widest text-rose-400 uppercase">
                          {product.category}
                        </span>
                        <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                          ★ {product.rating?.rate || "4.8"}
                        </span>
                      </div>
                      <h3 className="font-bold text-xs sm:text-sm text-slate-200 line-clamp-2">
                        {product.title}
                      </h3>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
                      <span className="text-lg font-black text-white">{getFormattedPrice(product)}</span>
                      <button 
                        onClick={(e) => addToCart(product, e)}
                        className="bg-rose-600/20 border border-rose-500/40 hover:bg-rose-600 hover:text-white text-rose-300 px-4 py-2 rounded-xl text-xs font-bold transition shadow-md"
                      >
                        + Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </main>

      {/* Modals & Components */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        totalCartCount={totalCartCount}
        updateQty={updateQty}
        subtotal={subtotal}
        startCheckoutProcess={startCheckoutProcess}
        getFormattedPrice={getFormattedPrice}
      />

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        authMode={authMode}
        setAuthMode={setAuthMode}
        authForm={authForm}
        setAuthForm={setAuthForm}
        handleAuthSubmit={handleAuthSubmit}
      />

      <OtpModal 
        isOpen={isOtpModalOpen}
        generatedOtp={generatedOtp}
        userEnteredOtp={userEnteredOtp}
        setUserEnteredOtp={setUserEnteredOtp}
        otpTimer={otpTimer}
        otpActionType={otpActionType}
        handleVerifyOtp={handleVerifyOtp}
        sendOtpNotification={sendOtpNotification}
      />

      <PaymentModal 
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        checkoutForm={checkoutForm}
        setCheckoutForm={setCheckoutForm}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        processPayment={processPayment}
        subtotal={subtotal}
      />

      <SuccessModal 
        isOpen={isCheckoutSuccess}
        onClose={() => setIsCheckoutSuccess(false)}
      />

      <ProductDetailModal 
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        addToCart={addToCart}
        getFormattedPrice={getFormattedPrice}
      />

      <Footer />
    </div>
  );
}