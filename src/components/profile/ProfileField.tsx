import { Input } from "@/components/ui/input";

interface ProfileFieldProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  isEditing?: boolean;
  onChange?: (value: string) => void;
}

export const ProfileField = ({ icon, label, value, isEditing, onChange }: ProfileFieldProps) => {
  return (
    <div className="flex items-center space-x-4 text-white/90 group hover:bg-white/5 p-3 rounded-lg transition-colors">
      <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-sm text-white/60">{label}</p>
        {isEditing && onChange ? (
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="input-field mt-1"
          />
        ) : (
          <p className="font-medium">{value}</p>
        )}
      </div>
    </div>
  );
};