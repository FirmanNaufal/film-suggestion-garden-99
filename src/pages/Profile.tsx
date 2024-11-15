import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Mail, MapPin, Calendar, Phone, Home, LogOut, Edit2, Check, X } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';

interface UserData {
  username: string;
  email: string;
  location: string;
  phone: string;
  joinDate: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedLocation, setEditedLocation] = useState('');
  const [editedPhone, setEditedPhone] = useState('');

  useEffect(() => {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setUserData(parsedData);
      setEditedLocation(parsedData.location);
      setEditedPhone(parsedData.phone);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userData');
    toast({
      title: "Logged out successfully",
      description: "See you next time!",
    });
    navigate('/login');
  };

  const handleBackHome = () => {
    navigate('/');
  };

  const handleSaveChanges = () => {
    if (userData) {
      const updatedUserData = {
        ...userData,
        location: editedLocation,
        phone: editedPhone,
      };
      localStorage.setItem('userData', JSON.stringify(updatedUserData));
      setUserData(updatedUserData);
      setIsEditing(false);
      toast({
        title: "Profile updated",
        description: "Your changes have been saved successfully.",
      });
    }
  };

  const handleCancelEdit = () => {
    if (userData) {
      setEditedLocation(userData.location);
      setEditedPhone(userData.phone);
      setIsEditing(false);
    }
  };

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No user data found. Please register or login.</p>
      </div>
    );
  }

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
              {!isEditing && (
                <Button
                  variant="ghost"
                  onClick={() => setIsEditing(true)}
                  className="text-white hover:text-primary hover:bg-white/10"
                >
                  <Edit2 className="h-5 w-5" />
                </Button>
              )}
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
                    <p className="font-medium">{userData.username}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-white/90 group hover:bg-white/5 p-3 rounded-lg transition-colors">
                  <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-white/60">Email</p>
                    <p className="font-medium">{userData.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-white/90 group hover:bg-white/5 p-3 rounded-lg transition-colors">
                  <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-white/60">Location</p>
                    {isEditing ? (
                      <Input
                        value={editedLocation}
                        onChange={(e) => setEditedLocation(e.target.value)}
                        className="input-field mt-1"
                      />
                    ) : (
                      <p className="font-medium">{userData.location}</p>
                    )}
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
                    <p className="font-medium">{userData.joinDate}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-white/90 group hover:bg-white/5 p-3 rounded-lg transition-colors">
                  <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-white/60">Phone</p>
                    {isEditing ? (
                      <Input
                        value={editedPhone}
                        onChange={(e) => setEditedPhone(e.target.value)}
                        className="input-field mt-1"
                      />
                    ) : (
                      <p className="font-medium">{userData.phone}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <Separator className="bg-white/20" />

            {isEditing ? (
              <div className="flex space-x-4">
                <Button
                  onClick={handleSaveChanges}
                  className="flex-1 py-6 text-lg font-medium"
                >
                  <Check className="mr-2 h-5 w-5" />
                  Save Changes
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleCancelEdit}
                  className="flex-1 py-6 text-lg font-medium"
                >
                  <X className="mr-2 h-5 w-5" />
                  Cancel
                </Button>
              </div>
            ) : (
              <Button
                onClick={handleLogout}
                variant="destructive"
                className="w-full mt-8 py-6 text-lg font-medium"
              >
                <LogOut className="mr-2 h-5 w-5" />
                Logout
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;