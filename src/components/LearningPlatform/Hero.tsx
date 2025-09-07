import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Users, 
  BookOpen, 
  Code, 
  Video,
  Brain,
  Globe,
  Award
} from "lucide-react";
import heroImage from "@/assets/hero-learning.jpg";

const Hero = () => {
  const features = [
    { icon: Video, label: "Virtual Classes", count: "50+" },
    { icon: Users, label: "Active Students", count: "2000+" },
    { icon: Code, label: "Coding Labs", count: "15+" },
    { icon: Brain, label: "AI Tutors", count: "24/7" },
  ];

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-background via-muted to-background overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_35%,hsl(var(--primary))_35%,hsl(var(--primary))_50%,transparent_50%)] bg-[length:20px_20px]"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="bg-gradient-secondary text-white px-4 py-2 text-sm font-medium">
                🇮🇳 भारत का पहला Rural Digital Learning Platform
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                <span className="text-foreground">Digital </span>
                <span className="bg-gradient-hero bg-clip-text text-transparent">शिक्षा</span>
                <br />
                <span className="text-foreground">for </span>
                <span className="text-secondary">Rural India</span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                Empowering rural students in Nabha with AI-powered learning, virtual classrooms, 
                coding labs, and multilingual support. Breaking barriers, building futures.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="xl" className="gap-3">
                <Play className="w-5 h-5" />
                Start Learning Now
              </Button>
              <Button variant="glass" size="xl" className="gap-3">
                <BookOpen className="w-5 h-5" />
                Virtual Tour
              </Button>
            </div>

            {/* Feature Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center group">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">{feature.count}</div>
                  <div className="text-sm text-muted-foreground">{feature.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-primary animate-float">
              <img 
                src={heroImage} 
                alt="Students learning on digital platform" 
                className="w-full h-auto object-cover"
              />
              
              {/* Floating Elements */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-medium">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Live Class</span>
                </div>
              </div>
              
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-medium">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Multi-Language</span>
                </div>
              </div>
              
              <div className="absolute top-1/2 -right-4 bg-gradient-secondary rounded-lg p-4 shadow-secondary transform -translate-y-1/2">
                <Award className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Background decoration */}
            <div className="absolute -top-8 -left-8 w-24 h-24 bg-gradient-primary rounded-full opacity-20 animate-pulse-slow"></div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-secondary rounded-full opacity-20 animate-pulse-slow"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;