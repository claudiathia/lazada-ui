import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, X } from 'lucide-react';
import { GALLERY_ITEMS, NUTRITION_ROWS } from '../data/productData';
import { NutriGradeBadge, HealthierChoiceMark, RedMartWordmark } from './SingaporeMarks';

interface ProductGalleryProps {
  activeIndex: number;
  onSelectIndex: (idx: number) => void;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  activeIndex,
  onSelectIndex,
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [imgErrorMap, setImgErrorMap] = useState<Record<string, boolean>>({});

  const currentItem = GALLERY_ITEMS[activeIndex] ?? GALLERY_ITEMS[0];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomOrigin({ x, y });
  };

  const handlePrev = () => {
    onSelectIndex((activeIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
  };

  const handleNext = () => {
    onSelectIndex((activeIndex + 1) % GALLERY_ITEMS.length);
  };

  return (
    <div className="w-full">
      {/* Main Stage */}
      <div
        className="relative aspect-square w-full bg-white border border-[#ECEEF2] rounded-[2px] overflow-hidden cursor-zoom-in group"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onMouseMove={handleMouseMove}
        onClick={() => setLightboxOpen(true)}
      >
        {currentItem.type === 'image' && currentItem.src && !imgErrorMap[currentItem.id] ? (
          <img
            src={currentItem.src}
            alt={currentItem.alt}
            referrerPolicy="no-referrer"
            onError={() => setImgErrorMap((prev) => ({ ...prev, [currentItem.id]: true }))}
            className="w-full h-full object-contain p-2 transition-transform duration-150 ease-out"
            style={
              isHovering
                ? {
                    transform: 'scale(1.85)',
                    transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`,
                  }
                : { transform: 'scale(1)' }
            }
          />
        ) : currentItem.type === 'nutrition-card' ? (
          <div className="w-full h-full p-5 flex flex-col justify-between bg-white text-[#212121]">
            <div>
              <div className="flex items-center justify-between border-b-2 border-[#212121] pb-2 mb-3">
                <div>
                  <div className="text-[14px] font-extrabold tracking-tight uppercase">
                    Nutrition Information
                  </div>
                  <div className="text-[11px] text-[#595959]">
                    Servings per pack: 24 · Serving size: 320ml (1 can)
                  </div>
                </div>
                <NutriGradeBadge grade="B" />
              </div>

              <table className="w-full text-[11px] tabular-nums">
                <thead>
                  <tr className="border-b border-[#D9DCE3] text-[#595959]">
                    <th className="text-left py-1 font-semibold">Nutrient</th>
                    <th className="text-right py-1 font-semibold">Per 100ml</th>
                    <th className="text-right py-1 font-semibold">Per 320ml Can</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F2F4]">
                  {NUTRITION_ROWS.map((row) => (
                    <tr key={row.nutrient}>
                      <td className="py-1 font-medium text-[#212121]">{row.nutrient}</td>
                      <td className="py-1 text-right text-[#595959]">{row.per100ml}</td>
                      <td className="py-1 text-right font-semibold text-[#212121]">
                        {row.perServing}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pt-2 border-t border-[#EBEBEB] flex items-center justify-between gap-2">
              <HealthierChoiceMark />
              <span className="text-[10px] text-[#757575] text-right">
                Zero Sugar · Zero Calories
              </span>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#F8F9FA] text-[#757575] p-6 text-center">
            <RedMartWordmark />
            <p className="text-[13px] mt-2 font-medium text-[#424242]">{currentItem.alt}</p>
          </div>
        )}

        {/* Top-left RedMart Flag */}
        <div className="absolute top-2.5 left-2.5 pointer-events-none bg-white/95 border border-[#ECEEF2] px-2 py-1 rounded-[2px] shadow-xs">
          <RedMartWordmark size="sm" />
        </div>

        {/* Bottom-right Zoom Hint */}
        <div className="absolute bottom-2.5 right-2.5 pointer-events-none bg-black/55 text-white text-[11px] px-2 py-1 rounded-[2px] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <ZoomIn className="w-3.5 h-3.5" />
          <span>Click to expand</span>
        </div>
      </div>

      {/* Thumbnail Carousel */}
      <div className="mt-3 flex items-center gap-1.5">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous product image"
          className="w-6 h-[54px] flex items-center justify-center text-[#757575] hover:text-[#212121] hover:bg-[#F5F5F5] rounded-[2px] shrink-0 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex-1 grid grid-cols-5 gap-2">
          {GALLERY_ITEMS.map((item, idx) => {
            const active = idx === activeIndex;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectIndex(idx)}
                aria-label={item.caption}
                className={`aspect-square rounded-[2px] bg-white overflow-hidden border transition-all cursor-pointer ${
                  active
                    ? 'border-[#F57224] ring-1 ring-[#F57224]'
                    : 'border-[#E5E7EB] hover:border-[#BDBDBD]'
                }`}
              >
                {item.type === 'image' && item.src ? (
                  <img
                    src={item.src}
                    alt={item.caption}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain p-0.5"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-[#F4FAF5] text-[#146B3A] p-1">
                    <span className="text-[9px] font-extrabold leading-tight">NUTRI</span>
                    <span className="text-[13px] font-black text-[#8CC63F] leading-none">B</span>
                    <span className="text-[8px] text-[#555] leading-none mt-0.5">FACTS</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next product image"
          className="w-6 h-[54px] flex items-center justify-center text-[#757575] hover:text-[#212121] hover:bg-[#F5F5F5] rounded-[2px] shrink-0 cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Fullscreen Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="bg-white rounded-[4px] max-w-[680px] w-full overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#ECEEF2]">
              <span className="text-[13px] font-semibold text-[#212121]">
                {currentItem.caption} ({activeIndex + 1} / {GALLERY_ITEMS.length})
              </span>
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="p-1 text-[#757575] hover:text-[#212121] cursor-pointer"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative bg-white aspect-square max-h-[70vh] mx-auto flex items-center justify-center p-4">
              {currentItem.type === 'image' && currentItem.src ? (
                <img
                  src={currentItem.src}
                  alt={currentItem.alt}
                  referrerPolicy="no-referrer"
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <div className="w-full max-w-[440px] border border-[#E5E7EB] p-6 rounded-[4px]">
                  <div className="flex items-center justify-between border-b-2 border-[#212121] pb-2 mb-3">
                    <span className="text-[16px] font-extrabold uppercase">
                      Nutrition Information
                    </span>
                    <NutriGradeBadge grade="B" />
                  </div>
                  <table className="w-full text-[13px] tabular-nums">
                    <thead>
                      <tr className="border-b border-[#D9DCE3] text-[#595959]">
                        <th className="text-left py-1.5">Nutrient</th>
                        <th className="text-right py-1.5">Per 100ml</th>
                        <th className="text-right py-1.5">Per 320ml</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F1F2F4]">
                      {NUTRITION_ROWS.map((row) => (
                        <tr key={row.nutrient}>
                          <td className="py-1.5 font-medium">{row.nutrient}</td>
                          <td className="py-1.5 text-right text-[#595959]">{row.per100ml}</td>
                          <td className="py-1.5 text-right font-semibold">{row.perServing}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 border border-[#E0E0E0] shadow flex items-center justify-center hover:bg-white cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 border border-[#E0E0E0] shadow flex items-center justify-center hover:bg-white cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
