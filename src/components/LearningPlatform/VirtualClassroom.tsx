import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Users, 
  MessageCircle, 
  Share, 
  Hand,
  Settings,
  PenTool,
  FileText,
  Download,
  Upload,
  Monitor
} from "lucide-react";

const VirtualClassroom = () => {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isHandRaised, setIsHandRaised] = useState(false);

  const participants = [
    { name: "राज शर्मा", role: "Teacher", isActive: true },
    { name: "प्रिया पटेल", role: "Student", isActive: true },
    { name: "अमित कुमार", role: "Student", isActive: false },
    { name: "सुनीता देवी", role: "Student", isActive: true },
  ];

  return (
    <div className="min-h-screen bg-muted/30 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">गणित कक्षा - बीजगणित</h1>
            <p className="text-muted-foreground">Class 10 • Ms. Sharma • 45 minutes remaining</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-success text-success-foreground">
              🔴 Live
            </Badge>
            <Badge variant="outline">
              <Users className="w-3 h-3 mr-1" />
              24 Students
            </Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Video Area */}
          <div className="lg:col-span-3 space-y-4">
            {/* Teacher's Video */}
            <Card className="overflow-hidden shadow-medium">
              <CardContent className="p-0">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 relative flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-2xl font-bold">MS</span>
                    </div>
                    <h3 className="text-lg font-semibold">Ms. Sharma</h3>
                    <Badge className="bg-secondary mt-2">Teacher</Badge>
                  </div>
                  
                  {/* Video Controls Overlay */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
                    <Button
                      variant={isVideoOn ? "default" : "destructive"}
                      size="icon"
                      onClick={() => setIsVideoOn(!isVideoOn)}
                      className="rounded-full"
                    >
                      {isVideoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                    </Button>
                    <Button
                      variant={isMicOn ? "default" : "destructive"}
                      size="icon"
                      onClick={() => setIsMicOn(!isMicOn)}
                      className="rounded-full"
                    >
                      {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                    </Button>
                    <Button
                      variant={isHandRaised ? "warning" : "ghost"}
                      size="icon"
                      onClick={() => setIsHandRaised(!isHandRaised)}
                      className="rounded-full"
                    >
                      <Hand className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Share className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Virtual Whiteboard */}
            <Card className="shadow-medium">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <PenTool className="w-5 h-5" />
                    Virtual Whiteboard
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-white border-2 border-border rounded-lg relative overflow-hidden">
                  <div className="absolute inset-4 flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <PenTool className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Interactive whiteboard area</p>
                      <p className="text-sm">Draw, write equations, share content</p>
                    </div>
                  </div>
                  
                  {/* Sample math equation */}
                  <div className="absolute top-4 left-4 bg-primary/10 p-3 rounded-lg">
                    <div className="text-lg font-mono">x² + 5x + 6 = 0</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Participants */}
            <Card className="shadow-soft">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Users className="w-4 h-4" />
                  Participants ({participants.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {participants.map((participant, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            {participant.name.split(' ')[0][0]}
                          </span>
                        </div>
                        {participant.isActive && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{participant.name}</p>
                        <p className="text-xs text-muted-foreground">{participant.role}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="w-6 h-6">
                      <MessageCircle className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Chat & Resources */}
            <Card className="shadow-soft">
              <Tabs defaultValue="chat" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="chat">Chat</TabsTrigger>
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                </TabsList>
                
                <TabsContent value="chat" className="p-4 space-y-3">
                  <div className="space-y-3 max-h-48 overflow-y-auto">
                    <div className="text-xs">
                      <span className="font-medium text-primary">प्रिया:</span>
                      <span className="ml-2">Sir, can you repeat the formula?</span>
                    </div>
                    <div className="text-xs">
                      <span className="font-medium text-secondary">Teacher:</span>
                      <span className="ml-2">Of course! x = (-b ± √(b²-4ac)) / 2a</span>
                    </div>
                    <div className="text-xs">
                      <span className="font-medium text-primary">अमित:</span>
                      <span className="ml-2">Thank you sir! 🙏</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Type your message..."
                      className="flex-1 px-3 py-2 text-xs border border-border rounded-md"
                    />
                    <Button size="sm" variant="default">
                      Send
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="resources" className="p-4 space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-md">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="text-sm">Algebra Notes.pdf</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-md">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="text-sm">Practice Problems</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-md">
                      <Monitor className="w-4 h-4 text-primary" />
                      <span className="text-sm">Recorded Sessions</span>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualClassroom;