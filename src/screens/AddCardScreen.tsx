import { CreditCard } from 'lucide-react';

interface AddCardScreenProps {
  onBack?: () => void;
  onAddSuccess?: () => void;
}

export function AddCardScreen({ onAddSuccess }: AddCardScreenProps) {
  return (
    <div className="h-full w-full bg-[#161A21] text-[#F8F4F4] flex flex-col">
      {/* Card visual mock (from Figma). Frame provides top title + back for secondary screens. */}
      <div className="px-6 pt-2">
        <div className="relative h-[157px] w-full rounded-[16px] overflow-hidden" 
             style={{ background: 'linear-gradient(135deg, #10164d 0%, #1a2340 100%)' }}>
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff10_0.8px,transparent_1px)] bg-[length:3px_3px]" />
          
          <div className="absolute top-6 left-6">
            <CreditCard size={28} className="text-white/70" />
          </div>
          
          <div className="absolute bottom-6 left-6 right-6">
            <div className="font-mono tracking-[3.5px] text-lg text-white/90">••••  ••••  ••••  4242</div>
            <div className="mt-3 flex justify-between text-xs">
              <div>
                <div className="text-white/50 text-[10px]">CARD HOLDER</div>
                <div className="font-medium tracking-wide">ALEX RIVERA</div>
              </div>
              <div className="text-right">
                <div className="text-white/50 text-[10px]">EXPIRES</div>
                <div className="font-medium">12/28</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="px-6 mt-8 space-y-4 flex-1">
        <div>
          <div className="text-xs text-[#9FA1B0] mb-1.5 pl-1">Card number</div>
          <input className="input" placeholder="4242 4242 4242 4242" defaultValue="4242 4242 4242 4242" />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs text-[#9FA1B0] mb-1.5 pl-1">Expiry date</div>
            <input className="input" placeholder="MM / YY" defaultValue="12 / 28" />
          </div>
          <div>
            <div className="text-xs text-[#9FA1B0] mb-1.5 pl-1">CVV</div>
            <input className="input" placeholder="123" defaultValue="424" />
          </div>
        </div>

        <div>
          <div className="text-xs text-[#9FA1B0] mb-1.5 pl-1">Name on card</div>
          <input className="input" defaultValue="Alex Rivera" />
        </div>
      </div>

      {/* CTA */}
      <div className="p-6 pt-4">
        <button 
          onClick={() => onAddSuccess?.()}
          className="btn-primary"
        >
          Add card &amp; confirm booking
        </button>
        <div className="text-center mt-3 text-[11px] text-[#73767A]">Your payment info is encrypted and secure</div>
      </div>
    </div>
  );
}
