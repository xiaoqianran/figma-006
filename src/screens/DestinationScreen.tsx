import { MapPin, Clock, Star } from 'lucide-react';

interface DestinationScreenProps {
  onSearchTap?: () => void;
  onPlaceSelect?: (place: string) => void;
}

export function DestinationScreen({ onSearchTap, onPlaceSelect }: DestinationScreenProps) {
  return (
    <div className="h-full w-full bg-[#161A21] text-[#F8F4F4] flex flex-col">
      {/* Top bar already handled by frame for tabs, here is content */}
      <div className="px-6 pt-6">
        <div className="text-[11px] uppercase tracking-[1px] text-[#73767A]">Good morning, Alex</div>
        <div className="text-[22px] font-semibold tracking-[-0.4px] mt-1">Where do you want to go?</div>
      </div>

      {/* Search / input — now interactive */}
      <div className="px-6 mt-5">
        <button 
          onClick={onSearchTap}
          className="input flex items-center gap-3 text-[#9FA1B0] w-full text-left hover:bg-[#252c38] active:bg-[#2a303c] transition"
        >
          <MapPin size={18} className="text-[#4C5DF9]" />
          <span>Search destination or address</span>
        </button>
      </div>

      {/* Saved places section (from Figma Destination Page) */}
      <div className="mt-8 px-6">
        <div className="flex items-center justify-between mb-3">
          <div className="text-[15px] font-semibold">Saved Places</div>
          <button className="text-xs text-[#4C5DF9]">See all</button>
        </div>

        <div className="space-y-3">
          {[
            { name: 'Home', addr: '42 Sunset Boulevard', time: '12 min' },
            { name: 'Office', addr: 'Tech Park, Downtown', time: '28 min' },
            { name: 'Airport', addr: 'Terminal 2 - International', time: '41 min' },
          ].map((p, i) => (
            <button 
              key={i} 
              onClick={() => onPlaceSelect?.(p.name)}
              className="card w-full flex items-center justify-between active:bg-[#252c38] text-left transition"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#222833] flex items-center justify-center">
                  <MapPin size={18} className="text-[#4C5DF9]" />
                </div>
                <div>
                  <div className="font-semibold text-[15px]">{p.name}</div>
                  <div className="text-xs text-[#73767A]">{p.addr}</div>
                </div>
              </div>
              <div className="text-right text-xs">
                <div className="text-[#F89B54] font-medium flex items-center gap-1">
                  <Clock size={12} /> {p.time}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Quick actions + primary CTA (extra pb clears the bottom tab bar) */}
      <div className="mt-auto px-6 pb-20 space-y-3">
        <button 
          onClick={onSearchTap}
          className="btn-primary"
        >
          Find rides now
        </button>
        
        <div className="grid grid-cols-2 gap-3">
          <button onClick={onSearchTap} className="card py-4 text-left active:bg-[#252c38]">
            <div className="text-[#4C5DF9] mb-1"><Star size={18} /></div>
            <div className="font-semibold">Schedule ride</div>
          </button>
          <button onClick={onSearchTap} className="card py-4 text-left active:bg-[#252c38]">
            <div className="text-[#F89B54] mb-1"><MapPin size={18} /></div>
            <div className="font-semibold">Explore map</div>
          </button>
        </div>
      </div>
    </div>
  );
}
