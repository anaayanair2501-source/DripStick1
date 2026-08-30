import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ChocolateDripDivider } from './components/ChocolateDripDivider';
import { OurStorySection } from './components/OurStorySection';
import { MenuBuilderSection } from './components/MenuBuilderSection';
import { FlavorWheelSection } from './components/FlavorWheelSection';
import { ShowStoppersSection } from './components/ShowStoppersSection';
import { TheDripExperienceSection } from './components/TheDripExperienceSection';
import { CateringSection } from './components/CateringSection';
import { FranchiseSection } from './components/FranchiseSection';
import { OutletsSection } from './components/OutletsSection';
import { SocialHubSection } from './components/SocialHubSection';
import { OrderCartModal } from './components/OrderCartModal';
import { FlavorMatchmakerModal } from './components/FlavorMatchmakerModal';
import { FloatingDripDock } from './components/FloatingDripDock';
import { Footer } from './components/Footer';
import { ClickSpark } from './components/ClickSpark';
import { CartItem, CustomDripStick, ShowStopperProduct } from './types';
import { soundEffects } from './utils/soundEffects';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isMatchmakerOpen, setIsMatchmakerOpen] = useState<boolean>(false);

  // Initial cart with 1 popular ShowStopper
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'cart-init-1',
      type: 'showstopper',
      title: 'THE OREO DRIP',
      subtitle: 'Classic Golden Cone + Warm Belgian Milk Choco + Crushed Oreo',
      price: 189,
      totalPrice: 189,
      quantity: 1,
      isCustom: false,
    },
  ]);

  // Active section scroll observer
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'story', 'menu', 'flavor-wheel', 'showstoppers', 'catering', 'opportunity', 'outlets', 'social'];
      const scrollPos = window.scrollY + 220;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Add Custom DripStick to Cart
  const handleAddCustomToCart = (custom: CustomDripStick) => {
    const unitPrice =
      custom.base.price +
      custom.sauce.price +
      custom.toppings.reduce((acc, t) => acc + t.price, 0) +
      (custom.drizzle ? custom.drizzle.price : 0);

    const toppingsList = custom.toppings.map((t) => t.name).join(', ') || 'No toppings';
    const subtitle = `${custom.base.name} + ${custom.sauce.name} + ${toppingsList}${
      custom.drizzle ? ` + ${custom.drizzle.name}` : ''
    }`;

    const newItem: CartItem = {
      id: `cart-custom-${Date.now()}`,
      type: 'custom',
      isCustom: true,
      title: 'Custom DripStick',
      subtitle,
      price: unitPrice,
      totalPrice: unitPrice,
      quantity: 1,
      customDetails: custom,
      specialNotes: custom.specialInstructions,
    };

    setCartItems((prev) => [newItem, ...prev]);
  };

  // Add ShowStopper to Cart
  const handleAddShowStopperToCart = (product: ShowStopperProduct) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.type === 'showstopper' && item.title === product.name);
      if (existing) {
        return prev.map((item) =>
          item.id === existing.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      const newItem: CartItem = {
        id: `cart-show-${product.id}-${Date.now()}`,
        type: 'showstopper',
        isCustom: false,
        title: product.name,
        subtitle: `${product.base.name} + ${product.sauce.name} + ${product.toppings[0]?.name || ''}`,
        price: product.price,
        totalPrice: product.price,
        quantity: 1,
        image: product.image,
      };
      return [newItem, ...prev];
    });
  };

  // Cart quantity controls
  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    soundEffects.playDip();
    if (newQuantity <= 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } else {
      setCartItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
      );
    }
  };

  const handleRemoveItem = (id: string) => {
    soundEffects.playDip();
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <ClickSpark
      sparkColor="#F472B6"
      sparkCount={10}
      sparkRadius={32}
      sparkSize={16}
      duration={500}
      easing="ease-out"
      extraScale={1.3}
      className="min-h-screen bg-[#FAF5EE] text-[#4A2C2A] flex flex-col font-sans selection:bg-[#F472B6] selection:text-white"
    >
      {/* Top Sticky Navigation with Chocolate Drips */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenMatchmaker={() => setIsMatchmakerOpen(true)}
        onNavigate={handleNavigate}
        activeSection={activeSection}
      />

      {/* Main Content Sections Flow */}
      <main className="flex-grow">
        {/* 01 — HERO */}
        <HeroSection
          onOrderNow={() => setIsCartOpen(true)}
          onExploreMenu={() => handleNavigate('menu')}
          onBuildCustom={() => handleNavigate('menu')}
        />

        {/* Chocolate Drip Divider with Strawberry Accent */}
        <ChocolateDripDivider
          fillColor="#4A2C2A"
          secondaryFillColor="#F472B6"
          showDrops={true}
          accentType="strawberry"
        />

        {/* 02 — OUR STORY */}
        <OurStorySection />

        {/* Chocolate Drip Divider with Pistachio & Cream Accent */}
        <ChocolateDripDivider
          fillColor="#FAF5EE"
          secondaryFillColor="#86EFAC"
          inverted={true}
          showDrops={false}
        />

        {/* 03 — MENU: BUILD YOUR DRIPSTICK (FACTORY LAB) */}
        <MenuBuilderSection onAddCustomToCart={handleAddCustomToCart} />

        {/* 04 — INTERACTIVE FLAVOR CARNIVAL WHEEL */}
        <FlavorWheelSection
          onAddProduct={handleAddShowStopperToCart}
          onOpenCart={() => setIsCartOpen(true)}
        />

        {/* 05 — SHOW STOPPERS: BEST SELLERS (CASSETTE BOXES) */}
        <ShowStoppersSection
          onAddShowStopperToCart={handleAddShowStopperToCart}
          onCustomizeShowStopper={() => handleNavigate('menu')}
        />

        {/* 06 — THE DRIP EXPERIENCE & SCIENCE */}
        <TheDripExperienceSection />

        {/* 07 — CATERING & LIVE BAR */}
        <CateringSection />

        {/* 08 — FRANCHISE OPPORTUNITY */}
        <FranchiseSection />

        {/* 09 — OUTLETS & MAP */}
        <OutletsSection />

        {/* 10 — SOCIAL PROOF & REELS */}
        <SocialHubSection />
      </main>

      {/* Floating Bottom Quick-Action Drip Dock */}
      <FloatingDripDock
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenMatchmaker={() => setIsMatchmakerOpen(true)}
        onNavigate={handleNavigate}
        activeSection={activeSection}
      />

      {/* Slide-over Order Cart Modal */}
      <OrderCartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Flavor Matchmaker Quiz Modal */}
      <FlavorMatchmakerModal
        isOpen={isMatchmakerOpen}
        onClose={() => setIsMatchmakerOpen(false)}
        onSelectProduct={(product) => {
          handleAddShowStopperToCart(product);
          setIsCartOpen(true);
        }}
      />

      {/* 11 — FOOTER */}
      <Footer onNavigate={handleNavigate} />
    </ClickSpark>
  );
}

