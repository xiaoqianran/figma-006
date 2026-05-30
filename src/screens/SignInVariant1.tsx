import { useState } from 'react';
import { ChevronDown, Camera } from 'lucide-react';

interface SignInVariant1Props {
  variant?: 'create' | 'profile' | 1 | 2;
  onBack?: () => void;
  onContinue?: () => void;
}

export function SignInVariant1({ variant = 'create', onBack, onContinue }: SignInVariant1Props) {
  const isProfile = variant === 'profile' || variant === 2;

  // Shared controlled state for demo
  const [form, setForm] = useState({
    name: isProfile ? 'Tufayel Islam' : '',
    email: isProfile ? 'tufayeli371@gamil.com' : 'alex.rivera@email.com',
    password: '',
    phone: isProfile ? '+087 654 564' : '',
    phoneCode: '+008',
  });

  const handleField = (key: keyof typeof form, val: string) => {
    setForm((f) => ({ ...f, [key]: val }));
  };

  if (isProfile) {
    // === SIGN-IN-2 / Edit Profile variant — exact high-fidelity match to sign-in-2.png ===
    return (
      <div className="h-full w-full bg-[#121826] text-[#F8F4F4] flex flex-col">
        {/* Custom top bar with back (exact from Figma edit profile) */}
        <div className="px-6 pt-4 pb-1 flex items-center justify-between">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-[13px] border border-[#2a2f38] flex items-center justify-center active:bg-[#1f2530]"
          >
            <span className="text-[#C5C7D0] text-xl leading-none">←</span>
          </button>
          <div className="text-[18px] font-bold">Edit Profile</div>
          <div className="w-10" />
        </div>

        {/* Avatar with edit badge — exact match */}
        <div className="mt-5 flex justify-center">
          <div className="relative">
            <div className="w-[97px] h-[97px] rounded-full overflow-hidden border-[3px] border-[#2a2f38]">
              {/* Realistic photo approximation (grayscale portrait style) */}
              <div className="w-full h-full bg-gradient-to-br from-[#3a404c] via-[#2a2f38] to-[#161A21] flex items-center justify-center">
                <div className="w-[78px] h-[78px] rounded-full bg-[#1f2530] overflow-hidden relative">
                  {/* Simple face representation */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_45%_35%,#d1d5db_0%,transparent_55%)] opacity-80" />
                  <div className="absolute left-1/2 top-[26px] -translate-x-1/2 w-5 h-7 rounded-full bg-[#9ca3af]" />
                </div>
              </div>
            </div>
            {/* Edit camera badge */}
            <div className="absolute -bottom-0.5 -right-0.5 w-[22px] h-[22px] rounded-full bg-[#4C5DF9] flex items-center justify-center border-[2px] border-[#121826]">
              <Camera size={12} className="text-white" />
            </div>
          </div>
        </div>

        {/* Form fields — labels inside + values (Figma dark edit profile) */}
        <div className="px-6 mt-7 space-y-3.5">
          {/* Name */}
          <div className="rounded-[12px] border border-[#2a2f38] bg-[#1e293b] px-4 pt-2.5 pb-3">
            <div className="text-[13px] text-[#9FA1B0]">Name</div>
            <input
              className="mt-0.5 bg-transparent w-full text-[16px] font-medium outline-none"
              value={form.name}
              onChange={(e) => handleField('name', e.target.value)}
            />
          </div>

          {/* Phone */}
          <div className="rounded-[12px] border border-[#2a2f38] bg-[#1e293b] px-4 pt-2.5 pb-3">
            <div className="text-[13px] text-[#9FA1B0]">Phone Number</div>
            <input
              className="mt-0.5 bg-transparent w-full text-[16px] font-medium outline-none"
              value={form.phone}
              onChange={(e) => handleField('phone', e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="rounded-[12px] border border-[#2a2f38] bg-[#1e293b] px-4 pt-2.5 pb-3">
            <div className="text-[13px] text-[#9FA1B0]">E-mail</div>
            <input
              className="mt-0.5 bg-transparent w-full text-[16px] font-medium outline-none"
              value={form.email}
              onChange={(e) => handleField('email', e.target.value)}
            />
          </div>
        </div>

        {/* Save CTA */}
        <div className="mt-auto px-6 pb-8">
          <button onClick={onContinue} className="btn-primary">Save</button>
        </div>
      </div>
    );
  }

  // === SIGN-IN-1 / Create Account variant — exact high-fidelity match to sign-in-1.png ===
  return (
    <div className="h-full w-full bg-[#121826] text-[#F8F4F4] flex flex-col">
      {/* No custom top bar (Figma has only status bar) */}

      {/* Shield / illustration logo (high-fidelity to Figma create account graphic) */}
      <div className="pt-8 flex justify-center">
        <div className="relative w-[97px] h-[97px] flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-[#484454]" />
          <div className="relative w-[77px] h-[77px] rounded-[22px] bg-gradient-to-br from-[#5b6cf9] via-[#4C5DF9] to-[#3b4dd1] flex items-center justify-center shadow-[0_0_40px_-8px_#4C5DF9]">
            <div className="w-[55px] h-[55px] rounded-[14px] bg-[#a5d8ff] flex items-center justify-center relative">
              {/* Shield icon shape */}
              <div className="w-[36px] h-[42px] bg-[#4C5DF9] rounded-[6px] rotate-[8deg]" />
              <div className="absolute w-[22px] h-[27px] bg-[#a5d8ff] rounded-[3px]" />
            </div>
          </div>
        </div>
      </div>

      {/* Title + subtitle exact */}
      <div className="px-6 mt-4 text-center">
        <div className="text-[24px] font-bold tracking-[-0.6px]">Create Your Account</div>
        <div className="text-[#F8F4F4] mt-1.5 text-[16px]">Please fill in a few details below</div>
      </div>

      {/* Form fields — inset labels + * required, phone split (exact Figma) */}
      <div className="px-6 mt-7 space-y-3">
        {/* Name */}
        <div className="rounded-[12px] bg-[#1e293b] px-4 py-[17px] border border-[#2a2f38]">
          <div className="text-[16px] text-[#F8F4F4]">Name<span className="text-[#F89B54]">*</span></div>
        </div>

        {/* Email */}
        <div className="rounded-[12px] bg-[#1e293b] px-4 py-[17px] border border-[#2a2f38]">
          <div className="text-[16px] text-[#F8F4F4]">Email Address<span className="text-[#F89B54]">*</span></div>
        </div>

        {/* Password */}
        <div className="rounded-[12px] bg-[#1e293b] px-4 py-[17px] border border-[#2a2f38]">
          <div className="text-[16px] text-[#F8F4F4]">Password<span className="text-[#F89B54]">*</span></div>
        </div>

        {/* Phone row — split country + number (precise Figma layout) */}
        <div className="flex gap-3">
          {/* Country code selector */}
          <div className="w-[140px] rounded-[12px] bg-[#1e293b] px-3 py-[17px] border border-[#2a2f38] flex items-center justify-between">
            <div className="text-[16px] text-[#F8F4F4]">{form.phoneCode}</div>
            <ChevronDown size={16} className="text-[#9FA1B0]" />
          </div>

          {/* Phone number */}
          <div className="flex-1 rounded-[12px] bg-[#1e293b] px-4 py-[17px] border border-[#2a2f38]">
            <div className="text-[16px] text-[#F8F4F4]">Phone number<span className="text-[#F89B54]">*</span></div>
          </div>
        </div>
      </div>

      {/* Create Account button */}
      <div className="px-6 mt-6">
        <button onClick={onContinue} className="btn-primary">Create Account</button>
      </div>

      {/* Footer link */}
      <div className="mt-auto pb-8 text-center text-[16px] text-[#F8F4F4]">
        Have an account? <span className="text-[#4C5DF9] font-medium">Sign in</span>
      </div>
    </div>
  );
}
