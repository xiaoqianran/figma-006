import { useState } from 'react';
import { CreditCard, Loader2, Check } from 'lucide-react';

interface AddCardScreenProps {
  onBack?: () => void;
  onAddSuccess?: (card?: { brand: string; last4: string; expiry: string; holder?: string }) => void;
}

type SubmitStatus = 'idle' | 'loading' | 'success';

export function AddCardScreen({ onAddSuccess }: AddCardScreenProps) {
  // Controlled React state for all fields (task requirement)
  const [cardNumber, setCardNumber] = useState('4242 4242 4242 4242');
  const [expiry, setExpiry] = useState('12 / 28');
  const [cvv, setCvv] = useState('424');
  const [nameOnCard, setNameOnCard] = useState('Alex Rivera');

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');

  // Simple live formatting helpers
  const formatCardNumber = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
  };
  const formatExpiry = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) return `${digits.slice(0,2)} / ${digits.slice(2)}`;
    if (digits.length >= 2) return `${digits.slice(0,2)} / `;
    return digits;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(formatCardNumber(e.target.value));
    if (formErrors.cardNumber) setFormErrors(prev => ({ ...prev, cardNumber: '' }));
  };
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpiry(formatExpiry(e.target.value));
    if (formErrors.expiry) setFormErrors(prev => ({ ...prev, expiry: '' }));
  };
  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.replace(/\D/g, '').slice(0, 4);
    setCvv(v);
    if (formErrors.cvv) setFormErrors(prev => ({ ...prev, cvv: '' }));
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameOnCard(e.target.value);
    if (formErrors.name) setFormErrors(prev => ({ ...prev, name: '' }));
  };

  // Basic on-submit validation + fake 2s loading + success checkmark (task requirement)
  const handleAddCard = () => {
    if (submitStatus !== 'idle') return;

    const errors: Record<string, string> = {};
    const digits = cardNumber.replace(/\s/g, '');

    if (!/^\d{16}$/.test(digits)) {
      errors.cardNumber = 'Enter a valid 16-digit card number';
    }
    const expClean = expiry.replace(/\s/g, '');
    const expMatch = expClean.match(/^(\d{2})\/(\d{2})$/);
    if (!expMatch) {
      errors.expiry = 'Use MM/YY format';
    } else {
      const m = parseInt(expMatch[1], 10);
      const y = parseInt(expMatch[2], 10);
      if (m < 1 || m > 12) errors.expiry = 'Month must be 01-12';
      else if (y < 24 || (y === 24 && m < 6)) errors.expiry = 'Card appears expired';
    }
    if (!/^\d{3,4}$/.test(cvv)) {
      errors.cvv = 'CVV must be 3 or 4 digits';
    }
    if (!nameOnCard.trim()) {
      errors.name = 'Name on card is required';
    }

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    // Success path: 2s fake processing + nice loading + checkmark
    setSubmitStatus('loading');
    setTimeout(() => {
      setSubmitStatus('success');

      // Build card payload for persistence
      const last4 = digits.slice(-4);
      const brand = digits[0] === '4' ? 'Visa' : digits[0] === '5' ? 'Mastercard' : 'Card';
      const payload = {
        brand,
        last4,
        expiry: expClean,
        holder: nameOnCard.trim(),
      };

      setTimeout(() => {
        onAddSuccess?.(payload);
        // Reset form for re-use if user returns (demo)
        setCardNumber('4242 4242 4242 4242');
        setExpiry('12 / 28');
        setCvv('424');
        setNameOnCard('Alex Rivera');
        setFormErrors({});
        setSubmitStatus('idle');
      }, 680);
    }, 2000);
  };

  const isProcessing = submitStatus === 'loading' || submitStatus === 'success';

  // Live preview derived from state (polish)
  const previewLast4 = cardNumber.replace(/\s/g, '').slice(-4) || '4242';
  const previewExpiry = expiry.replace(/\s/g, '') || '12/28';
  const previewName = nameOnCard.trim().toUpperCase() || 'ALEX RIVERA';

  return (
    <div className="h-full w-full flex flex-col" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      {/* Card visual mock (from Figma) — now live updating from controlled state */}
      <div className="px-6 pt-2">
        <div className="relative h-[157px] w-full rounded-[16px] overflow-hidden" 
             style={{ background: 'linear-gradient(135deg, #10164d 0%, #1a2340 100%)' }}>
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff10_0.8px,transparent_1px)] bg-[length:3px_3px]" />
          
          <div className="absolute top-6 left-6">
            <CreditCard size={28} className="text-white/70" />
          </div>
          
          <div className="absolute bottom-6 left-6 right-6">
            <div className="font-mono tracking-[3.5px] text-lg text-white/90">••••  ••••  •••• {previewLast4}</div>
            <div className="mt-3 flex justify-between text-xs">
              <div>
                <div className="text-white/50 text-[10px]">CARD HOLDER</div>
                <div className="font-medium tracking-wide">{previewName}</div>
              </div>
              <div className="text-right">
                <div className="text-white/50 text-[10px]">EXPIRES</div>
                <div className="font-medium">{previewExpiry}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form with inline validation errors */}
      <div className="px-6 mt-8 space-y-4 flex-1">
        <div>
          <div className="text-xs text-[#9FA1B0] mb-1.5 pl-1">Card number</div>
          <input 
            className={`input ${formErrors.cardNumber ? 'border-[#FF5050]' : ''}`} 
            placeholder="4242 4242 4242 4242" 
            value={cardNumber} 
            onChange={handleCardNumberChange}
            disabled={isProcessing}
          />
          {formErrors.cardNumber && <div className="text-[#FF5050] text-[11px] mt-1 pl-1">{formErrors.cardNumber}</div>}
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs text-[#9FA1B0] mb-1.5 pl-1">Expiry date</div>
            <input 
              className={`input ${formErrors.expiry ? 'border-[#FF5050]' : ''}`} 
              placeholder="MM / YY" 
              value={expiry} 
              onChange={handleExpiryChange}
              disabled={isProcessing}
            />
            {formErrors.expiry && <div className="text-[#FF5050] text-[11px] mt-1 pl-1">{formErrors.expiry}</div>}
          </div>
          <div>
            <div className="text-xs text-[#9FA1B0] mb-1.5 pl-1">CVV</div>
            <input 
              className={`input ${formErrors.cvv ? 'border-[#FF5050]' : ''}`} 
              placeholder="123" 
              value={cvv} 
              onChange={handleCvvChange}
              disabled={isProcessing}
            />
            {formErrors.cvv && <div className="text-[#FF5050] text-[11px] mt-1 pl-1">{formErrors.cvv}</div>}
          </div>
        </div>

        <div>
          <div className="text-xs text-[#9FA1B0] mb-1.5 pl-1">Name on card</div>
          <input 
            className={`input ${formErrors.name ? 'border-[#FF5050]' : ''}`} 
            value={nameOnCard} 
            onChange={handleNameChange}
            disabled={isProcessing}
          />
          {formErrors.name && <div className="text-[#FF5050] text-[11px] mt-1 pl-1">{formErrors.name}</div>}
        </div>
      </div>

      {/* CTA with loading / success states */}
      <div className="p-6 pt-4">
        <button 
          onClick={handleAddCard}
          disabled={isProcessing}
          className="btn-primary flex items-center justify-center gap-2 disabled:opacity-80 disabled:cursor-not-allowed"
        >
          {submitStatus === 'loading' && (
            <>
              <Loader2 size={18} className="animate-spin" />
              Adding card...
            </>
          )}
          {submitStatus === 'success' && (
            <>
              <Check size={20} className="text-[#38C978]" />
              Card added successfully
            </>
          )}
          {submitStatus === 'idle' && 'Add card & confirm booking'}
        </button>
        <div className="text-center mt-3 text-[11px] text-[#73767A]">
          {submitStatus === 'success' 
            ? 'Securely saved • Returning to flow...' 
            : 'Your payment info is encrypted and secure'}
        </div>
      </div>
    </div>
  );
}
