import React, { createContext, useContext, useState, useEffect } from 'react';

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Modal states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  // Checkout Form State
  const [checkoutForm, setCheckoutForm] = useState({
    name: '',
    address: '',
    phone: '',
    upiId: '',
    cardNumber: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('upi');

  // Fetch Products from MongoDB / Backend API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Apna Backend API URL yahan daal dena (e.g. http://localhost:5000/api/products)
        const response = await fetch('http://localhost:5000/api/products');
        if (!response.ok) throw new Error('Failed to fetch products from database');
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Could not load products. Please check your backend connection.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Add to Cart Handler
  const addToCart = (product, e) => {
    if (e) e.stopPropagation();
    const itemId = product._id || product.id;
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => (item._id || item.id) === itemId);
      if (existingItem) {
        return prevCart.map((item) =>
          (item._id || item.id) === itemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  // Cart Subtotal calculation
  const subtotal = cart.reduce((total, item) => total + (Number(item.price) * item.quantity), 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  const getFormattedPrice = (item) => {
    return `₹${Number(item.price).toLocaleString('en-IN')}`;
  };

  const processPayment = (e) => {
    e.preventDefault();
    setIsPaymentOpen(false);
    setIsSuccessOpen(true);
    setCart([]); // Clear cart on success
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        setCart,
        products,
        loading,
        error,
        isCartOpen,
        setIsCartOpen,
        isMenuOpen,
        setIsMenuOpen,
        isAuthOpen,
        setIsAuthOpen,
        selectedProduct,
        setSelectedProduct,
        isPaymentOpen,
        setIsPaymentOpen,
        isSuccessOpen,
        setIsSuccessOpen,
        checkoutForm,
        setCheckoutForm,
        paymentMethod,
        setPaymentMethod,
        addToCart,
        subtotal,
        cartCount,
        getFormattedPrice,
        processPayment
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}