import React, { useState } from 'react';
import { Sparkles, Star, Plus, Check, Eye, ArrowRight, Flame } from 'lucide-react';
import { SHOW_STOPPERS } from '../data/mockData';
import { ShowStopperProduct } from '../types';
import { soundEffects } from '../utils/soundEffects';
import { TiltedCard } from './TiltedCard';

interface ShowStoppersSectionProps {
  onAddShowStopperToCart: (product: ShowStopperProduct) => void;
  onCustomizeShowStopper: (product: ShowStopperProduct) => void;
}

export const ShowStoppersSection: React.FC<ShowStoppersSectionProps> = ({
  onAddShowStopperToCart,
  onCustomizeShowStopper,
}) => {
  const [addedId, setAddedId] = useState<string | null>(null);
  const [selectedProductDetail, setSelectedProductDetail] = useState<ShowStopperProduct | null>(null);
  const [viewStyle, setViewStyle] = useState<'cards' | 'banner'>('cards');

  const handleQuickAdd = (product: ShowStopperProduct) => {
    soundEffects.playChime();
    onAddShowStopperToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  const getInitialBadge = (name: string, index: number) => {
    const letters = ['O.', 'B.', 'C.', 'N.'];
    const bgColors = ['bg-[#4A2C2A]', 'bg-[#D2916C]', 'bg-[#C4A484]', 'bg-[#361E1C]'];
    return {
      letter: letters[index] || name.charAt(0) + '.',
      bg: bgColors[index % bgColors.length],
    };
  };

  return (
    <section id="showstoppers" className="py-20 bg-white border-t border-b border-[#4A2C2A]/10 relative overflow-hidden">
      
      {/* Ambient background glow */}
      <div className="absolute top-10 left-1/3 w-[500px] h-[300px] bg-[#D2916C]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header with Bold Typography Spec */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pb-6 border-b border-[#4A2C2A]/10">
          <div>
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#4A2C2A]/50 mb-1">
              THIS MONTH’S
            </h3>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black italic tracking-tight leading-none text-[#4A2C2A]">
              SHOW STOPPERS
            </h2>
            <p className="text-sm font-medium text-[#4A2C2A]/70 mt-2 max-w-lg">
              Curated chef specials dipped in molten Belgian chocolate and layered with artisanal crunches.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] font-bold tracking-widest uppercase text-[#D2916C] bg-[#FDF8F2] px-4 py-2 rounded-full border border-[#4A2C2A]/10">
              Live Spotlight
            </span>
          </div>
        </div>

        {/* 4 Cards Grid - Bold Typography Archetype */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SHOW_STOPPERS.map((product, idx) => {
            const isJustAdded = addedId === product.id;
            const badge = getInitialBadge(product.name, idx);

            return (
              <div
                key={product.id}
                id={`card-showstopper-${product.id}`}
                className="group rounded-3xl bg-[#FDF8F2] border border-[#4A2C2A]/10 hover:border-[#4A2C2A]/30 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden relative hover:-translate-y-1 p-5"
              >
                {/* Top Row with Letter Avatar + Name from Design Spec */}
                <div className="flex items-center gap-3.5 mb-4">
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 ${badge.bg} rounded-2xl flex items-center justify-center text-white text-xl sm:text-2xl font-black shrink-0 shadow-sm`}>
                    {badge.letter}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#D2916C]">
                      {product.badge}
                    </span>
                    <span className="font-brand font-black text-base sm:text-lg leading-tight text-[#4A2C2A]">
                      {product.name}
                    </span>
                    <span className="font-display font-black text-sm text-[#4A2C2A] mt-0.5">
                      ₹{product.price}
                    </span>
                  </div>
                </div>

                {/* Product Image Frame wrapped in ReactBits TiltedCard */}
                <div className="relative mb-4 w-full h-44 rounded-2xl overflow-hidden">
                  <TiltedCard
                    imageSrc={product.image}
                    altText={product.name}
                    captionText={`★ ${product.rating} • ${product.badge}`}
                    containerHeight="176px"
                    containerWidth="100%"
                    imageHeight="100%"
                    imageWidth="100%"
                    rotateAmplitude={12}
                    scaleOnHover={1.06}
                    showTooltip={true}
                    displayOverlayContent={true}
                    overlayContent={
                      <div className="flex justify-between items-center w-full">
                        <span className="text-[9px] font-black uppercase tracking-wider text-[#D2916C] bg-[#4A2C2A]/85 backdrop-blur-xs px-2 py-0.5 rounded-full shadow-xs">
                          {product.badge}
                        </span>
                        <div className="flex items-center gap-1 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-full text-[10px] font-bold text-[#4A2C2A] shadow-xs">
                          <Star className="w-3 h-3 fill-[#D2916C] text-[#D2916C]" />
                          <span>{product.rating}</span>
                        </div>
                      </div>
                    }
                  />
                </div>

                {/* Description & Tags */}
                <div>
                  <p className="text-xs text-[#4A2C2A]/80 leading-relaxed line-clamp-2 mb-3">
                    {product.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-white border border-[#4A2C2A]/10 text-[#4A2C2A]">
                      🧇 {product.base.name}
                    </span>
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-[#D2916C]/15 text-[#D2916C]">
                      🍫 {product.sauce.name}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-3 border-t border-[#4A2C2A]/10 flex items-center gap-2">
                  <button
                    id={`btn-quick-add-${product.id}`}
                    onClick={() => handleQuickAdd(product)}
                    className={`flex-1 py-2.5 px-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm active:scale-95 ${
                      isJustAdded
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#4A2C2A] text-[#FDF8F2] hover:bg-[#361E1C]'
                    }`}
                  >
                    {isJustAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added!</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Quick Add</span>
                      </>
                    )}
                  </button>

                  <button
                    id={`btn-detail-${product.id}`}
                    onClick={() => {
                      soundEffects.playDip();
                      setSelectedProductDetail(product);
                    }}
                    title="View Product Ingredients"
                    className="p-2.5 bg-white hover:bg-[#D2916C]/10 text-[#4A2C2A] rounded-full border border-[#4A2C2A]/10 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Product Detail Modal */}
        {selectedProductDetail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-[#FDF8F2] rounded-3xl max-w-lg w-full overflow-hidden border-2 border-[#4A2C2A]/20 shadow-2xl animate-scale-up">
              <div className="relative h-64 w-full bg-[#26140A] overflow-hidden">
                <TiltedCard
                  imageSrc={selectedProductDetail.image}
                  altText={selectedProductDetail.name}
                  captionText={`★ ${selectedProductDetail.rating} • ${selectedProductDetail.badge}`}
                  containerHeight="256px"
                  containerWidth="100%"
                  imageHeight="100%"
                  imageWidth="100%"
                  rotateAmplitude={10}
                  scaleOnHover={1.04}
                  showTooltip={false}
                  displayOverlayContent={true}
                  overlayContent={
                    <div className="absolute bottom-3 left-4 bg-[#4A2C2A] text-[#D2916C] px-3 py-1 rounded-full text-xs font-bold shadow-md">
                      {selectedProductDetail.badge}
                    </div>
                  }
                />
                <button
                  onClick={() => setSelectedProductDetail(null)}
                  className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-black/70 text-white flex items-center justify-center font-bold text-sm hover:bg-black transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="p-6">
                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="font-brand font-black text-2xl text-[#4A2C2A]">
                    {selectedProductDetail.name}
                  </h3>
                  <span className="font-display font-black text-2xl text-[#4A2C2A]">
                    ₹{selectedProductDetail.price}
                  </span>
                </div>
                <p className="text-xs italic text-[#D2916C] font-bold mb-4">
                  {selectedProductDetail.tagline}
                </p>
                <p className="text-xs text-[#4A2C2A]/80 leading-relaxed mb-6">
                  {selectedProductDetail.description}
                </p>

                <div className="space-y-2 mb-6 p-4 rounded-2xl bg-white border border-[#4A2C2A]/10 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#4A2C2A]/60">Waffle Cone:</span>
                    <span className="font-bold text-[#4A2C2A]">{selectedProductDetail.base.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#4A2C2A]/60">Molten Dip:</span>
                    <span className="font-bold text-[#4A2C2A]">{selectedProductDetail.sauce.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#4A2C2A]/60">Topping:</span>
                    <span className="font-bold text-[#4A2C2A]">{selectedProductDetail.toppings[0]?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#4A2C2A]/60">Calorie Estimate:</span>
                    <span className="font-bold text-[#4A2C2A]">~{selectedProductDetail.calories} kcal</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      handleQuickAdd(selectedProductDetail);
                      setSelectedProductDetail(null);
                    }}
                    className="flex-1 py-4 bg-[#4A2C2A] text-[#FDF8F2] rounded-full font-bold text-xs uppercase tracking-widest shadow-lg hover:bg-[#361E1C]"
                  >
                    Add to Bag (₹{selectedProductDetail.price})
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
