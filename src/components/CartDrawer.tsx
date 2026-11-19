import React, { useState } from 'react';
import {
  X,
  Trash2,
  Minus,
  Plus,
  Truck,
  ShoppingBag,
  CheckCircle2,
  Ticket,
} from 'lucide-react';
import {
  DeliverySlot,
  RED_MART_VOUCHERS,
  SINGAPORE_AREAS,
} from '../data/productData';
import { RedMartWordmark, ShelfBeverageIllustration } from './SingaporeMarks';

export interface CartItem {
  id: string;
  title: string;
  variantLabel: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image?: string;
  svgType?: 'schweppes' | 'pokka' | 'dasani';
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  collectedVoucherIds: string[];
  selectedArea: (typeof SINGAPORE_AREAS)[number];
  selectedSlot: DeliverySlot;
  onClearCart: () => void;
}

const FREE_DELIVERY_THRESHOLD = 60;
const STANDARD_DELIVERY_FEE = 3.99;

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  collectedVoucherIds,
  selectedArea,
  selectedSlot,
  onClearCart,
}) => {
  const [checkoutSuccessOrder, setCheckoutSuccessOrder] = useState<string | null>(null);
  const [recipientName, setRecipientName] = useState('Tan Wei Ming');
  const [unitNumber, setUnitNumber] = useState('#08-14');
  const [phoneNumber, setPhoneNumber] = useState('9123 4567');
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const remainingForFree = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const progressPct = Math.min(100, (subtotal / FREE_DELIVERY_THRESHOLD) * 100);
  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD || subtotal === 0 ? 0 : STANDARD_DELIVERY_FEE;

  // Apply highest eligible collected voucher
  const eligibleVouchers = RED_MART_VOUCHERS.filter(
    (v) => collectedVoucherIds.includes(v.id) && subtotal >= v.minSpend
  );
  const appliedVoucher = eligibleVouchers.sort((a, b) => b.discountAmount - a.discountAmount)[0];
  const voucherDiscount = appliedVoucher ? appliedVoucher.discountAmount : 0;
  const grandTotal = Math.max(0, subtotal - voucherDiscount + deliveryFee);

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const orderNum = `RM-2026-${Math.floor(10000 + Math.random() * 89999)}`;
    setCheckoutSuccessOrder(orderNum);
    setShowCheckoutForm(false);
    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label="Shopping Cart">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/45 transition-opacity"
        onClick={() => {
          setCheckoutSuccessOrder(null);
          setShowCheckoutForm(false);
          onClose();
        }}
      />

      {/* Drawer Panel */}
      <div className="relative z-10 w-full max-w-[440px] bg-white h-full flex flex-col shadow-2xl">
        {/* Drawer Header */}
        <div className="px-5 py-4 border-b border-[#ECEEF2] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <RedMartWordmark size="sm" />
            <span className="text-[15px] font-bold text-[#212121]">
              Shopping Cart ({totalCount})
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              setCheckoutSuccessOrder(null);
              setShowCheckoutForm(false);
              onClose();
            }}
            aria-label="Close cart"
            className="p-1.5 text-[#757575] hover:text-[#212121] rounded cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Progress Bar */}
        {!checkoutSuccessOrder && (
          <div className="px-5 py-3 bg-[#F7F9FC] border-b border-[#ECEEF2]">
            <div className="flex items-center justify-between text-[12px] mb-1.5">
              <span className="inline-flex items-center gap-1.5 font-medium text-[#212121]">
                <Truck className="w-4 h-4 text-[#E4002B]" />
                {remainingForFree === 0 && subtotal > 0 ? (
                  <span className="text-[#146B3A] font-semibold">
                    Unlocked FREE RedMart Scheduled Delivery!
                  </span>
                ) : (
                  <span>
                    Add <strong className="text-[#F57224] tabular-nums">${remainingForFree.toFixed(2)}</strong> more for FREE delivery
                  </span>
                )}
              </span>
              <span className="text-[11px] text-[#757575] tabular-nums">$60 min.</span>
            </div>
            <div className="w-full h-1.5 bg-[#E2E6EE] rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  remainingForFree === 0 && subtotal > 0 ? 'bg-[#146B3A]' : 'bg-[#F57224]'
                }`}
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        )}

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {checkoutSuccessOrder ? (
            <div className="py-10 px-4 text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#F4FAF5] border border-[#CBE5D1] flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-[#146B3A]" />
              </div>
              <div>
                <h3 className="text-[18px] font-bold text-[#212121]">
                  Order #{checkoutSuccessOrder} Confirmed
                </h3>
                <p className="text-[13px] text-[#595959] mt-1">
                  Your RedMart grocery order is scheduled for{' '}
                  <strong>
                    {selectedSlot.dayLabel} ({selectedSlot.dateLabel}), {selectedSlot.windowLabel}
                  </strong>
                  .
                </p>
              </div>
              <div className="bg-[#FAFAFA] border border-[#ECEEF2] rounded-[2px] p-3.5 text-left text-[12px] text-[#424242] space-y-1">
                <div>
                  <span className="text-[#757575]">Recipient:</span>{' '}
                  <strong>{recipientName}</strong> ({phoneNumber})
                </div>
                <div>
                  <span className="text-[#757575]">Address:</span> Singapore {selectedArea.postal},{' '}
                  {selectedArea.district}, {unitNumber}
                </div>
                <div>
                  <span className="text-[#757575]">Status:</span>{' '}
                  <span className="text-[#146B3A] font-semibold">Preparing Shipment at RedMart SG</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setCheckoutSuccessOrder(null);
                  onClose();
                }}
                className="w-full py-2.5 bg-[#F57224] hover:bg-[#E06116] text-white font-semibold text-[13px] rounded-[2px] cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <ShoppingBag className="w-12 h-12 text-[#D0D4DC] mx-auto" />
              <div className="text-[14px] font-medium text-[#424242]">
                Your RedMart cart is empty
              </div>
              <p className="text-[12px] text-[#757575]">
                Add Coca-Cola Zero Sugar cases or beverages from the shelf to get started.
              </p>
            </div>
          ) : showCheckoutForm ? (
            <form id="redmart-checkout-form" onSubmit={handleConfirmOrder} className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-[14px] font-bold text-[#212121]">
                  RedMart Express Checkout
                </h3>
                <button
                  type="button"
                  onClick={() => setShowCheckoutForm(false)}
                  className="text-[12px] text-[#1A9CB7] hover:underline cursor-pointer"
                >
                  Back to Cart
                </button>
              </div>

              <div className="bg-[#FAFAFA] border border-[#ECEEF2] rounded-[2px] p-3 text-[12px] space-y-1">
                <div className="font-semibold text-[#212121]">Scheduled Delivery Slot</div>
                <div className="text-[#595959]">
                  {selectedSlot.dayLabel} ({selectedSlot.dateLabel}) · {selectedSlot.windowLabel}
                </div>
                <div className="text-[#757575]">
                  Singapore, {selectedArea.region}, {selectedArea.district}, {selectedArea.postal}
                </div>
              </div>

              <div className="space-y-3 text-[13px]">
                <div>
                  <label className="block text-[12px] font-medium text-[#595959] mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="w-full border border-[#DCDFE6] rounded-[2px] px-3 py-2 text-[13px] focus:outline-none focus:border-[#F57224]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[12px] font-medium text-[#595959] mb-1">
                      Unit / Floor
                    </label>
                    <input
                      type="text"
                      required
                      value={unitNumber}
                      onChange={(e) => setUnitNumber(e.target.value)}
                      className="w-full border border-[#DCDFE6] rounded-[2px] px-3 py-2 text-[13px] focus:outline-none focus:border-[#F57224]"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-medium text-[#595959] mb-1">
                      SG Mobile (+65)
                    </label>
                    <input
                      type="text"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full border border-[#DCDFE6] rounded-[2px] px-3 py-2 text-[13px] focus:outline-none focus:border-[#F57224] tabular-nums"
                    />
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <div className="divide-y divide-[#F0F0F0]">
              {items.map((item) => (
                <div key={item.id} className="py-3.5 first:pt-0 flex gap-3">
                  <div className="w-[72px] h-[72px] border border-[#ECEEF2] rounded-[2px] bg-white p-1 shrink-0">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain"
                      />
                    ) : item.svgType ? (
                      <ShelfBeverageIllustration type={item.svgType} />
                    ) : null}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-[13px] font-medium text-[#212121] leading-snug line-clamp-2">
                        {item.title}
                      </h4>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.id)}
                        aria-label={`Remove ${item.title}`}
                        className="text-[#9E9E9E] hover:text-[#E4002B] p-0.5 shrink-0 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-[11px] text-[#757575] mt-0.5">{item.variantLabel}</div>
                    <div className="mt-2.5 flex items-center justify-between">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-[15px] font-bold text-[#F57224] tabular-nums">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        <span className="text-[11px] text-[#9E9E9E] tabular-nums">
                          (${item.price.toFixed(2)} ea)
                        </span>
                      </div>

                      <div className="inline-flex items-center border border-[#DCDFE6] rounded-[2px]">
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                          aria-label="Decrease item quantity"
                          className="w-7 h-7 flex items-center justify-center text-[#595959] hover:bg-[#F5F5F5] cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-[12px] font-medium tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                          aria-label="Increase item quantity"
                          className="w-7 h-7 flex items-center justify-center text-[#595959] hover:bg-[#F5F5F5] cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Totals */}
        {items.length > 0 && !checkoutSuccessOrder && (
          <div className="p-5 border-t border-[#ECEEF2] bg-[#FAFAFA] space-y-3">
            <div className="space-y-1.5 text-[13px] tabular-nums">
              <div className="flex justify-between text-[#595959]">
                <span>Subtotal ({totalCount} items)</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#595959]">
                <span>RedMart Delivery Fee</span>
                <span>
                  {deliveryFee === 0 ? (
                    <span className="text-[#146B3A] font-semibold">FREE</span>
                  ) : (
                    `$${deliveryFee.toFixed(2)}`
                  )}
                </span>
              </div>
              {appliedVoucher && (
                <div className="flex justify-between text-[#146B3A]">
                  <span className="inline-flex items-center gap-1">
                    <Ticket className="w-3.5 h-3.5" />
                    Voucher ({appliedVoucher.code})
                  </span>
                  <span>-${voucherDiscount.toFixed(2)}</span>
                </div>
              )}
              <div className="pt-2 border-t border-[#E5E7EB] flex justify-between items-baseline">
                <span className="font-bold text-[#212121]">Total</span>
                <span className="text-[20px] font-bold text-[#F57224]">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {showCheckoutForm ? (
              <button
                type="submit"
                form="redmart-checkout-form"
                className="w-full h-[44px] bg-[#146B3A] hover:bg-[#10572F] text-white font-semibold text-[14px] rounded-[2px] transition-colors cursor-pointer"
              >
                Place Order · ${grandTotal.toFixed(2)}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setShowCheckoutForm(true)}
                className="w-full h-[44px] bg-[#F57224] hover:bg-[#E06116] text-white font-semibold text-[14px] rounded-[2px] transition-colors cursor-pointer"
              >
                Proceed to Checkout ({totalCount})
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
