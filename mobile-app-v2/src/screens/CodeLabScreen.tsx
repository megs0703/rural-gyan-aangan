import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet, 
  Alert,
  Dimensions,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function CodeLabScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [code, setCode] = useState(`# Python में अपना पहला प्रोग्राम लिखें
print("नमस्ते, शिक्षा सेतु!")
print("मैं Python सीख रहा हूँ")

# गणित की गणना
a = 10
b = 20
sum = a + b
print(f"योग: {sum}")`);
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const languages = [
    { 
      id: 'python', 
      name: 'Python', 
      icon: 'logo-python', 
      color: '#3776ab',
      template: `# Python में अपना पहला प्रोग्राम लिखें
print("नमस्ते, शिक्षा सेतु!")
print("मैं Python सीख रहा हूँ")

# गणित की गणना
a = 10
b = 20
sum = a + b
print(f"योग: {sum}")`
    },
    { 
      id: 'javascript', 
      name: 'JavaScript', 
      icon: 'logo-javascript', 
      color: '#f7df1e',
      template: `// JavaScript में अपना पहला प्रोग्राम
console.log("नमस्ते, शिक्षा सेतु!");
console.log("मैं JavaScript सीख रहा हूँ");

// गणित की गणना
let a = 10;
let b = 20;
let sum = a + b;
console.log("योग: " + sum);`
    },
    { 
      id: 'java', 
      name: 'Java', 
      icon: 'logo-java', 
      color: '#ed8b00',
      template: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("नमस्ते, शिक्षा सेतु!");
        System.out.println("मैं Java सीख रहा हूँ");
        
        // गणित की गणना
        int a = 10;
        int b = 20;
        int sum = a + b;
        System.out.println("योग: " + sum);
    }
}`
    },
    { 
      id: 'cpp', 
      name: 'C++', 
      icon: 'code-slash', 
      color: '#00599c',
      template: `#include <iostream>
using namespace std;

int main() {
    cout << "नमस्ते, शिक्षा सेतु!" << endl;
    cout << "मैं C++ सीख रहा हूँ" << endl;
    
    // गणित की गणना
    int a = 10;
    int b = 20;
    int sum = a + b;
    cout << "योग: " << sum << endl;
    
    return 0;
}`
    },
  ];

  const codeExamples = [
    {
      title: 'Hello World',
      description: 'पहला प्रोग्राम',
      code: 'print("Hello, World!")'
    },
    {
      title: 'Variables',
      description: 'चर का उपयोग',
      code: 'name = "Priyanshu Kumar Sharma"\nage = 20\nprint(f"Name: {name}, Age: {age}")'
    },
    {
      title: 'Loop',
      description: 'लूप का उदाहरण',
      code: 'for i in range(1, 6):\n    print(f"संख्या: {i}")'
    },
  ];

  const runCode = async () => {
    setLoading(true);
    setOutput('कोड चलाया जा रहा है...');
    
    // Simulate code execution
    setTimeout(() => {
      let mockOutput = '';
      
      if (selectedLanguage === 'python') {
        mockOutput = `नमस्ते, शिक्षा सेतु!
मैं Python सीख रहा हूँ
योग: 30

प्रोग्राम सफलतापूर्वक चलाया गया।
समय: 0.05 सेकंड`;
      } else if (selectedLanguage === 'javascript') {
        mockOutput = `नमस्ते, शिक्षा सेतु!
मैं JavaScript सीख रहा हूँ
योग: 30

प्रोग्राम सफलतापूर्वक चलाया गया।`;
      } else {
        mockOutput = `नमस्ते, शिक्षा सेतु!
मैं ${languages.find(l => l.id === selectedLanguage)?.name} सीख रहा हूँ
योग: 30

