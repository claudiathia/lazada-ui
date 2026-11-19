import React from 'react';
import { Star, Plus } from 'lucide-react';
import { RELATED_SHELF_PRODUCTS, RelatedProduct } from '../data/productData';
import { NutriGradeBadge, ShelfBeverageIllustration } from './SingaporeMarks';

interface RelatedShelfProps {
  onAddProduct: (product: RelatedProduct) => void;
  onShowToast: (msg: string) => void;
}

export const RelatedShelf: React.FC<RelatedShelfProps> = ({
  onAddProduct,
  onShowToast,
}) => {
  return (
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
              {/* Square Product Visual */}
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

              {/* Card Details */}
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
  );
};
