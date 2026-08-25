import React, { useState } from 'react';
import { Flame, Droplets, Thermometer, Sparkles, Volume2 } from 'lucide-react';
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
    <section className="py-24 bg-[#4A2C2A] text-[#FDF8F2] relative overflow-hidden">
      {/* Decorative Glows */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#D2916C]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#361E1C]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#361E1C] border border-[#D2916C]/30 mb-4 shadow-xs">
            <Droplets className="w-3.5 h-3.5 text-[#D2916C]" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#D2916C]">
              The Secret Science of the Dip
            </span>
          </div>
          <h2 className="font-brand font-black text-4xl sm:text-5xl lg:text-6xl text-[#FDF8F2] tracking-tight mb-4">
            HOT CONE MEETS <br />
            <span className="text-[#D2916C] italic">MOLTEN CHOCOLATE.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#FDF8F2]/80 leading-relaxed font-medium">
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
                ? 'bg-[#361E1C] border-[#D2916C] shadow-2xl scale-[1.02]'
                : 'bg-[#361E1C]/60 border-white/10 hover:border-white/20'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="w-8 h-8 rounded-full bg-[#D2916C] text-white font-black text-sm flex items-center justify-center">
                01
              </span>
              <span className="text-xs font-bold text-[#D2916C] flex items-center gap-1">
                <Flame className="w-3.5 h-3.5" /> 210°C Iron
              </span>
            </div>
            <h3 className="font-display font-black text-xl text-[#FDF8F2] mb-2">
              The Crisp Waffle Shell
            </h3>
            <p className="text-xs text-[#FDF8F2]/70 leading-relaxed">
              Caramelized Belgian pearl sugar crystalizes on the cone ridges within 180 seconds, locking in a cloud-soft interior while forming a rigid barrier for the dip.
            </p>
          </div>

          {/* Stage 2 */}
          <div
            id="thermal-stage-2"
            onClick={() => handleStageClick(2)}
            className={`p-6 rounded-3xl cursor-pointer transition-all duration-300 border-2 ${
              activeStage === 2
                ? 'bg-[#361E1C] border-[#D2916C] shadow-2xl scale-[1.02]'
                : 'bg-[#361E1C]/60 border-white/10 hover:border-white/20'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="w-8 h-8 rounded-full bg-[#D2916C] text-white font-black text-sm flex items-center justify-center">
                02
              </span>
              <span className="text-xs font-bold text-[#D2916C] flex items-center gap-1">
                <Thermometer className="w-3.5 h-3.5" /> 45°C Heated Pot
              </span>
            </div>
            <h3 className="font-display font-black text-xl text-[#FDF8F2] mb-2">
              The Pure Couverture Dip
            </h3>
            <p className="text-xs text-[#FDF8F2]/70 leading-relaxed">
              Submerged into continuous-flowing Belgian chocolate containing 100% pure cocoa butter. The warm sauce flows smoothly into every geometric pocket.
            </p>
          </div>

          {/* Stage 3 */}
          <div
            id="thermal-stage-3"
            onClick={() => handleStageClick(3)}
            className={`p-6 rounded-3xl cursor-pointer transition-all duration-300 border-2 ${
              activeStage === 3
                ? 'bg-[#361E1C] border-[#D2916C] shadow-2xl scale-[1.02]'
                : 'bg-[#361E1C]/60 border-white/10 hover:border-white/20'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="w-8 h-8 rounded-full bg-[#D2916C] text-white font-black text-sm flex items-center justify-center">
                03
              </span>
              <span className="text-xs font-bold text-[#D2916C] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> 60s Topping Lock
              </span>
            </div>
            <h3 className="font-display font-black text-xl text-[#FDF8F2] mb-2">
              The Crunch Setting
            </h3>
            <p className="text-xs text-[#FDF8F2]/70 leading-relaxed">
              Freshly crushed Oreos, Biscoff, and hazelnuts are showered over the molten chocolate, anchoring deeply as the chocolate sets into a silky ganache.
            </p>
          </div>

        </div>

        {/* Sensory Reel Showcase Card */}
        <div className="rounded-3xl bg-[#361E1C] border border-[#D2916C]/20 p-8 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-[10px] font-black tracking-widest text-[#D2916C] uppercase">
              Live Dipping Experience
            </span>
            <h3 className="font-brand font-black text-3xl sm:text-4xl text-[#FDF8F2]">
              Watch Chocolate Defy Gravity.
            </h3>
            <p className="text-sm text-[#FDF8F2]/80 leading-relaxed font-medium">
              Every stick is prepared live in front of you. The aroma of freshly baked vanilla batter combines with warm melted cocoa to create an unforgettable olfactory experience.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <button
                onClick={() => {
                  soundEffects.playDip();
                  soundEffects.playCrunch();
                }}
                className="px-6 py-3.5 rounded-full bg-[#D2916C] text-white font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-[#c2805b] transition-colors shadow-md"
              >
                <Volume2 className="w-4 h-4" />
                <span>Hear the Crunch Sound</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden shadow-xl border border-white/10">
            <img
              src={ASSETS.heroWaffle}
              alt="Macro shot of chocolate dipping texture"
              className="w-full h-72 object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#26140A] via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-[#FDF8F2]/80">
              <span className="font-bold text-[#D2916C]">DripStick Culinary Lab</span>
              <span>Antwerp Cocoa • 100% Pure Butter</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
