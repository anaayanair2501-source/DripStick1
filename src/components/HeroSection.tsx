import React, { useState } from 'react';
import { ArrowRight, Sparkles, Flame, Droplets, ChevronDown, CheckCircle2, Heart } from 'lucide-react';
import { ASSETS } from '../data/mockData';
import { soundEffects } from '../utils/soundEffects';
import { BorderGlow } from './BorderGlow';

interface HeroSectionProps {
  onOrderNow: () => void;
  onExploreMenu: () => void;
  onBuildCustom: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOrderNow,
  onExploreMenu,
  onBuildCustom,
}) => {
  const [dripCount, setDripCount] = useState(0);
  const [isDipping, setIsDipping] = useState(false);
  const [viewMode, setViewMode] = useState<'photo' | 'craft'>('photo');

  const handleHeroDripClick = () => {
    soundEffects.playDip();
    setIsDipping(true);
    setDripCount((prev) => prev + 1);
    setTimeout(() => setIsDipping(false), 800);
  };

  return (
    <section id="hero" className="relative min-h-[92vh] pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-[#FDF8F2]">
      
      {/* Decorative Warm Ambient Glows */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#D2916C]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 right-10 w-96 h-96 bg-[#4A2C2A]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Background Floating Drops */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-28 left-[10%] w-3 h-4 rounded-full bg-[#4A2C2A]/20 animate-drop"
          style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}
        />
        <div
          className="absolute top-48 right-[15%] w-3.5 h-5 rounded-full bg-[#D2916C]/25 animate-drop"
          style={{ animationDuration: '4.2s', animationDelay: '1.8s' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Bold Typography & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Tagline / Subheading Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#4A2C2A]/10 mb-6 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#D2916C] animate-ping" />
              <span className="text-[11px] font-bold tracking-widest uppercase text-[#D2916C]">
                Fresh Belgian Waffles On A Stick
              </span>
            </div>

            {/* Massive Bold Headline from Design Spec */}
            <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[100px] xl:text-[116px] font-black leading-[0.85] tracking-tighter uppercase mb-4 text-[#4A2C2A]">
              STICK.<br />
              DIP.<br />
              LOVE.
            </h1>

            {/* Paragraph with pristine line-width and contrast */}
            <p className="text-base sm:text-lg font-medium text-[#4A2C2A]/80 max-w-md leading-relaxed mb-8">
              Premium cone-shaped waffles loaded with molten Belgian chocolate. Made to be loved anywhere, anytime.
            </p>

            {/* Action Buttons styled to theme */}
            <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
              <button
                id="btn-hero-explore-menu"
                onClick={() => {
                  soundEffects.playCrunch();
                  onExploreMenu();
                }}
                className="bg-[#D2916C] hover:bg-[#c2805b] text-white px-8 py-4 rounded-full font-bold tracking-widest uppercase text-xs shadow-xl transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
              >
                <span>Explore Menu</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                id="btn-hero-build-custom"
                onClick={() => {
                  soundEffects.playDip();
                  onBuildCustom();
                }}
                className="border-2 border-[#4A2C2A] text-[#4A2C2A] px-8 py-4 rounded-full font-bold tracking-widest uppercase text-xs hover:bg-[#4A2C2A] hover:text-[#FDF8F2] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
                Build DripStick
              </button>

              <button
                id="btn-hero-order-now"
                onClick={() => {
                  soundEffects.playDip();
                  onOrderNow();
                }}
                className="text-[11px] font-bold tracking-widest uppercase text-[#4A2C2A]/70 hover:text-[#4A2C2A] underline underline-offset-4 decoration-[#D2916C] px-3 py-2 transition-colors"
              >
                Order Pickup / Delivery &rarr;
              </button>
            </div>

            {/* Micro Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-[#4A2C2A]/10 w-full">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D2916C] shrink-0" />
                <span className="text-xs font-bold text-[#4A2C2A]">100% Belgian Cocoa</span>
              </div>
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#D2916C] shrink-0" />
                <span className="text-xs font-bold text-[#4A2C2A]">Baked in 3 Mins</span>
              </div>
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-[#D2916C] shrink-0" />
                <span className="text-xs font-bold text-[#4A2C2A]">Mess-Free Stick</span>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Stage with Signature Waffle wrapped in BorderGlow */}
          <div className="lg:col-span-5 relative flex justify-center items-center py-4">
            
            {/* Ambient Background Glow */}
            <div className="absolute w-[360px] sm:w-[420px] h-[360px] sm:h-[420px] bg-[#D2916C]/15 rounded-full blur-3xl pointer-events-none" />

            {/* Interactive Hero Card Container */}
            <div
              id="hero-waffle-interactive-card"
              onClick={handleHeroDripClick}
              className={`relative cursor-pointer group transition-transform duration-300 ${
                isDipping ? 'scale-98 rotate-1' : 'hover:scale-[1.02]'
              }`}
            >
              {/* Photo vs Graphic toggle */}
              <div className="absolute -top-3 left-4 z-30 flex bg-white/90 backdrop-blur-xs p-1 rounded-full border border-[#4A2C2A]/15 shadow-sm text-[10px] font-bold">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setViewMode('photo');
                  }}
                  className={`px-3 py-1 rounded-full uppercase tracking-wider transition-colors ${
                    viewMode === 'photo' ? 'bg-[#4A2C2A] text-white' : 'text-[#4A2C2A]'
                  }`}
                >
                  Live Photo
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setViewMode('craft');
                  }}
                  className={`px-3 py-1 rounded-full uppercase tracking-wider transition-colors ${
                    viewMode === 'craft' ? 'bg-[#4A2C2A] text-white' : 'text-[#4A2C2A]'
                  }`}
                >
                  Craft Art
                </button>
              </div>

              {/* React Bits Border Glow wrapping the homepage photo */}
              <BorderGlow
                glowColor="#D2916C"
                glowSize={280}
                borderWidth={4}
                borderRadius="rounded-t-full rounded-b-3xl"
                interactive={true}
                animatedBeam={true}
                beamDuration={5}
                beamColor="rgba(210, 145, 108, 0.95)"
                className="shadow-2xl"
              >
                {/* View 1: Photo View */}
                {viewMode === 'photo' ? (
                  <div className="relative w-[290px] sm:w-[330px] h-[450px] sm:h-[490px] bg-[#3D2314] overflow-hidden">
                    <img
                      src={ASSETS.heroWaffle}
                      alt="DripStick signature cone waffle on stick"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#26140A]/85 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Bottom details */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#D2916C]">
                        Signature Dip
                      </p>
                      <h4 className="font-bold text-base text-[#FDF8F2]">
                        The Belgian Double Dip
                      </h4>
                      <p className="text-[11px] text-[#FDF8F2]/80">45°C Molten Dip • ₹189</p>
                    </div>
                  </div>
                ) : (
                  /* View 2: Design Graphic Cone from Design HTML */
                  <div className="relative w-[290px] sm:w-[330px] h-[450px] sm:h-[490px] bg-[#F5DEB3] flex flex-col items-center overflow-hidden">
                    <div className="w-full h-full waffle-texture" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#4A2C2A] via-[#4A2C2A]/85 to-transparent h-1/2 rounded-b-[40%] shadow-inner" />
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-4 h-60 bg-[#D2916C] rounded-full border-2 border-[#4A2C2A]/20 shadow-md" />
                    
                    {/* Molten drips */}
                    <div className="absolute top-1/2 left-1/3 -translate-x-1/2 w-4 h-12 bg-[#4A2C2A] rounded-b-full shadow-md animate-drip" />
                    <div className="absolute top-1/2 left-2/3 -translate-x-1/2 w-3 h-8 bg-[#4A2C2A] rounded-b-full shadow-md animate-drip" style={{ animationDelay: '0.6s' }} />
                  </div>
                )}
              </BorderGlow>

              {/* Tilted Best Seller Badge directly matching Design HTML */}
              <div className="absolute top-1/4 -right-3 sm:-right-6 bg-white p-4 rounded-2xl shadow-xl rotate-12 flex flex-col items-center gap-1 border border-[#4A2C2A]/10 z-20 hover:rotate-0 transition-transform duration-300">
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#D2916C]">
                  Best Seller
                </div>
                <div className="font-bold italic text-sm text-[#4A2C2A] whitespace-nowrap">
                  The Oreo Drip
                </div>
                <span className="text-[10px] font-black text-white bg-[#4A2C2A] px-2 py-0.5 rounded-full">
                  ₹189
                </span>
              </div>

              {/* Interactive Drip counter badge */}
              <div className="absolute bottom-2 left-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity bg-[#4A2C2A] text-[#FDF8F2] px-2.5 py-1 rounded-full text-[10px] font-bold shadow-md">
                Tap to Drip! ({dripCount})
              </div>
            </div>

          </div>

        </div>

        {/* Live Brand Ticker Stats Bar */}
        <div className="mt-16 pt-8 border-t border-[#4A2C2A]/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 rounded-2xl bg-white border border-[#4A2C2A]/5 shadow-xs">
            <p className="font-display font-black text-2xl sm:text-3xl text-[#4A2C2A]">250,000+</p>
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#D2916C] mt-1">Sticks Dipped</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-[#4A2C2A]/5 shadow-xs">
            <p className="font-display font-black text-2xl sm:text-3xl text-[#4A2C2A]">18 Outlets</p>
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#D2916C] mt-1">4 Major Cities</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-[#4A2C2A]/5 shadow-xs">
            <p className="font-display font-black text-2xl sm:text-3xl text-[#4A2C2A]">4.95 ★</p>
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#D2916C] mt-1">12,000+ Reviews</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-[#4A2C2A]/5 shadow-xs">
            <p className="font-display font-black text-2xl sm:text-3xl text-[#4A2C2A]">45°C</p>
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#D2916C] mt-1">Flowing Couverture</p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-10">
          <button
            onClick={() => onExploreMenu()}
            className="flex flex-col items-center text-[10px] font-bold uppercase tracking-widest text-[#4A2C2A]/60 hover:text-[#4A2C2A] transition-colors group"
          >
            <span className="mb-1">Explore Full Story & Menu</span>
            <ChevronDown className="w-4 h-4 animate-bounce group-hover:translate-y-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
