
import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data';
import ProductCard from '../components/ProductCard';

const Home: React.FC = () => {
  const featured = products.slice(0, 4);

  return (
    <div className="space-y-8 md:space-y-16 pb-24">
      {/* Hero Section */}
      <section className="w-full px-4 pt-6 md:pt-10 flex justify-center">
        <div className="max-w-[95%] w-full">
          <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-[#f0f4f2]">
            <div className="flex flex-col-reverse md:flex-row">
              <div className="flex flex-col justify-center p-10 md:p-16 lg:p-24 md:w-1/2 gap-8">
                <div className="space-y-6">
                  <h1 className="text-5xl md:text-6xl lg:text-8xl font-black leading-[0.95] tracking-tighter text-[#111813]">
                    Carry Art <br /><span className="text-primary relative inline-block">to Class.</span>
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-500 max-w-lg leading-relaxed">
                    Premium designer totes curated for the Ghanaian student lifestyle. Durable, stylish, and built for your campus journey.
                  </p>
                </div>
                <div className="flex flex-wrap gap-5">
                  <Link to="/shop" className="inline-flex items-center justify-center h-14 px-10 rounded-xl bg-primary text-[#111813] text-lg font-bold hover:brightness-105 transition-all shadow-[0_4px_0_rgb(15,186,72)] hover:shadow-[0_2px_0_rgb(15,186,72)] hover:translate-y-[2px]">
                    Shop New Arrivals
                  </Link>
                  <Link to="/about" className="inline-flex items-center justify-center h-14 px-8 rounded-xl bg-white border-2 border-gray-100 text-[#111813] text-lg font-bold hover:bg-gray-50 transition-all">
                    View Artists
                  </Link>
                </div>
                <div className="flex items-center gap-3 text-sm font-medium text-gray-400 mt-4">
                  <span className="flex -space-x-3">
                    {[1, 2, 3, 4].map(i => (
                      <img key={i} src={`https://picsum.photos/seed/${i + 20}/64/64`} className="size-10 rounded-full border-4 border-white" alt="avatar" />
                    ))}
                  </span>
                  <span>Joined by <span className="text-[#111813] font-bold">1,200+</span> students this month</span>
                </div>
              </div>
              <div className="md:w-1/2 min-h-[400px] md:min-h-[700px] relative group bg-[#f8faf9]">
                <img 
                  src="https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=2787&auto=format&fit=crop" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                  alt="Premium Canvas Tote Bag" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent md:hidden"></div>
                {/* Decorative element to match the 'vibe' of the store */}
                <div className="absolute bottom-8 right-8 bg-white/80 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/50 shadow-xl hidden lg:block">
                  <p className="text-xs font-black uppercase tracking-widest text-primary mb-1">Featured Product</p>
                  <p className="text-sm font-bold text-[#111813]">Minimalist Canvas Pro</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 px-4 flex justify-center bg-white border-y border-[#f0f4f2]">
        <div className="max-w-[95%] w-full grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex items-start gap-6 p-6">
            <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 text-primary">
              <span className="material-symbols-outlined !text-[32px]">local_shipping</span>
            </div>
            <div>
              <h3 className="font-black text-xl mb-2">Hostel Delivery</h3>
              <p className="text-gray-500 leading-relaxed">Direct delivery to Legon, KNUST, and UPSA hostels within 24 hours of your order.</p>
            </div>
          </div>
          <div className="flex items-start gap-6 p-6">
            <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 text-primary">
              <span className="material-symbols-outlined !text-[32px]">palette</span>
            </div>
            <div>
              <h3 className="font-black text-xl mb-2">Made in Ghana</h3>
              <p className="text-gray-500 leading-relaxed">We collaborate with local fine arts students to produce high-quality, sustainable bags.</p>
            </div>
          </div>
          <div className="flex items-start gap-6 p-6">
            <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 text-primary">
              <span className="material-symbols-outlined !text-[32px]">payments</span>
            </div>
            <div>
              <h3 className="font-black text-xl mb-2">Easy Payment</h3>
              <p className="text-gray-500 leading-relaxed">Seamless checkout with MTN MoMo, Vodafone Cash, or your standard debit card.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Vibe */}
      <section className="py-12 px-4 flex justify-center">
        <div className="max-w-[95%] w-full">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter">Shop by Vibe</h2>
            <Link to="/shop" className="text-lg font-bold text-primary hover:underline flex items-center gap-2">
              Explore All Collections <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {['Abstract', 'Heritage', 'Minimalist', 'Custom Art'].map((vibe, i) => (
              <Link key={vibe} to={`/shop?vibe=${vibe}`} className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-gray-100">
                <img src={`https://picsum.photos/seed/${vibe}/800/1000`} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={vibe} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-primary/60 transition-colors duration-500"></div>
                <div className="absolute bottom-8 left-8">
                  <h3 className="text-white font-black text-3xl tracking-tight">{vibe}</h3>
                  <p className="text-white/70 text-sm font-bold uppercase tracking-widest mt-1">Collection</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="py-12 px-4 flex justify-center">
        <div className="max-w-[95%] w-full">
          <div className="mb-12 flex justify-between items-end">
            <div>
              <span className="text-primary font-black uppercase tracking-[0.2em] text-sm">Hot Right Now</span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter mt-2">Trending on Campus</h2>
            </div>
            <div className="hidden md:flex gap-3">
              <button className="size-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-white hover:shadow-md transition-all">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="size-12 rounded-full bg-primary flex items-center justify-center hover:brightness-105 shadow-md">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featured.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Artist Spotlight */}
      <section className="py-16 px-4 flex justify-center">
        <div className="max-w-[95%] w-full bg-[#102216] rounded-[3rem] overflow-hidden text-white relative shadow-2xl">
          <div className="grid md:grid-cols-2 items-center relative z-10 h-full">
            <div className="p-12 md:p-20 lg:p-32 flex flex-col gap-8">
              <div className="inline-flex items-center gap-3 text-primary font-black uppercase tracking-[0.2em] text-sm">
                <span className="material-symbols-outlined !text-[24px]">brush</span>
                <span>Artist Spotlight</span>
              </div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[0.9] tracking-tighter">Meet <br /><span className="text-primary">Ama Mensah.</span></h2>
              <p className="text-gray-300 text-xl leading-relaxed max-w-xl">
                The KNUST graphic design student bringing neo-traditional Adinkra symbols to your everyday carry. Her "Sankofa Series" captures the essence of past wisdom and modern flair.
              </p>
              <div className="pt-4">
                <button className="inline-flex items-center justify-center h-16 px-12 rounded-2xl bg-primary text-[#111813] text-lg font-bold hover:brightness-105 transition-all shadow-xl">
                  Shop Ama's Collection
                </button>
              </div>
            </div>
            <div className="h-[400px] md:h-full min-h-[500px] relative">
              <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1000&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Artist" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#102216] via-transparent md:bg-gradient-to-l to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 px-4 flex justify-center bg-primary/5 rounded-[4rem] mx-4 mb-12">
        <div className="max-w-3xl w-full text-center space-y-8">
           <h2 className="text-4xl md:text-6xl font-black tracking-tighter">Don't Miss the Drop</h2>
           <p className="text-xl text-gray-500">Join the Totesy fam. Get 10% off your first order and exclusive access to new limited edition drops from campus artists.</p>
           <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
             <input type="email" placeholder="Enter your email address" className="flex-1 h-16 px-6 rounded-2xl border-2 border-gray-100 focus:border-primary focus:ring-0 text-lg transition-all" />
             <button className="h-16 px-10 rounded-2xl bg-black text-white font-black text-lg hover:bg-gray-900 transition-all">Subscribe</button>
           </div>
           <p className="text-sm text-gray-400">By subscribing, you agree to receive marketing emails from Totesy.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
