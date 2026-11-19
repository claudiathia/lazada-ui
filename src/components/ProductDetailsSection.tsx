import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import {
  PRODUCT_TITLE,
  NUTRITION_ROWS,
  PRODUCT_SPECIFICATIONS,
} from '../data/productData';
import { NutriGradeBadge, HealthierChoiceMark } from './SingaporeMarks';

export const ProductDetailsSection: React.FC = () => {
  const [expanded, setExpanded] = useState(true);

  return (
    <section
      id="specifications"
      className="bg-white rounded-[2px] border border-[#ECEEF2] overflow-hidden"
    >
      {/* Section Header */}
      <div className="px-5 py-3.5 bg-[#FAFAFA] border-b border-[#ECEEF2] flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-[16px] font-semibold text-[#212121]">
          Product details of {PRODUCT_TITLE}
        </h2>
        <div className="flex items-center gap-2">
          <HealthierChoiceMark />
          <NutriGradeBadge grade="B" />
        </div>
      </div>

      {/* Section Jump Bar */}
      <div className="px-5 py-2.5 border-b border-[#F0F0F0] flex items-center gap-6 overflow-x-auto text-[13px]">
        <a
          href="#highlights"
          className="text-[#F57224] font-semibold whitespace-nowrap shrink-0"
        >
          Highlights &amp; Description
        </a>
        <a
          href="#nutrition"
          className="text-[#595959] hover:text-[#F57224] whitespace-nowrap shrink-0"
        >
          Nutrition Information
        </a>
        <a
          href="#specs-table"
          className="text-[#595959] hover:text-[#F57224] whitespace-nowrap shrink-0"
        >
          Specifications
        </a>
        <a
          href="#reviews"
          className="text-[#595959] hover:text-[#F57224] whitespace-nowrap shrink-0"
        >
          Ratings &amp; Reviews
        </a>
        <a
          href="#qa"
          className="text-[#595959] hover:text-[#F57224] whitespace-nowrap shrink-0"
        >
          Questions &amp; Answers
        </a>
      </div>

      <div className="p-5 space-y-6 text-[13px] text-[#424242] leading-relaxed">
        {/* Highlights */}
        <div id="highlights" className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-[14px] font-semibold text-[#212121] mb-2.5">
              Product Highlights
            </h3>
            <ul className="list-disc pl-5 space-y-1.5 text-[#424242]">
              <li>
                Classic, refreshing Coca-Cola taste with <strong>zero sugar</strong> and{' '}
                <strong>zero calories</strong>.
              </li>
              <li>
                Value carton case containing <strong>24 × 320ml</strong> sleek aluminum cans (7.68L
                total).
              </li>
              <li>
                Certified with Singapore HPB <strong>Healthier Choice Symbol</strong> (Lower in
                Sugar) and <strong>Nutri-Grade B</strong> (0% Sugar).
              </li>
              <li>Halal certified and suitable for everyday pantry stocking, gatherings, and offices.</li>
              <li>
                <strong>[Packaging May Vary]</strong>: Outer carton or can artwork may alternate
                between classic black-band and updated red Coca-Cola Zero Sugar designs while the
                formulation remains identical.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[14px] font-semibold text-[#212121] mb-2.5">
              Ingredients &amp; Storage
            </h3>
            <p className="text-[#595959] mb-3">
              Carbonated Water, Colour (Caramel E150d), Phosphoric Acid, Sweeteners (Aspartame,
              Acesulfame-K), Acidity Regulator (Sodium Citrate), Flavourings (including Caffeine).
              Contains phenylalanine.
            </p>
            <div className="bg-[#FAFAFA] border border-[#ECEEF2] rounded-[2px] p-3 text-[12px] text-[#595959]">
              <strong className="text-[#212121]">Storage Advice:</strong> Store unopened cartons in
              a cool, dry place away from direct sunlight. Best served chilled at 3°C–5°C over ice.
            </div>
          </div>
        </div>

        {expanded && (
          <>
            {/* Nutrition Table */}
            <div id="nutrition" className="pt-4 border-t border-[#F0F0F0]">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-[14px] font-semibold text-[#212121]">
                    Nutrition Information (Singapore Standard)
                  </h3>
                  <p className="text-[12px] text-[#757575]">
                    Serving Size: 320ml (1 Can) · Servings Per Case: 24
                  </p>
                </div>
                <span className="text-[12px] text-[#146B3A] font-medium">
                  Nutri-Grade B · 0g Sugar per serving
                </span>
              </div>

              <div className="overflow-x-auto border border-[#ECEEF2] rounded-[2px]">
                <table className="w-full text-[13px] tabular-nums">
                  <thead className="bg-[#FAFAFA] border-b border-[#ECEEF2] text-[#595959]">
                    <tr>
                      <th className="text-left px-4 py-2.5 font-semibold">Nutrient</th>
                      <th className="text-right px-4 py-2.5 font-semibold">Per 100ml</th>
                      <th className="text-right px-4 py-2.5 font-semibold">Per Serving (320ml Can)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F2F3F5]">
                    {NUTRITION_ROWS.map((row) => (
                      <tr key={row.nutrient} className="hover:bg-[#FAFAFA]">
                        <td className="px-4 py-2 text-[#212121] font-medium">{row.nutrient}</td>
                        <td className="px-4 py-2 text-right text-[#595959]">{row.per100ml}</td>
                        <td className="px-4 py-2 text-right font-semibold text-[#212121]">
                          {row.perServing}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Specifications Grid */}
            <div id="specs-table" className="pt-4 border-t border-[#F0F0F0]">
              <h3 className="text-[14px] font-semibold text-[#212121] mb-3">
                Specifications of {PRODUCT_TITLE}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2.5">
                {PRODUCT_SPECIFICATIONS.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-[#F3F4F6] gap-1"
                  >
                    <span className="text-[12px] text-[#757575] shrink-0">{spec.label}</span>
                    <span className="text-[13px] text-[#212121] sm:text-right font-medium">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Expand / Collapse Bar */}
        <div className="pt-2 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="inline-flex items-center gap-1.5 px-5 py-1.5 text-[12px] font-semibold text-[#1A9CB7] border border-[#1A9CB7] rounded-[2px] hover:bg-[#1A9CB7]/5 transition-colors cursor-pointer"
          >
            {expanded ? (
              <>
                <span>SHOW LESS</span>
                <ChevronUp className="w-3.5 h-3.5" />
              </>
            ) : (
              <>
                <span>VIEW MORE SPECIFICATIONS</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};
