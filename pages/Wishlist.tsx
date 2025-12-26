
import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store';
import ProductCard from '../components/ProductCard';

const Wishlist: React.FC = () => {
  const wishlist = useStore((state) => state.wishlist);

  return (
    <div className="max-w-[95%] mx-auto px-4 py-12">
      <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter">My Saved Picks</h1>
          <p className="text-lg text-gray-500 mt-2">All the artistic vibes you've been eyeing on campus.</p>
        </div>
        <Link to="/shop" className="text-primary font-black text-sm hover:underline flex items-center gap-2 uppercase tracking-widest">
          <span className="material-symbols-outlined !text-lg">shopping_bag</span>
          Back to Shop
        </Link>
      </div>

      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {wishlist.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-32 text-center bg-white rounded-[3rem] border border-[#f0f4f2] shadow-sm">
          <div className="size-24 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined !text-5xl text-red-300">favorite</span>
          </div>
          <h3 className="text-3xl font-black tracking-tighter">Your wishlist is empty</h3>
          <p className="text-gray-500 max-w-sm mx-auto mt-2 font-medium">Browse our collections and heart the ones that speak to your soul.</p>
          <Link 
            to="/shop"
            className="mt-8 inline-flex items-center justify-center h-14 px-10 bg-primary rounded-xl font-black text-sm shadow-xl shadow-primary/20 hover:scale-105 transition-transform"
          >
            Start Exploring
          </Link>
        </div>
      )}

      {/* Recommended Section */}
      {wishlist.length > 0 && (
        <section className="mt-32 pt-20 border-t border-gray-100">
           <h2 className="text-2xl font-black mb-8">You might also like...</h2>
           <p className="text-gray-400 text-sm mb-12">Based on your artistic taste.</p>
           {/* Placeholder for actual recommendations logic */}
           <Link to="/shop" className="inline-block py-3 px-6 rounded-xl border-2 border-gray-100 font-bold hover:bg-gray-50 transition-colors">
              Explore More Designs
           </Link>
        </section>
      )}
    </div>
  );
};

export default Wishlist;
