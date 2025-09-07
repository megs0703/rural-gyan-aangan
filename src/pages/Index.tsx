import { useState } from "react";
import { usePWA } from "@/hooks/usePWA";
import Header from "@/components/LearningPlatform/Header";
import Hero from "@/components/LearningPlatform/Hero";
import VirtualClassroom from "@/components/LearningPlatform/VirtualClassroom";
import AITutor from "@/components/LearningPlatform/AITutor";
import CodeLab from "@/components/LearningPlatform/CodeLab";
import SecureTest from "@/components/LearningPlatform/SecureTest";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Video, 
  Users, 
  Code, 
  Brain, 
  BookOpen, 
  Award,
  Globe,
  Shield,
  Zap,
  Heart,
  Star,
  Play,
  CheckCircle,
  Download
} from "lucide-react";

const Index = () => {
  const [currentView, setCurrentView] = useState("home");
  const { isInstallable, isOffline, installPWA } = usePWA();

  const features = [
    {
      icon: Video,
      title: "Virtual Classrooms",
      description: "Interactive live classes with whiteboard, screen sharing, and real-time collaboration",
      color: "bg-primary"
    },
    {
      icon: Brain,
      title: "AI Tutor",
      description: "24/7 AI-powered personal tutor with multilingual support and instant doubt solving",
      color: "bg-secondary"
    },
    {
      icon: Code,
      title: "Code Labs",
      description: "Integrated coding environment with multiple languages and instant execution",
      color: "bg-success"
    },
    {
      icon: Globe,
      title: "Multi-Language",
      description: "Support for Hindi, English, Punjabi, and Urdu with live translation",
      color: "bg-warning"
    },
    {
      icon: Shield,
      title: "Secure Testing",
      description: "Proctored online exams with tab monitoring and camera-based verification",
      color: "bg-destructive"
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Peer-to-peer learning, group projects, and teacher-student interaction",
      color: "bg-accent"
    }
  ];

  const stats = [
    { number: "2000+", label: "Rural Students", icon: Users },
    { number: "150+", label: "Teachers", icon: BookOpen },
    { number: "50+", label: "Courses", icon: Play },
    { number: "95%", label: "Success Rate", icon: Award },
  ];

  const testimonials = [
    {
      name: "प्रिया शर्मा",
      role: "Class 10 Student",
      message: "AI teacher helped me understand algebra in Hindi. Now I love mathematics!",
      rating: 5
    },
    {
      name: "राज कुमार",
      role: "Teacher",
      message: "Virtual classroom made teaching so much easier. Students are more engaged now.",
      rating: 5
    },
    {
      name: "सुनीता देवी",
      role: "Parent",
      message: "My daughter learned coding through this platform. Amazing experience!",
      rating: 5
    }
  ];

  const renderContent = () => {
    switch (currentView) {
      case "classroom":
        return <VirtualClassroom />;
      case "ai-tutor":
        return <AITutor />;
      case "code-lab":
        return <CodeLab />;
      case "secure-test":
        return <SecureTest />;
      default:
        return (
          <>
            <Hero />
            
            {/* Features Section */}
            <section className="py-20 bg-background">
              <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                  <Badge className="bg-gradient-secondary text-white mb-4">
                    शिक्षा सेतु Features
                  </Badge>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Complete <span className="text-primary">Learning Ecosystem</span>
                  </h2>
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Everything rural students need to excel in digital education and prepare for the future
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {features.map((feature, index) => (
                    <Card key={index} className="shadow-soft hover:shadow-medium transition-all duration-300 group">
                      <CardHeader>
                        <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                          <feature.icon className="w-6 h-6 text-white" />
                        </div>
                        <CardTitle className="text-xl">{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-gradient-to-r from-primary to-secondary">
              <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-8 text-center">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-white">
                      <stat.icon className="w-12 h-12 mx-auto mb-4 opacity-80" />
                      <div className="text-4xl font-bold mb-2">{stat.number}</div>
                      <div className="text-lg opacity-90">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-muted/30">
              <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    What Our <span className="text-secondary">Students Say</span>
                  </h2>
                  <p className="text-xl text-muted-foreground">Real stories from rural students and teachers</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {testimonials.map((testimonial, index) => (
                    <Card key={index} className="shadow-soft">
                      <CardContent className="p-6">
                        <div className="flex items-center mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-warning fill-current" />
                          ))}
                        </div>
                        <p className="text-muted-foreground mb-4">"{testimonial.message}"</p>
                        <div>
                          <div className="font-semibold">{testimonial.name}</div>
                          <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-hero">
              <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Ready to Transform Rural Education?
                </h2>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  Join thousands of students already learning with शिक्षा सेतु. Start your digital learning journey today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="glass" size="xl" className="gap-3">
                    <Play className="w-5 h-5" />
                    Start Free Trial
                  </Button>
                  <Button variant="outline" size="xl" className="gap-3 bg-white text-primary hover:bg-white/90">
                    <BookOpen className="w-5 h-5" />
                    View Demo
                  </Button>
                </div>
              </div>
            </section>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Navigation Pills */}
      {currentView !== "home" && (
        <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center gap-3 overflow-x-auto">
              <Button
                variant={currentView === "home" ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrentView("home")}
              >
                Home
              </Button>
              <Button
                variant={currentView === "classroom" ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrentView("classroom")}
              >
                <Video className="w-4 h-4 mr-2" />
                Virtual Classroom
              </Button>
              <Button
                variant={currentView === "ai-tutor" ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrentView("ai-tutor")}
              >
                <Brain className="w-4 h-4 mr-2" />
                AI Tutor
              </Button>
              <Button
                variant={currentView === "code-lab" ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrentView("code-lab")}
              >
                <Code className="w-4 h-4 mr-2" />
                Code Lab
              </Button>
              <Button
                variant={currentView === "secure-test" ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrentView("secure-test")}
              >
                <Shield className="w-4 h-4 mr-2" />
                Secure Test
              </Button>
            </div>
          </div>
        </div>
      )}

      {renderContent()}
      
      {/* Demo Buttons for Navigation */}
      {currentView === "home" && (
        <div className="fixed bottom-6 right-6 space-y-3 z-50">
          {isOffline && (
            <div className="bg-yellow-500 text-white px-4 py-2 rounded-lg mb-2">
              ऑफ़लाइन मोड | Offline Mode
            </div>
          )}
          {isInstallable && (
            <Button
              onClick={installPWA}
              variant="outline"
              size="lg"
              className="shadow-lg gap-2 block bg-white"
            >
              <Download className="w-5 h-5" />
              Install App
            </Button>
          )}
          <Button
            variant="hero"
            size="lg"
            onClick={() => setCurrentView("classroom")}
            className="shadow-primary gap-2"
          >
            <Video className="w-5 h-5" />
            Try Virtual Class
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => setCurrentView("ai-tutor")}
            className="shadow-secondary gap-2 block"
          >
            <Brain className="w-5 h-5" />
            Chat with AI
          </Button>
          <Button
            variant="success"
            size="lg"
            onClick={() => setCurrentView("code-lab")}
            className="shadow-soft gap-2 block"
          >
            <Code className="w-5 h-5" />
            Code Lab
          </Button>
          <Button
            variant="destructive"
            size="lg"
            onClick={() => setCurrentView("secure-test")}
            className="shadow-soft gap-2 block"
          >
            <Shield className="w-5 h-5" />
            Secure Test
          </Button>
        </div>
      )}
    </div>
  );
};

export default Index;
