import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Mail, MapPin, Calendar, Phone } from "lucide-react";

const Profile = () => {
  // This would typically come from your auth/user state
  const user = {
    username: "JohnDoe",
    email: "john@example.com",
    location: "New York, USA",
    joinDate: "January 2024",
    phone: "+1 234 567 8900",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John"
  };

  return (
    <Card className="w-full max-w-md mx-auto glass-card">
      <CardHeader className="flex flex-col items-center space-y-4">
        <Avatar className="w-24 h-24">
          <AvatarImage src={user.avatar} alt={user.username} />
          <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">{user.username}</h2>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center space-x-3 text-white/80">
            <Mail className="w-5 h-5" />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center space-x-3 text-white/80">
            <MapPin className="w-5 h-5" />
            <span>{user.location}</span>
          </div>
          <div className="flex items-center space-x-3 text-white/80">
            <Calendar className="w-5 h-5" />
            <span>Joined {user.joinDate}</span>
          </div>
          <div className="flex items-center space-x-3 text-white/80">
            <Phone className="w-5 h-5" />
            <span>{user.phone}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Profile;