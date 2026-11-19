import React from 'react';

export const LazadaWordmark: React.FC<{ className?: string }> = ({ className = 'h-7' }) => (
  <div className={`inline-flex items-center gap-2 select-none ${className}`}>
    <svg viewBox="0 0 36 32" className="h-7 w-8 shrink-0" aria-hidden="true">
      <defs>
        <linearGradient id="lazadaHeartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF9300" />
          <stop offset="48%" stopColor="#FF3D5E" />
          <stop offset="100%" stopColor="#6C1DFF" />
        </linearGradient>
      </defs>
      <path
        d="M18 30.2c-.6 0-1.2-.2-1.7-.5L4.1 22.1C2.8 21.3 2 19.9 2 18.4V8.9c0-1.6.9-3 2.3-3.7l4.6-2.4c1.1-.6 2.5-.5 3.5.3l4.3 3.2c.8.6 1.8.6 2.6 0l4.3-3.2c1-.8 2.4-.9 3.5-.3l4.6 2.4C33.1 5.9 34 7.3 34 8.9v9.5c0 1.5-.8 2.9-2.1 3.7l-12.2 7.6c-.5.3-1.1.5-1.7.5z"
        fill="url(#lazadaHeartGrad)"
      />
      <path
        d="M18 29.8V14.5l14.5-8.2c.9.7 1.5 1.7 1.5 2.9v9.2c0 1.4-.7 2.7-1.9 3.5l-12.5 7.8c-.5.3-1.1.4-1.6.1z"
        fill="#1E1168"
        fillOpacity="0.14"
      />
    </svg>
    <span className="text-[22px] font-extrabold tracking-tight text-[#0F146D] leading-none">
      Lazada
    </span>
  </div>
);

export const RedMartWordmark: React.FC<{ size?: 'sm' | 'md' }> = ({ size = 'md' }) => (
  <span
    className={`inline-flex items-center font-extrabold tracking-tight leading-none select-none ${
      size === 'sm' ? 'text-[15px]' : 'text-[19px]'
    }`}
  >
    <span className="text-[#E4002B]">Red</span>
    <span className="text-[#1D252C]">Mart</span>
  </span>
);

