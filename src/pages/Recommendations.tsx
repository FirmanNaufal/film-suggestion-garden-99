import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Film, ArrowLeft, Search, Star, Clock } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { searchMovies, getMovieDetails, getGenres, type Movie } from '@/services/tmdb';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

const Recommendations = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch genres
  const { data: genres } = useQuery({
    queryKey: ['genres'],
    queryFn: getGenres,
  });

  // Search movies
  const { data: movies, isLoading } = useQuery({
    queryKey: ['movies', searchTerm, year, genre],
    queryFn: () => searchMovies(searchTerm, year, genre),
    enabled: !!searchTerm,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(title);
    toast({
      title: "Searching movies",
      description: "Looking for movies matching your criteria...",
    });
  };

  const sortMovies = (movies: Movie[] = []) => {
    return [...movies].sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.vote_average - a.vote_average;
        case 'year':
          return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] to-[#2C1A2F]">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/10 backdrop-blur-lg border-b border-white/10 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Film className="w-6 h-6 text-primary animate-pulse" />
            <span className="text-xl font-semibold text-white">MovieMind</span>
          </div>
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </button>
        </div>
      </nav>

      {/* Search Form */}
      <main className="container mx-auto px-4 pt-32 pb-20">
        <Card className="max-w-4xl mx-auto glass-card animate-fade-in bg-white/5 backdrop-blur-xl border-white/10">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-6 text-white">Find Your Next Movie</h2>
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="title" className="text-white">Movie Title</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter movie title..."
                      className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="genre" className="text-white">Genre</Label>
                  <select
                    id="genre"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className="w-full bg-white/10 border-white/20 text-white rounded-md px-3 py-2"
                  >
                    <option value="">All Genres</option>
                    {genres?.map((g: any) => (
                      <option key={g.id} value={g.id}>
                        {g.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="year" className="text-white">Release Year</Label>
                  <Input
                    id="year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="Enter release year..."
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Label className="text-white">Sort by:</Label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-white/10 border border-white/20 rounded-md px-3 py-1 text-white"
                  >
                    <option value="rating">Rating</option>
                    <option value="year">Year</option>
                    <option value="title">Title</option>
                  </select>
                </div>
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="button-primary bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <LoadingSpinner />
                      <span>Searching...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Search className="w-4 h-4" />
                      <span>Search Movies</span>
                    </div>
                  )}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Search Results */}
        {isLoading ? (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-white/10 rounded-lg h-[400px]"></div>
                <div className="mt-4 space-y-3">
                  <div className="h-4 bg-white/10 rounded w-3/4"></div>
                  <div className="h-4 bg-white/10 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : movies?.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
            {sortMovies(movies).map((movie: Movie) => (
              <div key={movie.id} className="group">
                <div className="movie-card bg-white/5 backdrop-blur-xl border-white/10">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <div className="text-white">
                        <p className="text-sm mb-2">{movie.overview}</p>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                            <span>{movie.vote_average.toFixed(1)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{movie.runtime || 'N/A'} min</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-white">{movie.title}</h3>
                    <div className="flex items-center justify-between text-sm text-white/70">
                      <span>{new Date(movie.release_date).getFullYear()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : searchTerm && !isLoading ? (
          <div className="mt-12 text-center text-white">
            <p>No movies found matching your criteria.</p>
          </div>
        ) : null}
      </main>
    </div>
  );
};

export default Recommendations;