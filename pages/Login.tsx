
import React from 'react';

const Login: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-[80vh]">
      <div className="lg:w-1/2 relative bg-gray-100 hidden lg:block overflow-hidden">
        <img src="https://picsum.photos/seed/auth/1000/1200" className="absolute inset-0 w-full h-full object-cover" alt="" />
        <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-16">
           <h2 className="text-4xl text-white font-black mb-4">Carry Your Ambition.</h2>
           <p className="text-white/80 text-lg">Join thousands of students across Ghana rocking Totesy.</p>
        </div>
      </div>
      <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-16">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h1 className="text-3xl font-black">Welcome Back</h1>
            <p className="text-gray-500">Enter your details to access your account.</p>
          </div>
          <div className="border-b border-gray-100">
            <div className="flex gap-8">
              <button className="pb-3 border-b-2 border-primary font-bold">Log In</button>
              <button className="pb-3 text-gray-400 font-bold">Sign Up</button>
            </div>
          </div>
          <form className="space-y-4">
             <div className="space-y-1">
               <label className="text-xs font-bold uppercase text-gray-400">Email Address</label>
               <input className="w-full rounded-lg border-gray-200 p-3" placeholder="student@university.edu.gh" />
             </div>
             <div className="space-y-1">
               <div className="flex justify-between items-center">
                 <label className="text-xs font-bold uppercase text-gray-400">Password</label>
                 <button className="text-xs font-bold text-gray-400 hover:text-primary">Forgot Password?</button>
               </div>
               <input type="password" className="w-full rounded-lg border-gray-200 p-3" placeholder="••••••••" />
             </div>
             <button className="w-full h-12 bg-primary text-[#111813] font-bold rounded-lg shadow-lg">Log In</button>
          </form>
          <div className="relative py-4">
             <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
             <div className="relative flex justify-center text-xs font-bold uppercase"><span className="bg-white px-2 text-gray-400">Or continue with</span></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 h-12 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
               <img src="https://www.svgrepo.com/show/355037/google.svg" className="size-4" alt="" />
               <span className="font-bold text-sm">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 h-12 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
               <img src="https://www.svgrepo.com/show/330030/apple.svg" className="size-4" alt="" />
               <span className="font-bold text-sm">Apple</span>
            </button>
          </div>
          <div className="text-center">
             <button className="text-sm font-bold text-gray-400 hover:text-primary">Continue as Guest</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
