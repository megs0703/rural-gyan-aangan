import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Play, 
  Code, 
  Save, 
  Share, 
  Download,
  Upload,
  Terminal,
  FileText,
  Folder,
  Settings,
  Bug,
  Zap,
  BookOpen
} from "lucide-react";

const CodeLab = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const [code, setCode] = useState(`# Welcome to शिक्षा सेतु Code Lab!
# Let's start with a simple Python program

def greet(name):
    return f"नमस्ते, {name}! Welcome to coding!"

# Call the function
message = greet("Student")
print(message)

# Try writing your own code below:
`);

  const languages = [
    { id: "python", name: "Python", icon: "🐍", color: "bg-success" },
    { id: "javascript", name: "JavaScript", icon: "🟨", color: "bg-warning" },
    { id: "java", name: "Java", icon: "☕", color: "bg-destructive" },
    { id: "cpp", name: "C++", icon: "⚡", color: "bg-primary" },
    { id: "html", name: "HTML/CSS", icon: "🌐", color: "bg-secondary" },
  ];

  const templates = [
    { name: "Hello World", language: "python", difficulty: "Beginner" },
    { name: "Calculator", language: "javascript", difficulty: "Easy" },
    { name: "Pattern Printing", language: "cpp", difficulty: "Medium" },
    { name: "Web Page", language: "html", difficulty: "Easy" },
  ];

  const output = `नमस्ते, Student! Welcome to coding!

Program executed successfully!
Runtime: 0.23 seconds
Memory used: 12.4 MB`;

  return (
    <div className="min-h-screen bg-muted/30 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
              <Code className="w-8 h-8 text-primary" />
              Code Lab - कोडिंग प्रयोगशाला
            </h1>
            <p className="text-muted-foreground">Interactive coding environment • Multiple languages • Instant execution</p>
          </div>
          
          <div className="flex items-center gap-3">
            <select 
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="px-3 py-2 border border-border rounded-md bg-background text-sm"
            >
              {languages.map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.icon} {lang.name}
                </option>
              ))}
            </select>
            <Badge className="bg-success text-success-foreground">
              <Zap className="w-3 h-3 mr-1" />
              Ready
            </Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Code Editor */}
          <div className="lg:col-span-3 space-y-4">
            <Card className="shadow-medium">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Terminal className="w-5 h-5" />
                    Code Editor - {languages.find(l => l.id === selectedLanguage)?.name}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Upload className="w-4 h-4 mr-2" />
                      Import
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="border border-border rounded-lg overflow-hidden">
                  <div className="bg-muted/50 px-4 py-2 border-b border-border flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-destructive rounded-full"></div>
                      <div className="w-3 h-3 bg-warning rounded-full"></div>
                      <div className="w-3 h-3 bg-success rounded-full"></div>
                      <span className="ml-4 text-sm font-mono">main.py</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="success" size="sm" className="gap-2">
                        <Play className="w-4 h-4" />
                        Run Code
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Bug className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full h-80 p-4 bg-background font-mono text-sm border-none outline-none resize-none"
                    placeholder="Write your code here..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Output Panel */}
            <Card className="shadow-medium">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Terminal className="w-5 h-5" />
                  Output Console
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm min-h-32">
                  <pre className="whitespace-pre-wrap">{output}</pre>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* File Explorer */}
            <Card className="shadow-soft">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Folder className="w-4 h-4" />
                  Files
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 p-2 bg-primary/10 rounded-md">
                  <FileText className="w-4 h-4 text-primary" />
                  <span className="text-sm">main.py</span>
                </div>
                <div className="flex items-center gap-2 p-2 hover:bg-muted/50 rounded-md cursor-pointer">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">utils.py</span>
                </div>
                <div className="flex items-center gap-2 p-2 hover:bg-muted/50 rounded-md cursor-pointer">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">README.md</span>
                </div>
                <Button variant="ghost" size="sm" className="w-full justify-start mt-2">
                  + New File
                </Button>
              </CardContent>
            </Card>

            {/* Templates */}
            <Card className="shadow-soft">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Code Templates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {templates.map((template, index) => (
                  <div key={index} className="p-3 border border-border rounded-lg hover:bg-muted/50 cursor-pointer">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{template.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {template.difficulty}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {languages.find(l => l.id === template.language)?.icon}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {languages.find(l => l.id === template.language)?.name}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Learning Resources */}
            <Card className="shadow-soft">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Learn
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="ghost" className="w-full justify-start gap-3 h-auto p-3">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs">🐍</span>
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium">Python Basics</div>
                    <div className="text-xs text-muted-foreground">Variables, Functions</div>
                  </div>
                </Button>
                
                <Button variant="ghost" className="w-full justify-start gap-3 h-auto p-3">
                  <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs">🌐</span>
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium">Web Development</div>
                    <div className="text-xs text-muted-foreground">HTML, CSS, JS</div>
                  </div>
                </Button>
                
                <Button variant="ghost" className="w-full justify-start gap-3 h-auto p-3">
                  <div className="w-8 h-8 bg-success rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs">📊</span>
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium">Data Structures</div>
                    <div className="text-xs text-muted-foreground">Arrays, Lists</div>
                  </div>
                </Button>
              </CardContent>
            </Card>

            {/* Compilation Status */}
            <Card className="shadow-soft">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Language</span>
                  <Badge className="bg-primary">Python 3.9</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Memory</span>
                  <span className="text-sm text-success">12.4 MB</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Runtime</span>
                  <span className="text-sm text-success">0.23s</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Status</span>
                  <Badge className="bg-success">Success</Badge>
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