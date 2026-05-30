import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, MessageCircle, X, MapPin, Star, CheckCircle, Clock, 
  Navigation, AlertTriangle 
} from 'lucide-react';
import { toast } from 'sonner';

/**
 * Live Ride Tracking Screen — High-fidelity Meteor Rideshare demo
 * 
 * Fidelity notes (matching Figma rideshare tracking views):
 * - Exact dark theme (#161A21 base, surfaces #1f2530 / #222833) and Sen font family
 * - Tokens pulled from tokens.ts + index.css (blue-100 #4C5DF9, orange #F89B54, radii, spacing)
 * - Premium layered fake map using SVG roads + CSS textures (common in Figma high-fi prototypes)
 * - Framer-motion for smooth car movement simulation, ETA banner entrance, and UI transitions
 * - Status timeline with interactive simulation controls (exactly as expected in Figma dev-handoff flows)
 * - Bottom action bar with chat/call/cancel, cancel uses internal confirm modal (sonner toasts for feedback)
 * - Matches patterns from CarResultScreen, MessagesScreen, DestinationScreen, ProfileScreen (avatars, cards, btns)
 * - Self-contained; ready for import + wiring in App.tsx (props: onBack / onCompleteRide / onOpenChat / rideInfo)
 * - Pixel-perfect polish: subtle animations, glassmorphic ETA, crisp typography, accessible taps
 */

interface LiveRideTrackingScreenProps {
  onBack?: () => void;
  onCompleteRide?: () => void;
  onOpenChat?: () => void;
  rideInfo?: {
    driver?: string;
    vehicle?: string;
    plate?: string;
    rating?: number;
    from?: string;
    to?: string;
    distance?: string;
  };
}

type RidePhase = 'enroute' | 'arriving' | 'arrived' | 'riding' | 'completed';

