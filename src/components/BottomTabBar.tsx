import React from 'react';
import { Home, Search, MessageCircle, User } from 'lucide-react';

export type TabId = 'home' | 'explore' | 'messages' | 'profile';

interface BottomTabBarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  className?: string;
}

const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: 'home', label: 'Home', icon: <Home size={20} /> },
  { id: 'explore', label: 'Explore', icon: <Search size={20} /> },
  { id: 'messages', label: 'Messages', icon: <MessageCircle size={20} /> },
  { id: 'profile', label: 'Profile', icon: <User size={20} /> },
];

export function BottomTabBar({ activeTab, onTabChange, className = '' }: BottomTabBarProps) {
  return (
    <div 
      className={`absolute bottom-0 left-0 right-0 bg-[#161A21] border-t border-white/10 z-40 bottom-tab-bar ${className}`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 8px)' }}
    >
      <div className="flex items-center justify-around h-14">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
                isActive ? 'text-[#4C5DF9]' : 'text-[#73767A] active:text-[#9FA1B0] tab-inactive'
              }`}
            >
              <div className={isActive ? 'scale-110' : ''}>{tab.icon}</div>
              <span className="text-[10px] mt-0.5 font-medium tracking-wide">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
