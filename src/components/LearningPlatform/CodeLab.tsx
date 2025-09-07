import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Code, 
  Play, 
  Save, 
  Download, 
  Upload, 
  Share, 
  Settings,
  Terminal,
  FileText,
  Folder,
  Plus,
  Trash2,
  Copy,
  Eye,
  EyeOff,
  Zap,
  BookOpen,
  Video,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Languages
} from "lucide-react";

const CodeLab = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [currentLanguage, setCurrentLanguage] = useState('hi');
  const [code, setCode] = useState(`# Welcome to CodeLab - शिक्षा सेतु
# आपका पहला Python प्रोग्राम | Your first Python program

def greet(name):
    return f"नमस्ते {name}! Hello {name}!"

# मुख्य कोड | Main code
if __name__ == "__main__":
    student_name = "प्रिया"  # Student name
    message = greet(student_name)
    print(message)
    
    # गणित की गणना | Math calculation
    a = 10
    b = 20
    result = a + b
    print(f"योग | Sum: {a} + {b} = {result}")
`);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const programmingLanguages = [
    { id: 'python', name: 'Python', icon: '🐍', color: 'bg-green-500' },
    { id: 'javascript', name: 'JavaScript', icon: '🟨', color: 'bg-yellow-500' },
    { id: 'java', name: 'Java', icon: '☕', color: 'bg-red-500' },
    { id: 'cpp', name: 'C++', icon: '⚡', color: 'bg-blue-500' },
    { id: 'html', name: 'HTML/CSS', icon: '🌐', color: 'bg-orange-500' },
    { id: 'scratch', name: 'Scratch', icon: '🐱', color: 'bg-purple-500' },
  ];

  const languages = [
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
  ];

  const codeTemplates = {
    python: {
      basic: `# बेसिक Python प्रोग्राम | Basic Python Program
print("नमस्ते दुनिया! Hello World!")

# वेरिएबल्स | Variables
name = "छात्र"  # Student
age = 15
print(f"नाम: {name}, उम्र: {age}")`,
      
      math: `# गणित की समस्या | Math Problem
import math

def quadratic_formula(a, b, c):
    """द्विघात समीकरण हल करें | Solve quadratic equation"""
    discriminant = b**2 - 4*a*c
    
    if discriminant > 0:
        x1 = (-b + math.sqrt(discriminant)) / (2*a)
        x2 = (-b - math.sqrt(discriminant)) / (2*a)
        return x1, x2
    elif discriminant == 0:
        x = -b / (2*a)
        return x, x
    else:
        return "कोई वास्तविक हल नहीं | No real solution"

# उदाहरण | Example: x² + 5x + 6 = 0
result = quadratic_formula(1, 5, 6)
print(f"हल | Solution: {result}")`,

      loops: `# लूप्स का उदाहरण | Loops Example

# For लूप | For loop
print("पहाड़ा | Multiplication Table:")
for i in range(1, 11):
    print(f"2 × {i} = {2 * i}")

print("\\n" + "="*30 + "\\n")

# While लूप | While loop
count = 1
print("गिनती | Counting:")
while count <= 5:
    print(f"संख्या | Number: {count}")
    count += 1`
    },
    
    javascript: {
      basic: `// बेसिक JavaScript प्रोग्राम | Basic JavaScript Program
console.log("नमस्ते दुनिया! Hello World!");

// वेरिएबल्स | Variables
let name = "छात्र"; // Student
let age = 15;
console.log(\`नाम: \${name}, उम्र: \${age}\`);`,
      
      functions: `// फंक्शन्स | Functions
function greetStudent(name, grade) {
    return \`नमस्ते \${name}! आप कक्षा \${grade} में हैं।
Hello \${name}! You are in grade \${grade}.\`;
}

// उदाहरण | Example
let message = greetStudent("प्रिया", 10);
console.log(message);

// गणित फंक्शन | Math function
function calculateArea(length, width) {
    return length * width;
}

let area = calculateArea(10, 5);
console.log(\`क्षेत्रफल | Area: \${area} वर्ग मीटर\`);`
    }
  };

  const projects = [
    {
      title: "कैलकुलेटर | Calculator",
      description: "एक सरल कैलकुलेटर बनाएं | Build a simple calculator",
      difficulty: "Beginner",
      language: "Python",
      time: "30 min"
    },
    {
      title: "गेम | Guess the Number",
      description: "संख्या अनुमान गेम | Number guessing game",
      difficulty: "Beginner", 
      language: "Python",
      time: "45 min"
    },
    {
      title: "वेबसाइट | Personal Website",
      description: "अपनी वेबसाइट बनाएं | Create your own website",
      difficulty: "Intermediate",
      language: "HTML/CSS",
      time: "2 hours"
    }
  ];

  const runCode = async () => {
    setIsRunning(true);
    setOutput('कोड चल रहा है... | Running code...\n');
    
    try {
      const CompilerService = (await import('@/lib/compiler-service')).default;
      const result = await CompilerService.executeCode(code, selectedLanguage);
      
      if (result.stderr) {
        setOutput(`Error:\n${result.stderr}`);
      } else {
        setOutput(`${result.stdout || 'Program executed successfully!'}\n\nTime: ${result.time}s\nMemory: ${result.memory} KB`);
      }
    } catch (error) {
      setOutput('Execution failed. Please try again.');
    } finally {
      setIsRunning(false);
    }
  };

  const loadTemplate = (category: string) => {
    if (codeTemplates[selectedLanguage as keyof typeof codeTemplates]) {
      setCode(codeTemplates[selectedLanguage as keyof typeof codeTemplates][category as keyof typeof codeTemplates.python]);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                <Code className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">
                  {currentLanguage === 'hi' ? 'कोड लैब - शिक्षा सेतु' : 'Code Lab - Shiksha Setu'}
                </h1>
                <p className="text-muted-foreground">
                  {currentLanguage === 'hi' ? 
                    'ऑनलाइन कोडिंग वातावरण • तत्काल निष्पादन • सहयोग' : 
                    'Online Coding Environment • Instant Execution • Collaboration'
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

          {/* Programming Language Selector */}
          <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg overflow-x-auto">
            {programmingLanguages.map((lang) => (
              <Button
                key={lang.id}
                variant={selectedLanguage === lang.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedLanguage(lang.id)}
                className="flex items-center gap-2 whitespace-nowrap"
              >
                <span>{lang.icon}</span>
                <span>{lang.name}</span>
              </Button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Coding Area */}
          <div className="lg:col-span-3 space-y-4">
            {/* Code Editor */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Code className="w-5 h-5" />
                    {currentLanguage === 'hi' ? 'कोड एडिटर' : 'Code Editor'}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Save className="w-4 h-4 mr-2" />
                      {currentLanguage === 'hi' ? 'सेव' : 'Save'}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share className="w-4 h-4 mr-2" />
                      {currentLanguage === 'hi' ? 'शेयर' : 'Share'}
                    </Button>
                    <Button 
                      onClick={runCode} 
                      disabled={isRunning}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {isRunning ? (
                        <Clock className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Play className="w-4 h-4 mr-2" />
                      )}
                      {currentLanguage === 'hi' ? 'चलाएं' : 'Run'}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-96">
                  {/* Code Input */}
                  <div className="border rounded-lg">
                    <div className="bg-muted/30 px-3 py-2 border-b flex items-center justify-between">
                      <span className="text-sm font-medium">
                        {currentLanguage === 'hi' ? 'कोड लिखें' : 'Write Code'}
                      </span>
                      <Badge variant="outline">{selectedLanguage}</Badge>
                    </div>
                    <textarea
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="w-full h-full p-3 font-mono text-sm resize-none border-0 focus:outline-none"
                      placeholder={currentLanguage === 'hi' ? 
                        "यहाँ अपना कोड लिखें..." : 
                        "Write your code here..."
                      }
                    />
                  </div>
                  
                  {/* Output */}
                  <div className="border rounded-lg">
                    <div className="bg-muted/30 px-3 py-2 border-b flex items-center justify-between">
                      <span className="text-sm font-medium">
                        {currentLanguage === 'hi' ? 'आउटपुट' : 'Output'}
                      </span>
                      <div className="flex items-center gap-1">
                        {isRunning ? (
                          <Badge className="bg-yellow-500">
                            {currentLanguage === 'hi' ? 'चल रहा है' : 'Running'}
                          </Badge>
                        ) : (
                          <Badge className="bg-green-500">
                            {currentLanguage === 'hi' ? 'तैयार' : 'Ready'}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="p-3 h-full bg-gray-900 text-green-400 font-mono text-sm overflow-y-auto">
                      <pre className="whitespace-pre-wrap">{output || (currentLanguage === 'hi' ? 'आउटपुट यहाँ दिखेगा...' : 'Output will appear here...')}</pre>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Code Templates */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  {currentLanguage === 'hi' ? 'कोड टेम्प्लेट्स' : 'Code Templates'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Button
                    variant="outline"
                    className="p-4 h-auto flex flex-col items-start"
                    onClick={() => loadTemplate('basic')}
                  >
                    <div className="font-medium mb-1">
                      {currentLanguage === 'hi' ? 'बेसिक प्रोग्राम' : 'Basic Program'}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {currentLanguage === 'hi' ? 'शुरुआती कोड' : 'Starter code'}
                    </div>
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="p-4 h-auto flex flex-col items-start"
                    onClick={() => loadTemplate('math')}
                  >
                    <div className="font-medium mb-1">
                      {currentLanguage === 'hi' ? 'गणित की समस्या' : 'Math Problem'}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {currentLanguage === 'hi' ? 'गणितीय गणना' : 'Mathematical calculations'}
                    </div>
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="p-4 h-auto flex flex-col items-start"
                    onClick={() => loadTemplate('loops')}
                  >
                    <div className="font-medium mb-1">
                      {currentLanguage === 'hi' ? 'लूप्स' : 'Loops'}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {currentLanguage === 'hi' ? 'दोहराव की संरचना' : 'Repetition structures'}
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Projects */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">
                  {currentLanguage === 'hi' ? 'प्रोजेक्ट्स' : 'Projects'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {projects.map((project, index) => (
                  <div key={index} className="p-3 border rounded-lg hover:bg-muted/30 cursor-pointer">
                    <div className="font-medium text-sm mb-1">{project.title}</div>
                    <div className="text-xs text-muted-foreground mb-2">{project.description}</div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">{project.difficulty}</Badge>
                      <Badge variant="outline" className="text-xs">{project.language}</Badge>
                      <Badge variant="outline" className="text-xs">{project.time}</Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Learning Resources */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">
                  {currentLanguage === 'hi' ? 'सीखने के संसाधन' : 'Learning Resources'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="ghost" className="w-full justify-start p-3 h-auto">
                  <BookOpen className="w-4 h-4 mr-3" />
                  <div className="text-left">
                    <div className="font-medium text-sm">
                      {currentLanguage === 'hi' ? 'प्रोग्रामिंग गाइड' : 'Programming Guide'}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {currentLanguage === 'hi' ? 'चरणबद्ध ट्यूटोरियल' : 'Step-by-step tutorials'}
                    </div>
                  </div>
                </Button>
                
                <Button variant="ghost" className="w-full justify-start p-3 h-auto">
                  <Video className="w-4 h-4 mr-3" />
                  <div className="text-left">
                    <div className="font-medium text-sm">
                      {currentLanguage === 'hi' ? 'वीडियो लेसन्स' : 'Video Lessons'}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {currentLanguage === 'hi' ? 'इंटरैक्टिव वीडियो' : 'Interactive videos'}
                    </div>
                  </div>
                </Button>
                
                <Button variant="ghost" className="w-full justify-start p-3 h-auto">
                  <Users className="w-4 h-4 mr-3" />
                  <div className="text-left">
                    <div className="font-medium text-sm">
                      {currentLanguage === 'hi' ? 'कम्युनिटी' : 'Community'}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {currentLanguage === 'hi' ? 'साथियों से जुड़ें' : 'Connect with peers'}
                    </div>
                  </div>
                </Button>
              </CardContent>
            </Card>

            {/* Code Features */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">
                  {currentLanguage === 'hi' ? 'सुविधाएं' : 'Features'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  <span>{currentLanguage === 'hi' ? 'तत्काल निष्पादन' : 'Instant Execution'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Share className="w-4 h-4 text-blue-500" />
                  <span>{currentLanguage === 'hi' ? 'कोड साझाकरण' : 'Code Sharing'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-green-500" />
                  <span>{currentLanguage === 'hi' ? 'सहयोग' : 'Collaboration'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-purple-500" />
                  <span>{currentLanguage === 'hi' ? 'ऑटो सेव' : 'Auto Save'}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeLab;