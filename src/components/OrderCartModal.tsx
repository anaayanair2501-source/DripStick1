import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles, Check, MapPin, Clock } from 'lucide-react';
import { CartItem } from '../types';
import { soundEffects } from '../utils/soundEffects';

interface OrderCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const OrderCartModal: React.FC<OrderCartModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [orderType, setOrderType] = useState<'pickup' | 'delivery'>('pickup');
  const [selectedOutlet, setSelectedOutlet] = useState('Bandra West, Mumbai');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponMessage, setCouponMessage] = useState('');
  const [isOrdered, setIsOrdered] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.totalPrice * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const packagingFee = subtotal > 0 ? 15 : 0;
  const deliveryFee = orderType === 'delivery' && subtotal > 0 ? 40 : 0;
  const finalTotal = subtotal - discountAmount + packagingFee + deliveryFee;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'DRIP15') {
      soundEffects.playChime();
      setDiscountPercent(15);
      setCouponMessage('15% First Dip discount applied!');
    } else if (couponCode.toUpperCase() === 'STICKLOVE') {
      soundEffects.playChime();
      setDiscountPercent(20);
      setCouponMessage('20% VIP Club discount applied!');
    } else {
      setCouponMessage('Invalid code. Try DRIP15 or STICKLOVE');
    }
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    soundEffects.playChime();
    setIsOrdered(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-xs">
      <div className="bg-[#FDF8F2] w-full max-w-lg h-full overflow-y-auto shadow-2xl flex flex-col justify-between border-l-2 border-[#4A2C2A]/20 animate-slide-left">
        
        {/* Modal Top Header */}
        <div className="p-6 border-b border-[#4A2C2A]/10 bg-white sticky top-0 z-20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#4A2C2A] text-[#FDF8F2] flex items-center justify-center font-black text-sm">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-brand font-black text-xl text-[#4A2C2A]">
                YOUR DRIP BAG
              </h2>
              <p className="text-[11px] text-[#4A2C2A]/60 font-semibold">
                {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in bag
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundEffects.playDip();
              onClose();
            }}
            className="w-9 h-9 rounded-full bg-[#FDF8F2] hover:bg-[#4A2C2A]/10 text-[#4A2C2A] flex items-center justify-center font-bold transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Main Content */}
        <div className="p-6 flex-1 space-y-6">
          
          {isOrdered ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto text-3xl font-black">
                ✓
              </div>
              <h3 className="font-brand font-black text-2xl text-[#4A2C2A]">
                Waffles Dipping Now!
              </h3>
              <p className="text-xs text-[#4A2C2A]/80 max-w-xs mx-auto leading-relaxed">
                Thank you <strong>{contactName || 'Valued Guest'}</strong>! Order #DS-{Math.floor(1000 + Math.random() * 9000)} is being prepared fresh at 45°C.
              </p>
              <div className="p-4 rounded-2xl bg-white border border-[#4A2C2A]/10 text-xs text-left space-y-1">
                <p><strong>Order Type:</strong> {orderType.toUpperCase()}</p>
                <p><strong>Outlet:</strong> {selectedOutlet}</p>
                <p><strong>Estimated Ready Time:</strong> ~8 minutes</p>
                <p><strong>Total Amount:</strong> ₹{finalTotal}</p>
              </div>
              <button
                onClick={() => {
                  onClearCart();
                  setIsOrdered(false);
                  onClose();
                }}
                className="w-full py-3.5 bg-[#4A2C2A] text-white rounded-full font-bold text-xs uppercase tracking-widest shadow-md hover:bg-[#361E1C]"
              >
                Done & Return to Menu
              </button>
            </div>
          ) : (
            <>
              {/* Order Type Toggle (Pickup vs Delivery) */}
              <div className="flex p-1 rounded-full bg-white border border-[#4A2C2A]/15">
                <button
                  onClick={() => setOrderType('pickup')}
                  className={`flex-1 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${
                    orderType === 'pickup'
                      ? 'bg-[#4A2C2A] text-[#FDF8F2] shadow-xs'
                      : 'text-[#4A2C2A]/70 hover:text-[#4A2C2A]'
                  }`}
                >
                  ⚡ Express Pickup (0 Min Wait)
                </button>
                <button
                  onClick={() => setOrderType('delivery')}
                  className={`flex-1 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${
                    orderType === 'delivery'
                      ? 'bg-[#4A2C2A] text-[#FDF8F2] shadow-xs'
                      : 'text-[#4A2C2A]/70 hover:text-[#4A2C2A]'
                  }`}
                >
                  🛵 Thermal Delivery
                </button>
              </div>

              {/* Outlet or Delivery Location */}
              {orderType === 'pickup' ? (
                <div className="p-4 rounded-2xl bg-white border border-[#4A2C2A]/10 space-y-2">
                  <label className="block text-[11px] font-bold text-[#4A2C2A]">
                    Select Pickup Counter:
                  </label>
                  <select
                    value={selectedOutlet}
                    onChange={(e) => setSelectedOutlet(e.target.value)}
                    className="w-full p-2.5 bg-[#FDF8F2] border border-[#4A2C2A]/15 rounded-xl text-xs text-[#4A2C2A] focus:outline-none"
                  >
                    <option value="Bandra West, Mumbai">Bandra West (Pali Hill), Mumbai</option>
                    <option value="Juhu Tara Road, Mumbai">Juhu Beach Road, Mumbai</option>
                    <option value="Indiranagar 100ft, Bangalore">Indiranagar 100ft Rd, Bangalore</option>
                    <option value="FC Road, Pune">FC Road, Pune</option>
                    <option value="CyberHub, Gurgaon">CyberHub, Gurgaon</option>
                  </select>
                  <p className="text-[10px] text-[#D2916C] font-bold flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Ready in 5-8 mins after order placement
                  </p>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-white border border-[#4A2C2A]/10 space-y-2">
                  <label className="block text-[11px] font-bold text-[#4A2C2A]">
                    Delivery Address:
                  </label>
                  <input
                    type="text"
                    required
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Building, Street, Landmark..."
                    className="w-full p-2.5 bg-[#FDF8F2] border border-[#4A2C2A]/15 rounded-xl text-xs text-[#4A2C2A] focus:outline-none"
                  />
                  <p className="text-[10px] text-[#4A2C2A]/60">
                    *Delivered in insulated heated thermal boxes to preserve crispness.
                  </p>
                </div>
              )}

              {/* Cart Items List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-xs uppercase tracking-wider text-[#4A2C2A]">
                    Items in Bag
                  </h3>
                  {cartItems.length > 0 && (
                    <button
                      onClick={onClearCart}
                      className="text-[11px] text-rose-600 hover:underline font-semibold"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                {cartItems.length === 0 ? (
                  <div className="p-8 text-center bg-white rounded-2xl border border-[#4A2C2A]/10 space-y-3">
                    <span className="text-4xl">🧇</span>
                    <p className="font-bold text-sm text-[#4A2C2A]">Your Drip Bag is Empty</p>
                    <p className="text-xs text-[#4A2C2A]/70">
                      Explore our Show Stoppers or build your custom waffle stick to get started!
                    </p>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl bg-white border border-[#4A2C2A]/10 flex items-center justify-between gap-3 shadow-xs"
                    >
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase text-white bg-[#4A2C2A] px-2 py-0.5 rounded-md">
                            {item.isCustom ? 'Custom' : 'Special'}
                          </span>
                          <h4 className="font-bold text-xs text-[#4A2C2A]">{item.title}</h4>
                        </div>
                        <p className="text-[10px] text-[#4A2C2A]/70 leading-tight">
                          {item.subtitle}
                        </p>
                        <p className="font-display font-black text-xs text-[#4A2C2A]">
                          ₹{item.totalPrice * item.quantity} (₹{item.totalPrice} ea)
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 bg-[#FDF8F2] px-2 py-1 rounded-full border border-[#4A2C2A]/10">
                        <button
                          onClick={() => {
                            soundEffects.playDip();
                            if (item.quantity > 1) {
                              onUpdateQuantity(item.id, item.quantity - 1);
                            } else {
                              onRemoveItem(item.id);
                            }
                          }}
                          className="w-6 h-6 rounded-full flex items-center justify-center text-[#4A2C2A] hover:bg-[#4A2C2A]/10 font-bold"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-[#4A2C2A] min-w-[14px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => {
                            soundEffects.playDip();
                            onUpdateQuantity(item.id, item.quantity + 1);
                          }}
                          className="w-6 h-6 rounded-full flex items-center justify-center text-[#4A2C2A] hover:bg-[#4A2C2A]/10 font-bold"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => {
                          soundEffects.playDip();
                          onRemoveItem(item.id);
                        }}
                        className="text-[#4A2C2A]/40 hover:text-rose-600 transition-colors p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Coupon Code Section */}
              {cartItems.length > 0 && (
                <div className="p-4 rounded-2xl bg-white border border-[#4A2C2A]/10 space-y-2">
                  <label className="block text-[11px] font-bold text-[#4A2C2A]">
                    Promo Code (Try <span className="text-[#D2916C]">DRIP15</span> or <span className="text-[#D2916C]">STICKLOVE</span>)
                  </label>
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter promo code"
                      className="flex-1 p-2.5 bg-[#FDF8F2] border border-[#4A2C2A]/15 rounded-xl text-xs uppercase font-bold text-[#4A2C2A] focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#4A2C2A] text-white text-xs font-bold uppercase rounded-xl hover:bg-[#361E1C]"
                    >
                      Apply
                    </button>
                  </form>
                  {couponMessage && (
                    <p className={`text-[11px] font-bold ${discountPercent > 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                      {couponMessage}
                    </p>
                  )}
                </div>
              )}

              {/* Guest Details */}
              {cartItems.length > 0 && (
                <div className="p-4 rounded-2xl bg-white border border-[#4A2C2A]/10 space-y-3">
                  <h4 className="font-bold text-xs text-[#4A2C2A] uppercase">
                    Guest Contact Details
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Your Name *"
                      className="p-2.5 bg-[#FDF8F2] border border-[#4A2C2A]/15 rounded-xl text-xs text-[#4A2C2A] focus:outline-none"
                    />
                    <input
                      type="tel"
                      required
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="Phone Number *"
                      className="p-2.5 bg-[#FDF8F2] border border-[#4A2C2A]/15 rounded-xl text-xs text-[#4A2C2A] focus:outline-none"
                    />
                  </div>
                </div>
              )}
            </>
          )}

        </div>

        {/* Modal Bottom Checkout Bar */}
        {cartItems.length > 0 && !isOrdered && (
          <div className="p-6 bg-white border-t border-[#4A2C2A]/10 sticky bottom-0 z-20 space-y-3">
            <div className="space-y-1.5 text-xs text-[#4A2C2A]/80">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-bold text-[#4A2C2A]">₹{subtotal}</span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Promo Discount ({discountPercent}%):</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Packaging & Hot Sticks:</span>
                <span>₹{packagingFee}</span>
              </div>
              {orderType === 'delivery' && (
                <div className="flex justify-between">
                  <span>Insulated Delivery:</span>
                  <span>₹{deliveryFee}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-black text-[#4A2C2A] pt-2 border-t border-[#4A2C2A]/10">
                <span>To Pay:</span>
                <span className="font-display text-2xl text-[#4A2C2A]">₹{finalTotal}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={!contactPhone || !contactName}
              className="w-full py-4 bg-[#4A2C2A] text-white rounded-full font-bold text-xs uppercase tracking-widest shadow-lg hover:bg-[#361E1C] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all active:scale-98"
            >
              <span>CONFIRM & PLACE ORDER (₹{finalTotal})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            {(!contactPhone || !contactName) && (
              <p className="text-[10px] text-center text-[#4A2C2A]/60 font-semibold">
                Please enter your name and phone number above to proceed.
              </p>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
