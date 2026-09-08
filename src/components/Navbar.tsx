import React, { useState, useEffect, useRef } from 'react';
import {
  ShoppingBag,
  Menu as MenuIcon,
  X,
  Sparkles,
  Volume2,
  VolumeX,
  MapPin,
  Copy,
  Check,
  Gift,
  Flame,
  RotateCcw,
  Heart,
  Tag,
  Smile,
  ChevronDown,
} from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';
import { ChocolateDripDivider } from './ChocolateDripDivider';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenMatchmaker: () => void;
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

interface FlavorTheme {
  id: string;
  name: string;
  shortName: string;
  color: string;
  secondaryColor: string;
  textColor: string;
  glowColor: string;
  accentType: string;
  emoji: string;
}

const FLAVOR_THEMES: FlavorTheme[] = [
  {
    id: 'milk-choco',
    name: 'Belgian Milk Chocolate',
    shortName: 'Milk Choco',
    color: '#4A2C2A',
    secondaryColor: '#D2916C',
    textColor: '#FAF5EE',
    glowColor: 'rgba(210, 145, 108, 0.4)',
    accentType: 'chocolate',
    emoji: '🍫',
  },
  {
    id: 'ruby-berry',
    name: 'Ruby Berry Velvet',
    shortName: 'Ruby Berry',
    color: '#9F1239',
    secondaryColor: '#FB7185',
    textColor: '#FFF1F2',
    glowColor: 'rgba(251, 113, 133, 0.45)',
    accentType: 'strawberry',
    emoji: '🍓',
  },
  {
    id: 'salted-caramel',
    name: 'Warm Salted Caramel',
    shortName: 'Caramel',
    color: '#B45309',
    secondaryColor: '#FBBF24',
    textColor: '#FFFBEB',
    glowColor: 'rgba(251, 191, 36, 0.45)',
    accentType: 'caramel',
    emoji: '🍯',
  },
  {
    id: 'white-velvet',
    name: 'Madagascar White Velvet',
    shortName: 'White Velvet',
    color: '#6B4423',
    secondaryColor: '#FDE68A',
    textColor: '#FFFDF7',
    glowColor: 'rgba(253, 230, 138, 0.5)',
    accentType: 'yellow',
    emoji: '🍦',
  },
  {
    id: 'pistachio',
    name: 'Silky Sicilian Pistachio',
    shortName: 'Pistachio',
    color: '#065F46',
    secondaryColor: '#34D399',
    textColor: '#F0FDF4',
    glowColor: 'rgba(52, 211, 153, 0.45)',
    accentType: 'pistachio',
    emoji: '🍵',
  },
];

