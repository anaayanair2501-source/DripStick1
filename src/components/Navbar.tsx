import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu as MenuIcon, X, Sparkles, Volume2, VolumeX, MapPin, Copy, Check, Gift } from 'lucide-react';
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
  const [copiedPromo, setCopiedPromo] = useState(false);

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

  const handleCopyCode = () => {
    soundEffects.playChime();
    navigator.clipboard?.writeText('DRIP15');
    setCopiedPromo(true);
    setTimeout(() => setCopiedPromo(false), 2500);
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
            ? 'bg-[#FAF5EE]/95 backdrop-blur-md shadow-xs py-2.5 border-b border-[#4A2C2A]/10'
            : 'bg-[#FAF5EE] py-3 sm:py-4 border-b border-[#4A2C2A]/10'
        }`}
      >
        {/* Cute Pastel Top Promo Bar */}
        {!isScrolled && (
          <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-2 hidden md:flex items-center justify-between py-1 px-4 rounded-full bg-gradient-to-r from-[#FCE7F3] via-[#FEF3C7] to-[#DCFCE7] border border-[#FBCFE8]/80 text-[11px] font-bold text-[#4A2C2A] shadow-xs">
            <div className="flex items-center gap-2">
              <span className="bg-white/80 px-2 py-0.5 rounded-full text-[10px] text-[#D2916C] uppercase tracking-wider font-extrabold flex items-center gap-1">
                <Gift className="w-3 h-3 text-[#E11D48]" /> Fresh Drop
              </span>
              <span>Enjoy 15% OFF your first artisanal waffle stick with code</span>
              <span className="font-mono bg-white px-2 py-0.5 rounded-md border border-[#4A2C2A]/15 text-[#4A2C2A] font-extrabold tracking-wider">
                DRIP15
              </span>
            </div>
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1 bg-white hover:bg-[#4A2C2A] hover:text-white px-2.5 py-0.5 rounded-full transition-all text-[10px] font-bold uppercase tracking-wider text-[#4A2C2A] border border-[#4A2C2A]/10 shadow-2xs"
            >
              {copiedPromo ? (
                <>
                  <Check className="w-3 h-3 text-emerald-600" />
                  <span className="text-emerald-700 font-extrabold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative">
          <div className="flex items-center justify-between">
            
            {/* Left Desktop Nav Links in Pastel Pill Style */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-3 text-[12px] font-bold tracking-wider uppercase">
              {navItems.slice(0, 4).map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`px-3 py-1.5 rounded-full transition-all duration-200 ${
                      isActive
                        ? 'bg-[#4A2C2A] text-[#FAF5EE] shadow-xs'
                        : 'text-[#4A2C2A]/80 hover:text-[#4A2C2A] hover:bg-[#FCE7F3]/60'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Center: Brand Logo with Cute Pastel Accents */}
            <button
              id="btn-logo-home"
              onClick={() => handleNavClick('hero')}
              className="flex items-center gap-2.5 text-center group focus:outline-none"
            >
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#4A2C2A] to-[#D2916C] flex items-center justify-center text-[#FAF5EE] font-black text-lg shadow-sm transition-transform group-hover:scale-105 group-hover:rotate-6">
                <span className="font-brand">D</span>
              </div>
              <div className="flex flex-col items-start text-left">
                <div className="text-2xl sm:text-3xl font-black tracking-tighter text-[#4A2C2A] leading-none">
                  DRIPSTICK
                </div>
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#D2916C] -mt-0.5">
                  Belgian Cone Waffles
                </span>
              </div>
            </button>

            {/* Right Action Icons & CTAs */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Franchise & Catering in desktop */}
              <button
                onClick={() => handleNavClick('opportunity')}
                className={`hidden xl:block px-3 py-1.5 rounded-full text-[12px] font-bold tracking-wider uppercase transition-all ${
                  activeSection === 'opportunity' ? 'bg-[#4A2C2A] text-[#FAF5EE]' : 'text-[#4A2C2A]/80 hover:bg-[#FEF3C7]'
                }`}
              >
                Franchise
              </button>

              <button
                onClick={() => handleNavClick('catering')}
                className={`hidden xl:block px-3 py-1.5 rounded-full text-[12px] font-bold tracking-wider uppercase transition-all ${
                  activeSection === 'catering' ? 'bg-[#4A2C2A] text-[#FAF5EE]' : 'text-[#4A2C2A]/80 hover:bg-[#DCFCE7]'
                }`}
              >
                Catering
              </button>

              {/* Matchmaker Flavor Quiz Button in Cute Pastel Pink */}
              <button
                id="btn-flavor-matchmaker"
                onClick={() => {
                  soundEffects.playDip();
                  onOpenMatchmaker();
                }}
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 text-[11px] font-extrabold tracking-wider uppercase text-[#9F1239] bg-[#FFE4E6] border border-[#FECDD3] rounded-full hover:bg-[#FDA4AF] hover:text-white transition-all shadow-2xs hover:scale-105 active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#E11D48] animate-bounce-cute" />
                <span>Flavor Quiz</span>
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

              {/* Primary Order Now Button in Sweet Caramel Style */}
              <button
                id="btn-nav-order-now"
                onClick={() => handleNavClick('menu')}
                className="hidden md:inline-flex items-center justify-center bg-[#4A2C2A] text-[#FAF5EE] px-5 py-2 rounded-full text-[11px] font-bold tracking-widest uppercase hover:bg-[#D2916C] transition-all duration-200 shadow-sm hover:scale-105 active:scale-98"
              >
                Order Now
              </button>

              {/* Cart Drawer Trigger with Cute Wobble Badge */}
              <button
                id="btn-nav-cart"
                onClick={() => {
                  soundEffects.playDip();
                  onOpenCart();
                }}
                className="relative flex items-center justify-center w-9 h-9 rounded-full bg-[#4A2C2A] text-[#FAF5EE] hover:bg-[#D2916C] shadow-sm transition-all duration-200 hover:scale-105 active:scale-95"
                aria-label="View Cart"
              >
                <ShoppingBag className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center min-w-[20px] h-5 px-1 bg-[#E11D48] text-white text-[10px] font-black rounded-full border-2 border-white shadow-xs animate-bounce-cute">
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



        {/* Mobile Navigation Drawer with Pastel Accents */}
        {mobileMenuOpen && (
          <div className="lg:hidden px-6 pt-4 pb-6 bg-[#FAF5EE] border-b border-[#4A2C2A]/15 shadow-xl transition-all duration-300">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center justify-between px-4 py-3 text-xs font-bold tracking-widest uppercase rounded-2xl text-left transition-colors ${
                    activeSection === item.id
                      ? 'bg-[#4A2C2A] text-[#FAF5EE]'
                      : 'text-[#4A2C2A] hover:bg-[#FCE7F3]/70'
                  }`}
                >
                  <span>{item.label}</span>
                  {activeSection === item.id && <span className="text-[10px] bg-[#D2916C] text-white px-2.5 py-0.5 rounded-full font-bold">Active</span>}
                </button>
              ))}

              <div className="pt-3 flex flex-col gap-2 border-t border-[#4A2C2A]/10 mt-2">
                <button
                  id="mobile-btn-flavor-match"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenMatchmaker();
                  }}
                  className="flex items-center justify-center gap-2 w-full py-3 text-xs font-bold uppercase tracking-wider text-[#9F1239] bg-[#FFE4E6] rounded-2xl border border-[#FECDD3]"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#E11D48]" />
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
          className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 bg-[#4A2C2A] text-[#FAF5EE] font-black text-xs uppercase tracking-widest rounded-full shadow-xl border border-[#D2916C]/40 active:scale-98 transition-transform"
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
            <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-[#E11D48] text-white text-[10px] font-black rounded-full border-2 border-white shadow-xs">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </>
  );
};
