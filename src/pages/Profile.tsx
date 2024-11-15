import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Mail, MapPin, Calendar, Phone, Home, LogOut } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "See you next time!",
    });
    navigate('/login');
  };

  const handleBackHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] to-[#2C1A2F] p-4">
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={handleBackHome}
          className="mb-6 text-white hover:text-primary hover:bg-white/10"
        >
          <Home className="mr-2 h-5 w-5" />
          Back to Home
        </Button>

        <Card className="glass-card animate-fade-in">
          <CardHeader className="space-y-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-3xl font-bold text-white">My Profile</CardTitle>
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                <User className="h-10 w-10 text-white" />
              </div>
            </div>
            <Separator className="bg-white/20" />
          </CardHeader>
          
          <CardContent className="space-y-8 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-4 text-white/90 group hover:bg-white/5 p-3 rounded-lg transition-colors">
                  <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-white/60">Username</p>
                    <p className="font-medium">JohnDoe123</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-white/90 group hover:bg-white/5 p-3 rounded-lg transition-colors">
                  <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-white/60">Email</p>
                    <p className="font-medium">john.doe@example.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-white/90 group hover:bg-white/5 p-3 rounded-lg transition-colors">
                  <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-white/60">Location</p>
                    <p className="font-medium">New York, USA</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-4 text-white/90 group hover:bg-white/5 p-3 rounded-lg transition-colors">
                  <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-white/60">Join Date</p>
                    <p className="font-medium">January 1, 2024</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-white/90 group hover:bg-white/5 p-3 rounded-lg transition-colors">
                  <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-white/60">Phone</p>
                    <p className="font-medium">+1 234 567 8900</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="bg-white/20" />

            <Button
              onClick={handleLogout}
              variant="destructive"
              className="w-full mt-8 py-6 text-lg font-medium"
            >
              <LogOut className="mr-2 h-5 w-5" />
              Logout
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;