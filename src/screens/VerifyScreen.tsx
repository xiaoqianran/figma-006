import React from 'react';

interface VerifyScreenProps {
  onBack?: () => void;
  onVerify?: () => void;
}

export function VerifyScreen({ onVerify }: VerifyScreenProps) {
  const [code, setCode] = React.useState('');

  const handleDigit = (d: string) => {
    if (code.length < 6) {
      const next = code + d;
      setCode(next);
      if (next.length === 6) {
        setTimeout(() => onVerify?.(), 180);
      }
    }
  };

  const handleBackspace = () => setCode(c => c.slice(0, -1));

  return (
    <div className="h-full w-full bg-[#161A21] text-[#F8F4F4] flex flex-col">
      {/* Frame provides top title + back for auth flow */}
      <div className="px-6 mt-8">
        <div className="text-[26px] font-bold tracking-[-0.8px]">Enter verification code</div>
        <div className="text-[#9FA1B0] mt-2 text-sm">We sent a 6-digit code to your email</div>
      </div>

      {/* Code input display */}
      <div className="px-6 mt-9 flex gap-3 justify-center">
        {Array.from({ length: 6 }).map((_, i) => (
          <div 
            key={i} 
            className="w-11 h-14 rounded-xl border flex items-center justify-center text-2xl font-semibold tracking-[3px]"
            style={{ 
              borderColor: i < code.length ? '#4C5DF9' : '#3a404c',
              background: '#1f2530'
            }}
          >
            {code[i] || ''}
          </div>
        ))}
      </div>

      {/* Numeric keypad (inspired by Figma Rating page style) */}
      <div className="mt-auto px-6 pb-8">
        <div className="grid grid-cols-3 gap-3 text-center text-xl font-medium">
          {[1,2,3,4,5,6,7,8,9].map(n => (
            <button 
              key={n} 
              onClick={() => handleDigit(String(n))}
              className="py-4 active:bg-[#252c38] rounded-2xl bg-[#1f2530]"
            >
              {n}
            </button>
          ))}
          <button onClick={() => {}} className="py-4 rounded-2xl bg-[#1f2530] opacity-50"> </button>
          <button onClick={() => handleDigit('0')} className="py-4 active:bg-[#252c38] rounded-2xl bg-[#1f2530]">0</button>
          <button onClick={handleBackspace} className="py-4 active:bg-[#252c38] rounded-2xl bg-[#1f2530] text-sm">⌫</button>
        </div>
      </div>
    </div>
  );
}
