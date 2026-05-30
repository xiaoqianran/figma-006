import { ArrowLeft } from 'lucide-react';

interface SignInSocialProps {
  onBack?: () => void;
  onContinue?: () => void;
}

export function SignInSocial({ onBack, onContinue }: SignInSocialProps) {
  return (
    <div className="h-full w-full bg-[#161A21] text-[#F8F4F4] flex flex-col">
      <div className="px-6 pt-4 flex items-center">
        <button onClick={onBack} className="btn-ghost -ml-1"><ArrowLeft size={22} /></button>
      </div>

      <div className="px-6 mt-8">
        <div className="text-[26px] font-bold tracking-[-0.8px]">Sign in</div>
        <div className="text-[#9FA1B0] mt-2 text-sm">Choose your preferred method</div>
      </div>

      <div className="px-6 mt-8 space-y-3">
        <button onClick={onContinue} className="w-full card py-4 flex items-center gap-3 active:bg-[#252c38]">
          <div className="w-8 h-8 rounded bg-white flex items-center justify-center text-[#161A21] font-bold">G</div>
          <span>Continue with Google</span>
        </button>
        <button onClick={onContinue} className="w-full card py-4 flex items-center gap-3 active:bg-[#252c38]">
          <div className="w-8 h-8 rounded bg-[#1877F2] flex items-center justify-center text-white font-bold">f</div>
          <span>Continue with Facebook</span>
        </button>
        <button onClick={onContinue} className="w-full card py-4 flex items-center gap-3 active:bg-[#252c38]">
          <span>Continue with Email</span>
        </button>
      </div>
    </div>
  );
}
