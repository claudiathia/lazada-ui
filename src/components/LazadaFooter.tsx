import React from 'react';
import { LazadaWordmark, RedMartWordmark } from './SingaporeMarks';

export const LazadaFooter: React.FC = () => {
  return (
    <footer className="mt-10 bg-white border-t border-[#E5E7EB] text-[12px] text-[#595959]">
      <div className="max-w-[1188px] mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="space-y-2">
          <h3 className="text-[13px] font-semibold text-[#0F146D] mb-3">Customer Care</h3>
          <ul className="space-y-1.5">
            <li><a href="#top" className="hover:text-[#F57224]">Help Center</a></li>
            <li><a href="#top" className="hover:text-[#F57224]">How to Buy on RedMart</a></li>
            <li><a href="#top" className="hover:text-[#F57224]">RedMart Delivery Slots</a></li>
            <li><a href="#top" className="hover:text-[#F57224]">Freshness &amp; Return Policy</a></li>
            <li><a href="#top" className="hover:text-[#F57224]">Price Match Guarantee</a></li>
          </ul>
        </div>

        <div className="space-y-2">
          <h3 className="text-[13px] font-semibold text-[#0F146D] mb-3">Lazada &amp; RedMart SG</h3>
          <ul className="space-y-1.5">
            <li><a href="#top" className="hover:text-[#F57224]">About RedMart</a></li>
            <li><a href="#top" className="hover:text-[#F57224]">Terms &amp; Conditions</a></li>
            <li><a href="#top" className="hover:text-[#F57224]">Privacy Policy</a></li>
            <li><a href="#top" className="hover:text-[#F57224]">Halal &amp; Nutri-Grade Guide</a></li>
          </ul>
        </div>

        <div className="space-y-2">
          <h3 className="text-[13px] font-semibold text-[#0F146D] mb-3">Payment Methods</h3>
          <div className="flex flex-wrap gap-2 text-[11px] font-semibold text-[#424242]">
            <span className="px-2 py-1 border border-[#E0E2E7] rounded-[2px] bg-[#FAFAFA]">VISA</span>
            <span className="px-2 py-1 border border-[#E0E2E7] rounded-[2px] bg-[#FAFAFA]">Mastercard</span>
            <span className="px-2 py-1 border border-[#E0E2E7] rounded-[2px] bg-[#FAFAFA]">PayNow</span>
            <span className="px-2 py-1 border border-[#E0E2E7] rounded-[2px] bg-[#FAFAFA]">GrabPay</span>
            <span className="px-2 py-1 border border-[#E0E2E7] rounded-[2px] bg-[#FAFAFA]">Cash on Delivery</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <LazadaWordmark />
            <span className="h-4 w-px bg-[#E0E2E7]" aria-hidden="true" />
            <RedMartWordmark size="sm" />
          </div>
          <p className="text-[12px] text-[#757575] leading-relaxed">
            Islandwide scheduled grocery delivery across Singapore. Price Match Guaranteed on
            thousands of daily essentials.
          </p>
        </div>
      </div>

      <div className="bg-[#EFF0F5] border-t border-[#E5E7EB]">
        <div className="max-w-[1188px] mx-auto px-4 py-3.5 flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#757575]">
          <span>© Lazada Singapore · RedMart Groceries</span>
          <span>SKU: 2034443802-s11107987307 · Singapore (SGD)</span>
        </div>
      </div>
    </footer>
  );
};
