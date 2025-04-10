
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
  return (
    <div className="glass-card rounded-xl p-6 hover:bg-white/10 transition-all duration-300 h-full">
      <div className="w-12 h-12 rounded-full bg-neon-purple/20 flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-neon-purple" />
      </div>
      <h3 className="text-xl font-grotesk font-medium mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

export default FeatureCard;
