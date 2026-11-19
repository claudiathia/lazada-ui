import React, { useState } from 'react';
import {
  MapPin,
  Truck,
  CalendarClock,
  RotateCcw,
  ShieldAlert,
  MessageSquare,
  Store,
  CheckCircle2,
  X,
  Send,
} from 'lucide-react';
import {
  SINGAPORE_AREAS,
  DELIVERY_SLOTS,
  DeliverySlot,
} from '../data/productData';
import { RedMartWordmark } from './SingaporeMarks';

interface DeliverySellerSidebarProps {
  selectedArea: (typeof SINGAPORE_AREAS)[number];
  onSelectArea: (area: (typeof SINGAPORE_AREAS)[number]) => void;
  selectedSlot: DeliverySlot;
  onSelectSlot: (slot: DeliverySlot) => void;
  onShowToast: (msg: string) => void;
}

export const DeliverySellerSidebar: React.FC<DeliverySellerSidebarProps> = ({
  selectedArea,
  onSelectArea,
  selectedSlot,
  onSelectSlot,
  onShowToast,
}) => {
  const [areaPickerOpen, setAreaPickerOpen] = useState(false);
  const [slotPickerOpen, setSlotPickerOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'RedMart Support',
      text: 'Hello! Ask us about Coca-Cola Zero Sugar batch expiry dates, carton packaging, or RedMart delivery windows.',
      time: 'Just now',
    },
  ]);

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = chatInput.trim();
    if (!trimmed) return;
    setChatMessages((prev) => [
      ...prev,
      { sender: 'You', text: trimmed, time: 'Now' },
      {
        sender: 'RedMart Support',
        text: 'Thanks for checking! Our current 24 x 320ml cartons ship directly from our Singapore warehouse with minimum 4 months shelf life and next-day scheduled delivery.',
        time: 'Now',
      },
    ]);
    setChatInput('');
  };

  return (
    <aside className="bg-[#FAFAFA] border-t lg:border-t-0 lg:border-l border-[#ECEEF2] rounded-[2px] flex flex-col justify-between text-[13px]">
      <div>
        {/* Delivery Options */}
        <div className="p-4 border-b border-[#ECEEF2]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[12px] font-semibold text-[#757575]">Delivery Options</span>
            <span className="text-[11px] text-[#0F82A5] font-medium">Islandwide SG</span>
          </div>

          {/* Address Row */}
          <div className="flex items-start justify-between gap-2 pb-3 border-b border-[#EFEFEF]">
            <div className="flex items-start gap-2.5 min-w-0">
              <MapPin className="w-4 h-4 text-[#757575] shrink-0 mt-0.5" />
              <span className="text-[13px] text-[#212121] leading-snug">
                Singapore, {selectedArea.region}, {selectedArea.district}, {selectedArea.postal}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setAreaPickerOpen((prev) => !prev)}
              className="text-[12px] font-semibold text-[#1A9CB7] hover:underline shrink-0 cursor-pointer"
            >
              CHANGE
            </button>
          </div>

          {/* Inline Area Dropdown */}
          {areaPickerOpen && (
            <div className="my-2 bg-white border border-[#DCDFE6] rounded-[2px] p-2 space-y-1 shadow-xs">
              <div className="text-[11px] font-semibold text-[#595959] px-1.5 py-0.5">
                Select Singapore Delivery District
              </div>
              {SINGAPORE_AREAS.map((area) => (
                <button
                  key={area.postal}
                  type="button"
                  onClick={() => {
                    onSelectArea(area);
                    setAreaPickerOpen(false);
                    onShowToast(`Delivery postal updated to ${area.district} (${area.postal})`);
                  }}
                  className={`w-full text-left px-2 py-1.5 text-[12px] rounded-[2px] transition-colors cursor-pointer ${
                    area.postal === selectedArea.postal
                      ? 'bg-[#FFF5EE] text-[#F57224] font-semibold'
                      : 'hover:bg-[#F5F5F5] text-[#333]'
                  }`}
                >
                  {area.label}
                </button>
              ))}
            </div>
          )}

          {/* RedMart Scheduled Delivery */}
          <div className="pt-3 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-2.5">
                <Truck className="w-4 h-4 text-[#E4002B] shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-[#212121]">RedMart Scheduled Delivery</div>
                  <div className="text-[12px] text-[#595959] mt-0.5">
                    {selectedSlot.dayLabel} ({selectedSlot.dateLabel}) ·{' '}
                    <span className="font-medium text-[#212121]">{selectedSlot.windowLabel}</span>
                  </div>
                  <div className="text-[11px] text-[#146B3A] mt-0.5 font-medium">
                    Free delivery for orders $60.00+ ($3.99 below $60)
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSlotPickerOpen((prev) => !prev)}
                className="text-[12px] font-semibold text-[#1A9CB7] hover:underline shrink-0 cursor-pointer"
              >
                SLOTS
              </button>
            </div>

            {slotPickerOpen && (
              <div className="bg-white border border-[#DCDFE6] rounded-[2px] p-2 space-y-1 shadow-xs">
                <div className="text-[11px] font-semibold text-[#595959] px-1.5 py-0.5">
                  Choose RedMart Delivery Window
                </div>
                {DELIVERY_SLOTS.map((slot) => (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() => {
                      onSelectSlot(slot);
                      setSlotPickerOpen(false);
                      onShowToast(`Delivery slot set to ${slot.dayLabel}, ${slot.windowLabel}`);
                    }}
                    className={`w-full text-left px-2 py-1.5 text-[12px] rounded-[2px] flex items-center justify-between cursor-pointer ${
                      slot.id === selectedSlot.id
                        ? 'bg-[#FFF5EE] text-[#F57224] font-semibold'
                        : 'hover:bg-[#F5F5F5] text-[#333]'
                    }`}
                  >
                    <span>
                      {slot.dayLabel} · {slot.windowLabel}
                    </span>
                    <span className="text-[10px] text-[#757575]">{slot.feeLabel}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Add Items to Delivery */}
            <div className="flex items-start gap-2.5">
              <CalendarClock className="w-4 h-4 text-[#757575] shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-[#212121]">Add Items to Delivery</div>
                <div className="text-[12px] text-[#757575] leading-snug">
                  Top up an upcoming RedMart slot before 11:00 PM with zero extra delivery fee.
                </div>
              </div>
            </div>

            {/* Freshness / Handling */}
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#146B3A] shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-[#212121]">Careful Carton Handling</div>
                <div className="text-[12px] text-[#757575] leading-snug">
                  Dedicated RedMart fleet delivery right to your doorstep.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Return & Warranty */}
        <div className="p-4 border-b border-[#ECEEF2] space-y-2.5">
          <div className="text-[12px] font-semibold text-[#757575]">Return &amp; Warranty</div>
          <div className="flex items-start gap-2.5">
            <RotateCcw className="w-4 h-4 text-[#757575] shrink-0 mt-0.5" />
            <div>
              <div className="font-medium text-[#212121]">7 Days Easy Return</div>
              <div className="text-[12px] text-[#757575]">
                Damaged or dented cans refunded within 7 days of delivery
              </div>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-[#757575] shrink-0 mt-0.5" />
            <div>
              <div className="font-medium text-[#212121]">Warranty not available</div>
              <div className="text-[12px] text-[#757575]">Standard grocery freshness guarantee</div>
            </div>
          </div>
        </div>
      </div>

      {/* Sold By RedMart Box */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-[11px] text-[#757575]">Sold by</div>
            <div className="mt-0.5 flex items-center gap-1.5">
              <RedMartWordmark size="sm" />
              <span className="text-[11px] text-[#595959]">(Lazada SG)</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setChatOpen(true)}
            className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#1A9CB7] hover:text-[#127D93] px-2 py-1 rounded-[2px] hover:bg-white transition-colors cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Chat</span>
          </button>
        </div>

        <div className="grid grid-cols-3 border border-[#ECEEF2] bg-white rounded-[2px] divide-x divide-[#ECEEF2] text-center">
          <div className="p-2">
            <div className="text-[11px] text-[#757575] leading-tight">Positive Seller Ratings</div>
            <div className="text-[18px] font-bold text-[#212121] mt-1 tabular-nums">97%</div>
          </div>
          <div className="p-2">
            <div className="text-[11px] text-[#757575] leading-tight">Ship on Time</div>
            <div className="text-[18px] font-bold text-[#212121] mt-1 tabular-nums">99%</div>
          </div>
          <div className="p-2">
            <div className="text-[11px] text-[#757575] leading-tight">Chat Response Rate</div>
            <div className="text-[18px] font-bold text-[#212121] mt-1 tabular-nums">98%</div>
          </div>
        </div>

        <div className="mt-3 text-center">
          <a
            href="#shelf"
            className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#1A9CB7] hover:underline"
          >
            <Store className="w-3.5 h-3.5" />
            <span>VISIT REDMART STORE</span>
          </a>
        </div>
      </div>

      {/* Live RedMart Seller Chat Popover */}
      {chatOpen && (
        <div
          className="fixed bottom-4 right-4 z-50 w-[330px] bg-white border border-[#DCDFE6] shadow-2xl rounded-[4px] overflow-hidden flex flex-col"
          role="dialog"
          aria-label="Chat with RedMart"
        >
          <div className="bg-[#0F146D] text-white px-4 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[13px] font-semibold">
              <MessageSquare className="w-4 h-4 text-[#F57224]" />
              <span>Chat with RedMart</span>
            </div>
            <button
              type="button"
              onClick={() => setChatOpen(false)}
              className="text-white/80 hover:text-white cursor-pointer"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="p-3 h-[210px] overflow-y-auto bg-[#F7F8FA] space-y-2.5 text-[12px]">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${
                  msg.sender === 'You' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] px-3 py-2 rounded-[4px] ${
                    msg.sender === 'You'
                      ? 'bg-[#F57224] text-white'
                      : 'bg-white border border-[#E5E7EB] text-[#212121]'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-[#888] mt-0.5">{msg.time}</span>
              </div>
            ))}
          </div>
          <form onSubmit={handleSendChat} className="p-2 border-t border-[#ECEEF2] flex gap-1.5 bg-white">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask about expiry, stock, or delivery..."
              className="flex-1 text-[12px] px-2.5 py-1.5 border border-[#DCDFE6] rounded-[2px] focus:outline-none focus:border-[#F57224]"
            />
            <button
              type="submit"
              aria-label="Send message"
              className="px-3 py-1.5 bg-[#F57224] text-white rounded-[2px] hover:bg-[#DF6116] cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </aside>
  );
};
