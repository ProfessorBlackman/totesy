
import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-10 py-12">
       <div className="flex flex-col lg:flex-row gap-16 items-center mb-20">
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-5xl font-black">Let's Talk Totes</h1>
            <p className="text-lg text-gray-500">Have a question about an order, a custom university design, or just want to say hi? We'd love to hear from you.</p>
            <button className="h-12 px-6 bg-primary/20 text-primary font-bold rounded-lg hover:bg-primary/30 transition-colors">View FAQ</button>
          </div>
          <div className="flex-1 w-full">
            <img src="https://picsum.photos/seed/contact/800/600" className="rounded-2xl shadow-xl w-full" alt="Students" />
          </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-8">
             <h2 className="text-3xl font-bold">Send us a message</h2>
             <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input className="w-full rounded-lg border-gray-200 p-4" placeholder="Full Name" />
                  <input className="w-full rounded-lg border-gray-200 p-4" placeholder="Email Address" />
                </div>
                <select className="w-full rounded-lg border-gray-200 p-4">
                  <option>Order Inquiry</option>
                  <option>Custom Request</option>
                  <option>Other</option>
                </select>
                <textarea className="w-full rounded-lg border-gray-200 p-4 min-h-[150px]" placeholder="Message..."></textarea>
                <button className="h-14 px-10 bg-primary text-[#111813] font-bold rounded-lg">Send Message</button>
             </form>
          </div>
          <div className="lg:col-span-5">
             <div className="bg-white border border-gray-100 rounded-2xl p-8 space-y-8 shadow-sm">
                <h3 className="text-xl font-bold">Contact Info</h3>
                <div className="space-y-6">
                   <div className="flex gap-4">
                      <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0"><span className="material-symbols-outlined">mail</span></div>
                      <div>
                        <p className="text-xs text-gray-400 font-bold uppercase">Email Us</p>
                        <p className="font-bold">hello@totesy.gh</p>
                      </div>
                   </div>
                   <div className="flex gap-4">
                      <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0"><span className="material-symbols-outlined">chat</span></div>
                      <div>
                        <p className="text-xs text-gray-400 font-bold uppercase">WhatsApp</p>
                        <p className="font-bold">+233 55 123 4567</p>
                      </div>
                   </div>
                   <div className="flex gap-4">
                      <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0"><span className="material-symbols-outlined">store</span></div>
                      <div>
                        <p className="text-xs text-gray-400 font-bold uppercase">Campus Hub</p>
                        <p className="font-bold">University of Ghana</p>
                        <p className="text-sm text-gray-500">Student Center, Legon</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

export default Contact;
