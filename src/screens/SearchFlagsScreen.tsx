import { ArrowLeft, Search } from 'lucide-react';
import { useState } from 'react';

interface SearchFlagsScreenProps {
  onBack?: () => void;
  onSelect?: (flag: string) => void;
}

const countries = [
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'CN', name: 'China', flag: '🇨🇳' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
];

export function SearchFlagsScreen({ onBack, onSelect }: SearchFlagsScreenProps) {
  const [search, setSearch] = useState('');

  const filtered = countries.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-full w-full bg-[#161A21] text-[#F8F4F4] flex flex-col">
      <div className="px-6 pt-4 flex items-center gap-3">
        <button onClick={onBack} className="btn-ghost -ml-1"><ArrowLeft size={22} /></button>
        <div className="text-[18px] font-semibold">Search Flags</div>
      </div>

      <div className="px-6 mt-4">
        <div className="input flex items-center gap-3">
          <Search size={18} className="text-[#73767A]" />
          <input 
            className="bg-transparent flex-1 outline-none text-sm" 
            placeholder="Search country or code"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-auto px-6 mt-4 space-y-2 pb-8">
        {filtered.map((country, idx) => (
          <button
            key={idx}
            onClick={() => onSelect?.(country.name)}
            className="w-full card flex items-center gap-4 active:bg-[#252c38] text-left"
          >
            <div className="text-2xl w-9">{country.flag}</div>
            <div className="flex-1">
              <div className="font-semibold">{country.name}</div>
              <div className="text-xs text-[#73767A]">{country.code}</div>
            </div>
          </button>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-8 text-[#73767A]">No results found</div>
        )}
      </div>
    </div>
  );
}
