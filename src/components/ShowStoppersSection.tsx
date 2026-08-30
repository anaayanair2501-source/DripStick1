import React, { useState } from 'react';
import { Sparkles, Star, Plus, Check, Eye, ArrowRight, Flame, Heart, Layers } from 'lucide-react';
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
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Favorites (6)', emoji: '🧇' },
    { id: 'chocolate', label: 'Rich Chocolates', emoji: '🍫' },
    { id: 'fruity', label: 'Berry & Fruity', emoji: '🍓' },
    { id: 'nutty', label: 'Nutty & Pistachio', emoji: '🥜' },
    { id: 'caramel', label: 'Lotus & Caramel', emoji: '🍯' },
  ];

  const filteredProducts = activeCategory === 'all'
    ? SHOW_STOPPERS
    : SHOW_STOPPERS.filter((p) => p.category === activeCategory);

  const handleQuickAdd = (product: ShowStopperProduct) => {
    soundEffects.playChime();
    onAddShowStopperToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  const getInitialBadge = (name: string, index: number) => {
    const letters = ['O.', 'B.', 'C.', 'S.', 'P.', 'N.'];
    const bgColors = [
      'bg-gradient-to-tr from-[#F59E0B] to-[#FCD34D]',
      'bg-gradient-to-tr from-[#EA580C] to-[#FDBA74]',
      'bg-gradient-to-tr from-[#9333EA] to-[#D8B4FE]',
      'bg-gradient-to-tr from-[#E11D48] to-[#FDA4AF]',
      'bg-gradient-to-tr from-[#16A34A] to-[#86EFAC]',
      'bg-gradient-to-tr from-[#0284C7] to-[#7DD3FC]',
    ];
    return {
      letter: letters[index] || name.charAt(0) + '.',
      bg: bgColors[index % bgColors.length],
    };
  };

  return (
    <section id="showstoppers" className="py-20 bg-[#FAF5EE] border-t border-b border-[#4A2C2A]/10 relative overflow-hidden">
      
      {/* Ambient background pastel glow */}
      <div className="absolute top-10 left-1/4 w-[600px] h-[350px] bg-gradient-to-r from-[#FCE7F3]/40 via-[#FEF3C7]/40 to-[#DCFCE7]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[300px] bg-gradient-to-l from-[#E0F2FE]/40 via-[#F3E8FF]/40 to-[#FFE4E6]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header with Pastel Flair */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6 pb-6 border-b border-[#4A2C2A]/10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE4E6] border border-[#FECDD3] text-[10px] font-black uppercase tracking-widest text-[#9F1239] mb-2 shadow-2xs">
              <Sparkles className="w-3 h-3 text-[#E11D48]" /> Chef Curation
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black italic tracking-tight leading-none text-[#4A2C2A]">
              SHOW STOPPERS
            </h2>
            <p className="text-sm font-medium text-[#4A2C2A]/70 mt-2 max-w-lg">
              Curated artisanal Belgian cone waffles dipped in molten couverture and encrusted with delicious toppings.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] font-bold tracking-widest uppercase text-[#92400E] bg-[#FEF3C7] px-4 py-2 rounded-full border border-[#FDE68A] shadow-2xs flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-ping" />
              6 Fresh Editions
            </span>
          </div>
        </div>

        {/* Category Filters in Cute Pastel Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                soundEffects.playDip();
                setActiveCategory(cat.id);
              }}
              className={`px-4 py-2 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-200 flex items-center gap-2 shadow-2xs hover:scale-105 active:scale-95 whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-[#4A2C2A] text-white shadow-md'
                  : 'bg-white text-[#4A2C2A]/80 border border-[#4A2C2A]/10 hover:bg-[#FEF3C7]'
              }`}
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* 6 Cards Grid with Individual Pastel Palettes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, idx) => {
            const isJustAdded = addedId === product.id;
            const badge = getInitialBadge(product.name, idx);
            const cardBg = product.pastelTheme?.cardBg || 'bg-white';
            const borderTheme = product.pastelTheme?.border || 'border-[#4A2C2A]/10';
            const badgeBg = product.pastelTheme?.badgeBg || 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]';

            return (
              <div
                key={product.id}
                id={`card-showstopper-${product.id}`}
                className={`group rounded-3xl ${cardBg} border ${borderTheme} shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden relative hover:-translate-y-1.5 p-5`}
              >
                {/* Top Row with Letter Avatar + Name from Design Spec */}
                <div className="flex items-center gap-3.5 mb-4">
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 ${badge.bg} rounded-2xl flex items-center justify-center text-white text-xl sm:text-2xl font-black shrink-0 shadow-md group-hover:rotate-6 transition-transform`}>
                    {badge.letter}
                  </div>
                  <div className="flex flex-col">
                    <span className={`text-[10px] uppercase font-black tracking-wider px-2 py-0.5 rounded-full inline-block w-fit mb-0.5 ${badgeBg}`}>
                      {product.badge}
                    </span>
                    <span className="font-brand font-black text-lg leading-tight text-[#4A2C2A]">
                      {product.name}
                    </span>
                    <span className="font-display font-black text-sm text-[#4A2C2A] mt-0.5">
                      ₹{product.price}
                    </span>
                  </div>
                </div>

                {/* Product Image Frame wrapped in ReactBits TiltedCard */}
                <div className="relative mb-4 w-full h-48 rounded-2xl overflow-hidden shadow-inner bg-black/10">
                  <TiltedCard
                    imageSrc={product.image}
                    altText={product.name}
                    captionText={`★ ${product.rating} • ${product.badge}`}
                    containerHeight="192px"
                    containerWidth="100%"
                    imageHeight="100%"
                    imageWidth="100%"
                    rotateAmplitude={12}
                    scaleOnHover={1.06}
                    showTooltip={true}
                    displayOverlayContent={true}
                    overlayContent={
                      <div className="flex justify-between items-center w-full">
                        <span className="text-[9px] font-black uppercase tracking-wider text-white bg-[#4A2C2A]/85 backdrop-blur-xs px-2.5 py-0.5 rounded-full shadow-xs">
                          {product.badge}
                        </span>
                        <div className="flex items-center gap-1 bg-white/95 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-[10px] font-black text-[#4A2C2A] shadow-xs">
                          <Star className="w-3 h-3 fill-[#F59E0B] text-[#F59E0B]" />
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

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    <span className="text-[9px] font-extrabold px-2.5 py-1 rounded-lg bg-white/90 border border-[#4A2C2A]/10 text-[#4A2C2A] shadow-2xs">
                      🧇 {product.base.name}
                    </span>
                    <span className="text-[9px] font-extrabold px-2.5 py-1 rounded-lg bg-white/90 border border-[#4A2C2A]/10 text-[#D2916C] shadow-2xs">
                      🍫 {product.sauce.name}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-3 border-t border-[#4A2C2A]/10 flex items-center gap-2">
                  <button
                    id={`btn-quick-add-${product.id}`}
                    onClick={() => handleQuickAdd(product)}
                    className={`flex-1 py-3 px-4 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-1.5 shadow-md active:scale-95 ${
                      isJustAdded
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#4A2C2A] text-[#FAF5EE] hover:bg-[#361E1C] hover:scale-102'
                    }`}
                  >
                    {isJustAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5 animate-bounce-cute" />
                        <span>Added to Bag!</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Quick Add • ₹{product.price}</span>
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
                    className="p-3 bg-white hover:bg-[#FEF3C7] text-[#4A2C2A] rounded-full border border-[#4A2C2A]/15 transition-all hover:scale-105 shadow-xs"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Product Detail Modal */}
        {selectedProductDetail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-[#FAF5EE] rounded-3xl max-w-lg w-full overflow-hidden border-2 border-[#4A2C2A]/20 shadow-2xl animate-scale-up">
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
                    <div className="absolute bottom-3 left-4 bg-[#4A2C2A] text-[#FAF5EE] px-3 py-1 rounded-full text-xs font-black shadow-md">
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
                    className="flex-1 py-4 bg-[#4A2C2A] text-[#FAF5EE] rounded-full font-black text-xs uppercase tracking-widest shadow-lg hover:bg-[#361E1C] active:scale-98"
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
