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
  Settings
} from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-border sticky top-0 z-50 shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
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
            <Button variant="ghost" size="sm" className="gap-2">
              <Video className="w-4 h-4" />
              Virtual Class
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <Users className="w-4 h-4" />
              Collaborate
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <Code className="w-4 h-4" />
              Code Lab
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <MessageCircle className="w-4 h-4" />
              AI Tutor
            </Button>
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-3">
            {/* Language Selector */}
            <Button variant="ghost" size="sm" className="hidden md:flex gap-2">
              <Globe className="w-4 h-4" />
              हिंदी
            </Button>

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
              <Button variant="ghost" size="sm" className="justify-start gap-2">
                <Video className="w-4 h-4" />
                Virtual Class
              </Button>
              <Button variant="ghost" size="sm" className="justify-start gap-2">
                <Users className="w-4 h-4" />
                Collaborate
              </Button>
              <Button variant="ghost" size="sm" className="justify-start gap-2">
                <Code className="w-4 h-4" />
                Code Lab
              </Button>
              <Button variant="ghost" size="sm" className="justify-start gap-2">
                <MessageCircle className="w-4 h-4" />
                AI Tutor
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;