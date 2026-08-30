import React, { useState } from 'react';
import { MapPin, Clock, Phone, Navigation, Sparkles, ExternalLink, Compass } from 'lucide-react';
import { OUTLETS } from '../data/mockData';
import { soundEffects } from '../utils/soundEffects';

export const OutletsSection: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [activeOutletId, setActiveOutletId] = useState<string>(OUTLETS[0].id);

  const cities = [
    { name: 'All', emoji: '✨' },
    { name: 'Mumbai', emoji: '🌊' },
    { name: 'Bangalore', emoji: '🌳' },
    { name: 'Pune', emoji: '⛰️' },
    { name: 'Delhi NCR', emoji: '🏛️' }
  ];

  const filteredOutlets = selectedCity === 'All'
    ? OUTLETS
    : OUTLETS.filter((o) => o.city.toLowerCase() === selectedCity.toLowerCase());

  const activeOutlet = OUTLETS.find((o) => o.id === activeOutletId) || OUTLETS[0];

  return (
    <section id="outlets" className="py-24 bg-[#FAF5EE] relative overflow-hidden border-t border-[#4A2C2A]/10">
      
      {/* Decorative Pastel Glows */}
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-tr from-[#FEF3C7]/30 to-[#FCE7F3]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-gradient-to-bl from-[#DCFCE7]/30 to-[#EDE9FE]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header with Bold Typography */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EDE9FE] border border-[#DDD6FE] mb-4 shadow-2xs">
            <MapPin className="w-3.5 h-3.5 text-[#7C3AED]" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#6B21A8]">
              18 Outlets & Growing
            </span>
          </div>
          <h2 className="font-brand font-black text-4xl sm:text-5xl lg:text-6xl text-[#4A2C2A] tracking-tight mb-4">
            FIND A DRIPSTICK NEAR YOU
          </h2>
          <p className="text-base sm:text-lg text-[#4A2C2A]/80 leading-relaxed font-medium">
            Step up to our warm chocolate fondue counter. Freshly made Belgian waffle sticks served hot in under 3 minutes. 📍
          </p>
        </div>

        {/* City Filter Pills */}
        <div className="flex items-center justify-center gap-2.5 mb-12 flex-wrap">
          {cities.map((city) => (
            <button
              key={city.name}
              id={`filter-city-${city.name.toLowerCase()}`}
              onClick={() => {
                soundEffects.playDip();
                setSelectedCity(city.name);
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 ${
                selectedCity === city.name
                  ? 'bg-[#4A2C2A] text-[#FDF8F2] shadow-md scale-105'
                  : 'bg-white text-[#4A2C2A] hover:bg-[#FAF5EE] border border-[#4A2C2A]/15 shadow-2xs hover:scale-102'
              }`}
            >
              <span>{city.emoji}</span>
              <span>{city.name}</span>
            </button>
          ))}
        </div>

        {/* 2-Column: Outlets List & Interactive Map Preview Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Outlets Card List */}
          <div className="lg:col-span-7 space-y-4">
            {filteredOutlets.map((outlet) => {
              const isSelected = activeOutletId === outlet.id;
              return (
                <div
                  key={outlet.id}
                  id={`outlet-card-${outlet.id}`}
                  onClick={() => {
                    soundEffects.playDip();
                    setActiveOutletId(outlet.id);
                  }}
                  className={`p-6 rounded-3xl cursor-pointer transition-all duration-300 border-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    isSelected
                      ? 'bg-white border-[#4A2C2A] shadow-xl scale-[1.02] ring-4 ring-[#4A2C2A]/10'
                      : 'bg-white/80 border-[#4A2C2A]/10 hover:border-[#4A2C2A]/30 hover:scale-[1.01]'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#7C3AED] bg-[#EDE9FE] border border-[#DDD6FE] px-2.5 py-0.5 rounded-full">
                        {outlet.city}
                      </span>
                      <h4 className="font-brand font-black text-lg text-[#4A2C2A]">
                        {outlet.name}
                      </h4>
                    </div>
                    <p className="text-xs text-[#4A2C2A]/70 flex items-start gap-1.5 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-[#DB2777] shrink-0 mt-0.5" />
                      <span>{outlet.address}</span>
                    </p>
                    <div className="flex items-center gap-4 text-[11px] text-[#4A2C2A]/60 pt-1 font-semibold">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#D97706]" /> {outlet.timings}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3 text-[#16A34A]" /> {outlet.phone}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:flex-col shrink-0">
                    <span className="text-[10px] font-black text-[#166534] bg-[#DCFCE7] border border-[#BBF7D0] px-3 py-1 rounded-full shadow-2xs">
                      ● Open Now
                    </span>
                    <a
                      href={outlet.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="px-4 py-2 bg-[#4A2C2A] text-white text-[11px] font-black uppercase tracking-wider rounded-full flex items-center gap-1 hover:bg-[#361E1C] transition-all shadow-xs"
                    >
                      <Navigation className="w-3 h-3 text-[#FDE68A]" />
                      <span>Directions</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Selected Outlet Showcase */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-[#4A2C2A]/15 shadow-xl space-y-6">
              
              <div className="relative h-48 w-full rounded-2xl overflow-hidden border border-[#4A2C2A]/10 shadow-inner bg-[#4A2C2A]">
                <img
                  src={activeOutlet.image}
                  alt={activeOutlet.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#26140A]/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#FDE68A]">
                    Spotlight Outlet
                  </span>
                  <h3 className="font-brand font-black text-xl leading-tight">
                    {activeOutlet.name}
                  </h3>
                </div>
              </div>

              <div className="space-y-3 text-xs text-[#4A2C2A]/80">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#DB2777] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#4A2C2A] font-black">Address:</strong>
                    <span className="font-medium">{activeOutlet.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#4A2C2A] font-black">Operating Hours:</strong>
                    <span className="font-medium">{activeOutlet.timings} (Daily)</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#4A2C2A] font-black">Direct Counter Hotline:</strong>
                    <span className="font-medium">{activeOutlet.phone}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={activeOutlet.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-[#4A2C2A] text-white rounded-full font-black text-xs uppercase tracking-widest shadow-md hover:bg-[#361E1C] flex items-center justify-center gap-2 transition-all hover:scale-102 active:scale-98"
                >
                  <Navigation className="w-4 h-4 text-[#FDE68A]" />
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