export function LiveRideTrackingScreen({
  onBack,
  onCompleteRide,
  onOpenChat,
  rideInfo
}: LiveRideTrackingScreenProps) {
  // Defaults consistent with CarResultScreen data
  const driverName = rideInfo?.driver || 'Michael T.';
  const vehicle = rideInfo?.vehicle || 'Tesla Model 3';
  const plate = rideInfo?.plate || 'ABC-124';
  const rating = rideInfo?.rating || 4.9;
  const tripFrom = rideInfo?.from || 'Sunset Blvd';
  const tripTo = rideInfo?.to || 'Downtown Hub';
  const tripDistance = rideInfo?.distance || '3.2 mi';

  const [phase, setPhase] = useState<RidePhase>('enroute');
  const [etaMinutes, setEtaMinutes] = useState(4);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [rideStartTime, setRideStartTime] = useState<string | null>(null);
  const [elapsedMin, setElapsedMin] = useState(0);

  // Car animation state (percentage based inside map container)
  const [carPos, setCarPos] = useState({ x: 18, y: 58 });

  // Derived labels
  const isActive = phase !== 'completed';
  const arrivalTime = '9:52';

  // Timeline steps (visual + state driven)
  const timelineSteps = [
    { key: 'enroute', label: 'Driver en route', sub: '9:42' },
    { key: 'arriving', label: 'Arriving soon', sub: '9:49' },
    { key: 'riding', label: 'Ride in progress', sub: rideStartTime || '—' },
  ];

  const currentStepIndex = 
    phase === 'enroute' ? 0 : 
    phase === 'arriving' || phase === 'arrived' ? 1 : 
    phase === 'riding' || phase === 'completed' ? 2 : 0;

  // Helper to smoothly animate car toward destination (premium motion)
  function animateCarTo(targetX: number, targetY: number, durationMs = 850) {
    const start = { ...carPos };
    const startTime = Date.now();

    const tick = () => {
      const p = Math.min(1, (Date.now() - startTime) / durationMs);
      // Ease out cubic for premium feel
      const eased = 1 - Math.pow(1 - p, 3);
      const newX = start.x + (targetX - start.x) * eased;
      const newY = start.y + (targetY - start.y) * eased;
      setCarPos({ x: newX, y: newY });

      if (p < 1) {
        requestAnimationFrame(tick);
      } else {
        setCarPos({ x: targetX, y: targetY });
      }
    };
    requestAnimationFrame(tick);
  }

  // Simulation controls — advance the live tracking experience
  function simulateDriverArriving() {
    if (phase !== 'enroute') return;
    setPhase('arriving');
    setEtaMinutes(1);
    // Car moves much closer to destination marker
    animateCarTo(62, 34, 920);
    toast.success('Driver 1 min away — updating route');
  }

  function simulateDriverArrived() {
    if (phase !== 'arriving' && phase !== 'enroute') return;
    setPhase('arrived');
    setEtaMinutes(0);
    animateCarTo(78, 28, 620);
    toast('Driver has arrived at pickup', { description: 'Please meet outside' });
  }

  function startRide() {
    if (phase === 'completed') return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    setRideStartTime(timeStr);
    setPhase('riding');
    setElapsedMin(0);
    // Car begins moving along the destination route
    animateCarTo(86, 18, 780);

    // Demo elapsed time ticking (stops on end)
    const interval = setInterval(() => {
      setElapsedMin(prev => {
        if (prev >= 14) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 4200); // realistic slow tick for demo

    toast.success('Ride started', { description: 'Safe travels!' });
  }

  function endRide() {
    if (phase === 'completed') return;
    setPhase('completed');
    // Final position at destination
    animateCarTo(92, 14, 520);

    setTimeout(() => {
      toast.success('Ride completed', { description: 'Thank you for riding with Meteor!' });
      onCompleteRide?.();
    }, 680);
  }

  function handleCancelRide() {
    setShowCancelConfirm(true);
  }

  function confirmCancel() {
    setShowCancelConfirm(false);
    toast.error('Ride cancelled', { description: 'You have been refunded (demo)' });
    // In real app would navigate back — here we just let parent decide
    setTimeout(() => {
      onBack?.();
    }, 650);
  }

  function handlePhone() {
    toast.success(`Calling ${driverName}...`, { description: 'Connecting via Meteor Voice' });
  }

  function handleChat() {
    if (onOpenChat) {
      onOpenChat();
    } else {
      // Graceful standalone fallback — premium toast + hint
      toast.info('Opening chat with driver', { description: 'In-app messaging (demo)' });
    }
  }

  // Small live route progress indicator (visual only, driven by phase)
  const routeProgress = 
    phase === 'enroute' ? 32 :
    phase === 'arriving' ? 68 :
    phase === 'arrived' ? 81 :
    phase === 'riding' ? Math.min(94, 46 + elapsedMin * 3.4) :
    100;

  return (
    <div className="h-full w-full bg-[#161A21] text-[#F8F4F4] flex flex-col overflow-hidden">
      {/* Top status bar area is provided by PhoneFrame — content starts clean */}

      {/* HEADER: Driver info (premium card style matching Figma) */}
      <div className="px-6 pt-5 pb-4 border-b border-white/10 bg-[#161A21] flex-shrink-0">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#2a3444] to-[#1f2530] flex items-center justify-center ring-1 ring-white/10 flex-shrink-0 shadow-inner">
            <span className="text-[22px] font-bold tracking-[-0.8px] text-[#4C5DF9]">MT</span>
          </div>

          {/* Driver details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <div className="font-semibold text-[19px] tracking-[-0.35px]">{driverName}</div>
              <div className="inline-flex items-center gap-1 bg-[#1f2530] text-[#F89B54] text-xs font-semibold px-2 py-px rounded-full">
                <Star size={12} className="fill-current" />
                {rating}
              </div>
            </div>
            <div className="text-[13.5px] text-[#9FA1B0] mt-px tracking-[-0.1px]">
              {vehicle} • {plate}
            </div>
          </div>

          {/* Phone / Call button */}
          <button
            onClick={handlePhone}
            className="w-11 h-11 rounded-2xl bg-[#002811] active:bg-[#00341a] flex items-center justify-center transition-all active:scale-[0.94] border border-[#0a3a24]"
            aria-label="Call driver"
          >
            <Phone size={19} className="text-[#6fcf97]" />
          </button>
        </div>

        {/* Trip summary line */}
        <div className="mt-4 flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-[#9FA1B0]">
            <Navigation size={15} className="text-[#4C5DF9]" />
            <span className="font-medium text-[#F8F4F4]">{tripFrom}</span>
            <span className="text-[#45484D]">→</span>
            <span className="font-medium text-[#F8F4F4]">{tripTo}</span>
          </div>
          <div className="text-xs text-[#73767A] tabular-nums">{tripDistance}</div>
        </div>
      </div>

      {/* LARGE PREMIUM FAKE MAP AREA */}
      <div className="relative mx-4 mt-4 flex-shrink-0">
        <div className="relative h-[298px] rounded-3xl overflow-hidden border border-white/10 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)] bg-[#0b111b]">
          {/* Dark map base with subtle texture (premium Figma-style) */}
          <div className="absolute inset-0 bg-[#0b111b]" />
          
          {/* Subtle map grid / terrain texture */}
          <div 
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: `
                linear-gradient(#1f2937 0.9px, transparent 1px),
                linear-gradient(90deg, #1f2937 0.9px, transparent 1px)
              `,
              backgroundSize: '26px 26px'
            }}
          />

          {/* SVG Road network — realistic layered roads (high-fidelity) */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Main arterial road (horizontal) */}
            <path 
              d="M0 42 Q28 38 46 43 Q72 49 100 46" 
              fill="none" stroke="#2a3444" strokeWidth="9" strokeLinecap="round" 
            />
            <path 
              d="M0 42 Q28 38 46 43 Q72 49 100 46" 
              fill="none" stroke="#38475a" strokeWidth="3.5" strokeLinecap="round" 
            />
            {/* Lane dashes */}
            <path 
              d="M6 41 Q30 37.5 48 42 Q74 48 96 45" 
              fill="none" stroke="#64748b" strokeWidth="0.9" strokeDasharray="2.8 3.6" strokeLinecap="round" 
            />

            {/* Cross street vertical */}
            <path 
              d="M61 0 Q59 31 64 48 Q66 78 59 100" 
              fill="none" stroke="#2a3444" strokeWidth="7.5" strokeLinecap="round" 
            />
            <path 
              d="M61 0 Q59 31 64 48 Q66 78 59 100" 
              fill="none" stroke="#38475a" strokeWidth="2.8" strokeLinecap="round" 
            />
            <path 
              d="M60 4 Q58.5 30 63 47 Q65 76 61 97" 
              fill="none" stroke="#64748b" strokeWidth="0.8" strokeDasharray="2.5 3.3" strokeLinecap="round" 
            />

            {/* Secondary diagonal connector */}
            <path 
              d="M14 72 Q35 58 58 61 Q81 64 94 52" 
              fill="none" stroke="#2a3444" strokeWidth="5.5" strokeLinecap="round" 
            />
            <path 
              d="M14 72 Q35 58 58 61 Q81 64 94 52" 
              fill="none" stroke="#38475a" strokeWidth="2" strokeLinecap="round" 
            />
          </svg>

          {/* Subtle building / block shapes for city feel (Figma polish) */}
          <div className="absolute left-[7%] top-[14%] w-[17%] h-[18%] bg-[#111a27] rounded-sm opacity-70" />
          <div className="absolute left-[28%] top-[8%] w-[12%] h-[22%] bg-[#111a27] rounded opacity-60" />
          <div className="absolute right-[11%] top-[22%] w-[15%] h-[13%] bg-[#111a27] rounded-sm opacity-75" />
          <div className="absolute left-[9%] bottom-[19%] w-[10%] h-[16%] bg-[#111a27] rounded opacity-65" />
          <div className="absolute right-[19%] bottom-[28%] w-[13%] h-[11%] bg-[#111a27] rounded-sm opacity-70" />

          {/* Destination marker (premium pin) */}
          <div className="absolute right-[14%] bottom-[18%] z-20">
            <div className="relative flex flex-col items-center">
              <div className="w-9 h-9 rounded-full bg-[#F89B54] flex items-center justify-center shadow-[0_0_0_6px_rgba(248,155,84,0.18)]">
                <MapPin size={19} className="text-[#161A21]" />
              </div>
              <div className="mt-1 px-2 py-0.5 rounded bg-[#1f2530]/95 text-[10px] font-medium tracking-tight border border-white/10">Downtown Hub</div>
            </div>
          </div>

          {/* Pulsing rider pickup pin (origin) */}
          <div className="absolute left-[22%] top-[47%] z-10">
            <motion.div
              animate={{ scale: [1, 1.18, 1] }}
              transition={{ duration: 2.1, repeat: Infinity, ease: 'easeInOut' }}
              className="w-4 h-4 rounded-full bg-[#4C5DF9] flex items-center justify-center shadow-[0_0_0_8px_rgba(76,93,249,0.22)]"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </motion.div>
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] font-medium text-[#9FA1B0] whitespace-nowrap">Pickup</div>
          </div>

          {/* MOVING CAR — framer-motion powered (subtle premium motion) */}
          <motion.div
            className="absolute z-30"
            style={{ 
              left: `${carPos.x}%`, 
              top: `${carPos.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            animate={{ 
              left: `${carPos.x}%`, 
              top: `${carPos.y}%`,
              rotate: phase === 'riding' ? [ -8, 6, -3 ] : 0 
            }}
            transition={{ 
              type: 'spring', 
              stiffness: 42, 
              damping: 26 
            }}
          >
            <div className="relative flex items-center justify-center">
              {/* Car body */}
              <div className="w-[42px] h-[21px] bg-[#4C5DF9] rounded-[6px] shadow-[0_3px_8px_-1px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.35)] flex items-center justify-center border border-[#6f7df9]">
                {/* Roof highlight + windows */}
                <div className="w-[23px] h-[9px] bg-[#2f3c9e] rounded-[3px] mt-[-1px] flex items-center justify-center">
                  <div className="w-[15px] h-[3.5px] bg-[#5a6cff] rounded-sm" />
                </div>
              </div>
              {/* Wheels */}
              <div className="absolute -left-[1px] top-[14px] w-[9px] h-[5px] bg-[#0f172a] rounded-full border border-[#1f2530]" />
              <div className="absolute -right-[1px] top-[14px] w-[9px] h-[5px] bg-[#0f172a] rounded-full border border-[#1f2530]" />
              {/* Headlight accent */}
              <div className="absolute -right-[2px] top-[7px] w-[4px] h-[4px] bg-[#F89B54] rounded-full opacity-90" />
            </div>
          </motion.div>

          {/* ETA BANNER — premium glass overlay (Figma standard) */}
          <div className="absolute top-4 left-4 right-4 z-40">
            <div className="card flex items-center justify-between px-4 py-[11px] bg-[#1a212e]/90 backdrop-blur-md border-white/10">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Clock size={16} className="text-[#F89B54]" />
                <span>{etaMinutes} min away</span>
              </div>
              <div className="text-[#F89B54] font-semibold tabular-nums tracking-tight">
                Arriving at {arrivalTime}
              </div>
            </div>
          </div>

          {/* Live route progress bar (subtle, premium) */}
          <div className="absolute bottom-4 left-4 right-4 z-40">
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-[#4C5DF9] rounded-full"
                initial={{ width: '18%' }}
                animate={{ width: `${routeProgress}%` }}
                transition={{ type: 'spring', stiffness: 60, damping: 26 }}
              />
            </div>
            <div className="flex justify-between mt-1 text-[9px] text-[#73767A] tracking-[0.5px]">
              <div>YOUR LOCATION</div>
              <div>{phase === 'riding' ? 'EN ROUTE' : phase.toUpperCase()}</div>
            </div>
          </div>

          {/* Subtle live indicator dot */}
          {isActive && (
            <div className="absolute top-4 right-4 z-40 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#161A21]/70 text-[10px] font-medium text-[#38C978] border border-white/10">
              <div className="w-1.5 h-1.5 rounded-full bg-[#38C978] animate-pulse" />
              LIVE
            </div>
          )}
        </div>
      </div>

      {/* STATUS TIMELINE + SIMULATION CONTROLS */}
      <div className="px-6 mt-5 flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          <div className="text-[15px] font-semibold tracking-[-0.2px]">Trip status</div>
          <div className="text-xs px-3 py-1 rounded-full bg-[#1f2530] text-[#9FA1B0] tabular-nums">
            {phase === 'riding' ? `${elapsedMin} min elapsed` : phase === 'completed' ? 'Completed' : 'Live tracking'}
          </div>
        </div>

        {/* Timeline */}
        <div className="card px-5 py-4 mb-4">
          <div className="flex items-center gap-0 relative">
            {timelineSteps.map((step, idx) => {
              const isActiveStep = idx <= currentStepIndex;
              return (
                <React.Fragment key={step.key}>
                  <div className="flex flex-col items-center flex-1 min-w-0 relative z-10">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all ${isActiveStep ? 'bg-[#4C5DF9] border-[#4C5DF9]' : 'bg-[#161A21] border-[#3a404c]'}`}>
                      {isActiveStep ? (
                        <CheckCircle size={13} className="text-white" />
                      ) : (
                        <div className="w-1.5 h-1.5 rounded-full bg-[#3a404c]" />
                      )}
                    </div>
                    <div className={`mt-2 text-center text-xs font-semibold tracking-[-0.15px] ${isActiveStep ? 'text-[#F8F4F4]' : 'text-[#73767A]'}`}>
                      {step.label}
                    </div>
                    <div className="text-[10px] text-[#45484D] mt-px">{step.sub}</div>
                  </div>

                  {/* Connecting line between steps */}
                  {idx < timelineSteps.length - 1 && (
                    <div className={`flex-1 h-[2px] -mx-1 mt-3 rounded transition-all ${isActiveStep ? 'bg-[#4C5DF9]' : 'bg-[#3a404c]'}`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Interactive simulation buttons (core demo feature) */}
        {phase !== 'completed' && (
          <div className="grid grid-cols-2 gap-3 mb-2">
            {phase === 'enroute' && (
              <button 
                onClick={simulateDriverArriving}
                className="col-span-2 py-[13px] rounded-2xl bg-[#1f2530] active:bg-[#252c38] text-sm font-semibold transition border border-white/10"
              >
                Simulate driver arrived
              </button>
            )}

            {(phase === 'enroute' || phase === 'arriving') && (
              <button 
                onClick={simulateDriverArrived}
                className="py-[13px] rounded-2xl bg-[#1f2530] active:bg-[#252c38] text-sm font-semibold transition border border-white/10"
              >
                Simulate driver at pickup
              </button>
            )}

            {(phase === 'arriving' || phase === 'arrived') && (
              <button 
                onClick={startRide}
                className="py-[13px] rounded-2xl bg-[#4C5DF9] active:bg-[#5a6cff] text-white text-sm font-bold tracking-[-0.2px] transition shadow-[0_2px_8px_-1px_rgba(76,93,249,0.45)]"
              >
                Start ride
              </button>
            )}

            {phase === 'riding' && (
              <button 
                onClick={endRide}
                className="col-span-2 py-[13px] rounded-2xl bg-[#38C978] active:bg-[#2ea864] text-[#161A21] text-sm font-bold transition"
              >
                End ride &amp; complete
              </button>
            )}
          </div>
        )}

        {phase === 'completed' && (
          <div className="py-3 px-4 rounded-2xl bg-[#1f2530] text-center text-sm text-[#38C978] font-medium">
            Ride finished successfully • Thank you!
          </div>
        )}
      </div>

      {/* BOTTOM ACTION BAR — Chat / Call / Cancel (exact Figma style) */}
      <div className="mt-auto px-6 pb-6 pt-5 border-t border-white/10 bg-[#161A21] flex-shrink-0">
        <div className="flex items-center gap-3">
          {/* Chat */}
          <button 
            onClick={handleChat}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-[#1f2530] active:bg-[#252c38] text-sm font-semibold border border-white/10 transition"
          >
            <MessageCircle size={17} className="text-[#4C5DF9]" /> Chat
          </button>

          {/* Call (redundant but explicit) */}
          <button 
            onClick={handlePhone}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-[#1f2530] active:bg-[#252c38] text-sm font-semibold border border-white/10 transition"
          >
            <Phone size={17} className="text-[#6fcf97]" /> Call
          </button>

          {/* Cancel (danger) */}
          <button 
            onClick={handleCancelRide}
            disabled={phase === 'riding' || phase === 'completed'}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-[#2a1f1f] active:bg-[#3a2828] text-sm font-semibold text-[#FF5050] border border-[#3f2828] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X size={17} /> Cancel
          </button>
        </div>

        <div className="text-center mt-3 text-[10px] text-[#45484D]">
          {phase === 'riding' ? 'Cancellation unavailable during active ride' : 'Free cancellation until driver arrives'}
        </div>
      </div>

      {/* CANCEL CONFIRM MODAL (simple, elegant, state-driven — no external deps beyond sonner) */}
      <AnimatePresence>
        {showCancelConfirm && (
          <div 
            className="absolute inset-0 z-[70] flex items-center justify-center bg-black/70 p-6"
            onClick={() => setShowCancelConfirm(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.12, ease: [0.2, 0, 0, 1] }}
              className="card w-full max-w-[320px] p-6 text-center"
              onClick={e => e.stopPropagation()}
            >
              <div className="mx-auto mb-4 w-12 h-12 rounded-2xl bg-[#2a1f1f] flex items-center justify-center">
                <AlertTriangle size={24} className="text-[#FF6B3B]" />
              </div>
              <div className="font-semibold text-[18px] tracking-[-0.3px]">Cancel this ride?</div>
              <div className="text-sm text-[#9FA1B0] mt-1.5 leading-snug">
                A small cancellation fee may apply if the driver is close.
              </div>

              <div className="flex gap-3 mt-6">
                <button 
                  onClick={() => setShowCancelConfirm(false)}
                  className="flex-1 py-3.5 text-sm font-semibold rounded-2xl border border-white/10 active:bg-[#252c38] transition"
                >
                  Keep ride
                </button>
                <button 
                  onClick={confirmCancel}
                  className="flex-1 py-3.5 text-sm font-semibold rounded-2xl bg-[#FF5050] text-white active:bg-[#e64545] transition"
                >
                  Yes, cancel ride
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
