
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useStore } from '../store';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addToCart = useStore((state) => state.addToCart);
  const wishlist = useStore((state) => state.wishlist);
  const toggleWishlist = useStore((state) => state.toggleWishlist);
  const isWishlisted = wishlist.some((item) => item.id === product.id);
  const [isAdded, setIsAdded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Placeholder colors for swatches
  const placeholderColors = [
    { name: 'Natural', class: 'bg-[#F5F5DC]' },
    { name: 'Midnight', class: 'bg-[#111813]' },
    { name: 'Olive', class: 'bg-[#556B2F]' },
    { name: 'Terracotta', class: 'bg-[#E2725B]' }
  ];

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const shareData = {
      title: `Totesy - ${product.name}`,
      text: `Check out this artistic ${product.category} tote bag from Totesy!`,
      url: `${window.location.origin}/#/product/${product.id}`,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error('Error sharing:', err);
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareData.url);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy link:', err);
      }
    }
  };

  return (
    <div className="flex flex-col group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="aspect-[4/5] w-full bg-gray-100 relative overflow-hidden">
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.image} 
            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${product.isSoldOut ? 'grayscale scale-105 opacity-80' : ''}`} 
            alt={product.name} 
          />
        </Link>
        
        {/* Top-right Actions Container */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
          {/* Wishlist Button */}
          <button 
            onClick={() => toggleWishlist(product)}
            className={`size-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-sm ${isWishlisted ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
            title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <span className={`material-symbols-outlined !text-[20px] ${isWishlisted ? 'fill-current' : ''}`}>
              favorite
            </span>
          </button>

          {/* Share Button */}
          <button 
            onClick={handleShare}
            className={`size-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-sm ${isCopied ? 'text-primary' : 'text-gray-400 hover:text-primary'}`}
            title="Share product"
          >
            <span className="material-symbols-outlined !text-[20px]">
              {isCopied ? 'check' : 'share'}
            </span>
            {isCopied && (
              <span className="absolute right-full mr-2 bg-[#111813] text-white text-[10px] font-black py-1 px-2 rounded whitespace-nowrap">
                Link Copied!
              </span>
            )}
          </button>
        </div>

        {/* Labels */}
        {!product.isSoldOut && (
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
            {product.isNew && (
              <span className="bg-primary text-[#111813] text-[10px] font-black px-3 py-1 rounded-lg shadow-sm uppercase tracking-wider">New Drop</span>
            )}
            {product.discount && (
              <span className="bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-lg shadow-sm uppercase tracking-wider">-{product.discount}% OFF</span>
            )}
          </div>
        )}

        {/* Sold Out Overlay */}
        {product.isSoldOut && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] flex flex-col items-center justify-center p-6 text-center z-20">
            <div className="bg-red-600 text-white px-5 py-2 rounded-xl text-xs font-black uppercase tracking-[0.2em] shadow-2xl mb-2 animate-pulse">
              Sold Out
            </div>
            <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest">Restocking Soon</p>
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-4">
          <Link to={`/product/${product.id}`}>
            <h3 className="font-black text-xl text-[#111813] line-clamp-1 group-hover:text-primary transition-colors mb-1">{product.name}</h3>
          </Link>
          
          {/* Color Swatches Placeholder */}
          <div className="flex gap-1.5 mb-3 mt-1">
            {placeholderColors.map((color, idx) => (
              <div 
                key={idx} 
                className={`size-3 rounded-full border border-gray-200 shadow-sm cursor-pointer hover:scale-125 hover:ring-2 hover:ring-primary/30 transition-all ${color.class}`}
                title={color.name}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
             <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{product.collection}</span>
             <span className="size-1 rounded-full bg-gray-200"></span>
             <div className="flex text-primary">
                <span className="material-symbols-outlined !text-[12px] fill-primary">star</span>
                <span className="text-[10px] font-black text-gray-500 ml-0.5">{product.rating}</span>
             </div>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className={`font-black text-2xl ${product.isSoldOut ? 'text-gray-400' : 'text-[#111813]'}`}>₵{product.price}</span>
            {product.discount && !product.isSoldOut && (
              <span className="text-xs text-gray-400 line-through font-bold">₵{Math.round(product.price * 1.25)}</span>
            )}
          </div>
          
          <button 
            disabled={product.isSoldOut}
            onClick={handleAddToCart}
            className={`size-12 rounded-xl transition-all flex items-center justify-center shadow-lg active:scale-90 ${
              product.isSoldOut 
              ? 'bg-gray-100 text-gray-300 cursor-not-allowed border-2 border-gray-50' 
              : isAdded 
                ? 'bg-[#111813] text-primary scale-110 shadow-xl' 
                : 'bg-primary text-[#111813] hover:bg-primary-dark hover:scale-110 shadow-primary/20'
            }`}
          >
            <span className={`material-symbols-outlined !text-[24px] transition-transform duration-300 ${isAdded ? 'rotate-[360deg]' : ''}`}>
              {product.isSoldOut ? 'block' : isAdded ? 'check_circle' : 'add_shopping_cart'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
