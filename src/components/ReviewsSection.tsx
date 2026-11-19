import React, { useState } from 'react';
import { Star, ThumbsUp, CheckCircle2, Image as ImageIcon, X } from 'lucide-react';
import { RATING_BREAKDOWN, ReviewItem, PRODUCT_TITLE } from '../data/productData';

interface ReviewsSectionProps {
  reviews: ReviewItem[];
  onToggleHelpful: (id: string) => void;
  helpfulClickedIds: string[];
}

type ReviewFilter = 'all' | 'photos' | '5' | '4' | '3below';
type SortMode = 'relevance' | 'recent' | 'high';

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews,
  onToggleHelpful,
  helpfulClickedIds,
}) => {
  const [filter, setFilter] = useState<ReviewFilter>('all');
  const [sortMode, setSortMode] = useState<SortMode>('relevance');
  const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);

  const totalRatings = RATING_BREAKDOWN.reduce((acc, r) => acc + r.count, 0);

  const filteredReviews = reviews
    .filter((rev) => {
      if (filter === 'photos') return Boolean(rev.photos && rev.photos.length > 0);
      if (filter === '5') return rev.rating === 5;
      if (filter === '4') return rev.rating === 4;
      if (filter === '3below') return rev.rating <= 3;
      return true;
    })
    .sort((a, b) => {
      if (sortMode === 'high') return b.rating - a.rating;
      if (sortMode === 'recent') return b.id.localeCompare(a.id);
      return b.helpfulCount - a.helpfulCount;
    });

  return (
    <section
      id="reviews"
      className="bg-white rounded-[2px] border border-[#ECEEF2] overflow-hidden"
    >
      {/* Header */}
      <div className="px-5 py-3.5 bg-[#FAFAFA] border-b border-[#ECEEF2]">
        <h2 className="text-[16px] font-semibold text-[#212121]">
          Ratings &amp; Reviews of {PRODUCT_TITLE}
        </h2>
      </div>

      {/* Summary & Histogram */}
      <div className="p-5 border-b border-[#F0F0F0] grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6 items-center">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-[44px] font-bold text-[#212121] leading-none tabular-nums">
              4.9
            </span>
            <span className="text-[22px] text-[#9E9E9E] font-medium">/5</span>
          </div>
          <div className="flex items-center gap-1 mt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-[#FACA51] text-[#FACA51]" />
            ))}
          </div>
          <div className="text-[12px] text-[#757575] mt-1.5 tabular-nums">
            {totalRatings.toLocaleString()} Ratings · Verified RedMart Buyers
          </div>
        </div>

        {/* 5-bar Histogram */}
        <div className="space-y-1.5 max-w-[440px]">
          {RATING_BREAKDOWN.map((row) => {
            const pct = Math.round((row.count / totalRatings) * 100);
            return (
              <button
                key={row.stars}
                type="button"
                onClick={() => {
                  if (row.stars === 5) setFilter('5');
                  else if (row.stars === 4) setFilter('4');
                  else setFilter('3below');
                }}
                className="w-full flex items-center gap-3 text-[12px] hover:bg-[#FAFAFA] py-0.5 rounded-[2px] cursor-pointer"
              >
                <div className="flex items-center gap-0.5 w-[76px] shrink-0">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < row.stars
                          ? 'fill-[#FACA51] text-[#FACA51]'
                          : 'fill-[#E5E7EB] text-[#E5E7EB]'
                      }`}
                    />
                  ))}
                </div>
                <div className="flex-1 h-2.5 bg-[#EFF0F5] rounded-[1px] overflow-hidden">
                  <div
                    className="h-full bg-[#FACA51]"
                    style={{ width: `${Math.max(2, pct)}%` }}
                  />
                </div>
                <span className="w-12 text-right text-[#595959] tabular-nums">{row.count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter & Sort Toolbar */}
      <div className="px-5 py-3 border-b border-[#F0F0F0] flex flex-wrap items-center justify-between gap-3 bg-white">
        <div className="flex flex-wrap items-center gap-2">
          {(
            [
              { id: 'all', label: `All (${reviews.length})` },
              { id: 'photos', label: 'With Photos' },
              { id: '5', label: '5 Star' },
              { id: '4', label: '4 Star' },
              { id: '3below', label: '3 Star & Below' },
            ] as const
          ).map((tab) => {
            const active = filter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                className={`px-3 py-1.5 text-[12px] rounded-[2px] border transition-colors cursor-pointer whitespace-nowrap ${
                  active
                    ? 'border-[#F57224] bg-[#FFF8F4] text-[#F57224] font-semibold'
                    : 'border-[#E0E2E7] bg-white text-[#595959] hover:border-[#9E9E9E]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 text-[12px]">
          <span className="text-[#757575]">Sort:</span>
          <select
            value={sortMode}
            onChange={(e) => setSortMode(e.target.value as SortMode)}
            aria-label="Sort reviews"
            className="border border-[#DCDFE6] rounded-[2px] px-2.5 py-1 text-[12px] text-[#212121] bg-white focus:outline-none focus:border-[#F57224]"
          >
            <option value="relevance">Relevance</option>
            <option value="recent">Most Recent</option>
            <option value="high">Rating: High to Low</option>
          </select>
        </div>
      </div>

      {/* Reviews List */}
      <div className="divide-y divide-[#F0F0F0]">
        {filteredReviews.length === 0 ? (
          <div className="p-8 text-center text-[13px] text-[#757575]">
            No reviews match the selected filter.{' '}
            <button
              type="button"
              onClick={() => setFilter('all')}
              className="text-[#1A9CB7] font-medium hover:underline cursor-pointer"
            >
              Show all reviews
            </button>
          </div>
        ) : (
          filteredReviews.map((rev) => {
            const helpfulActive = helpfulClickedIds.includes(rev.id);
            return (
              <article key={rev.id} className="p-5 space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating
                            ? 'fill-[#FACA51] text-[#FACA51]'
                            : 'fill-[#E5E7EB] text-[#E5E7EB]'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[12px] text-[#9E9E9E]">{rev.date}</span>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-[12px] text-[#757575]">
                  <span className="font-medium text-[#212121]">{rev.author}</span>
                  {rev.verified && (
                    <span className="inline-flex items-center gap-1 text-[#146B3A] font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Verified Purchase</span>
                    </span>
                  )}
                  <span aria-hidden="true">·</span>
                  <span>Pack Size: {rev.variant}</span>
                </div>

                <p className="text-[13px] text-[#212121] leading-relaxed">{rev.comment}</p>

                {rev.photos && rev.photos.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {rev.photos.map((photo, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setPreviewPhoto(photo)}
                        className="relative w-16 h-16 border border-[#E5E7EB] rounded-[2px] overflow-hidden bg-white hover:border-[#F57224] transition-colors cursor-pointer group"
                        aria-label="Enlarge review photo"
                      >
                        <img
                          src={photo}
                          alt={`Buyer photo ${idx + 1}`}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-contain p-0.5"
                        />
                        <span className="absolute bottom-0.5 right-0.5 bg-black/50 text-white p-0.5 rounded-[1px] opacity-0 group-hover:opacity-100">
                          <ImageIcon className="w-2.5 h-2.5" />
                        </span>
                      </button>
                    ))}
                  </div>
                )}

                {rev.sellerReply && (
                  <div className="mt-2 bg-[#F7F8FA] border border-[#ECEEF2] rounded-[2px] p-3 text-[12px]">
                    <div className="font-semibold text-[#E4002B] mb-0.5">
                      RedMart Official Response
                    </div>
                    <p className="text-[#595959]">{rev.sellerReply}</p>
                  </div>
                )}

                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => onToggleHelpful(rev.id)}
                    className={`inline-flex items-center gap-1.5 text-[12px] transition-colors cursor-pointer ${
                      helpfulActive
                        ? 'text-[#F57224] font-semibold'
                        : 'text-[#757575] hover:text-[#212121]'
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span className="tabular-nums">
                      Helpful ({rev.helpfulCount + (helpfulActive ? 1 : 0)})
                    </span>
                  </button>
                </div>
              </article>
            );
          })
        )}
      </div>

      {/* Review Photo Lightbox */}
      {previewPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4"
          onClick={() => setPreviewPhoto(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-white rounded-[4px] p-3 max-w-[520px] w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setPreviewPhoto(null)}
              className="absolute top-2.5 right-2.5 p-1 bg-white rounded-full border border-[#E0E0E0] text-[#595959] hover:text-[#212121] cursor-pointer"
              aria-label="Close review photo"
            >
              <X className="w-4 h-4" />
            </button>
            <img
              src={previewPhoto}
              alt="Customer review photo"
              referrerPolicy="no-referrer"
              className="w-full max-h-[70vh] object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
};
