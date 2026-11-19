/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback, useEffect } from 'react';
import { ChevronRight, CheckCircle2 } from 'lucide-react';
import {
  PRODUCT_TITLE,
  PRODUCT_VARIANTS,
  SINGAPORE_AREAS,
  DELIVERY_SLOTS,
  INITIAL_REVIEWS,
  INITIAL_QUESTIONS,
  ProductVariant,
  RelatedProduct,
  QuestionItem,
} from './data/productData';
import { LazadaHeader } from './components/LazadaHeader';
import { ProductGallery } from './components/ProductGallery';
import { ProductPurchaseInfo } from './components/ProductPurchaseInfo';
import { DeliverySellerSidebar } from './components/DeliverySellerSidebar';
import { ProductDetailsSection } from './components/ProductDetailsSection';
import { ReviewsSection } from './components/ReviewsSection';
import { QuestionsSection } from './components/QuestionsSection';
import { RelatedShelf } from './components/RelatedShelf';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { LazadaFooter } from './components/LazadaFooter';

export default function App() {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(PRODUCT_VARIANTS[0]);
  const [galleryIndex, setGalleryIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [collectedVoucherIds, setCollectedVoucherIds] = useState<string[]>([]);
  const [selectedArea, setSelectedArea] = useState(SINGAPORE_AREAS[0]);
  const [selectedSlot, setSelectedSlot] = useState(DELIVERY_SLOTS[0]);

  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: PRODUCT_VARIANTS[0].id,
      title: PRODUCT_TITLE,
      variantLabel: PRODUCT_VARIANTS[0].label,
      price: PRODUCT_VARIANTS[0].price,
      originalPrice: PRODUCT_VARIANTS[0].originalPrice,
      quantity: 1,
      image: PRODUCT_VARIANTS[0].image,
    },
  ]);
  const [cartOpen, setCartOpen] = useState(false);

  const [helpfulClickedIds, setHelpfulClickedIds] = useState<string[]>([]);
  const [questions, setQuestions] = useState<QuestionItem[]>(INITIAL_QUESTIONS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
  }, []);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 2600);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const handleSelectVariant = (variant: ProductVariant) => {
    setSelectedVariant(variant);
    setQuantity(1);
    if (variant.id === 'case-24') setGalleryIndex(0);
    else if (variant.id === 'pack-12') setGalleryIndex(2);
    else if (variant.id === 'pack-6') setGalleryIndex(1);
  };

  const handleCollectVoucher = (voucherId: string) => {
    setCollectedVoucherIds((prev) => {
      if (prev.includes(voucherId)) {
        showToast('Voucher already collected in your wallet');
        return prev;
      }
      showToast('RedMart voucher collected — auto-applied at checkout');
      return [...prev, voucherId];
    });
  };

  const addMainProductToCart = (openDrawerAfter: boolean) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === selectedVariant.id);
      if (existing) {
        return prev.map((item) =>
          item.id === selectedVariant.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: selectedVariant.id,
          title: PRODUCT_TITLE,
          variantLabel: selectedVariant.label,
          price: selectedVariant.price,
          originalPrice: selectedVariant.originalPrice,
          quantity,
          image: selectedVariant.image,
        },
      ];
    });
    showToast(`Added ${quantity} × ${selectedVariant.shortLabel} to RedMart Cart`);
    if (openDrawerAfter) {
      setCartOpen(true);
    }
  };

  const handleQuickAddRelated = (product: RelatedProduct) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          variantLabel: 'Case',
          price: product.price,
          originalPrice: product.originalPrice,
          quantity: 1,
          image: product.image,
          svgType: product.svgType,
        },
      ];
    });
    showToast(`Added "${product.title}" to RedMart Cart`);
  };

  const handleUpdateCartQty = (id: string, nextQty: number) => {
    if (nextQty <= 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== id));
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: nextQty } : item))
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleToggleHelpful = (reviewId: string) => {
    setHelpfulClickedIds((prev) =>
      prev.includes(reviewId)
        ? prev.filter((id) => id !== reviewId)
        : [...prev, reviewId]
    );
  };

  const handleSubmitQuestion = (text: string) => {
    const newQ: QuestionItem = {
      id: `q-${Date.now()}`,
      question: text,
      askedBy: 'Shopper SG',
      askedDate: 'Today',
      answer:
        'Thank you for your question! Our RedMart Singapore operations team guarantees fresh stock with minimum 4 months shelf life and careful doorstep handling.',
      answeredBy: 'RedMart Official',
      answeredDate: 'Just now',
    };
    setQuestions((prev) => [newQ, ...prev]);
    showToast('Question posted and answered by RedMart Official');
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleQuickReorder = () => {
    const usualCase = PRODUCT_VARIANTS[0];
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === usualCase.id);
      if (existing) {
        return prev.map((item) =>
          item.id === usualCase.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: usualCase.id,
          title: PRODUCT_TITLE,
          variantLabel: usualCase.label,
          price: usualCase.price,
          originalPrice: usualCase.originalPrice,
          quantity: 1,
          image: usualCase.image,
        },
      ];
    });
    showToast(`1-Click Reorder: Added ${usualCase.shortLabel} to RedMart Cart`);
    setCartOpen(true);
  };

  return (
    <div id="top" className="min-h-screen bg-[#EFF0F5] text-[#212121] flex flex-col">
      {/* Top Lazada + RedMart Header */}
      <LazadaHeader
        cartCount={totalCartCount}
        onOpenCart={() => setCartOpen(true)}
        onQuickAddProduct={handleQuickAddRelated}
        onShowToast={showToast}
      />

      {/* Main Content Container */}
      <main className="flex-1 max-w-[1188px] w-full mx-auto px-4 pt-3 pb-20 lg:pb-8 space-y-4">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-[12px] text-[#757575]">
          <a href="#top" className="text-[#1A9CB7] hover:underline">
            Home
          </a>
          <ChevronRight className="w-3.5 h-3.5 text-[#9E9E9E]" />
          <a href="#shelf" className="text-[#1A9CB7] hover:underline">
            Groceries
          </a>
          <ChevronRight className="w-3.5 h-3.5 text-[#9E9E9E]" />
          <a href="#shelf" className="text-[#1A9CB7] hover:underline">
            Beverages
          </a>
          <ChevronRight className="w-3.5 h-3.5 text-[#9E9E9E]" />
          <a href="#shelf" className="text-[#1A9CB7] hover:underline">
            Carbonated Drinks
          </a>
          <ChevronRight className="w-3.5 h-3.5 text-[#9E9E9E]" />
          <span className="text-[#757575] truncate max-w-[360px] sm:max-w-none">
            {PRODUCT_TITLE}
          </span>
        </nav>

        {/* Primary 3-Column PDP Card */}
        <section className="bg-white rounded-[2px] border border-[#ECEEF2] grid grid-cols-1 lg:grid-cols-[356px_1fr_322px]">
          {/* Left Column: Product Gallery */}
          <div className="p-4">
            <ProductGallery
              activeIndex={galleryIndex}
              onSelectIndex={setGalleryIndex}
            />
          </div>

          {/* Middle Column: Core Info & Purchase Controls */}
          <div className="p-4 lg:py-5 lg:px-5 border-t lg:border-t-0 border-[#ECEEF2]">
            <ProductPurchaseInfo
              selectedVariant={selectedVariant}
              onSelectVariant={handleSelectVariant}
              quantity={quantity}
              onChangeQuantity={setQuantity}
              collectedVoucherIds={collectedVoucherIds}
              onCollectVoucher={handleCollectVoucher}
              onAddToCart={() => addMainProductToCart(false)}
              onBuyNow={() => addMainProductToCart(true)}
              onQuickReorder={handleQuickReorder}
              onShowToast={showToast}
              reviewCount={1482}
              questionCount={questions.length}
              topReview={INITIAL_REVIEWS[0]}
              cartSubtotal={cartSubtotal}
            />
          </div>

          {/* Right Column: Delivery Options, Return & Sold By RedMart */}
          <DeliverySellerSidebar
            selectedArea={selectedArea}
            onSelectArea={setSelectedArea}
            selectedSlot={selectedSlot}
            onSelectSlot={setSelectedSlot}
            onShowToast={showToast}
          />
        </section>

        {/* Bumped-up Ratings & Reviews (Status & Recognition) */}
        <ReviewsSection
          reviews={INITIAL_REVIEWS}
          onToggleHelpful={handleToggleHelpful}
          helpfulClickedIds={helpfulClickedIds}
        />

        {/* Product Details, Nutrition & Specifications */}
        <ProductDetailsSection />

        {/* Questions About This Product */}
        <QuestionsSection
          questions={questions}
          onSubmitQuestion={handleSubmitQuestion}
        />

        {/* Top 5 Most Purchased Drinks & Related RedMart Shelf */}
        <RelatedShelf
          onAddProduct={handleQuickAddRelated}
          onAddCurrentProduct={() => addMainProductToCart(false)}
          onShowToast={showToast}
        />
      </main>

      <LazadaFooter />

      {/* Mobile Sticky Bottom Buy Bar (< 15% viewport height) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-[#E5E7EB] px-3 py-2 flex items-center gap-2 shadow-[0_-2px_10px_rgba(0,0,0,0.06)]">
        <div className="pr-2 shrink-0">
          <div className="text-[11px] text-[#757575] leading-none">Price</div>
          <div className="text-[16px] font-bold text-[#F57224] tabular-nums leading-tight">
            ${selectedVariant.price.toFixed(2)}
          </div>
        </div>
        <button
          type="button"
          onClick={() => addMainProductToCart(true)}
          className="flex-1 h-[40px] bg-[#2ABBE8] text-white text-[13px] font-semibold rounded-[2px] cursor-pointer"
        >
          Buy Now
        </button>
        <button
          type="button"
          onClick={() => addMainProductToCart(false)}
          className="flex-1 h-[40px] bg-[#F57224] text-white text-[13px] font-semibold rounded-[2px] cursor-pointer"
        >
          Add to Cart
        </button>
      </div>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        collectedVoucherIds={collectedVoucherIds}
        selectedArea={selectedArea}
        selectedSlot={selectedSlot}
        onClearCart={() => setCartItems([])}
      />

      {/* Crisp Feedback Toast */}
      {toastMessage && (
        <div
          role="status"
          className="fixed bottom-16 lg:bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#212121] text-white text-[13px] px-4 py-2.5 rounded-[3px] shadow-lg flex items-center gap-2 whitespace-nowrap"
        >
          <CheckCircle2 className="w-4 h-4 text-[#8CC63F] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
