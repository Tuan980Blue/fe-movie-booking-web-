import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getMovieDetailApi } from '../services/movieService';
import { COLORS } from '../shared/constants/colors';

const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('info');

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        setLoading(true);
        const data = await getMovieDetailApi(id);
        setMovie(data);
      } catch (err) {
        setError(err?.message || 'Không thể tải thông tin phim');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMovieDetail();
    }
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const formatDuration = (minutes) => {
    if (!minutes) return '';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-purple to-primary-pink">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Đang tải thông tin phim...</p>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-purple to-primary-pink">
        <div className="text-center">
          <div className="text-6xl mb-4">🎬</div>
          <h2 className="text-2xl font-bold text-white mb-4">Không tìm thấy phim</h2>
          <p className="text-white opacity-75 mb-6">{error || 'Phim không tồn tại'}</p>
          <Link
            to="/movies"
            className="inline-block px-6 py-3 bg-primary-pink text-white rounded-lg hover:bg-cinema-neonPink transition-colors"
          >
            Quay lại danh sách phim
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mb-8 lg:mb-4 bg-gradient-to-br from-primary-purple to-primary-pink">
      {/* Hero Section with Backdrop */}
      <div className="relative h-[80vh] sm:h-[75vh] lg:h-[70vh] overflow-hidden">
        {/* Backdrop Image - Chỉ hiển thị phần trên */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6)), url(${movie.backdropUrl})`
          }}
        />

        {/* Content Overlay */}
        <div className="relative h-full flex items-end">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 pb-2 sm:pb-4 lg:pb-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end">
              {/* Poster - Nằm dưới backdrop, overlay 1/2 */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-4 relative z-10"
              >
                <div className="">
                  {/* Poster với shadow và border để tạo hiệu ứng overlay */}
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="w-full max-w-xs sm:max-w-sm mx-auto lg:mx-0 rounded-2xl shadow-2xl border-4 border-white/20 backdrop-blur-sm"
                  />
                  {/* Age Rating Badge */}
                  {movie.rated && (
                    <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-accent-red text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-bold shadow-lg">
                      {movie.rated}
                    </div>
                  )}
                  {/* Glow effect cho poster */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-primary-pink/20 to-transparent opacity-0 transition-opacity duration-300"></div>
                </div>
              </motion.div>

              {/* Movie Info */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:col-span-8 text-white relative z-10"
              >
                <div className="mb-4">
                  {movie.status === 'Draft' && (
                    <span className="inline-block bg-accent-yellow text-neutral-darkGray px-3 py-1 rounded-full text-sm font-semibold mb-4">
                      BẢN NhÁP
                    </span>
                  )}
                  {movie.status === 'NowShowing' && (
                    <span className="inline-block bg-accent-orange text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
                      🎬 ĐANG CHIẾU
                    </span>
                  )}
                  {movie.status === 'ComingSoon' && (
                    <span className="inline-block bg-accent-yellow text-neutral-darkGray px-3 py-1 rounded-full text-sm font-semibold mb-4">
                      📅 SẮP CHIẾU
                    </span>
                  )}
                  {movie.status === 'Archived' && (
                    <span className="inline-block bg-accent-yellow text-neutral-darkGray px-3 py-1 rounded-full text-sm font-semibold mb-4">
                       ĐÃ CHIẾU
                    </span>
                  )}
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 leading-tight">
                  {movie.title}
                </h1>

                {movie.originalTitle && movie.originalTitle !== movie.title && (
                  <h2 className="text-lg sm:text-xl lg:text-2xl text-white opacity-80 mb-4 sm:mb-6">
                    {movie.originalTitle}
                  </h2>
                )}

                {/* Movie Meta */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6 text-sm sm:text-base lg:text-lg">
                  {movie.durationMinutes && (
                    <div className="flex items-center gap-2">
                      <span className="text-accent-yellow">⏱️</span>
                      <span>{formatDuration(movie.durationMinutes)}</span>
                    </div>
                  )}
                  {movie.releaseDate && (
                    <div className="flex items-center gap-2">
                      <span className="text-accent-yellow">📅</span>
                      <span>{formatDate(movie.releaseDate)}</span>
                    </div>
                  )}
                  {movie.director && (
                    <div className="flex items-center gap-2">
                      <span className="text-accent-yellow">🎭</span>
                      <span className="truncate max-w-[200px] sm:max-w-none">{movie.director}</span>
                    </div>
                  )}
                  {movie.actors && (
                    <div className="flex items-center gap-2">
                      <span className="text-accent-yellow">🎭</span>
                      <span className="truncate max-w-[200px] sm:max-w-none">{movie.actors}</span>
                    </div>
                  )}
                </div>

                {/* Genres */}
                {movie.genres && movie.genres.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                    {movie.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="px-2 sm:px-3 py-1 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-xs sm:text-sm border border-white border-opacity-30"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                )}

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Link
                    to={`/user/booking/${movie.id}`}
                    className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-primary-pink rounded-xl text-white font-bold text-base sm:text-lg hover:bg-cinema-neonPink transition-all duration-300 shadow-2xl overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      🎫 Mua vé ngay
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </span>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300 bg-gradient-to-r from-primary-pink to-accent-orange"></div>
                  </Link>

                  {movie.trailerUrl && (
                    <a
                      href={movie.trailerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group px-6 sm:px-8 py-3 sm:py-4 bg-white bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30 rounded-xl text-white font-bold text-base sm:text-lg hover:bg-opacity-30 transition-all duration-300"
                    >
                      <span className="flex items-center justify-center gap-2">
                        ▶️ Xem trailer
                      </span>
                    </a>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="mt-10">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Movie Info & Showtimes */}
            <div className="lg:col-span-2 space-y-6">
              {/* Movie Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-primary-pink rounded-2xl p-6 text-white relative overflow-hidden"
              >
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-4">📖 Tóm tắt nội dung</h3>
                  <p className="text-white text-sm leading-relaxed mb-4">
                    {movie.description || 'Thông tin về nội dung phim sẽ được cập nhật sớm nhất.'}
                  </p>
                  <div className="text-center">
                    <button className="w-8 h-8 bg-accent-orange rounded-full flex items-center justify-center mx-auto">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 left-4 w-2 h-2 bg-white rounded-full"></div>
                  <div className="absolute top-8 right-8 w-1 h-1 bg-white rounded-full"></div>
                  <div className="absolute bottom-4 left-1/4 w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
              </motion.div>

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

            {/* Right Column - Booking Form */}
            <div className="lg:col-span-1 space-y-6">
              {/* Booking Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                {/* Header */}
                <div className="bg-primary-purple px-6 py-4 flex items-center justify-center gap-3">
                  <span className="text-accent-yellow text-xl">🎫</span>
                  <h3 className="text-white font-bold text-lg">ĐẶT VÉ</h3>
                  <span className="text-accent-yellow text-xl">🎫</span>
                </div>

                {/* Form Content */}
                <div className="p-6 space-y-4">
                  {/* Movie Selection */}
                  <div className="relative">
                    <label className="block text-sm font-semibold text-neutral-darkGray mb-2">
                      🎬 Chọn Phim
                    </label>
                    <select className="w-full px-4 py-3 border-2 border-neutral-lightGray rounded-lg focus:border-primary-pink focus:outline-none transition-colors">
                      <option>{movie.title}</option>
                    </select>
                    <svg className="absolute right-3 top-9 w-5 h-5 text-neutral-lightGray" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>

                  {/* Date Selection */}
                  <div className="relative">
                    <label className="block text-sm font-semibold text-neutral-darkGray mb-2">
                      📅 Chọn Ngày
                    </label>
                    <select className="w-full px-4 py-3 border-2 border-neutral-lightGray rounded-lg focus:border-primary-pink focus:outline-none transition-colors">
                      <option>Hôm nay ({new Date().getDate()}/{new Date().getMonth() + 1})</option>
                      <option>Ngày mai ({new Date().getDate() + 1}/{new Date().getMonth() + 1})</option>
                    </select>
                    <svg className="absolute right-3 top-9 w-5 h-5 text-neutral-lightGray" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>

                  {/* Showtime Selection */}
                  <div className="relative">
                    <label className="block text-sm font-semibold text-neutral-darkGray mb-2">
                      🕐 Chọn Suất
                    </label>
                    <select className="w-full px-4 py-3 border-2 border-neutral-lightGray rounded-lg focus:border-primary-pink focus:outline-none transition-colors">
                      <option>Chọn suất chiếu</option>
                      <option>18:00</option>
                      <option>20:10</option>
                      <option>21:10</option>
                      <option>22:20</option>
                    </select>
                    <svg className="absolute right-3 top-9 w-5 h-5 text-neutral-lightGray" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>

                  {/* CTA Button */}
                  <Link
                    to={`/user/booking/${movie.id}`}
                    className="block w-full bg-primary-pink text-white py-4 rounded-xl font-bold text-center hover:bg-cinema-neonPink transition-colors shadow-lg"
                  >
                    🎫 MUA VÉ
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
