import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  Send, 
  Mic, 
  Camera, 
  Upload, 
  Languages,
  Sparkles,
  BookOpen,
  Calculator,
  Lightbulb,
  MessageCircle,
  Volume2,
  Settings
} from "lucide-react";

const AITutor = () => {
  const [message, setMessage] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("hi");
  const [isListening, setIsListening] = useState(false);

  const languages = [
    { code: "hi", name: "हिंदी", flag: "🇮🇳" },
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "pa", name: "ਪੰਜਾਬੀ", flag: "🇮🇳" },
    { code: "ur", name: "اردو", flag: "🇮🇳" },
  ];

  const quickTopics = [
    { title: "Algebra", icon: Calculator, color: "bg-primary" },
    { title: "Physics", icon: Lightbulb, color: "bg-secondary" },
    { title: "Chemistry", icon: BookOpen, color: "bg-success" },
    { title: "Biology", icon: Brain, color: "bg-warning" },
  ];

  const conversation = [
    {
      type: "ai",
      message: "नमस्ते! मैं आपका AI शिक्षक हूँ। आज हम क्या पढ़ना चाहते हैं?",
      translation: "Hello! I'm your AI teacher. What would you like to learn today?",
      timestamp: "2 minutes ago"
    },
    {
      type: "user",
      message: "मुझे algebra में help चाहिए",
      timestamp: "1 minute ago"
    },
    {
      type: "ai",
      message: "बहुत अच्छे! Algebra एक fascinating subject है। आपको कौन सा specific topic समझना है? Equations, Factorization, या कोई और?",
      translation: "Great! Algebra is a fascinating subject. Which specific topic do you want to understand?",
      timestamp: "30 seconds ago"
    }
  ];

  return (
    <div className="min-h-screen bg-muted/30 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
              <Brain className="w-8 h-8 text-primary" />
              AI Tutor - व्यक्तिगत शिक्षक
            </h1>
            <p className="text-muted-foreground">Powered by advanced AI • Multi-language support • 24/7 Available</p>
          </div>
          
          <div className="flex items-center gap-3">
            <select 
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="px-3 py-2 border border-border rounded-md bg-background text-sm"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
            <Badge className="bg-success text-success-foreground">
              <Sparkles className="w-3 h-3 mr-1" />
              Online
            </Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Chat Area */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="shadow-medium">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Conversation
                  </span>
                  <Button variant="ghost" size="sm">
                    <Settings className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Chat Messages */}
                <div className="space-y-4 max-h-96 overflow-y-auto mb-4">
                  {conversation.map((msg, index) => (
                    <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-sm p-4 rounded-lg ${
                        msg.type === 'ai' 
                          ? 'bg-gradient-primary text-white' 
                          : 'bg-muted text-foreground'
                      }`}>
                        <p className="text-sm">{msg.message}</p>
                        {msg.translation && (
                          <p className="text-xs opacity-75 mt-2 italic">{msg.translation}</p>
                        )}
                        <p className="text-xs opacity-60 mt-2">{msg.timestamp}</p>
                        {msg.type === 'ai' && (
                          <Button variant="ghost" size="sm" className="mt-2 p-1 h-auto text-white/80 hover:text-white">
                            <Volume2 className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input Area */}
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="अपना सवाल लिखें... (Type your question...)"
                      className="flex-1 px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground"
                      onKeyPress={(e) => e.key === 'Enter' && setMessage("")}
                    />
                    <Button variant="hero" size="icon" className="rounded-lg">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      variant={isListening ? "destructive" : "ghost"} 
                      size="sm"
                      onClick={() => setIsListening(!isListening)}
                      className="gap-2"
                    >
                      <Mic className="w-4 h-4" />
                      {isListening ? "Stop" : "Voice"}
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Camera className="w-4 h-4" />
                      Photo
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Upload className="w-4 h-4" />
                      File
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Languages className="w-4 h-4" />
                      Translate
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Quick Topics */}
            <Card className="shadow-soft">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Quick Topics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickTopics.map((topic, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start gap-3 h-auto p-3"
                  >
                    <div className={`w-8 h-8 ${topic.color} rounded-lg flex items-center justify-center`}>
                      <topic.icon className="w-4 h-4 text-white" />
                    </div>
                    <span>{topic.title}</span>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* AI Features */}
            <Card className="shadow-soft">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">AI Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Brain className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Smart Solutions</p>
                    <p className="text-xs text-muted-foreground">Step-by-step explanations</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Languages className="w-5 h-5 text-secondary" />
                  <div>
                    <p className="text-sm font-medium">Live Translation</p>
                    <p className="text-xs text-muted-foreground">Multi-language support</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Camera className="w-5 h-5 text-success" />
                  <div>
                    <p className="text-sm font-medium">Visual Learning</p>
                    <p className="text-xs text-muted-foreground">Image & diagram analysis</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Study Analytics */}
            <Card className="shadow-soft">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Today's Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">12</div>
                  <div className="text-sm text-muted-foreground">Questions Solved</div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Math</span>
                    <span>8 mins</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full w-2/3"></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Science</span>
                    <span>5 mins</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-secondary h-2 rounded-full w-1/3"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITutor;