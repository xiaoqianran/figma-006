import { Search, MapPin, Clock, TrendingUp } from 'lucide-react';

interface ExploreScreenProps {
  onExploreRide?: () => void;
}

export function ExploreScreen({ onExploreRide }: ExploreScreenProps) {
  const categories = [
    { icon: <TrendingUp size={18} />, label: 'Popular now', count: '128 rides' },
    { icon: <MapPin size={18} />, label: 'Near you', count: '42 rides' },
    { icon: <Clock size={18} />, label: 'Scheduled', count: '19 upcoming' },
  ];

  const suggestions = [
    { place: 'Downtown Market', time: '9 min', price: '$8.20' },
    { place: 'Riverside Park', time: '14 min', price: '$11.50' },
    { place: 'Tech Campus', time: '22 min', price: '$15.80' },
    { place: 'Airport Terminal', time: '31 min', price: '$24.00' },
  ];

  return (
    <div className="h-full w-full bg-[#161A21] text-[#F8F4F4] flex flex-col">
      {/* Header area for tab screen */}
      <div className="px-6 pt-6">
        <div className="text-[11px] uppercase tracking-[1px] text-[#73767A]">Discover</div>
        <div className="text-[22px] font-semibold tracking-[-0.4px] mt-1">Explore rides & places</div>
      </div>

      {/* Search */}
      <div className="px-6 mt-5">
        <button 
          onClick={onExploreRide}
          className="input flex items-center gap-3 text-[#9FA1B0] w-full text-left hover:bg-[#252c38] active:bg-[#2a303c] transition"
        >
          <Search size={18} className="text-[#4C5DF9]" />
          <span>Search destinations, events or addresses</span>
        </button>
      </div>

      {/* Categories */}
      <div className="mt-6 px-6">
        <div className="text-[15px] font-semibold mb-3">Browse by category</div>
        <div className="grid grid-cols-3 gap-3">
          {categories.map((cat, idx) => (
            <button 
              key={idx} 
              onClick={onExploreRide}
              className="card py-4 flex flex-col items-start active:bg-[#252c38] transition"
            >
              <div className="text-[#4C5DF9] mb-2">{cat.icon}</div>
              <div className="font-semibold text-sm">{cat.label}</div>
              <div className="text-[11px] text-[#73767A] mt-0.5">{cat.count}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Suggestions */}
      <div className="mt-7 px-6 flex-1">
        <div className="flex items-center justify-between mb-3">
          <div className="text-[15px] font-semibold">Trending destinations</div>
          <button onClick={onExploreRide} className="text-xs text-[#4C5DF9]">See map</button>
        </div>

        <div className="space-y-2.5">
          {suggestions.map((s, i) => (
            <button 
              key={i}
              onClick={onExploreRide}
              className="card w-full flex items-center justify-between active:bg-[#252c38] transition text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#222833] flex items-center justify-center flex-shrink-0">
                  <MapPin size={17} className="text-[#F89B54]" />
                </div>
                <div className="font-medium">{s.place}</div>
              </div>
              <div className="text-right text-sm">
                <div className="text-[#F89B54] font-semibold">{s.price}</div>
                <div className="text-[#73767A] text-xs flex items-center gap-1 justify-end">
                  <Clock size={11} /> {s.time}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom safe padding for tab bar */}
      <div className="h-4" />
    </div>
  );
}
