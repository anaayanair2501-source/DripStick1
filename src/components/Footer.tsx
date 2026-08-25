import React, { useState } from 'react';
import { ArrowRight, Instagram, Twitter, Facebook, Youtube, Heart, Sparkles } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    soundEffects.playChime();
    setSubscribed(true);
  };

  return (
    <footer className="bg-[#4A2C2A] text-[#FDF8F2] pt-20 pb-12 relative overflow-hidden border-t-4 border-[#D2916C]">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-[#D2916C]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Massive Bold Brand Heading in Footer */}
        <div className="border-b border-white/10 pb-16 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end justify-between">
            <div className="lg:col-span-8">
              <span className="text-[11px] font-black uppercase tracking-[0.25em] text-[#D2916C] block mb-2">
                STICK. DIP. LOVE.
              </span>
              <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-[#FDF8F2] leading-none uppercase">
                DRIPSTICK
              </h2>
            </div>

            {/* VIP Club Newsletter */}
            <div className="lg:col-span-4">
              <p className="text-xs font-bold uppercase tracking-wider text-[#D2916C] mb-2">
                Join the Secret Drip Club
              </p>
              {subscribed ? (
                <div className="p-3 bg-[#361E1C] rounded-2xl border border-[#D2916C]/30 text-xs text-[#D2916C] font-bold">
                  ✓ You're in! Check your inbox for 15% off your first stick.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-[#361E1C] border border-white/15 rounded-full text-xs text-[#FDF8F2] focus:outline-none focus:border-[#D2916C]"
                  />
                  <button
                    type="submit"
                    className="px-5 py-3 bg-[#D2916C] hover:bg-[#c2805b] text-white rounded-full font-bold text-xs uppercase tracking-widest transition-colors shrink-0"
                  >
                    Join
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* 4 Column Footer Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 text-xs">
          
          {/* Col 1: About */}
          <div>
            <h4 className="font-bold uppercase tracking-widest text-[#D2916C] mb-4">
              Experience
            </h4>
            <ul className="space-y-2.5 text-[#FDF8F2]/75">
              <li>
                <button onClick={() => onNavigate('story')} className="hover:text-white transition-colors">
                  Our Story & Craft
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('menu')} className="hover:text-white transition-colors">
                  Interactive Stick Builder
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('showstoppers')} className="hover:text-white transition-colors">
                  Chef Show Stoppers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('outlets')} className="hover:text-white transition-colors">
                  Find Nearest Outlet
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Business */}
          <div>
            <h4 className="font-bold uppercase tracking-widest text-[#D2916C] mb-4">
              Collaborations
            </h4>
            <ul className="space-y-2.5 text-[#FDF8F2]/75">
              <li>
                <button onClick={() => onNavigate('catering')} className="hover:text-white transition-colors">
                  Live Event Catering Bar
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('opportunity')} className="hover:text-white transition-colors">
                  Franchise Opportunities
                </button>
              </li>
              <li>
                <a href="#catering" className="hover:text-white transition-colors">
                  College Fest Partnerships
                </a>
              </li>
              <li>
                <a href="#opportunity" className="hover:text-white transition-colors">
                  Mall Kiosk Expansion
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Outlets Info */}
          <div>
            <h4 className="font-bold uppercase tracking-widest text-[#D2916C] mb-4">
              Presence
            </h4>
            <ul className="space-y-2.5 text-[#FDF8F2]/75">
              <li>Mumbai (Bandra, Juhu, Powai)</li>
              <li>Bangalore (Indiranagar, Koramangala)</li>
              <li>Pune (FC Road, Koregaon Park)</li>
              <li>Delhi NCR (CyberHub, HKV)</li>
              <li className="text-[#D2916C] font-bold">18 Outlets Pan-India</li>
            </ul>
          </div>

          {/* Col 4: Social & Direct Contact */}
          <div>
            <h4 className="font-bold uppercase tracking-widest text-[#D2916C] mb-4">
              Connect With Us
            </h4>
            <p className="text-[#FDF8F2]/75 mb-4">
              hello@dripstick.com <br />
              +91 98200 44556
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#361E1C] border border-white/15 flex items-center justify-center text-white hover:bg-[#D2916C] transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#361E1C] border border-white/15 flex items-center justify-center text-white hover:bg-[#D2916C] transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#361E1C] border border-white/15 flex items-center justify-center text-white hover:bg-[#D2916C] transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright & tagline */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#FDF8F2]/60">
          <p>© {new Date().getFullYear()} DripStick Desserts Pvt. Ltd. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Crafted with Belgian cocoa and pure passion</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
