import React, {useEffect, useMemo, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {getSeatLayoutApi} from '../../services/roomService';
import { useAuth } from '../../contexts/AuthContext';

const SeatSelectionPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const showtime = location?.state?.showtime;
  const { user, isAuthenticated } = useAuth();
  const [selectedSeatIds, setSelectedSeatIds] = useState([]);
  const [secondsLeft, setSecondsLeft] = useState(5 * 60);

  const [layout, setLayout] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Nếu không có state (reload trang trực tiếp), điều hướng ngược lại bằng effect
  useEffect(() => {
    if (!showtime) {
      navigate(-1);
    }
  }, [showtime, navigate]);

  useEffect(() => {
    let ignore = false;

    async function fetchLayout() {
      if (!showtime) return;
      try {
        setLoading(true);
        setError('');
        const data = await getSeatLayoutApi(showtime.cinemaId, showtime.roomId);
        if (!ignore) setLayout(data);
      } catch (e) {
        if (!ignore) setError(e?.message || 'Không thể tải sơ đồ ghế');
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    fetchLayout();
    return () => {
      ignore = true;
    };
  }, [showtime]);

  const seatLegend = useMemo(() => layout?.seatTypes || [], [layout]);

  // Simple countdown 5 minutes for seat selection
  useEffect(() => {
    const t = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const minutes = Math.floor(secondsLeft / 60).toString().padStart(2, '0');
  const seconds = String(secondsLeft % 60).padStart(2, '0');

  const formatVnd = (amount) =>
    (amount || 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

  const basePrice = Number(showtime?.basePriceMinor || 0);
  const totalPrice = basePrice * selectedSeatIds.length;

  const isSelected = (id) => selectedSeatIds.includes(id);
  const getSeatName = (seat) => `${seat.rowLabel}${String(seat.seatNumber).padStart(2, '0')}`;
  const getRowSeats = (rowLabel) => layout?.rows.find(r => r.rowLabel === rowLabel)?.seats || [];
  const isSeatActive = (seat) => seat?.isActive !== false;
  const getSeatColorByType = (type) => {
    const item = seatLegend.find(t => t.type.toLowerCase() === String(type || '').toLowerCase());
    return item?.color || '#9CA3AF';
  };

  const violatesSingleGapRule = (rowLabel, nextSelectedIds) => {
    const seats = getRowSeats(rowLabel).filter(isSeatActive);
    if (seats.length === 0) return false;
    const selectedNums = seats.filter(s => nextSelectedIds.includes(s.id)).map(s => s.seatNumber).sort((a,b)=>a-b);
    if (selectedNums.length === 0) return false;
    const allNums = seats.map(s => s.seatNumber).sort((a,b)=>a-b);
    const minNum = Math.min(...selectedNums);
    const maxNum = Math.max(...selectedNums);
    const minAll = allNums[0];
    const maxAll = allNums[allNums.length - 1];
    // Edge single gap at start
    if (minNum - minAll === 2 && allNums.includes(minNum - 1)) return true;
    // Edge single gap at end
    if (maxAll - maxNum === 2 && allNums.includes(maxNum + 1)) return true;
    // Internal single holes
    for (let i = 0; i < selectedNums.length - 1; i++) {
      const a = selectedNums[i];
      const b = selectedNums[i + 1];
      if (b - a === 2) {
        const mid = a + 1;
        if (allNums.includes(mid)) return true;
      }
    }
    return false;
  };

  const toggleSeat = (seat) => {
    // Only allow active seats (layout isActive flag)
    if (!isSeatActive(seat)) return;

    setSelectedSeatIds((cur) => {
      let next = cur.includes(seat.id) ? cur.filter((x) => x !== seat.id) : [...cur, seat.id];

      // Couple rule: auto pair with adjacent couple seat in the row (seatNumber +/- 1)
      if (String(seat.seatType).toLowerCase() === 'couple') {
        const rowSeats = getRowSeats(seat.rowLabel).filter(s => String(s.seatType).toLowerCase() === 'couple');
        const pair = rowSeats.find(s => Math.abs(s.seatNumber - seat.seatNumber) === 1);
        if (pair && isSeatActive(pair)) {
          const bothSelected = next.includes(seat.id) && next.includes(pair.id);
          if (!bothSelected) {
            // ensure both are selected together
            next = Array.from(new Set([...next, seat.id, pair.id]));
          } else if (!cur.includes(seat.id)) {
            // selecting both already handled; do nothing
          }
        }
      }

      // Single-seat gap rule check within the seat row
      if (violatesSingleGapRule(seat.rowLabel, next)) {
        // revert change
        return cur;
      }

      return next;
    });
  };

  if (!showtime) {
    return <div className="min-h-screen py-16 px-4 lg:px-8 text-neutral-white">Đang chuyển hướng...</div>;
  }

  return (
    <div className="min-h-screen py-6 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Seat map */}
        <div className="lg:col-span-2 bg-neutral-white rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-neutral-darkGray">
              Phim: <strong>{showtime.movieTitle}</strong> • {showtime.format}
              {showtime.subtitle ? ' • Phụ đề' : ''}
              <div className="text-sm">
                Thời gian: {new Date(showtime.startUtc).toLocaleString('vi-VN')} → {new Date(showtime.endUtc).toLocaleTimeString('vi-VN', {hour:'2-digit', minute:'2-digit'})}
              </div>
              {(showtime?.roomName || showtime?.auditoriumName || showtime?.cinemaName) && (
                <div className="text-sm">{showtime.roomName || showtime.auditoriumName} • {showtime.cinemaName}</div>
              )}
            </div>
            <div className="text-primary-pink font-bold text-xl">{minutes}:{seconds}</div>
          </div>

          {!loading && error && (
            <div className="text-accent-red mb-4">{error}</div>
          )}
          {loading && (
            <div className="text-neutral-darkGray">Đang tải sơ đồ ghế...</div>
          )}

          {!loading && !error && layout && (
            <div>
              {/* Legend */}
              <div className="flex flex-wrap gap-4 items-center text-sm mb-4 text-neutral-darkGray">
                <div className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-gray-400 inline-block"/>Ghế có thể đặt</div>
                <div className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-yellow-400 inline-block"/>Ghế đang chọn</div>
                <div className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-red-500 inline-block"/>Ghế đã có người đặt</div>
                <div className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-purple-600 inline-block"/>Ghế không thể đặt</div>
              </div>

              {/* Screen */}
              <div className="mb-6">
                <div className="mx-auto mb-4 h-2 w-64 bg-neutral-lightGray rounded-full"/>
                <div className="text-center text-xs text-neutral-darkGray">Màn hình</div>
              </div>

              {/* Seat grid */}
              <div className="space-y-3 overflow-x-auto">
                {layout.rows.map(row => (
                  <div key={row.rowLabel} className="flex items-center gap-2">
                    <div className="w-6 text-xs text-neutral-darkGray text-right">{row.rowLabel}</div>
                    <div className="flex flex-wrap gap-2">
                      {row.seats.map(seat => {
                        const selected = isSelected(seat.id);
                        const baseColor = getSeatColorByType(seat.seatType);
                        const bg = selected ? '#FACC15' : baseColor;
                        const text = selected ? '#1F2937' : '#fff';
                        return (
                          <button
                            key={seat.id}
                            type="button"
                            onClick={() => toggleSeat(seat)}
                            className="w-8 h-8 rounded-md border flex items-center justify-center text-xs focus:outline-none focus:ring-2 focus:ring-primary-pink/40"
                            title={`${seat.rowLabel}${seat.seatNumber} • ${seat.seatType}`}
                            style={{ backgroundColor: bg, color: text }}
                          >
                            {seat.seatNumber}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Booking summary */}
        <div className="bg-neutral-white rounded-2xl p-6 lg:sticky lg:top-4 h-fit">
          <div className="text-xl font-bold text-primary-pink mb-4">Thông tin đặt vé</div>
          {isAuthenticated && (
            <div className="space-y-2 text-neutral-darkGray mb-6">
              <div><span className="font-semibold">Họ tên:</span> {user?.name || '-'}</div>
              <div><span className="font-semibold">Email:</span> {user?.email || '-'}</div>
            </div>
          )}

          <div className="space-y-2 text-neutral-darkGray mb-6">
            <div className="flex items-start gap-2">
              <span className="font-semibold">Ghế:</span>
              <div className="flex-1">
                {selectedSeatIds.length === 0 ? '0' : (
                  <div className="flex flex-wrap gap-2">
                    {selectedSeatIds.map(id => {
                      const seat = layout?.rows.flatMap(r => r.seats).find(s => s.id === id);
                      return <span key={id} className="px-2 py-1 rounded bg-neutral-lightGray text-xs text-neutral-darkGray">{seat ? getSeatName(seat) : id}</span>;
                    })}
                  </div>
                )}
              </div>
            </div>
            <div><span className="font-semibold">Giá vé:</span> {formatVnd(basePrice)}</div>
            <div className="text-lg font-bold">Tổng: {formatVnd(totalPrice)}</div>
          </div>

          <button
            type="button"
            disabled={selectedSeatIds.length === 0}
            className={`w-full py-3 rounded-lg text-white font-semibold ${selectedSeatIds.length === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-primary-pink hover:brightness-110'}`}
          >
            ĐẶT VÉ
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeatSelectionPage;
