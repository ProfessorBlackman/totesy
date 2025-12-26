
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="pb-20">
      <section className="w-full max-w-[1280px] mx-auto px-4 md:px-10 py-12 md:py-20">
        <div className="flex flex-col-reverse md:flex-row gap-8 items-center">
          <div className="flex flex-col gap-6 flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-[-0.033em]">
              From Koforidua<br/><span className="text-primary">With Love.</span>
            </h1>
            <p className="text-lg text-gray-500 max-w-xl mx-auto md:mx-0">
              Bringing vibrant, Ghanaian-inspired tote bags to lecture halls across the country. Totesy is more than a bag; it's a canvas for your campus life.
            </p>
            <div className="flex justify-center md:justify-start pt-2">
              <button className="h-12 px-8 rounded-lg bg-primary hover:bg-primary-dark text-[#111813] font-bold transition-all shadow-lg shadow-primary/20">
                Explore Collections
              </button>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="aspect-[4/3] w-full rounded-2xl bg-gray-200 bg-center bg-cover shadow-xl rotate-2 hover:rotate-0 transition-all duration-500" style={{ backgroundImage: 'url("https://ik.imagekit.io/methuselah/ms-selora/maxresdefault.jpg")' }}></div>
          </div>
        </div>
      </section>
      {/*Meet the Creator Section*/}
      <section className="w-full bg-[#f6f8f6] py-20 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4 md:px-10 flex flex-col md:flex-row gap-12 items-start">
          <div className="w-full md:w-1/2">
            <div className="aspect-[3/4] w-full rounded-2xl bg-gray-200 bg-center bg-cover shadow-lg" style={{ backgroundImage: 'url("https://ik.imagekit.io/methuselah/ms-selora/IMG-20250726-WA0009.jpg")' }}></div>
          </div>
          <div className="w-full md:w-1/2 space-y-8">
            <div>
              <span className="text-primary font-bold text-xs tracking-widest uppercase mb-2 block">Meet the Creator</span>
              <h2 className="text-3xl md:text-4xl font-black leading-tight">Christiana Tetteh (Killer Alomi)<br/><span className="text-gray-400 font-medium text-2xl">(A.K.A Wahala Baby)</span><br/><span className="text-gray-400 font-medium text-2xl">(A.K.A Wahala For My Boyfriend)</span></h2>
              <div className="prose text-gray-500 mt-6 space-y-4">
                <p>The creative force behind Totesy wasn't born in a boardroom, but in the vibrant heart of Koforidua. Christiana saw a gap in student fashion.</p>
                <p>"I noticed students carrying books in plastic bags or boring backpacks. I wanted to give them something that felt like home, something that shouted <strong>creativity</strong> and <strong>African pride</strong>."</p>
                <p className="italic">"Honestly, I wouldn't have had this idea, if I wasn't dating such a <strong>good</strong> and <strong>kind</strong> and <strong>amazing</strong> and <strong>handsome</strong> and <strong>brilliant</strong> boyfriend who <strong>gives me everything I want</strong> and <strong>showers me with love</strong>."</p>
                <p className="italic">"My favorite thing to do all the time is to ask him for money all the time, especially when I see a new wig even though I have some already. <br /> If he doesn't give me the money then I'll throw a tantrum and call him stingy and that I'm not his girlfriend even though he gives me money all the time and I have never given him anything before"</p>
                <p className="italic">"This christmas even though he has expressed interest in taking me out, I'm there acting like I don't want to all because of 400 he didn't give me, then later I'll tell him he has done nothing for me this christmas"</p>
              </div>
            </div>
            <div className="p-6 bg-white rounded-xl border-l-4 border-primary shadow-sm italic text-lg">
              "My mission is simple: To make sure every student in Ghana can carry their dreams in style. And also to chop my boyfriend's money without giving him anything in return, not even a kiss mpo"
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
