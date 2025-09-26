import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMoviesApi } from '../services/movieService';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('NowShowing'); // NowShowing | ComingSoon | Archived | All
  const [keyword, setKeyword] = useState('');
  const [debouncedKeyword, setDebouncedKeyword] = useState('');
  const [genreId, setGenreId] = useState('');
  const [rated, setRated] = useState('');
  const [sort, setSort] = useState('releaseDate_desc'); // releaseDate_desc | title_asc

  const totalPages = useMemo(() => {
    return pageSize > 0 ? Math.max(1, Math.ceil(totalItems / pageSize)) : 1;
  }, [totalItems, pageSize]);

  // Debounce search keyword
  useEffect(() => {
    const t = setTimeout(() => setDebouncedKeyword(keyword.trim()), 400);
    return () => clearTimeout(t);
  }, [keyword]);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setIsLoading(true);
      setError('');
      try {
        const params = {
          page,
          pageSize,
          keyword: debouncedKeyword || undefined,
          genreId: genreId || undefined,
          rated: rated || undefined,
          status: status === 'All' ? undefined : status,
          sort,
        };
        const data = await getMoviesApi(params);
        if (!isMounted) return;
        setMovies(Array.isArray(data?.items) ? data.items : []);
        setTotalItems(Number.isFinite(data?.totalItems) ? data.totalItems : 0);
      } catch (e) {
        if (!isMounted) return;
        setError(e?.message || 'Không thể tải danh sách phim');
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    fetchData();
    return () => { isMounted = false; };
  }, [page, pageSize, debouncedKeyword, genreId, rated, status, sort]);

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <div className="min-h-screen py-16 px-4 lg:px-8 bg-gradient-to-b from-[#2a0a3a] via-[#2a0a3a]/60 to-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-white mb-3">
            Danh sách phim
          </h1>
          <p className="text-neutral-white/80 text-base md:text-lg">
            Khám phá phim đang chiếu và sắp chiếu tại rạp
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 lg:p-8 border border-white/15 shadow-lg">
          {/* Status Tabs */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {['NowShowing', 'ComingSoon'].map((s) => (
              <button
                key={s}
                onClick={() => { setStatus(s); setPage(1); }}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold shadow-sm transition
                ${status === s
                  ? 'bg-[#f53d7a] text-white shadow-[#f53d7a]/30'
                  : 'bg-white text-neutral-darkGray border border-neutral-lightGray hover:bg-neutral-lightGray/30'}`}
              >
                {s === 'NowShowing' ? 'PHIM ĐANG CHIẾU' : 'PHIM SẮP CHIẾU'}
              </button>
            ))}
            <button
              onClick={() => { setStatus('All'); setPage(1); }}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition ${status === 'All' ? 'border-[#f53d7a] text-[#f53d7a] bg-[#f53d7a]/10' : 'border-neutral-lightGray text-neutral-50 hover:bg-neutral-lightGray/30'}`}
            >
              Tất cả
            </button>
            <div className="ml-auto text-neutral-darkGray/80 text-sm md:text-base">
              Tổng số: <span className="font-semibold">{totalItems}</span>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            <input
              value={keyword}
              onChange={(e) => { setKeyword(e.target.value); setPage(1); }}
              className="border border-neutral-lightGray rounded-md px-3 py-2"
              placeholder="Tìm theo tên phim..."
            />

            <select
              value={genreId}
              onChange={(e) => { setGenreId(e.target.value); setPage(1); }}
              className="border border-neutral-lightGray rounded-md px-3 py-2"
            >
              <option value="">Thể loại: Tất cả</option>
              {Array.from(new Map(movies.flatMap(m => (m.genres || [])).map(g => [g.id, g])).values()).map((g) => (
                <option key={g.id} value={g.id}>{g.name}</option>
              ))}
            </select>

            <select
              value={rated}
              onChange={(e) => { setRated(e.target.value); setPage(1); }}
              className="border border-neutral-lightGray rounded-md px-3 py-2"
            >
              <option value="">Độ tuổi: Tất cả</option>
              {Array.from(new Set(movies.map(m => m.rated).filter(Boolean))).map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>

            <div className="flex items-center gap-2">
              <select
                value={sort}
                onChange={(e) => { setSort(e.target.value); setPage(1); }}
                className="border border-neutral-lightGray rounded-md px-3 py-2 w-full"
              >
                <option value="releaseDate_desc">Mới nhất</option>
                <option value="title_asc">Tên A→Z</option>
              </select>
              <select
                value={pageSize}
                onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
                className="border border-neutral-lightGray rounded-md px-2 py-2 w-[110px]"
              >
                <option value={5}>5 / trang</option>
                <option value={10}>10 / trang</option>
                <option value={20}>20 / trang</option>
              </select>
            </div>
          </div>

          {/* Loading / Error */}
          {isLoading && (
            <div className="py-16 text-center text-neutral-darkGray">Đang tải danh sách phim...</div>
          )}
          {!!error && !isLoading && (
            <div className="py-8 text-center text-red-600">{error}</div>
          )}

          {/* Grid */}
          {!isLoading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
              {movies.map((m) => (
                <div
                  key={m.id}
                  className="group rounded-2xl overflow-hidden bg-white border border-neutral-lightGray/70 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative aspect-[2/3] bg-neutral-lightGray/30 overflow-hidden">
                    {m.posterUrl ? (
                      <img
                        src={m.posterUrl}
                        alt={m.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-neutral-darkGray">No image</div>
                    )}
                    {m.rated && (
                      <div className="absolute top-3 right-3 text-[11px] tracking-wide bg-black/70 text-white rounded px-2 py-0.5">
                        {m.rated}
                      </div>
                    )}

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute inset-0 p-4 flex flex-col items-center justify-center text-white">
                        <div className="w-full max-w-[210px] space-y-3">
                          <Link
                            to={`/movies/${m.id}`}
                            className="block w-full text-center text-sm md:text-base font-extrabold tracking-wide bg-[#a64bd6] hover:bg-[#9340c5] text-white rounded-md py-2"
                          >
                            > CHI TIẾT
                          </Link>
                          <Link
                            to={`/user/booking/${m.id}`}
                            className="block w-full text-center text-sm md:text-base font-extrabold tracking-wide bg-white text-[#1f1f1f] hover:bg-neutral-lightGray rounded-md py-2"
                          >
                            MUA VÉ
                          </Link>
                          <div className="mt-3 text-left space-y-1 text-[13px] md:text-sm">
                            {m.durationMinutes ? (
                              <div><span className="font-bold">Thời lượng:</span> {m.durationMinutes} phút</div>
                            ) : null}
                            {Array.isArray(m.genres) && m.genres.length > 0 ? (
                              <div>
                                <div className="font-bold mb-1">Thể loại:</div>
                                <div className="space-y-1 max-h-24 overflow-y-auto pr-1">
                                  {m.genres.map((g) => (
                                    <div key={g.id} className="text-white/90">{g.name}</div>
                                  ))}
                                </div>
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-base md:text-lg font-bold text-neutral-darkGray mb-1 line-clamp-2 uppercase">
                      {m.title}
                    </h3>
                    <div className="text-sm text-neutral-darkGray/70 mb-2 line-clamp-2">{m.originalTitle}</div>
                    <div className="text-sm text-neutral-darkGray/70 mb-2">
                      {m.durationMinutes ? `${m.durationMinutes} phút` : ''}
                      {m.status ? ` • ${m.status}` : ''}
                    </div>
                    {m.releaseDate && (
                      <div className="text-sm font-medium text-[#a74bd6] mb-2">
                        Khởi chiếu {new Date(m.releaseDate).toLocaleDateString()}
                      </div>
                    )}
                    {Array.isArray(m.genres) && m.genres.length > 0 && (
                      <div className="space-y-1 max-h-24 overflow-y-auto pr-1">
                        {m.genres.map((g) => (
                          <div key={g.id} className="text-xs bg-neutral-lightGray/50 text-neutral-darkGray rounded px-2 py-0.5 w-fit">
                            {g.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {!isLoading && !error && (
            <div className="flex items-center justify-between mt-8">
              <button
                onClick={handlePrev}
                disabled={page <= 1}
                className="px-4 py-2 rounded-md border border-neutral-lightGray disabled:opacity-50"
              >
                Trang trước
              </button>
              <div className="text-neutral-darkGray">
                Trang <span className="font-semibold">{page}</span> / {totalPages}
              </div>
              <button
                onClick={handleNext}
                disabled={page >= totalPages}
                className="px-4 py-2 rounded-md border border-neutral-lightGray disabled:opacity-50"
              >
                Trang sau
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoviesPage;
