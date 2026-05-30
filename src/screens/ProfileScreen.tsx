import { CreditCard, Settings, HelpCircle, LogOut, Star } from 'lucide-react';

interface ProfileScreenProps {
  onManagePayments?: () => void;
  onLogout?: () => void;
}

export function ProfileScreen({ onManagePayments, onLogout }: ProfileScreenProps) {
  const menuItems = [
    { icon: <CreditCard size={18} />, label: 'Payment methods', action: onManagePayments },
    { icon: <Star size={18} />, label: 'Ride history & ratings', action: () => {} },
    { icon: <Settings size={18} />, label: 'App settings', action: () => {} },
    { icon: <HelpCircle size={18} />, label: 'Help & support', action: () => {} },
  ];

  return (
    <div className="h-full w-full bg-[#161A21] text-[#F8F4F4] flex flex-col">
      {/* Profile header */}
      <div className="px-6 pt-8 pb-6 flex items-center gap-4 border-b border-white/10">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#4C5DF9] to-[#F89B54] flex items-center justify-center text-2xl font-bold text-white flex-shrink-0">
          AR
        </div>
        <div>
          <div className="text-xl font-semibold tracking-[-0.3px]">Alex Rivera</div>
          <div className="text-[#9FA1B0] text-sm">alex.rivera@email.com</div>
          <div className="flex items-center gap-2 mt-1 text-xs">
            <div className="px-2 py-0.5 rounded bg-[#1f2530] text-[#F89B54]">Gold member</div>
            <div className="text-[#73767A]">142 rides</div>
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div className="px-6 pt-5 grid grid-cols-3 gap-3 text-center">
        {[
          { label: 'This month', value: '18' },
          { label: 'Avg rating', value: '4.9' },
          { label: 'CO₂ saved', value: '47kg' },
        ].map((stat, i) => (
          <div key={i} className="card py-3">
            <div className="text-2xl font-semibold tracking-tight">{stat.value}</div>
            <div className="text-[11px] text-[#73767A] mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Menu */}
      <div className="mt-6 px-6 flex-1">
        <div className="text-xs uppercase tracking-widest text-[#73767A] mb-2 pl-1">ACCOUNT</div>
        <div className="space-y-1">
          {menuItems.map((item, idx) => (
            <button
              key={idx}
              onClick={item.action}
              className="w-full card flex items-center gap-3.5 py-[15px] active:bg-[#252c38] text-left transition"
            >
              <div className="text-[#4C5DF9]">{item.icon}</div>
              <div className="font-medium flex-1">{item.label}</div>
              <div className="text-[#73767A] text-lg leading-none">›</div>
            </button>
          ))}
        </div>

        {/* Danger / logout */}
        <button 
          onClick={onLogout}
          className="mt-5 w-full flex items-center justify-center gap-2 py-3.5 text-sm text-[#FF6B3B] active:bg-[#252c38] rounded-2xl border border-white/10 transition"
        >
          <LogOut size={16} /> Sign out
        </button>
      </div>

      <div className="h-4" />
    </div>
  );
}
