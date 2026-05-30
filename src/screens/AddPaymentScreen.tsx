import { ArrowLeft, CreditCard, Plus } from 'lucide-react';

interface AddPaymentScreenProps {
  onBack?: () => void;
  onAddNew?: () => void;
}

export function AddPaymentScreen({ onBack, onAddNew }: AddPaymentScreenProps) {
  return (
    <div className="h-full w-full bg-[#161A21] text-[#F8F4F4] flex flex-col">
      <div className="px-6 pt-4 flex items-center gap-3">
        <button onClick={onBack} className="btn-ghost -ml-1"><ArrowLeft size={22} /></button>
        <div className="text-[18px] font-semibold">Add Payment method</div>
      </div>

      <div className="px-6 mt-6">
        <div className="text-sm text-[#9FA1B0] mb-3">Choose a payment method</div>
        
        {/* Saved cards (demo) */}
        <div className="space-y-3 mb-6">
          {[1,2].map(i => (
            <div key={i} className="card flex items-center gap-4 active:bg-[#252c38]">
              <div className="w-10 h-10 rounded-xl bg-[#222833] flex items-center justify-center">
                <CreditCard size={20} className="text-[#4C5DF9]" />
              </div>
              <div className="flex-1">
                <div className="font-semibold">•••• 4242</div>
                <div className="text-xs text-[#73767A]">Expires 12/28</div>
              </div>
              <div className="text-xs px-2 py-0.5 bg-[#1f2530] rounded">Default</div>
            </div>
          ))}
        </div>

        <button 
          onClick={onAddNew}
          className="w-full flex items-center justify-center gap-2 card py-4 text-[#4C5DF9] active:bg-[#252c38]"
        >
          <Plus size={18} /> Add new card
        </button>
      </div>

      <div className="mt-auto p-6 text-xs text-center text-[#73767A]">
        Your payment information is securely stored
      </div>
    </div>
  );
}
