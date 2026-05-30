import { useState } from 'react';
import { Shield, Lock, Check } from 'lucide-react';

interface VerifyPageProps {
  onBack?: () => void;
  onVerify?: () => void;
}

export function VerifyPage({ onVerify }: VerifyPageProps) {
  const [code, setCode] = useState('');
  const MAX_DIGITS = 4;

  const handleDigit = (d: string) => {
    if (code.length < MAX_DIGITS) {
      const next = code + d;
      setCode(next);
      if (next.length === MAX_DIGITS) {
        setTimeout(() => onVerify?.(), 220);
      }
    }
  };

  const handleBackspace = () => {
    setCode(c => c.slice(0, -1));
  };

  const handleResend = () => {
    setCode('');
    // Demo only
    if (typeof window !== 'undefined') {
      const msg = document.createElement('div');
      msg.className = 'fixed bottom-4 left-1/2 -translate-x-1/2 bg-[#1f2530] text-[#F8F4F4] text-xs px-4 py-1.5 rounded-full border border-[#3a404c]';
      msg.textContent = 'New code sent!';
      document.body.appendChild(msg);
      setTimeout(() => msg.remove(), 1400);
    }
  };

  return (
    <div className="h-full w-full bg-[#121826] text-[#F8F4F4] flex flex-col">
      {/* Status bar handled by PhoneFrame; content starts directly to match Figma exactly */}

      {/* Illustration - shield + lock + check (high-fidelity match to Figma verify graphic) */}
      <div className="pt-8 flex justify-center">
        <div className="relative w-[112px] h-[112px] flex items-center justify-center">
          {/* Outer glow circle */}
          <div className="absolute inset-0 rounded-full bg-[#dfd4ff33]" />
          {/* Shield base */}
          <div className="relative w-[92px] h-[92px] rounded-[28px] bg-gradient-to-br from-[#4C5DF9] via-[#707DFA] to-[#949EFB] flex items-center justify-center shadow-[0_0_0_1px_#4C5DF9,0_10px_30px_-10px_rgb(76,93,249)]">
            {/* Inner shield shape */}
            <div className="w-[68px] h-[68px] rounded-[20px] bg-[#121826] flex items-center justify-center relative">
              <Shield size={38} className="text-[#B7BEFD]" />
              {/* Lock overlay */}
              <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-lg bg-[#1f2530] flex items-center justify-center border border-[#3a404c]">
                <Lock size={14} className="text-[#4C5DF9]" />
              </div>
              {/* Check badge */}
              <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#38C978] flex items-center justify-center">
                <Check size={13} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Title + subtitle exactly from Figma */}
      <div className="px-6 mt-4 text-center">
        <div className="text-[24px] font-bold tracking-[-0.5px]">Verify your account</div>
        <div className="text-[#F8F4F4] mt-1.5 text-[16px]">Code valid for 00:56 sec</div>
      </div>

      {/* 4 large code boxes — exact match to Figma verify-page.png (65×65, rounded-12, filled example) */}
      <div className="px-5 mt-8 flex gap-[13px] justify-center">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="w-[65px] h-[65px] rounded-[12px] flex items-center justify-center text-[22px] font-semibold tracking-[2px] border border-[#2a2f38]"
            style={{
              background: '#1e293b',
              borderColor: i < code.length ? '#4C5DF9' : '#2a2f38',
            }}
          >
            {code[i] || ''}
          </div>
        ))}
      </div>

      {/* Resend link — exact styling */}
      <div className="mt-5 text-center">
        <button
          onClick={handleResend}
          className="text-[#4C5DF9] text-[14px] font-medium underline underline-offset-2 active:opacity-80"
        >
          Resend code
        </button>
      </div>

      {/* Large numeric keypad — styled exactly like Figma Rating/Verify screens (gap-2, 22px, rounded-2xl, surface #1f2530) */}
      <div className="mt-auto px-6 pb-6">
        <div className="grid grid-cols-3 gap-2 text-center text-[22px] font-semibold">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
            <button
              key={n}
              onClick={() => handleDigit(String(n))}
              className="py-[17px] rounded-2xl bg-[#1f2530] active:bg-[#252c38] active:scale-[0.985] transition"
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => handleDigit('0')}
            className="py-[17px] rounded-2xl bg-[#1f2530] active:bg-[#252c38] active:scale-[0.985] transition"
          >
            0
          </button>
          <button
            onClick={handleBackspace}
            className="py-[17px] rounded-2xl bg-[#1f2530] active:bg-[#252c38] text-sm font-medium transition"
          >
            ⌫
          </button>
        </div>
      </div>

      {/* Bottom CTA button matching Figma exactly */}
      <div className="px-6 pb-8">
        <button
          onClick={() => {
            if (code.length === MAX_DIGITS) onVerify?.();
            else {
              // fill demo
              const demo = '8888';
              setCode(demo);
              setTimeout(() => onVerify?.(), 260);
            }
          }}
          className="btn-primary"
        >
          Create Account
        </button>
      </div>
    </div>
  );
}
