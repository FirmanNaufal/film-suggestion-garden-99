import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Film, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Home = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleGetRecommendations = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/recommendations');
      toast({
        title: "Ready to explore!",
        description: "Let's find your next favorite movie.",
      });
    }, 500);
  };

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "See you next time!",
    });
    navigate('/login');
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-lg border-b border-gray-200 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Film className="w-6 h-6 text-primary" />
            <span className="text-xl font-semibold">MovieMind</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 nav-link"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center animate-fade-in">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Discover Your Next Favorite Movie
          </h1>
          <p className="text-xl text-muted mb-12 max-w-2xl mx-auto">
            Get personalized movie recommendations based on your preferences and taste.
          </p>
          <button
            onClick={handleGetRecommendations}
            disabled={isLoading}
            className="button-primary"
          >
            {isLoading ? "Loading..." : "Get Movie Recommendations"}
          </button>
        </div>

        {/* Featured Movies */}
        <div className="mt-24">
          <h2 className="text-2xl font-semibold mb-8 text-center">Featured Movies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredMovies.map((movie) => (
              <div key={movie.id} className="movie-card">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-[400px] object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{movie.title}</h3>
                  <div className="flex items-center justify-between text-sm text-muted">
                    <span>IMDb {movie.rating}</span>
                    <span>{movie.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

const featuredMovies = [
  {
    id: 1,
    title: "Inception",
    rating: "8.8",
    year: "2010",
    poster: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg"
  },
  {
    id: 2,
    title: "The Dark Knight",
    rating: "9.0",
    year: "2008",
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg"
  },
  {
    id: 3,
    title: "Interstellar",
    rating: "8.6",
    year: "2014",
    poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"
  }
];

export default Home;
