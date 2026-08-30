import React, { useState } from 'react';
import { ArrowRight, Sparkles, Flame, Droplets, ChevronDown, CheckCircle2, Heart, Gift, Wand2 } from 'lucide-react';
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
  const [activeFlavorMood, setActiveFlavorMood] = useState<'chocolate' | 'strawberry' | 'caramel'>('chocolate');

  const handleHeroDripClick = () => {
    soundEffects.playDip();
    setIsDipping(true);
    setDripCount((prev) => prev + 1);
    setTimeout(() => setIsDipping(false), 900);
  };

  const flavorMoods = [
    { id: 'chocolate', label: '🍫 Belgian Fondue', bg: 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]' },
    { id: 'strawberry', label: '🍓 Ruby Berry Rose', bg: 'bg-[#FFE4E6] text-[#9F1239] border-[#FECDD3]' },
    { id: 'caramel', label: '✨ Lotus Biscoff Crunch', bg: 'bg-[#F3E8FF] text-[#6B21A8] border-[#E9D5FF]' },
  ];

  return (
    <section id="hero" className="relative min-h-[92vh] pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-[#FAF5EE]">
      
      {/* Decorative Pastel Ambient Glows */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[350px] bg-gradient-to-tr from-[#FCE7F3]/60 to-[#FEF3C7]/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 right-10 w-[450px] h-[450px] bg-gradient-to-bl from-[#DCFCE7]/50 via-[#E0F2FE]/40 to-[#F3E8FF]/50 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Cute Dessert Stickers */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {/* Floating Waffle */}
        <div className="absolute top-28 left-[5%] text-2xl sm:text-3xl animate-float p-2.5 rounded-2xl bg-white/70 backdrop-blur-xs shadow-xs border border-white/80">
          🧇
        </div>
        {/* Floating Strawberry */}
        <div className="absolute top-48 right-[10%] text-2xl sm:text-3xl animate-float-slow p-2.5 rounded-2xl bg-[#FFE4E6]/80 backdrop-blur-xs shadow-xs border border-[#FECDD3]" style={{ animationDelay: '1.2s' }}>
          🍓
        </div>
        {/* Floating Chocolate Fondue */}
        <div className="absolute bottom-32 left-[8%] text-2xl sm:text-3xl animate-float p-2.5 rounded-2xl bg-[#FEF3C7]/80 backdrop-blur-xs shadow-xs border border-[#FDE68A]" style={{ animationDelay: '2s' }}>
          🍫
        </div>
        {/* Floating Sparkle */}
        <div className="absolute top-20 right-[35%] text-xl sm:text-2xl animate-bounce-cute p-2 rounded-xl bg-[#F3E8FF]/80 backdrop-blur-xs shadow-xs border border-[#E9D5FF]" style={{ animationDelay: '0.6s' }}>
          ✨
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Bold Typography & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Tagline / Subheading Eyebrow with Pastel Pink Gradient */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#FFF1F2] via-[#FFE4E6] to-[#FEF3C7] border border-[#FECDD3] mb-6 shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E11D48] animate-ping" />
              <span className="text-[11px] font-extrabold tracking-widest uppercase text-[#9F1239]">
                Fresh Belgian Waffles On A Stick
              </span>
            </div>

            {/* Massive Headline */}
            <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[98px] xl:text-[114px] font-black leading-[0.88] tracking-tighter uppercase mb-4 text-[#4A2C2A]">
              STICK.<br />
              <span className="text-[#D2916C]">DIP.</span><br />
              <span className="bg-gradient-to-r from-[#4A2C2A] via-[#D2916C] to-[#E11D48] bg-clip-text text-transparent">LOVE.</span>
            </h1>

            {/* Paragraph */}
            <p className="text-base sm:text-lg font-medium text-[#4A2C2A]/80 max-w-md leading-relaxed mb-6">
              Warm golden Liège waffles baked with pearl sugar crystals, submerged into silky 45°C Belgian chocolate wells.
            </p>

            {/* Interactive Quick Flavor Mood Pill Selector */}
            <div className="mb-8 w-full">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#4A2C2A]/60 block mb-2">
                Pick Your Vibe Today:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {flavorMoods.map((mood) => (
                  <button
                    key={mood.id}
                    onClick={() => {
                      soundEffects.playDip();
                      setActiveFlavorMood(mood.id as any);
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 border shadow-2xs hover:scale-105 active:scale-95 ${
                      activeFlavorMood === mood.id
                        ? `${mood.bg} ring-2 ring-[#4A2C2A]/20 font-black scale-105`
                        : 'bg-white text-[#4A2C2A]/70 border-[#4A2C2A]/10 hover:bg-white'
                    }`}
                  >
                    {mood.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons styled with sweet pastel & caramel accents */}
            <div className="flex flex-wrap items-center gap-3.5 mb-10 w-full sm:w-auto">
              <button
                id="btn-hero-explore-menu"
                onClick={() => {
                  soundEffects.playCrunch();
                  onExploreMenu();
                }}
                className="bg-[#4A2C2A] hover:bg-[#361E1C] text-white px-8 py-4 rounded-full font-black tracking-widest uppercase text-xs shadow-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-2xl active:translate-y-0 flex items-center gap-2"
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
                className="bg-white border-2 border-[#4A2C2A] text-[#4A2C2A] px-7 py-4 rounded-full font-bold tracking-widest uppercase text-xs hover:bg-[#FEF3C7] hover:border-[#D2916C] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-xs"
              >
                ✨ Build Custom Stick
              </button>

              <button
                id="btn-hero-order-now"
                onClick={() => {
                  soundEffects.playDip();
                  onOrderNow();
                }}
                className="text-[11px] font-bold tracking-widest uppercase text-[#9F1239] hover:text-[#4A2C2A] bg-[#FFE4E6] border border-[#FECDD3] px-4 py-2 rounded-full transition-all hover:scale-105 active:scale-95"
              >
                Order Pickup / Delivery &rarr;
              </button>
            </div>

            {/* Micro Highlights in Cute Pastel Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 border-t border-[#4A2C2A]/10 w-full">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-white/80 border border-[#FEF3C7] shadow-2xs">
                <span className="text-base">🧇</span>
                <span className="text-xs font-bold text-[#4A2C2A]">100% Belgian Pearl Sugar</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-white/80 border border-[#FFE4E6] shadow-2xs">
                <span className="text-base">⚡</span>
                <span className="text-xs font-bold text-[#4A2C2A]">Baked Hot in 3 Mins</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-white/80 border border-[#DCFCE7] shadow-2xs">
                <span className="text-base">🍫</span>
                <span className="text-xs font-bold text-[#4A2C2A]">45°C Continuous Fondue</span>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Stage with Signature Waffle wrapped in BorderGlow */}
          <div className="lg:col-span-5 relative flex justify-center items-center py-4">
            
            {/* Ambient Background Glow */}
            <div className="absolute w-[360px] sm:w-[420px] h-[360px] sm:h-[420px] bg-gradient-to-tr from-[#FECDD3]/40 via-[#FED7AA]/40 to-[#FEF3C7]/40 rounded-full blur-3xl pointer-events-none" />

            {/* Interactive Hero Card Container */}
            <div
              id="hero-waffle-interactive-card"
              onClick={handleHeroDripClick}
              className={`relative cursor-pointer group transition-all duration-300 ${
                isDipping ? 'scale-95 rotate-1' : 'hover:scale-[1.02]'
              }`}
            >
              {/* Photo vs Graphic toggle */}
              <div className="absolute -top-3 left-4 z-30 flex bg-white/95 backdrop-blur-xs p-1 rounded-full border border-[#4A2C2A]/15 shadow-sm text-[10px] font-bold">
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
                  Art Mode
                </button>
              </div>

              {/* React Bits Border Glow wrapping the homepage photo */}
              <BorderGlow
                glowColor={activeFlavorMood === 'strawberry' ? '#E11D48' : '#D2916C'}
                glowSize={280}
                borderWidth={4}
                borderRadius="rounded-t-full rounded-b-3xl"
                interactive={true}
                animatedBeam={true}
                beamDuration={4.5}
                beamColor={activeFlavorMood === 'strawberry' ? 'rgba(225, 29, 72, 0.95)' : 'rgba(210, 145, 108, 0.95)'}
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
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E11D48] text-white text-[9px] font-black uppercase tracking-wider mb-1">
                        <Sparkles className="w-2.5 h-2.5" /> Chef Signature
                      </div>
                      <h4 className="font-bold text-base text-[#FAF5EE]">
                        The Belgian Double Dip
                      </h4>
                      <p className="text-[11px] text-[#FAF5EE]/80">45°C Molten Couverture • ₹189</p>
                    </div>
                  </div>
                ) : (
                  /* View 2: Design Graphic Cone */
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

              {/* Tilted Best Seller Badge in Sweet Pastel Theme */}
              <div className="absolute top-1/4 -right-3 sm:-right-6 bg-gradient-to-br from-white to-[#FEF3C7] p-4 rounded-2xl shadow-xl rotate-12 flex flex-col items-center gap-1 border border-[#FDE68A] z-20 hover:rotate-0 transition-transform duration-300">
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#D97706] flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#D97706]" /> Best Seller
                </div>
                <div className="font-brand font-black text-sm text-[#4A2C2A] whitespace-nowrap">
                  The Oreo Drip
                </div>
                <span className="text-[10px] font-black text-white bg-[#4A2C2A] px-2.5 py-0.5 rounded-full shadow-2xs">
                  ₹189
                </span>
              </div>

              {/* Interactive Drip counter badge with sweet chime feedback */}
              <div className="absolute bottom-3 left-3 z-20 bg-[#4A2C2A]/90 backdrop-blur-xs text-[#FAF5EE] px-3 py-1 rounded-full text-[10px] font-bold shadow-md flex items-center gap-1.5">
                <span>🍫 Tap to Dip!</span>
                <span className="bg-[#D2916C] text-white px-1.5 py-0.2 rounded-full font-mono">{dripCount}</span>
              </div>
            </div>

          </div>

        </div>

        {/* Live Brand Ticker Stats Bar in Delightful Pastel Cards */}
        <div className="mt-16 pt-8 border-t border-[#4A2C2A]/10 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          <div className="p-4 rounded-3xl bg-gradient-to-br from-white to-[#FEF3C7]/40 border border-[#FDE68A]/60 shadow-xs hover:scale-105 transition-transform duration-200">
            <p className="font-display font-black text-2xl sm:text-3xl text-[#4A2C2A]">250,000+</p>
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#D97706] mt-1">Sticks Dipped 🧇</p>
          </div>
          <div className="p-4 rounded-3xl bg-gradient-to-br from-white to-[#DCFCE7]/40 border border-[#BBF7D0]/60 shadow-xs hover:scale-105 transition-transform duration-200">
            <p className="font-display font-black text-2xl sm:text-3xl text-[#4A2C2A]">18 Outlets</p>
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#16A34A] mt-1">4 Major Cities 📍</p>
          </div>
          <div className="p-4 rounded-3xl bg-gradient-to-br from-white to-[#FFE4E6]/40 border border-[#FECDD3]/60 shadow-xs hover:scale-105 transition-transform duration-200">
            <p className="font-display font-black text-2xl sm:text-3xl text-[#4A2C2A]">4.95 ★</p>
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#E11D48] mt-1">12,000+ Reviews ❤️</p>
          </div>
          <div className="p-4 rounded-3xl bg-gradient-to-br from-white to-[#E0F2FE]/40 border border-[#BAE6FD]/60 shadow-xs hover:scale-105 transition-transform duration-200">
            <p className="font-display font-black text-2xl sm:text-3xl text-[#4A2C2A]">45°C</p>
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#0284C7] mt-1">Molten Couverture 🍫</p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-10">
          <button
            onClick={() => onExploreMenu()}
            className="flex flex-col items-center text-[10px] font-bold uppercase tracking-widest text-[#4A2C2A]/70 hover:text-[#4A2C2A] transition-colors group"
          >
            <span className="mb-1">Explore Full Story & Menu</span>
            <ChevronDown className="w-4 h-4 text-[#D2916C] animate-bounce group-hover:translate-y-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
