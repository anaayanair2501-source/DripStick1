import React, { useState } from 'react';
import { Sparkles, Heart, Award, ShieldCheck, Flame, Compass, Star } from 'lucide-react';
import { ASSETS } from '../data/mockData';
import { soundEffects } from '../utils/soundEffects';

export const OurStorySection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'craft' | 'dip' | 'vibe'>('craft');

  return (
    <section id="story" className="py-24 bg-[#FAF5EE] relative overflow-hidden border-t border-b border-[#4A2C2A]/10">
      {/* Decorative Pastel Ambient Lights */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-[#FFE4E6]/40 to-[#FEF3C7]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-gradient-to-tl from-[#DCFCE7]/40 to-[#E0F2FE]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFE4E6] border border-[#FECDD3] mb-4 shadow-2xs">
            <Heart className="w-3.5 h-3.5 text-[#E11D48]" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#9F1239]">
              Our Craft & Origins
            </span>
          </div>
          <h2 className="font-brand font-black text-4xl sm:text-5xl lg:text-6xl text-[#4A2C2A] tracking-tight mb-4">
            “It started with one simple idea: <br className="hidden sm:inline" />
            <span className="text-[#E11D48] italic">make waffles more fun.</span>”
          </h2>
          <p className="text-base sm:text-lg text-[#4A2C2A]/80 leading-relaxed font-medium">
            Traditional waffles are great — but sitting down with a plate, knife, and fork didn’t fit the fast-paced energy of youth, street culture, and festival vibes. So we re-engineered the waffle from the ground up.
          </p>
        </div>

        {/* 2-Column Story with Overlapping Photos */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Left Column: Overlapping Visual Gallery */}
          <div className="lg:col-span-6 relative">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src={ASSETS.eventLifestyle}
                alt="Friends enjoying DripStick waffles at a festival"
                className="w-full h-80 sm:h-96 object-cover hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#26140A]/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#FCD34D]">Street-Style Luxury</p>
                <p className="text-sm font-semibold">Born on the streets, crafted for dessert connoisseurs.</p>
              </div>
            </div>

            {/* Overlapping Floating Secondary Image */}
            <div className="hidden sm:block absolute -bottom-10 -right-6 z-20 w-52 sm:w-60 rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-[#4A2C2A] animate-float">
              <img
                src={ASSETS.waffleBueno}
                alt="Close up of chocolate dripping on cone waffle"
                className="w-full h-44 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="p-3 bg-[#FFF7ED]">
                <p className="text-[11px] font-black uppercase tracking-wider text-[#4A2C2A]">45°C Couverture Well</p>
                <p className="text-[10px] text-[#EA580C] font-black">Dipped live to order</p>
              </div>
            </div>

            {/* Floating Mini Badge */}
            <div className="absolute -top-4 -left-4 z-20 bg-white/95 backdrop-blur-md text-[#4A2C2A] p-3.5 rounded-2xl shadow-xl border border-[#4A2C2A]/10 flex items-center gap-3 animate-bounce-cute">
              <div className="w-10 h-10 rounded-xl bg-[#FEF3C7] border border-[#FDE68A] flex items-center justify-center text-xl text-[#D97706] font-black">
                ★
              </div>
              <div>
                <p className="text-xs font-black uppercase text-[#D97706]">Pearl Sugar Infused</p>
                <p className="text-[11px] font-medium text-[#4A2C2A]/70">Authentic Liège Method</p>
              </div>
            </div>
          </div>

          {/* Right Column: Story Pillar Tabs & Content */}
          <div className="lg:col-span-6 flex flex-col items-start">
            
            {/* Interactive Tab Switcher in Cute Pastel Style */}
            <div className="flex items-center gap-2 p-1.5 rounded-full bg-white border border-[#4A2C2A]/10 mb-8 shadow-xs">
              <button
                id="btn-story-tab-craft"
                onClick={() => {
                  soundEffects.playDip();
                  setActiveTab('craft');
                }}
                className={`px-4 py-2 text-xs font-extrabold uppercase tracking-wider rounded-full transition-all duration-200 flex items-center gap-1.5 ${
                  activeTab === 'craft'
                    ? 'bg-[#4A2C2A] text-white shadow-xs scale-102'
                    : 'text-[#4A2C2A]/70 hover:text-[#4A2C2A] hover:bg-[#FEF3C7]'
                }`}
              >
                <span>🧇</span>
                <span>1. The Cone Stick</span>
              </button>
              <button
                id="btn-story-tab-dip"
                onClick={() => {
                  soundEffects.playDip();
                  setActiveTab('dip');
                }}
                className={`px-4 py-2 text-xs font-extrabold uppercase tracking-wider rounded-full transition-all duration-200 flex items-center gap-1.5 ${
                  activeTab === 'dip'
                    ? 'bg-[#4A2C2A] text-white shadow-xs scale-102'
                    : 'text-[#4A2C2A]/70 hover:text-[#4A2C2A] hover:bg-[#FEF3C7]'
                }`}
              >
                <span>🍫</span>
                <span>2. Belgian Chocolate</span>
              </button>
              <button
                id="btn-story-tab-vibe"
                onClick={() => {
                  soundEffects.playDip();
                  setActiveTab('vibe');
                }}
                className={`px-4 py-2 text-xs font-extrabold uppercase tracking-wider rounded-full transition-all duration-200 flex items-center gap-1.5 ${
                  activeTab === 'vibe'
                    ? 'bg-[#4A2C2A] text-white shadow-xs scale-102'
                    : 'text-[#4A2C2A]/70 hover:text-[#4A2C2A] hover:bg-[#FEF3C7]'
                }`}
              >
                <span>✨</span>
                <span>3. The Youth Vibe</span>
              </button>
            </div>

            {/* Dynamic Content based on Active Tab */}
            {activeTab === 'craft' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-[#4A2C2A]/10 shadow-xs">
                  <div className="w-11 h-11 rounded-2xl bg-[#FEF3C7] border border-[#FDE68A] flex items-center justify-center shrink-0">
                    <Flame className="w-5 h-5 text-[#D97706]" />
                  </div>
                  <div>
                    <h3 className="font-display font-extrabold text-xl text-[#4A2C2A] mb-1">
                      Vertical Cone Architecture
                    </h3>
                    <p className="text-sm text-[#4A2C2A]/80 leading-relaxed">
                      We developed custom heavy-cast waffle irons that press the batter into an easy-to-hold conical prism mounted securely onto an artisanal wooden skewer. Zero drips on your fingers, 100% crunchy delight.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-[#4A2C2A]/10 shadow-xs">
                  <div className="w-11 h-11 rounded-2xl bg-[#FFE4E6] border border-[#FECDD3] flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5 text-[#E11D48]" />
                  </div>
                  <div>
                    <h3 className="font-display font-extrabold text-xl text-[#4A2C2A] mb-1">
                      Pearl Sugar Caramelization
                    </h3>
                    <p className="text-sm text-[#4A2C2A]/80 leading-relaxed">
                      Imported Belgian pearl sugar melts inside the iron grids at 210°C, creating crunchy caramelized sugar pockets on the exterior while preserving a cloud-like interior texture.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'dip' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-[#4A2C2A]/10 shadow-xs">
                  <div className="w-11 h-11 rounded-2xl bg-[#FFEDD5] border border-[#FED7AA] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-[#EA580C]" />
                  </div>
                  <div>
                    <h3 className="font-display font-extrabold text-xl text-[#4A2C2A] mb-1">
                      Pure Belgian Cocoa Butter
                    </h3>
                    <p className="text-sm text-[#4A2C2A]/80 leading-relaxed">
                      We never use hydrogenated vegetable compound fats. Every sauce dip is formulated with genuine 100% cocoa butter couverture chocolate from Antwerp and hazelnut praline from Piedmont.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-[#4A2C2A]/10 shadow-xs">
                  <div className="w-11 h-11 rounded-2xl bg-[#F3E8FF] border border-[#E9D5FF] flex items-center justify-center shrink-0">
                    <Compass className="w-5 h-5 text-[#9333EA]" />
                  </div>
                  <div>
                    <h3 className="font-display font-extrabold text-xl text-[#4A2C2A] mb-1">
                      The Precision 45°C Thermal Dip
                    </h3>
                    <p className="text-sm text-[#4A2C2A]/80 leading-relaxed">
                      Kept at exactly 45°C in continuous-flowing pots, our chocolate coats every grid of the hot waffle, setting slightly within 60 seconds to lock in toppings without losing its molten core.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'vibe' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-[#4A2C2A]/10 shadow-xs">
                  <div className="w-11 h-11 rounded-2xl bg-[#DCFCE7] border border-[#BBF7D0] flex items-center justify-center shrink-0">
                    <Heart className="w-5 h-5 text-[#16A34A]" />
                  </div>
                  <div>
                    <h3 className="font-display font-extrabold text-xl text-[#4A2C2A] mb-1">
                      Made for Sharing & Socials
                    </h3>
                    <p className="text-sm text-[#4A2C2A]/80 leading-relaxed">
                      Whether you’re walking down Carter Road in Mumbai, exploring Church Street in Bangalore, or hanging out after lectures on FC Road Pune, DripStick is the dessert that turns heads.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-[#4A2C2A]/10 shadow-xs">
                  <div className="w-11 h-11 rounded-2xl bg-[#E0F2FE] border border-[#BAE6FD] flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5 text-[#0284C7]" />
                  </div>
                  <div>
                    <h3 className="font-display font-extrabold text-xl text-[#4A2C2A] mb-1">
                      Unlimited Combinations
                    </h3>
                    <p className="text-sm text-[#4A2C2A]/80 leading-relaxed">
                      4 waffle bases, 6 signature dips, 6 gourmet toppings, and artisanal drizzles mean there are over 1,400+ unique DripStick combos to discover.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Quote Badge */}
            <div className="mt-8 p-4 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] flex items-center gap-3 w-full shadow-xs">
              <span className="text-2xl animate-bounce-cute">✨</span>
              <p className="text-xs text-[#92400E] italic font-semibold">
                “Dessert shouldn’t be complicated. It should be hot, crispy, loaded with chocolate, and ready in your hand.”
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
