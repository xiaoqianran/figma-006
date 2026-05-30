

import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Search, Plus, Send, Phone, CheckCheck } from 'lucide-react';
import { toast } from 'sonner';

interface MessagesScreenProps {
  onBack?: () => void;
}

interface Conversation {
  id: number;
  name: string;
  last: string;
  time: string;
  unread: number;
  avatar: string;
}

interface Message {
  id: number;
  text: string;
  isSent: boolean;
  time: string;
  isImage?: boolean;
}

// Seed chat content faithfully matching the Figma "Messages Page" (Arman Nijum dark variant)
const SEED_MESSAGES: Message[] = [
  { id: 101, text: "Hey Porsign,thanks for placing the order!", isSent: false, time: "1:00 AM" },
  { id: 102, text: "Hey Porsign,thanks for placing the order!", isSent: true, time: "1:00 AM" },
  { id: 103, text: "Sure!I’ll give my best for your classes!", isSent: false, time: "1:00 AM" },
  { id: 104, text: "", isSent: true, time: "1:00 AM", isImage: true },
];

export function MessagesScreen({ onBack }: MessagesScreenProps) {
  const [search, setSearch] = useState('');
  const [conversations, setConversations] = useState<Conversation[]>([
    { id: 1, name: 'Michael Torres', last: 'On my way! ETA 6 minutes.', time: 'now', unread: 2, avatar: 'MT' },
    { id: 2, name: 'Support — Meteor', last: 'Your recent ride receipt is ready.', time: '11:42', unread: 0, avatar: 'S' },
    { id: 3, name: 'Jessica Patel', last: 'Thanks for the great rating 👍', time: 'yest', unread: 1, avatar: 'JP' },
    { id: 4, name: 'Arman Nijum', last: 'Sure!I’ll give my best for your classes!', time: 'now', unread: 0, avatar: 'AN' },
  ]);

  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<Message[]>(SEED_MESSAGES);
  const [input, setInput] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages update in chat view
  useEffect(() => {
    if (activeChat && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [chatMessages, activeChat]);

  const filteredConversations = conversations.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.last.toLowerCase().includes(search.toLowerCase())
  );

  function openChat(name: string) {
    setActiveChat(name);
    // Seed with Figma-accurate thread for high-fidelity preview (demo)
    setChatMessages(SEED_MESSAGES.map(m => ({ ...m, id: m.id + Math.floor(Math.random() * 1000) })));
    setInput('');
  }

  function closeChat() {
    setActiveChat(null);
    setInput('');
  }

  function handleSend() {
    const text = input.trim();
    if (!text || !activeChat) return;

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsg: Message = {
      id: Date.now(),
      text,
      isSent: true,
      time: now,
    };

    setChatMessages(prev => [...prev, newMsg]);
    setInput('');

    // Update the conversation list preview (last message + time)
    setConversations(prev =>
      prev.map(c =>
        c.name === activeChat
          ? { ...c, last: text.length > 42 ? text.slice(0, 39) + '...' : text, time: 'now', unread: 0 }
          : c
      )
    );

    // Premium demo: auto-reply after a short delay
    setTimeout(() => {
      const replies = [
        "Got it — thanks for the update!",
        "Perfect, I'll take care of that right away.",
        "Sounds good. See you soon!",
        "Appreciate it. Safe travels!",
      ];
      const replyText = replies[Math.floor(Math.random() * replies.length)];
      const replyTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const reply: Message = {
        id: Date.now() + 1,
        text: replyText,
        isSent: false,
        time: replyTime,
      };

      setChatMessages(p => [...p, reply]);

      setConversations(p =>
        p.map(c =>
          c.name === activeChat
            ? { ...c, last: replyText, time: 'now' }
            : c
        )
      );
    }, 1050);
  }

  function handleNewChat() {
    const newName = `Rider ${Math.floor(Math.random() * 900) + 100}`;
    const newConvo: Conversation = {
      id: Date.now(),
      name: newName,
      last: 'Hey there — just booked a ride!',
      time: 'now',
      unread: 1,
      avatar: newName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase(),
    };

    setConversations(prev => [newConvo, ...prev]);
    toast.success(`New chat started with ${newName}`);

    // Immediately open the new chat with fresh thread
    setTimeout(() => {
      setActiveChat(newName);
      setChatMessages(SEED_MESSAGES.map(m => ({ ...m, id: m.id + 9000 })));
      setInput('');
    }, 120);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  // ==================== CHAT DETAIL VIEW (matches Figma Messages Page ref) ====================
  if (activeChat) {
    return (
      <div className="h-full w-full bg-[#161A21] text-[#F8F4F4] flex flex-col">
        {/* Custom chat header — faithful to Figma dark variant */}
        <div className="px-6 pt-3 pb-2.5 flex items-center justify-between border-b border-white/5 flex-shrink-0">
          <div className="flex items-center gap-3">
            {/* Back */}
            <button
              onClick={closeChat}
              className="w-10 h-10 rounded-xl border border-[#1e293b] flex items-center justify-center active:bg-[#252c38] transition"
              aria-label="Back to messages"
            >
              <ArrowLeft size={20} className="text-[#C5C7D0]" />
            </button>

            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-[#2a2f3a] flex items-center justify-center ring-1 ring-white/10 overflow-hidden flex-shrink-0">
              <span className="text-[15px] font-bold tracking-[-0.5px] text-[#4C5DF9]">
                {activeChat.split(' ').map(w => w[0]).join('').slice(0, 2)}
              </span>
            </div>

            {/* Name + status */}
            <div>
              <div className="font-semibold text-[17px] tracking-[-0.3px] leading-none">{activeChat}</div>
              <div className="flex items-center gap-1.5 mt-1">
                <div className="w-[5px] h-[5px] rounded-full bg-[#00c955]" />
                <span className="text-[13px] text-[#90959e]">Online</span>
              </div>
            </div>
          </div>

          {/* Call button */}
          <button
            onClick={() => toast.success(`Calling ${activeChat}... (demo)`)}
            className="w-10 h-10 rounded-full bg-[#002811] flex items-center justify-center active:scale-[0.94] transition"
            aria-label="Voice call"
          >
            <Phone size={18} className="text-[#6fcf97]" />
          </button>
        </div>

        {/* Messages list (chat bubbles) */}
        <div className="flex-1 overflow-y-auto px-4 pt-6 pb-2 space-y-1.5 bg-[#161A21]">
          {chatMessages.map((msg) => {
            const isSent = msg.isSent;
            return (
              <div
                key={msg.id}
                className={`flex ${isSent ? 'justify-end' : 'justify-start'} px-1`}
              >
                <div className={`max-w-[78%] flex flex-col ${isSent ? 'items-end' : 'items-start'}`}>
                  {/* Bubble */}
                  <div
                    className={`px-4 py-[9px] text-[15px] leading-[1.35] rounded-3xl shadow-sm ${
                      isSent
                        ? 'bg-[#4C5DF9] text-[#121826]'
                        : 'bg-[#181b3a] text-[#f8fafc]'
                    }`}
                  >
                    {msg.isImage ? (
                      <div className="w-[212px] h-[118px] rounded-2xl overflow-hidden bg-[#222833] ring-1 ring-white/10">
                        <img
                          src="https://picsum.photos/id/1016/212/118"
                          alt="Shared street view"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      msg.text
                    )}
                  </div>

                  {/* Timestamp + read receipt */}
                  <div className={`flex items-center gap-1 mt-1 px-1 text-[11px] text-[#ccd6dd] ${isSent ? 'flex-row-reverse' : ''}`}>
                    <span>{msg.time}</span>
                    {isSent && <CheckCheck size={13} className="text-[#4C5DF9] -mt-px" />}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Message input bar — exact match to Figma Messages Page (extra pb clears BottomTabBar in tab context) */}
        <div className="px-4 pb-14 pt-2 bg-[#161A21] border-t border-white/5 flex-shrink-0">
          <div className="flex items-center gap-2 bg-[#1e293b] rounded-2xl px-4 py-1.5">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type Something"
              className="flex-1 bg-transparent text-[15px] placeholder:text-[#90959e] outline-none py-1.5 font-sans"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-[#90959e] active:text-white disabled:opacity-40 transition active:bg-white/5"
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          </div>
          <div className="text-center text-[10px] text-[#45484D] mt-2 tracking-wide">End-to-end encrypted</div>
        </div>
      </div>
    );
  }

  // ==================== MESSAGES LIST / INBOX VIEW ====================
  return (
    <div className="h-full w-full bg-[#161A21] text-[#F8F4F4] flex flex-col">
      {/* Header with search + new message action */}
      <div className="px-6 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-[1px] text-[#73767A]">Inbox</div>
            <div className="text-[22px] font-semibold tracking-[-0.4px] mt-1">Messages</div>
          </div>

          {/* New message button */}
          <button
            onClick={handleNewChat}
            className="w-9 h-9 rounded-full bg-[#222833] flex items-center justify-center active:bg-[#2a303c] transition border border-white/10"
            aria-label="New message"
          >
            <Plus size={19} className="text-[#4C5DF9]" />
          </button>
        </div>
      </div>

      {/* Search bar */}
      <div className="px-6 mt-4">
        <div className="input flex items-center gap-3 h-11 py-0 text-[#9FA1B0]">
          <Search size={18} className="text-[#4C5DF9] flex-shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search messages or contacts"
            className="flex-1 bg-transparent outline-none text-[15px] text-[#F8F4F4] placeholder:text-[#73767A]"
          />
        </div>
      </div>

      {/* Chat list */}
      <div className="px-6 mt-2 flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <div className="text-center text-sm text-[#73767A] py-12">No conversations found</div>
        ) : (
          filteredConversations.map((c) => (
            <button
              key={c.id}
              onClick={() => openChat(c.name)}
              className="w-full flex gap-3.5 items-start py-4 border-b border-white/10 active:bg-[#1f2530] text-left transition rounded-xl -mx-1 px-1"
            >
              {/* Avatar */}
              <div className="w-11 h-11 rounded-full bg-[#222833] flex-shrink-0 flex items-center justify-center text-sm font-semibold text-[#4C5DF9] ring-1 ring-white/5">
                {c.avatar}
              </div>

              <div className="flex-1 min-w-0 pt-0.5">
                <div className="flex items-center justify-between">
                  <div className="font-semibold truncate text-[15px]">{c.name}</div>
                  <div className="text-[11px] text-[#73767A] flex-shrink-0 ml-2 tabular-nums">{c.time}</div>
                </div>
                <div className="text-[13.5px] text-[#9FA1B0] truncate mt-0.5 pr-6">{c.last}</div>
              </div>

              {/* Unread indicator */}
              {c.unread > 0 && (
                <div className="mt-1.5 w-5 h-5 rounded-full bg-[#4C5DF9] text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                  {c.unread}
                </div>
              )}
            </button>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 text-center text-xs text-[#73767A] border-t border-white/10 flex-shrink-0">
        End-to-end encrypted • Tap any conversation to open
      </div>
      <div className="h-3 pb-10" /> {/* extra space for BottomTabBar in tab mode */}
    </div>
  );
}
