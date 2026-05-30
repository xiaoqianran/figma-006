import React from 'react';
import { ArrowLeft, ChevronRight, User, CreditCard, Clock, Gift, Mail, MapPin, Settings, HelpCircle } from 'lucide-react';
import { toast } from 'sonner';

interface SettingsScreenProps {
  onBack?: () => void;
  onGiftCode?: () => void;
}

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  iconBg: string;
  onClick?: () => void;
}

export function SettingsScreen({ onBack, onGiftCode }: SettingsScreenProps) {
  const menuItems: MenuItem[] = [
    {
      icon: <User size={20} className="text-white" />,
      label: 'My account',
      iconBg: '#4C5DF9',
    },
    {
      icon: <CreditCard size={20} className="text-white" />,
      label: 'Payment Card',
      iconBg: '#D78D56',
    },
    {
      icon: <Clock size={20} className="text-white" />,
      label: 'Trip History',
      iconBg: '#56B7DF',
    },
    {
      icon: <Gift size={20} className="text-white" />,
      label: 'Gift Cards',
      iconBg: '#D45098',
      onClick: () => onGiftCode?.(),
    },
    {
      icon: <Mail size={20} className="text-white" />,
      label: 'Message',
      iconBg: '#A966CA',
    },
    {
      icon: <MapPin size={20} className="text-white" />,
      label: 'My Trips',
      iconBg: '#09A87B',
    },
    {
      icon: <Settings size={20} className="text-white" />,
      label: 'Setting',
      iconBg: '#9451D7',
    },
    {
      icon: <HelpCircle size={20} className="text-white" />,
      label: 'Help',
      iconBg: '#EF7C67',
    },
  ];

  const handleItemPress = (item: MenuItem) => {
    if (item.onClick) {
      item.onClick();
    } else {
      toast.info(`${item.label} — demo only`, { duration: 1400 });
    }
  };

  return (
    <div className="h-full w-full bg-[#161A21] text-[#F8F4F4] flex flex-col overflow-auto">
      {/* Custom header matching Figma dark Setting Page */}
      <div className="px-6 pt-4 pb-2 flex items-center">
        <button 
          onClick={onBack} 
          className="btn-ghost -ml-1 w-10 h-10 flex items-center justify-center"
          aria-label="Back"
        >
          <ArrowLeft size={22} />
        </button>
        <div className="flex-1 text-center text-[18px] font-semibold tracking-[-0.2px] pr-10">
          Setting
        </div>
      </div>

      {/* Menu list — exact spacing, card style and icon treatments from Figma dark ref */}
      <div className="px-6 pt-5 pb-8 space-y-[13px]">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => handleItemPress(item)}
            className="w-full flex items-center gap-4 px-4 py-[13px] rounded-[12px] bg-[#1F2530] border border-[#1E293B] active:bg-[#252C38] transition-colors text-left"
          >
            {/* Colored icon square (36x36, 8px radius) */}
            <div 
              className="w-9 h-9 rounded-[8px] flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: item.iconBg }}
            >
              {item.icon}
            </div>

            {/* Label */}
            <div className="flex-1 text-[16px] font-semibold tracking-[-0.1px]">
              {item.label}
            </div>

            {/* Chevron */}
            <ChevronRight size={18} className="text-[#9FA1B0] flex-shrink-0" />
          </button>
        ))}
      </div>

      {/* Subtle bottom hint (matches demo polish of other screens) */}
      <div className="mt-auto px-6 pb-8 text-center">
        <div className="text-[11px] text-[#73767A]">Tap any item to explore (Gift Cards is live)</div>
      </div>
    </div>
  );
}
