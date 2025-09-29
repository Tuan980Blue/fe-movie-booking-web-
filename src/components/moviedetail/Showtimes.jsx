import React from 'react';
import {motion} from "framer-motion";

const Showtimes = () => {
  return (
    <div>
      {/* Showtimes Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white rounded-2xl p-6 shadow-lg"
      >
        <div className="flex items-center mb-6">
          <h3 className="text-xl font-bold text-neutral-darkGray">📅 Lịch chiếu</h3>
          <div className="ml-4 h-px bg-primary-pink flex-1"></div>
        </div>

        {/* Today's Showtimes */}
        <div className="mb-6">
          <button className="w-full bg-primary-pink text-white px-4 py-3 rounded-xl font-semibold mb-4 text-left">
            Hôm nay, ngày {new Date().getDate()}/{new Date().getMonth() + 1}
          </button>

          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
            {['09:20', '10:20', '11:30', '12:30', '13:40', '14:40', '15:50', '16:50', '18:00', '19:00', '19:35', '20:10', '21:10', '21:45', '22:20'].map((time, index) => (
              <button
                key={time}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  ['18:00', '20:10', '21:10', '22:20'].includes(time)
                    ? 'bg-primary-pink text-white'
                    : 'bg-white text-neutral-darkGray border border-accent-yellow hover:bg-accent-yellow hover:text-neutral-darkGray'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* Tomorrow's Showtimes */}
        <div>
          <button className="w-full bg-primary-pink text-white px-4 py-3 rounded-xl font-semibold mb-4 text-left">
            Chủ Nhật, ngày {new Date().getDate() + 1}/{new Date().getMonth() + 1}
          </button>

          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
            {['08:40', '10:20', '10:50', '13:00', '14:25', '15:10', '16:35', '17:20', '19:00', '19:30', '20:00', '21:10', '21:40', '22:10'].map((time, index) => (
              <button
                key={time}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  ['15:10', '16:35', '17:20', '19:00'].includes(time)
                    ? 'bg-primary-pink text-white'
                    : 'bg-white text-neutral-darkGray border border-accent-yellow hover:bg-accent-yellow hover:text-neutral-darkGray'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Showtimes;
