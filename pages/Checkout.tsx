
import React, { useState } from 'react';
import { useStore } from '../store';
import { Link } from 'react-router-dom';

const Checkout: React.FC = () => {
  const { cart, getCartTotal } = useStore();
  const subtotal = getCartTotal();
  const [shippingMethod, setShippingMethod] = useState('campus');
  const shippingCost = shippingMethod === 'campus' ? 15 : shippingMethod === 'express' ? 35 : 0;
  const total = subtotal + shippingCost;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Form */}
        <div className="lg:col-span-7 space-y-8">
          <nav className="flex items-center gap-2 text-sm font-medium mb-8">
            <span className="text-primary">Information</span>
            <span className="material-symbols-outlined !text-sm text-gray-300">chevron_right</span>
            <span className="text-gray-400">Shipping</span>
            <span className="material-symbols-outlined !text-sm text-gray-300">chevron_right</span>
            <span className="text-gray-400">Payment</span>
          </nav>

          <section className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm space-y-6">
            <h2 className="text-xl font-bold">Contact Information</h2>
            <div className="space-y-4">
               <input className="w-full rounded-lg border-gray-200 p-3 focus:ring-primary focus:border-primary" placeholder="Email or mobile phone number" />
               <label className="flex items-center gap-3 text-sm text-gray-500">
                 <input type="checkbox" className="form-checkbox h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary" />
                 Email me with news and offers
               </label>
            </div>
          </section>

          <section className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm space-y-6">
            <h2 className="text-xl font-bold">Shipping Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input className="w-full rounded-lg border-gray-200 p-3" placeholder="First name" />
              <input className="w-full rounded-lg border-gray-200 p-3" placeholder="Last name" />
              <div className="md:col-span-2">
                <input className="w-full rounded-lg border-gray-200 p-3" placeholder="Address / Hall of Residence" />
              </div>
              <select className="w-full rounded-lg border-gray-200 p-3">
                <option>Greater Accra</option>
                <option>Ashanti</option>
                <option>Central</option>
              </select>
              <input className="w-full rounded-lg border-gray-200 p-3" placeholder="GhanaPostGPS (GA-123-4567)" />
            </div>
          </section>

          <section className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm space-y-6">
            <h2 className="text-xl font-bold">Shipping Method</h2>
            <div className="space-y-3">
              <label onClick={() => setShippingMethod('campus')} className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all ${shippingMethod === 'campus' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-gray-100'}`}>
                <div className="flex items-center gap-3">
                  <div className={`size-4 rounded-full border-2 flex items-center justify-center ${shippingMethod === 'campus' ? 'border-primary' : 'border-gray-300'}`}>
                    {shippingMethod === 'campus' && <div className="size-2 rounded-full bg-primary"></div>}
                  </div>
                  <div>
                    <span className="block font-bold">Campus Delivery (Standard)</span>
                    <span className="text-xs text-gray-500">To Hall/Hostel porter lodge</span>
                  </div>
                </div>
                <span className="font-bold">GHS 15.00</span>
              </label>
              <label onClick={() => setShippingMethod('express')} className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all ${shippingMethod === 'express' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-gray-100'}`}>
                <div className="flex items-center gap-3">
                  <div className={`size-4 rounded-full border-2 flex items-center justify-center ${shippingMethod === 'express' ? 'border-primary' : 'border-gray-300'}`}>
                    {shippingMethod === 'express' && <div className="size-2 rounded-full bg-primary"></div>}
                  </div>
                  <div>
                    <span className="block font-bold">Express Courier</span>
                    <span className="text-xs text-gray-500">Same day within Accra</span>
                  </div>
                </div>
                <span className="font-bold">GHS 35.00</span>
              </label>
            </div>
          </section>

          <div className="flex items-center justify-between pt-4">
             <Link to="/cart" className="text-primary font-bold flex items-center gap-1 hover:underline">
               <span className="material-symbols-outlined !text-lg">chevron_left</span>
               Return to cart
             </Link>
             <button className="h-14 px-10 bg-primary text-[#111813] font-bold rounded-lg shadow-lg">
               Pay Now GHS {total.toFixed(2)}
             </button>
          </div>
        </div>

        {/* Right: Summary */}
        <aside className="lg:col-span-5">
           <div className="bg-[#f6f8f6] rounded-2xl p-6 border border-gray-100 sticky top-24">
             <h2 className="text-lg font-bold mb-6">Order Summary</h2>
             <div className="space-y-4 mb-8">
               {cart.map(item => (
                 <div key={item.id} className="flex items-center gap-4">
                    <div className="relative size-16 bg-white rounded-lg border border-gray-100 shrink-0">
                      <img src={item.image} className="w-full h-full object-cover rounded-lg" alt="" />
                      <span className="absolute -top-2 -right-2 size-5 bg-gray-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-[#f6f8f6]">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold line-clamp-1">{item.name}</p>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest">{item.collection}</p>
                    </div>
                    <span className="text-sm font-bold">GHS {item.price * item.quantity}</span>
                 </div>
               ))}
             </div>
             <div className="space-y-3 py-6 border-t border-gray-200">
               <div className="flex justify-between text-sm">
                 <span className="text-gray-500">Subtotal</span>
                 <span className="font-bold">GHS {subtotal.toFixed(2)}</span>
               </div>
               <div className="flex justify-between text-sm">
                 <span className="text-gray-500">Shipping</span>
                 <span className="font-bold">GHS {shippingCost.toFixed(2)}</span>
               </div>
             </div>
             <div className="flex justify-between items-baseline pt-6 border-t border-gray-200">
               <span className="font-bold">Total</span>
               <div className="flex items-baseline gap-1">
                 <span className="text-xs text-gray-400">GHS</span>
                 <span className="text-3xl font-black">₵ {total.toFixed(2)}</span>
               </div>
             </div>
           </div>
        </aside>
      </div>
    </div>
  );
};

export default Checkout;