const LUCKY_PERKS = [
  {
    code: 'DRIP15',
    title: '15% Off Your First Stick',
    tag: 'Welcome Drop',
    desc: 'Valid on any custom or showstopper waffle skewer.',
    emoji: '🧇',
  },
  {
    code: 'OREOMADNESS',
    title: 'Free Crushed Oreo Topping',
    tag: 'Sweet Crunch',
    desc: 'Adds double dark biscuit crunch to your stick.',
    emoji: '🍪',
  },
  {
    code: 'GOLDENDRIP',
    title: 'Free 24K Edible Gold Dust',
    tag: 'Artisanal Glow',
    desc: 'Luminescent edible gold sparkle drizzle upgrade.',
    emoji: '✨',
  },
  {
    code: 'BERRYBOOST',
    title: 'Free Strawberry Pearl Drops',
    tag: 'Fruity Pop',
    desc: 'Crispy ruby strawberry pearls on molten chocolate.',
    emoji: '🍓',
  },
  {
    code: 'BISCOFFLUV',
    title: 'Double Biscoff Speculoos Lava',
    tag: 'Caramel Crunch',
    desc: 'Extra spiced Belgian cookie butter drizzle.',
    emoji: '🍯',
  },
];

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenMatchmaker,
  onNavigate,
  activeSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(soundEffects.getMuted());
  const [copiedPromo, setCopiedPromo] = useState(false);
  
  // Interactive Flavor Dip theme state
  const [activeTheme, setActiveTheme] = useState<FlavorTheme>(FLAVOR_THEMES[0]);
  const [flavorToast, setFlavorToast] = useState<string | null>(null);
  
  // Interactive Mascot crunch counter & animation state
  const [mascotClicks, setMascotClicks] = useState<number>(0);
  const [isMascotCrunching, setIsMascotCrunching] = useState<boolean>(false);
  
  // Lucky Perk Modal/Dropdown
  const [isLuckyOpen, setIsLuckyOpen] = useState<boolean>(false);
  const [currentPerkIndex, setCurrentPerkIndex] = useState<number>(0);
  const [isSpinningPerk, setIsSpinningPerk] = useState<boolean>(false);
  const [perkCopied, setPerkCopied] = useState<boolean>(false);

  // Live status carousel in top ribbon
  const [statusIndex, setStatusIndex] = useState<number>(0);
  const luckyPopoverRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Top bar live bakery status cycle
  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % 4);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Close lucky perk popup when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (luckyPopoverRef.current && !luckyPopoverRef.current.contains(e.target as Node)) {
        setIsLuckyOpen(false);
      }
    };
    if (isLuckyOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isLuckyOpen]);

  const handleSoundToggle = () => {
    const muted = soundEffects.toggleMute();
    setIsMuted(muted);
    if (!muted) soundEffects.playChime();
  };

  const handleCopyCode = (code = 'DRIP15') => {
    soundEffects.playChime();
    navigator.clipboard?.writeText(code);
    setCopiedPromo(true);
    setTimeout(() => setCopiedPromo(false), 2500);
  };

  // Change chocolate dip theme
  const handleSelectTheme = (theme: FlavorTheme) => {
    soundEffects.playDip();
    setActiveTheme(theme);
    setFlavorToast(`Dipped in ${theme.shortName}! ${theme.emoji}`);
    setTimeout(() => {
      setFlavorToast((prev) => (prev?.includes(theme.shortName) ? null : prev));
    }, 2800);
  };

  // Mascot click crunch effect
  const handleMascotClick = () => {
    soundEffects.playCrunch();
    setIsMascotCrunching(true);
    setMascotClicks((prev) => prev + 1);
    setTimeout(() => setIsMascotCrunching(false), 600);
  };

  // Spin Lucky Perk
  const handleSpinLuckyPerk = () => {
    soundEffects.playDip();
    setIsSpinningPerk(true);
    let counter = 0;
    const spinInterval = setInterval(() => {
      setCurrentPerkIndex((prev) => (prev + 1) % LUCKY_PERKS.length);
      counter++;
      if (counter > 8) {
        clearInterval(spinInterval);
        setIsSpinningPerk(false);
        soundEffects.playChime();
      }
    }, 90);
  };

  const handleClaimPerk = () => {
    const perk = LUCKY_PERKS[currentPerkIndex];
    soundEffects.playChime();
    navigator.clipboard?.writeText(perk.code);
    setPerkCopied(true);
    setTimeout(() => setPerkCopied(false), 2400);
  };

  const navItems = [
    { label: 'Menu & Builder', id: 'menu', emoji: '🧇', highlight: true },
    { label: 'Showstoppers', id: 'showstoppers', emoji: '✨' },
    { label: 'Our Story', id: 'story', emoji: '📖' },
    { label: 'Outlets', id: 'outlets', emoji: '📍' },
    { label: 'Catering', id: 'catering', emoji: '🎁' },
    { label: 'Franchise', id: 'opportunity', emoji: '💼' },
  ];

  const handleNavClick = (id: string) => {
    soundEffects.playDip();
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const liveStatuses = [
    {
      icon: <Flame className="w-3.5 h-3.5 text-amber-500 animate-pulse" />,
      text: 'Iron #2: Liège pearl sugar caramelizing at 210°C',
      pill: 'Bakery Live',
      pillBg: 'bg-amber-100 text-amber-900 border-amber-300',
    },
    {
      icon: <span className="text-xs">🍫</span>,
      text: `${activeTheme.name} flowing at 45°C couverture tap`,
      pill: 'Couverture Tap',
      pillBg: 'bg-stone-200 text-stone-900 border-stone-300',
    },
    {
      icon: <Gift className="w-3.5 h-3.5 text-rose-500" />,
      text: 'Special Drop: Use code DRIP15 for 15% OFF your first stick',
      pill: '15% Promo',
      pillBg: 'bg-rose-100 text-rose-800 border-rose-300',
    },
    {
      icon: <MapPin className="w-3.5 h-3.5 text-emerald-500" />,
      text: '4 Downtown Drip Kiosks Open • Express delivery in under 30 mins',
      pill: 'Fast Drip',
      pillBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF5EE]/95 backdrop-blur-md shadow-md py-2 border-b border-[#4A2C2A]/15'
            : 'bg-[#FAF5EE] py-2.5 sm:py-3.5 border-b border-[#4A2C2A]/15'
        }`}
      >
        {/* TOP INTERACTIVE LIVE STATUS & PROMO TICKER BAR */}
        {!isScrolled && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-2 hidden md:block">
            <div className="flex items-center justify-between py-1 px-3.5 rounded-full bg-gradient-to-r from-[#FFF1F2] via-[#FEF3C7] to-[#ECFDF5] border border-[#FBCFE8] text-[11px] font-bold text-[#4A2C2A] shadow-2xs">
              
              {/* Cycling Bakery & Kitchen Status */}
              <div className="flex items-center gap-2.5 overflow-hidden">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border flex items-center gap-1 shadow-2xs ${liveStatuses[statusIndex].pillBg}`}
                >
                  {liveStatuses[statusIndex].icon}
                  <span>{liveStatuses[statusIndex].pill}</span>
                </span>
                <span className="truncate max-w-[420px] lg:max-w-xl transition-all duration-500 text-[#4A2C2A] font-semibold">
                  {liveStatuses[statusIndex].text}
                </span>
              </div>

              {/* Promo Code with 1-Click Copy */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] text-[#4A2C2A]/70 uppercase tracking-wider font-extrabold hidden lg:inline">
                  Welcome Code:
                </span>
                <button
                  type="button"
                  onClick={() => handleCopyCode('DRIP15')}
                  className="flex items-center gap-1.5 bg-white hover:bg-[#4A2C2A] hover:text-white px-2.5 py-0.5 rounded-full transition-all text-[10px] font-extrabold uppercase tracking-wider text-[#4A2C2A] border border-[#4A2C2A]/15 shadow-2xs group"
                  title="Click to copy 15% discount code"
                >
                  <span className="font-mono text-[#D97706] group-hover:text-amber-200">DRIP15</span>
                  {copiedPromo ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600 group-hover:text-emerald-300" />
                      <span className="text-emerald-700 group-hover:text-emerald-300">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-[#4A2C2A]/60 group-hover:text-white" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MAIN NAVIGATION BAR ROW */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            
            {/* LEFT: BRAND LOGO WITH INTERACTIVE CRUNCHY WAFFLE MASCOT */}
            <div className="flex items-center gap-3">
              <button
                id="btn-logo-home"
                onClick={() => handleNavClick('hero')}
                className="flex items-center gap-2.5 text-left group focus:outline-none"
              >
                {/* 3D Animated Waffle Cone Skewer Mascot */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMascotClick();
                  }}
                  title="Click to crunch the waffle skewer!"
                  className={`relative w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-[#381E1C] via-[#5C2E24] to-[#C97B3C] p-1 flex items-center justify-center shadow-md border border-[#FBBF24]/30 transition-all duration-300 cursor-pointer group-hover:scale-108 group-hover:rotate-6 ${
                    isMascotCrunching ? 'scale-90 rotate-12' : ''
                  }`}
                  style={{ boxShadow: `0 4px 14px ${activeTheme.glowColor}` }}
                >
                  {/* Miniature SVG Waffle Stick with dynamic chocolate dip */}
                  <svg viewBox="0 0 40 40" className="w-full h-full drop-shadow">
                    {/* Stick */}
                    <rect x="18" y="24" width="4" height="15" rx="1.5" fill="#E2A76F" stroke="#9A5B27" strokeWidth="0.5" />
                    {/* Waffle Cone Body */}
                    <polygon points="12,10 28,10 24,25 16,25" fill="#E59B3C" stroke="#8C4E15" strokeWidth="0.8" />
                    {/* Waffle Grid Grooves */}
                    <line x1="15" y1="14" x2="25" y2="14" stroke="#8C4E15" strokeWidth="0.8" />
                    <line x1="17" y1="19" x2="23" y2="19" stroke="#8C4E15" strokeWidth="0.8" />
                    <line x1="17" y1="10" x2="19" y2="25" stroke="#8C4E15" strokeWidth="0.8" />
                    <line x1="23" y1="10" x2="21" y2="25" stroke="#8C4E15" strokeWidth="0.8" />
                    {/* Molten Chocolate Dip Top with Organic Scalloped Drip */}
                    <path
                      d="M 12 10 Q 20 6 28 10 L 26.5 15 Q 24 18 22 14 Q 20 20 18 14 Q 15 17 13.5 14 Z"
                      fill={activeTheme.color}
                      stroke={activeTheme.secondaryColor}
                      strokeWidth="0.6"
                    />
                    {/* Sweet Highlight Specular */}
                    <ellipse cx="19" cy="8.5" rx="4" ry="1.2" fill="#FFFFFF" opacity="0.6" />
                    {/* Hanging Drop */}
                    <circle
                      cx="20"
                      cy={isMascotCrunching ? '26' : '19.5'}
                      r={isMascotCrunching ? '2' : '1.3'}
                      fill={activeTheme.color}
                      className="transition-all duration-300"
                    />
                  </svg>

                  {/* Tiny animated crunch particle badge */}
                  {mascotClicks > 0 && (
                    <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs animate-bounce">
                      {mascotClicks}
                    </span>
                  )}
                </div>

                <div className="flex flex-col items-start leading-none">
                  <div className="flex items-center gap-1">
                    <span className="text-xl sm:text-2xl font-black tracking-tighter text-[#361A17] font-brand">
                      DRIPSTICK
                    </span>
                    <span className="inline-block w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                  </div>
                  <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#D97706] mt-0.5">
                    Belgian Cone Waffles
                  </span>
                </div>
              </button>

              {/* Mini Tooltip / Toast when theme or crunch is clicked */}
              {flavorToast && (
                <div className="hidden xl:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#361A17] text-[#FAF5EE] text-[10px] font-black uppercase tracking-wider animate-bounce-cute shadow-md border border-amber-300/40">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>{flavorToast}</span>
                </div>
              )}
            </div>

            {/* CENTER: DESKTOP NAV ITEMS WITH WAFFLE CAPSULE PILL DESIGN */}
            <nav className="hidden lg:flex items-center bg-[#EFE4D6]/70 p-1.5 rounded-full border border-[#D5C2AF] shadow-inner gap-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black tracking-wider uppercase transition-all duration-200 group ${
                      isActive
                        ? 'bg-[#361A17] text-white shadow-sm'
                        : 'text-[#361A17]/85 hover:text-[#361A17] hover:bg-[#FAF5EE]'
                    }`}
                  >
                    <span className="text-xs transition-transform duration-200 group-hover:scale-125 group-hover:-rotate-6">
                      {item.emoji}
                    </span>
                    <span>{item.label}</span>

                    {/* Tiny playful chocolate drip teaser below hovered/active item */}
                    {isActive && (
                      <span
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full shadow-xs"
                        style={{ backgroundColor: activeTheme.color }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* RIGHT: INTERACTIVE FLAVOR DIP SELECTOR, LUCKY PERK, SOUND & CART */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              
              {/* 1. INTERACTIVE "DIP MOOD" THEME CHANGER (Palette of molten dips) */}
              <div className="hidden md:flex items-center bg-[#EFE4D6] p-1 rounded-full border border-[#D5C2AF] shadow-2xs gap-1">
                <span className="text-[9px] font-black uppercase tracking-widest text-[#361A17]/70 pl-2 pr-1 select-none">
                  Dip:
                </span>
                {FLAVOR_THEMES.map((theme) => {
                  const isSelected = activeTheme.id === theme.id;
                  return (
                    <button
                      key={theme.id}
                      type="button"
                      onClick={() => handleSelectTheme(theme)}
                      title={`Dip navbar in ${theme.name}`}
                      className={`w-6 h-6 rounded-full transition-all duration-200 flex items-center justify-center relative ${
                        isSelected
                          ? 'scale-115 ring-2 ring-white shadow-md z-10'
                          : 'opacity-80 hover:opacity-100 hover:scale-105'
                      }`}
                      style={{ backgroundColor: theme.color }}
                    >
                      {isSelected && (
                        <span className="w-1.5 h-1.5 rounded-full bg-white shadow-2xs" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* 2. "✨ LUCKY DRIP" SURPRISE POPUP BUTTON */}
              <div className="relative" ref={luckyPopoverRef}>
                <button
                  id="btn-lucky-drip"
                  type="button"
                  onClick={() => {
                    soundEffects.playDip();
                    setIsLuckyOpen(!isLuckyOpen);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-black uppercase tracking-wider rounded-full transition-all duration-200 border shadow-2xs hover:scale-105 active:scale-95 ${
                    isLuckyOpen
                      ? 'bg-[#F59E0B] text-[#361A17] border-[#D97706] shadow-md'
                      : 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A] hover:bg-[#FDE68A]'
                  }`}
                  title="Discover your secret daily perk"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#D97706] animate-bounce-cute" />
                  <span className="hidden sm:inline">Lucky Drip</span>
                  <span className="sm:hidden">Perk</span>
                </button>

                {/* LUCKY PERK INTERACTIVE POPOVER CARD */}
                {isLuckyOpen && (
                  <div className="absolute right-0 top-full mt-2 w-76 sm:w-84 bg-[#FAF5EE] border-2 border-[#D5C2AF] rounded-3xl p-5 shadow-2xl z-50 animate-fade-in text-[#361A17]">
                    <div className="flex items-center justify-between pb-3 border-b border-[#D5C2AF]/60">
                      <div className="flex items-center gap-1.5">
                        <span className="text-lg">🎲</span>
                        <div>
                          <div className="text-xs font-black uppercase tracking-wider text-[#361A17]">
                            Today's Lucky Perk
                          </div>
                          <div className="text-[10px] text-[#361A17]/70 font-bold">
                            Spin for a surprise golden reward
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsLuckyOpen(false)}
                        className="text-[#361A17]/60 hover:text-[#361A17] p-1 rounded-full hover:bg-black/5"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Current Selected Perk Display */}
                    <div className="my-3.5 p-3.5 rounded-2xl bg-[#EFE4D6] border border-[#D5C2AF] relative overflow-hidden">
                      <div className="flex items-start justify-between">
                        <span className="text-2xl">{LUCKY_PERKS[currentPerkIndex].emoji}</span>
                        <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-amber-400 text-amber-950">
                          {LUCKY_PERKS[currentPerkIndex].tag}
                        </span>
                      </div>
                      <div className="text-sm font-black text-[#361A17] mt-1.5">
                        {LUCKY_PERKS[currentPerkIndex].title}
                      </div>
                      <div className="text-[11px] text-[#361A17]/80 mt-0.5">
                        {LUCKY_PERKS[currentPerkIndex].desc}
                      </div>

                      {/* Promo Code Box */}
                      <div className="mt-3 flex items-center justify-between bg-white px-3 py-1.5 rounded-xl border border-[#D5C2AF]">
                        <span className="font-mono font-black text-xs text-[#D97706] tracking-wider">
                          {LUCKY_PERKS[currentPerkIndex].code}
                        </span>
                        <button
                          type="button"
                          onClick={handleClaimPerk}
                          className="text-[10px] font-black uppercase px-2 py-0.5 rounded-lg bg-[#361A17] text-white hover:bg-amber-600 transition-colors flex items-center gap-1"
                        >
                          {perkCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{perkCopied ? 'Copied' : 'Claim'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Re-roll Perk Button */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleSpinLuckyPerk}
                        disabled={isSpinningPerk}
                        className="flex-1 py-2 px-3 rounded-full bg-[#361A17] text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#D97706] transition-all disabled:opacity-50"
                      >
                        <RotateCcw className={`w-3.5 h-3.5 ${isSpinningPerk ? 'animate-spin' : ''}`} />
                        <span>{isSpinningPerk ? 'Spinning...' : 'Spin Again'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. FLAVOR QUIZ SHORTCUT */}
              <button
                id="btn-flavor-matchmaker"
                onClick={() => {
                  soundEffects.playDip();
                  onOpenMatchmaker();
                }}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-black tracking-wider uppercase text-[#9F1239] bg-[#FFE4E6] border border-[#FECDD3] rounded-full hover:bg-[#FDA4AF] hover:text-white transition-all shadow-2xs hover:scale-105 active:scale-95"
              >
                <span>Quiz</span>
              </button>

              {/* 4. SOUND FX TOGGLE WITH EQUALIZER VISUALIZER */}
              <button
                id="btn-sound-toggle"
                onClick={handleSoundToggle}
                title={isMuted ? 'Unmute dessert sound effects' : 'Sound effects are on'}
                className="w-9 h-9 rounded-full flex items-center justify-center bg-[#EFE4D6] hover:bg-[#E2D4C3] border border-[#D5C2AF] text-[#361A17] transition-all hover:scale-105 active:scale-95 shadow-2xs"
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4 text-stone-400" />
                ) : (
                  <div className="flex items-center gap-0.5">
                    <span className="w-0.5 h-3 bg-[#D97706] rounded-full animate-pulse" />
                    <span className="w-0.5 h-4 bg-[#B45309] rounded-full animate-bounce" />
                    <span className="w-0.5 h-2 bg-[#D97706] rounded-full animate-pulse" />
                  </div>
                )}
              </button>

              {/* 5. PRIMARY ORDER NOW BUTTON */}
              <button
                id="btn-nav-order-now"
                onClick={() => handleNavClick('menu')}
                className="hidden md:inline-flex items-center justify-center px-4 py-2 rounded-full text-xs font-black tracking-wider uppercase text-white transition-all duration-200 shadow-md hover:scale-105 active:scale-98"
                style={{
                  backgroundColor: activeTheme.color,
                  boxShadow: `0 4px 12px ${activeTheme.glowColor}`,
                }}
              >
                Order Waffle
              </button>

              {/* 6. CART BUTTON WITH DIPPING SKEWER BADGE */}
              <button
                id="btn-nav-cart"
                onClick={() => {
                  soundEffects.playDip();
                  onOpenCart();
                }}
                className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#361A17] text-white hover:bg-amber-700 shadow-md transition-all duration-200 hover:scale-105 active:scale-95"
                aria-label="View Cart"
              >
                <ShoppingBag className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center min-w-[20px] h-5 px-1 bg-[#E11D48] text-white text-[10px] font-black rounded-full border-2 border-white shadow-xs animate-bounce-cute">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* 7. MOBILE MENU HAMBURGER BUTTON */}
              <button
                id="btn-mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden flex items-center justify-center w-9 h-9 rounded-full bg-[#EFE4D6] text-[#361A17] border border-[#D5C2AF] hover:bg-[#E2D4C3] transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <MenuIcon className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE NAVIGATION DRAWER WITH PASTEL WAFFLE BOX STYLING */}
        {mobileMenuOpen && (
          <div className="lg:hidden px-4 pt-3 pb-6 bg-[#FAF5EE] border-b-2 border-[#D5C2AF] shadow-2xl transition-all duration-300">
            <div className="flex flex-col space-y-2">
              
              {/* Mobile "Dip Your Mood" flavor strip */}
              <div className="bg-[#EFE4D6] p-3 rounded-2xl border border-[#D5C2AF] mb-1">
                <div className="text-[10px] font-black uppercase tracking-wider text-[#361A17] mb-2 flex items-center justify-between">
                  <span>Dip Navbar Couverture:</span>
                  <span className="text-amber-700">{activeTheme.shortName}</span>
                </div>
                <div className="flex items-center justify-between gap-1">
                  {FLAVOR_THEMES.map((theme) => {
                    const isSelected = activeTheme.id === theme.id;
                    return (
                      <button
                        key={theme.id}
                        type="button"
                        onClick={() => handleSelectTheme(theme)}
                        className={`flex-1 py-1.5 px-2 rounded-xl text-[10px] font-bold flex items-center justify-center gap-1 border transition-all ${
                          isSelected
                            ? 'bg-[#361A17] text-white border-black shadow-xs'
                            : 'bg-white text-[#361A17] border-[#D5C2AF]'
                        }`}
                      >
                        <span>{theme.emoji}</span>
                        <span className="truncate">{theme.shortName}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Navigation links */}
              {navItems.map((item) => (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center justify-between px-4 py-2.5 text-xs font-black tracking-wider uppercase rounded-2xl text-left transition-colors ${
                    activeSection === item.id
                      ? 'bg-[#361A17] text-white shadow-xs'
                      : 'text-[#361A17] bg-[#EFE4D6]/70 hover:bg-[#EFE4D6]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{item.emoji}</span>
                    <span>{item.label}</span>
                  </div>
                  {activeSection === item.id && (
                    <span className="text-[9px] bg-amber-500 text-white px-2 py-0.5 rounded-full font-bold">
                      Active
                    </span>
                  )}
                </button>
              ))}

              {/* Quick Actions in Mobile Drawer */}
              <div className="pt-2 flex flex-col gap-2 border-t border-[#D5C2AF]/70 mt-1">
                <button
                  id="mobile-btn-flavor-match"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenMatchmaker();
                  }}
                  className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-black uppercase tracking-wider text-[#9F1239] bg-[#FFE4E6] rounded-2xl border border-[#FECDD3]"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#E11D48]" />
                  <span>Discover Your Flavor Match Quiz</span>
                </button>

                <button
                  id="mobile-btn-order-now"
                  onClick={() => handleNavClick('menu')}
                  className="flex items-center justify-center w-full py-3 text-xs uppercase tracking-widest font-black text-white rounded-2xl shadow-md"
                  style={{ backgroundColor: activeTheme.color }}
                >
                  Order DripStick Waffle
                </button>
              </div>
            </div>
          </div>
        )}

        {/* BOTTOM CHOCOLATE DRIP DIVIDER (Synchronized with active flavor dip!) */}
        <div
          className={`absolute top-full left-0 right-0 pointer-events-none z-10 transition-all duration-300 ${
            isScrolled ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'
          }`}
        >
          <ChocolateDripDivider
            fillColor={activeTheme.color}
            secondaryFillColor={activeTheme.secondaryColor}
            showDrops={true}
            accentType={activeTheme.accentType}
            className="border-t-0"
          />
        </div>
      </header>

      {/* Floating Bottom Persistent CTA for Mobile */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-40 flex items-center gap-2">
        <button
          id="btn-sticky-mobile-order"
          onClick={() => handleNavClick('menu')}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 text-white font-black text-xs uppercase tracking-widest rounded-full shadow-xl border border-white/20 active:scale-98 transition-transform"
          style={{ backgroundColor: activeTheme.color }}
        >
          <span>🧇 Order DripStick</span>
        </button>
        <button
          id="btn-sticky-mobile-cart"
          onClick={onOpenCart}
          className="relative flex items-center justify-center w-12 h-12 bg-white text-[#361A17] rounded-full shadow-xl border border-[#D5C2AF] active:scale-95"
        >
          <ShoppingBag className="w-5 h-5" />
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

