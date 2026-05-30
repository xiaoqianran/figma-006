import { useState } from 'react';

interface SignInScreenProps {
  onBack?: () => void;
  onContinue?: () => void;
  onSocial?: (provider: string) => void;
}

export function SignInScreen({ onContinue, onSocial }: SignInScreenProps) {
  // Controlled inputs (replaced uncontrolled defaultValue for proper UX)
  const [emailOrPhone, setEmailOrPhone] = useState('alex.rivera@email.com');
  const [password, setPassword] = useState('••••••••');

  return (
    <div className="h-full w-full bg-[#161A21] text-[#F8F4F4] flex flex-col">
      {/* Frame provides top title + back button for auth flow screens */}
      <div className="px-6 mt-8">
        <div className="text-[28px] font-bold tracking-[-1px]">Welcome back</div>
        <div className="text-[#9FA1B0] mt-1">Sign in to continue your rides</div>
      </div>

      <div className="px-6 mt-8 space-y-4">
        <div>
          <div className="text-xs text-[#9FA1B0] mb-1.5 pl-1">Email or phone</div>
          <input 
            className="input" 
            value={emailOrPhone} 
            onChange={(e) => setEmailOrPhone(e.target.value)} 
          />
        </div>
        <div>
          <div className="text-xs text-[#9FA1B0] mb-1.5 pl-1">Password</div>
          <input 
            className="input" 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
      </div>

      <div className="px-6 mt-6">
        <button onClick={onContinue} className="btn-primary">Continue</button>
      </div>

      <div className="px-6 mt-6 flex items-center gap-3">
        <div className="flex-1 h-px bg-white/10" />
        <div className="text-xs text-[#73767A]">or</div>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      {/* Social logins (directly from Figma variants) */}
      <div className="px-6 mt-6 flex gap-3">
        <button 
          onClick={() => onSocial?.('google')}
          className="flex-1 card py-3 flex items-center justify-center gap-2 active:bg-[#252c38]"
        >
          <div className="w-5 h-5 rounded bg-white flex items-center justify-center text-[#161A21] text-[10px] font-bold">G</div>
          <span className="text-sm">Google</span>
        </button>
        <button 
          onClick={() => onSocial?.('facebook')}
          className="flex-1 card py-3 flex items-center justify-center gap-2 active:bg-[#252c38]"
        >
          <div className="w-5 h-5 rounded bg-[#1877F2] flex items-center justify-center text-white text-[10px] font-bold">f</div>
          <span className="text-sm">Facebook</span>
        </button>
      </div>

      <div className="mt-auto pb-8 text-center text-xs text-[#73767A]">
        Don’t have an account? <span className="text-[#4C5DF9]">Create one</span>
      </div>
    </div>
  );
}
