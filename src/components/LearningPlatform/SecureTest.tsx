import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  Camera, 
  Eye, 
  EyeOff, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Monitor,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Lock,
  Unlock,
  Flag,
  Send,
  Languages
} from "lucide-react";

const SecureTest = () => {
  const [currentLanguage, setCurrentLanguage] = useState('hi');
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(3600); // 1 hour in seconds
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{[key: number]: string}>({});
  const [violations, setViolations] = useState<string[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const languages = [
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
  ];

  const testQuestions = [
    {
      id: 1,
      question: {
        hi: "द्विघात समीकरण ax² + bx + c = 0 में यदि a = 1, b = -5, c = 6 हो तो x के मान क्या होंगे?",
        en: "In the quadratic equation ax² + bx + c = 0, if a = 1, b = -5, c = 6, what are the values of x?"
      },
      options: {
        hi: ["x = 2, 3", "x = 1, 6", "x = -2, -3", "x = 0, 5"],
        en: ["x = 2, 3", "x = 1, 6", "x = -2, -3", "x = 0, 5"]
      },
      correct: 0,
      type: "mcq"
    },
    {
      id: 2,
      question: {
        hi: "प्रकाश संश्लेषण की प्रक्रिया में कौन सी गैस निकलती है?",
        en: "Which gas is released during the process of photosynthesis?"
      },
      options: {
        hi: ["कार्बन डाइऑक्साइड", "ऑक्सीजन", "नाइट्रोजन", "हाइड्रोजन"],
        en: ["Carbon Dioxide", "Oxygen", "Nitrogen", "Hydrogen"]
      },
      correct: 1,
      type: "mcq"
    },
    {
      id: 3,
      question: {
        hi: "भारत की राजधानी कौन सी है?",
        en: "What is the capital of India?"
      },
      type: "text",
      answer: {
        hi: "नई दिल्ली",
        en: "New Delhi"
      }
    }
  ];

  // Security monitoring
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && isTestStarted) {
        setTabSwitchCount(prev => prev + 1);
        setViolations(prev => [...prev, `Tab switch detected at ${new Date().toLocaleTimeString()}`]);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent common shortcuts during test
      if (isTestStarted && (
        e.ctrlKey && (e.key === 'c' || e.key === 'v' || e.key === 'a' || e.key === 't') ||
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I')
      )) {
        e.preventDefault();
        setViolations(prev => [...prev, `Prohibited key combination: ${e.key} at ${new Date().toLocaleTimeString()}`]);
      }
    };

    const handleRightClick = (e: MouseEvent) => {
      if (isTestStarted) {
        e.preventDefault();
        setViolations(prev => [...prev, `Right-click attempt at ${new Date().toLocaleTimeString()}`]);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('contextmenu', handleRightClick);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('contextmenu', handleRightClick);
    };
  }, [isTestStarted]);

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTestStarted && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTestStarted, timeRemaining]);

  // Camera access
  useEffect(() => {
    if (isCameraOn && videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: isMicOn })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(err => {
          console.error('Camera access denied:', err);
          setViolations(prev => [...prev, 'Camera access denied']);
        });
    }
  }, [isCameraOn, isMicOn]);

  const startTest = () => {
    setIsTestStarted(true);
    // Request fullscreen
    document.documentElement.requestFullscreen().catch(() => {
      setViolations(prev => [...prev, 'Fullscreen mode denied']);
    });
  };

  const submitTest = () => {
    setIsTestStarted(false);
    document.exitFullscreen().catch(() => {});
    // Process test submission
    alert(currentLanguage === 'hi' ? 'परीक्षा सबमिट हो गई!' : 'Test submitted successfully!');
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  if (!isTestStarted) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="container mx-auto max-w-4xl">
          {/* Language Selector */}
          <div className="mb-6 flex justify-end">
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

          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl">
                {currentLanguage === 'hi' ? 'सुरक्षित ऑनलाइन परीक्षा' : 'Secure Online Test'}
              </CardTitle>
              <p className="text-muted-foreground">
                {currentLanguage === 'hi' ? 
                  'गणित और विज्ञान - कक्षा 10 | समय: 60 मिनट' : 
                  'Mathematics and Science - Grade 10 | Duration: 60 minutes'
                }
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Security Requirements */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  {currentLanguage === 'hi' ? 'सुरक्षा आवश्यकताएं' : 'Security Requirements'}
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <Camera className={`w-5 h-5 ${isCameraOn ? 'text-green-500' : 'text-red-500'}`} />
                    <div>
                      <div className="font-medium">
                        {currentLanguage === 'hi' ? 'कैमरा निगरानी' : 'Camera Monitoring'}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {currentLanguage === 'hi' ? 'चेहरा पहचान सक्रिय' : 'Face detection active'}
                      </div>
                    </div>
                    <Badge className={isCameraOn ? 'bg-green-500' : 'bg-red-500'}>
                      {isCameraOn ? (currentLanguage === 'hi' ? 'सक्रिय' : 'Active') : (currentLanguage === 'hi' ? 'निष्क्रिय' : 'Inactive')}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <Monitor className="w-5 h-5 text-blue-500" />
                    <div>
                      <div className="font-medium">
                        {currentLanguage === 'hi' ? 'स्क्रीन निगरानी' : 'Screen Monitoring'}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {currentLanguage === 'hi' ? 'टैब स्विच का पता लगाना' : 'Tab switch detection'}
                      </div>
                    </div>
                    <Badge className="bg-blue-500">
                      {currentLanguage === 'hi' ? 'सक्रिय' : 'Active'}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <Mic className={`w-5 h-5 ${isMicOn ? 'text-green-500' : 'text-red-500'}`} />
                    <div>
                      <div className="font-medium">
                        {currentLanguage === 'hi' ? 'ऑडियो निगरानी' : 'Audio Monitoring'}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {currentLanguage === 'hi' ? 'आवाज़ की पहचान' : 'Voice detection'}
                      </div>
                    </div>
                    <Badge className={isMicOn ? 'bg-green-500' : 'bg-red-500'}>
                      {isMicOn ? (currentLanguage === 'hi' ? 'सक्रिय' : 'Active') : (currentLanguage === 'hi' ? 'निष्क्रिय' : 'Inactive')}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <Lock className="w-5 h-5 text-purple-500" />
                    <div>
                      <div className="font-medium">
                        {currentLanguage === 'hi' ? 'ब्राउज़र लॉक' : 'Browser Lock'}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {currentLanguage === 'hi' ? 'फुलस्क्रीन मोड' : 'Fullscreen mode'}
                      </div>
                    </div>
                    <Badge className="bg-purple-500">
                      {currentLanguage === 'hi' ? 'आवश्यक' : 'Required'}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Camera Preview */}
              <div className="space-y-2">
                <h4 className="font-medium">
                  {currentLanguage === 'hi' ? 'कैमरा पूर्वावलोकन' : 'Camera Preview'}
                </h4>
                <div className="relative w-48 h-36 bg-gray-900 rounded-lg overflow-hidden mx-auto">
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-red-500 animate-pulse">
                      {currentLanguage === 'hi' ? 'रिकॉर्डिंग' : 'Recording'}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-medium text-yellow-800 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  {currentLanguage === 'hi' ? 'महत्वपूर्ण निर्देश' : 'Important Instructions'}
                </h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• {currentLanguage === 'hi' ? 'परीक्षा के दौरान टैब न बदलें' : 'Do not switch tabs during the test'}</li>
                  <li>• {currentLanguage === 'hi' ? 'कैमरा और माइक्रोफोन सक्रिय रखें' : 'Keep camera and microphone active'}</li>
                  <li>• {currentLanguage === 'hi' ? 'फुलस्क्रीन मोड से बाहर न निकलें' : 'Do not exit fullscreen mode'}</li>
                  <li>• {currentLanguage === 'hi' ? 'कोई बाहरी सहायता न लें' : 'Do not take external help'}</li>
                </ul>
              </div>

              {/* Start Test Button */}
              <div className="text-center">
                <Button 
                  onClick={startTest}
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
                >
                  <Shield className="w-5 h-5 mr-2" />
                  {currentLanguage === 'hi' ? 'सुरक्षित परीक्षा शुरू करें' : 'Start Secure Test'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Security Header */}
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-red-500" />
            <span className="text-red-700 font-medium">
              {currentLanguage === 'hi' ? 'सुरक्षित परीक्षा मोड सक्रिय' : 'Secure Test Mode Active'}
            </span>
            {violations.length > 0 && (
              <Badge className="bg-red-500 text-white">
                {violations.length} {currentLanguage === 'hi' ? 'उल्लंघन' : 'Violations'}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="font-mono text-lg">{formatTime(timeRemaining)}</span>
            </div>
            <Button onClick={submitTest} variant="destructive" size="sm">
              {currentLanguage === 'hi' ? 'परीक्षा समाप्त करें' : 'End Test'}
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Test Area */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>
                    {currentLanguage === 'hi' ? `प्रश्न ${currentQuestion + 1} / ${testQuestions.length}` : `Question ${currentQuestion + 1} / ${testQuestions.length}`}
                  </CardTitle>
                  <Progress value={((currentQuestion + 1) / testQuestions.length) * 100} className="w-32" />
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Question */}
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h3 className="text-lg font-medium mb-4">
                    {testQuestions[currentQuestion].question[currentLanguage as 'hi' | 'en']}
                  </h3>
                  
                  {testQuestions[currentQuestion].type === 'mcq' ? (
                    <div className="space-y-3">
                      {testQuestions[currentQuestion].options?.[currentLanguage as 'hi' | 'en']?.map((option, index) => (
                        <label key={index} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50">
                          <input
                            type="radio"
                            name={`question-${testQuestions[currentQuestion].id}`}
                            value={index.toString()}
                            onChange={(e) => handleAnswerChange(testQuestions[currentQuestion].id, e.target.value)}
                            className="w-4 h-4"
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  ) : (
                    <textarea
                      placeholder={currentLanguage === 'hi' ? 'अपना उत्तर यहाँ लिखें...' : 'Write your answer here...'}
                      className="w-full p-3 border rounded-lg h-32 resize-none"
                      onChange={(e) => handleAnswerChange(testQuestions[currentQuestion].id, e.target.value)}
                    />
                  )}
                </div>

                {/* Navigation */}
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                    disabled={currentQuestion === 0}
                  >
                    {currentLanguage === 'hi' ? 'पिछला' : 'Previous'}
                  </Button>
                  
                  {currentQuestion === testQuestions.length - 1 ? (
                    <Button onClick={submitTest} className="bg-green-600 hover:bg-green-700">
                      <Send className="w-4 h-4 mr-2" />
                      {currentLanguage === 'hi' ? 'परीक्षा जमा करें' : 'Submit Test'}
                    </Button>
                  ) : (
                    <Button
                      onClick={() => setCurrentQuestion(Math.min(testQuestions.length - 1, currentQuestion + 1))}
                    >
                      {currentLanguage === 'hi' ? 'अगला' : 'Next'}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Camera Monitor */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Camera className="w-5 h-5" />
                  {currentLanguage === 'hi' ? 'निगरानी' : 'Monitoring'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative w-full h-32 bg-gray-900 rounded-lg overflow-hidden mb-3">
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-red-500 animate-pulse text-xs">
                      {currentLanguage === 'hi' ? 'लाइव' : 'Live'}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>{currentLanguage === 'hi' ? 'चेहरा पहचान:' : 'Face Detection:'}</span>
                    <Badge className="bg-green-500 text-xs">
                      {currentLanguage === 'hi' ? 'सक्रिय' : 'Active'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>{currentLanguage === 'hi' ? 'टैब स्विच:' : 'Tab Switches:'}</span>
                    <Badge variant="outline" className="text-xs">
                      {tabSwitchCount}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Question Navigator */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">
                  {currentLanguage === 'hi' ? 'प्रश्न नेवीगेटर' : 'Question Navigator'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2">
                  {testQuestions.map((_, index) => (
                    <Button
                      key={index}
                      variant={currentQuestion === index ? "default" : answers[testQuestions[index].id] ? "outline" : "ghost"}
                      size="sm"
                      onClick={() => setCurrentQuestion(index)}
                      className="aspect-square p-0"
                    >
                      {index + 1}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Violations Log */}
            {violations.length > 0 && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-red-600 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    {currentLanguage === 'hi' ? 'उल्लंघन लॉग' : 'Violations Log'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {violations.map((violation, index) => (
                      <div key={index} className="text-xs p-2 bg-red-50 border border-red-200 rounded">
                        {violation}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecureTest;