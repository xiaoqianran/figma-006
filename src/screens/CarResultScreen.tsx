import React from 'react';
import { Users, Star } from 'lucide-react';

interface CarResultScreenProps {
  onBookRide?: (rideId: number) => void;
}

export function CarResultScreen({ onBookRide }: CarResultScreenProps) {
  const [selectedRide, setSelectedRide] = React.useState<number>(1);

  const rides = [
    { id: 1, type: 'Economy', eta: '4 min', vehicle: 'Tesla Model 3', plate: 'ABC-124', price: 12.40, seats: 3, rating: 4.9, driver: 'Michael T.' },
    { id: 2, type: 'Comfort', eta: '7 min', vehicle: 'BMW 3 Series', plate: 'XYZ-887', price: 18.90, seats: 4, rating: 4.8, driver: 'Sarah K.' },
    { id: 3, type: 'Premium', eta: '11 min', vehicle: 'Mercedes E-Class', plate: 'LUX-501', price: 27.50, seats: 4, rating: 5.0, driver: 'David L.' },
  ];

  const selected = rides.find(r => r.id === selectedRide)!;

  return (
    <div className="h-full w-full bg-[#161A21] text-[#F8F4F4] flex flex-col">
      {/* Trip summary header (inside content, frame provides top bar for secondary screens) */}
      <div className="px-6 pt-5 pb-3 border-b border-white/10">
        <div className="flex items-center justify-between text-sm">
          <div>
            <div className="text-[#9FA1B0] text-xs tracking-widest">YOUR TRIP</div>
            <div className="font-semibold mt-0.5">Sunset Blvd → Downtown Hub</div>
          </div>
          <div className="text-right text-xs text-[#73767A]">
            <div>~18 min</div>
            <div className="text-[#F89B54]">3.2 mi</div>
          </div>
        </div>
      </div>

      <div className="px-6 pt-4">
        <div className="text-[15px] font-semibold mb-3">Available rides</div>
      </div>

      {/* Ride options */}
      <div className="px-6 space-y-3 flex-1 overflow-auto pb-4">
        {rides.map((ride) => {
          const isSel = ride.id === selectedRide;
          return (
            <button
              key={ride.id}
              onClick={() => setSelectedRide(ride.id)}
              className={`card w-full text-left transition-all flex gap-4 ${isSel ? 'ring-1 ring-[#4C5DF9] bg-[#1f2530]' : 'active:bg-[#252c38]'}`}
            >
              <div className="w-[68px] h-[68px] rounded-xl bg-[#222833] flex-shrink-0 flex items-center justify-center">
                <div className="text-2xl">🚕</div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between">
                  <div className="font-semibold">{ride.type} • {ride.eta} away</div>
                  <div className="text-[#F89B54] font-semibold tabular-nums">${ride.price.toFixed(2)}</div>
                </div>
                <div className="text-xs text-[#9FA1B0] mt-0.5">{ride.vehicle} • {ride.plate}</div>
                <div className="mt-2 flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1 text-[#73767A]">
                    <Users size={13} /> {ride.seats} seats
                  </div>
                  <div className="flex items-center gap-1 text-[#73767A]">
                    <Star size={13} className="text-[#F89B54]" /> {ride.rating}
                  </div>
                  <div className="text-[#73767A] truncate">• {ride.driver}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Bottom CTA (scrolls with content; secondary screens sit under frame title bar) */}
      <div className="px-6 pb-6 pt-2 border-t border-white/10 bg-[#161A21]">
        <button 
          onClick={() => onBookRide?.(selected.id)}
          className="btn-primary"
        >
          Book {selected.type} • ${selected.price.toFixed(2)}
        </button>
        <div className="text-center mt-3 text-[11px] text-[#73767A]">Free cancellation up to 2 min before pickup</div>
      </div>
    </div>
  );
}
