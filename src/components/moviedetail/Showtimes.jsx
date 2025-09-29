import React, { useEffect, useMemo, useState } from 'react';
import {motion} from "framer-motion";
import { getShowtimesByMovieApi } from '../../services/showtimeService';

const Showtimes = ({ movieId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showtimes, setShowtimes] = useState([]);

  useEffect(() => {
    let ignore = false;
    async function fetchData() {
      if (!movieId) return;
      try {
        setLoading(true);
        setError('');
        const data = await getShowtimesByMovieApi(movieId);
        if (!ignore) setShowtimes(Array.isArray(data) ? data : []);
      } catch (e) {
        if (!ignore) setError(e?.message || 'Không thể tải lịch chiếu');
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    fetchData();
    return () => { ignore = true; };
  }, [movieId]);

  const groups = useMemo(() => {
    const byDate = new Map();
    const today = new Date();
    const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    for (const s of showtimes) {
      const dt = new Date(s.startUtc);
      const key = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`;
      if (!byDate.has(key)) byDate.set(key, []);
      byDate.get(key).push(s);
    }
    // sort by date asc and time asc
    return Array.from(byDate.entries())
      .sort((a, b) => new Date(a[0]) - new Date(b[0]))
      .map(([dateKey, items]) => ({
        dateKey,
        label: dateKey === todayKey
          ? 'Hôm nay'
          : new Date(items[0].startUtc).toLocaleDateString('vi-VN', { weekday: 'long' }),
        dateShort: (() => {
          const d = new Date(items[0].startUtc);
          return `${d.getDate()}/${d.getMonth() + 1}`;
        })(),
        items: items.sort((x, y) => new Date(x.startUtc) - new Date(y.startUtc)),
      }));
  }, [showtimes]);

  const formatTime = (isoUtc) => new Date(isoUtc).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="border border-white/20 text-white rounded-2xl p-6 shadow-lg"
      >
        <div className="flex items-center mb-6">
          <div className="mr-4 h-px bg-primary-pink flex-1"></div>
          <h3 className="font-bold text-lg">📅 LỊCH CHIẾU</h3>
          <div className="ml-4 h-px bg-primary-pink flex-1"></div>
        </div>

        {loading && (
          <div className="text-neutral-darkGray">Đang tải lịch chiếu...</div>
        )}
        {!loading && error && (
          <div className="text-accent-red">{error}</div>
        )}

        {!loading && !error && groups.length === 0 && (
          <div className="text-white">Chưa có lịch chiếu.</div>
        )}

        {!loading && !error && groups.map(group => (
          <div key={group.dateKey} className="mb-8">
            <div className="relative inline-block mb-4">
              <div className="bg-primary-purple text-white px-5 py-2 rounded-xl font-semibold shadow-lg border border-white select-none">
                {group.label}, ngày {group.dateShort}
              </div>
              <span className="absolute -bottom-2 left-6 w-3 h-3 bg-primary-purple rotate-45 rounded-[2px]"></span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9 gap-3">
              {group.items.map(item => (
                <button
                  key={`filled-${item.id}`}
                  className="px-5 py-2 rounded-lg text-sm font-semibold transition-all bg-primary-pink text-white border border-primary-pink hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-primary-pink/40"
                >
                  {formatTime(item.startUtc)}
                </button>
              ))}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Showtimes;
