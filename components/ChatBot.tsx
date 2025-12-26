import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { products } from '../data';
import { GeminiService } from '../geminiService';
import { marked } from 'marked';

interface Action {
  type: 'nav' | 'cart' | 'wishlist';
  id?: string;
  path?: string;
  label: string;
}

interface Message {
  role: 'user' | 'model';
  content: string;
  actions?: Action[];
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: "Chale! I'm your Totesy AI assistant. Ask me anything about your bag, saved items, or the latest drops! 🎒✨" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  
  const { cart, wishlist, addToCart, toggleWishlist } = useStore();
  const navigate = useNavigate();
  const gemini = useRef(new GeminiService());
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const history: any[] = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.content }]
      }));

      let response = await gemini.current.chat(userMsg, history, {
        cart,
        wishlist,
        availableProducts: products
      });

      // Handle Tool Calling Loop
      while (response.functionCalls && response.functionCalls.length > 0) {
        const toolResponses = response.functionCalls.map(fc => {
          if (fc.name === 'getCartDetails') {
            return {
              id: fc.id,
              name: fc.name,
              response: { result: cart.length > 0 ? cart : "Your cart is empty." }
            };
          }
          if (fc.name === 'getWishlistDetails') {
            return {
              id: fc.id,
              name: fc.name,
              response: { result: wishlist.length > 0 ? wishlist : "Your wishlist is empty." }
            };
          }
          return null;
        }).filter(Boolean);

        // If we handled data-fetching tools, we need to send the results back to Gemini
        if (toolResponses.length > 0) {
          // Update history with the model's call
          const modelParts = response.candidates[0].content.parts;
          history.push({ role: 'model', parts: modelParts });
          
          // Send tool results to get the final text response
          response = await gemini.current.chatWithToolResponse(history, toolResponses, {
            availableProducts: products
          });
          
          // Add the tool response role to history for future context
          history.push({ 
            role: 'user', 
            parts: toolResponses.map(tr => ({ functionResponse: tr })) 
          });
        } else {
          // It's a UI-only tool (nav, add to cart, etc.), we can stop the loop
          break;
        }
      }

      const text = response.text || "Processed your request!";
      const functionCalls = response.functionCalls;

      let actions: Action[] = [];
      if (functionCalls) {
        functionCalls.forEach(fc => {
          const args = fc.args as any;
          if (fc.name === 'navigateToPage') {
            actions.push({ type: 'nav', path: args.path, label: args.pageName });
          } else if (fc.name === 'addToCart') {
            actions.push({ type: 'cart', id: args.productId, label: `Add ${args.productName} to Bag` });
          } else if (fc.name === 'toggleWishlist') {
            actions.push({ type: 'wishlist', id: args.productId, label: `Save ${args.productName}` });
          }
        });
      }

      setMessages(prev => [...prev, { role: 'model', content: text, actions: actions.length > 0 ? actions : undefined }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { 
        role: 'model', 
        content: "Eii, I had a small brain freeze. Can you say that again, chale?" 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleActionClick = (action: Action) => {
    if (action.type === 'nav' && action.path) {
      navigate(action.path);
      setIsOpen(false);
    } else if (action.type === 'cart' && action.id) {
      const product = products.find(p => p.id === action.id);
      if (product) {
        addToCart(product);
        setMessages(prev => [...prev, { role: 'model', content: `Sharp! **${product.name}** has been added to your bag.` }]);
      }
    } else if (action.type === 'wishlist' && action.id) {
      const product = products.find(p => p.id === action.id);
      if (product) {
        toggleWishlist(product);
        const isNowIn = useStore.getState().wishlist.some(i => i.id === product.id);
        setMessages(prev => [...prev, { role: 'model', content: isNowIn ? `Safe! **${product.name}** added to wishlist.` : `Removed **${product.name}** from wishlist.` }]);
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end pointer-events-none">
      {/* Chat Window */}
      <div className={`pointer-events-auto mb-4 w-[92vw] md:w-[440px] h-[640px] bg-white rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] border border-gray-100 flex flex-col overflow-hidden transition-all duration-500 origin-bottom-right ${
        isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-10 pointer-events-none'
      }`}>
        {/* Header */}
        <div className="p-6 bg-[#111813] text-white flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-2xl bg-primary flex items-center justify-center rotate-3 shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined text-[#111813] !text-[30px]">chat</span>
            </div>
            <div>
              <h3 className="font-black text-base tracking-tight leading-none mb-1">Totesy AI Assistant</h3>
              <div className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-primary animate-pulse"></span>
                <span className="text-[9px] font-black text-primary/80 uppercase tracking-[0.2em]">Live Support</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="size-10 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined !text-[20px]">close</span>
          </button>
        </div>

        {/* Messages Body */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/20 hide-scrollbar"
        >
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[88%] space-y-3`}>
                <div 
                  className={`px-5 py-4 rounded-3xl text-sm shadow-sm transition-all duration-300 ${
                    m.role === 'user' 
                    ? 'bg-[#111813] text-white rounded-tr-none border border-black' 
                    : 'bg-white text-[#111813] border border-gray-100 rounded-tl-none'
                  }`}
                >
                  <div 
                    className="prose-chat"
                    dangerouslySetInnerHTML={{ __html: marked.parse(m.content) as string }}
                  />
                </div>
                
                {m.actions && (
                  <div className="flex flex-wrap gap-2 animate-in fade-in slide-in-from-left-2 duration-500">
                    {m.actions.map((action, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleActionClick(action)}
                        className="flex items-center gap-2 bg-primary text-[#111813] hover:bg-primary-dark px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all shadow-md active:scale-95"
                      >
                        <span className="material-symbols-outlined !text-[16px]">
                          {action.type === 'nav' ? 'near_me' : action.type === 'cart' ? 'add_shopping_cart' : 'favorite'}
                        </span>
                        {action.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-100 px-6 py-4 rounded-3xl rounded-tl-none flex gap-1.5 shadow-sm">
                <div className="size-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="size-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="size-1.5 bg-primary rounded-full animate-bounce"></div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Input */}
        <div className="p-6 bg-white border-t border-gray-100">
          <div className="flex gap-3 bg-gray-50 border border-gray-200 rounded-3xl p-2 focus-within:ring-2 focus-within:ring-primary/30 transition-all">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about your vibes..."
              className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-medium py-2 px-4 placeholder:text-gray-400"
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="size-12 rounded-2xl bg-primary text-[#111813] flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-30 disabled:grayscale shadow-sm"
            >
              <span className="material-symbols-outlined !text-[24px]">arrow_upward</span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Bubble Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`pointer-events-auto size-20 rounded-[1.75rem] flex items-center justify-center shadow-[0_15px_40px_-10px_rgba(0,0,0,0.3)] transition-all hover:scale-110 active:scale-90 group relative ${
          isOpen ? 'bg-[#111813] text-white rotate-90' : 'bg-primary text-[#111813]'
        }`}
      >
        <div className="relative">
          <span className="material-symbols-outlined !text-[38px] transition-transform duration-500">
            {isOpen ? 'close' : 'chat_bubble'}
          </span>
          {!isOpen && (
            <div className="absolute -top-3 -right-3 flex h-6 w-6">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-6 w-6 bg-primary border-4 border-white shadow-sm flex items-center justify-center text-[10px] font-black">
                1
              </span>
            </div>
          )}
        </div>
      </button>
    </div>
  );
};

export default ChatBot;
