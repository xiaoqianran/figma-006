import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

interface GiftCodeScreenProps {
  onBack?: () => void;
}

export function GiftCodeScreen({ onBack }: GiftCodeScreenProps) {
  const [code, setCode] = React.useState('Rido 123');

  const handleRedeem = () => {
    const trimmed = code.trim();
    if (!trimmed) {
      toast.error('Please enter a promo code');
      return;
    }
    toast.success(`Code "${trimmed}" redeemed! Enjoy your credit.`, {
      duration: 2200,
    });
    // In a real flow you might navigate away here
  };

  const handleManualEntry = () => {
    toast.info('Manual card entry flow (demo)', { duration: 1400 });
  };

  return (
    <div className="h-full w-full bg-[#161A21] text-[#F8F4F4] flex flex-col">
      {/* Header — matches Figma Gift Code Page exactly */}
      <div className="px-6 pt-4 pb-1 flex items-center">
        <button 
          onClick={onBack} 
          className="btn-ghost -ml-1 w-10 h-10 flex items-center justify-center"
          aria-label="Back"
        >
          <ArrowLeft size={22} />
        </button>
        <div className="flex-1 text-center text-[18px] font-semibold tracking-[-0.2px] pr-10">
          Gift Code
        </div>
      </div>

      {/* Promo prompt + input */}
      <div className="px-6 pt-6">
        <div className="text-[18px] font-semibold tracking-[-0.3px]">Have a promo code?</div>
        <div className="mt-1.5 text-[15px] leading-snug text-[#C5C7D0]">
          Enter your promo code below to redeem it.
        </div>

        {/* Input styled to match Figma (dark pill, 18px text) */}
        <div className="mt-5">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full bg-[#1E293B] border border-[#1E293B] rounded-[12px] px-5 py-4 text-[18px] font-medium tracking-[-0.1px] placeholder:text-[#73767A] focus:outline-none focus:border-[#4C5DF9]/40"
            placeholder="Enter promo code"
          />
        </div>
      </div>

      {/* Large centered gift illustration — faithful recreation using lucide + shapes */}
      <div className="flex-1 flex items-center justify-center px-6 -mt-2">
        <div className="relative flex items-center justify-center" style={{ width: 215, height: 215 }}>
          {/* Soft outer glow circle */}
          <div 
            className="absolute rounded-full" 
            style={{ 
              width: 215, 
              height: 215, 
              background: 'radial-gradient(circle, rgba(244, 163, 94, 0.12) 0%, rgba(244, 163, 94, 0.02) 70%, transparent 85%)' 
            }} 
          />

          {/* Main dark circle background */}
          <div className="absolute rounded-full bg-[#1F2530]" style={{ width: 192, height: 192 }} />

          {/* Orange $ coin */}
          <div 
            className="absolute z-10 flex items-center justify-center rounded-full text-[#161A21] font-semibold"
            style={{ 
              top: 26, 
              right: 38, 
              width: 52, 
              height: 52, 
              background: '#F89B54',
              fontSize: 28,
              lineHeight: 1,
              boxShadow: '0 4px 12px rgba(0,0,0,0.25)'
            }}
          >
            $
          </div>

          {/* Gift box base (white rounded card) */}
          <div 
            className="absolute z-20 bg-[#F0F0F0] rounded-[16px] flex items-center justify-center overflow-hidden"
            style={{ 
              bottom: 38, 
              width: 124, 
              height: 82,
              boxShadow: '0 8px 20px rgba(0,0,0,0.2)'
            }}
          >
            {/* Gift body */}
            <div className="relative w-[82px] h-[54px]">
              {/* Main box */}
              <div className="absolute inset-x-0 bottom-0 h-[42px] bg-[#FFAC70] rounded-[3px]" />
              {/* Lid */}
              <div className="absolute inset-x-[-3px] top-0 h-[21px] bg-[#EF624C] rounded-t-[3px]" />
              {/* Vertical ribbon */}
              <div className="absolute left-1/2 -translate-x-1/2 top-1 w-[9px] h-[50px] bg-[#F87561] rounded" />
              {/* Bow */}
              <div className="absolute left-1/2 -translate-x-1/2 top-[3px] w-[34px] h-[14px]">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[14px] h-[9px] bg-[#F87561] rounded-full" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[14px] h-[9px] bg-[#F87561] rounded-full" />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[9px] h-[9px] bg-[#EF624C] rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Primary action button — "Enter Card Manually?" from Figma (functions as redeem trigger) */}
      <div className="px-6 pb-4">
        <button 
          onClick={handleRedeem}
          className="btn-primary"
        >
          Redeem {code ? `"${code}"` : 'Code'}
        </button>
      </div>

      {/* Secondary / manual entry button matching Figma visual */}
      <div className="px-6 pb-2">
        <button 
          onClick={handleManualEntry}
          className="w-full py-4 rounded-[12px] bg-[#4C5DF9] text-white text-[17px] font-semibold tracking-[-0.1px] active:opacity-90 transition"
        >
          Enter Card Manually?
        </button>
      </div>

      {/* Footer link */}
      <div className="px-6 pb-8 text-center">
        <button 
          onClick={() => toast.info('Supported promo codes & issuers listed in the full app')}
          className="text-[14px] text-[#4C5DF9] underline underline-offset-2 active:opacity-80"
        >
          View Supported issues
        </button>
      </div>
    </div>
  );
}
