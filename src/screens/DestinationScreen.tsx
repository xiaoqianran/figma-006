import { MapPin, Clock, Star } from 'lucide-react';

interface DestinationScreenProps {
  onSearchTap?: () => void;
  onPlaceSelect?: (place: string) => void;
  savedPlaces?: Array<{ id: string; name: string; addr: string; time?: string; isFavorite?: boolean }>;
  recentPlaces?: Array<{ id: string; name: string; addr: string; time?: string; isFavorite?: boolean }>;
  onToggleFavorite?: (id: string) => void;
  onAddNewPlace?: (name: string) => void;
  onRecordRecent?: (place: { name: string; addr: string; time?: string }) => void;
}

export function DestinationScreen({ 
  onSearchTap, 
  onPlaceSelect, 
  savedPlaces = [], 
  recentPlaces = [], 
  onToggleFavorite, 
  onAddNewPlace,
  onRecordRecent 
}: DestinationScreenProps) {
  return (
    <div className="h-full w-full flex flex-col" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
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

      {/* Saved places section — now interactive + persisted (favorite + add) */}
      <div className="mt-8 px-6">
        <div className="flex items-center justify-between mb-3">
          <div className="text-[15px] font-semibold">Saved Places</div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
                const name = prompt('Add new saved place name (e.g. Gym):');
                if (name && name.trim() && onAddNewPlace) onAddNewPlace(name.trim());
              }}
              className="text-xs px-2 py-0.5 rounded bg-[#4C5DF9] text-white active:opacity-80"
            >
              + Add
            </button>
            <button className="text-xs text-[#4C5DF9]">See all</button>
          </div>
        </div>

        <div className="space-y-3">
          {(savedPlaces.length > 0 ? savedPlaces : [
            { id: 'demo1', name: 'Home', addr: '42 Sunset Boulevard', time: '12 min', isFavorite: true },
          ]).map((p) => (
            <div 
              key={p.id} 
              className="card w-full flex items-center justify-between active:bg-[#252c38] text-left transition"
            >
              <button 
                onClick={() => {
                  onPlaceSelect?.(p.name);
                  onRecordRecent?.({ name: p.name, addr: p.addr, time: p.time });
                }}
                className="flex-1 flex items-center gap-3.5 text-left min-w-0"
              >
                <div className="w-9 h-9 rounded-xl bg-[#222833] flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-[#4C5DF9]" />
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-[15px]">{p.name}</div>
                  <div className="text-xs text-[#73767A] truncate">{p.addr}</div>
                </div>
              </button>
              <div className="flex items-center gap-2 text-right text-xs pr-1 flex-shrink-0">
                <button
                  onClick={(e) => { e.stopPropagation(); onToggleFavorite?.(p.id); }}
                  className="p-1 text-[#F89B54] hover:scale-110 active:scale-95 transition"
                  aria-label={p.isFavorite ? 'Unfavorite' : 'Favorite'}
                  title={p.isFavorite ? 'Unfavorite place' : 'Add to favorites'}
                >
                  {p.isFavorite ? '★' : '☆'}
                </button>
                <div className="text-[#F89B54] font-medium flex items-center gap-1">
                  <Clock size={12} /> {p.time || '—'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent searches (persisted) */}
      {recentPlaces.length > 0 && (
        <div className="mt-6 px-6">
          <div className="text-[15px] font-semibold mb-3">Recent</div>
          <div className="space-y-2">
            {recentPlaces.slice(0, 3).map((p) => (
              <button
                key={p.id}
                onClick={() => onPlaceSelect?.(p.name)}
                className="w-full card flex items-center gap-3 py-2.5 text-left active:bg-[#252c38] transition"
              >
                <div className="w-8 h-8 rounded-lg bg-[#222833] flex items-center justify-center flex-shrink-0">
                  <Clock size={15} className="text-[#F89B54]" />
                </div>
                <div className="text-sm font-medium">{p.name} <span className="text-[#73767A] text-xs">— recent</span></div>
              </button>
            ))}
          </div>
        </div>
      )}

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
