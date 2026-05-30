import { useState } from 'react';
import { ArrowLeft, Star, MapPin, Clock, Download, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

interface Ride {
  id: number;
  date: string;
  time: string;
  pickup: string;
  dropoff: string;
  fullPickup: string;
  fullDropoff: string;
  price: number;
  driver: string;
  rating: number;
  status: 'Completed' | 'Cancelled';
  vehicle: string;
  duration: string;
  distance: string;
  tip?: number;
  baseFare?: number;
  distanceFare?: number;
  timeFare?: number;
}

interface TripHistoryScreenProps {
  onBack?: () => void;
  onBookAgain?: (ride: Ride) => void;
  onViewDetails?: (ride: Ride) => void;
}

export function TripHistoryScreen({ onBack, onBookAgain, onViewDetails }: TripHistoryScreenProps) {
  const [filter, setFilter] = useState<'all' | 'completed' | 'cancelled'>('all');
  const [selectedRide, setSelectedRide] = useState<Ride | null>(null);

  const rides: Ride[] = [
    {
      id: 1,
      date: 'May 29, 2026',
      time: '7:15 PM',
      pickup: 'Home',
      dropoff: 'Downtown Hub',
      fullPickup: '42 Sunset Blvd, Apt 3B',
      fullDropoff: '1800 Commerce St, Downtown',
      price: 12.40,
      driver: 'Michael Torres',
      rating: 5,
      status: 'Completed',
      vehicle: 'Tesla Model 3 • ABC-124',
      duration: '14 min',
      distance: '3.8 mi',
      tip: 2,
      baseFare: 6.90,
      distanceFare: 3.70,
      timeFare: 1.80,
    },
    {
      id: 2,
      date: 'May 27, 2026',
      time: '9:50 AM',
      pickup: 'Office',
      dropoff: 'Airport Terminal',
      fullPickup: 'Tech Park, 550 Innovation Dr',
      fullDropoff: 'Terminal 2 - International',
      price: 28.90,
      driver: 'Sarah Patel',
      rating: 5,
      status: 'Completed',
      vehicle: 'BMW 3 Series • XYZ-887',
      duration: '26 min',
      distance: '11.4 mi',
      tip: 4,
      baseFare: 15.20,
      distanceFare: 9.50,
      timeFare: 4.20,
    },
    {
      id: 3,
      date: 'May 25, 2026',
      time: '6:40 PM',
      pickup: 'Coffee Shop',
      dropoff: 'Home',
      fullPickup: 'Blue Bottle, 88 Pine Ave',
      fullDropoff: '42 Sunset Blvd, Apt 3B',
      price: 9.75,
      driver: 'David Lin',
      rating: 4,
      status: 'Completed',
      vehicle: 'Honda Civic • JKL-309',
      duration: '11 min',
      distance: '2.9 mi',
      tip: 0,
      baseFare: 5.50,
      distanceFare: 2.75,
      timeFare: 1.50,
    },
    {
      id: 4,
      date: 'May 23, 2026',
      time: '11:05 PM',
      pickup: 'Downtown',
      dropoff: 'Home',
      fullPickup: 'The Grand Hotel, 210 Main St',
      fullDropoff: '42 Sunset Blvd, Apt 3B',
      price: 15.20,
      driver: 'Priya Nair',
      rating: 5,
      status: 'Completed',
      vehicle: 'Tesla Model Y • EV-772',
      duration: '19 min',
      distance: '5.1 mi',
      tip: 3,
      baseFare: 8.10,
      distanceFare: 4.30,
      timeFare: 2.80,
    },
    {
      id: 5,
      date: 'May 20, 2026',
      time: '4:30 PM',
      pickup: 'Home',
      dropoff: 'Stadium',
      fullPickup: '42 Sunset Blvd, Apt 3B',
      fullDropoff: 'City Stadium, Gate C',
      price: 22.00,
      driver: 'James Rivera',
      rating: 4,
      status: 'Cancelled',
      vehicle: 'Toyota Camry • QWE-551',
      duration: '22 min',
      distance: '7.6 mi',
      baseFare: 11.40,
      distanceFare: 6.80,
      timeFare: 3.80,
    },
    {
      id: 6,
      date: 'May 18, 2026',
      time: '2:15 PM',
      pickup: 'Gym',
      dropoff: 'Home',
      fullPickup: 'Metro Fitness, 15 Oak Lane',
      fullDropoff: '42 Sunset Blvd, Apt 3B',
      price: 7.80,
      driver: 'Elena Voss',
      rating: 5,
      status: 'Cancelled',
      vehicle: 'Hyundai Ioniq • ION-112',
      duration: '9 min',
      distance: '2.1 mi',
      tip: 0,
      baseFare: 4.40,
      distanceFare: 2.10,
      timeFare: 1.30,
    },
  ];

  const filteredRides = rides.filter((r) => {
    if (filter === 'all') return true;
    return r.status.toLowerCase() === filter;
  });

  const handleSelectRide = (ride: Ride) => {
    setSelectedRide(ride);
    onViewDetails?.(ride);
  };

  const closeDetail = () => setSelectedRide(null);

  const handleBookAgain = (ride: Ride) => {
    onBookAgain?.(ride);
    toast.success(`Starting new booking with ${ride.driver.split(' ')[0]}`);
    closeDetail();
  };

  const handleRateAgain = (ride: Ride) => {
    toast.success(`Thanks for re-rating ${ride.driver.split(' ')[0]}! Your feedback matters.`);
    closeDetail();
  };

  const handleDownloadReceipt = (ride: Ride) => {
    toast.info(`Receipt for ${ride.date} saved (demo)`);
  };

  // ==================== DETAIL / RECEIPT VIEW ====================
  if (selectedRide) {
    const r = selectedRide;
    const base = r.baseFare ?? (r.price * 0.52);
    const distF = r.distanceFare ?? (r.price * 0.28);
    const timeF = r.timeFare ?? (r.price * 0.12);
    const tip = r.tip ?? 0;

    return (
      <div className="h-full w-full bg-[#161A21] text-[#F8F4F4] flex flex-col">
        {/* Detail header */}
        <div className="px-6 pt-4 pb-2 flex items-center border-b border-white/10">
          <button
            onClick={closeDetail}
            className="btn-ghost -ml-1 w-10 h-10 flex items-center justify-center"
            aria-label="Back to list"
          >
            <ArrowLeft size={22} />
          </button>
          <div className="flex-1 text-center text-[18px] font-semibold tracking-[-0.2px] pr-10">
            Ride Receipt
          </div>
        </div>

        <div className="flex-1 overflow-auto px-6 pt-5 pb-6 space-y-5">
          {/* Meta header */}
          <div>
            <div className="flex items-start justify-between">
              <div className="min-w-0">
                <div className="text-xs text-[#73767A] tabular-nums tracking-wide">{r.date} • {r.time}</div>
                <div className="text-[19px] font-semibold mt-1.5 tracking-[-0.4px] leading-tight">
                  {r.pickup} → {r.dropoff}
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-semibold self-start mt-1 flex-shrink-0 ${r.status === 'Completed' ? 'bg-[#38C978]/15 text-[#38C978]' : 'bg-[#FF6B3B]/15 text-[#FF6B3B]'}`}>
                {r.status}
              </div>
            </div>
            <div className="flex items-center gap-4 mt-1.5 text-xs text-[#73767A]">
              <div className="flex items-center gap-1"><Clock size={13} /> {r.duration}</div>
              <div>{r.distance}</div>
            </div>
          </div>

          {/* Route addresses */}
          <div className="card space-y-4 py-4">
            <div className="flex gap-3.5">
              <div className="mt-0.5"><MapPin size={17} className="text-[#4C5DF9]" /></div>
              <div className="flex-1 text-[13.5px]">
                <div className="text-[10px] font-medium tracking-[0.5px] text-[#73767A] mb-px">PICKUP</div>
                <div className="font-medium leading-snug">{r.fullPickup}</div>
              </div>
            </div>
            <div className="h-px bg-white/5 mx-8" />
            <div className="flex gap-3.5">
              <div className="mt-0.5"><MapPin size={17} className="text-[#F89B54]" /></div>
              <div className="flex-1 text-[13.5px]">
                <div className="text-[10px] font-medium tracking-[0.5px] text-[#73767A] mb-px">DROPOFF</div>
                <div className="font-medium leading-snug">{r.fullDropoff}</div>
              </div>
            </div>
          </div>

          {/* Driver + rating */}
          <div className="card flex items-center gap-4 py-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#4C5DF9] to-[#F89B54] flex items-center justify-center text-white font-bold text-lg flex-shrink-0 ring-1 ring-white/10">
              {r.driver.split(' ').map((w) => w[0]).join('').slice(0, 2)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-[15px]">{r.driver}</div>
              <div className="text-sm text-[#9FA1B0] truncate mt-px">{r.vehicle}</div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="flex items-center gap-0.5 justify-end">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={15}
                    className={i < r.rating ? 'fill-[#F89B54] text-[#F89B54]' : 'text-[#45484D]'}
                  />
                ))}
              </div>
              <div className="text-[10px] text-[#73767A] mt-0.5">Your rating</div>
            </div>
          </div>

          {/* Fare receipt breakdown */}
          <div className="card py-4">
            <div className="text-[11px] uppercase tracking-[1.5px] text-[#73767A] mb-4 pl-0.5">FARE BREAKDOWN</div>

            <div className="space-y-[9px] text-[14px]">
              <div className="flex justify-between items-baseline">
                <span className="text-[#9FA1B0]">Base fare</span>
                <span className="tabular-nums font-medium">${base.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-[#9FA1B0]">Distance • {r.distance}</span>
                <span className="tabular-nums font-medium">${distF.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-[#9FA1B0]">Time • {r.duration}</span>
                <span className="tabular-nums font-medium">${timeF.toFixed(2)}</span>
              </div>
              {tip > 0 && (
                <div className="flex justify-between items-baseline">
                  <span className="text-[#9FA1B0]">Driver tip</span>
                  <span className="tabular-nums font-medium">${tip.toFixed(2)}</span>
                </div>
              )}
            </div>

            <div className="my-4 h-px bg-white/10" />

            <div className="flex justify-between items-baseline text-[15px]">
              <span className="font-semibold">Total paid</span>
              <span className="font-semibold text-[#F89B54] tabular-nums">${r.price.toFixed(2)}</span>
            </div>

            <div className="mt-3.5 pt-3 border-t border-white/10 text-xs text-[#73767A] flex items-center gap-2">
              Paid via Visa •••• 4242
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-1 pb-2 space-y-3">
            <button
              onClick={() => handleBookAgain(r)}
              className="btn-primary flex items-center justify-center gap-2 text-[15px]"
            >
              <RefreshCw size={17} /> Book again with {r.driver.split(' ')[0]}
            </button>

            {r.status === 'Completed' && (
              <button
                onClick={() => handleRateAgain(r)}
                className="w-full flex items-center justify-center gap-2 py-[15px] rounded-2xl border border-white/15 font-medium text-sm active:bg-[#252c38] transition"
              >
                <Star size={16} className="text-[#F89B54]" /> Rate again
              </button>
            )}

            <button
              onClick={() => handleDownloadReceipt(r)}
              className="w-full flex items-center justify-center gap-2 py-3 text-sm text-[#9FA1B0] active:text-[#F8F4F4] transition"
            >
              <Download size={15} /> Download receipt PDF
            </button>
          </div>
        </div>

        <div className="h-4 flex-shrink-0" />
      </div>
    );
  }

  // ==================== LIST VIEW ====================
  return (
    <div className="h-full w-full bg-[#161A21] text-[#F8F4F4] flex flex-col">
      {/* Header */}
      <div className="px-6 pt-4 pb-2 flex items-center">
        <button
          onClick={onBack}
          className="btn-ghost -ml-1 w-10 h-10 flex items-center justify-center"
          aria-label="Back"
        >
          <ArrowLeft size={22} />
        </button>
        <div className="flex-1 text-center text-[18px] font-semibold tracking-[-0.2px] pr-10">
          Trip History
        </div>
      </div>

      {/* Summary */}
      <div className="px-6 pt-0.5 pb-3">
        <div className="text-[13px] text-[#9FA1B0]">Past rides • {rides.length} total</div>
      </div>

      {/* Segmented filter tabs */}
      <div className="px-6">
        <div className="flex bg-[#1f2530] rounded-2xl p-1 text-sm">
          {([
            { key: 'all' as const, label: 'All' },
            { key: 'completed' as const, label: 'Completed' },
            { key: 'cancelled' as const, label: 'Cancelled' },
          ]).map((tab) => {
            const isActive = filter === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`flex-1 py-[9px] rounded-[14px] font-medium transition-all active:opacity-90 ${
                  isActive
                    ? 'bg-[#4C5DF9] text-white shadow-sm'
                    : 'text-[#9FA1B0] active:bg-[#252c38]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Rides list or empty state */}
      <div className="flex-1 overflow-auto px-6 pt-5 pb-6">
        {filteredRides.length === 0 ? (
          /* Nice empty state */
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-[#1f2530] flex items-center justify-center mb-4">
              <Clock size={32} className="text-[#73767A]" />
            </div>
            <div className="font-semibold text-[17px]">No trips found</div>
            <div className="text-[#9FA1B0] text-sm mt-1.5 max-w-[230px]">
              No rides match the selected filter. Book a trip to see it here.
            </div>
            <button
              onClick={() => setFilter('all')}
              className="mt-6 px-5 py-2 text-sm font-medium text-[#4C5DF9] active:opacity-70 transition"
            >
              Show all trips
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredRides.map((ride) => (
              <button
                key={ride.id}
                onClick={() => handleSelectRide(ride)}
                className="card w-full text-left active:bg-[#252c38] transition flex flex-col gap-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] text-[#73767A] tabular-nums tracking-wide">
                      {ride.date} • {ride.time}
                    </div>
                    <div className="font-semibold text-[15px] leading-tight mt-1.5 tracking-[-0.2px]">
                      {ride.pickup} → {ride.dropoff}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="font-semibold text-[#F89B54] tabular-nums text-[15px]">
                      ${ride.price.toFixed(2)}
                    </div>
                    <div
                      className={`mt-1 inline-block text-[10px] font-semibold px-2 py-px rounded-full ${
                        ride.status === 'Completed'
                          ? 'bg-[#38C978]/20 text-[#38C978]'
                          : 'bg-[#FF6B3B]/20 text-[#FF6B3B]'
                      }`}
                    >
                      {ride.status}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/5 text-sm">
                  <div className="text-[#9FA1B0] truncate pr-4">{ride.driver}</div>
                  <div className="flex items-center gap-px flex-shrink-0">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={13}
                        className={i < ride.rating ? 'fill-[#F89B54] text-[#F89B54]' : 'text-[#45484D]'}
                      />
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Footer hint */}
      <div className="px-6 py-3.5 text-center text-[11px] text-[#73767A] border-t border-white/10 flex-shrink-0">
        Tap any ride for receipt, rating &amp; rebooking options
      </div>
    </div>
  );
}
