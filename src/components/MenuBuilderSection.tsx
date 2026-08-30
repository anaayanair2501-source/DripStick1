import React, { useState } from 'react';
import { Sparkles, Check, Plus, RefreshCw, ShoppingBag, Flame, ChevronRight, Info, Heart, Wand2 } from 'lucide-react';
import { WAFFLE_BASES, SAUCE_DIPS, TOPPINGS, DRIZZLE_EXTRAS } from '../data/mockData';
import { CustomDripStick, WaffleBase, SauceDip, Topping, DrizzleExtra } from '../types';
import { soundEffects } from '../utils/soundEffects';

interface MenuBuilderSectionProps {
  onAddCustomToCart: (custom: CustomDripStick) => void;
}

export const MenuBuilderSection: React.FC<MenuBuilderSectionProps> = ({ onAddCustomToCart }) => {
  const [selectedBase, setSelectedBase] = useState<WaffleBase>(WAFFLE_BASES[0]);
  const [selectedSauce, setSelectedSauce] = useState<SauceDip>(SAUCE_DIPS[0]);
  const [selectedToppings, setSelectedToppings] = useState<Topping[]>([TOPPINGS[0]]);
  const [selectedDrizzle, setSelectedDrizzle] = useState<DrizzleExtra | undefined>(DRIZZLE_EXTRAS[0]);
  const [specialNote, setSpecialNote] = useState<string>('');
  const [isSuccessModal, setIsSuccessModal] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Price Calculation
  const toppingsPrice = selectedToppings.reduce((sum, item) => sum + item.price, 0);
  const drizzlePrice = selectedDrizzle ? selectedDrizzle.price : 0;
  const totalPrice = selectedBase.price + selectedSauce.price + toppingsPrice + drizzlePrice;

  // Calorie Calculation
  const totalCalories =
    selectedBase.calories +
    selectedSauce.calories +
    selectedToppings.reduce((sum, item) => sum + item.calories, 0) +
    (selectedDrizzle ? selectedDrizzle.calories : 0);

  // Toggle Topping selection (max 3)
  const handleToggleTopping = (topping: Topping) => {
    soundEffects.playCrunch();
    if (selectedToppings.some((t) => t.id === topping.id)) {
      setSelectedToppings(selectedToppings.filter((t) => t.id !== topping.id));
    } else {
      if (selectedToppings.length < 3) {
        setSelectedToppings([...selectedToppings, topping]);
      }
    }
  };

  const handleReset = () => {
    soundEffects.playDip();
    setSelectedBase(WAFFLE_BASES[0]);
    setSelectedSauce(SAUCE_DIPS[0]);
    setSelectedToppings([TOPPINGS[0]]);
    setSelectedDrizzle(DRIZZLE_EXTRAS[0]);
    setSpecialNote('');
    setCurrentStep(1);
  };

  const handleAddToCart = () => {
    soundEffects.playChime();
    const customStick: CustomDripStick = {
      base: selectedBase,
      sauce: selectedSauce,
      toppings: selectedToppings,
      drizzle: selectedDrizzle,
      specialInstructions: specialNote.trim() || undefined,
    };
    onAddCustomToCart(customStick);
    setIsSuccessModal(true);
    setTimeout(() => setIsSuccessModal(false), 2400);
  };

  return (
    <section id="menu" className="py-24 bg-[#FAF5EE] relative overflow-hidden">
      
      {/* Decorative Pastel Ambient Lights */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#FFE4E6]/50 to-[#FEF3C7]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#DCFCE7]/40 to-[#E0F2FE]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header with Pastel Flair */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFE4E6] border border-[#FECDD3] mb-4 shadow-2xs">
            <Wand2 className="w-3.5 h-3.5 text-[#E11D48]" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#9F1239]">
              4-Step Interactive Customizer
            </span>
          </div>
          <h2 className="font-brand font-black text-4xl sm:text-5xl lg:text-6xl text-[#4A2C2A] tracking-tight mb-3">
            BUILD YOUR DRIPSTICK
          </h2>
          <p className="text-base sm:text-lg text-[#4A2C2A]/80 leading-relaxed font-medium">
            Select your cone base, submerge it into warm Belgian couverture, shower it with crunch, and add your finishing drizzle.
          </p>
        </div>

        {/* Builder Layout: Step Wizard (7 Cols) and Sticky Live Visualizer (5 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: 4-Step Options Panel */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step Navigation Pill Tabs */}
            <div className="flex items-center gap-2 p-1.5 rounded-full bg-white border border-[#4A2C2A]/10 overflow-x-auto no-scrollbar shadow-xs">
              {[
                { step: 1, label: '1. Cone Base', emoji: '🧇' },
                { step: 2, label: '2. Molten Dip', emoji: '🍫' },
                { step: 3, label: '3. Crunch Toppings', emoji: '🍓' },
                { step: 4, label: '4. Finishing Touch', emoji: '🍯' },
              ].map((s) => (
                <button
                  key={s.step}
                  onClick={() => {
                    soundEffects.playDip();
                    setCurrentStep(s.step as 1 | 2 | 3 | 4);
                  }}
                  className={`flex-1 py-2.5 px-3.5 text-[11px] font-extrabold uppercase tracking-wider rounded-full whitespace-nowrap transition-all duration-200 flex items-center justify-center gap-1.5 ${
                    currentStep === s.step
                      ? 'bg-[#4A2C2A] text-white shadow-xs scale-102'
                      : 'text-[#4A2C2A]/70 hover:text-[#4A2C2A] hover:bg-[#FEF3C7]'
                  }`}
                >
                  <span>{s.emoji}</span>
                  <span>{s.label}</span>
                </button>
              ))}
            </div>

            {/* STEP 1: CONE BASE */}
            {currentStep === 1 && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#4A2C2A]/10 shadow-sm animate-fade-in">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#4A2C2A]/10">
                  <div>
                    <h3 className="font-brand font-black text-2xl text-[#4A2C2A]">
                      Step 1: Choose Your Cone Base
                    </h3>
                    <p className="text-xs text-[#4A2C2A]/60 mt-0.5">Freshly pressed waffle batter infused with Belgian pearl sugar</p>
                  </div>
                  <span className="text-xs font-bold text-[#92400E] bg-[#FEF3C7] px-3.5 py-1 rounded-full border border-[#FDE68A]">
                    Step 1 of 4
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {WAFFLE_BASES.map((base) => {
                    const isSelected = selectedBase.id === base.id;
                    return (
                      <div
                        key={base.id}
                        id={`btn-base-${base.id}`}
                        onClick={() => {
                          soundEffects.playCrunch();
                          setSelectedBase(base);
                        }}
                        className={`p-4 rounded-2xl cursor-pointer transition-all duration-200 border-2 flex flex-col justify-between hover:scale-102 active:scale-98 ${
                          isSelected
                            ? 'bg-gradient-to-br from-[#FFFBEB] to-[#FEF3C7] border-[#D97706] shadow-md'
                            : 'bg-[#FAF5EE]/60 border-[#4A2C2A]/10 hover:border-[#4A2C2A]/30'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <span className="text-3xl">{base.icon}</span>
                          <span className="font-display font-black text-base text-[#4A2C2A]">
                            ₹{base.price}
                          </span>
                        </div>
                        <h4 className="font-bold text-sm text-[#4A2C2A] mb-1">{base.name}</h4>
                        <p className="text-xs text-[#4A2C2A]/70 leading-relaxed mb-3">{base.description}</p>
                        <div className="flex items-center justify-between pt-2 border-t border-[#4A2C2A]/10 text-[10px] text-[#4A2C2A]/60">
                          <span>~{base.calories} kcal</span>
                          {isSelected && <span className="font-bold text-[#D97706] flex items-center gap-1"><Check className="w-3 h-3" /> Selected</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => {
                      soundEffects.playDip();
                      setCurrentStep(2);
                    }}
                    className="px-6 py-3.5 bg-[#4A2C2A] text-white text-xs font-black uppercase tracking-widest rounded-full flex items-center gap-2 hover:bg-[#361E1C] shadow-md hover:scale-105 active:scale-95 transition-all"
                  >
                    <span>Next: Choose Molten Dip</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: MOLTEN DIP */}
            {currentStep === 2 && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#4A2C2A]/10 shadow-sm animate-fade-in">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#4A2C2A]/10">
                  <div>
                    <h3 className="font-brand font-black text-2xl text-[#4A2C2A]">
                      Step 2: Choose Warm Belgian Couverture Dip
                    </h3>
                    <p className="text-xs text-[#4A2C2A]/60 mt-0.5">Kept at 45°C in continuous flowing fondue pots</p>
                  </div>
                  <span className="text-xs font-bold text-[#9A3412] bg-[#FFEDD5] px-3.5 py-1 rounded-full border border-[#FED7AA]">
                    Step 2 of 4
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {SAUCE_DIPS.map((sauce) => {
                    const isSelected = selectedSauce.id === sauce.id;
                    return (
                      <div
                        key={sauce.id}
                        id={`btn-sauce-${sauce.id}`}
                        onClick={() => {
                          soundEffects.playDip();
                          setSelectedSauce(sauce);
                        }}
                        className={`p-4 rounded-2xl cursor-pointer transition-all duration-200 border-2 flex flex-col justify-between hover:scale-102 active:scale-98 ${
                          isSelected
                            ? 'bg-gradient-to-br from-[#FFF7ED] to-[#FFEDD5] border-[#EA580C] shadow-md'
                            : 'bg-[#FAF5EE]/60 border-[#4A2C2A]/10 hover:border-[#4A2C2A]/30'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full border border-black/20 shadow-xs" style={{ backgroundColor: sauce.color }} />
                            <h4 className="font-bold text-sm text-[#4A2C2A]">{sauce.name}</h4>
                          </div>
                          <span className="font-display font-black text-base text-[#4A2C2A]">
                            ₹{sauce.price}
                          </span>
                        </div>
                        <p className="text-xs text-[#4A2C2A]/70 leading-relaxed mb-3">{sauce.description}</p>
                        <div className="flex items-center justify-between pt-2 border-t border-[#4A2C2A]/10 text-[10px] text-[#4A2C2A]/60">
                          <span>{sauce.cocoaPercent} Cocoa • ~{sauce.calories} kcal</span>
                          {isSelected && <span className="font-bold text-[#EA580C] flex items-center gap-1"><Check className="w-3 h-3" /> Selected</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 flex justify-between">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="px-5 py-3 border border-[#4A2C2A]/20 text-[#4A2C2A] text-xs font-bold uppercase tracking-wider rounded-full hover:bg-[#4A2C2A]/5"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => {
                      soundEffects.playDip();
                      setCurrentStep(3);
                    }}
                    className="px-6 py-3.5 bg-[#4A2C2A] text-white text-xs font-black uppercase tracking-widest rounded-full flex items-center gap-2 hover:bg-[#361E1C] shadow-md hover:scale-105 active:scale-95 transition-all"
                  >
                    <span>Next: Add Crunch Toppings</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: TOPPINGS */}
            {currentStep === 3 && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#4A2C2A]/10 shadow-sm animate-fade-in">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#4A2C2A]/10">
                  <div>
                    <h3 className="font-brand font-black text-2xl text-[#4A2C2A]">
                      Step 3: Add Crunchy Toppings (Pick up to 3)
                    </h3>
                    <p className="text-xs text-[#4A2C2A]/60 mt-0.5">Showered immediately over warm chocolate to lock in crunch</p>
                  </div>
                  <span className="text-xs font-bold text-[#9F1239] bg-[#FFE4E6] px-3.5 py-1 rounded-full border border-[#FECDD3]">
                    {selectedToppings.length}/3 selected
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {TOPPINGS.map((topping) => {
                    const isSelected = selectedToppings.some((t) => t.id === topping.id);
                    return (
                      <div
                        key={topping.id}
                        id={`btn-topping-${topping.id}`}
                        onClick={() => handleToggleTopping(topping)}
                        className={`p-3.5 rounded-2xl cursor-pointer transition-all duration-200 border-2 flex items-center justify-between hover:scale-102 active:scale-98 ${
                          isSelected
                            ? 'bg-gradient-to-br from-[#FFF1F2] to-[#FFE4E6] border-[#E11D48] shadow-xs'
                            : 'bg-[#FAF5EE]/60 border-[#4A2C2A]/10 hover:border-[#4A2C2A]/30'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{topping.icon}</span>
                          <div>
                            <h4 className="font-bold text-xs text-[#4A2C2A]">{topping.name}</h4>
                            <p className="text-[10px] text-[#4A2C2A]/60">~{topping.calories} kcal</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-xs text-[#4A2C2A]">₹{topping.price}</span>
                          <span className={`block text-[10px] font-bold ${isSelected ? 'text-[#E11D48]' : 'text-neutral-400'}`}>
                            {isSelected ? '✓ Added' : '+ Add'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 flex justify-between">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="px-5 py-3 border border-[#4A2C2A]/20 text-[#4A2C2A] text-xs font-bold uppercase tracking-wider rounded-full hover:bg-[#4A2C2A]/5"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => {
                      soundEffects.playDip();
                      setCurrentStep(4);
                    }}
                    className="px-6 py-3.5 bg-[#4A2C2A] text-white text-xs font-black uppercase tracking-widest rounded-full flex items-center gap-2 hover:bg-[#361E1C] shadow-md hover:scale-105 active:scale-95 transition-all"
                  >
                    <span>Next: Finishing Touches</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: DRIZZLES & INSTRUCTIONS */}
            {currentStep === 4 && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#4A2C2A]/10 shadow-sm animate-fade-in">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#4A2C2A]/10">
                  <div>
                    <h3 className="font-brand font-black text-2xl text-[#4A2C2A]">
                      Step 4: Finishing Drizzle & Notes
                    </h3>
                    <p className="text-xs text-[#4A2C2A]/60 mt-0.5">Final zig-zag artisanal drizzle and special chef instructions</p>
                  </div>
                  <span className="text-xs font-bold text-[#6B21A8] bg-[#F3E8FF] px-3.5 py-1 rounded-full border border-[#E9D5FF]">
                    Step 4 of 4
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  {DRIZZLE_EXTRAS.map((drizzle) => {
                    const isSelected = selectedDrizzle?.id === drizzle.id;
                    return (
                      <div
                        key={drizzle.id}
                        id={`btn-drizzle-${drizzle.id}`}
                        onClick={() => {
                          soundEffects.playDip();
                          setSelectedDrizzle(isSelected ? undefined : drizzle);
                        }}
                        className={`p-3 rounded-2xl cursor-pointer text-center transition-all duration-200 border-2 hover:scale-102 active:scale-98 ${
                          isSelected
                            ? 'bg-gradient-to-br from-[#FAF5FF] to-[#F3E8FF] border-[#9333EA] shadow-xs'
                            : 'bg-[#FAF5EE]/60 border-[#4A2C2A]/10 hover:border-[#4A2C2A]/30'
                        }`}
                      >
                        <span className="w-4 h-4 rounded-full inline-block mb-1 border border-black/10 shadow-xs" style={{ backgroundColor: drizzle.color }} />
                        <h4 className="font-bold text-xs text-[#4A2C2A]">{drizzle.name}</h4>
                        <p className="text-[10px] text-[#4A2C2A]/60">₹{drizzle.price}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="mb-6">
                  <label className="block text-xs font-bold text-[#4A2C2A] mb-2">
                    Special Preparation Instructions (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={specialNote}
                    onChange={(e) => setSpecialNote(e.target.value)}
                    placeholder="e.g. Extra hot dip, half Oreo half KitKat, separate drizzle on side..."
                    className="w-full p-3.5 bg-[#FAF5EE] border border-[#4A2C2A]/15 rounded-2xl text-xs text-[#4A2C2A] focus:outline-none focus:border-[#4A2C2A]"
                  />
                </div>

                <div className="flex justify-between items-center">
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="px-5 py-3 border border-[#4A2C2A]/20 text-[#4A2C2A] text-xs font-bold uppercase tracking-wider rounded-full hover:bg-[#4A2C2A]/5"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleAddToCart}
                    className="px-8 py-3.5 bg-[#4A2C2A] text-white text-xs font-black uppercase tracking-widest rounded-full flex items-center gap-2 hover:bg-[#361E1C] shadow-lg hover:scale-105 active:scale-95 transition-all"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>ADD CUSTOM DRIPSTICK TO BAG</span>
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Live Dynamic DripStick Visualizer with Pastel Glow */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-[#4A2C2A]/15 shadow-xl relative overflow-hidden">
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#E11D48] bg-[#FFE4E6] px-3 py-1 rounded-full border border-[#FECDD3] flex items-center gap-1 shadow-2xs">
                  <Sparkles className="w-3 h-3" /> Live DripStick Preview
                </span>
                <button
                  onClick={handleReset}
                  className="text-xs text-[#4A2C2A]/70 hover:text-[#4A2C2A] flex items-center gap-1 font-bold bg-[#FAF5EE] px-2.5 py-1 rounded-full border border-[#4A2C2A]/10"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Dynamic Animated Waffle Canvas with Pastel background */}
              <div className="relative w-full h-80 rounded-2xl bg-gradient-to-b from-[#FAF5EE] to-[#FEF3C7]/30 overflow-hidden border border-[#4A2C2A]/10 flex flex-col items-center justify-center p-4 shadow-inner">
                
                {/* Waffle Cone Body with texture */}
                <div
                  className="relative w-28 sm:w-32 h-56 rounded-t-full rounded-b-xl border-2 border-[#4A2C2A]/20 shadow-xl overflow-hidden flex flex-col items-center transition-all duration-500 hover:scale-105"
                  style={{
                    backgroundColor:
                      selectedBase.id === 'base-dark'
                        ? '#3D2523'
                        : selectedBase.id === 'base-speculoos'
                        ? '#D2916C'
                        : '#F5DEB3',
                  }}
                >
                  {/* Waffle Grid Lines Texture */}
                  <div className="w-full h-full waffle-texture" />

                  {/* Molten Chocolate Dip Coating on Top Half */}
                  <div
                    className="absolute top-0 left-0 right-0 h-32 rounded-b-[40%] shadow-md transition-all duration-500 overflow-hidden"
                    style={{ backgroundColor: selectedSauce.color }}
                  >
                    {/* Animated Droplet on bottom edge */}
                    <div
                      className="absolute bottom-1 left-1/3 w-3 h-6 rounded-b-full shadow-md animate-drip"
                      style={{ backgroundColor: selectedSauce.color }}
                    />
                    <div
                      className="absolute bottom-2 right-1/4 w-2 h-4 rounded-b-full shadow-md animate-drip"
                      style={{ backgroundColor: selectedSauce.color, animationDelay: '0.5s' }}
                    />
                  </div>

                  {/* Toppings Displayed on the Dip */}
                  <div className="absolute top-4 inset-x-2 flex flex-wrap justify-center gap-1 z-10 pointer-events-none">
                    {selectedToppings.map((t) => (
                      <span key={t.id} className="text-base drop-shadow animate-bounce-cute">
                        {t.icon}
                      </span>
                    ))}
                  </div>

                  {/* Finishing Drizzle Line */}
                  {selectedDrizzle && (
                    <div className="absolute top-3 inset-x-1 h-20 pointer-events-none z-10 opacity-85">
                      <svg viewBox="0 0 100 80" className="w-full h-full">
                        <path
                          d="M10,15 Q30,35 50,15 Q70,35 90,15 Q50,45 20,60 Q60,75 85,55"
                          fill="none"
                          stroke={selectedDrizzle.color}
                          strokeWidth="4.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Wooden Stick */}
                  <div className="absolute -bottom-10 w-3.5 h-20 bg-[#D2916C] rounded-full border border-[#4A2C2A]/20 shadow-md" />
                </div>

                <div className="absolute bottom-2 left-3 text-[10px] text-[#4A2C2A]/70 font-black bg-white/80 px-2.5 py-0.5 rounded-full border border-[#4A2C2A]/10">
                  {selectedBase.name} • {selectedSauce.name}
                </div>
              </div>

              {/* Composition Summary Checklist */}
              <div className="space-y-2 mt-4 text-xs">
                <div className="flex justify-between py-1 border-b border-[#4A2C2A]/10">
                  <span className="text-[#4A2C2A]/70">Waffle Cone:</span>
                  <span className="font-bold text-[#4A2C2A]">{selectedBase.name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#4A2C2A]/10">
                  <span className="text-[#4A2C2A]/70">Molten Dip:</span>
                  <span className="font-bold text-[#4A2C2A]">{selectedSauce.name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#4A2C2A]/10">
                  <span className="text-[#4A2C2A]/70">Toppings ({selectedToppings.length}):</span>
                  <span className="font-bold text-[#4A2C2A] text-right truncate max-w-[180px]">
                    {selectedToppings.map((t) => t.name).join(', ') || 'None'}
                  </span>
                </div>
                {selectedDrizzle && (
                  <div className="flex justify-between py-1 border-b border-[#4A2C2A]/10">
                    <span className="text-[#4A2C2A]/70">Drizzle:</span>
                    <span className="font-bold text-[#4A2C2A]">{selectedDrizzle.name}</span>
                  </div>
                )}
                <div className="flex justify-between py-1 text-[11px] text-[#4A2C2A]/60">
                  <span>Nutritional Estimate:</span>
                  <span>~{totalCalories} kcal</span>
                </div>
              </div>

              {/* Price & Add to Bag CTA with Cute Pastel Badge */}
              <div className="mt-6 pt-4 border-t-2 border-[#4A2C2A]/10 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#4A2C2A]/60 block">
                    Calculated Total
                  </span>
                  <span className="font-display font-black text-3xl text-[#4A2C2A]">
                    ₹{totalPrice}
                  </span>
                </div>

                <button
                  id="btn-builder-add-to-cart"
                  onClick={handleAddToCart}
                  className="flex-1 py-4 bg-[#4A2C2A] text-[#FAF5EE] rounded-full font-black text-xs uppercase tracking-widest shadow-lg hover:bg-[#361E1C] transition-all flex items-center justify-center gap-2 active:scale-98 hover:scale-102"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>ADD TO BAG</span>
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Instant Success Toast in Sweet Pastel Design */}
      {isSuccessModal && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#4A2C2A] text-[#FAF5EE] px-6 py-4 rounded-3xl shadow-2xl flex items-center gap-3 border border-[#FECDD3] animate-bounce-cute">
          <div className="w-7 h-7 rounded-full bg-[#E11D48] text-white flex items-center justify-center font-bold text-xs shadow-xs">
            ✓
          </div>
          <div>
            <p className="font-black text-xs">Custom DripStick Added to Bag!</p>
            <p className="text-[10px] text-[#FAF5EE]/80">₹{totalPrice} • View in your cart</p>
          </div>
        </div>
      )}
    </section>
  );
};
