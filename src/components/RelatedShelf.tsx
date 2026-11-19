import React from 'react';
import { Star, Plus, Trophy, Check } from 'lucide-react';
import {
  RELATED_SHELF_PRODUCTS,
  TOP_FIVE_DRINKS,
  RelatedProduct,
} from '../data/productData';
import { NutriGradeBadge, ShelfBeverageIllustration } from './SingaporeMarks';

interface RelatedShelfProps {
  onAddProduct: (product: RelatedProduct) => void;
  onShowToast: (msg: string) => void;
  onAddCurrentProduct: () => void;
}

export const RelatedShelf: React.FC<RelatedShelfProps> = ({
  onAddProduct,
  onShowToast,
  onAddCurrentProduct,
}) => {
  return (
    <div className="space-y-4">
      {/* Top 5 Most Purchased Drinks Leaderboard (Status + Recognition) */}
      <section
        id="top-drinks"
        className="bg-white rounded-[2px] border border-[#ECEEF2] overflow-hidden"
      >
        <div className="px-5 py-3.5 bg-[#FAFAFA] border-b border-[#ECEEF2] flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-[#D49B00]" />
            <h2 className="text-[16px] font-semibold text-[#212121]">
              Top 5 Most Purchased Drinks on RedMart
            </h2>
          </div>
          <span className="text-[12px] text-[#757575]">
            Updated weekly · Verified Singapore repeat orders
          </span>
        </div>

        <div className="divide-y divide-[#F0F0F0]">
          {TOP_FIVE_DRINKS.map((drink) => (
            <div
              key={drink.id}
              className={`px-5 py-3 flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 transition-colors ${
                drink.isCurrentProduct ? 'bg-[#FFFDF7]' : 'hover:bg-[#FAFAFA]'
              }`}
            >
              <div className="flex items-center gap-3.5 min-w-0 flex-1">
                {/* Rank Number */}
                <span
                  className={`w-7 h-7 rounded-[2px] flex items-center justify-center text-[13px] font-extrabold tabular-nums shrink-0 ${
                    drink.rank === 1
                      ? 'bg-[#D49B00] text-white'
                      : drink.rank <= 3
                      ? 'bg-[#0F146D] text-white'
                      : 'bg-[#EFF0F5] text-[#424242]'
                  }`}
                >
                  #{drink.rank}
                </span>

                {/* Thumbnail */}
                <div className="w-12 h-12 border border-[#ECEEF2] rounded-[2px] bg-white p-1 shrink-0">
                  {drink.image ? (
                    <img
                      src={drink.image}
                      alt={drink.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain"
                    />
                  ) : drink.svgType ? (
                    <ShelfBeverageIllustration type={drink.svgType} />
                  ) : null}
                </div>

                {/* Title & Social Proof Metadata */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[13.5px] font-semibold text-[#212121] truncate">
                      {drink.title}
                    </span>
                    <NutriGradeBadge grade={drink.nutriGrade} compact />
                    {drink.isCurrentProduct && (
                      <span className="text-[11px] font-semibold text-[#146B3A] inline-flex items-center gap-0.5">
                        <Check className="w-3 h-3" />
                        Viewing now
                      </span>
                    )}
                  </div>
                  <div className="text-[12px] text-[#757575] mt-0.5 flex flex-wrap items-center gap-2 tabular-nums">
                    <span>{drink.soldCountLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#595959]">{drink.repurchaseLabel}</span>
                  </div>
                </div>
              </div>

              {/* Price & Quick Add */}
              <div className="flex items-center gap-4 shrink-0 ml-auto">
                <span className="text-[16px] font-bold text-[#F57224] tabular-nums">
                  ${drink.price.toFixed(2)}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    if (drink.isCurrentProduct) {
                      onAddCurrentProduct();
                    } else if (drink.relatedProduct) {
                      onAddProduct(drink.relatedProduct);
                    }
                  }}
                  className="px-3 py-1.5 border border-[#F57224] text-[#F57224] hover:bg-[#F57224] hover:text-white text-[12px] font-semibold rounded-[2px] flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Customers Also Bought Shelf */}
      <section id="shelf" className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[18px] font-semibold text-[#212121]">
              RedMart Beverage Shelf · Customers Also Bought
            </h2>
            <p className="text-[12px] text-[#757575]">
              Stock up to $60.00 for free scheduled islandwide RedMart delivery
            </p>
          </div>
          <button
            type="button"
            onClick={() => onShowToast('Viewing RedMart Beverages Aisle')}
            className="text-[13px] font-semibold text-[#1A9CB7] hover:underline whitespace-nowrap cursor-pointer"
          >
            View All Beverages &gt;
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {RELATED_SHELF_PRODUCTS.map((prod) => (
            <article
              key={prod.id}
              className="bg-white border border-[#ECEEF2] rounded-[2px] flex flex-col justify-between hover:shadow-md hover:-translate-y-0.5 transition-all duration-150 overflow-hidden"
            >
              <div>
                <div className="relative aspect-square bg-white p-2 border-b border-[#F5F5F5]">
                  {prod.image ? (
                    <img
                      src={prod.image}
                      alt={prod.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain"
                    />
                  ) : prod.svgType ? (
                    <ShelfBeverageIllustration type={prod.svgType} />
                  ) : null}

                  <div className="absolute top-2 left-2">
                    <NutriGradeBadge grade={prod.nutriGrade} compact />
                  </div>
                </div>

                <div className="p-2.5">
                  <h3 className="text-[12.5px] font-medium text-[#212121] leading-snug line-clamp-2 min-h-[34px]">
                    {prod.title}
                  </h3>

                  <div className="mt-2 flex items-baseline gap-1.5">
                    <span className="text-[16px] font-bold text-[#F57224] tabular-nums">
                      ${prod.price.toFixed(2)}
                    </span>
                    {prod.originalPrice && (
                      <span className="text-[11px] text-[#9E9E9E] line-through tabular-nums">
                        ${prod.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  {prod.discountPercent && (
                    <div className="text-[11px] font-medium text-[#212121] tabular-nums">
                      -{prod.discountPercent}%
                    </div>
                  )}

                  <div className="mt-1.5 flex items-center gap-1 text-[11px] text-[#757575]">
                    <Star className="w-3 h-3 fill-[#FACA51] text-[#FACA51]" />
                    <span className="tabular-nums">{prod.rating}</span>
                    <span className="tabular-nums">({prod.ratingCount})</span>
                    <span aria-hidden="true">·</span>
                    <span>{prod.soldText}</span>
                  </div>
                </div>
              </div>

              <div className="p-2.5 pt-0">
                <button
                  type="button"
                  onClick={() => onAddProduct(prod)}
                  className="w-full py-1.5 px-2 border border-[#F57224] text-[#F57224] hover:bg-[#F57224] hover:text-white text-[12px] font-semibold rounded-[2px] flex items-center justify-center gap-1 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
