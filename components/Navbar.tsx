
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { products } from '../data';
import { Product } from '../types';

const Navbar: React.FC = () => {
  const cart = useStore((state) => state.cart);
  const wishlist = useStore((state) => state.wishlist);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlist.length;
  
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isCartBouncing, setIsCartBouncing] = useState(false);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Animation trigger for cart count change
  useEffect(() => {
    if (cartCount > 0) {
      setIsCartBouncing(true);
      const timer = setTimeout(() => setIsCartBouncing(false), 400);
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  // Handle live suggestions
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const filtered = products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 6);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  // Handle clicking outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSuggestionClick = (productId: string) => {
    setSearchQuery('');
    setShowSuggestions(false);
    navigate(`/product/${productId}`);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#f0f4f2] bg-white/90 backdrop-blur-md">
      <div className="px-4 md:px-6 py-3 flex items-center justify-between mx-auto max-w-[95%]">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="size-8 text-primary">
              <span className="material-symbols-outlined !text-[32px]">shopping_bag</span>
            </div>
            <h2 className="text-[#111813] text-xl font-bold leading-tight tracking-[-0.015em] group-hover:text-primary transition-colors">Totesy</h2>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/shop" className="text-[#111813] text-sm font-medium hover:text-primary transition-colors">Shop</Link>
            <Link to="/about" className="text-[#111813] text-sm font-medium hover:text-primary transition-colors">About</Link>
            <Link to="/contact" className="text-[#111813] text-sm font-medium hover:text-primary transition-colors">Contact</Link>
          </nav>
        </div>

        <div className="flex flex-1 justify-end gap-2 md:gap-4 items-center">
          {/* Search Bar with Live Suggestions */}
          <div className="hidden md:flex flex-col min-w-48 lg:min-w-64 relative h-10 w-full max-w-sm" ref={searchRef}>
            <div className="flex w-full flex-1 items-center rounded-xl bg-[#f0f4f2] px-3 transition-all focus-within:ring-2 focus-within:ring-primary/50 focus-within:bg-white shadow-sm">
              <span className="material-symbols-outlined text-[#61896f] !text-[20px]">search</span>
              <input 
                className="w-full flex-1 border-none bg-transparent px-2 text-sm text-[#111813] placeholder:text-[#61896f] focus:outline-none focus:ring-0 h-full" 
                placeholder="Find your vibe..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery.trim().length > 1 && setShowSuggestions(true)}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="text-[#61896f] hover:text-red-500 transition-colors">
                  <span className="material-symbols-outlined !text-[18px]">close</span>
                </button>
              )}
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-12 left-0 w-full bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                <div className="p-2">
                  {suggestions.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleSuggestionClick(product.id)}
                      className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-[#f0f4f2] transition-colors text-left group"
                    >
                      <div className="size-10 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                        <img src={product.image} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-black text-[#111813] truncate group-hover:text-primary transition-colors">{product.name}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{product.collection}</p>
                      </div>
                      <div className="text-sm font-black text-gray-400">₵{product.price}</div>
                    </button>
                  ))}
                </div>
                <Link 
                  to="/shop" 
                  onClick={() => setShowSuggestions(false)}
                  className="block p-3 bg-gray-50 text-center text-xs font-black uppercase tracking-[0.2em] text-gray-400 hover:bg-primary/10 hover:text-primary transition-colors border-t border-gray-100"
                >
                  View All Products
                </Link>
              </div>
            )}
            
            {showSuggestions && suggestions.length === 0 && searchQuery.trim().length > 1 && (
              <div className="absolute top-12 left-0 w-full bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 text-center z-50">
                <span className="material-symbols-outlined text-gray-200 !text-4xl mb-2">search_off</span>
                <p className="text-sm font-black text-[#111813]">No vibes found</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Try a different keyword</p>
              </div>
            )}
          </div>

          <div className="flex gap-1 md:gap-2">
            <button className="md:hidden flex items-center justify-center size-10 rounded-lg hover:bg-black/5 text-[#111813]">
              <span className="material-symbols-outlined !text-[24px]">search</span>
            </button>
            <Link to="/wishlist" className="relative flex items-center justify-center size-10 rounded-lg hover:bg-black/5 text-[#111813] transition-colors" title="My Wishlist">
              <span className="material-symbols-outlined !text-[24px]">favorite</span>
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 size-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link 
              to="/cart" 
              className={`relative flex items-center justify-center size-10 rounded-lg hover:bg-black/5 text-[#111813] transition-all duration-300 ${isCartBouncing ? 'scale-125' : 'scale-100'}`} 
              title="My Bag"
            >
              <span className={`material-symbols-outlined !text-[24px] ${isCartBouncing ? 'text-primary' : ''}`}>shopping_cart</span>
              {cartCount > 0 && (
                <span className={`absolute top-1 right-1 size-4 bg-primary text-[#111813] text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white transition-transform ${isCartBouncing ? 'scale-125 animate-pulse' : 'scale-100'}`}>
                  {cartCount}
                </span>
              )}
            </Link>
            <Link to="/login" className="flex items-center justify-center size-10 rounded-lg hover:bg-black/5 text-[#111813] transition-colors" title="Account">
              <span className="material-symbols-outlined !text-[24px]">account_circle</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
