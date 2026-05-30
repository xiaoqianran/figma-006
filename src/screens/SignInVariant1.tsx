import { ArrowLeft } from 'lucide-react';

interface SignInVariant1Props {
  onBack?: () => void;
  onContinue?: () => void;
}

export function SignInVariant1({ onBack, onContinue }: SignInVariant1Props) {
  return (
    <div className="h-full w-full bg-[#161A21] text-[#F8F4F4] flex flex-col">
      <div className="px-6 pt-4 flex items-center">
        <button onClick={onBack} className="btn-ghost -ml-1"><ArrowLeft size={22} /></button>
      </div>

      <div className="px-6 mt-8">
        <div className="text-[26px] font-bold tracking-[-0.8px]">Welcome back</div>
        <div className="text-[#9FA1B0] mt-2 text-sm">Sign in to continue your rides</div>
      </div>

      <div className="px-6 mt-8 space-y-4">
        <div>
          <div className="text-xs text-[#9FA1B0] mb-1.5 pl-1">Email or phone</div>
          <input className="input" defaultValue="alex.rivera@email.com" />
        </div>
        <div>
          <div className="text-xs text-[#9FA1B0] mb-1.5 pl-1">Password</div>
          <input className="input" type="password" defaultValue="••••••••" />
        </div>
      </div>

      <div className="px-6 mt-6">
        <button onClick={onContinue} className="btn-primary">Continue</button>
      </div>

      <div className="px-6 mt-6 text-center text-xs text-[#73767A]">
        Or continue with social accounts (see other variants)
      </div>
    </div>
  );
}
