import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Film, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Recommendations = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate search results
    const mockResults = [
      {
        id: 1,
        title: "Inception",
        genre: "Sci-Fi",
        year: "2010",
        poster: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
        rating: "8.8"
      },
      {
        id: 2,
        title: "The Dark Knight",
        genre: "Action",
        year: "2008",
        poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        rating: "9.0"
      }
    ];

    setSearchResults(mockResults);
    toast({
      title: "Search completed",
      description: "Found some movies you might like!",
    });
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-lg border-b border-gray-200 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Film className="w-6 h-6 text-primary" />
            <span className="text-xl font-semibold">MovieMind</span>
          </div>
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 nav-link"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </button>
        </div>
      </nav>

      {/* Search Form */}
      <main className="container mx-auto px-4 pt-32 pb-20">
        <Card className="max-w-2xl mx-auto glass-card animate-fade-in">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Find Your Next Movie</h2>
            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <Label htmlFor="title">Movie Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter movie title..."
                  className="input-field"
                />
              </div>
              <div>
                <Label htmlFor="genre">Genre</Label>
                <Input
                  id="genre"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  placeholder="Enter genre..."
                  className="input-field"
                />
              </div>
              <div>
                <Label htmlFor="year">Release Year</Label>
                <Input
                  id="year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="Enter release year..."
                  className="input-field"
                />
              </div>
              <button type="submit" className="button-primary w-full">
                Search Movies
              </button>
            </form>
          </CardContent>
        </Card>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
            {searchResults.map((movie) => (
              <div key={movie.id} className="movie-card">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-[400px] object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{movie.title}</h3>
                  <div className="flex items-center justify-between text-sm text-muted">
                    <span>{movie.genre}</span>
                    <span>IMDb {movie.rating}</span>
                    <span>{movie.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Recommendations;