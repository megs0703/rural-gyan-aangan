import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Video, 
  Users, 
  Mic, 
  MicOff, 
  VideoOff, 
  Share, 
  MessageSquare,
  Hand,
  Settings,
  Pen,
  Eraser,
  Square,
  Circle,
  Type,
  Download,
  Upload,
  Eye,
  EyeOff,
  Shield,
  AlertTriangle,
  Camera,
  Monitor,
  Languages
} from "lucide-react";

const VirtualClassroom = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [selectedTool, setSelectedTool] = useState('pen');
  const [isMonitoring, setIsMonitoring] = useState(true);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Tab monitoring simulation
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && isMonitoring) {
        setTabSwitchCount(prev => prev + 1);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isMonitoring]);

  const drawingTools = [
    { id: 'pen', icon: Pen, label: 'Pen' },
    { id: 'eraser', icon: Eraser, label: 'Eraser' },
    { id: 'rectangle', icon: Square, label: 'Rectangle' },
    { id: 'circle', icon: Circle, label: 'Circle' },
    { id: 'text', icon: Type, label: 'Text' },
  ];

  const languages = [
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
    { code: 'ur', name: 'اردو', flag: '🇵🇰' },
  ];

  const startDrawing = (e: React.MouseEvent) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto">
        {/* Security Alert */}
        {tabSwitchCount > 0 && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <span className="text-red-700">
              चेतावनी: टैब स्विचिंग का पता चला {tabSwitchCount} बार। यह गतिविधि निगरानी में है।
              Warning: Tab switching detected {tabSwitchCount} time(s). This activity is being monitored.
            </span>
          </div>
        )}

        {/* Language Selector */}
        <div className="mb-4 flex justify-end">
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

        <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-8rem)]">
          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-4">
            <Card className="h-full">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">
                      {currentLanguage === 'hi' ? 'गणित कक्षा - कक्षा 10' : 'Mathematics Class - Grade 10'}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {currentLanguage === 'hi' ? 'शिक्षक: राम प्रकाश शर्मा' : 'Teacher: Ram Prakash Sharma'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-red-500 text-white animate-pulse">
                      🔴 LIVE
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      {currentLanguage === 'hi' ? 'निगरानी में' : 'Monitored'}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Camera className="w-3 h-3" />
                      {currentLanguage === 'hi' ? 'एआई निगरानी' : 'AI Monitoring'}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="h-[calc(100%-5rem)]">
                <Tabs defaultValue="whiteboard" className="h-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="whiteboard">
                      {currentLanguage === 'hi' ? 'व्हाइटबोर्ड' : 'Whiteboard'}
                    </TabsTrigger>
                    <TabsTrigger value="video">
                      {currentLanguage === 'hi' ? 'वीडियो स्ट्रीम' : 'Video Stream'}
                    </TabsTrigger>
                    <TabsTrigger value="screen">
                      {currentLanguage === 'hi' ? 'स्क्रीन शेयर' : 'Screen Share'}
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="whiteboard" className="h-[calc(100%-3rem)] mt-4">
                    <div className="h-full border rounded-lg relative bg-white">
                      {/* Drawing Tools */}
                      <div className="absolute top-2 left-2 flex items-center gap-1 bg-white rounded-lg shadow-md p-2 z-10">
                        {drawingTools.map((tool) => (
                          <Button
                            key={tool.id}
                            variant={selectedTool === tool.id ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setSelectedTool(tool.id)}
                            className="p-2"
                          >
                            <tool.icon className="w-4 h-4" />
                          </Button>
                        ))}
                        <div className="w-px h-6 bg-gray-300 mx-1" />
                        <Button variant="ghost" size="sm" className="p-2">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="p-2">
                          <Upload className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      {/* Canvas */}
                      <canvas
                        ref={canvasRef}
                        width={800}
                        height={600}
                        className="w-full h-full cursor-crosshair"
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                      />
                      
                      {/* Sample Math Content */}
                      <div className="absolute top-20 left-4 bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                        <h3 className="font-bold text-lg mb-2">
                          {currentLanguage === 'hi' ? 'द्विघात समीकरण' : 'Quadratic Equation'}
                        </h3>
                        <div className="text-2xl font-mono mb-2">ax² + bx + c = 0</div>
                        <div className="text-lg">
                          {currentLanguage === 'hi' ? 'हल:' : 'Solution:'} x = (-b ± √(b²-4ac)) / 2a
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="video" className="h-[calc(100%-3rem)] mt-4">
                    <div className="bg-gray-900 rounded-lg h-full flex items-center justify-center relative">
                      <div className="text-white text-center">
                        <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg">
                          {currentLanguage === 'hi' ? 'शिक्षक का वीडियो स्ट्रीम' : "Teacher's Video Stream"}
                        </p>
                        <p className="text-sm opacity-75">
                          {currentLanguage === 'hi' ? 'HD गुणवत्ता • 24 छात्र देख रहे हैं' : 'HD Quality • 24 students watching'}
                        </p>
                      </div>
                      
                      {/* Engagement Detection Overlay */}
                      <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                        {currentLanguage === 'hi' ? '95% सक्रिय' : '95% Engaged'}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="screen" className="h-[calc(100%-3rem)] mt-4">
                    <div className="bg-gray-100 rounded-lg h-full flex items-center justify-center">
                      <div className="text-center">
                        <Monitor className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg">
                          {currentLanguage === 'hi' ? 'स्क्रीन साझाकरण' : 'Screen Sharing'}
                        </p>
                        <p className="text-sm opacity-75">
                          {currentLanguage === 'hi' ? 'शिक्षक की स्क्रीन यहाँ दिखेगी' : "Teacher's screen will appear here"}
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
                
                {/* Control Bar */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-3 bg-black/80 rounded-full px-6 py-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMuted(!isMuted)}
                    className={`rounded-full ${isMuted ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-600 hover:bg-gray-700'} text-white`}
                  >
                    {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsVideoOff(!isVideoOff)}
                    className={`rounded-full ${isVideoOff ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-600 hover:bg-gray-700'} text-white`}
                  >
                    {isVideoOff ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsHandRaised(!isHandRaised)}
                    className={`rounded-full ${isHandRaised ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-gray-600 hover:bg-gray-700'} text-white`}
                  >
                    <Hand className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMonitoring(!isMonitoring)}
                    className={`rounded-full ${isMonitoring ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-600 hover:bg-gray-700'} text-white`}
                  >
                    {isMonitoring ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="rounded-full bg-gray-600 hover:bg-gray-700 text-white">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Participants */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  {currentLanguage === 'hi' ? 'सहभागी (24)' : 'Participants (24)'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 max-h-48 overflow-y-auto">
                {[
                  { name: "राम प्रकाश शर्मा", role: "Teacher", status: "speaking", engagement: 100 },
                  { name: "प्रिया कुमारी", role: "Student", status: "hand-raised", engagement: 95 },
                  { name: "अमित सिंह", role: "Student", status: "online", engagement: 88 },
                  { name: "सुनीता देवी", role: "Student", status: "online", engagement: 92 },
                  { name: "राज कुमार", role: "Student", status: "distracted", engagement: 45 },
                ].map((participant, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        participant.status === 'speaking' ? 'bg-green-500 animate-pulse' :
                        participant.status === 'hand-raised' ? 'bg-yellow-500' :
                        participant.status === 'distracted' ? 'bg-red-500' :
                        'bg-gray-400'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{participant.name}</p>
                        <div className="flex items-center gap-2">
                          <p className="text-xs text-muted-foreground">
                            {currentLanguage === 'hi' ? 
                              (participant.role === 'Teacher' ? 'शिक्षक' : 'छात्र') : 
                              participant.role
                            }
                          </p>
                          <span className={`text-xs px-1 rounded ${
                            participant.engagement > 80 ? 'bg-green-100 text-green-700' :
                            participant.engagement > 60 ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {participant.engagement}%
                          </span>
                        </div>
                      </div>
                    </div>
                    {participant.status === 'hand-raised' && (
                      <Hand className="w-4 h-4 text-yellow-500" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Chat */}
            <Card className="flex-1">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  {currentLanguage === 'hi' ? 'चैट' : 'Chat'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {[
                    { 
                      user: "प्रिया", 
                      message: currentLanguage === 'hi' ? 
                        "सर, क्या आप इस सूत्र को फिर से समझा सकते हैं?" : 
                        "Sir, can you explain this formula again?", 
                      time: "2:34 PM", 
                      translated: true 
                    },
                    { 
                      user: "Teacher", 
                      message: currentLanguage === 'hi' ? 
                        "जरूर! मैं इसे व्हाइटबोर्ड पर बनाता हूं" : 
                        "Sure! Let me draw it on the whiteboard", 
                      time: "2:35 PM", 
                      translated: true 
                    },
                    { 
                      user: "अमित", 
                      message: currentLanguage === 'hi' ? 
                        "धन्यवाद सर! 🙏" : 
                        "Thank you sir! 🙏", 
                      time: "2:36 PM", 
                      translated: true 
                    },
                  ].map((chat, index) => (
                    <div key={index} className="p-2 rounded-lg bg-muted/30">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{chat.user}</span>
                        <div className="flex items-center gap-1">
                          {chat.translated && (
                            <Badge variant="outline" className="text-xs px-1 py-0">
                              {currentLanguage === 'hi' ? 'अनुवादित' : 'Translated'}
                            </Badge>
                          )}
                          <span className="text-xs text-muted-foreground">{chat.time}</span>
                        </div>
                      </div>
                      <p className="text-sm">{chat.message}</p>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder={currentLanguage === 'hi' ? 
                      "अपना संदेश टाइप करें..." : 
                      "Type your message..."
                    }
                    className="flex-1 px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Button size="sm">
                    {currentLanguage === 'hi' ? 'भेजें' : 'Send'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualClassroom;