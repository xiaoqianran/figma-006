import { Info } from 'lucide-react';

interface CardScanScreenProps {
  onBack?: () => void;
  onScanSuccess?: () => void;
}

export function CardScanScreen({ onScanSuccess }: CardScanScreenProps) {
  return (
    <div className="h-full w-full bg-[#161A21] text-[#F8F4F4] flex flex-col">
      {/* Instruction card. Frame provides consistent top bar + back for secondary flow screens. */}
      <div className="mx-6 mt-5 rounded-[17px] bg-[#1f2530] p-4 text-sm">
        <div className="flex gap-3">
          <Info size={18} className="mt-0.5 text-[#4C5DF9] flex-shrink-0" />
          <div className="text-[#C5C7D0] leading-snug">
            Place barcode inside the frame to scan.<br />Please keep your device steady when scanning to ensure accurate results.
          </div>
        </div>
      </div>

      {/* Large scan window (matches Figma) */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="relative w-[290px] h-[220px] border-[3px] border-[#4C5DF9] rounded-[24px] flex items-center justify-center">
          <div className="text-center">
            <div className="mx-auto w-11 h-11 rounded-full border-2 border-[#4C5DF9] flex items-center justify-center mb-2">
              <div className="w-4 h-4 bg-[#4C5DF9] rounded-full animate-pulse" />
            </div>
            <div className="text-[10px] text-[#73767A] tracking-wide">ALIGN CARD HERE</div>
          </div>
          {/* Corner accents */}
          <div className="absolute -top-px -left-px w-5 h-5 border-t-2 border-l-2 border-[#4C5DF9] rounded-tl-xl" />
          <div className="absolute -top-px -right-px w-5 h-5 border-t-2 border-r-2 border-[#4C5DF9] rounded-tr-xl" />
          <div className="absolute -bottom-px -left-px w-5 h-5 border-b-2 border-l-2 border-[#4C5DF9] rounded-bl-xl" />
          <div className="absolute -bottom-px -right-px w-5 h-5 border-b-2 border-r-2 border-[#4C5DF9] rounded-br-xl" />
        </div>
      </div>

      <div className="p-6">
        <button 
          onClick={() => {
            onScanSuccess?.();
          }} 
          className="btn-primary"
        >
          Scan Now
        </button>
        <div className="h-6" />
      </div>
    </div>
  );
}
