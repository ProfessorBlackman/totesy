
import React, { useState, useMemo } from 'react';
import { products } from '../data';
import ProductCard from '../components/ProductCard';

const Shop: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedVibe, setSelectedVibe] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState(250);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      if (selectedCategory && p.category !== selectedCategory) return false;
      if (selectedVibe && p.vibe !== selectedVibe) return false;
      if (p.price > priceRange) return false;
      return true;
    });
  }, [selectedCategory, selectedVibe, priceRange]);

  return (
    <div className="max-w-[95%] mx-auto px-4 py-8">
      <div className="mb-12">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter">Shop the Campus Feed</h1>
        <p className="text-lg text-gray-500 mt-2">Find the bag that speaks to your artistic soul.</p>
      </div>
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-72 space-y-10 shrink-0">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black tracking-tight">Filters</h2>
              <button 
                onClick={() => { setSelectedCategory(null); setSelectedVibe(null); setPriceRange(250); }}
                className="text-xs font-black text-primary uppercase tracking-widest border-b-2 border-primary"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="space-y-10">
            <div>
              <h3 className="text-xs font-black mb-6 uppercase tracking-[0.2em] text-gray-400">Categories</h3>
              <div className="flex flex-col gap-4">
                {['Canvas', 'Denim', 'Corduroy'].map(cat => (
                  <label key={cat} className="flex items-center gap-4 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={selectedCategory === cat}
                      onChange={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                      className="form-checkbox h-5 w-5 rounded-lg border-2 border-gray-200 text-primary focus:ring-primary/20" 
                    />
                    <span className={`text-base font-bold transition-colors ${selectedCategory === cat ? 'text-primary' : 'text-gray-600 group-hover:text-[#111813]'}`}>{cat} Totes</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="h-px bg-gray-100"></div>

            <div>
              <h3 className="text-xs font-black mb-6 uppercase tracking-[0.2em] text-gray-400">Price Range (GHS)</h3>
              <input 
                type="range" 
                min="50" 
                max="250" 
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" 
              />
              <div className="flex justify-between mt-4 text-sm font-black text-[#111813]">
                <span>₵50</span>
                <span>₵{priceRange}</span>
              </div>
            </div>

            <div className="h-px bg-gray-100"></div>

            <div>
              <h3 className="text-xs font-black mb-6 uppercase tracking-[0.2em] text-gray-400">Shop by Vibe</h3>
              <div className="flex flex-col gap-4">
                {['Abstract', 'Heritage', 'Minimalist', 'Custom Art'].map(vibe => (
                  <label key={vibe} className="flex items-center gap-4 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={selectedVibe === vibe}
                      onChange={() => setSelectedVibe(selectedVibe === vibe ? null : vibe)}
                      className="form-checkbox h-5 w-5 rounded-lg border-2 border-gray-200 text-primary focus:ring-primary/20" 
                    />
                    <span className={`text-base font-bold transition-colors ${selectedVibe === vibe ? 'text-primary' : 'text-gray-600 group-hover:text-[#111813]'}`}>{vibe}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Grid */}
        <main className="flex-1">
          <div className="flex items-center justify-between mb-10 pb-6 border-b border-gray-100">
            <p className="text-gray-400 font-bold">Showing <span className="text-[#111813] font-black">{filteredProducts.length}</span> results</p>
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-gray-400">Sort by:</span>
              <select className="form-select border-none bg-gray-100 rounded-xl text-sm font-black focus:ring-primary/20 cursor-pointer">
                <option>Newest Arrivals</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-32 text-center bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
              <span className="material-symbols-outlined !text-7xl text-gray-200 mb-6">search_off</span>
              <h3 className="text-3xl font-black tracking-tighter">No results found</h3>
              <p className="text-gray-500 max-w-sm mx-auto mt-2 font-medium">Try adjusting your filters to find that perfect vibe you're looking for.</p>
              <button 
                onClick={() => { setSelectedCategory(null); setSelectedVibe(null); setPriceRange(250); }}
                className="mt-8 px-8 py-3 bg-primary rounded-xl font-black text-sm"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Shop;
