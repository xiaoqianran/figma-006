import { ArrowLeft, Search } from 'lucide-react';
import { useState } from 'react';

interface SearchFlagsScreenProps {
  onBack?: () => void;
  onSelect?: (country: string, dialCode: string) => void;
}

interface Country {
  id: string;
  name: string;
  flag: string;
  dial: string;
}

// Demo data crafted to closely match the Figma "Search Flags" reference (names + dial codes as captured)
const countries: Country[] = [
  { id: 'ie', name: 'Ireland', flag: '🇮🇪', dial: '+62' },
  { id: 'vn', name: 'Vietnam', flag: '🇻🇳', dial: '+82' },
  { id: 'th', name: 'Thailand', flag: '🇹🇭', dial: '+66' },
  { id: 'sg', name: 'Singapore', flag: '🇸🇬', dial: '+65' },
  { id: 'af', name: 'Afghanistan', flag: '🇦🇫', dial: '+93' },
  { id: 'al', name: 'Albania', flag: '🇦🇱', dial: '+355' },
  { id: 'us', name: 'United States', flag: '🇺🇸', dial: '+1' },
  { id: 'gb', name: 'United Kingdom', flag: '🇬🇧', dial: '+44' },
  { id: 'id', name: 'Indonesia', flag: '🇮🇩', dial: '+62' },
  { id: 'my', name: 'Malaysia', flag: '🇲🇾', dial: '+60' },
  { id: 'au', name: 'Australia', flag: '🇦🇺', dial: '+61' },
  { id: 'de', name: 'Germany', flag: '🇩🇪', dial: '+49' },
  { id: 'ca', name: 'Canada', flag: '🇨🇦', dial: '+1' },
  { id: 'br', name: 'Brazil', flag: '🇧🇷', dial: '+55' },
];

export function SearchFlagsScreen({ onBack, onSelect }: SearchFlagsScreenProps) {
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string>('ie'); // Default to Ireland (matches ref visual state)

  const selected = countries.find(c => c.id === selectedId)!;

  const filtered = countries.filter(c => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    const nameMatch = c.name.toLowerCase().includes(q);
    const codeMatch = c.dial.replace('+', '').includes(q) || c.dial.includes(q);
    return nameMatch || codeMatch;
  });

  // Exclude currently selected from the "All Countries" list (prevents duplication; selected always pinned at top when not filtering)
  const listItems = filtered.filter(c => c.id !== selectedId);

  const handleSelect = (country: Country) => {
    setSelectedId(country.id);
  };

  const handleDone = () => {
    onSelect?.(selected.name, selected.dial);
    onBack?.();
  };

  const showAllHeader = !search.trim();

  return (
    <div className="h-full w-full bg-[#161A21] text-[#F8F4F4] flex flex-col">
      {/* Header — matches project convention (Settings/GiftCode) + Figma ref title & back style */}
      <div className="px-5 pt-4 pb-2 flex items-center">
        <button
          onClick={onBack}
          className="w-9 h-9 flex items-center justify-center rounded-[10px] bg-[#222833] text-[#F8F4F4] flex-shrink-0 active:opacity-80 transition"
          aria-label="Back"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1 text-center text-[18px] font-semibold tracking-[-0.3px] pr-9">
          Search country code
        </div>
      </div>

      {/* Search bar — high-fidelity match to ref (right icon, long placeholder, dark rounded input) */}
      <div className="px-5 mt-1">
        <div className="flex items-center bg-[#1F2530] border border-[#2F3542] rounded-[12px] px-4 py-[13px]">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Type country name or country code"
            className="flex-1 bg-transparent outline-none text-[15px] placeholder:text-[#73767A] font-normal tracking-[-0.1px]"
          />
          <Search size={18} className="text-[#73767A] flex-shrink-0 ml-2" />
        </div>
      </div>

      {/* Pinned selected country (blue highlight) — directly matches the prominent selected card in the Figma ref */}
      <div className="px-5 mt-4">
        <button
          onClick={() => { /* already selected */ }}
          className="w-full flex items-center gap-3.5 px-4 py-[13px] rounded-[14px] bg-[#4C5DF9] text-white active:opacity-95 transition-colors text-left"
        >
          <div className="w-9 h-8 rounded-[8px] bg-black/30 flex items-center justify-center text-[22px] flex-shrink-0 overflow-hidden">
            {selected.flag}
          </div>
          <div className="flex-1 text-[16px] font-semibold tracking-[-0.15px]">
            {selected.name}
          </div>
          <div className="text-[15px] font-medium text-white/90 tabular-nums">
            {selected.dial}
          </div>
        </button>
      </div>

      {/* Scrollable list area */}
      <div className="flex-1 overflow-auto px-5 pt-3 pb-4">
        {/* Section header — only visible when not actively searching (matches ref layout) */}
        {showAllHeader && (
          <div className="text-[14px] font-semibold tracking-[-0.1px] mb-2 pl-1 text-[#F8F4F4]">
            All Countries
          </div>
        )}

        <div className="space-y-[9px]">
          {listItems.length > 0 ? (
            listItems.map((country) => (
              <button
                key={country.id}
                onClick={() => handleSelect(country)}
                className="w-full flex items-center gap-3.5 px-4 py-[13px] rounded-[14px] bg-[#1F2530] border border-[#2A303C] active:bg-[#252C38] text-left transition-colors"
              >
                {/* Flag badge — rounded container with emoji for visual fidelity (no external images) */}
                <div className="w-9 h-8 rounded-[8px] bg-[#2A303C] flex items-center justify-center text-[22px] flex-shrink-0 overflow-hidden">
                  {country.flag}
                </div>

                <div className="flex-1 text-[15px] font-semibold tracking-[-0.1px]">
                  {country.name}
                </div>

                <div className="text-[15px] font-medium text-[#9FA1B0] tabular-nums">
                  {country.dial}
                </div>
              </button>
            ))
          ) : (
            /* Empty state when search yields no matches */
            <div className="text-center py-10 text-[#73767A] text-sm">
              No countries match “{search}”
            </div>
          )}
        </div>

        {/* Helpful note at bottom of list (subtle, project-consistent) */}
        <div className="mt-5 mb-2 px-1 text-center">
          <div className="text-[11px] text-[#73767A]">
            Tap a country to select it as your phone code
          </div>
        </div>
      </div>

      {/* Bottom action bar — "Done" for explicit confirmation + selection state (per task requirements) */}
      <div className="px-5 pb-6 pt-2 bg-[#161A21] border-t border-white/5">
        <button
          onClick={handleDone}
          className="w-full bg-[#4C5DF9] hover:bg-[#5B6CFF] active:scale-[0.985] transition-all text-white text-[15px] font-semibold tracking-[-0.2px] py-[15px] rounded-[12px]"
        >
          Done — Use {selected.dial} for {selected.name}
        </button>
      </div>
    </div>
  );
}
