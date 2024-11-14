import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Film } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate registration
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Registration successful!",
        description: "Welcome to MovieMind.",
      });
      navigate('/login');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-purple-500/5">
      <div className="w-full max-w-md p-8 glass-card rounded-lg animate-scale-in">
        <div className="flex items-center justify-center space-x-2 mb-8">
          <Film className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-bold">MovieMind</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Username</label>
            <input
              type="text"
              className="input-field"
              placeholder="Choose a username"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              className="input-field"
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              className="input-field"
              placeholder="Choose a password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="button-primary w-full"
          >
            {isLoading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          Already have an account?{" "}
          <button
            onClick={() => navigate('/login')}
            className="text-primary hover:underline"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;