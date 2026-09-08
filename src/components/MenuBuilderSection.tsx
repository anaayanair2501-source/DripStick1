import React, { useState } from 'react';
import { Sparkles, Check, Plus, RefreshCw, ShoppingBag, Flame, ChevronRight, Info, Heart, Wand2, ZoomIn, Eye, X } from 'lucide-react';
import { WAFFLE_BASES, SAUCE_DIPS, TOPPINGS, DRIZZLE_EXTRAS, ASSETS } from '../data/mockData';
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
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  // Dynamically resolve realistic preview image based on all active choices
  const { previewImage, styleLabel } = React.useMemo(() => {
    // 1. Specific Sauce Dip matches
    if (selectedSauce.id === 'sauce-white-velvet') {
      return {
        previewImage: ASSETS.waffleWhiteDip,
        styleLabel: 'Silky White Velvet Couverture',
      };
    }
    if (selectedSauce.id === 'sauce-dark-choco') {
      return {
        previewImage: ASSETS.waffleDarkDip,
        styleLabel: '70% Antwerp Dark Couverture',
      };
    }
    if (selectedSauce.id === 'sauce-bueno') {
      return {
        previewImage: ASSETS.waffleBueno,
        styleLabel: 'Hazelnut Bueno Praline Cream',
      };
    }
    if (selectedSauce.id === 'sauce-speculoos-dip') {
      return {
        previewImage: ASSETS.waffleBiscoff,
        styleLabel: 'Lotus Biscoff Spiced Lava',
      };
    }

    // 2. Base selection overrides if base is Dark Cocoa or Speculoos
    if (selectedBase.id === 'base-dark') {
      return {
        previewImage: ASSETS.waffleDarkDip,
        styleLabel: 'Belgian Dark Cocoa Cone & Drip',
      };
    }
    if (selectedBase.id === 'base-speculoos' && !selectedToppings.some((t) => t.id === 'top-oreo')) {
      return {
        previewImage: ASSETS.waffleBiscoff,
        styleLabel: 'Speculoos Spiced Crust & Dip',
      };
    }

    // 3. Topping overrides for milk chocolate or nutella
    if (selectedToppings.some((t) => t.id === 'top-oreo')) {
      return {
        previewImage: ASSETS.waffleOreo,
        styleLabel: 'Oreo Crushed Midnight Drip',
      };
    }
    if (selectedToppings.some((t) => t.id === 'top-biscoff')) {
      return {
        previewImage: ASSETS.waffleBiscoff,
        styleLabel: 'Lotus Speculoos Crunch & Drip',
      };
    }
    if (selectedToppings.some((t) => t.id === 'top-kitkat')) {
      return {
        previewImage: ASSETS.waffleBueno,
        styleLabel: 'Wafer Crunch & Milk Chocolate',
      };
    }

    // 4. Default / direct image
    return {
      previewImage: selectedSauce.image || selectedBase.image || ASSETS.realisticDripstick,
      styleLabel: `${selectedSauce.name} • ${selectedBase.name}`,
    };
  }, [selectedBase, selectedSauce, selectedToppings]);

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
            <div className="flex items-center gap-2 p-1.5 rounded-full bg-[#E5D3C0] border-2 border-[#BFA793] overflow-x-auto no-scrollbar shadow-xs">
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
                      ? 'bg-[#3A1E1A] text-white shadow-xs scale-102'
                      : 'text-[#3A1E1A]/85 hover:text-[#3A1E1A] hover:bg-[#D5BFA9]'
                  }`}
                >
                  <span>{s.emoji}</span>
                  <span>{s.label}</span>
                </button>
              ))}
            </div>

            {/* STEP 1: CONE BASE */}
            {currentStep === 1 && (
              <div className="bg-[#E7D6C5] p-6 sm:p-8 rounded-3xl border-2 border-[#BAA18D] shadow-sm animate-fade-in">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#BAA18D]/80">
                  <div>
                    <h3 className="font-brand font-black text-2xl text-[#361A17]">
                      Step 1: Choose Your Cone Base
                    </h3>
                    <p className="text-xs text-[#361A17]/80 mt-0.5">Freshly pressed waffle batter infused with Belgian pearl sugar</p>
                  </div>
                  <span className="text-xs font-bold text-[#643419] bg-[#D7C0A9] px-3.5 py-1 rounded-full border border-[#BAA18D]">
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
                            ? 'bg-[#DCBEA5] border-[#6E3C2B] shadow-md ring-2 ring-[#6E3C2B]/30'
                            : 'bg-[#F2E5D6] border-[#CBB3A0] hover:border-[#9C7F6A] hover:bg-[#EBDBC9]'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2.5">
                          <div className="flex items-center gap-2.5">
                            {base.image ? (
                              <img
                                src={base.image}
                                alt={base.name}
                                referrerPolicy="no-referrer"
                                className="w-11 h-11 rounded-xl object-cover border border-[#BAA18D] shadow-xs"
                              />
                            ) : (
                              <span className="text-3xl">{base.icon}</span>
                            )}
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="text-sm">{base.icon}</span>
                                <h4 className="font-bold text-sm text-[#361A17]">{base.name}</h4>
                              </div>
                              {base.badge && (
                                <span className="inline-block text-[9px] font-black uppercase text-[#8C3A00] bg-[#F5DEB3] px-1.5 py-0.5 rounded-md mt-0.5 border border-[#BAA18D]/50">
                                  {base.badge}
                                </span>
                              )}
                            </div>
                          </div>
                          <span className="font-display font-black text-base text-[#361A17]">
                            ₹{base.price}
                          </span>
                        </div>
                        <p className="text-xs text-[#361A17]/80 leading-relaxed mb-3">{base.description}</p>
                        <div className="flex items-center justify-between pt-2 border-t border-[#BAA18D]/70 text-[10px] text-[#361A17]/80">
                          <span>~{base.calories} kcal</span>
                          {isSelected ? (
                            <span className="font-bold text-[#6E3C2B] flex items-center gap-1"><Check className="w-3 h-3" /> Selected</span>
                          ) : (
                            <span className="text-[#361A17]/70 font-semibold group-hover:text-[#361A17]">Select Base →</span>
                          )}
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
                    className="px-6 py-3.5 bg-[#361A17] text-white text-xs font-black uppercase tracking-widest rounded-full flex items-center gap-2 hover:bg-[#281310] shadow-md hover:scale-105 active:scale-95 transition-all"
                  >
                    <span>Next: Choose Molten Dip</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: MOLTEN DIP */}
            {currentStep === 2 && (
              <div className="bg-[#E7D6C5] p-6 sm:p-8 rounded-3xl border-2 border-[#BAA18D] shadow-sm animate-fade-in">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#BAA18D]/80">
                  <div>
                    <h3 className="font-brand font-black text-2xl text-[#361A17]">
                      Step 2: Choose Warm Belgian Couverture Dip
                    </h3>
                    <p className="text-xs text-[#361A17]/80 mt-0.5">Kept at 45°C in continuous flowing fondue pots • Live preview updates instantly</p>
                  </div>
                  <span className="text-xs font-bold text-[#643419] bg-[#D7C0A9] px-3.5 py-1 rounded-full border border-[#BAA18D]">
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
                            ? 'bg-[#DCBEA5] border-[#6E3C2B] shadow-md ring-2 ring-[#6E3C2B]/30'
                            : 'bg-[#F2E5D6] border-[#CBB3A0] hover:border-[#9C7F6A] hover:bg-[#EBDBC9]'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2.5">
                          <div className="flex items-center gap-2.5">
                            {sauce.image ? (
                              <img
                                src={sauce.image}
                                alt={sauce.name}
                                referrerPolicy="no-referrer"
                                className="w-11 h-11 rounded-xl object-cover border border-[#BAA18D] shadow-xs shrink-0"
                              />
                            ) : (
                              <span className="w-6 h-6 rounded-full border border-black/20 shadow-xs shrink-0" style={{ backgroundColor: sauce.color }} />
                            )}
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full border border-black/20 shrink-0" style={{ backgroundColor: sauce.color }} />
                                <h4 className="font-bold text-sm text-[#361A17]">{sauce.name}</h4>
                              </div>
                              {sauce.badge && (
                                <span className="inline-block text-[9px] font-black uppercase text-[#8C3A00] bg-[#F5DEB3] px-1.5 py-0.5 rounded-md mt-0.5 border border-[#BAA18D]/50">
                                  {sauce.badge}
                                </span>
                              )}
                            </div>
                          </div>
                          <span className="font-display font-black text-base text-[#361A17]">
                            ₹{sauce.price}
                          </span>
                        </div>
                        <p className="text-xs text-[#361A17]/80 leading-relaxed mb-3">{sauce.description}</p>
                        <div className="flex items-center justify-between pt-2 border-t border-[#BAA18D]/70 text-[10px] text-[#361A17]/80">
                          <span>{sauce.cocoaPercent ? `${sauce.cocoaPercent} Cocoa • ` : ''}~{sauce.calories} kcal</span>
                          {isSelected ? (
                            <span className="font-bold text-[#6E3C2B] flex items-center gap-1"><Check className="w-3 h-3" /> Selected</span>
                          ) : (
                            <span className="text-[#361A17]/70 font-semibold group-hover:text-[#361A17]">Select Dip →</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 flex justify-between">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="px-5 py-3 border border-[#361A17]/20 bg-[#F2E5D6] text-[#361A17] text-xs font-bold uppercase tracking-wider rounded-full hover:bg-[#D7C0A9]"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => {
                      soundEffects.playDip();
                      setCurrentStep(3);
                    }}
                    className="px-6 py-3.5 bg-[#361A17] text-white text-xs font-black uppercase tracking-widest rounded-full flex items-center gap-2 hover:bg-[#281310] shadow-md hover:scale-105 active:scale-95 transition-all"
                  >
                    <span>Next: Add Crunch Toppings</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: TOPPINGS */}
            {currentStep === 3 && (
              <div className="bg-[#E7D6C5] p-6 sm:p-8 rounded-3xl border-2 border-[#BAA18D] shadow-sm animate-fade-in">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#BAA18D]/80">
                  <div>
                    <h3 className="font-brand font-black text-2xl text-[#361A17]">
                      Step 3: Add Crunchy Toppings (Pick up to 3)
                    </h3>
                    <p className="text-xs text-[#361A17]/80 mt-0.5">Showered immediately over warm chocolate to lock in crunch</p>
                  </div>
                  <span className="text-xs font-bold text-[#643419] bg-[#D7C0A9] px-3.5 py-1 rounded-full border border-[#BAA18D]">
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
                            ? 'bg-[#DCBEA5] border-[#6E3C2B] shadow-xs ring-2 ring-[#6E3C2B]/30'
                            : 'bg-[#F2E5D6] border-[#CBB3A0] hover:border-[#9C7F6A] hover:bg-[#EBDBC9]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{topping.icon}</span>
                          <div>
                            <h4 className="font-bold text-xs text-[#361A17]">{topping.name}</h4>
                            <p className="text-[10px] text-[#361A17]/70">~{topping.calories} kcal</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-xs text-[#361A17]">₹{topping.price}</span>
                          <span className={`block text-[10px] font-bold ${isSelected ? 'text-[#6E3C2B]' : 'text-[#8C6B5E]'}`}>
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
                    className="px-5 py-3 border border-[#361A17]/20 bg-[#F2E5D6] text-[#361A17] text-xs font-bold uppercase tracking-wider rounded-full hover:bg-[#D7C0A9]"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => {
                      soundEffects.playDip();
                      setCurrentStep(4);
                    }}
                    className="px-6 py-3.5 bg-[#361A17] text-white text-xs font-black uppercase tracking-widest rounded-full flex items-center gap-2 hover:bg-[#281310] shadow-md hover:scale-105 active:scale-95 transition-all"
                  >
                    <span>Next: Finishing Touches</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: DRIZZLES & INSTRUCTIONS */}
            {currentStep === 4 && (
              <div className="bg-[#E7D6C5] p-6 sm:p-8 rounded-3xl border-2 border-[#BAA18D] shadow-sm animate-fade-in">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#BAA18D]/80">
                  <div>
                    <h3 className="font-brand font-black text-2xl text-[#361A17]">
                      Step 4: Finishing Drizzle & Notes
                    </h3>
                    <p className="text-xs text-[#361A17]/80 mt-0.5">Final zig-zag artisanal drizzle and special chef instructions</p>
                  </div>
                  <span className="text-xs font-bold text-[#643419] bg-[#D7C0A9] px-3.5 py-1 rounded-full border border-[#BAA18D]">
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
                            ? 'bg-[#DCBEA5] border-[#6E3C2B] shadow-xs ring-2 ring-[#6E3C2B]/30'
                            : 'bg-[#F2E5D6] border-[#CBB3A0] hover:border-[#9C7F6A] hover:bg-[#EBDBC9]'
                        }`}
                      >
                        <span className="w-4 h-4 rounded-full inline-block mb-1 border border-black/10 shadow-xs" style={{ backgroundColor: drizzle.color }} />
                        <h4 className="font-bold text-xs text-[#361A17]">{drizzle.name}</h4>
                        <p className="text-[10px] text-[#361A17]/80">₹{drizzle.price}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="mb-6">
                  <label className="block text-xs font-bold text-[#361A17] mb-2">
                    Special Preparation Instructions (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={specialNote}
                    onChange={(e) => setSpecialNote(e.target.value)}
                    placeholder="e.g. Extra hot dip, half Oreo half KitKat, separate drizzle on side..."
                    className="w-full p-3.5 bg-[#F2E5D6] border border-[#CBB3A0] rounded-2xl text-xs text-[#361A17] focus:outline-none focus:border-[#6E3C2B]"
                  />
                </div>

                <div className="flex justify-between items-center">
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="px-5 py-3 border border-[#361A17]/20 bg-[#F2E5D6] text-[#361A17] text-xs font-bold uppercase tracking-wider rounded-full hover:bg-[#D7C0A9]"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleAddToCart}
                    className="px-8 py-3.5 bg-[#361A17] text-white text-xs font-black uppercase tracking-widest rounded-full flex items-center gap-2 hover:bg-[#281310] shadow-lg hover:scale-105 active:scale-95 transition-all"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>ADD CUSTOM DRIPSTICK TO BAG</span>
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Live Dynamic DripStick Visualizer with Rich Brown Palette */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="bg-[#E7D6C5] p-6 sm:p-8 rounded-3xl border-2 border-[#BAA18D] shadow-xl relative overflow-hidden">
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#643419] bg-[#D7C0A9] px-3 py-1 rounded-full border border-[#BAA18D] flex items-center gap-1 shadow-2xs">
                  <Sparkles className="w-3 h-3 text-[#B45309]" /> Live DripStick Preview
                </span>
                <button
                  onClick={handleReset}
                  className="text-xs text-[#361A17]/85 hover:text-[#361A17] flex items-center gap-1 font-bold bg-[#F2E5D6] px-2.5 py-1 rounded-full border border-[#BAA18D]"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Dynamic Realistic DripStick Showcase */}
              <div className="relative w-full h-84 sm:h-96 rounded-2xl overflow-hidden border-2 border-[#BAA18D] shadow-inner group bg-gradient-to-b from-[#FFFDF9] to-[#E9D9C8]">
                {/* Photorealistic DripStick Master Image with key to animate smoothly on option change */}
                <img
                  key={previewImage}
                  src={previewImage}
                  alt={`Custom Artisanal DripStick - ${styleLabel}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108 animate-fade-in"
                />

                {/* Dynamic Warm Ambient Couverture Glaze Layer */}
                <div
                  className="absolute inset-0 pointer-events-none transition-all duration-700 mix-blend-color opacity-30"
                  style={{
                    background: `radial-gradient(circle at 50% 35%, ${selectedSauce.color || '#4A2C2A'} 0%, transparent 75%)`,
                  }}
                />

                {/* Subdued Glaze Highlights */}
                <div
                  className="absolute top-0 inset-x-0 h-48 pointer-events-none transition-all duration-700 mix-blend-overlay opacity-20"
                  style={{ backgroundColor: selectedSauce.color }}
                />

                {/* Subtle Base Tint for Belgian Dark Cocoa Base */}
                {selectedBase.id === 'base-dark' && (
                  <div className="absolute bottom-0 inset-x-0 h-40 pointer-events-none bg-gradient-to-t from-[#251311]/50 to-transparent mix-blend-multiply" />
                )}

                {/* Top Badge: Freshly Dipped & Temperature Tag */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <div className="flex items-center gap-1.5 bg-[#361A17]/85 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/20 shadow-md">
                    <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-ping inline-block" />
                    <span>Live Visual • {selectedSauce.name.split(' ')[0]}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsZoomed(true)}
                    className="pointer-events-auto bg-[#361A17]/80 hover:bg-[#361A17] text-white p-1.5 rounded-full border border-white/20 shadow-md transition-all hover:scale-110 active:scale-95 flex items-center justify-center"
                    title="Zoom in on realistic macro details"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Active Style Ribbon */}
                <div className="absolute top-11 left-3 pointer-events-none">
                  <span className="bg-[#FAF5EE]/95 backdrop-blur-md text-[#361A17] text-[10px] font-black px-2.5 py-0.5 rounded-full border border-[#BAA18D] shadow-xs">
                    {styleLabel}
                  </span>
                </div>

                {/* Live Floating Ingredient Tags */}
                <div className="absolute bottom-3 inset-x-3 flex flex-wrap items-center justify-between gap-1.5 pointer-events-none">
                  <div className="bg-[#361A17]/90 backdrop-blur-md text-white px-3 py-1 rounded-xl text-[11px] font-extrabold border border-white/15 shadow-lg flex items-center gap-1.5">
                    <span className="text-sm">{selectedBase.icon || '🧇'}</span>
                    <span>{selectedBase.name}</span>
                  </div>

                  <div className="bg-[#FAF5EE]/95 backdrop-blur-md text-[#361A17] px-3 py-1 rounded-xl text-[11px] font-black border border-[#BAA18D] shadow-lg flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-black/20"
                      style={{ backgroundColor: selectedSauce.color }}
                    />
                    <span className="truncate max-w-[130px]">{selectedSauce.name}</span>
                  </div>
                </div>

                {/* Selected Toppings Ribbon on Top Right */}
                {selectedToppings.length > 0 && (
                  <div className="absolute top-11 right-3 pointer-events-none flex flex-col items-end gap-1">
                    <div className="bg-[#FAF5EE]/90 backdrop-blur-md text-[#361A17] text-[9px] font-black px-2.5 py-0.5 rounded-full border border-[#BAA18D] shadow-xs flex items-center gap-1">
                      <span>{selectedToppings.map((t) => t.icon).join(' ')}</span>
                      <span>{selectedToppings.length} {selectedToppings.length === 1 ? 'Topping' : 'Toppings'}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Flavor Style Switcher to preview different images instantly */}
              <div className="mt-3 pt-3 border-t border-[#BAA18D]/70">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#643419]">
                    Live Couverture Style Switcher
                  </span>
                  <span className="text-[9px] text-[#361A17]/70 font-semibold">
                    6 Options
                  </span>
                </div>
                <div className="grid grid-cols-6 gap-1.5">
                  {SAUCE_DIPS.map((sauce) => {
                    const isSauceActive = selectedSauce.id === sauce.id;
                    return (
                      <button
                        key={sauce.id}
                        type="button"
                        onClick={() => {
                          soundEffects.playDip();
                          setSelectedSauce(sauce);
                        }}
                        className={`flex flex-col items-center p-1 rounded-xl border transition-all text-center ${
                          isSauceActive
                            ? 'bg-[#DCBEA5] border-[#6E3C2B] ring-2 ring-[#6E3C2B]/40 scale-105 shadow-xs'
                            : 'bg-[#F2E5D6] border-[#BAA18D] hover:bg-[#EBDBC9]'
                        }`}
                        title={sauce.name}
                      >
                        {sauce.image ? (
                          <img
                            src={sauce.image}
                            alt={sauce.name}
                            referrerPolicy="no-referrer"
                            className="w-8 h-8 rounded-lg object-cover mb-0.5 border border-black/15 shadow-2xs"
                          />
                        ) : (
                          <span
                            className="w-8 h-8 rounded-lg mb-0.5 border border-black/15"
                            style={{ backgroundColor: sauce.color }}
                          />
                        )}
                        <span className="text-[8px] font-black text-[#361A17] truncate w-full leading-tight">
                          {sauce.name.split(' ')[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Composition Summary Checklist */}
              <div className="space-y-2 mt-4 text-xs">
                <div className="flex justify-between py-1 border-b border-[#BAA18D]/70">
                  <span className="text-[#361A17]/80">Waffle Cone:</span>
                  <span className="font-bold text-[#361A17]">{selectedBase.name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#BAA18D]/70">
                  <span className="text-[#361A17]/80">Molten Dip:</span>
                  <span className="font-bold text-[#361A17]">{selectedSauce.name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#BAA18D]/70">
                  <span className="text-[#361A17]/80">Toppings ({selectedToppings.length}):</span>
                  <span className="font-bold text-[#361A17] text-right truncate max-w-[180px]">
                    {selectedToppings.map((t) => t.name).join(', ') || 'None'}
                  </span>
                </div>
                {selectedDrizzle && (
                  <div className="flex justify-between py-1 border-b border-[#BAA18D]/70">
                    <span className="text-[#361A17]/80">Drizzle:</span>
                    <span className="font-bold text-[#361A17]">{selectedDrizzle.name}</span>
                  </div>
                )}
                <div className="flex justify-between py-1 text-[11px] text-[#361A17]/80">
                  <span>Nutritional Estimate:</span>
                  <span>~{totalCalories} kcal</span>
                </div>
              </div>

              {/* Price & Add to Bag CTA */}
              <div className="mt-6 pt-4 border-t-2 border-[#BAA18D]/80 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#361A17]/80 block">
                    Calculated Total
                  </span>
                  <span className="font-display font-black text-3xl text-[#361A17]">
                    ₹{totalPrice}
                  </span>
                </div>

                <button
                  id="btn-builder-add-to-cart"
                  onClick={handleAddToCart}
                  className="flex-1 py-4 bg-[#361A17] text-[#FAF5EE] rounded-full font-black text-xs uppercase tracking-widest shadow-lg hover:bg-[#281310] transition-all flex items-center justify-center gap-2 active:scale-98 hover:scale-102"
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

      {/* Realistic Macro Detail Inspection Modal */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
        >
          <div
            className="relative max-w-xl w-full bg-[#FAF5EE] rounded-3xl overflow-hidden border-2 border-[#BAA18D] shadow-2xl animate-fade-in p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#BAA18D]">
              <div>
                <h4 className="font-brand font-black text-xl text-[#361A17]">
                  Artisanal Macro Food Details
                </h4>
                <p className="text-xs text-[#361A17]/80 mt-0.5">
                  {selectedBase.name} • {selectedSauce.name} • {selectedToppings.map((t) => t.name).join(', ') || 'Pure Couverture'}
                </p>
              </div>
              <button
                onClick={() => setIsZoomed(false)}
                className="w-8 h-8 rounded-full bg-[#E5D3C0] hover:bg-[#D5BFA9] text-[#361A17] flex items-center justify-center font-bold text-sm transition-colors"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 relative rounded-2xl overflow-hidden border border-[#BAA18D] shadow-inner aspect-square max-h-[440px] mx-auto bg-[#E9D9C8]">
              <img
                key={previewImage}
                src={previewImage}
                alt="Realistic Artisanal DripStick Macro"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center animate-fade-in"
              />
              <div
                className="absolute inset-0 pointer-events-none mix-blend-color opacity-30"
                style={{
                  background: `radial-gradient(circle at 50% 35%, ${selectedSauce.color || '#4A2C2A'} 0%, transparent 75%)`,
                }}
              />
              <div className="absolute bottom-3 inset-x-3 flex items-center justify-between pointer-events-none">
                <div className="bg-[#361A17]/90 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-[11px] font-bold border border-white/20 shadow-md">
                  {styleLabel} • 100% Belgian Couverture
                </div>
                <div className="bg-[#FAF5EE]/95 text-[#361A17] px-2.5 py-1 rounded-full text-[10px] font-black border border-[#BAA18D]">
                  45°C Warm
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-between items-center text-xs text-[#361A17]/80">
              <span className="font-medium">Handcrafted on stick with authentic Belgian pearl batter</span>
              <button
                onClick={() => setIsZoomed(false)}
                className="px-5 py-2.5 bg-[#361A17] text-white rounded-full font-bold uppercase text-[10px] tracking-wider hover:bg-[#281310] transition-all"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
