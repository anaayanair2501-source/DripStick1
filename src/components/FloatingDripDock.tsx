import React from 'react';
import { ShoppingBag, Sparkles, Wand2, Compass, Volume2, VolumeX, Flame } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

interface FloatingDripDockProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenMatchmaker: () => void;
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export const FloatingDripDock: React.FC<FloatingDripDockProps> = ({
  cartCount,
  onOpenCart,
  onOpenMatchmaker,
  onNavigate,
  activeSection,
}) => {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-[95vw] pointer-events-auto">
      <div className="bg-[#FAF5EE]/95 backdrop-blur-md px-3 sm:px-4 py-2.5 rounded-full border-2 border-[#4A2C2A]/20 shadow-sticker flex items-center gap-1.5 sm:gap-2">
        
        {/* Lab / Customizer */}
        <button
          onClick={() => {
            soundEffects.playDip();
            onNavigate('menu');
          }}
          className={`px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all duration-200 ${
            activeSection === 'menu'
              ? 'bg-[#4A2C2A] text-white shadow-xs scale-105'
              : 'bg-[#FEF3C7] text-[#92400E] hover:bg-[#FDE68A] hover:scale-105'
          }`}
        >
          <span>🧪</span>
          <span className="hidden sm:inline">Drip Lab</span>
        </button>

        {/* Showstoppers */}
        <button
          onClick={() => {
            soundEffects.playDip();
            onNavigate('showstoppers');
          }}
          className={`px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all duration-200 ${
            activeSection === 'showstoppers'
              ? 'bg-[#4A2C2A] text-white shadow-xs scale-105'
              : 'bg-[#FFE4E6] text-[#9F1239] hover:bg-[#FECDD3] hover:scale-105'
          }`}
        >
          <span>🔥</span>
          <span className="hidden sm:inline">Showstoppers</span>
        </button>

        {/* Spin Wheel Arcade Section */}
        <button
          onClick={() => {
            soundEffects.playPop();
            onNavigate('flavor-wheel');
          }}
          className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-xs hover:scale-105 active:scale-95 transition-all ${
            activeSection === 'flavor-wheel'
              ? 'bg-[#4A2C2A] text-white ring-2 ring-[#F472B6] scale-105'
              : 'bg-gradient-to-r from-[#F472B6] to-[#FB7185] text-white'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-[#FDE68A]" />
          <span>Spin Wheel 🎡</span>
        </button>

        {/* Outlets */}
        <button
          onClick={() => {
            soundEffects.playDip();
            onNavigate('outlets');
          }}
          className={`px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all duration-200 ${
            activeSection === 'outlets'
              ? 'bg-[#4A2C2A] text-white shadow-xs scale-105'
              : 'bg-[#EDE9FE] text-[#6B21A8] hover:bg-[#DDD6FE] hover:scale-105'
          }`}
        >
          <span>📍</span>
          <span className="hidden md:inline">Find Outlets</span>
        </button>

        {/* Cart Trigger */}
        <button
          onClick={() => {
            soundEffects.playDip();
            onOpenCart();
          }}
          className="relative px-3.5 sm:px-4 py-1.5 rounded-full bg-[#4A2C2A] text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md hover:scale-105 active:scale-95 transition-all"
        >
          <ShoppingBag className="w-3.5 h-3.5 text-[#FDE68A]" />
          <span className="hidden sm:inline">Bag</span>
          {cartCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-[#F43F5E] text-white text-[10px] font-black flex items-center justify-center animate-bounce-cute shadow-xs">
              {cartCount}
            </span>
          )}
        </button>

      </div>
    </div>
  );
};
