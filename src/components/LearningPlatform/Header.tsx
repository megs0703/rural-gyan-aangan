import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  Search, 
  Globe, 
  Menu,
  BookOpen,
  Users,
  Video,
  Code,
  MessageCircle,
  Settings,
  Shield,
  Brain,
  Home
} from "lucide-react";

interface HeaderProps {
  onNavigate?: (view: string) => void;
  currentView?: string;
}

const Header = ({ onNavigate, currentView = 'home' }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('hi');

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'classroom', label: 'Virtual Class', icon: Video },
    { id: 'ai-tutor', label: 'AI Tutor', icon: Brain },
    { id: 'code-lab', label: 'Code Lab', icon: Code },
    { id: 'secure-test', label: 'Secure Test', icon: Shield },
  ];

  const languages = [
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-border sticky top-0 z-50 shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate?.('home')}>
            <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">शिक्षा सेतु</h1>
              <p className="text-xs text-muted-foreground">Digital Learning Platform</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button 
                key={item.id}
                variant={currentView === item.id ? "default" : "ghost"} 
                size="sm" 
                className="gap-2"
                onClick={() => onNavigate?.(item.id)}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Button>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-3">
            {/* Language Selector */}
            <div className="hidden md:flex items-center gap-1 bg-muted/50 rounded-lg p-1">
              {languages.map((lang) => (
                <Button
                  key={lang.code}
                  variant={currentLanguage === lang.code ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setCurrentLanguage(lang.code)}
                  className="text-xs h-8"
                >
                  {lang.flag} {lang.name}
                </Button>
              ))}
            </div>

            {/* Search */}
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Search className="w-4 h-4" />
            </Button>

            {/* Notifications */}
            <div className="relative">
              <Button variant="ghost" size="icon">
                <Bell className="w-4 h-4" />
              </Button>
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-secondary">
                3
              </Badge>
            </div>

            {/* Profile */}
            <Avatar className="w-8 h-8">
              <AvatarImage src="/placeholder-avatar.jpg" alt="Student" />
              <AvatarFallback className="bg-gradient-primary text-white">
                रा
              </AvatarFallback>
            </Avatar>

            {/* Mobile menu */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <nav className="grid grid-cols-2 gap-2">
              {navItems.map((item) => (
                <Button 
                  key={item.id}
                  variant={currentView === item.id ? "default" : "ghost"} 
                  size="sm" 
                  className="justify-start gap-2"
                  onClick={() => {
                    onNavigate?.(item.id);
                    setIsMenuOpen(false);
                  }}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Button>
              ))}
            </nav>
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">Language:</span>
                <div className="flex gap-1">
                  {languages.map((lang) => (
                    <Button
                      key={lang.code}
                      variant={currentLanguage === lang.code ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentLanguage(lang.code)}
                      className="text-xs h-7"
                    >
                      {lang.flag} {lang.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;