import React, { useState } from 'react';
import { Calendar, Users, Sparkles, CheckCircle2, Send, PhoneCall, Gift, Music } from 'lucide-react';
import { CATERING_PACKAGES } from '../data/mockData';
import { CateringInquiry } from '../types';
import { soundEffects } from '../utils/soundEffects';

export const CateringSection: React.FC = () => {
  const [selectedPkgId, setSelectedPkgId] = useState<string>(CATERING_PACKAGES[1].id);
  const [guestCount, setGuestCount] = useState<number>(75);
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [eventDate, setEventDate] = useState<string>('');
  const [eventType, setEventType] = useState<string>('Birthday Party');
  const [city, setCity] = useState<string>('Mumbai');
  const [specialNotes, setSpecialNotes] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const selectedPackage = CATERING_PACKAGES.find((p) => p.id === selectedPkgId) || CATERING_PACKAGES[0];

  // Dynamic estimated catering budget
  const estimatedTotal = guestCount * selectedPackage.pricePerPerson;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundEffects.playChime();
    const inquiry: CateringInquiry = {
      fullName,
      email,
      phone,
      eventDate,
      guestCount,
      eventType: eventType as any,
      city,
      packageId: selectedPkgId,
      specialRequests: specialNotes,
    };
    console.log('Catering Inquiry submitted:', inquiry);
    setIsSubmitted(true);
  };

  const packageColors: Record<string, { bg: string; badge: string; text: string; border: string }> = {
    'pkg-starter': { bg: 'bg-[#FFFBEB]', badge: 'bg-[#FEF3C7] text-[#92400E]', text: 'text-[#92400E]', border: 'border-[#FDE68A]' },
    'pkg-grand': { bg: 'bg-[#FFF1F2]', badge: 'bg-[#FFE4E6] text-[#9F1239]', text: 'text-[#9F1239]', border: 'border-[#FECDD3]' },
    'pkg-royal': { bg: 'bg-[#F0FDF4]', badge: 'bg-[#DCFCE7] text-[#166534]', text: 'text-[#166534]', border: 'border-[#BBF7D0]' },
  };

  return (
    <section id="catering" className="py-24 bg-[#FAF5EE] relative overflow-hidden border-t border-[#4A2C2A]/10">
      
      {/* Decorative Pastel Glows */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-bl from-[#FFE4E6]/30 to-[#FEF3C7]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-gradient-to-tr from-[#DCFCE7]/30 to-[#E0F2FE]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header with Bold Typography */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFE4E6] border border-[#FECDD3] mb-4 shadow-2xs">
            <Gift className="w-3.5 h-3.5 text-[#E11D48]" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#9F1239]">
              Live Dessert Bars & Events
            </span>
          </div>
          <h2 className="font-brand font-black text-4xl sm:text-5xl lg:text-6xl text-[#4A2C2A] tracking-tight mb-4">
            BRING DRIPSTICK TO YOUR EVENT
          </h2>
          <p className="text-base sm:text-lg text-[#4A2C2A]/80 leading-relaxed font-medium">
            Turn your wedding, birthday, campus fest, or corporate party into an interactive dessert spectacle with our pop-up Live Dip Stations. 🎉
          </p>
        </div>

        {/* 3 Catering Package Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {CATERING_PACKAGES.map((pkg) => {
            const isSelected = selectedPkgId === pkg.id;
            const theme = packageColors[pkg.id] || packageColors['pkg-starter'];
            return (
              <div
                key={pkg.id}
                id={`card-catering-pkg-${pkg.id}`}
                onClick={() => {
                  soundEffects.playDip();
                  setSelectedPkgId(pkg.id);
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
                      {pkg.minGuests}+ Guests
                    </span>
                    {pkg.id === 'pkg-grand' && (
                      <span className="text-[10px] font-black uppercase tracking-widest text-white bg-gradient-to-r from-[#E11D48] to-[#F43F5E] px-3 py-1 rounded-full shadow-xs flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Most Popular
                      </span>
                    )}
                  </div>

                  <h3 className="font-brand font-black text-2xl text-[#4A2C2A] mb-1">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-[#4A2C2A]/70 mb-4">{pkg.description}</p>

                  <div className="mb-6 pb-4 border-b border-[#4A2C2A]/10">
                    <span className="text-[10px] uppercase text-[#4A2C2A]/60 font-black block">
                      Starting From
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="font-display font-black text-3xl text-[#4A2C2A]">
                        ₹{pkg.pricePerPerson}
                      </span>
                      <span className="text-xs text-[#4A2C2A]/60 font-semibold">/ person</span>
                    </div>
                  </div>

                  <ul className="space-y-2.5 mb-6 text-xs text-[#4A2C2A]/85 font-medium">
                    {pkg.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
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
                    setSelectedPkgId(pkg.id);
                  }}
                  className={`w-full py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                    isSelected
                      ? 'bg-[#4A2C2A] text-white shadow-md'
                      : 'bg-white text-[#4A2C2A] border border-[#4A2C2A]/20 hover:bg-[#4A2C2A] hover:text-white'
                  }`}
                >
                  {isSelected ? '✓ Selected for Quote' : 'Select Package'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Live Estimator & Booking Inquiry Form */}
        <div className="rounded-3xl bg-white border-2 border-[#4A2C2A]/15 p-6 sm:p-10 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Live Calculation Summary */}
          <div className="lg:col-span-5 bg-[#FDF8F2] p-6 rounded-2xl border border-[#4A2C2A]/10">
            <h4 className="font-brand font-black text-xl text-[#4A2C2A] mb-4">
              Estimated Live Bar Quote
            </h4>

            {/* Guest slider */}
            <div className="mb-6">
              <div className="flex justify-between text-xs font-bold text-[#4A2C2A] mb-2">
                <span>Estimated Guest Count:</span>
                <span className="text-[#D2916C] font-black text-base">{guestCount} Guests</span>
              </div>
              <input
                type="range"
                min={25}
                max={500}
                step={25}
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="w-full accent-[#4A2C2A] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#4A2C2A]/50 mt-1 font-semibold">
                <span>25 Guests</span>
                <span>250 Guests</span>
                <span>500+ Guests</span>
              </div>
            </div>

            <div className="space-y-2 text-xs py-3 border-t border-b border-[#4A2C2A]/10 text-[#4A2C2A]/80">
              <div className="flex justify-between">
                <span>Selected Tier:</span>
                <span className="font-bold text-[#4A2C2A]">{selectedPackage.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Base Rate:</span>
                <span className="font-bold text-[#4A2C2A]">₹{selectedPackage.pricePerPerson} / guest</span>
              </div>
              <div className="flex justify-between">
                <span>Live Chefs & Equipment:</span>
                <span className="font-bold text-emerald-700">Included Free</span>
              </div>
            </div>

            <div className="mt-4 pt-2 flex items-baseline justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#4A2C2A]/60 block">
                  Total Estimate
                </span>
                <span className="font-display font-black text-3xl text-[#4A2C2A]">
                  ₹{estimatedTotal.toLocaleString()}
                </span>
              </div>
              <span className="text-[10px] text-[#4A2C2A]/60 font-semibold">*Taxes & travel extra</span>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7">
            {isSubmitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto text-2xl font-black">
                  ✓
                </div>
                <h3 className="font-brand font-black text-2xl text-[#4A2C2A]">
                  Catering Request Received!
                </h3>
                <p className="text-xs text-[#4A2C2A]/80 max-w-md mx-auto leading-relaxed">
                  Thanks <strong>{fullName}</strong>! Our events manager will call you at <strong>{phone}</strong> within 2 business hours with full menu sampling details.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 bg-[#4A2C2A] text-white text-xs font-bold uppercase tracking-widest rounded-full"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h4 className="font-brand font-black text-xl text-[#4A2C2A] mb-2">
                  Request Live Station Proposal
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#4A2C2A] mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Ananya Sharma"
                      className="w-full p-3 bg-[#FDF8F2] border border-[#4A2C2A]/15 rounded-xl text-xs text-[#4A2C2A] focus:outline-none focus:border-[#4A2C2A]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#4A2C2A] mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full p-3 bg-[#FDF8F2] border border-[#4A2C2A]/15 rounded-xl text-xs text-[#4A2C2A] focus:outline-none focus:border-[#4A2C2A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#4A2C2A] mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ananya@gmail.com"
                      className="w-full p-3 bg-[#FDF8F2] border border-[#4A2C2A]/15 rounded-xl text-xs text-[#4A2C2A] focus:outline-none focus:border-[#4A2C2A]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#4A2C2A] mb-1">Event Date *</label>
                    <input
                      type="date"
                      required
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full p-3 bg-[#FDF8F2] border border-[#4A2C2A]/15 rounded-xl text-xs text-[#4A2C2A] focus:outline-none focus:border-[#4A2C2A]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#4A2C2A] mb-1">City *</label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full p-3 bg-[#FDF8F2] border border-[#4A2C2A]/15 rounded-xl text-xs text-[#4A2C2A] focus:outline-none focus:border-[#4A2C2A]"
                    >
                      <option value="Mumbai">Mumbai</option>
                      <option value="Bangalore">Bangalore</option>
                      <option value="Pune">Pune</option>
                      <option value="Delhi NCR">Delhi NCR</option>
                      <option value="Other">Other City</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#4A2C2A] mb-1">Event Type</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {['Birthday Party', 'Wedding / Sangeet', 'College Fest', 'Corporate'].map((t) => (
                      <button
                        type="button"
                        key={t}
                        onClick={() => setEventType(t)}
                        className={`py-2 px-2 text-[10px] font-bold uppercase rounded-xl border transition-all ${
                          eventType === t
                            ? 'bg-[#4A2C2A] text-white border-[#4A2C2A]'
                            : 'bg-[#FDF8F2] text-[#4A2C2A] border-[#4A2C2A]/15 hover:border-[#4A2C2A]/40'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#4A2C2A] text-white rounded-full font-bold text-xs uppercase tracking-widest shadow-lg hover:bg-[#361E1C] flex items-center justify-center gap-2 transition-all active:scale-98"
                >
                  <Send className="w-4 h-4" />
                  <span>REQUEST FREE CATERING PROPOSAL</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
