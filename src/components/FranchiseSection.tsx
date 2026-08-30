import React, { useState } from 'react';
import { TrendingUp, Award, Building2, Store, Users, FileText, CheckCircle2, ChevronRight, Send } from 'lucide-react';
import { FRANCHISE_TIERS, FRANCHISE_BENEFITS } from '../data/mockData';
import { FranchiseInquiry } from '../types';
import { soundEffects } from '../utils/soundEffects';

export const FranchiseSection: React.FC = () => {
  const [selectedTierId, setSelectedTierId] = useState<string>(FRANCHISE_TIERS[0].id);
  const [applicantName, setApplicantName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [capital, setCapital] = useState<string>('₹15L - ₹25L');
  const [businessExperience, setBusinessExperience] = useState<string>('1-3 years');
  const [hasRetailSpace, setHasRetailSpace] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const selectedTier = FRANCHISE_TIERS.find((t) => t.id === selectedTierId) || FRANCHISE_TIERS[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundEffects.playChime();
    const inquiry: FranchiseInquiry = {
      fullName: applicantName,
      email,
      phone,
      targetCity: city,
      investmentBudget: capital,
      foodServiceExperience: businessExperience,
      hasCommercialSpace: hasRetailSpace,
      tierId: selectedTierId,
    };
    console.log('Franchise Inquiry submitted:', inquiry);
    setIsSubmitted(true);
  };

  const tierColors: Record<string, { bg: string; badge: string; border: string }> = {
    'tier-kiosk': { bg: 'bg-[#FEF3C7]/40', badge: 'bg-[#FEF3C7] text-[#92400E]', border: 'border-[#FDE68A]' },
    'tier-inline': { bg: 'bg-[#FCE7F3]/40', badge: 'bg-[#FCE7F3] text-[#9D174D]', border: 'border-[#FBCFE8]' },
    'tier-flagship': { bg: 'bg-[#EDE9FE]/40', badge: 'bg-[#EDE9FE] text-[#6B21A8]', border: 'border-[#DDD6FE]' },
  };

  return (
    <section id="opportunity" className="py-24 bg-[#FAF5EE] relative overflow-hidden border-t border-[#4A2C2A]/10">
      {/* Decorative Pastel Ambient Glows */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-br from-[#FED7AA]/30 to-[#FCE7F3]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-tl from-[#EDE9FE]/30 to-[#DCFCE7]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header with Bold Typography */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FEF3C7] border border-[#FDE68A] mb-4 shadow-2xs">
            <TrendingUp className="w-3.5 h-3.5 text-[#D97706]" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#92400E]">
              Partner & Grow With DripStick
            </span>
          </div>
          <h2 className="font-brand font-black text-4xl sm:text-5xl lg:text-6xl text-[#4A2C2A] tracking-tight mb-4">
            FRANCHISE OPPORTUNITY
          </h2>
          <p className="text-base sm:text-lg text-[#4A2C2A]/80 leading-relaxed font-medium">
            Join India’s fastest-growing dessert sensation. High gross margins (68%+), low operational footprint (80-350 sq.ft), and full turnkey brand support. 🚀
          </p>
        </div>

        {/* 3 Franchise Formats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {FRANCHISE_TIERS.map((tier) => {
            const isSelected = selectedTierId === tier.id;
            const theme = tierColors[tier.id] || tierColors['tier-kiosk'];
            return (
              <div
                key={tier.id}
                id={`card-tier-${tier.id}`}
                onClick={() => {
                  soundEffects.playDip();
                  setSelectedTierId(tier.id);
                }}
                className={`p-6 sm:p-8 rounded-3xl cursor-pointer transition-all duration-300 border-2 flex flex-col justify-between ${
                  isSelected
                    ? `${theme.bg} border-[#4A2C2A] shadow-2xl scale-[1.03] ring-4 ring-[#4A2C2A]/10`
                    : 'bg-white/80 border-[#4A2C2A]/10 hover:border-[#4A2C2A]/30 hover:scale-[1.01]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${theme.badge} ${theme.border}`}>
                      {tier.spaceRequired}
                    </span>
                    {tier.id === 'tier-kiosk' && (
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#92400E] bg-[#FEF3C7] border border-[#FDE68A] px-2.5 py-0.5 rounded-full shadow-xs">
                        ⚡ Fastest Payback
                      </span>
                    )}
                  </div>

                  <h3 className="font-brand font-black text-2xl text-[#4A2C2A] mb-1">
                    {tier.name}
                  </h3>
                  <p className="text-xs text-[#4A2C2A]/70 mb-4">{tier.description}</p>

                  <div className="space-y-2 py-4 border-t border-b border-[#4A2C2A]/10 text-xs mb-6">
                    <div className="flex justify-between">
                      <span className="text-[#4A2C2A]/60 font-medium">Investment Range:</span>
                      <span className="font-black text-[#4A2C2A]">{tier.investment}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#4A2C2A]/60 font-medium">Estimated Payback:</span>
                      <span className="font-black text-[#16A34A]">{tier.roiPeriod}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#4A2C2A]/60 font-medium">Gross Margin:</span>
                      <span className="font-black text-[#D97706]">{tier.profitMargin}</span>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-6 text-xs text-[#4A2C2A]/85 font-medium">
                    {tier.features.map((f, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    soundEffects.playDip();
                    setSelectedTierId(tier.id);
                  }}
                  className={`w-full py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                    isSelected
                      ? 'bg-[#4A2C2A] text-white shadow-md'
                      : 'bg-white text-[#4A2C2A] border border-[#4A2C2A]/20 hover:bg-[#4A2C2A] hover:text-white'
                  }`}
                >
                  {isSelected ? '✓ Selected Format' : 'Select Format'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Benefits Grid */}
        <div className="mb-16">
          <h3 className="text-center font-brand font-black text-2xl sm:text-3xl text-[#4A2C2A] mb-8">
            Why Franchise Partners Choose DripStick
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FRANCHISE_BENEFITS.map((benefit, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white border border-[#4A2C2A]/10 shadow-xs"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FDF8F2] border border-[#4A2C2A]/10 flex items-center justify-center text-xl mb-4">
                  {benefit.icon}
                </div>
                <h4 className="font-bold text-sm text-[#4A2C2A] mb-1">{benefit.title}</h4>
                <p className="text-xs text-[#4A2C2A]/70 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Application Form */}
        <div className="rounded-3xl bg-white border-2 border-[#4A2C2A]/15 p-6 sm:p-10 shadow-xl max-w-4xl mx-auto">
          {isSubmitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto text-2xl font-black">
                ✓
              </div>
              <h3 className="font-brand font-black text-2xl text-[#4A2C2A]">
                Franchise Application Received!
              </h3>
              <p className="text-xs text-[#4A2C2A]/80 max-w-md mx-auto leading-relaxed">
                Thank you <strong>{applicantName}</strong>. Our franchise expansion director will review your interest in <strong>{city || 'your city'}</strong> ({selectedTier.name}) and send the Confidential Information Memorandum within 24 hours.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="px-6 py-2.5 bg-[#4A2C2A] text-white text-xs font-bold uppercase tracking-widest rounded-full"
              >
                Submit Another Application
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="text-center mb-6">
                <h4 className="font-brand font-black text-2xl text-[#4A2C2A]">
                  Apply for a DripStick Franchise
                </h4>
                <p className="text-xs text-[#4A2C2A]/70 mt-1">
                  Selected Format: <strong className="text-[#D2916C]">{selectedTier.name} ({selectedTier.spaceRequired})</strong>
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-[#4A2C2A] mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder="e.g. Vikram Malhotra"
                    className="w-full p-3 bg-[#FDF8F2] border border-[#4A2C2A]/15 rounded-xl text-xs text-[#4A2C2A] focus:outline-none focus:border-[#4A2C2A]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#4A2C2A] mb-1">Phone Number (WhatsApp) *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +91 98200 12345"
                    className="w-full p-3 bg-[#FDF8F2] border border-[#4A2C2A]/15 rounded-xl text-xs text-[#4A2C2A] focus:outline-none focus:border-[#4A2C2A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-[#4A2C2A] mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="vikram@outlook.com"
                    className="w-full p-3 bg-[#FDF8F2] border border-[#4A2C2A]/15 rounded-xl text-xs text-[#4A2C2A] focus:outline-none focus:border-[#4A2C2A]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#4A2C2A] mb-1">Proposed City / Market *</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Hyderabad / Pune / Ahmedabad"
                    className="w-full p-3 bg-[#FDF8F2] border border-[#4A2C2A]/15 rounded-xl text-xs text-[#4A2C2A] focus:outline-none focus:border-[#4A2C2A]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#4A2C2A] mb-1">Liquid Investment Budget *</label>
                  <select
                    value={capital}
                    onChange={(e) => setCapital(e.target.value)}
                    className="w-full p-3 bg-[#FDF8F2] border border-[#4A2C2A]/15 rounded-xl text-xs text-[#4A2C2A] focus:outline-none focus:border-[#4A2C2A]"
                  >
                    <option value="₹12L - ₹18L">₹12L - ₹18L (Express Kiosk)</option>
                    <option value="₹18L - ₹28L">₹18L - ₹28L (Inline Store)</option>
                    <option value="₹30L+">₹30L+ (Flagship Lounge / Multi-Unit)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#FDF8F2] border border-[#4A2C2A]/10">
                <input
                  type="checkbox"
                  id="hasRetailSpace"
                  checked={hasRetailSpace}
                  onChange={(e) => setHasRetailSpace(e.target.checked)}
                  className="w-4 h-4 accent-[#4A2C2A] cursor-pointer"
                />
                <label htmlFor="hasRetailSpace" className="text-xs text-[#4A2C2A] cursor-pointer">
                  I already have a commercial property / prime high-street / mall location available
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#4A2C2A] text-white rounded-full font-bold text-xs uppercase tracking-widest shadow-lg hover:bg-[#361E1C] flex items-center justify-center gap-2 transition-all active:scale-98"
              >
                <Send className="w-4 h-4" />
                <span>SUBMIT FRANCHISE APPLICATION & GET P&L DECK</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};
