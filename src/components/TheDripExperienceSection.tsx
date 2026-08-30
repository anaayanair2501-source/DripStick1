import React, { useState } from 'react';
import { Flame, Droplets, Thermometer, Sparkles, Volume2, Wand2 } from 'lucide-react';
import { ASSETS } from '../data/mockData';
import { soundEffects } from '../utils/soundEffects';

export const TheDripExperienceSection: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(1);

  const handleStageClick = (stage: number) => {
    setActiveStage(stage);
    if (stage === 1) soundEffects.playCrunch();
    if (stage === 2) soundEffects.playDip();
    if (stage === 3) soundEffects.playCrunch();
  };

  return (
    <section className="py-24 bg-[#3B2220] text-[#FDF8F2] relative overflow-hidden">
      {/* Decorative Pastel & Warm Glows */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#FED7AA]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#FBCFE8]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFE4E6]/20 border border-[#FECDD3]/30 mb-4 shadow-xs backdrop-blur-md">
            <Droplets className="w-3.5 h-3.5 text-[#F472B6]" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#FBCFE8]">
              The Secret Science of the Dip
            </span>
          </div>
          <h2 className="font-brand font-black text-4xl sm:text-5xl lg:text-6xl text-[#FDF8F2] tracking-tight mb-4">
            HOT CONE MEETS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FDE68A] via-[#FED7AA] to-[#F472B6] italic">
              MOLTEN CHOCOLATE.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#FDF8F2]/85 leading-relaxed font-medium">
            The sensory magic behind every DripStick: the thermodynamic contrast between a freshly ironed 210°C Belgian cone and our velvety 45°C chocolate well.
          </p>
        </div>

        {/* 3-Step Thermal Transformation Interactive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          {/* Stage 1 */}
          <div
            id="thermal-stage-1"
            onClick={() => handleStageClick(1)}
            className={`p-6 rounded-3xl cursor-pointer transition-all duration-300 border-2 ${
              activeStage === 1
                ? 'bg-[#4E2D2A] border-[#FDE68A] shadow-2xl scale-[1.03]'
                : 'bg-[#2E1816]/70 border-white/10 hover:border-white/25 hover:scale-[1.01]'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="w-9 h-9 rounded-2xl bg-[#FEF3C7] text-[#92400E] font-black text-sm flex items-center justify-center shadow-xs">
                01
              </span>
              <span className="text-xs font-bold text-[#FDE68A] flex items-center gap-1 bg-[#4E2D2A] px-3 py-1 rounded-full border border-[#FDE68A]/30">
                <Flame className="w-3.5 h-3.5 text-[#F59E0B]" /> 210°C Iron
              </span>
            </div>
            <h3 className="font-display font-black text-xl text-[#FDF8F2] mb-2 flex items-center gap-2">
              <span>🧇</span> The Crisp Waffle Shell
            </h3>
            <p className="text-xs text-[#FDF8F2]/80 leading-relaxed">
              Caramelized Belgian pearl sugar crystalizes on the cone ridges within 180 seconds, locking in a cloud-soft interior while forming a rigid barrier for the dip.
            </p>
          </div>

          {/* Stage 2 */}
          <div
            id="thermal-stage-2"
            onClick={() => handleStageClick(2)}
            className={`p-6 rounded-3xl cursor-pointer transition-all duration-300 border-2 ${
              activeStage === 2
                ? 'bg-[#4E2D2A] border-[#F472B6] shadow-2xl scale-[1.03]'
                : 'bg-[#2E1816]/70 border-white/10 hover:border-white/25 hover:scale-[1.01]'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="w-9 h-9 rounded-2xl bg-[#FCE7F3] text-[#9D174D] font-black text-sm flex items-center justify-center shadow-xs">
                02
              </span>
              <span className="text-xs font-bold text-[#F472B6] flex items-center gap-1 bg-[#4E2D2A] px-3 py-1 rounded-full border border-[#F472B6]/30">
                <Thermometer className="w-3.5 h-3.5 text-[#EC4899]" /> 45°C Heated Pot
              </span>
            </div>
            <h3 className="font-display font-black text-xl text-[#FDF8F2] mb-2 flex items-center gap-2">
              <span>🍫</span> The Couverture Dip
            </h3>
            <p className="text-xs text-[#FDF8F2]/80 leading-relaxed">
              Submerged into continuous-flowing Belgian chocolate containing 100% pure cocoa butter. The warm sauce flows smoothly into every geometric pocket.
            </p>
          </div>

          {/* Stage 3 */}
          <div
            id="thermal-stage-3"
            onClick={() => handleStageClick(3)}
            className={`p-6 rounded-3xl cursor-pointer transition-all duration-300 border-2 ${
              activeStage === 3
                ? 'bg-[#4E2D2A] border-[#A7F3D0] shadow-2xl scale-[1.03]'
                : 'bg-[#2E1816]/70 border-white/10 hover:border-white/25 hover:scale-[1.01]'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="w-9 h-9 rounded-2xl bg-[#D1FAE5] text-[#065F46] font-black text-sm flex items-center justify-center shadow-xs">
                03
              </span>
              <span className="text-xs font-bold text-[#6EE7B7] flex items-center gap-1 bg-[#4E2D2A] px-3 py-1 rounded-full border border-[#A7F3D0]/30">
                <Sparkles className="w-3.5 h-3.5 text-[#10B981]" /> 60s Topping Lock
              </span>
            </div>
            <h3 className="font-display font-black text-xl text-[#FDF8F2] mb-2 flex items-center gap-2">
              <span>✨</span> The Crunch Setting
            </h3>
            <p className="text-xs text-[#FDF8F2]/80 leading-relaxed">
              Freshly crushed Oreos, Biscoff, and hazelnuts are showered over the molten chocolate, anchoring deeply as the chocolate sets into a silky ganache.
            </p>
          </div>

        </div>

        {/* Sensory Reel Showcase Card */}
        <div className="rounded-3xl bg-gradient-to-br from-[#4E2D2A] to-[#361E1C] border border-white/15 p-8 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-[10px] font-black tracking-widest text-[#FDE68A] uppercase px-3 py-1 bg-white/10 rounded-full inline-block">
              Live Dipping Experience
            </span>
            <h3 className="font-brand font-black text-3xl sm:text-4xl text-[#FDF8F2]">
              Watch Chocolate Defy Gravity.
            </h3>
            <p className="text-sm text-[#FDF8F2]/85 leading-relaxed font-medium">
              Every stick is prepared live in front of you. The aroma of freshly baked vanilla batter combines with warm melted cocoa to create an unforgettable olfactory experience.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => {
                  soundEffects.playDip();
                  soundEffects.playCrunch();
                }}
                className="px-6 py-3.5 rounded-full bg-gradient-to-r from-[#FDE68A] to-[#FED7AA] text-[#4A2C2A] font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-md"
              >
                <Volume2 className="w-4 h-4 text-[#92400E]" />
                <span>Hear the Crunch Sound 🔊</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden shadow-xl border-2 border-white/20">
            <img
              src={ASSETS.heroWaffle}
              alt="Macro shot of chocolate dipping texture"
              className="w-full h-72 object-cover hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#26140A] via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-[#FDF8F2]">
              <span className="font-black text-[#FDE68A]">DripStick Culinary Lab</span>
              <span className="font-semibold text-white/90">Antwerp Cocoa • 100% Pure Butter</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