प्रोग्राम सफलतापूर्वक चलाया गया।`;
      }
      
      setOutput(mockOutput);
      setLoading(false);
    }, 2000);
  };

  const clearCode = () => {
    Alert.alert(
      'कोड साफ़ करें',
      'क्या आप वाकई सारा कोड साफ़ करना चाहते हैं?',
      [
        { text: 'रद्द करें', style: 'cancel' },
        { text: 'हां', onPress: () => setCode('') }
      ]
    );
  };

  const loadTemplate = (template: string) => {
    setCode(template);
    setOutput('');
  };

  const selectLanguage = (langId: string) => {
    const lang = languages.find(l => l.id === langId);
    if (lang) {
      setSelectedLanguage(langId);
      setCode(lang.template);
      setOutput('');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>कोड लैब</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity onPress={clearCode} style={styles.headerButton}>
            <Ionicons name="trash-outline" size={20} color="#EF4444" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="save-outline" size={20} color="#10B981" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Language Selector */}
      <ScrollView 
        horizontal 
        style={styles.languageSelector} 
        showsHorizontalScrollIndicator={false}
      >
        {languages.map((lang) => (
          <TouchableOpacity
            key={lang.id}
            style={[
              styles.languageButton,
              selectedLanguage === lang.id && { 
                backgroundColor: lang.color,
                borderColor: lang.color 
              }
            ]}
            onPress={() => selectLanguage(lang.id)}
          >
            <Ionicons 
              name={lang.icon as any} 
              size={20} 
              color={selectedLanguage === lang.id ? 'white' : lang.color} 
            />
            <Text style={[
              styles.languageText,
              selectedLanguage === lang.id && { color: 'white' }
            ]}>
              {lang.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Code Examples */}
      <View style={styles.examplesContainer}>
        <Text style={styles.examplesTitle}>उदाहरण:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {codeExamples.map((example, index) => (
            <TouchableOpacity
              key={index}
              style={styles.exampleButton}
              onPress={() => loadTemplate(example.code)}
            >
              <Text style={styles.exampleTitle}>{example.title}</Text>
              <Text style={styles.exampleDescription}>{example.description}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Code Editor */}
      <View style={styles.editorContainer}>
        <View style={styles.editorHeader}>
          <Text style={styles.sectionTitle}>कोड एडिटर</Text>
          <Text style={styles.languageIndicator}>
            {languages.find(l => l.id === selectedLanguage)?.name}
          </Text>
        </View>
        <ScrollView style={styles.editorScroll}>
          <TextInput
            style={styles.codeEditor}
            value={code}
            onChangeText={setCode}
            multiline
            placeholder="यहाँ अपना कोड लिखें..."
            textAlignVertical="top"
            scrollEnabled={false}
          />
        </ScrollView>
      </View>

      {/* Output */}
      <View style={styles.outputContainer}>
        <Text style={styles.sectionTitle}>आउटपुट</Text>
        <ScrollView style={styles.outputBox}>
          <Text style={styles.outputText}>
            {output || 'कोड चलाने के लिए "Run" बटन दबाएं।'}
          </Text>
        </ScrollView>
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.runButton, loading && styles.runButtonDisabled]}
          onPress={runCode}
          disabled={loading}
        >
          <Ionicons name="play" size={20} color="white" />
          <Text style={styles.runButtonText}>
            {loading ? 'चल रहा है...' : 'कोड चलाएं'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.shareButton}>
          <Ionicons name="share-outline" size={20} color="#3B82F6" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  headerButtons: {
    flexDirection: 'row',
  },
  headerButton: {
    padding: 8,
    marginLeft: 10,
  },
  languageSelector: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 12,
    borderRadius: 25,
    backgroundColor: '#f1f5f9',
    borderWidth: 2,
    borderColor: '#f1f5f9',
  },
  languageText: {
    fontSize: 14,
    color: '#64748b',
    marginLeft: 8,
    fontWeight: '600',
  },
  examplesContainer: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingLeft: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  examplesTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#64748b',
    marginBottom: 10,
  },
  exampleButton: {
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 8,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    minWidth: 100,
  },
  exampleTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#3B82F6',
  },
  exampleDescription: {
    fontSize: 10,
    color: '#64748b',
    marginTop: 2,
  },
  editorContainer: {
    flex: 1,
    margin: 15,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  editorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  languageIndicator: {
    fontSize: 12,
    color: '#64748b',
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  editorScroll: {
    flex: 1,
  },
  codeEditor: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'monospace',
    backgroundColor: '#1e293b',
    color: '#e2e8f0',
    padding: 15,
    minHeight: 200,
    textAlignVertical: 'top',
  },
  outputContainer: {
    height: 120,
    margin: 15,
    marginTop: 0,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  outputBox: {
    flex: 1,
    backgroundColor: '#000',
    margin: 15,
    marginTop: 0,
    borderRadius: 8,
    padding: 10,
  },
  outputText: {
    color: '#00ff00',
    fontFamily: 'monospace',
    fontSize: 12,
    lineHeight: 18,
  },
  controls: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    alignItems: 'center',
  },
  runButton: {
    backgroundColor: '#10B981',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
  },
  runButtonDisabled: {
    backgroundColor: '#cbd5e1',
  },
  runButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  shareButton: {
    backgroundColor: '#f1f5f9',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#3B82F6',
  },
});