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
  X,
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
  const [selectedPointNum, setSelectedPointNum] = useState<number | null>(null);
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
  const activePoint: ClosersClickPoint | undefined = CLOSERS_CLICK_POINTS.find(
    (p) => p.number === selectedPointNum
  );

  const handleSelectPoint = (num: number) => {
    setShowAllTable(false);
    setSelectedPointNum((prev) => (prev === num ? null : num));
  };

  const renderClickBadge = (num: number) => {
    const isActive = selectedPointNum === num;
    return (
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handleSelectPoint(num);
        }}
        aria-label={`Inspect CLOSERS point ${num}`}
        aria-pressed={isActive}
        className={`w-7 h-7 rounded-full text-[12px] font-bold tabular-nums flex items-center justify-center shrink-0 transition-all cursor-pointer shadow-sm ${
          isActive
            ? 'bg-[#0F146D] text-white ring-4 ring-[#0F146D]/20 scale-110'
            : 'bg-[#A63A2B] hover:bg-[#8E2D20] text-white'
        }`}
      >
        {num}
      </button>
    );
  };

  return (
    <div className="bg-[#EDF0F4] min-h-[calc(100vh-110px)] py-6 px-4">
      <div className="max-w-[1240px] mx-auto space-y-6">
        {/* Top Context Row */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-[11px] font-semibold tracking-wider uppercase text-[#5A6475]">
              Lazada SG · RedMart Persuasion Comparison
            </div>
            <h1 className="text-[20px] sm:text-[22px] font-bold text-[#1A202C] mt-0.5">
              Original Lazada Listing vs. Improved CLOSERS RedMart View
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => {
                setShowAllTable((prev) => !prev);
                if (!showAllTable) setSelectedPointNum(null);
              }}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-[12px] font-semibold rounded-[4px] border transition-colors cursor-pointer whitespace-nowrap ${
                showAllTable
                  ? 'bg-[#0F146D] text-white border-[#0F146D]'
                  : 'bg-white text-[#212121] border-[#D0D5DD] hover:border-[#98A2B3]'
              }`}
            >
              <Table2 className="w-3.5 h-3.5" />
              <span>{showAllTable ? 'Hide Full Matrix' : 'View All 7 Points Table'}</span>
            </button>

            <button
              type="button"
              onClick={() => onOpenFullPdp('#top')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-[12px] font-semibold rounded-[4px] bg-[#F57224] hover:bg-[#E06116] text-white transition-colors cursor-pointer whitespace-nowrap"
            >
              <span>Open Full Live RedMart PDP</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Two-Column Before vs After Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-[410px_1fr] gap-8 items-start">
          {/* LEFT: ORIGINAL LAZADA SG LISTING (BEFORE) */}
          <div className="space-y-2.5">
            <div className="text-[11px] font-semibold tracking-wider uppercase text-[#5A6475]">
              Original · Lazada SG Listing (Before)
            </div>

            <div className="bg-white border border-[#DCDFE6] rounded-[4px] overflow-hidden shadow-xs">
              <div className="p-4">
                <div className="relative aspect-square bg-white border border-[#F0F1F4] rounded-[2px] p-3">
                  <img
                    src={mainCase.image}
                    alt={PRODUCT_TITLE}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="mt-3 text-[11px] text-[#757575]">
                  Brand: Coca-Cola · Groceries &gt; Beverages
                </div>

                <h2 className="mt-1 text-[16px] font-medium text-[#212121] leading-snug">
                  {PRODUCT_TITLE}
                </h2>

                <div className="mt-2 flex items-center gap-1.5 text-[12px]">
                  <span className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#FACA51] text-[#FACA51]" />
                    ))}
                  </span>
                  <span className="font-medium text-[#212121] tabular-nums">4.9</span>
                  <span className="text-[#757575] tabular-nums">(1,482)</span>
                </div>

                <div className="mt-3 pt-3 border-t border-[#F0F0F0]">
                  <div className="flex items-baseline gap-2">
                    <span className="text-[24px] font-bold text-[#F57224] tabular-nums">
                      ${mainCase.price.toFixed(2)}
                    </span>
                    <span className="text-[12px] text-[#9E9E9E] line-through tabular-nums">
                      List: ${mainCase.originalPrice.toFixed(2)}
                    </span>
                    <span className="text-[12px] text-[#595959] tabular-nums">
                      (-{mainCase.discountPercent}%)
                    </span>
                  </div>
                </div>

                <div className="mt-3 space-y-1.5 text-[12px] text-[#595959]">
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
                  className="mt-4 w-full h-[40px] bg-[#F57224] hover:bg-[#E06116] text-white text-[13px] font-semibold rounded-[2px] transition-colors cursor-pointer"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: IMPROVED REDMART VIEW WITH 7 NUMBERED CLICK POINTS */}
          <div className="space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-[11px] font-semibold tracking-wider uppercase text-[#5A6475]">
                Improved · 7 Click Points · CLOSERS (Tap 1–7 to open descriptive table)
              </span>
              {selectedPointNum !== null && (
                <button
                  type="button"
                  onClick={() => setSelectedPointNum(null)}
                  className="text-[11px] font-semibold text-[#0F146D] hover:underline cursor-pointer"
                >
                  Clear selection
                </button>
              )}
            </div>

            {/* Clean Device Showcase Card */}
            <div className="bg-[#F8FAFC] border-2 border-[#D5DCE6] rounded-[24px] p-4 sm:p-5 shadow-md max-w-[540px] mx-auto lg:mx-0">
              {/* Mock Status Header */}
              <div className="flex items-center justify-between px-2 pb-3 mb-3 border-b border-[#E5E9F0] text-[11px] font-semibold text-[#334155]">
                <span className="tabular-nums">9:41</span>
                <div className="flex items-center gap-1.5">
                  <RedMartWordmark size="sm" />
                  <span className="text-[#94A3B8]">·</span>
                  <span className="text-[#475569]">Lazada SG</span>
                </div>
                <span className="text-[10px] font-mono text-[#64748B]">SGD</span>
              </div>

              <div className="space-y-2.5">
                {/* CLICK POINT 1: Healthier Choice + Nutri-Grade B + #1 Drink */}
                <div
                  onClick={() => handleSelectPoint(1)}
                  className={`flex items-center justify-between gap-3 p-2.5 rounded-[10px] border transition-all cursor-pointer ${
                    selectedPointNum === 1
                      ? 'bg-white border-[#0F146D] ring-2 ring-[#0F146D]/15'
                      : 'bg-white border-[#E5E9F0] hover:border-[#A63A2B]/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={mainCase.image}
                      alt="Coca-Cola Zero Sugar Case"
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 object-contain border border-[#F1F5F9] rounded-[4px] bg-white shrink-0"
                    />
                    <div className="min-w-0 space-y-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#9A6700]">
                          <Award className="w-3.5 h-3.5 text-[#D49B00]" />
                          #1 Most Purchased Drink
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5">
                        <HealthierChoiceMark />
                        <NutriGradeBadge grade="B" compact />
                      </div>
                    </div>
                  </div>
                  {renderClickBadge(1)}
                </div>

                {/* CLICK POINT 2: Stickiness + 1-Click Convenience */}
                <div
                  onClick={() => handleSelectPoint(2)}
                  className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-[10px] border transition-all cursor-pointer ${
                    selectedPointNum === 2
                      ? 'bg-[#F0F4FF] border-[#0F146D] ring-2 ring-[#0F146D]/15'
                      : 'bg-[#F4F7FC] border-[#DCE4F0] hover:border-[#A63A2B]/60'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 flex-1 min-w-0 text-[12px]">
                    <div className="flex items-center gap-2 min-w-0">
                      <RotateCw className="w-3.5 h-3.5 text-[#0F146D] shrink-0" />
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

                {/* CLICK POINT 3: Highlighted Red Sale + 3h Countdown */}
                <div
                  onClick={() => handleSelectPoint(3)}
                  className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-[10px] border transition-all cursor-pointer ${
                    selectedPointNum === 3
                      ? 'bg-[#FFF1F1] border-[#0F146D] ring-2 ring-[#0F146D]/15'
                      : 'bg-[#FFF5F5] border-[#F3C6C6] hover:border-[#A63A2B]'
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className="text-[22px] font-extrabold text-[#D92D20] leading-none tabular-nums">
                        ${mainCase.price.toFixed(2)}
                      </span>
                      <span className="text-[12px] text-[#757575] line-through tabular-nums">
                        ${mainCase.originalPrice.toFixed(2)}
                      </span>
                      <span className="px-1.5 py-0.5 bg-[#D92D20] text-white text-[10px] font-bold rounded-[2px] tabular-nums">
                        -24% OFF
                      </span>
                    </div>
                    <div className="mt-1 flex items-center gap-1.5 text-[11px] font-semibold text-[#D92D20] tabular-nums">
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      <span>{formatTimer(secondsLeft)} left until deal ends</span>
                    </div>
                  </div>
                  {renderClickBadge(3)}
                </div>

                {/* CLICK POINT 4: Red Low Stock Alert (Only 3 cartons left) */}
                <div
                  onClick={() => handleSelectPoint(4)}
                  className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-[10px] border transition-all cursor-pointer ${
                    selectedPointNum === 4
                      ? 'bg-white border-[#0F146D] ring-2 ring-[#0F146D]/15'
                      : 'bg-white border-[#E5E9F0] hover:border-[#A63A2B]/60'
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between text-[12px] font-bold text-[#D92D20]">
                      <span className="inline-flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        Only 3 cartons left at this price
                      </span>
                      <span className="text-[11px] font-medium text-[#64748B]">Selling fast</span>
                    </div>
                    <div className="mt-1.5 w-full h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
                      <div className="h-full bg-[#D92D20] w-[88%]" />
                    </div>
                  </div>
                  {renderClickBadge(4)}
                </div>

                {/* CLICK POINT 5: 52 Repurchasers + Highlighted Top Review */}
                <div
                  onClick={() => handleSelectPoint(5)}
                  className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-[10px] border transition-all cursor-pointer ${
                    selectedPointNum === 5
                      ? 'bg-[#FFFDF7] border-[#0F146D] ring-2 ring-[#0F146D]/15'
                      : 'bg-[#FFFDF7] border-[#EFE3C2] hover:border-[#A63A2B]/60'
                  }`}
                >
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center justify-between gap-1 text-[11px]">
                      <span className="font-semibold text-[#146B3A]">
                        52 customers repurchased 2+ times
                      </span>
                      <span className="inline-flex items-center gap-0.5 text-[#9A6700] font-semibold">
                        <ThumbsUp className="w-3 h-3" /> {topReview.helpfulCount} helpful
                      </span>
                    </div>
                    <p className="text-[11.5px] text-[#334155] line-clamp-2 leading-snug">
                      “{topReview.comment}” — <strong>{topReview.author}</strong>{' '}
                      <CheckCircle2 className="inline w-3 h-3 text-[#146B3A]" />
                    </p>
                  </div>
                  {renderClickBadge(5)}
                </div>

                {/* CLICK POINT 6: Free Priority Delivery Status Ladder + CTA */}
                <div
                  onClick={() => handleSelectPoint(6)}
                  className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-[10px] border transition-all cursor-pointer ${
                    selectedPointNum === 6
                      ? 'bg-white border-[#0F146D] ring-2 ring-[#0F146D]/15'
                      : 'bg-white border-[#E5E9F0] hover:border-[#A63A2B]/60'
                  }`}
                >
                  <div className="flex-1 min-w-0 space-y-2">
                    <div>
                      <div className="flex justify-between text-[11px] text-[#334155] mb-1">
                        <span>
                          <strong>$43.55</strong> away from <strong>Free Priority Delivery</strong>
                        </span>
                        <span className="tabular-nums text-[#64748B]">27%</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
                        <div className="h-full bg-[#F57224] w-[27%]" />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddCaseToCart();
                      }}
                      className="w-full h-[38px] bg-[#F57224] hover:bg-[#E06116] text-white text-[13px] font-semibold rounded-[4px] transition-colors cursor-pointer"
                    >
                      Add to Cart · ${mainCase.price.toFixed(2)}
                    </button>
                  </div>
                  {renderClickBadge(6)}
                </div>

                {/* CLICK POINT 7: Top 5 Most Purchased Drinks Rank */}
                <div
                  onClick={() => handleSelectPoint(7)}
                  className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-[10px] border transition-all cursor-pointer ${
                    selectedPointNum === 7
                      ? 'bg-white border-[#0F146D] ring-2 ring-[#0F146D]/15'
                      : 'bg-white border-[#E5E9F0] hover:border-[#A63A2B]/60'
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 text-[11.5px] font-bold text-[#1E293B] mb-1">
                      <Trophy className="w-3.5 h-3.5 text-[#D49B00]" />
                      <span>Top 5 Most Purchased Drinks Leaderboard</span>
                    </div>
                    <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[11px] text-[#475569]">
                      {TOP_FIVE_DRINKS.slice(0, 3).map((d) => (
                        <span key={d.id} className={d.isCurrentProduct ? 'font-bold text-[#0F146D]' : ''}>
                          #{d.rank} {d.brand} {d.isCurrentProduct ? 'Zero' : d.rank === 2 ? 'Water' : 'Classic'}
                        </span>
                      ))}
                      <span className="text-[#94A3B8]">+ #4 Pokka · #5 Sprite</span>
                    </div>
                  </div>
                  {renderClickBadge(7)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DESCRIPTIVE TABLE DRAWER / PANEL WHEN A POINT IS TAPPED */}
        {!activePoint && !showAllTable && (
          <div className="bg-white border border-[#DCDFE6] rounded-[4px] px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 text-[13px] text-[#475569]">
            <span>
              Tap any numbered circle (<strong className="text-[#A63A2B]">1</strong>–
              <strong className="text-[#A63A2B]">7</strong>) on the improved RedMart card above to
              open its descriptive <strong>CLOSERS</strong> comparison table.
            </span>
            <button
              type="button"
              onClick={() => handleSelectPoint(1)}
              className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#0F146D] hover:underline cursor-pointer"
            >
              <span>Start at Point 1</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {activePoint && !showAllTable && (
          <section
            aria-label={`CLOSERS Detail Table for Point ${activePoint.number}`}
            className="bg-white border border-[#CBD5E1] rounded-[4px] shadow-md overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 py-3.5 bg-[#0F146D] text-white flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-[#A63A2B] text-white text-[13px] font-bold flex items-center justify-center tabular-nums">
                  {activePoint.number}
                </span>
                <div>
                  <div className="text-[11px] text-white/75 uppercase tracking-wider">
                    Step {activePoint.number} of {CLOSERS_CLICK_POINTS.length} · CLOSERS Breakdown
                  </div>
                  <h3 className="text-[15px] font-bold">{activePoint.shortTitle}</h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setSelectedPointNum(
                      activePoint.number === 1
                        ? CLOSERS_CLICK_POINTS.length
                        : activePoint.number - 1
                    )
                  }
                  className="px-2.5 py-1 text-[12px] bg-white/10 hover:bg-white/20 rounded-[3px] inline-flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Prev</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setSelectedPointNum(
                      activePoint.number === CLOSERS_CLICK_POINTS.length
                        ? 1
                        : activePoint.number + 1
                    )
                  }
                  className="px-2.5 py-1 text-[12px] bg-white/10 hover:bg-white/20 rounded-[3px] inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedPointNum(null)}
                  aria-label="Close table"
                  className="p-1 text-white/80 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Descriptive Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-[13px] text-left border-collapse">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] uppercase tracking-wider text-[#64748B]">
                    <th className="py-3 px-4 w-[210px]">CLOSER Principle</th>
                    <th className="py-3 px-4">Original Lazada Website</th>
                    <th className="py-3 px-4">Updated RedMart Page</th>
                    <th className="py-3 px-4">Why It Works &amp; Guardrail</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="align-top">
                    <td className="py-4 px-4 border-r border-[#F1F5F9] space-y-2.5">
                      {activePoint.principles.map((p) => (
                        <div key={`${p.letter}-${p.name}`} className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span
                              className="w-6 h-6 rounded-[3px] text-[12px] font-extrabold flex items-center justify-center shrink-0"
                              style={{ backgroundColor: p.badgeBg, color: p.badgeText }}
                            >
                              {p.letter}
                            </span>
                            <span className="font-bold text-[#1E293B]">{p.name}</span>
                          </div>
                          <div className="flex items-center gap-1 pl-8" title={`Evidence strength: ${p.evidenceOutOf4}/4`}>
                            {Array.from({ length: 4 }).map((_, idx) => (
                              <span
                                key={idx}
                                className={`w-2 h-2.5 rounded-[1px] ${
                                  idx < p.evidenceOutOf4 ? 'bg-[#334155]' : 'bg-[#CBD5E1]'
                                }`}
                              />
                            ))}
                            <span className="text-[10px] text-[#64748B] ml-1 tabular-nums">
                              {p.evidenceOutOf4}/4 evidence
                            </span>
                          </div>
                        </div>
                      ))}
                    </td>

                    <td className="py-4 px-4 border-r border-[#F1F5F9] text-[#475569] leading-relaxed">
                      {activePoint.originalLazada}
                    </td>

                    <td className="py-4 px-4 border-r border-[#F1F5F9] text-[#0F172A] font-medium leading-relaxed bg-[#F8FAFC]/50">
                      {activePoint.improvedRedMart}
                    </td>

                    <td className="py-4 px-4 text-[#334155] leading-relaxed space-y-2">
                      <p>{activePoint.whyItWorks}</p>
                      <p className="text-[12px] text-[#64748B]">
                        <strong className="text-[#475569]">Guardrail:</strong>{' '}
                        {activePoint.guardrail}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="px-5 py-2.5 bg-[#F8FAFC] border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-2 text-[12px]">
              <span className="text-[#64748B]">
                Applied to Coca-Cola Zero Sugar (24 X 320ML) · SKU 2034443802-s11107987307
              </span>
              <button
                type="button"
                onClick={() => onOpenFullPdp(activePoint.liveSectionAnchor)}
                className="inline-flex items-center gap-1 font-semibold text-[#F57224] hover:underline cursor-pointer"
              >
                <span>See Point {activePoint.number} on Full Live RedMart PDP</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </section>
        )}

        {/* FULL 7-POINT MATRIX TABLE */}
        {showAllTable && (
          <section className="bg-white border border-[#CBD5E1] rounded-[4px] shadow-md overflow-hidden">
            <div className="px-5 py-3.5 bg-[#0F146D] text-white flex items-center justify-between">
              <h3 className="text-[15px] font-bold">
                Complete CLOSERS Comparison Matrix (Points 1–7)
              </h3>
              <button
                type="button"
                onClick={() => setShowAllTable(false)}
                className="p-1 text-white/80 hover:text-white cursor-pointer"
                aria-label="Close full matrix"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-[12.5px] text-left border-collapse">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] uppercase tracking-wider text-[#64748B]">
                    <th className="py-3 px-4">#</th>
                    <th className="py-3 px-4">Change on RedMart PDP</th>
                    <th className="py-3 px-4">CLOSER Applied</th>
                    <th className="py-3 px-4">Original Lazada</th>
                    <th className="py-3 px-4">Updated RedMart</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  {CLOSERS_CLICK_POINTS.map((pt) => (
                    <tr
                      key={pt.id}
                      onClick={() => {
                        setShowAllTable(false);
                        setSelectedPointNum(pt.number);
                      }}
                      className="hover:bg-[#F8FAFC] cursor-pointer align-top"
                    >
                      <td className="py-3 px-4 font-bold text-[#A63A2B] tabular-nums">
                        {pt.number}
                      </td>
                      <td className="py-3 px-4 font-semibold text-[#1E293B]">{pt.shortTitle}</td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1.5">
                          {pt.principles.map((p) => (
                            <span
                              key={`${pt.id}-${p.name}`}
                              className="px-2 py-0.5 rounded-[2px] text-[11px] font-semibold"
                              style={{ backgroundColor: p.badgeBg, color: p.badgeText }}
                            >
                              {p.letter} · {p.name}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-[#64748B]">{pt.originalLazada}</td>
                      <td className="py-3 px-4 text-[#0F172A]">{pt.improvedRedMart}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
