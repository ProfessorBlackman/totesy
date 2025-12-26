
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-[#f0f4f2] pt-20 pb-12">
      <div className="px-4 md:px-10 mx-auto max-w-[95%]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <div className="size-8 text-primary">
                <span className="material-symbols-outlined !text-[32px]">shopping_bag</span>
              </div>
              <span className="text-2xl font-black tracking-tight">Totesy</span>
            </div>
            <p className="text-lg text-gray-500 max-w-sm">
              The premium student marketplace for artistic tote bags in Ghana. Express your identity with every carry.
            </p>
            <div className="flex gap-4">
              <a href="#" className="size-10 rounded-full border border-gray-100 flex items-center justify-center hover:bg-primary transition-colors">
                <img src="https://www.svgrepo.com/show/521711/instagram.svg" className="size-5" alt="IG" />
              </a>
              <a href="#" className="size-10 rounded-full border border-gray-100 flex items-center justify-center hover:bg-primary transition-colors">
                <img src="https://www.svgrepo.com/show/521903/twitter.svg" className="size-5" alt="X" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-black text-[#111813] mb-6 uppercase tracking-widest text-sm">Shop</h4>
            <ul className="space-y-4 text-base text-gray-500">
              <li><Link to="/shop" className="hover:text-primary transition-colors font-medium">New Arrivals</Link></li>
              <li><Link to="/shop" className="hover:text-primary transition-colors font-medium">Best Sellers</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors font-medium">Artists</Link></li>
              <li><Link to="/shop" className="hover:text-primary transition-colors font-medium">Custom Prints</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black text-[#111813] mb-6 uppercase tracking-widest text-sm">Support</h4>
            <ul className="space-y-4 text-base text-gray-500">
              <li><Link to="/contact" className="hover:text-primary transition-colors font-medium">Track My Order</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors font-medium">Campus Delivery Info</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors font-medium">Returns & Exchanges</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors font-medium">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black text-[#111813] mb-6 uppercase tracking-widest text-sm">Payments</h4>
            <div className="flex flex-col gap-3">
              <div className="h-10 px-4 border border-gray-100 rounded-lg bg-white flex items-center justify-between">
                <span className="text-xs font-black text-[#FFCC00]">MTN MoMo</span>
                <span className="material-symbols-outlined text-gray-300 !text-sm">verified_user</span>
              </div>
              <div className="h-10 px-4 border border-gray-100 rounded-lg bg-white flex items-center justify-between">
                <span className="text-xs font-black text-[#E60000]">Vodafone Cash</span>
                <span className="material-symbols-outlined text-gray-300 !text-sm">verified_user</span>
              </div>
              <div className="h-10 px-4 border border-gray-100 rounded-lg bg-white flex items-center justify-between">
                <span className="text-xs font-black text-gray-400">Card Payment</span>
                <span className="material-symbols-outlined text-gray-400 !text-[20px]">credit_card</span>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-[#f0f4f2] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">© 2024 Totesy Ghana. Handcrafted for the Ghanaian Student. Owned by Christiana Tetteh.</p>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