export const NutriGradeBadge: React.FC<{ grade?: 'A' | 'B' | 'C' | 'D'; compact?: boolean }> = ({
  grade = 'B',
  compact = false,
}) => {
  const tiers: Array<{ key: 'A' | 'B' | 'C' | 'D'; bg: string }> = [
    { key: 'A', bg: '#008C45' },
    { key: 'B', bg: '#8CC63F' },
    { key: 'C', bg: '#F7941D' },
    { key: 'D', bg: '#ED1C24' },
  ];

  if (compact) {
    const activeColor = tiers.find((t) => t.key === grade)?.bg ?? '#8CC63F';
    return (
      <span
        className="inline-flex items-center border border-[#D9DCE3] bg-white rounded-[3px] overflow-hidden text-[10px] font-bold leading-none select-none"
        title={`Singapore Nutri-Grade ${grade}`}
      >
        <span className="px-1 py-0.5 text-[#555] bg-[#F7F8FA]">NUTRI</span>
        <span className="px-1.5 py-0.5 text-white" style={{ backgroundColor: activeColor }}>
          {grade}
        </span>
      </span>
    );
  }

  return (
    <div
      className="inline-flex items-stretch border border-[#CFCFCF] bg-white rounded-[3px] overflow-hidden select-none"
      title={`Singapore Nutri-Grade ${grade} (0% Sugar)`}
    >
      <div className="bg-[#F6F6F6] px-1.5 py-1 flex flex-col justify-center border-r border-[#E0E0E0]">
        <span className="text-[8px] font-extrabold tracking-wider text-[#222] leading-none">
          NUTRI-GRADE
        </span>
        <span className="text-[8px] text-[#666] leading-tight mt-0.5">0% Sugar</span>
      </div>
      <div className="flex items-center gap-[2px] px-1 py-0.5 bg-white">
        {tiers.map((t) => {
          const isActive = t.key === grade;
          return (
            <span
              key={t.key}
              className={`inline-flex items-center justify-center font-extrabold transition-transform ${
                isActive
                  ? 'w-[18px] h-[22px] text-[12px] text-white rounded-[2px] shadow-xs'
                  : 'w-[13px] h-[16px] text-[9px] text-white/90 opacity-40 rounded-[1px]'
              }`}
              style={{ backgroundColor: t.bg }}
            >
              {t.key}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export const HealthierChoiceMark: React.FC = () => (
  <div
    className="inline-flex items-center gap-1.5 border border-[#D8E7DC] bg-[#F4FAF5] rounded-[3px] px-2 py-1 select-none"
    title="Singapore HPB Healthier Choice — Lower in Sugar"
  >
    <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" aria-hidden="true">
      <circle cx="12" cy="12" r="10.5" fill="#E31837" />
      <path d="M12 4.5l4.8 4.8-4.8 4.8-4.8-4.8z" fill="#FFFFFF" opacity="0.92" />
      <path d="M7.5 14.5h9l-4.5 5z" fill="#FFFFFF" />
    </svg>
    <div className="leading-none">
      <div className="text-[9px] font-bold text-[#146B3A]">Healthier Choice</div>
      <div className="text-[8px] text-[#4B6B56]">Lower in Sugar</div>
    </div>
  </div>
);

export const ShelfBeverageIllustration: React.FC<{ type: 'schweppes' | 'pokka' | 'dasani' }> = ({
  type,
}) => {
  if (type === 'schweppes') {
    return (
      <svg viewBox="0 0 180 180" className="w-full h-full" aria-label="Schweppes Soda Water 24-Can Case">
        <rect width="180" height="180" fill="#FFFFFF" />
        <polygon points="28,55 128,38 156,56 156,128 56,146 28,128" fill="#1C1D21" />
        <polygon points="28,55 128,38 156,56 56,74" fill="#D5B263" />
        <polygon points="56,74 156,56 156,128 56,146" fill="#111216" />
        <polygon points="28,55 56,74 56,146 28,128" fill="#2A2C32" />
        <rect x="64" y="84" width="84" height="22" rx="2" fill="#F2C94C" transform="skewY(-10)" />
        <text x="106" y="83" textAnchor="middle" fill="#111" fontSize="11" fontWeight="800" transform="skewY(-10)">
          SCHWEPPES
        </text>
        <text x="106" y="106" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="700" transform="skewY(-10)">
          SODA WATER
        </text>
        <text x="106" y="120" textAnchor="middle" fill="#D5B263" fontSize="8" fontWeight="600" transform="skewY(-10)">
          24 × 320ML CASE
        </text>
      </svg>
    );
  }
  if (type === 'pokka') {
    return (
      <svg viewBox="0 0 180 180" className="w-full h-full" aria-label="Pokka Jasmine Green Tea Less Sugar Case">
        <rect width="180" height="180" fill="#FFFFFF" />
        <polygon points="28,55 128,38 156,56 156,128 56,146 28,128" fill="#2E7D32" />
        <polygon points="28,55 128,38 156,56 56,74" fill="#A5D6A7" />
        <polygon points="56,74 156,56 156,128 56,146" fill="#1B5E20" />
        <polygon points="28,55 56,74 56,146 28,128" fill="#388E3C" />
        <text x="106" y="82" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="800" transform="skewY(-10)">
          POKKA
        </text>
        <text x="106" y="99" textAnchor="middle" fill="#C8E6C9" fontSize="9.5" fontWeight="700" transform="skewY(-10)">
          JASMINE GREEN TEA
        </text>
        <text x="106" y="114" textAnchor="middle" fill="#FFF59D" fontSize="8" fontWeight="600" transform="skewY(-10)">
          LESS SUGAR · 24 × 300ML
        </text>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 180 180" className="w-full h-full" aria-label="Dasani Pure Drinking Water Case">
      <rect width="180" height="180" fill="#FFFFFF" />
      <polygon points="26,56 130,38 156,56 156,130 52,148 26,130" fill="#0277BD" />
      <polygon points="26,56 130,38 156,56 52,74" fill="#81D4FA" />
      <polygon points="52,74 156,56 156,130 52,148" fill="#01579B" />
      <polygon points="26,56 52,74 52,148 26,130" fill="#0288D1" />
      <text x="104" y="84" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="800" transform="skewY(-10)">
        DASANI
      </text>
      <text x="104" y="100" textAnchor="middle" fill="#B3E5FC" fontSize="9" fontWeight="700" transform="skewY(-10)">
        PURE DRINKING WATER
      </text>
      <text x="104" y="115" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="600" transform="skewY(-10)">
        24 × 600ML CASE
      </text>
    </svg>
  );
};
