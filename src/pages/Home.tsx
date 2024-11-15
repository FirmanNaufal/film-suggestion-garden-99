import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Film, LogOut, Star, Tv, Award, UserCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import Profile from '@/components/Profile';

const Home = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

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

  const toggleProfile = () => {
    setShowProfile(!showProfile);
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
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleProfile}
              className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
              title="View Profile"
            >
              <UserCircle className="w-6 h-6" />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto pt-32 pb-20 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className={`lg:col-span-1 ${showProfile ? 'block' : 'hidden'} lg:block`}>
            <Profile />
          </div>

          {/* Movie Content */}
          <div className={`${showProfile ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
                Discover Your Next Favorite Movie
              </h1>
              <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
                Get personalized movie recommendations based on your preferences and taste.
              </p>
              <button
                onClick={handleGetRecommendations}
                disabled={isLoading}
                className="button-primary text-lg px-8 py-4 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
              >
                {isLoading ? "Loading..." : "Get Movie Recommendations"}
              </button>
            </div>

            {/* Featured Movies */}
            <div className="mt-12">
              <h2 className="text-3xl font-semibold mb-8 text-center text-white">Featured Movies</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {featuredMovies.map((movie) => (
                  <HoverCard key={movie.id}>
                    <HoverCardTrigger>
                      <div className="movie-card group">
                        <div className="relative overflow-hidden rounded-t-lg">
                          <img
                            src={movie.poster}
                            alt={movie.title}
                            className="w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                            <div className="text-white">
                              <div className="flex items-center space-x-2 mb-2">
                                <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                                <span>{movie.rating}</span>
                              </div>
                              <p className="text-sm opacity-90">{movie.description}</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-6 bg-white/10 backdrop-blur-lg">
                          <h3 className="text-xl font-semibold mb-2 text-white">{movie.title}</h3>
                          <div className="flex items-center justify-between text-sm text-white/70">
                            <div className="flex items-center space-x-2">
                              <Award className="w-4 h-4" />
                              <span>{movie.awards}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Tv className="w-4 h-4" />
                              <span>{movie.streaming}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold">{movie.title} - Behind the Scenes</h4>
                        <p className="text-sm text-muted-foreground">{movie.trivia}</p>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                ))}
              </div>
            </div>
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
    poster: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    awards: "4 Oscars",
    streaming: "Netflix",
    trivia: "The spinning top at the end of the movie was actually CGI, not a practical prop."
  },
  {
    id: 2,
    title: "The Dark Knight",
    rating: "9.0",
    year: "2008",
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    awards: "2 Oscars",
    streaming: "HBO Max",
    trivia: "Heath Ledger locked himself in a hotel room for a month to perfect his Joker character."
  },
  {
    id: 3,
    title: "Interstellar",
    rating: "8.6",
    year: "2014",
    poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    awards: "1 Oscar",
    streaming: "Prime Video",
    trivia: "The film's black hole visuals helped scientists better understand actual black holes."
  }
];

export default Home;