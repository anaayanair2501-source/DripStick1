import React, { useState } from 'react';
import { Flame, Droplets, Thermometer, Sparkles, Volume2, VolumeX, Play, Pause, ExternalLink, Music2 } from 'lucide-react';
import { ASSETS } from '../data/mockData';
import { soundEffects } from '../utils/soundEffects';

export const TheDripExperienceSection: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(1);
  const [isPlayingSound, setIsPlayingSound] = useState<boolean>(false);
  const [showVideoPlayer, setShowVideoPlayer] = useState<boolean>(false);

  const handleStageClick = (stage: number) => {
    setActiveStage(stage);
    if (stage === 1) soundEffects.playCrunch();
    if (stage === 2) soundEffects.playDip();
    if (stage === 3) soundEffects.playCrunch();
  };

  const toggleSoundPlay = () => {
    if (!isPlayingSound) {
      soundEffects.playDip();
      setIsPlayingSound(true);
    } else {
      setIsPlayingSound(false);
    }
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
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="hear-crunch-sound-btn"
                onClick={toggleSoundPlay}
                className={`px-6 py-3.5 rounded-full font-black text-xs uppercase tracking-widest flex items-center gap-2.5 transition-all shadow-md ${
                  isPlayingSound
                    ? 'bg-[#F472B6] text-white ring-4 ring-[#F472B6]/30 scale-105'
                    : 'bg-gradient-to-r from-[#FDE68A] via-[#FED7AA] to-[#FCE7F3] text-[#4A2C2A] hover:scale-105 active:scale-95'
                }`}
              >
                {isPlayingSound ? (
                  <>
                    <Pause className="w-4 h-4 text-white animate-pulse" />
                    <span>Pause Sound ⏸️</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-[#92400E]" />
                    <span>Hear the Crunch Sound 🔊</span>
                  </>
                )}
              </button>

              {/* Toggle Video Preview Button */}
              <button
                onClick={() => {
                  soundEffects.playDip();
                  setShowVideoPlayer(!showVideoPlayer);
                  if (!isPlayingSound) setIsPlayingSound(true);
                }}
                className="px-4 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-[#FDF8F2] text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all"
              >
                <Play className="w-3.5 h-3.5 text-[#FDE68A]" />
                <span>{showVideoPlayer ? 'Hide Video' : 'Watch Video'}</span>
              </button>
            </div>

            {/* Audio Wave Visualizer Status */}
            {isPlayingSound && (
              <div className="p-3.5 rounded-2xl bg-[#26140A]/80 border border-[#FDE68A]/30 flex items-center justify-between gap-3 animate-fade-in">
                <div className="flex items-center gap-2.5">
                  <div className="flex items-end gap-1 h-5">
                    <span className="w-1 bg-[#FDE68A] h-5 rounded-full animate-pulse" style={{ animationDuration: '0.4s' }} />
                    <span className="w-1 bg-[#F472B6] h-3.5 rounded-full animate-pulse" style={{ animationDuration: '0.6s' }} />
                    <span className="w-1 bg-[#86EFAC] h-4.5 rounded-full animate-pulse" style={{ animationDuration: '0.35s' }} />
                    <span className="w-1 bg-[#FED7AA] h-2.5 rounded-full animate-pulse" style={{ animationDuration: '0.5s' }} />
                    <span className="w-1 bg-[#FDE68A] h-4 rounded-full animate-pulse" style={{ animationDuration: '0.45s' }} />
                  </div>
                  <div>
                    <p className="text-[11px] font-black text-[#FDE68A]">
                      Playing Crunch Audio Stream
                    </p>
                    <p className="text-[10px] text-[#FDF8F2]/70">
                      YouTube Audio: 1XqEc-LKUrY
                    </p>
                  </div>
                </div>
                <a
                  href="https://youtu.be/1XqEc-LKUrY?si=EIO6mEvQTV6OaTPk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-bold text-[#FBCFE8] hover:underline flex items-center gap-1 shrink-0"
                >
                  <span>Open Video</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>

          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden shadow-xl border-2 border-white/20 bg-black aspect-video sm:aspect-auto sm:h-72">
            {showVideoPlayer || isPlayingSound ? (
              <iframe
                src={`https://www.youtube.com/embed/1XqEc-LKUrY?autoplay=1&enablejsapi=1&rel=0`}
                title="DripStick Crunch Audio Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full object-cover border-0"
              />
            ) : (
              <>
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
                {/* Overlay Play Hint */}
                <button
                  onClick={toggleSoundPlay}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all shadow-lg group"
                >
                  <Play className="w-7 h-7 text-[#FDE68A] fill-[#FDE68A] ml-1 group-hover:scale-110 transition-transform" />
                </button>
              </>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
