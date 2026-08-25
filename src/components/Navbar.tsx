import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu as MenuIcon, X, Sparkles, Volume2, VolumeX, MapPin } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenMatchmaker: () => void;
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenMatchmaker,
  onNavigate,
  activeSection
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(soundEffects.getMuted());

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const muted = soundEffects.toggleMute();
    setIsMuted(muted);
    if (!muted) soundEffects.playChime();
  };

  const navItems = [
    { label: 'Our Story', id: 'story' },
    { label: 'Menu', id: 'menu' },
    { label: 'Show Stoppers', id: 'showstoppers' },
    { label: 'Outlets', id: 'outlets' },
    { label: 'Catering', id: 'catering' },
    { label: 'Franchise', id: 'opportunity' },
  ];

  const handleNavClick = (id: string) => {
    soundEffects.playDip();
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FDF8F2]/95 backdrop-blur-md shadow-sm py-3 border-b border-[#4A2C2A]/10'
            : 'bg-[#FDF8F2] py-4 sm:py-5 border-b border-[#4A2C2A]/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative">
          <div className="flex items-center justify-between">
            
            {/* Left Desktop Nav Links in Bold Minimalist Caps */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-[12px] font-bold tracking-widest uppercase">
              <button
                onClick={() => handleNavClick('story')}
                className={`transition-opacity ${activeSection === 'story' ? 'text-[#4A2C2A] underline underline-offset-4 decoration-2 decoration-[#D2916C]' : 'text-[#4A2C2A] hover:opacity-60'}`}
              >
                Our Story
              </button>
              <button
                onClick={() => handleNavClick('menu')}
                className={`transition-opacity ${activeSection === 'menu' ? 'text-[#4A2C2A] underline underline-offset-4 decoration-2 decoration-[#D2916C]' : 'text-[#4A2C2A] hover:opacity-60'}`}
              >
                Menu
              </button>
              <button
                onClick={() => handleNavClick('showstoppers')}
                className={`transition-opacity ${activeSection === 'showstoppers' ? 'text-[#4A2C2A] underline underline-offset-4 decoration-2 decoration-[#D2916C]' : 'text-[#4A2C2A] hover:opacity-60'}`}
              >
                Show Stoppers
              </button>
              <button
                onClick={() => handleNavClick('outlets')}
                className={`transition-opacity ${activeSection === 'outlets' ? 'text-[#4A2C2A] underline underline-offset-4 decoration-2 decoration-[#D2916C]' : 'text-[#4A2C2A] hover:opacity-60'}`}
              >
                Outlets
              </button>
            </div>

            {/* Center: Brand Logo (Prominent Bold Typography) */}
            <button
              id="btn-logo-home"
              onClick={() => handleNavClick('hero')}
              className="flex items-center gap-2.5 text-center group focus:outline-none"
            >
              <div className="w-8 h-8 rounded-full bg-[#4A2C2A] flex items-center justify-center text-[#FDF8F2] font-black text-lg shadow-sm transition-transform group-hover:scale-105">
                <span className="font-brand">D</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black tracking-tighter text-[#4A2C2A] leading-none">
                DRIPSTICK
              </div>
            </button>

            {/* Right Action Icons & CTAs */}
            <div className="flex items-center gap-4 sm:gap-6">
              {/* Franchise link in desktop */}
              <button
                onClick={() => handleNavClick('opportunity')}
                className="hidden xl:block text-[12px] font-bold tracking-widest uppercase text-[#4A2C2A] hover:opacity-60 transition-opacity"
              >
                Franchise
              </button>

              {/* Catering link */}
              <button
                onClick={() => handleNavClick('catering')}
                className="hidden xl:block text-[12px] font-bold tracking-widest uppercase text-[#4A2C2A] hover:opacity-60 transition-opacity"
              >
                Catering
              </button>

              {/* Matchmaker Flavor Quiz Button */}
              <button
                id="btn-flavor-matchmaker"
                onClick={() => {
                  soundEffects.playDip();
                  onOpenMatchmaker();
                }}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold tracking-wider uppercase text-[#4A2C2A] bg-white border border-[#4A2C2A]/15 rounded-full hover:bg-[#D2916C]/10 transition-colors"
              >
                <Sparkles className="w-3 h-3 text-[#D2916C]" />
                <span>Quiz</span>
              </button>

              {/* Sound FX toggle */}
              <button
                id="btn-sound-toggle"
                onClick={handleSoundToggle}
                title={isMuted ? 'Unmute sound effects' : 'Mute sound effects'}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#4A2C2A]/70 hover:text-[#4A2C2A] hover:bg-[#4A2C2A]/5 transition-colors"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#D2916C]" />}
              </button>

              {/* Primary Order Now Button */}
              <button
                id="btn-nav-order-now"
                onClick={() => handleNavClick('menu')}
                className="hidden md:inline-flex items-center justify-center bg-[#4A2C2A] text-[#FDF8F2] px-6 py-2.5 rounded-full text-[11px] font-bold tracking-widest uppercase hover:bg-[#361E1C] transition-all duration-200 shadow-sm active:scale-98"
              >
                Order Now
              </button>

              {/* Cart Drawer Trigger */}
              <button
                id="btn-nav-cart"
                onClick={() => {
                  soundEffects.playDip();
                  onOpenCart();
                }}
                className="relative flex items-center justify-center w-9 h-9 rounded-full bg-[#4A2C2A] text-[#FDF8F2] hover:bg-[#361E1C] shadow-sm transition-transform active:scale-95"
                aria-label="View Cart"
              >
                <ShoppingBag className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-4.5 px-1 bg-[#D2916C] text-white text-[10px] font-black rounded-full border-2 border-[#FDF8F2]">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Hamburger Menu Button */}
              <button
                id="btn-mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden flex items-center justify-center w-9 h-9 rounded-full bg-white text-[#4A2C2A] border border-[#4A2C2A]/15 hover:bg-[#4A2C2A]/5 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <MenuIcon className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Chocolate Hanging Droplets Accents from Design Spec */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 flex gap-2 z-10 pointer-events-none">
          <div className="w-3.5 h-10 sm:w-4 sm:h-12 bg-[#4A2C2A] rounded-b-full shadow-md animate-drip" />
          <div className="w-2.5 h-16 sm:w-3 sm:h-20 bg-[#4A2C2A] rounded-b-full shadow-md -mt-2.5 animate-drip" style={{ animationDelay: '0.4s' }} />
          <div className="w-4 h-12 sm:w-5 sm:h-16 bg-[#4A2C2A] rounded-b-full shadow-md -mt-1.5 animate-drip" style={{ animationDelay: '0.8s' }} />
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden px-6 pt-4 pb-6 bg-[#FDF8F2] border-b border-[#4A2C2A]/15 shadow-xl transition-all duration-300">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center justify-between px-4 py-3 text-xs font-bold tracking-widest uppercase rounded-xl text-left transition-colors ${
                    activeSection === item.id
                      ? 'bg-[#4A2C2A] text-[#FDF8F2]'
                      : 'text-[#4A2C2A] hover:bg-[#4A2C2A]/5'
                  }`}
                >
                  <span>{item.label}</span>
                  {activeSection === item.id && <span className="text-[10px] bg-[#D2916C] text-white px-2 py-0.5 rounded-full font-bold">Active</span>}
                </button>
              ))}

              <div className="pt-3 flex flex-col gap-2 border-t border-[#4A2C2A]/10 mt-2">
                <button
                  id="mobile-btn-flavor-match"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenMatchmaker();
                  }}
                  className="flex items-center justify-center gap-2 w-full py-3 text-xs font-bold uppercase tracking-wider text-[#4A2C2A] bg-white rounded-xl border border-[#4A2C2A]/15"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#D2916C]" />
                  <span>Discover Your Flavor Match</span>
                </button>

                <button
                  id="mobile-btn-order-now"
                  onClick={() => handleNavClick('menu')}
                  className="flex items-center justify-center w-full py-3.5 text-xs uppercase tracking-widest font-bold text-white bg-[#4A2C2A] rounded-full shadow-md"
                >
                  Order Now
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Floating Bottom Persistent CTA for Mobile */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-40 flex items-center gap-2">
        <button
          id="btn-sticky-mobile-order"
          onClick={() => handleNavClick('menu')}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 bg-[#4A2C2A] text-[#FDF8F2] font-black text-xs uppercase tracking-widest rounded-full shadow-xl border border-[#D2916C]/40 active:scale-98 transition-transform"
        >
          <span>🧇 Order DripStick</span>
        </button>
        <button
          id="btn-sticky-mobile-cart"
          onClick={onOpenCart}
          className="relative flex items-center justify-center w-12 h-12 bg-white text-[#4A2C2A] rounded-full shadow-xl border border-[#4A2C2A]/20 active:scale-95"
        >
          <ShoppingBag className="w-4 h-4" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 flex items-center justify-center w-4.5 h-4.5 bg-[#D2916C] text-white text-[10px] font-black rounded-full border-2 border-white">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </>
  );
};
