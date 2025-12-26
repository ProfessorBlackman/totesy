
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products, reviews } from '../data';
import { useStore } from '../store';
import ProductCard from '../components/ProductCard';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const addToCart = useStore((state) => state.addToCart);
  const [qty, setQty] = useState(1);

  if (!product) return <div className="p-32 text-center text-2xl font-black">Product not found.</div>;

  return (
    <div className="max-w-[95%] mx-auto px-4 py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-3 text-sm font-bold text-gray-400 mb-10 uppercase tracking-widest">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <span className="material-symbols-outlined !text-[16px]">chevron_right</span>
        <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
        <span className="material-symbols-outlined !text-[16px]">chevron_right</span>
        <span className="text-[#111813] border-b-2 border-primary">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32">
        {/* Left: Gallery */}
        <div className="space-y-6">
          <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-gray-100 shadow-xl border border-gray-100">
            <img src={product.image} className="w-full h-full object-cover" alt={product.name} />
          </div>
          <div className="grid grid-cols-4 gap-6">
             {[1,2,3,4].map(i => (
               <div key={i} className="aspect-square rounded-2xl bg-gray-100 overflow-hidden cursor-pointer hover:ring-4 ring-primary transition-all shadow-sm">
                 <img src={`https://picsum.photos/seed/${product.id+i+50}/500/500`} className="w-full h-full object-cover" alt="thumbnail" />
               </div>
             ))}
          </div>
        </div>

        {/* Right: Info */}
        <div className="flex flex-col py-6">
          <div className="mb-10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex text-primary">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`material-symbols-outlined !text-[20px] ${i < Math.floor(product.rating) ? 'icon-filled' : ''}`}>star</span>
                ))}
              </div>
              <span className="text-base text-gray-400 font-black">({product.reviewsCount} verified reviews)</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight">{product.name}</h1>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-primary">₵{product.price}.00</span>
              {product.discount && (
                <span className="text-xl text-gray-300 line-through font-bold">₵{Math.round(product.price * 1.25)}.00</span>
              )}
            </div>
          </div>

          <p className="text-xl text-gray-500 leading-relaxed mb-10 font-medium">
            {product.description} Experience the perfect blend of Ghanaian heritage and student practicality. Each bag is reinforced at stress points to handle your heaviest textbooks and laptop.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            {['100% Premium Cotton', 'Fade Resistant', 'Reinforced Straps', 'Hidden Inner Pocket'].map(feat => (
              <div key={feat} className="px-5 py-2 rounded-2xl bg-white border-2 border-gray-50 text-xs font-black uppercase tracking-[0.15em] text-[#111813] shadow-sm">
                {feat}
              </div>
            ))}
          </div>

          <div className="space-y-6 mb-12">
            <div className="flex flex-col sm:flex-row items-stretch gap-5">
              <div className="flex items-center rounded-2xl border-2 border-gray-100 h-16 bg-white p-2">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="size-12 flex items-center justify-center hover:bg-gray-50 rounded-xl transition-colors">
                  <span className="material-symbols-outlined">remove</span>
                </button>
                <input readOnly value={qty} className="w-16 h-full text-center border-none text-xl font-black p-0 focus:ring-0" />
                <button onClick={() => setQty(qty + 1)} className="size-12 flex items-center justify-center hover:bg-gray-50 rounded-xl transition-colors">
                  <span className="material-symbols-outlined">add</span>
                </button>
              </div>
              <button 
                onClick={() => {
                  for(let i=0; i<qty; i++) addToCart(product);
                }}
                className="flex-1 h-16 bg-primary hover:bg-primary-dark text-[#111813] font-black text-xl rounded-2xl shadow-xl shadow-primary/30 flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
              >
                <span className="material-symbols-outlined !text-2xl">shopping_cart</span>
                Add to Cart
              </button>
            </div>
            <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-2xl border border-primary/10">
              <span className="material-symbols-outlined text-primary !text-[24px]">verified</span>
              <p className="text-sm font-black text-primary">Next-day hostel delivery available for UG, KNUST, & UPSA</p>
            </div>
          </div>

          <div className="border-t-2 border-gray-50 pt-10">
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2">
                <h4 className="font-black text-sm uppercase tracking-widest text-gray-400">Dimensions</h4>
                <p className="font-bold">15" x 16" x 4"</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-black text-sm uppercase tracking-widest text-gray-400">Care Instructions</h4>
                <p className="font-bold">Hand wash cold. Line dry.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <section className="border-t border-gray-100 pt-20">
        <h2 className="text-4xl font-black mb-16 tracking-tighter">Campus Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-20">
          <div className="md:col-span-4 bg-[#f0f4f2] p-12 rounded-[2.5rem] h-fit sticky top-24 shadow-sm border border-white">
            <div className="flex items-end gap-3 mb-4">
              <span className="text-7xl font-black">{product.rating}</span>
              <span className="text-2xl text-gray-400 mb-2 font-bold">/ 5.0</span>
            </div>
            <div className="flex text-primary mb-6 gap-1">
               {[...Array(5)].map((_, i) => (
                 <span key={i} className="material-symbols-outlined !text-[28px] fill-primary">star</span>
               ))}
            </div>
            <p className="text-lg text-gray-500 mb-10 font-medium">Join <span className="text-[#111813] font-black">{product.reviewsCount}</span> other students who love their Totesy bag.</p>
            <button className="w-full h-16 border-2 border-[#111813] rounded-2xl font-black text-lg hover:bg-[#111813] hover:text-white transition-all shadow-sm">
              Write a Review
            </button>
          </div>
          <div className="md:col-span-8 space-y-12">
            {reviews.map(review => (
              <div key={review.id} className="flex gap-8 group">
                <div className="size-16 rounded-2xl bg-white border-2 border-gray-100 shrink-0 shadow-sm flex items-center justify-center font-black text-2xl text-gray-200 uppercase">
                  {review.userName[0]}
                </div>
                <div className="flex-1 pb-12 border-b border-gray-100 group-last:border-none">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-black text-xl">{review.userName}</h4>
                      <p className="text-sm font-black text-primary uppercase tracking-widest">{review.userUniversity}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex text-primary gap-0.5">
                        {[...Array(review.rating)].map((_, i) => (
                          <span key={i} className="material-symbols-outlined !text-sm fill-current">star</span>
                        ))}
                      </div>
                      <span className="text-xs font-bold text-gray-300 mt-1">{review.date}</span>
                    </div>
                  </div>
                  <p className="text-lg text-gray-500 leading-relaxed italic">"{review.comment}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
