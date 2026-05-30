import { useState } from 'react';
import { ArrowLeft, CreditCard, Plus, Check } from 'lucide-react';

interface SavedCard {
  id: string;
  brand: string;
  last4: string;
  expiry: string;
}

interface AddPaymentScreenProps {
  onBack?: () => void;
  onAddNew?: () => void;
}

export function AddPaymentScreen({ onBack, onAddNew }: AddPaymentScreenProps) {
  const [selectedCardId, setSelectedCardId] = useState<string>('c1');

  const savedCards: SavedCard[] = [
    { id: 'c1', brand: 'Visa', last4: '4242', expiry: '12/28' },
    { id: 'c2', brand: 'Mastercard', last4: '8821', expiry: '03/27' },
  ];

  const handleSelectCard = (cardId: string) => {
    setSelectedCardId(cardId);
    // Demo: update default selection (in real app this would persist preference)
  };

  const handleAddNew = () => {
    onAddNew?.();
  };

  return (
    <div className="h-full w-full bg-[#161A21] text-[#F8F4F4] flex flex-col overflow-auto">
      {/* High-fidelity header matching Figma "Payment method" ref (dark) */}
      <div className="px-5 pt-3 pb-2 flex items-center bg-[#161A21]">
        <button
          onClick={onBack}
          className="w-9 h-9 flex items-center justify-center rounded-[11px] border border-white/15 bg-[#1F2530] active:bg-[#252C38] active:scale-[0.985] transition-all"
          aria-label="Go back"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="flex-1 text-center font-semibold text-[17px] tracking-[-0.25px] pr-9">
          Payment method
        </div>
      </div>

      <div className="px-6 pt-4">
        {/* Saved cards list — selection of current methods (task requirement + realistic payment manager) */}
        <div className="mb-5">
          <div className="text-xs uppercase tracking-[1.5px] text-[#73767A] mb-2 pl-1">YOUR CARDS</div>
          <div className="space-y-2">
            {savedCards.map((card) => {
              const isSelected = selectedCardId === card.id;
              return (
                <button
                  key={card.id}
                  onClick={() => handleSelectCard(card.id)}
                  className={`w-full card flex items-center gap-3.5 py-3.5 text-left transition active:bg-[#252C38] ${isSelected ? 'ring-1 ring-[#4C5DF9] ring-offset-1 ring-offset-[#161A21]' : ''}`}
                >
                  <div className="w-9 h-9 rounded-xl bg-[#222833] flex items-center justify-center flex-shrink-0">
                    <CreditCard size={18} className={card.brand === 'Visa' ? 'text-[#4C5DF9]' : 'text-[#F89B54]'} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold tracking-[-0.1px]">{card.brand} •••• {card.last4}</div>
                    <div className="text-xs text-[#73767A] mt-0.5">Expires {card.expiry}</div>
                  </div>
                  {isSelected ? (
                    <div className="flex items-center gap-1 text-[#4C5DF9] text-xs font-medium pr-1">
                      <Check size={14} /> Default
                    </div>
                  ) : (
                    <div className="text-[#73767A] text-xs pr-1">Select</div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* "Add methods" section — pixel-faithful recreation of add-payment.png dark variant */}
        <div className="mb-2">
          <div className="text-[15px] font-semibold tracking-[-0.2px]">Add methods</div>
          <div className="text-[12px] text-[#9FA1B0] mt-0.5 leading-tight">
            Visa, Mastercard, AMEX, and JCB
          </div>
        </div>

        {/* Credit / debit card row — exact visual treatment from ref */}
        <div 
          className="mt-3 flex items-center rounded-[14px] px-4 py-[13px] border border-[#2A2F38]"
          style={{ background: '#1F2530' }}
        >
          <div className="flex items-center gap-3 flex-1">
            <div className="relative flex items-center justify-center w-[26px] h-5">
              <CreditCard size={20} className="text-[#4C5DF9]" />
              {/* Small plus badge overlay matching ref icon treatment */}
              <div className="absolute -top-px -right-px w-[11px] h-[11px] rounded-full bg-[#6646FF] flex items-center justify-center ring-1 ring-[#161A21]">
                <Plus size={7} className="text-white" strokeWidth={3.5} />
              </div>
            </div>
            <span className="text-[14px] font-medium tracking-[-0.1px]">Credit or debit card</span>
          </div>

          <button
            onClick={handleAddNew}
            className="text-[12px] font-semibold leading-none px-3.5 py-[5px] rounded-[8px] bg-[#4C5DF9] text-white active:opacity-90 transition"
          >
            Add
          </button>
        </div>
      </div>

      {/* Prominent "Add new method" promo card — direct visual match to large purple element in Figma ref */}
      <div className="px-6 pt-5">
        <button
          onClick={handleAddNew}
          className="relative w-full rounded-[18px] px-5 py-5 text-left overflow-hidden shadow-[0_8px_24px_-6px_rgb(0,0,0,0.35)] active:scale-[0.985] transition-transform duration-75"
          style={{ background: 'linear-gradient(142deg, #6646FF 0%, #5138D1 100%)' }}
        >
          {/* Subtle layered background shapes (inspired by ref) */}
          <div 
            className="absolute -right-6 -top-8 w-24 h-24 rounded-full opacity-30" 
            style={{ background: '#8B6CFF' }}
          />
          <div 
            className="absolute -left-4 bottom-0 w-16 h-16 rounded-full opacity-20" 
            style={{ background: '#5138D1' }}
          />

          {/* Decorative dots + accent strokes (matching the playful pattern in ref) */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Dots cluster */}
            <div className="absolute left-[38%] top-[18%] w-[3px] h-[3px] bg-white/30 rounded-full" />
            <div className="absolute left-[44%] top-[22%] w-[2.5px] h-[2.5px] bg-white/25 rounded-full" />
            <div className="absolute left-[50%] top-[15%] w-[3px] h-[3px] bg-white/35 rounded-full" />
            <div className="absolute left-[56%] top-[27%] w-[2px] h-[2px] bg-white/20 rounded-full" />
            <div className="absolute left-[61%] top-[19%] w-[3px] h-[3px] bg-white/30 rounded-full" />
            <div className="absolute left-[42%] top-[38%] w-[2.5px] h-[2.5px] bg-white/25 rounded-full" />
            <div className="absolute left-[48%] top-[43%] w-[3px] h-[3px] bg-white/35 rounded-full" />

            {/* Accent diagonal strokes (yellow/orange + green) */}
            <div className="absolute left-[34%] top-[52%] w-[15px] h-[1.5px] bg-[#F9C46A] rotate-[-28deg] rounded-full" />
            <div className="absolute left-[40%] top-[58%] w-[11px] h-[1.5px] bg-[#7EE3A1] rotate-[-28deg] rounded-full" />
          </div>

          <div className="relative flex items-center gap-4">
            {/* Icon square */}
            <div className="w-9 h-9 rounded-[10px] bg-[#161A21] flex items-center justify-center flex-shrink-0">
              <Plus size={18} className="text-[#6646FF]" strokeWidth={3} />
            </div>

            <div className="font-semibold text-[15px] tracking-[-0.2px] text-white">
              Add new method
            </div>
          </div>
        </button>
      </div>

      {/* Bottom note */}
      <div className="mt-auto px-6 pb-8 pt-5 text-center">
        <div className="text-[11px] text-[#73767A]">
          Your payment info is encrypted and secure
        </div>
        <div className="text-[10px] text-[#4C5DF9] mt-3 tracking-wide">TAP ANY CARD TO SET AS DEFAULT • ADD TO EXPAND OPTIONS</div>
      </div>
    </div>
  );
}
