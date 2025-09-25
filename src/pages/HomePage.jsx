import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HomePage = () => {
  // Mock data for featured movies
  const featuredMovies = [
    {
      id: 1,
      title: "Avatar: The Way of Water",
      poster: "🎬",
      rating: 8.5,
      genre: "Sci-Fi, Action",
      duration: "192 phút",
      releaseDate: "2024-01-15"
    },
    {
      id: 2,
      title: "Black Panther: Wakanda Forever",
      poster: "🦸",
      rating: 7.8,
      genre: "Action, Adventure",
      duration: "161 phút",
      releaseDate: "2024-01-20"
    },
    {
      id: 3,
      title: "Top Gun: Maverick",
      poster: "✈️",
      rating: 8.2,
      genre: "Action, Drama",
      duration: "131 phút",
      releaseDate: "2024-01-25"
    }
  ];

  const comingSoonMovies = [
    {
      id: 4,
      title: "Spider-Man: Across the Spider-Verse",
      poster: "🕷️",
      releaseDate: "2024-02-01"
    },
    {
      id: 5,
      title: "Guardians of the Galaxy Vol. 3",
      poster: "🚀",
      releaseDate: "2024-02-15"
    }
  ];

  const todayShowtimes = [
    { time: "10:00", movie: "Avatar: The Way of Water", hall: "Hall A" },
    { time: "13:30", movie: "Black Panther", hall: "Hall B" },
    { time: "16:45", movie: "Top Gun: Maverick", hall: "Hall C" },
    { time: "19:15", movie: "Avatar: The Way of Water", hall: "Hall A" },
    { time: "22:00", movie: "Black Panther", hall: "Hall B" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(45, 27, 105, 0.7), rgba(233, 30, 99, 0.7)), url('${process.env.PUBLIC_URL}/background.png')`,
            backgroundSize: 'cover'
          }}
        />
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-20 text-neutral-white opacity-20 text-6xl animate-bounce">
          🍿
        </div>
        <div className="absolute top-40 right-32 text-neutral-white opacity-20 text-4xl animate-pulse">
          🎬
        </div>
        <div className="absolute bottom-32 left-32 text-neutral-white opacity-20 text-5xl animate-bounce">
          ⭐
        </div>
        <div className="absolute bottom-20 right-20 text-neutral-white opacity-20 text-6xl animate-pulse">
          🎟️
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-neutral-white px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              🎬 TA MEM CINEMA
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Trải nghiệm điện ảnh tuyệt vời nhất
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/movies">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-primary-pink rounded-full text-lg font-bold hover:bg-cinema-neonPink transition-all shadow-lg"
                >
                  🎫 Xem phim ngay
                </motion.button>
              </Link>
              <Link to="/showtimes">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-accent-orange rounded-full text-lg font-bold hover:bg-accent-yellow transition-all shadow-lg"
                >
                  📅 Lịch chiếu
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Movies Section */}
      <section className="py-16 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-neutral-white mb-4">
              🎬 Phim đang chiếu
            </h2>
            <p className="text-neutral-white opacity-75 text-lg">
              Những bộ phim hot nhất hiện tại
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredMovies.map((movie, index) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-neutral-white rounded-2xl overflow-hidden shadow-xl"
              >
                <div className="h-64 bg-gradient-to-br from-primary-purple to-primary-pink flex items-center justify-center text-6xl">
                  {movie.poster}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-neutral-darkGray mb-2">
                    {movie.title}
                  </h3>
                  <div className="flex items-center mb-2">
                    <span className="text-accent-yellow text-lg">⭐</span>
                    <span className="ml-2 text-neutral-darkGray font-semibold">
                      {movie.rating}/10
                    </span>
                  </div>
                  <p className="text-neutral-lightGray text-sm mb-2">
                    {movie.genre}
                  </p>
                  <p className="text-neutral-lightGray text-sm mb-4">
                    {movie.duration} • {movie.releaseDate}
                  </p>
                  <Link to={`/movies/${movie.id}`}>
                    <button className="w-full bg-primary-pink text-neutral-white py-2 rounded-lg font-semibold hover:bg-cinema-neonPink transition-all">
                      🎫 Xem chi tiết
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-16 px-4 lg:px-8 bg-primary-purple bg-opacity-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-neutral-white mb-4">
              🚀 Phim sắp chiếu
            </h2>
            <p className="text-neutral-white opacity-75 text-lg">
              Những bộ phim đáng chờ đợi
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {comingSoonMovies.map((movie, index) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-neutral-white rounded-2xl p-6 shadow-xl"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">{movie.poster}</div>
                  <div>
                    <h3 className="text-xl font-bold text-neutral-darkGray mb-2">
                      {movie.title}
                    </h3>
                    <p className="text-accent-orange font-semibold">
                      📅 {movie.releaseDate}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Today's Showtimes */}
      <section className="py-16 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-neutral-white mb-4">
              📅 Lịch chiếu hôm nay
            </h2>
            <p className="text-neutral-white opacity-75 text-lg">
              Suất chiếu trong ngày
            </p>
          </motion.div>

          <div className="bg-neutral-white rounded-2xl p-6 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {todayShowtimes.map((showtime, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-gradient-to-r from-primary-pink to-accent-orange rounded-lg p-4 text-neutral-white"
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold mb-2">{showtime.time}</div>
                    <div className="text-sm mb-1">{showtime.movie}</div>
                    <div className="text-xs opacity-75">{showtime.hall}</div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-6">
              <Link to="/showtimes">
                <button className="bg-accent-orange text-neutral-white px-6 py-2 rounded-lg font-semibold hover:bg-accent-yellow transition-all">
                  📅 Xem tất cả lịch chiếu
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Section */}
      <section className="py-16 px-4 lg:px-8 bg-primary-purple bg-opacity-30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-neutral-white mb-2">Giá vé hợp lý</h3>
              <p className="text-neutral-white opacity-75">Từ 50k - 120k</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <div className="text-4xl mb-4">🎭</div>
              <h3 className="text-xl font-bold text-neutral-white mb-2">Chất lượng cao</h3>
              <p className="text-neutral-white opacity-75">4K, Dolby Atmos</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-4xl mb-4">🍿</div>
              <h3 className="text-xl font-bold text-neutral-white mb-2">Dịch vụ tốt</h3>
              <p className="text-neutral-white opacity-75">Combo, đồ ăn</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
