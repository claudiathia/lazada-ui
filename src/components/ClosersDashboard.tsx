import React, { useState, useEffect } from 'react';
import {
  Star,
  Clock,
  RotateCw,
  Award,
  AlertCircle,
  ThumbsUp,
  CheckCircle2,
  Trophy,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Table2,
  ExternalLink,
} from 'lucide-react';
import {
  CLOSERS_CLICK_POINTS,
  ClosersClickPoint,
} from '../data/closersData';
import {
  PRODUCT_TITLE,
  PRODUCT_VARIANTS,
  REPEAT_BUYER_STATS,
  INITIAL_REVIEWS,
  TOP_FIVE_DRINKS,
} from '../data/productData';
import { HealthierChoiceMark, NutriGradeBadge, RedMartWordmark } from './SingaporeMarks';

interface ClosersDashboardProps {
  onOpenFullPdp: (scrollToAnchor?: string) => void;
  onAddCaseToCart: () => void;
  onShowToast: (msg: string) => void;
}

function formatTimer(totalSeconds: number) {
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;
  return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export const ClosersDashboard: React.FC<ClosersDashboardProps> = ({
  onOpenFullPdp,
  onAddCaseToCart,
  onShowToast,
}) => {
  const [selectedPointNum, setSelectedPointNum] = useState<number>(1);
  const [showAllTable, setShowAllTable] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(REPEAT_BUYER_STATS.dealDurationSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const mainCase = PRODUCT_VARIANTS[0];
  const topReview = INITIAL_REVIEWS[0];
  const activePoint: ClosersClickPoint =
    CLOSERS_CLICK_POINTS.find((p) => p.number === selectedPointNum) ?? CLOSERS_CLICK_POINTS[0];

  const handleSelectPoint = (num: number) => {
    setShowAllTable(false);
    setSelectedPointNum(num);
  };

  const renderClickBadge = (num: number) => {
    const isActive = !showAllTable && selectedPointNum === num;
    return (
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handleSelectPoint(num);
        }}
        aria-label={`Inspect CLOSERS point ${num}`}
        aria-pressed={isActive}
        className={`w-6 h-6 rounded-full text-[11px] font-bold tabular-nums flex items-center justify-center shrink-0 transition-all cursor-pointer shadow-xs ${
          isActive
            ? 'bg-[#0F146D] text-white ring-3 ring-[#0F146D]/25 scale-105'
            : 'bg-[#A63A2B] hover:bg-[#8E2D20] text-white'
        }`}
      >
        {num}
      </button>
    );
  };

  return (
    <div className="bg-[#EDF0F4] py-4 px-4">
      <div className="max-w-[1400px] mx-auto space-y-3">
        {/* Compact Dashboard Header */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h1 className="text-[18px] sm:text-[20px] font-bold text-[#1A202C] leading-tight">
              Original Lazada Listing vs. Improved CLOSERS RedMart View
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowAllTable((prev) => !prev)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold rounded-[4px] border transition-colors cursor-pointer whitespace-nowrap ${
                showAllTable
                  ? 'bg-[#0F146D] text-white border-[#0F146D]'
                  : 'bg-white text-[#212121] border-[#D0D5DD] hover:border-[#98A2B3]'
              }`}
            >
              <Table2 className="w-3.5 h-3.5" />
              <span>{showAllTable ? 'Single Point View' : 'All 7 Points Matrix'}</span>
            </button>

            <button
              type="button"
              onClick={() => onOpenFullPdp('#top')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold rounded-[4px] bg-[#F57224] hover:bg-[#E06116] text-white transition-colors cursor-pointer whitespace-nowrap"
            >
              <span>Open Full Live RedMart PDP</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 3-Column Above-The-Fold Dashboard Grid: Original | Improved (7 Click Points) | CLOSERS Table */}
        <div className="grid grid-cols-1 lg:grid-cols-[290px_430px_1fr] xl:grid-cols-[310px_460px_1fr] gap-4 items-start">
          {/* COLUMN 1: ORIGINAL LAZADA SG LISTING (CONDENSED) */}
          <div className="space-y-1.5">
            <div className="text-[11px] font-semibold tracking-wider uppercase text-[#5A6475]">
              Original · Lazada SG (Before)
            </div>

            <div className="bg-white border border-[#DCDFE6] rounded-[4px] p-3.5 shadow-xs">
              <div className="h-[175px] bg-white border border-[#F0F1F4] rounded-[2px] p-2 flex items-center justify-center">
                <img
                  src={mainCase.image}
                  alt={PRODUCT_TITLE}
                  referrerPolicy="no-referrer"
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <div className="mt-2.5 text-[11px] text-[#757575]">
                Coca-Cola · Groceries &gt; Beverages
              </div>

              <h2 className="mt-0.5 text-[14px] font-medium text-[#212121] leading-snug">
                {PRODUCT_TITLE}
              </h2>

              <div className="mt-1.5 flex items-center gap-1 text-[11.5px]">
                <span className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-[#FACA51] text-[#FACA51]" />
                  ))}
                </span>
                <span className="font-medium text-[#212121] tabular-nums">4.9</span>
                <span className="text-[#757575] tabular-nums">(1,482)</span>
              </div>

              <div className="mt-2.5 pt-2.5 border-t border-[#F0F0F0] flex items-baseline gap-2">
                <span className="text-[22px] font-bold text-[#F57224] tabular-nums">
                  ${mainCase.price.toFixed(2)}
                </span>
                <span className="text-[11.5px] text-[#9E9E9E] line-through tabular-nums">
                  ${mainCase.originalPrice.toFixed(2)}
                </span>
                <span className="text-[11.5px] text-[#595959] tabular-nums">
                  (-{mainCase.discountPercent}%)
                </span>
              </div>

              <div className="mt-2 space-y-1 text-[11.5px] text-[#595959]">
                <div>In Stock (48 cartons available)</div>
                <div>RedMart Scheduled Delivery Tomorrow</div>
                <div className="text-[#757575]">Free delivery on orders $60+</div>
              </div>

              <button
                type="button"
                onClick={() => {
                  onAddCaseToCart();
                  onShowToast('Added baseline item to cart');
                }}
                className="mt-3 w-full h-[36px] bg-[#F57224] hover:bg-[#E06116] text-white text-[12.5px] font-semibold rounded-[2px] transition-colors cursor-pointer"
              >
                Add to Cart
              </button>
            </div>
          </div>

          {/* COLUMN 2: IMPROVED REDMART VIEW WITH 7 CLICK POINTS (CONDENSED ABOVE THE FOLD) */}
          <div className="space-y-1.5">
            <div className="text-[11px] font-semibold tracking-wider uppercase text-[#5A6475]">
              Improved · 7 Click Points (Tap 1–7)
            </div>

            <div className="bg-[#F8FAFC] border-2 border-[#D5DCE6] rounded-[18px] p-3 shadow-sm">
              {/* Compact Frame Bar */}
              <div className="flex items-center justify-between px-1.5 pb-2 mb-2 border-b border-[#E5E9F0] text-[10.5px] font-semibold text-[#334155]">
                <span className="tabular-nums">9:41</span>
                <div className="flex items-center gap-1">
                  <RedMartWordmark size="sm" />
                  <span className="text-[#94A3B8]">·</span>
                  <span className="text-[#475569]">Lazada SG</span>
                </div>
                <span className="font-mono text-[#64748B]">SGD</span>
              </div>

              <div className="space-y-1.5">
                {/* POINT 1: Healthier Choice + Nutri-Grade B + #1 Drink */}
                <div
                  onClick={() => handleSelectPoint(1)}
                  className={`flex items-center justify-between gap-2 px-2.5 py-2 rounded-[8px] border transition-all cursor-pointer ${
                    !showAllTable && selectedPointNum === 1
                      ? 'bg-white border-[#0F146D] ring-2 ring-[#0F146D]/15'
                      : 'bg-white border-[#E5E9F0] hover:border-[#A63A2B]/60'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <img
                      src={mainCase.image}
                      alt="Coca-Cola Zero Sugar Case"
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 object-contain border border-[#F1F5F9] rounded-[3px] bg-white shrink-0"
                    />
                    <div className="min-w-0 space-y-0.5">
                      <div className="flex items-center gap-1 text-[11px] font-bold text-[#9A6700] truncate">
                        <Award className="w-3 h-3 text-[#D49B00] shrink-0" />
                        <span>#1 Most Purchased Drink</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5">
                        <HealthierChoiceMark />
                        <NutriGradeBadge grade="B" compact />
                      </div>
                    </div>
                  </div>
                  {renderClickBadge(1)}
                </div>

                {/* POINT 2: Stickiness + 1-Click Convenience */}
                <div
                  onClick={() => handleSelectPoint(2)}
                  className={`flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-[8px] border transition-all cursor-pointer ${
                    !showAllTable && selectedPointNum === 2
                      ? 'bg-[#F0F4FF] border-[#0F146D] ring-2 ring-[#0F146D]/15'
                      : 'bg-[#F4F7FC] border-[#DCE4F0] hover:border-[#A63A2B]/60'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 flex-1 min-w-0 text-[11.5px]">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <RotateCw className="w-3 h-3 text-[#0F146D] shrink-0" />
                      <span className="text-[#1E293B] truncate">
                        Purchased <strong className="text-[#0F146D]">3 times</strong> before
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddCaseToCart();
                      }}
                      className="text-[11px] font-bold text-[#0F146D] hover:text-[#F57224] underline shrink-0 cursor-pointer"
                    >
                      Buy Again (1-Click)
                    </button>
                  </div>
                  {renderClickBadge(2)}
                </div>

                {/* POINT 3: Highlighted Red Sale + 3h Countdown */}
                <div
                  onClick={() => handleSelectPoint(3)}
                  className={`flex items-center justify-between gap-2 px-2.5 py-2 rounded-[8px] border transition-all cursor-pointer ${
                    !showAllTable && selectedPointNum === 3
                      ? 'bg-[#FFF1F1] border-[#0F146D] ring-2 ring-[#0F146D]/15'
                      : 'bg-[#FFF5F5] border-[#F3C6C6] hover:border-[#A63A2B]'
                  }`}
                >
                  <div className="flex-1 min-w-0 flex flex-wrap items-center justify-between gap-1">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-[19px] font-extrabold text-[#D92D20] leading-none tabular-nums">
                        ${mainCase.price.toFixed(2)}
                      </span>
                      <span className="text-[11px] text-[#757575] line-through tabular-nums">
                        ${mainCase.originalPrice.toFixed(2)}
                      </span>
                      <span className="px-1 py-0.5 bg-[#D92D20] text-white text-[9.5px] font-bold rounded-[2px] tabular-nums">
                        -24% OFF
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-[10.5px] font-semibold text-[#D92D20] tabular-nums">
                      <Clock className="w-3 h-3 shrink-0" />
                      <span>{formatTimer(secondsLeft)} left</span>
                    </div>
                  </div>
                  {renderClickBadge(3)}
                </div>

                {/* POINT 4: Red Low Stock Alert (Only 3 cartons left) */}
                <div
                  onClick={() => handleSelectPoint(4)}
                  className={`flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-[8px] border transition-all cursor-pointer ${
                    !showAllTable && selectedPointNum === 4
                      ? 'bg-white border-[#0F146D] ring-2 ring-[#0F146D]/15'
                      : 'bg-white border-[#E5E9F0] hover:border-[#A63A2B]/60'
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between text-[11.5px] font-bold text-[#D92D20]">
                      <span className="inline-flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        Only 3 cartons left at this price
                      </span>
                      <span className="text-[10.5px] font-medium text-[#64748B]">Selling fast</span>
                    </div>
                    <div className="mt-1 w-full h-1 bg-[#F1F5F9] rounded-full overflow-hidden">
                      <div className="h-full bg-[#D92D20] w-[88%]" />
                    </div>
                  </div>
                  {renderClickBadge(4)}
                </div>

                {/* POINT 5: 52 Repurchasers + Highlighted Top Review */}
                <div
                  onClick={() => handleSelectPoint(5)}
                  className={`flex items-center justify-between gap-2 px-2.5 py-2 rounded-[8px] border transition-all cursor-pointer ${
                    !showAllTable && selectedPointNum === 5
                      ? 'bg-[#FFFDF7] border-[#0F146D] ring-2 ring-[#0F146D]/15'
                      : 'bg-[#FFFDF7] border-[#EFE3C2] hover:border-[#A63A2B]/60'
                  }`}
                >
                  <div className="flex-1 min-w-0 space-y-0.5">
                    <div className="flex items-center justify-between gap-1 text-[10.5px]">
                      <span className="font-semibold text-[#146B3A]">
                        52 customers repurchased 2+ times
                      </span>
                      <span className="inline-flex items-center gap-0.5 text-[#9A6700] font-semibold shrink-0">
                        <ThumbsUp className="w-2.5 h-2.5" /> {topReview.helpfulCount}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#334155] line-clamp-2 leading-tight">
                      “{topReview.comment}” — <strong>{topReview.author}</strong>{' '}
                      <CheckCircle2 className="inline w-2.5 h-2.5 text-[#146B3A]" />
                    </p>
                  </div>
                  {renderClickBadge(5)}
                </div>

                {/* POINT 6: Free Priority Delivery Status Ladder + CTA */}
                <div
                  onClick={() => handleSelectPoint(6)}
                  className={`flex items-center justify-between gap-2 px-2.5 py-2 rounded-[8px] border transition-all cursor-pointer ${
                    !showAllTable && selectedPointNum === 6
                      ? 'bg-white border-[#0F146D] ring-2 ring-[#0F146D]/15'
                      : 'bg-white border-[#E5E9F0] hover:border-[#A63A2B]/60'
                  }`}
                >
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div>
                      <div className="flex justify-between text-[10.5px] text-[#334155] mb-0.5">
                        <span>
                          <strong>$43.55</strong> away from <strong>Free Priority Delivery</strong>
                        </span>
                        <span className="tabular-nums text-[#64748B]">27%</span>
                      </div>
                      <div className="w-full h-1 bg-[#E2E8F0] rounded-full overflow-hidden">
                        <div className="h-full bg-[#F57224] w-[27%]" />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddCaseToCart();
                      }}
                      className="w-full h-[32px] bg-[#F57224] hover:bg-[#E06116] text-white text-[12px] font-semibold rounded-[3px] transition-colors cursor-pointer"
                    >
                      Add to Cart · ${mainCase.price.toFixed(2)}
                    </button>
                  </div>
                  {renderClickBadge(6)}
                </div>

                {/* POINT 7: Top 5 Most Purchased Drinks Rank */}
                <div
                  onClick={() => handleSelectPoint(7)}
                  className={`flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-[8px] border transition-all cursor-pointer ${
                    !showAllTable && selectedPointNum === 7
                      ? 'bg-white border-[#0F146D] ring-2 ring-[#0F146D]/15'
                      : 'bg-white border-[#E5E9F0] hover:border-[#A63A2B]/60'
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 text-[11px] font-bold text-[#1E293B]">
                      <Trophy className="w-3 h-3 text-[#D49B00]" />
                      <span>Top 5 Most Purchased Drinks</span>
                    </div>
                    <div className="text-[10.5px] text-[#475569] truncate">
                      {TOP_FIVE_DRINKS.slice(0, 3)
                        .map(
                          (d) =>
                            `#${d.rank} ${d.brand} ${
                              d.isCurrentProduct ? 'Zero' : d.rank === 2 ? 'Water' : 'Classic'
                            }`
                        )
                        .join(' · ')}{' '}
                      + #4 Pokka · #5 Sprite
                    </div>
                  </div>
                  {renderClickBadge(7)}
                </div>
              </div>
            </div>
          </div>

          {/* COLUMN 3: CONDENSED CLOSERS DESCRIPTIVE TABLE PANEL (RIGHT SIDE, NO SCROLLING) */}
          <div className="space-y-1.5 lg:sticky lg:top-[130px]">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold tracking-wider uppercase text-[#5A6475]">
                CLOSERS Descriptive Table
              </span>
              <div className="flex items-center gap-1">
                {CLOSERS_CLICK_POINTS.map((pt) => {
                  const isActive = !showAllTable && selectedPointNum === pt.number;
                  return (
                    <button
                      key={pt.number}
                      type="button"
                      onClick={() => handleSelectPoint(pt.number)}
                      className={`w-5 h-5 rounded-full text-[10px] font-bold tabular-nums transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-[#0F146D] text-white'
                          : 'bg-white border border-[#CBD5E1] text-[#475569] hover:border-[#0F146D]'
                      }`}
                    >
                      {pt.number}
                    </button>
                  );
                })}
              </div>
            </div>

            {!showAllTable ? (
              <section
                aria-label={`CLOSERS Detail Table for Point ${activePoint.number}`}
                className="bg-white border border-[#CBD5E1] rounded-[4px] shadow-sm overflow-hidden"
              >
                {/* Compact Header */}
                <div className="px-4 py-2.5 bg-[#0F146D] text-white flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-6 h-6 rounded-full bg-[#A63A2B] text-white text-[12px] font-bold flex items-center justify-center shrink-0 tabular-nums">
                      {activePoint.number}
                    </span>
                    <div className="min-w-0">
                      <div className="text-[10px] text-white/75 uppercase tracking-wider leading-none">
                        Step {activePoint.number} of {CLOSERS_CLICK_POINTS.length}
                      </div>
                      <h3 className="text-[13.5px] font-bold truncate mt-0.5">
                        {activePoint.shortTitle}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() =>
                        handleSelectPoint(
                          activePoint.number === 1
                            ? CLOSERS_CLICK_POINTS.length
                            : activePoint.number - 1
                        )
                      }
                      aria-label="Previous CLOSERS point"
                      className="p-1 bg-white/10 hover:bg-white/20 rounded-[3px] cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleSelectPoint(
                          activePoint.number === CLOSERS_CLICK_POINTS.length
                            ? 1
                            : activePoint.number + 1
                        )
                      }
                      aria-label="Next CLOSERS point"
                      className="p-1 bg-white/10 hover:bg-white/20 rounded-[3px] cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Condensed Vertical Key-Value Descriptive Table */}
                <table className="w-full text-[12.5px] text-left border-collapse">
                  <tbody className="divide-y divide-[#EEF2F6]">
                    <tr>
                      <th className="py-2.5 px-3.5 w-[132px] bg-[#F8FAFC] text-[11px] font-semibold uppercase tracking-wide text-[#64748B] align-top">
                        CLOSER Applied
                      </th>
                      <td className="py-2.5 px-3.5">
                        <div className="flex flex-wrap gap-2">
                          {activePoint.principles.map((p) => (
                            <div
                              key={`${p.letter}-${p.name}`}
                              className="inline-flex items-center gap-1.5 border border-[#E2E8F0] rounded-[3px] px-2 py-1 bg-[#FAFAFA]"
                            >
                              <span
                                className="w-5 h-5 rounded-[2px] text-[11px] font-extrabold flex items-center justify-center shrink-0"
                                style={{ backgroundColor: p.badgeBg, color: p.badgeText }}
                              >
                                {p.letter}
                              </span>
                              <span className="font-bold text-[#1E293B] text-[12px]">
                                {p.name}
                              </span>
                              <span
                                className="inline-flex items-center gap-0.5 ml-1"
                                title={`Evidence: ${p.evidenceOutOf4}/4`}
                              >
                                {Array.from({ length: 4 }).map((_, idx) => (
                                  <span
                                    key={idx}
                                    className={`w-1.5 h-2 rounded-[1px] ${
                                      idx < p.evidenceOutOf4 ? 'bg-[#334155]' : 'bg-[#CBD5E1]'
                                    }`}
                                  />
                                ))}
                              </span>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <th className="py-2.5 px-3.5 bg-[#F8FAFC] text-[11px] font-semibold uppercase tracking-wide text-[#64748B] align-top">
                        Original Lazada
                      </th>
                      <td className="py-2.5 px-3.5 text-[#475569] leading-snug">
                        {activePoint.originalLazada}
                      </td>
                    </tr>

                    <tr>
                      <th className="py-2.5 px-3.5 bg-[#F8FAFC] text-[11px] font-semibold uppercase tracking-wide text-[#64748B] align-top">
                        Updated RedMart
                      </th>
                      <td className="py-2.5 px-3.5 text-[#0F172A] font-medium leading-snug bg-[#F8FAFC]/40">
                        {activePoint.improvedRedMart}
                      </td>
                    </tr>

                    <tr>
                      <th className="py-2.5 px-3.5 bg-[#F8FAFC] text-[11px] font-semibold uppercase tracking-wide text-[#64748B] align-top">
                        Why It Works
                      </th>
                      <td className="py-2.5 px-3.5 text-[#334155] leading-snug">
                        {activePoint.whyItWorks}
                      </td>
                    </tr>

                    <tr>
                      <th className="py-2.5 px-3.5 bg-[#F8FAFC] text-[11px] font-semibold uppercase tracking-wide text-[#64748B] align-top">
                        Guardrail
                      </th>
                      <td className="py-2.5 px-3.5 text-[#64748B] text-[12px] leading-snug">
                        {activePoint.guardrail}
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* Condensed Footer */}
                <div className="px-3.5 py-2 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-between text-[11.5px]">
                  <button
                    type="button"
                    onClick={() => setShowAllTable(true)}
                    className="font-semibold text-[#0F146D] hover:underline cursor-pointer"
                  >
                    Compare all 7 points
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenFullPdp(activePoint.liveSectionAnchor)}
                    className="inline-flex items-center gap-1 font-semibold text-[#F57224] hover:underline cursor-pointer"
                  >
                    <span>See Point {activePoint.number} on Full PDP</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </section>
            ) : (
              /* CONDENSED ALL-7-POINTS MATRIX RIGHT IN COLUMN 3 */
              <section className="bg-white border border-[#CBD5E1] rounded-[4px] shadow-sm overflow-hidden">
                <div className="px-3.5 py-2.5 bg-[#0F146D] text-white flex items-center justify-between">
                  <h3 className="text-[13px] font-bold">All 7 CLOSERS Points Summary</h3>
                  <button
                    type="button"
                    onClick={() => setShowAllTable(false)}
                    className="text-[11px] text-white/90 hover:text-white underline cursor-pointer"
                  >
                    Back to detail
                  </button>
                </div>

                <div className="divide-y divide-[#EEF2F6]">
                  {CLOSERS_CLICK_POINTS.map((pt) => (
                    <button
                      key={pt.id}
                      type="button"
                      onClick={() => handleSelectPoint(pt.number)}
                      className="w-full text-left px-3.5 py-2 hover:bg-[#F8FAFC] flex items-start gap-2.5 transition-colors cursor-pointer"
                    >
                      <span className="w-5 h-5 rounded-full bg-[#A63A2B] text-white text-[10.5px] font-bold flex items-center justify-center shrink-0 mt-0.5 tabular-nums">
                        {pt.number}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="text-[12px] font-semibold text-[#1E293B]">
                            {pt.shortTitle}
                          </span>
                        </div>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {pt.principles.map((p) => (
                            <span
                              key={`${pt.id}-${p.name}`}
                              className="px-1.5 py-0.5 rounded-[2px] text-[10px] font-semibold"
                              style={{ backgroundColor: p.badgeBg, color: p.badgeText }}
                            >
                              {p.letter} · {p.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
