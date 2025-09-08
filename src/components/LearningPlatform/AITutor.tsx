import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bot, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  Languages,
  BookOpen,
  Calculator,
  Lightbulb,
  History,
  Star,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Download,
  Share,
  Zap,
  Brain,
  MessageCircle
} from "lucide-react";

const AITutor = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      type: 'ai',
      message: 'Hello! I am your AI teacher. I can help you with mathematics, science, and other subjects. You can talk to me in Hindi, English, Punjabi, or Urdu.',
      translation: 'नमस्ते! मैं आपका AI शिक्षक हूं। मैं गणित, विज्ञान, और अन्य विषयों में आपकी मदद कर सकता हूं। आप मुझसे हिंदी, अंग्रेजी, पंजाबी या उर्दू में बात कर सकते हैं।',
      timestamp: '2:30 PM',
      rating: null
    }
  ]);

  const languages = [
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
  ];

  const quickQuestions = [
    {
      hi: "द्विघात समीकरण कैसे हल करें?",
      en: "How to solve quadratic equations?",
      category: "Math"
    },
    {
      hi: "प्रकाश संश्लेषण क्या है?",
      en: "What is photosynthesis?",
      category: "Science"
    },
    {
      hi: "अंग्रेजी व्याकरण के नियम",
      en: "English grammar rules",
      category: "English"
    },
    {
      hi: "भारत का इतिहास",
      en: "History of India",
      category: "History"
    }
  ];

  const subjects = [
    { name: "गणित | Math", icon: Calculator, color: "bg-blue-500" },
    { name: "विज्ञान | Science", icon: Lightbulb, color: "bg-green-500" },
    { name: "अंग्रेजी | English", icon: BookOpen, color: "bg-purple-500" },
    { name: "इतिहास | History", icon: History, color: "bg-orange-500" },
  ];

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newUserMessage = {
      id: chatHistory.length + 1,
      type: 'user',
      message: inputMessage,
      translation: '',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      rating: null
    };

    setChatHistory(prev => [...prev, newUserMessage]);
    setInputMessage('');

    try {
      const AIService = (await import('@/lib/ai-services')).AIService;
      const aiMessage = await AIService.getChatResponse(inputMessage, currentLanguage);
      
      const aiResponse = {
        id: chatHistory.length + 2,
        type: 'ai',
        message: aiMessage,
        translation: currentLanguage === 'hi' ? 'Translated response' : 'अनुवादित उत्तर',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        rating: null
      };

      setChatHistory(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('AI response failed:', error);
    }
  };

  const generateAIResponse = (question: string) => {
    // Simulate intelligent responses based on question content
    if (question.toLowerCase().includes('quadratic') || question.includes('द्विघात')) {
      return currentLanguage === 'hi' ? 
        'द्विघात समीकरण ax² + bx + c = 0 के लिए, हम सूत्र x = (-b ± √(b²-4ac)) / 2a का उपयोग करते हैं। यहाँ a, b, c गुणांक हैं। क्या आप चाहते हैं कि मैं एक उदाहरण के साथ समझाऊं?' :
        'For quadratic equation ax² + bx + c = 0, we use the formula x = (-b ± √(b²-4ac)) / 2a. Here a, b, c are coefficients. Would you like me to explain with an example?';
    }
    
    if (question.toLowerCase().includes('photosynthesis') || question.includes('प्रकाश संश्लेषण')) {
      return currentLanguage === 'hi' ?
        'प्रकाश संश्लेषण एक प्रक्रिया है जिसमें पौधे सूर्य की रोशनी, कार्बन डाइऑक्साइड और पानी का उपयोग करके भोजन (ग्लूकोज) बनाते हैं। इस प्रक्रिया में ऑक्सीजन भी निकलती है। सूत्र: 6CO₂ + 6H₂O + प्रकाश ऊर्जा → C₆H₁₂O₆ + 6O₂' :
        'Photosynthesis is a process where plants use sunlight, carbon dioxide, and water to make food (glucose). This process also releases oxygen. Formula: 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂';
    }

    return currentLanguage === 'hi' ?
      'यह एक बहुत अच्छा प्रश्न है! मैं इसका विस्तृत उत्तर दे सकता हूं। क्या आप चाहते हैं कि मैं इसे चरणबद्ध तरीके से समझाऊं?' :
      'That\'s a great question! I can provide a detailed answer. Would you like me to explain this step by step?';
  };

  const generateTranslation = (question: string) => {
    if (currentLanguage === 'hi') {
      return 'Translation: ' + question; // In real app, use translation API
    }
    return 'अनुवाद: ' + question;
  };

  const rateMessage = (messageId: number, rating: 'up' | 'down') => {
    setChatHistory(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, rating } : msg
    ));
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">
                  {currentLanguage === 'hi' ? 'AI शिक्षक - शिक्षा सेतु' : 'AI Tutor - Shiksha Setu'}
                </h1>
                <p className="text-muted-foreground">
                  {currentLanguage === 'hi' ? 
                    '24/7 उपलब्ध • बहुभाषी समर्थन • तत्काल समाधान' : 
                    '24/7 Available • Multilingual Support • Instant Solutions'
                  }
                </p>
              </div>
            </div>
            
            {/* Language Selector */}
            <div className="flex items-center gap-2 bg-white rounded-lg p-2 shadow-sm">
              <Languages className="w-4 h-4" />
              {languages.map((lang) => (
                <Button
                  key={lang.code}
                  variant={currentLanguage === lang.code ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setCurrentLanguage(lang.code)}
                  className="text-xs"
                >
                  {lang.flag} {lang.name}
                </Button>
              ))}
            </div>
          </div>

          {/* AI Status */}
          <div className="flex items-center gap-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-700 font-medium">
                {currentLanguage === 'hi' ? 'AI सक्रिय' : 'AI Active'}
              </span>
            </div>
            <Badge className="bg-blue-100 text-blue-700">
              <Zap className="w-3 h-3 mr-1" />
              {currentLanguage === 'hi' ? 'तत्काल प्रतिक्रिया' : 'Instant Response'}
            </Badge>
            <Badge className="bg-purple-100 text-purple-700">
              <Brain className="w-3 h-3 mr-1" />
              {currentLanguage === 'hi' ? 'बुद्धिमान समाधान' : 'Smart Solutions'}
            </Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Chat Area */}
          <div className="lg:col-span-3">
            <Card className="h-[calc(100vh-12rem)]">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  {currentLanguage === 'hi' ? 'AI के साथ चैट करें' : 'Chat with AI'}
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[calc(100%-5rem)] flex flex-col">
                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                  {chatHistory.map((message) => (
                    <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-3 rounded-lg ${
                        message.type === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
                      }`}>
                        <div className="flex items-start gap-2">
                          {message.type === 'ai' && (
                            <Bot className="w-5 h-5 mt-1 text-blue-500" />
                          )}
                          <div className="flex-1">
                            <p className="text-sm">{message.message}</p>
                            {message.translation && (
                              <p className="text-xs opacity-75 mt-1 italic">{message.translation}</p>
                            )}
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs opacity-60">{message.timestamp}</span>
                              {message.type === 'ai' && (
                                <div className="flex items-center gap-1">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => rateMessage(message.id, 'up')}
                                    className={`p-1 h-6 ${message.rating === 'up' ? 'text-green-600' : ''}`}
                                  >
                                    <ThumbsUp className="w-3 h-3" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => rateMessage(message.id, 'down')}
                                    className={`p-1 h-6 ${message.rating === 'down' ? 'text-red-600' : ''}`}
                                  >
                                    <ThumbsDown className="w-3 h-3" />
                                  </Button>
                                  <Button variant="ghost" size="sm" className="p-1 h-6">
                                    <Copy className="w-3 h-3" />
                                  </Button>
                                  <Button variant="ghost" size="sm" className="p-1 h-6">
                                    <Share className="w-3 h-3" />
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input Area */}
                <div className="border-t pt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Button
                      variant={isListening ? "destructive" : "outline"}
                      size="sm"
                      onClick={() => setIsListening(!isListening)}
                    >
                      {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                      {currentLanguage === 'hi' ? 
                        (isListening ? 'रुकें' : 'बोलें') : 
                        (isListening ? 'Stop' : 'Speak')
                      }
                    </Button>
                    <Button
                      variant={isSpeaking ? "destructive" : "outline"}
                      size="sm"
                      onClick={() => setIsSpeaking(!isSpeaking)}
                    >
                      {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      {currentLanguage === 'hi' ? 
                        (isSpeaking ? 'मूक' : 'सुनें') : 
                        (isSpeaking ? 'Mute' : 'Listen')
                      }
                    </Button>
                  </div>
                  
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder={currentLanguage === 'hi' ? 
                        "अपना प्रश्न यहाँ लिखें..." : 
                        "Type your question here..."
                      }
                      className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button onClick={handleSendMessage} className="px-6">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Subjects */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">
                  {currentLanguage === 'hi' ? 'विषय' : 'Subjects'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {subjects.map((subject, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start p-3 h-auto"
                  >
                    <div className={`w-8 h-8 ${subject.color} rounded-lg flex items-center justify-center mr-3`}>
                      <subject.icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm">{subject.name}</span>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Quick Questions */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">
                  {currentLanguage === 'hi' ? 'त्वरित प्रश्न' : 'Quick Questions'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full text-left p-3 h-auto justify-start"
                    onClick={() => setInputMessage(currentLanguage === 'hi' ? question.hi : question.en)}
                  >
                    <div>
                      <p className="text-sm font-medium">
                        {currentLanguage === 'hi' ? question.hi : question.en}
                      </p>
                      <Badge variant="secondary" className="mt-1 text-xs">
                        {question.category}
                      </Badge>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* AI Features */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">
                  {currentLanguage === 'hi' ? 'AI सुविधाएं' : 'AI Features'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>{currentLanguage === 'hi' ? 'व्यक्तिगत शिक्षण' : 'Personalized Learning'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Languages className="w-4 h-4 text-blue-500" />
                  <span>{currentLanguage === 'hi' ? 'बहुभाषी समर्थन' : 'Multilingual Support'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Zap className="w-4 h-4 text-green-500" />
                  <span>{currentLanguage === 'hi' ? 'तत्काल समाधान' : 'Instant Solutions'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Brain className="w-4 h-4 text-purple-500" />
                  <span>{currentLanguage === 'hi' ? 'बुद्धिमान विश्लेषण' : 'Smart Analysis'}</span>
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