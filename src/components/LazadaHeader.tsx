import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  ShoppingCart,
  ChevronDown,
  Smartphone,
  Package,
  HelpCircle,
  User,
  X,
  CheckCircle2,
} from 'lucide-react';
import { LazadaWordmark, RedMartWordmark } from './SingaporeMarks';
import { RELATED_SHELF_PRODUCTS, RelatedProduct } from '../data/productData';

interface LazadaHeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onQuickAddProduct: (product: RelatedProduct) => void;
  onShowToast: (msg: string) => void;
}

const SEARCH_SUGGESTIONS = [
  'Coca-Cola Zero Sugar 24 x 320ml',
  'Coca-Cola Original Taste 24 x 320ml',
  'Sprite Lemon-Lime Zero Sugar Case',
  'Pokka Jasmine Green Tea Less Sugar',
  'Dasani Drinking Water 24 x 600ml',
  'Schweppes Soda Water Mixer',
];

const REDMART_CATEGORIES = [
  'Fresh Produce',
  'Meat & Seafood',
  'Dairy & Chilled',
  'Beverages',
  'Snacks & Pantry',
  'Household',
  'Price Match',
];

export const LazadaHeader: React.FC<LazadaHeaderProps> = ({
  cartCount,
  onOpenCart,
  onQuickAddProduct,
  onShowToast,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Beverages');
  const [catMenuOpen, setCatMenuOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'none' | 'app' | 'track' | 'login' | 'care'>('none');
  const [orderLookupId, setOrderLookupId] = useState('RM-2026-88412');
  const [orderLookupResult, setOrderLookupResult] = useState<string | null>(null);
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
  const [loginEmail, setLoginEmail] = useState('');

  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredSuggestions = searchQuery.trim()
    ? SEARCH_SUGGESTIONS.filter((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
    : SEARCH_SUGGESTIONS;

  const matchedShelfProducts = searchQuery.trim()
    ? RELATED_SHELF_PRODUCTS.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchFocused(false);
    if (!searchQuery.trim()) {
      onShowToast('Showing Coca-Cola Zero Sugar (24 X 320ML) - Case on RedMart');
      return;
    }
    onShowToast(`Searched RedMart for "${searchQuery.trim()}"`);
  };

  return (
    <>
      <header className="w-full bg-white border-b border-[#E5E7EB] sticky top-0 z-40">
        {/* Top Utility Bar */}
        <div className="bg-[#F5F5F5] border-b border-[#EBEBEB]">
          <div className="max-w-[1188px] mx-auto px-4 h-[28px] flex items-center justify-end gap-5 text-[11px] text-[#595959]">
            <button
              type="button"
              onClick={() => setModalMode('app')}
              className="hover:text-[#F57224] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              SAVE MORE ON APP
            </button>
            <button
              type="button"
              onClick={() => onShowToast('Sell on Lazada SG portal opened in demo mode')}
              className="hidden sm:inline hover:text-[#F57224] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              SELL ON LAZADA
            </button>
            <button
              type="button"
              onClick={() => setModalMode('care')}
              className="hidden md:inline hover:text-[#F57224] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              CUSTOMER CARE
            </button>
            <button
              type="button"
              onClick={() => {
                setOrderLookupResult(null);
                setModalMode('track');
              }}
              className="hover:text-[#F57224] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              TRACK MY ORDER
            </button>
            {loggedInUser ? (
              <button
                type="button"
                onClick={() => setLoggedInUser(null)}
                className="text-[#0F146D] font-semibold hover:text-[#F57224] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {loggedInUser} (SIGN OUT)
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setModalMode('login')}
                  className="hover:text-[#F57224] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  LOGIN
                </button>
                <button
                  type="button"
                  onClick={() => setModalMode('login')}
                  className="hover:text-[#F57224] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  SIGN UP
                </button>
              </>
            )}
            <span className="hidden lg:inline text-[#888] whitespace-nowrap shrink-0">
              SG · EN
            </span>
          </div>
        </div>

        {/* Main Header Row */}
        <div className="max-w-[1188px] mx-auto px-4 py-3 flex items-center justify-between gap-4 md:gap-8">
          {/* Brand Zone: Lazada + RedMart */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="focus-visible:outline-2 focus-visible:outline-[#F57224] rounded"
            >
              <LazadaWordmark />
            </a>
            <span className="h-5 w-px bg-[#E0E2E7]" aria-hidden="true" />
            <a
              href="#shelf"
              className="flex items-center gap-1 hover:opacity-85 transition-opacity whitespace-nowrap shrink-0"
              title="RedMart Official Groceries on Lazada SG"
            >
              <RedMartWordmark />
            </a>
          </div>

          {/* Search Bar */}
          <div ref={searchRef} className="relative flex-1 max-w-[640px]">
            <form onSubmit={handleSearchSubmit} className="flex items-stretch h-[40px]">
              <input
                type="text"
                value={searchQuery}
                onFocus={() => setSearchFocused(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSearchFocused(true);
                }}
                placeholder="Search in RedMart (e.g. Coca-Cola, fresh milk, rice)"
                aria-label="Search in RedMart"
                className="flex-1 bg-[#EFF0F5] text-[13px] text-[#212121] placeholder-[#757575] px-4 rounded-l-[2px] border border-transparent focus:border-[#E4002B]/50 focus:bg-white focus:outline-none transition-colors"
              />
              <button
                type="submit"
                aria-label="Search"
                className="w-[46px] bg-[#F57224] hover:bg-[#E06116] text-white flex items-center justify-center rounded-r-[2px] transition-colors shrink-0 cursor-pointer"
              >
                <Search className="w-[18px] h-[18px]" />
              </button>
            </form>

            {/* Live Search Dropdown */}
            {searchFocused && (
              <div className="absolute left-0 right-0 top-[42px] bg-white border border-[#E5E7EB] shadow-lg rounded-[2px] z-50 overflow-hidden">
                <div className="px-3.5 py-2 bg-[#FAFAFA] border-b border-[#F0F0F0] flex items-center justify-between text-[11px] text-[#757575]">
                  <span>Popular in RedMart Groceries</span>
                  <button
                    type="button"
                    onClick={() => setSearchFocused(false)}
                    className="text-[#999] hover:text-[#212121] cursor-pointer"
                  >
                    Close
                  </button>
                </div>
                <ul className="divide-y divide-[#F5F5F5]">
                  {filteredSuggestions.map((item) => (
                    <li key={item}>
                      <button
                        type="button"
                        onClick={() => {
                          setSearchQuery(item);
                          setSearchFocused(false);
                          onShowToast(`Selected "${item}"`);
                        }}
                        className="w-full text-left px-3.5 py-2 text-[13px] text-[#212121] hover:bg-[#FFF5EE] hover:text-[#F57224] flex items-center justify-between transition-colors cursor-pointer"
                      >
                        <span className="truncate">{item}</span>
                        <span className="text-[11px] text-[#9E9E9E] shrink-0 ml-3">RedMart</span>
                      </button>
                    </li>
                  ))}
                </ul>
                {matchedShelfProducts.length > 0 && (
                  <div className="border-t border-[#EBEBEB] p-2.5 bg-[#FAFAFA]">
                    <div className="text-[11px] font-semibold text-[#555] mb-1.5 px-1">
                      Quick Add Matching Items
                    </div>
                    <div className="space-y-1.5">
                      {matchedShelfProducts.slice(0, 3).map((prod) => (
                        <div
                          key={prod.id}
                          className="flex items-center justify-between bg-white px-2.5 py-1.5 border border-[#ECECEC] rounded-[2px]"
                        >
                          <div className="min-w-0 pr-2">
                            <div className="text-[12px] font-medium text-[#212121] truncate">
                              {prod.title}
                            </div>
                            <div className="text-[12px] font-semibold text-[#F57224] tabular-nums">
                              ${prod.price.toFixed(2)}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              onQuickAddProduct(prod);
                              setSearchFocused(false);
                            }}
                            className="px-2.5 py-1 text-[11px] font-semibold bg-[#F57224] text-white rounded-[2px] hover:bg-[#DF6015] shrink-0 cursor-pointer"
                          >
                            + Add
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Cart Action */}
          <div className="flex items-center gap-4 shrink-0">
            <button
              type="button"
              onClick={onOpenCart}
              aria-label={`Open shopping cart with ${cartCount} items`}
              className="relative inline-flex items-center gap-2 px-3 py-2 text-[#212121] hover:text-[#F57224] transition-colors cursor-pointer"
            >
              <ShoppingCart className="w-[24px] h-[24px] stroke-[1.9]" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 left-6 min-w-[19px] h-[19px] px-1 rounded-full bg-[#F57224] text-white text-[11px] font-bold flex items-center justify-center tabular-nums">
                  {cartCount}
                </span>
              )}
              <span className="hidden lg:inline text-[13px] font-medium whitespace-nowrap shrink-0">
                Cart
              </span>
            </button>
          </div>
        </div>

        {/* RedMart Category Strip */}
        <div className="border-t border-[#F0F0F0] bg-white">
          <div className="max-w-[1188px] mx-auto px-4 h-[38px] flex items-center gap-6 overflow-x-auto text-[13px]">
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() => setCatMenuOpen((prev) => !prev)}
                className="inline-flex items-center gap-1 font-semibold text-[#0F146D] hover:text-[#F57224] py-1.5 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Categories</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {catMenuOpen && (
                <div className="absolute left-0 top-[36px] w-[220px] bg-white border border-[#E5E7EB] shadow-md rounded-[2px] py-1.5 z-50">
                  {REDMART_CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setActiveCategory(cat);
                        setCatMenuOpen(false);
                        onShowToast(`Browsing RedMart: ${cat}`);
                      }}
                      className={`w-full text-left px-4 py-2 text-[13px] hover:bg-[#FFF5EE] hover:text-[#F57224] cursor-pointer ${
                        activeCategory === cat ? 'text-[#F57224] font-semibold' : 'text-[#333]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <span className="h-3.5 w-px bg-[#E5E7EB] shrink-0" aria-hidden="true" />

            <nav className="flex items-center gap-5" aria-label="RedMart Categories">
              {REDMART_CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setActiveCategory(cat);
                      if (cat === 'Beverages') {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      } else {
                        onShowToast(`Filtered RedMart aisle: ${cat}`);
                      }
                    }}
                    className={`whitespace-nowrap shrink-0 py-1.5 border-b-2 transition-colors cursor-pointer ${
                      isActive
                        ? 'border-[#E4002B] text-[#E4002B] font-semibold'
                        : 'border-transparent text-[#424242] hover:text-[#F57224]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Lightweight Utility Modal (App / Track / Care / Login) */}
      {modalMode !== 'none' && (
        <div
          className="fixed inset-0 z-50 bg-black/45 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white w-full max-w-[420px] rounded-[4px] shadow-xl border border-[#E5E7EB] overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#EFEFEF]">
              <h3 className="text-[15px] font-bold text-[#212121] flex items-center gap-2">
                {modalMode === 'app' && (
                  <>
                    <Smartphone className="w-4 h-4 text-[#F57224]" />
                    <span>Download the Lazada App</span>
                  </>
                )}
                {modalMode === 'track' && (
                  <>
                    <Package className="w-4 h-4 text-[#F57224]" />
                    <span>Track My RedMart Order</span>
                  </>
                )}
                {modalMode === 'care' && (
                  <>
                    <HelpCircle className="w-4 h-4 text-[#F57224]" />
                    <span>Lazada & RedMart Customer Care</span>
                  </>
                )}
                {modalMode === 'login' && (
                  <>
                    <User className="w-4 h-4 text-[#F57224]" />
                    <span>Welcome to Lazada SG</span>
                  </>
                )}
              </h3>
              <button
                type="button"
                onClick={() => setModalMode('none')}
                className="text-[#757575] hover:text-[#212121] p-1 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 text-[13px] text-[#424242] space-y-4">
              {modalMode === 'app' && (
                <div className="text-center space-y-3">
                  <div className="mx-auto w-32 h-32 border border-[#E5E7EB] bg-[#FAFAFA] flex flex-col items-center justify-center rounded-[4px]">
                    <div className="grid grid-cols-5 gap-1 p-2">
                      {Array.from({ length: 25 }).map((_, idx) => (
                        <span
                          key={idx}
                          className={`w-3.5 h-3.5 ${
                            [0, 1, 2, 4, 5, 6, 10, 12, 14, 18, 20, 22, 23, 24].includes(idx)
                              ? 'bg-[#0F146D]'
                              : 'bg-transparent'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-[#595959]">
                    Scan to get app-exclusive RedMart grocery vouchers and real-time delivery alerts.
                  </p>
                </div>
              )}

              {modalMode === 'track' && (
                <div className="space-y-3">
                  <label className="block text-[12px] font-medium text-[#595959]">
                    Order Number
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={orderLookupId}
                      onChange={(e) => setOrderLookupId(e.target.value)}
                      className="flex-1 border border-[#D4D7DD] rounded-[2px] px-3 py-2 text-[13px] font-mono"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setOrderLookupResult(
                          `Order ${orderLookupId || 'RM-2026-88412'}: Packed at RedMart West Fulfillment Centre · Scheduled Tomorrow 10:00 AM – 12:00 PM.`
                        )
                      }
                      className="px-4 py-2 bg-[#F57224] text-white font-semibold rounded-[2px] hover:bg-[#DE6118] cursor-pointer"
                    >
                      Track
                    </button>
                  </div>
                  {orderLookupResult && (
                    <div className="p-3 bg-[#F4FAF5] border border-[#CBE5D1] rounded-[2px] text-[12px] text-[#146B3A] flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{orderLookupResult}</span>
                    </div>
                  )}
                </div>
              )}

              {modalMode === 'care' && (
                <div className="space-y-2.5">
                  <p>
                    <strong>RedMart Freshness & Damage Guarantee:</strong> Received a dented can or
                    missing item? Report within 7 days for an instant RedMart credit or replacement.
                  </p>
                  <p className="text-[#757575]">
                    Daily Support Hours: 7:00 AM – 11:00 PM SGT (Live Chat & Order Help).
                  </p>
                </div>
              )}

              {modalMode === 'login' && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const name = loginEmail.trim() || 'Shopper SG';
                    setLoggedInUser(name.split('@')[0]);
                    setModalMode('none');
                    onShowToast(`Signed in as ${name.split('@')[0]}`);
                  }}
                  className="space-y-3"
                >
                  <div>
                    <label className="block text-[12px] font-medium text-[#595959] mb-1">
                      Phone Number or Email
                    </label>
                    <input
                      type="text"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="e.g. shopper@example.sg"
                      className="w-full border border-[#D4D7DD] rounded-[2px] px-3 py-2 text-[13px] focus:outline-none focus:border-[#F57224]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#F57224] hover:bg-[#E06116] text-white font-semibold rounded-[2px] cursor-pointer"
                  >
                    Continue
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
