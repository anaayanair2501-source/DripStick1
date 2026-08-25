import React, { useState } from 'react';
import { X, Sparkles, ArrowRight, RotateCcw, Heart, Flame } from 'lucide-react';
import { MATCHMAKER_QUESTIONS, SHOW_STOPPERS } from '../data/mockData';
import { ShowStopperProduct } from '../types';
import { soundEffects } from '../utils/soundEffects';

interface FlavorMatchmakerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: ShowStopperProduct) => void;
}

export const FlavorMatchmakerModal: React.FC<FlavorMatchmakerModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [resultProduct, setResultProduct] = useState<ShowStopperProduct | null>(null);

  if (!isOpen) return null;

  const currentQuestion = MATCHMAKER_QUESTIONS[currentQIndex];

  const handleAnswer = (tag: string) => {
    soundEffects.playDip();
    const updated = [...selectedAnswers, tag];
    setSelectedAnswers(updated);

    if (currentQIndex < MATCHMAKER_QUESTIONS.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
    } else {
      // Calculate Match Result
      soundEffects.playChime();
      const matched = calculateMatch(updated);
      setResultProduct(matched);
    }
  };

  const calculateMatch = (tags: string[]): ShowStopperProduct => {
    if (tags.includes('biscoff') || tags.includes('crunchy')) {
      return SHOW_STOPPERS.find((p) => p.id === 'prod-biscoff') || SHOW_STOPPERS[0];
    }
    if (tags.includes('hazelnut') || tags.includes('nutty')) {
      return SHOW_STOPPERS.find((p) => p.id === 'prod-bueno') || SHOW_STOPPERS[1];
    }
    if (tags.includes('dark') || tags.includes('rich')) {
      return SHOW_STOPPERS.find((p) => p.id === 'prod-dark-velvet') || SHOW_STOPPERS[3];
    }
    return SHOW_STOPPERS[0]; // The Oreo Drip default
  };

  const handleReset = () => {
    soundEffects.playDip();
    setCurrentQIndex(0);
    setSelectedAnswers([]);
    setResultProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-[#FDF8F2] rounded-3xl max-w-lg w-full overflow-hidden border-2 border-[#4A2C2A]/20 shadow-2xl animate-scale-up">
        
        {/* Top Header */}
        <div className="p-6 border-b border-[#4A2C2A]/10 bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#D2916C]" />
            <h3 className="font-brand font-black text-lg text-[#4A2C2A]">
              FLAVOR MATCHMAKER
            </h3>
          </div>
          <button
            onClick={() => {
              soundEffects.playDip();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-[#FDF8F2] hover:bg-[#4A2C2A]/10 text-[#4A2C2A] flex items-center justify-center font-bold"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {resultProduct ? (
            <div className="text-center space-y-5 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D2916C]/15 text-[#D2916C] text-xs font-bold uppercase tracking-wider">
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span>Your Ideal Soul-Stick Match</span>
              </div>

              <div className="relative h-48 rounded-2xl overflow-hidden shadow-lg border border-[#4A2C2A]/10 bg-[#4A2C2A]">
                <img
                  src={resultProduct.image}
                  alt={resultProduct.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-3 left-4 right-4 text-white text-left">
                  <span className="text-[10px] font-bold uppercase text-[#D2916C]">
                    {resultProduct.badge}
                  </span>
                  <h4 className="font-brand font-black text-xl leading-tight">
                    {resultProduct.name}
                  </h4>
                </div>
              </div>

              <div>
                <p className="font-display font-black text-2xl text-[#4A2C2A]">
                  ₹{resultProduct.price}
                </p>
                <p className="text-xs text-[#4A2C2A]/80 mt-1 max-w-sm mx-auto leading-relaxed">
                  {resultProduct.description}
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleReset}
                  className="px-4 py-3.5 border border-[#4A2C2A]/20 text-[#4A2C2A] text-xs font-bold uppercase rounded-full hover:bg-[#4A2C2A]/5 flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake</span>
                </button>
                <button
                  onClick={() => {
                    soundEffects.playChime();
                    onSelectProduct(resultProduct);
                    onClose();
                  }}
                  className="flex-1 py-3.5 bg-[#4A2C2A] text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-[#361E1C] shadow-lg flex items-center justify-center gap-2"
                >
                  <span>Add To Bag (₹{resultProduct.price})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Progress bar */}
              <div className="flex items-center justify-between text-[11px] font-bold uppercase text-[#4A2C2A]/60 mb-2">
                <span>Question {currentQIndex + 1} of {MATCHMAKER_QUESTIONS.length}</span>
                <span className="text-[#D2916C]">
                  {Math.round(((currentQIndex + 1) / MATCHMAKER_QUESTIONS.length) * 100)}%
                </span>
              </div>
              <div className="h-1.5 w-full bg-[#4A2C2A]/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#D2916C] transition-all duration-300 rounded-full"
                  style={{
                    width: `${((currentQIndex + 1) / MATCHMAKER_QUESTIONS.length) * 100}%`,
                  }}
                />
              </div>

              {/* Question title */}
              <h4 className="font-brand font-black text-xl text-[#4A2C2A] leading-tight">
                {currentQuestion.question}
              </h4>

              {/* Options */}
              <div className="space-y-3">
                {currentQuestion.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(opt.tag)}
                    className="w-full p-4 rounded-2xl bg-white border border-[#4A2C2A]/15 hover:border-[#4A2C2A] text-left transition-all duration-200 hover:scale-[1.01] flex items-center justify-between group shadow-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{opt.icon}</span>
                      <span className="text-xs font-bold text-[#4A2C2A]">
                        {opt.label}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#4A2C2A]/40 group-hover:text-[#4A2C2A] group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
