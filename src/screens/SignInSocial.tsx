import { useState } from 'react';

interface SignInSocialProps {
  onBack?: () => void;
  onContinue?: () => void;
}

export function SignInSocial({ onContinue }: SignInSocialProps) {
  const [emailOrPhone, setEmailOrPhone] = useState('alex.rivera@email.com');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    onContinue?.();
  };

  const handleSocial = () => {
    // Prominent circular social buttons trigger continue for demo
    onContinue?.();
  };

  return (
    <div className="h-full w-full bg-[#121826] text-[#F8F4F4] flex flex-col">
      {/* No internal back — pure Figma match for sign-in-social.png */}

      {/* Logo / Illustration (matches Figma) */}
      <div className="pt-7 flex justify-center">
        <div className="relative w-[97px] h-[97px]">
          <div className="absolute inset-0 rounded-full bg-[#504957]" />
          <div className="absolute inset-[10px] rounded-[22px] overflow-hidden bg-[#1a2233]">
            {/* Stylized shield / app mark */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#4C5DF9] to-[#949EFB] opacity-90" />
            <div className="absolute inset-[13px] rounded-[14px] bg-[#121826] flex items-center justify-center">
              <div className="text-[#F8F4F4] text-[28px] font-bold tracking-[-1.5px]">M</div>
            </div>
          </div>
        </div>
      </div>

      {/* Title block exact from Figma */}
      <div className="px-6 mt-5 text-center">
        <div className="text-[24px] font-bold tracking-[-0.5px]">Welcome</div>
        <div className="text-[#F8F4F4] mt-1 text-[16px]">Please fill in a few details below</div>
      </div>

      {/* Form inputs — large rounded dark fields matching Figma sign-in-social */}
      <div className="px-6 mt-8 space-y-3.5">
        <div>
          <div className="rounded-[12px] bg-[#1e293b] px-4 py-[18px] border border-[#2a2f38]">
            <div className="text-[13px] text-[#79828f] mb-0.5">Email or Phone number</div>
            <input
              className="bg-transparent text-[18px] font-normal w-full outline-none text-[#F8F4F4]"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
            />
          </div>
        </div>

        <div>
          <div className="rounded-[12px] bg-[#1e293b] px-4 py-[18px] border border-[#2a2f38]">
            <div className="text-[13px] text-[#79828f] mb-0.5">Password</div>
            <input
              type="password"
              className="bg-transparent text-[18px] font-normal w-full outline-none text-[#F8F4F4]"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="px-1 mt-2">
            <button className="text-[#79828f] text-[14px] font-medium hover:text-[#9FA1B0]">Forget password?</button>
          </div>
        </div>
      </div>

      {/* Primary Log in button */}
      <div className="px-6 mt-6">
        <button onClick={handleLogin} className="btn-primary">Log in</button>
      </div>

      {/* Or sign in with + prominent circular social buttons (exact Figma layout) */}
      <div className="mt-7 px-6">
        <div className="text-center text-[14px] text-[#F8F4F4] mb-4">Or sign in with</div>

        <div className="flex justify-center gap-8">
          {/* Google — prominent circle */}
          <button
            onClick={handleSocial}
            className="w-[58px] h-[58px] rounded-full bg-[#1e293b] flex items-center justify-center active:bg-[#252c38] active:scale-[0.96] transition shadow-inner border border-[#2a2f38]"
          >
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
              <span className="text-[#EA4335] text-[22px] font-bold">G</span>
            </div>
          </button>

          {/* Facebook — prominent circle */}
          <button
            onClick={handleSocial}
            className="w-[58px] h-[58px] rounded-full bg-[#1e293b] flex items-center justify-center active:bg-[#252c38] active:scale-[0.96] transition shadow-inner border border-[#2a2f38]"
          >
            <div className="w-8 h-8 rounded-full bg-[#1877F2] flex items-center justify-center">
              <span className="text-white text-[22px] font-bold">f</span>
            </div>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto pb-8 text-center text-[16px] text-[#F8F4F4]">
        Don’t have account? <span className="text-[#4C5DF9] font-medium">Sign up</span>
      </div>
    </div>
  );
}
