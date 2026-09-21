import React, { useState } from 'react';
import { 
  Calendar, 
  Users, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  MapPin, 
  Info, 
  Search, 
  ChevronRight, 
  CalendarPlus, 
  X,
  Phone,
  Mail,
  User
} from 'lucide-react';
import { SEATING_OPTIONS, TIME_SLOTS, RESTAURANT_INFO } from '../data/restaurantData';
import { SeatingArea, DiningOccasion, Reservation } from '../types';

interface ReservationSectionProps {
  onReservationComplete?: (res: Reservation) => void;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({
  onReservationComplete,
}) => {
  const [activeTab, setActiveTab] = useState<'book' | 'lookup'>('book');

  // Form State
  const [guests, setGuests] = useState<number>(2);
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [selectedTime, setSelectedTime] = useState<string>('7:00 PM');
  const [mealPeriod, setMealPeriod] = useState<'dinner' | 'lunch'>('dinner');
  const [seatingArea, setSeatingArea] = useState<SeatingArea>('main-dining');
  const [occasion, setOccasion] = useState<DiningOccasion>('casual');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  // Confirmation state
  const [activeBooking, setActiveBooking] = useState<Reservation | null>(null);

  // Lookup state
  const [lookupQuery, setLookupQuery] = useState('');
  const [lookupResult, setLookupResult] = useState<Reservation | null | 'not-found'>(null);
  const [savedReservations, setSavedReservations] = useState<Reservation[]>(() => {
    // Demo pre-seeded reservation
    return [
      {
        id: 'res-demo',
        confirmationCode: 'AK-9842',
        guestName: 'Eleanor Vance',
        email: 'eleanor.vance@example.com',
        phone: '(415) 555-4321',
        date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
        time: '7:30 PM',
        guests: 2,
        seatingArea: 'hearth-counter',
        occasion: 'anniversary',
        specialRequests: 'Anniversary celebration, would love hearth seats.',
        createdAt: new Date().toISOString(),
        status: 'confirmed'
      }
    ];
  });

  // Generate next 14 dates
  const availableDates = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const dateStr = d.toISOString().split('T')[0];
    const dayName = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short' });
    const monthDay = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return { dateStr, dayName, monthDay };
  });

  const availableSlots = TIME_SLOTS.filter(s => s.period === mealPeriod);

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !guestEmail.trim() || !guestPhone.trim()) {
      return;
    }

    const code = `AK-${Math.floor(1000 + Math.random() * 9000)}`;
    const newReservation: Reservation = {
      id: `res-${Date.now()}`,
      confirmationCode: code,
      guestName,
      email: guestEmail,
      phone: guestPhone,
      date: selectedDate,
      time: selectedTime,
      guests,
      seatingArea,
      occasion,
      specialRequests: specialRequests.trim() || undefined,
      createdAt: new Date().toISOString(),
      status: 'confirmed'
    };

    setSavedReservations(prev => [newReservation, ...prev]);
    setActiveBooking(newReservation);
    if (onReservationComplete) {
      onReservationComplete(newReservation);
    }
  };

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    const query = lookupQuery.trim().toLowerCase();
    if (!query) return;

    const found = savedReservations.find(
      r => r.confirmationCode.toLowerCase() === query || 
           r.phone.toLowerCase().includes(query) ||
           r.email.toLowerCase() === query
    );

    if (found) {
      setLookupResult(found);
    } else {
      setLookupResult('not-found');
    }
  };

  const handleCancelBooking = (code: string) => {
    setSavedReservations(prev => 
      prev.map(r => r.confirmationCode === code ? { ...r, status: 'cancelled' } : r)
    );
    if (activeBooking && activeBooking.confirmationCode === code) {
      setActiveBooking({ ...activeBooking, status: 'cancelled' });
    }
    if (lookupResult && typeof lookupResult === 'object' && lookupResult.confirmationCode === code) {
      setLookupResult({ ...lookupResult, status: 'cancelled' });
    }
  };

  return (
    <section id="reservations" className="py-24 bg-stone-900 text-stone-100 scroll-mt-20 relative overflow-hidden">
      {/* Background Accent Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-stone-800/40 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2">
            <Calendar className="w-4 h-4" />
            <span>Table Reservations</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Join Us at the Hearth
          </h2>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed font-light">
            We release reservations 30 days in advance. Bar seating and outdoor patio are also welcoming walk-in guests daily.
          </p>

          {/* Navigation Toggle */}
          <div className="inline-flex p-1 bg-stone-950 border border-stone-800 rounded-full mt-6">
            <button
              id="tab-book-table-btn"
              onClick={() => {
                setActiveTab('book');
                setActiveBooking(null);
              }}
              className={`px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'book'
                  ? 'bg-amber-500 text-stone-950 shadow-sm'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              Book a New Table
            </button>
            <button
              id="tab-lookup-reservation-btn"
              onClick={() => setActiveTab('lookup')}
              className={`px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'lookup'
                  ? 'bg-amber-500 text-stone-950 shadow-sm'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              Find Existing Reservation
            </button>
          </div>
        </div>

        {/* TAB 1: Booking Wizard or Confirmation */}
        {activeTab === 'book' && (
          <div>
            {activeBooking ? (
              /* Confirmation Voucher */
              <div className="bg-stone-950 rounded-3xl border border-amber-500/40 p-6 sm:p-10 shadow-2xl max-w-2xl mx-auto animate-in zoom-in-95 duration-300">
                <div className="text-center mb-8">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
                    Reservation Confirmed
                  </span>
                  <h3 className="font-serif text-3xl font-bold text-white mt-1">
                    We look forward to hosting you
                  </h3>
                  <p className="text-stone-400 text-xs mt-1">
                    A confirmation email & SMS has been sent to {activeBooking.email}
                  </p>
                </div>

                {/* Voucher Ticket Details */}
                <div className="bg-stone-900 rounded-2xl border border-stone-800 p-6 mb-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-stone-800 pb-4">
                    <div>
                      <span className="text-[11px] text-stone-400 uppercase tracking-wider block">
                        Confirmation Code
                      </span>
                      <span className="font-mono text-xl font-bold text-amber-300">
                        {activeBooking.confirmationCode}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] text-stone-400 uppercase tracking-wider block">
                        Guest
                      </span>
                      <span className="font-semibold text-white text-sm">
                        {activeBooking.guestName} ({activeBooking.guests} {activeBooking.guests === 1 ? 'Guest' : 'Guests'})
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-1">
                    <div>
                      <span className="text-[11px] text-stone-400 uppercase tracking-wider block">
                        Date & Time
                      </span>
                      <span className="text-stone-200 text-xs sm:text-sm font-semibold">
                        {activeBooking.date} • {activeBooking.time}
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] text-stone-400 uppercase tracking-wider block">
                        Seating Zone
                      </span>
                      <span className="text-stone-200 text-xs sm:text-sm font-semibold capitalize">
                        {activeBooking.seatingArea.replace('-', ' ')}
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] text-stone-400 uppercase tracking-wider block">
                        Occasion
                      </span>
                      <span className="text-stone-200 text-xs sm:text-sm font-semibold capitalize">
                        {activeBooking.occasion}
                      </span>
                    </div>
                  </div>

                  {activeBooking.specialRequests && (
                    <div className="pt-2 border-t border-stone-800/80">
                      <span className="text-[11px] text-stone-400 uppercase tracking-wider block">
                        Special Notes
                      </span>
                      <p className="text-xs text-stone-300 italic">
                        "{activeBooking.specialRequests}"
                      </p>
                    </div>
                  )}
                </div>

                {/* Important Notes */}
                <div className="bg-amber-950/20 border border-amber-500/20 rounded-xl p-4 text-xs text-amber-200/90 mb-6 flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-amber-300">Arrival Note: </span>
                    <span>Tables are held for 15 minutes past reservation time. If running late, please call us directly at {RESTAURANT_INFO.phone}.</span>
                  </div>
                </div>

                {/* Voucher Actions */}
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <button
                    id="book-another-reservation-btn"
                    onClick={() => {
                      setActiveBooking(null);
                      setGuestName('');
                      setSpecialRequests('');
                    }}
                    className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-medium text-xs sm:text-sm transition-colors"
                  >
                    Make Another Reservation
                  </button>
                  <button
                    id="cancel-active-booking-btn"
                    onClick={() => handleCancelBooking(activeBooking.confirmationCode)}
                    className="w-full sm:w-auto py-3 px-4 rounded-xl text-rose-400 hover:bg-rose-950/40 text-xs sm:text-sm font-medium transition-colors border border-rose-900/40"
                  >
                    Cancel Booking
                  </button>
                </div>
              </div>
            ) : (
              /* Booking Form */
              <form onSubmit={handleSubmitBooking} className="bg-stone-950 rounded-3xl border border-stone-800 p-6 sm:p-10 shadow-2xl space-y-8">
                {/* 1. Guests Party Size */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-400 mb-3 flex items-center gap-2">
                    <Users className="w-4 h-4 text-amber-400" />
                    <span>Number of Guests</span>
                  </label>
                  <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10].map((num) => (
                      <button
                        key={num}
                        type="button"
                        id={`party-size-btn-${num}`}
                        onClick={() => setGuests(num)}
                        className={`w-12 h-12 rounded-xl text-sm font-bold shrink-0 transition-all flex items-center justify-center ${
                          guests === num
                            ? 'bg-amber-500 text-stone-950 shadow-md scale-105'
                            : 'bg-stone-900 border border-stone-800 text-stone-300 hover:border-stone-700'
                        }`}
                      >
                        {num === 10 ? '10+' : num}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Date Selection */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-400 mb-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-400" />
                    <span>Select Date</span>
                  </label>
                  <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
                    {availableDates.map((item) => {
                      const isSelected = selectedDate === item.dateStr;
                      return (
                        <button
                          key={item.dateStr}
                          type="button"
                          id={`date-select-${item.dateStr}`}
                          onClick={() => setSelectedDate(item.dateStr)}
                          className={`px-4 py-3 rounded-2xl text-center shrink-0 min-w-[85px] transition-all border ${
                            isSelected
                              ? 'bg-amber-500 border-amber-400 text-stone-950 shadow-md font-bold'
                              : 'bg-stone-900 border-stone-800 text-stone-300 hover:border-stone-700'
                          }`}
                        >
                          <span className="block text-[11px] uppercase tracking-wider opacity-80">
                            {item.dayName}
                          </span>
                          <span className="block text-sm font-semibold mt-0.5">
                            {item.monthDay}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Meal Period & Time Slots */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-400 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-400" />
                      <span>Available Seating Times</span>
                    </label>
                    <div className="flex items-center gap-1 bg-stone-900 p-1 rounded-lg border border-stone-800">
                      <button
                        type="button"
                        id="period-dinner-btn"
                        onClick={() => setMealPeriod('dinner')}
                        className={`px-3 py-1 text-xs rounded-md font-medium transition-colors ${
                          mealPeriod === 'dinner' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-400 hover:text-white'
                        }`}
                      >
                        Dinner
                      </button>
                      <button
                        type="button"
                        id="period-lunch-btn"
                        onClick={() => setMealPeriod('lunch')}
                        className={`px-3 py-1 text-xs rounded-md font-medium transition-colors ${
                          mealPeriod === 'lunch' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-400 hover:text-white'
                        }`}
                      >
                        Lunch
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-2">
                    {availableSlots.map((slot) => {
                      const isSelected = selectedTime === slot.time;
                      return (
                        <button
                          key={slot.time}
                          type="button"
                          id={`time-slot-${slot.time.replace(/[: ]/g, '-')}`}
                          onClick={() => setSelectedTime(slot.time)}
                          className={`py-2.5 px-2 rounded-xl text-xs font-semibold transition-all text-center border relative ${
                            isSelected
                              ? 'bg-amber-500 border-amber-400 text-stone-950 shadow-md font-bold'
                              : 'bg-stone-900 border-stone-800 text-stone-200 hover:border-stone-700'
                          }`}
                        >
                          {slot.time}
                          {slot.popular && (
                            <span className="block text-[9px] text-amber-400 font-normal">
                              Prime
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Seating Area Preference */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-400 mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Seating Experience</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {SEATING_OPTIONS.map((area) => {
                      const isSelected = seatingArea === area.id;
                      return (
                        <div
                          key={area.id}
                          id={`seating-choice-${area.id}`}
                          onClick={() => setSeatingArea(area.id)}
                          className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-stone-900 border-amber-500 ring-1 ring-amber-500/50'
                              : 'bg-stone-900/60 border-stone-800 hover:border-stone-700'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-serif font-bold text-base text-white">
                              {area.name}
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-800 text-amber-400 font-medium">
                              {area.tag}
                            </span>
                          </div>
                          <p className="text-xs text-stone-400 font-light leading-relaxed">
                            {area.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 5. Occasion & Guest Details */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div>
                    <label htmlFor="guest-name-input" className="block text-xs font-medium text-stone-300 mb-1.5 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-amber-400" />
                      <span>Full Name *</span>
                    </label>
                    <input
                      id="guest-name-input"
                      type="text"
                      required
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="e.g. Julian Hayes"
                      className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-stone-100 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="guest-email-input" className="block text-xs font-medium text-stone-300 mb-1.5 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-amber-400" />
                      <span>Email Address *</span>
                    </label>
                    <input
                      id="guest-email-input"
                      type="email"
                      required
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      placeholder="julian@example.com"
                      className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-stone-100 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="guest-phone-input" className="block text-xs font-medium text-stone-300 mb-1.5 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-amber-400" />
                      <span>Mobile Phone *</span>
                    </label>
                    <input
                      id="guest-phone-input"
                      type="tel"
                      required
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      placeholder="(415) 555-0199"
                      className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-stone-100 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="dining-occasion-select" className="block text-xs font-medium text-stone-300 mb-1.5">
                      Dining Occasion
                    </label>
                    <select
                      id="dining-occasion-select"
                      value={occasion}
                      onChange={(e) => setOccasion(e.target.value as DiningOccasion)}
                      className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-stone-100 text-sm focus:outline-none focus:border-amber-500"
                    >
                      <option value="casual">Casual Dining</option>
                      <option value="date-night">Romantic Date Night</option>
                      <option value="birthday">Birthday Celebration</option>
                      <option value="anniversary">Anniversary</option>
                      <option value="business">Business Dinner</option>
                      <option value="celebration">Special Celebration</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="special-requests-input" className="block text-xs font-medium text-stone-300 mb-1.5">
                      Dietary Allergies or Special Seating Notes
                    </label>
                    <input
                      id="special-requests-input"
                      type="text"
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      placeholder="e.g. Quiet corner table, gluten allergy"
                      className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-stone-100 text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Submit CTA */}
                <div className="pt-4 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-stone-400">
                    <span className="font-semibold text-stone-200">Summary: </span>
                    <span>{guests} {guests === 1 ? 'guest' : 'guests'} on {selectedDate} at {selectedTime} ({seatingArea.replace('-', ' ')})</span>
                  </div>

                  <button
                    type="submit"
                    id="submit-reservation-btn"
                    className="w-full sm:w-auto px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm tracking-wide shadow-lg shadow-amber-950/40 hover:shadow-amber-900/60 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Confirm Reservation</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* TAB 2: Lookup Existing Reservation */}
        {activeTab === 'lookup' && (
          <div className="bg-stone-950 rounded-3xl border border-stone-800 p-6 sm:p-10 shadow-2xl max-w-2xl mx-auto">
            <h3 className="font-serif text-2xl font-bold text-white mb-2">
              Find Your Reservation
            </h3>
            <p className="text-stone-400 text-xs sm:text-sm mb-6">
              Enter your booking confirmation code (e.g. <span className="text-amber-400 font-mono">AK-9842</span>), email, or mobile phone number.
            </p>

            <form onSubmit={handleLookup} className="flex gap-2 mb-8">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="lookup-reservation-input"
                  type="text"
                  value={lookupQuery}
                  onChange={(e) => setLookupQuery(e.target.value)}
                  placeholder="AK-9842 or phone or email"
                  className="w-full pl-10 pr-4 py-3 bg-stone-900 border border-stone-800 rounded-xl text-stone-100 text-sm focus:outline-none focus:border-amber-500"
                />
              </div>
              <button
                type="submit"
                id="search-reservation-btn"
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm transition-colors"
              >
                Search
              </button>
            </form>

            {lookupResult === 'not-found' && (
              <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 text-center">
                <p className="text-stone-300 text-sm font-medium">No reservation found matching "{lookupQuery}"</p>
                <p className="text-stone-500 text-xs mt-1">Please verify the code or telephone number, or contact us at {RESTAURANT_INFO.phone}.</p>
              </div>
            )}

            {lookupResult && typeof lookupResult === 'object' && (
              <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 space-y-4">
                <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Booking Code</span>
                    <span className="font-mono text-lg font-bold text-amber-300">{lookupResult.confirmationCode}</span>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${
                    lookupResult.status === 'confirmed' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                  }`}>
                    {lookupResult.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-stone-400 block">Guest Name:</span>
                    <span className="text-white font-medium">{lookupResult.guestName} ({lookupResult.guests} Guests)</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block">Date & Time:</span>
                    <span className="text-white font-medium">{lookupResult.date} at {lookupResult.time}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block">Seating Area:</span>
                    <span className="text-white font-medium capitalize">{lookupResult.seatingArea.replace('-', ' ')}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block">Occasion:</span>
                    <span className="text-white font-medium capitalize">{lookupResult.occasion}</span>
                  </div>
                </div>

                {lookupResult.status === 'confirmed' && (
                  <div className="pt-3 border-t border-stone-800 flex justify-end">
                    <button
                      id="lookup-cancel-btn"
                      onClick={() => handleCancelBooking(lookupResult.confirmationCode)}
                      className="px-4 py-2 rounded-lg text-rose-400 hover:bg-rose-950/40 text-xs font-medium border border-rose-900/50 transition-colors"
                    >
                      Cancel This Reservation
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
