import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Mail, MapPin, Calendar, Phone } from 'lucide-react';

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] to-[#2C1A2F] p-4">
      <Card className="max-w-2xl mx-auto mt-8 glass-card">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white">Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-4 text-white/90">
            <User className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm text-white/60">Username</p>
              <p>JohnDoe123</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 text-white/90">
            <Mail className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm text-white/60">Email</p>
              <p>john.doe@example.com</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 text-white/90">
            <MapPin className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm text-white/60">Location</p>
              <p>New York, USA</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 text-white/90">
            <Calendar className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm text-white/60">Join Date</p>
              <p>January 1, 2024</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 text-white/90">
            <Phone className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm text-white/60">Phone</p>
              <p>+1 234 567 8900</p>
            </div>
          </div>

          <Button
            onClick={handleLogout}
            variant="destructive"
            className="w-full mt-8"
          >
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;