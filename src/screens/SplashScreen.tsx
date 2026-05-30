import { Star } from 'lucide-react';

interface SplashScreenProps {
  onCreateAccount?: () => void;
  onSignIn?: () => void;
}

export function SplashScreen({ onCreateAccount, onSignIn }: SplashScreenProps) {
  return (
    <div className="h-full w-full bg-[#161A21] flex flex-col items-center relative overflow-hidden">
      {/* Decorative meteors / shooting stars (inspired by Figma group) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[22%] left-[18%] w-px h-9 bg-gradient-to-b from-transparent via-[#4C5DF9] to-transparent rotate-[-35deg]" />
        <div className="absolute top-[19%] left-[22%] w-px h-6 bg-gradient-to-b from-transparent via-[#4C5DF9] to-transparent rotate-[-42deg]" />
        <div className="absolute top-[17%] left-[27%] w-px h-7 bg-gradient-to-b from-transparent via-[#4C5DF9] to-transparent rotate-[-28deg]" />
        
        {/* Small accent dots / stars */}
        <Star className="absolute top-[21%] left-[33%] text-[#4C5DF9] opacity-70" size={9} />
        <Star className="absolute top-[26%] left-[15%] text-[#4C5DF9] opacity-50" size={7} />
      </div>

      {/* Logo - "meteor" wordmark + icon cluster */}
      <div className="mt-[108px] flex flex-col items-center z-10">
        <div className="meteor-logo text-[42px] tracking-[-2.2px] font-extrabold text-[#F8F4F4] flex items-center gap-2.5">
          meteor
          <div className="relative w-9 h-9 flex items-center justify-center">
            {/* Custom meteor / rocket-ish icon matching Figma union shapes */}
            <div className="w-[35px] h-[36px] relative">
              <div className="absolute inset-0 bg-[#1C1F2A] rounded-[14px]" />
              <div className="absolute bottom-0 left-[11px] w-2.5 h-2.5 bg-[#4C5DF9] rounded-tl-[10px] rounded-br-[4px] rotate-[-12deg]" />
              <div className="absolute top-[6px] left-[10px] text-white text-[12px] font-medium tracking-[-0.5px]">$4</div>
            </div>
          </div>
        </div>
        
        <div className="mt-1 text-[11px] tracking-[3px] text-[#73767A] font-medium">RIDESHARE</div>
      </div>

      {/* Hero / tagline area (from Figma "Where do you want to go?" style) */}
      <div className="mt-auto mb-16 px-6 text-center z-10">
        <div className="text-[22px] leading-tight font-semibold tracking-[-0.3px] text-[#F8F4F4]">
          Your journey starts<br />with a single tap.
        </div>
        <div className="mt-3 text-[13px] text-[#9FA1B0]">
          Fast. Reliable. Meteor.
        </div>
      </div>

      {/* Bottom CTA section */}
      <div className="w-full px-6 pb-10 z-10">
        <button 
          onClick={onCreateAccount}
          className="btn-primary text-[15px] tracking-[-0.1px]"
        >
          Create New Account
        </button>

        <button 
          onClick={onSignIn}
          className="mt-4 w-full text-center text-[13px] text-[#9FA1B0] active:text-[#F8F4F4] transition-colors"
        >
          Already have an account? <span className="text-[#4C5DF9] font-medium">Sign in</span>
        </button>
      </div>
    </div>
  );
}
