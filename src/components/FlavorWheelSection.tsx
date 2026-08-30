import React, { useState } from 'react';
import { Sparkles, Trophy, Shuffle, ArrowRight, Gift, Wand2, Volume2, Heart } from 'lucide-react';
import { SHOW_STOPPERS } from '../data/mockData';
import { ShowStopperProduct } from '../types';
import { soundEffects } from '../utils/soundEffects';

interface FlavorWheelSectionProps {
  onAddProduct: (product: ShowStopperProduct) => void;
  onOpenCart: () => void;
}

interface WheelSegment {
  name: string;
  emoji: string;
  tagline: string;
  bg: string;
  text: string;
  productId: string;
}

const SEGMENTS: WheelSegment[] = [
  { name: 'The Oreo Drip', emoji: '🍪', tagline: 'Midnight Crunchy Cookie Craving', bg: '#FFE4E6', text: '#9F1239', productId: 'show-1' },
  { name: 'Lotus Biscoff', emoji: '🍯', tagline: 'Caramelized Belgian Cookie Butter', bg: '#FEF3C7', text: '#92400E', productId: 'show-2' },
  { name: 'Triple Chocolate', emoji: '🍫', tagline: '100% Pure Dark Cocoa Avalanche', bg: '#EDE9FE', text: '#6B21A8', productId: 'show-4' },
  { name: 'Ruby Berry Swirl', emoji: '🍓', tagline: 'Tart Berry & Velvet White Ganache', bg: '#DCFCE7', text: '#166534', productId: 'show-5' },
  { name: 'Nutella Praline', emoji: '🌰', tagline: 'Warm Hazelnut Melt & Toasted Nuts', bg: '#FFEDD5', text: '#9A3412', productId: 'show-3' },
  { name: 'Pistachio Dream', emoji: '🌿', tagline: 'Persian Pistachio & Honey Drizzle', bg: '#E0F2FE', text: '#0369A1', productId: 'show-6' },
];

export const FlavorWheelSection: React.FC<FlavorWheelSectionProps> = ({ onAddProduct, onOpenCart }) => {
  const [rotation, setRotation] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [winner, setWinner] = useState<WheelSegment | null>(SEGMENTS[0]);
  const [hasSpun, setHasSpun] = useState<boolean>(false);

  const handleSpin = () => {
    if (isSpinning) return;
    
    // Play the authentic wheel spin click slow down sound effect (Pixabay 101152)
    soundEffects.playWheelSpinClickSlowDown(3800);
    setIsSpinning(true);

    // Calculate a random spin: 5 to 8 full rotations + random segment angle
    const segmentCount = SEGMENTS.length;
    const segmentAngle = 360 / segmentCount;
    const randomExtraSpins = (5 + Math.floor(Math.random() * 4)) * 360;
    const randomSegmentIndex = Math.floor(Math.random() * segmentCount);
    
    // Target angle where top indicator points to the selected segment
    const targetRotation = rotation + randomExtraSpins + (360 - (randomSegmentIndex * segmentAngle) - segmentAngle / 2);

    setRotation(targetRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setWinner(SEGMENTS[randomSegmentIndex]);
      setHasSpun(true);
      soundEffects.playSuccess();
    }, 3800);
  };

  const handleClaimReward = () => {
    if (!winner) return;
    const matchedProduct = SHOW_STOPPERS.find((p) => p.id === winner.productId) || SHOW_STOPPERS[0];
    soundEffects.playCrunch();
    onAddProduct(matchedProduct);
    onOpenCart();
  };

  return (
    <section id="flavor-wheel" className="py-20 bg-gradient-to-b from-[#FAF5EE] via-[#FFF1F2] to-[#FAF5EE] relative overflow-hidden border-t-2 border-b-2 border-[#4A2C2A]/10">
      
      {/* Decorative Pastel Ambient Circles */}
      <div className="absolute top-10 left-10 w-80 h-80 bg-[#FEF3C7]/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#FCE7F3]/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFE4E6] border border-[#FECDD3] mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#E11D48]" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#9F1239]">
              Interactive Dessert Matchmaker
            </span>
          </div>
          <h2 className="font-brand font-black text-4xl sm:text-5xl text-[#4A2C2A] uppercase tracking-tight">
            SPIN FOR YOUR FLAVOR DESTINY
          </h2>
          <p className="text-sm sm:text-base text-[#4A2C2A]/80 font-medium mt-2">
            Can't decide? Give the wheel a spin to unlock your matched Belgian stick + a 15% VIP surprise code! 🎡✨
          </p>
        </div>

        {/* Wheel & Reward Bento Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white/90 backdrop-blur-md p-6 sm:p-10 rounded-[36px] border-3 border-[#4A2C2A]/15 shadow-sticker-lg">
          
          {/* Wheel Visual Stage */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative py-4">
            
            {/* Top Indicator Arrow */}
            <div className="absolute top-0 z-30 -translate-y-1">
              <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[22px] border-t-[#E11D48] drop-shadow-md animate-bounce" />
            </div>

            {/* Rotating Wheel Container */}
            <div className="relative w-72 h-72 sm:w-88 sm:h-88 rounded-full border-8 border-[#4A2C2A] shadow-2xl p-2 bg-[#4A2C2A]">
              <div
                className="w-full h-full rounded-full overflow-hidden relative transition-transform duration-[3800ms] cubic-bezier(0.15, 0.9, 0.25, 1)"
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                {SEGMENTS.map((seg, idx) => {
                  const angle = (360 / SEGMENTS.length) * idx;
                  return (
                    <div
                      key={idx}
                      className="absolute top-0 left-1/2 w-1/2 h-full origin-left flex items-center justify-start pl-6"
                      style={{
                        transform: `rotate(${angle}deg)`,
                        backgroundColor: seg.bg,
                        clipPath: 'polygon(0 50%, 100% 0, 100% 100%)',
                      }}
                    >
                      <div
                        className="flex items-center gap-1.5 font-black text-xs sm:text-sm tracking-tight"
                        style={{ color: seg.text, transform: 'rotate(90deg) translate(-20px, 0)' }}
                      >
                        <span>{seg.emoji}</span>
                        <span className="truncate max-w-[85px]">{seg.name}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Center Spinning Hub Button */}
              <button
                onClick={handleSpin}
                disabled={isSpinning}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-[#4A2C2A] text-[#FDF8F2] border-4 border-[#FDE68A] shadow-xl flex flex-col items-center justify-center font-black text-[11px] uppercase tracking-wider hover:scale-105 active:scale-95 transition-transform z-20"
              >
                <Shuffle className={`w-4 h-4 text-[#FDE68A] mb-0.5 ${isSpinning ? 'animate-spin' : ''}`} />
                <span>{isSpinning ? 'SPINNING' : 'SPIN!'}</span>
              </button>
            </div>

            {isSpinning ? (
              <span className="text-[11px] font-black text-[#E11D48] mt-4 flex items-center gap-1.5 animate-pulse">
                <Volume2 className="w-3.5 h-3.5 text-[#E11D48]" />
                <span>Spinning with sound effect... 🎡🔊</span>
              </span>
            ) : (
              <span className="text-[11px] font-bold text-[#4A2C2A]/60 mt-4 flex items-center gap-1">
                <span>🎡 Tap center to spin the Wheel of Drip</span>
              </span>
            )}
          </div>

          {/* Result Card & Coupon Bento */}
          <div className="lg:col-span-6 space-y-6">
            
            {winner && (
              <div className="p-6 rounded-3xl border-2 border-[#4A2C2A]/20 bg-[#FAF5EE] shadow-sm relative overflow-hidden">
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#4A2C2A] text-[#FDE68A] font-black text-[10px] uppercase tracking-widest">
                  {hasSpun ? '✨ YOUR MATCH' : 'FEATURED DROP'}
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl p-2 rounded-2xl bg-white shadow-2xs border border-[#4A2C2A]/10">
                    {winner.emoji}
                  </span>
                  <div>
                    <h3 className="font-brand font-black text-2xl text-[#4A2C2A]">
                      {winner.name}
                    </h3>
                    <p className="text-xs font-bold text-[#4A2C2A]/70">
                      {winner.tagline}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-[#4A2C2A]/85 leading-relaxed font-medium mb-4">
                  Fresh Liège dough baked with caramelized sugar, dipped into warm velvety fondue and loaded with premium crunch toppings.
                </p>

                {/* Voucher Box */}
                <div className="p-3.5 rounded-2xl bg-white border border-[#4A2C2A]/15 flex items-center justify-between gap-2 mb-4">
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#9F1239] block">
                      Unlocked VIP Voucher
                    </span>
                    <span className="font-mono font-black text-sm text-[#4A2C2A] tracking-wider">
                      DRIP15 • 15% OFF
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-[#DCFCE7] text-[#166534] font-black text-[10px]">
                    APPLIED ✓
                  </span>
                </div>

                {/* Claim Button */}
                <button
                  onClick={handleClaimReward}
                  className="w-full py-3.5 rounded-full bg-[#4A2C2A] hover:bg-[#361E1C] text-white font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-md hover:scale-102 active:scale-98 transition-all"
                >
                  <Gift className="w-4 h-4 text-[#FDE68A]" />
                  <span>Add {winner.name} to Bag</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </button>
              </div>
            )}

            {/* Fun Fact Badges */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-[#FFE4E6]/60 border border-[#FECDD3] flex items-center gap-2.5">
                <span className="text-xl">🧇</span>
                <div>
                  <h5 className="font-black text-xs text-[#9F1239]">210°C Iron</h5>
                  <p className="text-[10px] text-[#4A2C2A]/70 font-medium">Crispy pearl sugar glaze</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FEF3C7]/60 border border-[#FDE68A] flex items-center gap-2.5">
                <span className="text-xl">🍫</span>
                <div>
                  <h5 className="font-black text-xs text-[#92400E]">45°C Fondue</h5>
                  <p className="text-[10px] text-[#4A2C2A]/70 font-medium">100% Belgian couverture</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
