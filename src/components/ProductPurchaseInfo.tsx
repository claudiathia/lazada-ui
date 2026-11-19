import React, { useState, useEffect } from 'react';
import {
  Star,
  Share2,
  Heart,
  ShieldCheck,
  Info,
  Minus,
  Plus,
  Ticket,
  Check,
  Clock,
  RotateCw,
  Award,
  AlertCircle,
  CheckCircle2,
  ThumbsUp,
} from 'lucide-react';
import {
  PRODUCT_TITLE,
  PRODUCT_VARIANTS,
  RED_MART_VOUCHERS,
  REPEAT_BUYER_STATS,
  ProductVariant,
  ReviewItem,
} from '../data/productData';
import { NutriGradeBadge, HealthierChoiceMark, RedMartWordmark } from './SingaporeMarks';

interface ProductPurchaseInfoProps {
  selectedVariant: ProductVariant;
  onSelectVariant: (variant: ProductVariant) => void;
  quantity: number;
  onChangeQuantity: (qty: number) => void;
  collectedVoucherIds: string[];
  onCollectVoucher: (id: string) => void;
  onAddToCart: () => void;
  onBuyNow: () => void;
  onQuickReorder: () => void;
  onShowToast: (msg: string) => void;
  reviewCount: number;
  questionCount: number;
  topReview: ReviewItem;
  cartSubtotal: number;
}

function formatCountdown(totalSeconds: number) {
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;
  return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export const ProductPurchaseInfo: React.FC<ProductPurchaseInfoProps> = ({
  selectedVariant,
  onSelectVariant,
  quantity,
  onChangeQuantity,
  collectedVoucherIds,
  onCollectVoucher,
  onAddToCart,
  onBuyNow,
  onQuickReorder,
  onShowToast,
  reviewCount,
  questionCount,
  topReview,
  cartSubtotal,
}) => {
  const [wishlisted, setWishlisted] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(842);
  const [priceMatchOpen, setPriceMatchOpen] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(REPEAT_BUYER_STATS.dealDurationSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const unitPricePerCan = (selectedVariant.price / selectedVariant.cansCount).toFixed(2);
  const unitPricePer100ml = ((selectedVariant.price / selectedVariant.volumeMl) * 100).toFixed(2);
  const savingsAmount = (selectedVariant.originalPrice - selectedVariant.price).toFixed(2);

  // Status ladder math toward RedMart Free Scheduled Delivery ($60.00)
  const freeDeliveryTarget = 60;
  const projectedTotal = Math.max(cartSubtotal, selectedVariant.price * quantity);
  const amountToFreeDelivery = Math.max(0, freeDeliveryTarget - projectedTotal);
  const ladderPct = Math.min(100, (projectedTotal / freeDeliveryTarget) * 100);

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
      }
      onShowToast('Product link copied to clipboard');
    } catch {
      onShowToast('Product link ready to share');
    }
  };

  const handleWishlist = () => {
    const next = !wishlisted;
    setWishlisted(next);
    setWishlistCount((c) => (next ? c + 1 : c - 1));
    onShowToast(next ? 'Added to My Wishlist' : 'Removed from My Wishlist');
  };

  return (
    <div className="flex flex-col">
      {/* Own Identity (Healthier Choice + Nutri-Grade B) & Recognition Strip */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
        <div className="flex flex-wrap items-center gap-2 text-[12px]">
          <RedMartWordmark size="sm" />
          <span className="text-[#9E9E9E]" aria-hidden="true">·</span>
          <a
            href="#top-drinks"
            className="inline-flex items-center gap-1 font-semibold text-[#9A6700] hover:underline"
          >
            <Award className="w-3.5 h-3.5 text-[#D49B00]" />
            <span>#1 Most Purchased Drink</span>
          </a>
        </div>
        <div className="flex items-center gap-2">
          <HealthierChoiceMark />
          <NutriGradeBadge grade="B" />
        </div>
      </div>

      {/* Product Title */}
      <h1 className="text-[20px] sm:text-[22px] font-medium text-[#212121] leading-[1.32] tracking-[-0.01em]">
        {PRODUCT_TITLE}
      </h1>

      {/* Rating, Repeat-Buyer Recognition, Share & Wishlist Row */}
      <div className="mt-2.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 text-[12px]">
          <a
            href="#reviews"
            className="inline-flex items-center gap-1 hover:underline text-[#1A9CB7]"
          >
            <span className="flex items-center gap-0.5 text-[#FACA51]" aria-label="4.9 out of 5 stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#FACA51] text-[#FACA51]" />
              ))}
            </span>
            <span className="font-semibold text-[#212121] ml-0.5 tabular-nums">4.9</span>
            <span className="text-[#1A9CB7] tabular-nums">({reviewCount.toLocaleString()} Ratings)</span>
          </a>
          <span className="text-[#DADCE0]" aria-hidden="true">|</span>
          <a href="#qa" className="text-[#1A9CB7] hover:underline tabular-nums">
            {questionCount} Answered Questions
          </a>
        </div>

        <div className="flex items-center gap-3 text-[#757575]">
          <button
            type="button"
            onClick={handleShare}
            aria-label="Share product"
            className="inline-flex items-center gap-1 text-[12px] hover:text-[#F57224] transition-colors cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Share</span>
          </button>
          <button
            type="button"
            onClick={handleWishlist}
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            className={`inline-flex items-center gap-1 text-[12px] transition-colors cursor-pointer ${
              wishlisted ? 'text-[#E4002B]' : 'hover:text-[#E4002B]'
            }`}
          >
            <Heart className={`w-4 h-4 ${wishlisted ? 'fill-[#E4002B]' : ''}`} />
            <span className="tabular-nums">{wishlistCount}</span>
          </button>
        </div>
      </div>

      {/* Brand + Social Recognition Line (R: 52 customers repurchased >2x) */}
      <div className="mt-2 text-[12px] text-[#595959] flex flex-wrap items-center gap-1.5">
        <span>Brand:</span>
        <a href="#specifications" className="text-[#1A9CB7] hover:underline font-medium">
          Coca-Cola
        </a>
        <span className="text-[#DADCE0]" aria-hidden="true">|</span>
        <span className="text-[#146B3A] font-medium tabular-nums">
          {REPEAT_BUYER_STATS.customersRepurchasedTwicePlus} customers repurchased this more than twice
        </span>
      </div>

      {/* Stickiness + Convenience Returning Buyer Strip (S + C) */}
      <div className="mt-3 px-3 py-2 bg-[#F7F9FC] border border-[#DCE3EE] rounded-[2px] flex flex-wrap items-center justify-between gap-2 text-[12px]">
        <div className="flex items-center gap-2 text-[#212121]">
          <RotateCw className="w-3.5 h-3.5 text-[#0F146D] shrink-0" />
          <span>
            You have purchased this item{' '}
            <strong className="text-[#0F146D] tabular-nums">
              {REPEAT_BUYER_STATS.userPastPurchases} times
            </strong>{' '}
            before
          </span>
        </div>
        <button
          type="button"
          onClick={onQuickReorder}
          className="text-[12px] font-semibold text-[#0F146D] hover:text-[#F57224] underline underline-offset-2 whitespace-nowrap cursor-pointer"
        >
          Buy Again (1-Click)
        </button>
      </div>

      {/* Sale / Loss Avoidance & Emotion Urgency Price Block (L + E) */}
      <div className="mt-3 py-3 border-y border-[#F2C6C6] bg-[#FFF5F5] px-3.5 rounded-[2px]">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
          <span className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#D92D20] uppercase tracking-wide">
            <span>Limited-Time RedMart Deal</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">Save ${savingsAmount}</span>
          </span>

          <div
            className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#D92D20] tabular-nums"
            aria-live="off"
          >
            <Clock className="w-3.5 h-3.5 shrink-0" />
            <span>{formatCountdown(secondsLeft)} left until deal ends</span>
          </div>
        </div>

        <div className="flex items-baseline gap-3">
          <span className="text-[31px] font-extrabold text-[#D92D20] leading-none tabular-nums">
            ${selectedVariant.price.toFixed(2)}
          </span>
          <span className="text-[14px] text-[#757575] line-through tabular-nums">
            ${selectedVariant.originalPrice.toFixed(2)}
          </span>
          <span className="px-1.5 py-0.5 bg-[#D92D20] text-white text-[12px] font-bold rounded-[2px] tabular-nums">
            -{selectedVariant.discountPercent}% OFF
          </span>
        </div>

        <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-[12px]">
          <span className="text-[#595959] tabular-nums">
            ${unitPricePerCan} / can · ${unitPricePer100ml} / 100ml
          </span>

          <div className="relative">
            <button
              type="button"
              onClick={() => setPriceMatchOpen((prev) => !prev)}
              className="inline-flex items-center gap-1 text-[#0F82A5] font-medium hover:underline cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#E4002B]" />
              <span>Price Match Guaranteed</span>
              <Info className="w-3 h-3 text-[#757575]" />
            </button>

            {priceMatchOpen && (
              <div className="absolute right-0 top-6 z-30 w-[270px] bg-white border border-[#E0E2E7] shadow-lg rounded-[3px] p-3 text-[12px] text-[#424242]">
                <div className="font-semibold text-[#212121] mb-1">
                  RedMart Price Match Guarantee
                </div>
                <p className="leading-relaxed text-[#595959]">
                  Found this identical Coca-Cola Zero Sugar carton cheaper at major Singapore
                  supermarkets? RedMart matches the difference in Store Credit.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Promotions / Vouchers Row */}
      <div className="mt-3.5 grid grid-cols-[92px_1fr] items-start gap-2 text-[13px]">
        <span className="text-[#757575] pt-1">Promotions</span>
        <div className="flex flex-wrap gap-2">
          {RED_MART_VOUCHERS.map((voucher) => {
            const collected = collectedVoucherIds.includes(voucher.id);
            return (
              <button
                key={voucher.id}
                type="button"
                onClick={() => onCollectVoucher(voucher.id)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[12px] font-medium rounded-[2px] border transition-colors cursor-pointer whitespace-nowrap ${
                  collected
                    ? 'bg-[#F4FAF5] border-[#B6DEC1] text-[#146B3A]'
                    : 'bg-[#FFF5EE] border-[#F57224]/40 text-[#F57224] hover:border-[#F57224]'
                }`}
                title={voucher.description}
              >
                {collected ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  <Ticket className="w-3.5 h-3.5" />
                )}
                <span>
                  {collected
                    ? `${voucher.title} · Collected`
                    : `${voucher.title} (Min. $${voucher.minSpend})`}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Pack Size Variant Selector */}
      <div className="mt-3.5 grid grid-cols-[92px_1fr] items-center gap-2 text-[13px]">
        <span className="text-[#757575]">Pack Size</span>
        <div className="flex flex-wrap gap-2">
          {PRODUCT_VARIANTS.map((variant) => {
            const isSelected = variant.id === selectedVariant.id;
            return (
              <button
                key={variant.id}
                type="button"
                onClick={() => onSelectVariant(variant)}
                className={`px-3 py-1.5 text-[12px] rounded-[2px] border transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'border-[#F57224] bg-[#FFF8F4] text-[#F57224] font-semibold'
                    : 'border-[#DCDFE6] bg-white text-[#424242] hover:border-[#9E9E9E]'
                }`}
              >
                {variant.shortLabel} · ${variant.price.toFixed(2)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Quantity Selector + Red Loss-Avoidance Stock Scarcity (L) */}
      <div className="mt-3.5 grid grid-cols-[92px_1fr] items-center gap-2 text-[13px]">
        <span className="text-[#757575]">Quantity</span>
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center border border-[#DCDFE6] rounded-[2px] bg-white">
            <button
              type="button"
              onClick={() => onChangeQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
              className="w-8 h-8 flex items-center justify-center text-[#595959] hover:bg-[#F5F5F5] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <input
              type="number"
              min={1}
              max={selectedVariant.stock}
              value={quantity}
              onChange={(e) => {
                const parsed = parseInt(e.target.value, 10);
                if (!Number.isNaN(parsed)) {
                  onChangeQuantity(Math.min(selectedVariant.stock, Math.max(1, parsed)));
                }
              }}
              aria-label="Quantity"
              className="w-11 h-8 text-center text-[13px] font-medium text-[#212121] border-x border-[#DCDFE6] focus:outline-none tabular-nums"
            />
            <button
              type="button"
              onClick={() => onChangeQuantity(Math.min(selectedVariant.stock, quantity + 1))}
              disabled={quantity >= selectedVariant.stock}
              aria-label="Increase quantity"
              className="w-8 h-8 flex items-center justify-center text-[#595959] hover:bg-[#F5F5F5] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
          <span className="inline-flex items-center gap-1 text-[12px] font-bold text-[#D92D20] tabular-nums">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>
              Only {selectedVariant.stock}{' '}
              {selectedVariant.id === 'case-24' ? 'cartons' : 'packs'} left at this price
            </span>
          </span>
        </div>
      </div>

      {/* Status Ladder Cue toward Free Priority Delivery (S) */}
      <div className="mt-4 pt-3 border-t border-[#F0F0F0]">
        <div className="flex items-center justify-between text-[12px] mb-1.5">
          <span className="text-[#424242]">
            {amountToFreeDelivery === 0 ? (
              <span className="text-[#146B3A] font-semibold">
                Free Scheduled Delivery unlocked ($60+ tier)
              </span>
            ) : (
              <span>
                <strong className="text-[#212121] tabular-nums">
                  ${amountToFreeDelivery.toFixed(2)}
                </strong>{' '}
                away from <strong className="text-[#146B3A]">Free Priority Delivery</strong>
              </span>
            )}
          </span>
          <span className="text-[11px] text-[#757575] tabular-nums">
            {Math.round(ladderPct)}%
          </span>
        </div>
        <div className="w-full h-1.5 bg-[#EFF0F5] rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-200 ${
              amountToFreeDelivery === 0 ? 'bg-[#146B3A]' : 'bg-[#F57224]'
            }`}
            style={{ width: `${ladderPct}%` }}
          />
        </div>
      </div>

      {/* Primary Dual CTA Row (C: Convenience) */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          type="button"
          onClick={onBuyNow}
          className="h-[46px] bg-[#2ABBE8] hover:bg-[#22A7D1] active:scale-[0.99] text-white text-[15px] font-semibold rounded-[2px] transition-all cursor-pointer whitespace-nowrap"
        >
          Buy Now
        </button>
        <button
          type="button"
          onClick={onAddToCart}
          className="h-[46px] bg-[#F57224] hover:bg-[#E06116] active:scale-[0.99] text-white text-[15px] font-semibold rounded-[2px] transition-all cursor-pointer whitespace-nowrap"
        >
          Add to Cart
        </button>
      </div>

      {/* Highlighted Top Review Inside Listing (S Status + R Recognition) */}
      <div className="mt-4 border border-[#ECEEF2] bg-[#FAFAFA] rounded-[2px] p-3">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
          <div className="flex items-center gap-1.5 text-[11px]">
            <span className="font-bold text-[#9A6700] uppercase tracking-wide">
              Top Review
            </span>
            <span className="text-[#DADCE0]" aria-hidden="true">·</span>
            <span className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-[#FACA51] text-[#FACA51]" />
              ))}
            </span>
            <span className="text-[#146B3A] font-medium inline-flex items-center gap-0.5">
              <CheckCircle2 className="w-3 h-3" />
              Verified
            </span>
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] text-[#595959] tabular-nums">
            <ThumbsUp className="w-3 h-3 text-[#F57224]" />
            {topReview.helpfulCount} found helpful
          </span>
        </div>

        <p className="text-[12px] text-[#212121] leading-snug line-clamp-2">
          “{topReview.comment}”
        </p>

        <div className="mt-1.5 flex items-center justify-between text-[11px] text-[#757575]">
          <span>
            {topReview.author} · {topReview.variant}
          </span>
          <a href="#reviews" className="text-[#1A9CB7] font-semibold hover:underline">
            See all {reviewCount.toLocaleString()} reviews ↓
          </a>
        </div>
      </div>
    </div>
  );
};
