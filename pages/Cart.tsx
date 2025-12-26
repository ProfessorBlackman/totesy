
import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store';

const Cart: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useStore();
  const subtotal = getCartTotal();
  const tax = subtotal * 0.03;
  const total = subtotal + tax;

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <span className="material-symbols-outlined text-7xl text-gray-200 mb-4">shopping_cart</span>
        <h2 className="text-2xl font-bold mb-4">Your bag is empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added any artistic picks yet.</p>
        <Link to="/shop" className="inline-flex h-12 px-8 items-center bg-primary font-bold rounded-lg shadow-lg shadow-primary/20">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-10 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
        <div className="space-y-1">
          <h1 className="text-3xl md:text-4xl font-black">Your Totesy Bag</h1>
          <p className="text-gray-500">Review your artistic picks before checkout.</p>
        </div>
        <Link to="/shop" className="text-primary font-bold text-sm hover:underline flex items-center gap-1">
          <span className="material-symbols-outlined !text-lg">arrow_back</span>
          Continue Shopping
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-4">
          {cart.map(item => (
            <div key={item.id} className="flex flex-col sm:flex-row items-center gap-6 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
              <div className="size-24 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
              </div>
              <div className="flex-1 flex flex-col sm:flex-row justify-between w-full">
                <div className="mb-4 sm:mb-0">
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <p className="text-xs text-gray-500 mb-2">{item.collection}</p>
                  <button onClick={() => removeFromCart(item.id)} className="text-red-500 text-xs font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined !text-sm">delete</span>
                    Remove
                  </button>
                </div>
                <div className="flex items-center gap-8 self-end sm:self-center">
                  <div className="flex items-center rounded-lg border border-gray-200 h-10 bg-[#f0f4f2] p-1">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="size-8 flex items-center justify-center bg-white rounded shadow-sm">
                      <span className="material-symbols-outlined !text-sm">remove</span>
                    </button>
                    <span className="w-10 text-center font-bold text-sm">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="size-8 flex items-center justify-center bg-primary rounded shadow-sm">
                      <span className="material-symbols-outlined !text-sm">add</span>
                    </button>
                  </div>
                  <span className="font-bold text-lg min-w-[100px] text-right">GHS {item.price * item.quantity}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="lg:col-span-4">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm sticky top-24">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6 pb-6 border-b border-gray-100">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Subtotal ({cart.length} items)</span>
                <span className="font-bold text-[#111813]">GHS {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Estimated Tax (3%)</span>
                <span className="font-bold text-[#111813]">GHS {tax.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex justify-between items-end mb-8">
              <span className="font-bold">Total</span>
              <span className="text-3xl font-black">GHS {total.toFixed(2)}</span>
            </div>
            <Link to="/checkout" className="w-full h-14 bg-primary hover:bg-primary-dark text-[#111813] font-bold rounded-xl shadow-lg shadow-primary/25 flex items-center justify-center gap-2 transition-transform hover:-translate-y-1">
              Proceed to Checkout
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
            <div className="mt-4 flex flex-col items-center gap-2 text-gray-400">
              <div className="flex gap-1 items-center text-[10px] font-bold uppercase tracking-wider">
                <span className="material-symbols-outlined !text-xs">lock</span>
                Secure SSL Encrypted Checkout
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Cart;
