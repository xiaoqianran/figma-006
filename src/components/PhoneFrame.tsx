import React from 'react';
import { ArrowLeft, Signal, Wifi, Battery } from 'lucide-react';

interface PhoneFrameProps {
  children: React.ReactNode;
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  variant?: 'dark' | 'light';
}

export function PhoneFrame({ 
  children, 
  title, 
  showBack = false, 
  onBack, 
  variant = 'dark' 
}: PhoneFrameProps) {
  const isDark = variant === 'dark';

  return (
    <div className="phone-frame">
      <div className="phone-frame-inner" style={{ 
        background: isDark ? '#161A21' : '#F8F7F5',
        color: isDark ? '#F8F4F4' : '#161A21'
      }}>
        {/* Status Bar */}
        <div className="status-bar" style={{ 
          color: isDark ? '#F8F4F4' : '#161A21',
          background: 'transparent'
        }}>
          <div className="flex items-center gap-1 text-[13px] font-semibold tracking-[-0.2px]">
            9:41
          </div>
          <div className="flex items-center gap-1.5">
            <Signal size={14} />
            <Wifi size={14} />
            <div className="flex items-center gap-0.5">
              <Battery size={16} />
              <span className="text-[11px] font-semibold tabular-nums">87</span>
            </div>
          </div>
        </div>

        {/* Optional top nav / title bar for screens */}
        {(title || showBack) && (
          <div className="h-11 px-6 flex items-center justify-between text-sm font-semibold" style={{
            borderBottom: '1px solid rgba(255,255,255,0.06)'
          }}>
            <button 
              onClick={onBack} 
              disabled={!showBack}
              className="btn-ghost -ml-2 disabled:opacity-30"
              style={{ color: isDark ? '#F8F4F4' : '#161A21' }}
            >
              {showBack ? <ArrowLeft size={20} /> : null}
            </button>
            <div className="font-semibold tracking-tight text-[15px]">{title}</div>
            <div className="w-8" />
          </div>
        )}

        {/* Screen viewport content */}
        <div className="screen-content flex-1">
          {children}
        </div>

        {/* Home indicator */}
        <div className="h-8 flex items-center justify-center flex-shrink-0">
          <div className="w-32 h-[5px] rounded-full bg-white/30" />
        </div>
      </div>
    </div>
  );
}
