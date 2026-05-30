import React from 'react';
import { Star } from 'lucide-react';

interface RatingScreenProps {
  onBack?: () => void;
  onSubmit?: (rating: number, tip?: number) => void;
}

export function RatingScreen({ onSubmit }: RatingScreenProps) {
  const [rating, setRating] = React.useState(5);
  const [selectedTip, setSelectedTip] = React.useState<number | null>(null);

  return (
    <div className="h-full w-full bg-[#161A21] text-[#F8F4F4] flex flex-col">
      {/* Frame provides top title + back. Content starts directly. */}
      <div className="px-6 pt-5">
        <div className="text-[17px] font-semibold">Rate your trip</div>
      </div>

      <div className="mt-6 px-6 text-center">
        <div className="text-[#9FA1B0] text-sm">How was your ride with Michael?</div>
        <div className="mt-4 flex justify-center gap-1">
          {[1,2,3,4,5].map(i => (
            <button key={i} onClick={() => setRating(i)} className="p-1">
              <Star 
                size={32} 
                className={i <= rating ? "text-[#F89B54] fill-[#F89B54]" : "text-[#45484D]"} 
              />
            </button>
          ))}
        </div>
      </div>

      {/* Large numeric keypad exactly as in Figma Rating page */}
      <div className="mt-8 px-6">
        <div className="text-xs text-[#73767A] pl-1 mb-2">Add a tip (optional)</div>
        
        <div className="grid grid-cols-3 gap-2 text-center text-[22px] font-semibold">
          {[1,2,3,4,5,6,7,8,9].map(n => (
            <button 
              key={n} 
              onClick={() => setSelectedTip(n)} 
              className={`py-4 rounded-2xl transition ${selectedTip === n ? 'bg-[#4C5DF9] text-white' : 'bg-[#1f2530] active:bg-[#252c38]'}`}
            >
              {n}
            </button>
          ))}
          <button onClick={() => setSelectedTip(0)} className={`py-4 rounded-2xl transition ${selectedTip === 0 ? 'bg-[#4C5DF9] text-white' : 'bg-[#1f2530] active:bg-[#252c38]'}`}>0</button>
          <button onClick={() => setSelectedTip(null)} className="py-4 rounded-2xl bg-[#1f2530] text-sm active:bg-[#252c38]">Clear</button>
          <button onClick={() => setSelectedTip(10)} className={`py-4 rounded-2xl transition ${selectedTip === 10 ? 'bg-[#4C5DF9] text-white' : 'bg-[#1f2530] active:bg-[#252c38]'}`}>10</button>
        </div>
      </div>

      <div className="px-6 mt-auto pb-8">
        <button 
          onClick={() => onSubmit?.(rating, selectedTip ?? undefined)}
          className="btn-primary"
        >
          Submit rating
        </button>
        <div className="text-center mt-3 text-xs text-[#73767A]">Your feedback helps improve the community</div>
      </div>
    </div>
  );
}
