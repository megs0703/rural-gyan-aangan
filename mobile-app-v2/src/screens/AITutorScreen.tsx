import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  language?: string;
}

export default function AITutorScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'नमस्ते! मैं आपका AI शिक्षक हूँ। आप मुझसे किसी भी विषय के बारे में सवाल पूछ सकते हैं। गणित, विज्ञान, अंग्रेजी, या कोडिंग - मैं सभी में आपकी मदद कर सकता हूँ! 📚',
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('all');
  const scrollViewRef = useRef<ScrollView>(null);

  const subjects = [
    { id: 'all', name: 'सभी', icon: 'library', color: '#64748b' },
    { id: 'math', name: 'गणित', icon: 'calculator', color: '#3B82F6' },
    { id: 'science', name: 'विज्ञान', icon: 'flask', color: '#10B981' },
    { id: 'english', name: 'अंग्रेजी', icon: 'language', color: '#F59E0B' },
    { id: 'coding', name: 'कोडिंग', icon: 'code-slash', color: '#8B5CF6' },
  ];

  const quickQuestions = [
    'द्विघात समीकरण कैसे हल करें?',
    'प्रकाश संश्लेषण क्या है?',
    'Python में loop कैसे लिखें?',
    'अंग्रेजी grammar के नियम',
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const sendMessage = async (text?: string) => {
    const messageText = text || inputText.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setLoading(true);

    // Simulate AI response based on subject
    setTimeout(() => {
      let aiResponse = '';
      
      if (messageText.includes('गणित') || messageText.includes('समीकरण')) {
        aiResponse = 'गणित में मैं आपकी मदद कर सकता हूँ! द्विघात समीकरण ax² + bx + c = 0 के लिए सूत्र है: x = (-b ± √(b²-4ac)) / 2a। क्या आप कोई विशिष्ट समस्या हल करना चाहते हैं? 🧮';
      } else if (messageText.includes('विज्ञान') || messageText.includes('प्रकाश')) {
        aiResponse = 'प्रकाश संश्लेषण एक महत्वपूर्ण प्रक्रिया है जिसमें पौधे सूर्य की रोशनी, कार्बन डाइऑक्साइड और पानी का उपयोग करके भोजन बनाते हैं। इसका सूत्र है: 6CO₂ + 6H₂O + प्रकाश ऊर्जा → C₆H₁₂O₆ + 6O₂ 🌱';
      } else if (messageText.includes('कोडिंग') || messageText.includes('Python')) {
        aiResponse = 'Python में loop लिखना बहुत आसान है!\n\nFor loop:\nfor i in range(5):\n    print(i)\n\nWhile loop:\ni = 0\nwhile i < 5:\n    print(i)\n    i += 1\n\nक्या आप कोई specific example चाहते हैं? 💻';
      } else if (messageText.includes('अंग्रेजी') || messageText.includes('grammar')) {
        aiResponse = 'English grammar के मुख्य नियम:\n\n1. Subject + Verb + Object\n2. Present tense: I/You/We/They + verb\n3. He/She/It + verb + s\n4. Articles: a, an, the का सही उपयोग\n\nकोई specific topic पर जानकारी चाहिए? 📖';
      } else {
        aiResponse = 'यह एक बहुत अच्छा सवाल है! मैं इसका विस्तृत उत्तर दे सकता हूँ। कृपया बताएं कि आप किस विषय के बारे में और जानना चाहते हैं? मैं गणित, विज्ञान, अंग्रेजी, और कोडिंग सभी में आपकी मदद कर सकता हूँ। 🤔';
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setLoading(false);
    }, 1500);
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons name="chatbubbles" size={24} color="#3B82F6" />
          <Text style={styles.headerTitle}>AI शिक्षक</Text>
        </View>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="refresh" size={20} color="#64748b" />
        </TouchableOpacity>
      </View>

      {/* Subject Selector */}
      <ScrollView 
        horizontal 
        style={styles.subjectSelector} 
        showsHorizontalScrollIndicator={false}
      >
        {subjects.map((subject) => (
          <TouchableOpacity
            key={subject.id}
            style={[
              styles.subjectButton,
              selectedSubject === subject.id && { backgroundColor: subject.color }
            ]}
            onPress={() => setSelectedSubject(subject.id)}
          >
            <Ionicons 
              name={subject.icon as any} 
              size={18} 
              color={selectedSubject === subject.id ? 'white' : subject.color} 
            />
            <Text style={[
              styles.subjectText,
              selectedSubject === subject.id && { color: 'white' }
            ]}>
              {subject.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Messages */}
      <ScrollView 
        ref={scrollViewRef}
        style={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageContainer,
              message.isUser ? styles.userMessage : styles.aiMessage
            ]}
          >
            {!message.isUser && (
              <View style={styles.aiAvatar}>
                <Ionicons name="school" size={16} color="#3B82F6" />
              </View>
            )}
            <View style={[
              styles.messageBubble,
              message.isUser ? styles.userBubble : styles.aiBubble
            ]}>
              <Text style={[
                styles.messageText,
                message.isUser ? styles.userMessageText : styles.aiMessageText
              ]}>
                {message.text}
              </Text>
              <Text style={styles.messageTime}>
                {message.timestamp.toLocaleTimeString('hi-IN', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </Text>
            </View>
          </View>
        ))}
        
        {loading && (
          <View style={[styles.messageContainer, styles.aiMessage]}>
            <View style={styles.aiAvatar}>
              <Ionicons name="school" size={16} color="#3B82F6" />
            </View>
            <View style={styles.loadingBubble}>
              <Text style={styles.loadingText}>AI शिक्षक टाइप कर रहा है...</Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Quick Questions */}
      {messages.length === 1 && (
        <View style={styles.quickQuestions}>
          <Text style={styles.quickTitle}>त्वरित सवाल:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {quickQuestions.map((question, index) => (
              <TouchableOpacity
                key={index}
                style={styles.quickButton}
                onPress={() => sendMessage(question)}
              >
                <Text style={styles.quickButtonText}>{question}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder="अपना सवाल यहाँ लिखें..."
          multiline
          maxLength={500}
        />
        <TouchableOpacity
          style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
          onPress={() => sendMessage()}
          disabled={!inputText.trim() || loading}
        >
          <Ionicons name="send" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginLeft: 10,
  },
  headerButton: {
    padding: 8,
  },
  subjectSelector: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  subjectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
  },
  subjectText: {
    fontSize: 14,
    color: '#64748b',
    marginLeft: 5,
  },
  messagesContainer: {
    flex: 1,
    padding: 15,
  },
  messageContainer: {
    marginBottom: 15,
    maxWidth: '85%',
  },
  userMessage: {
    alignSelf: 'flex-end',
  },
  aiMessage: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
  },
  aiAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#e0f2fe',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  messageBubble: {
    borderRadius: 15,
    padding: 12,
    maxWidth: '100%',
  },
  userBubble: {
    backgroundColor: '#3B82F6',
    borderBottomRightRadius: 5,
  },
  aiBubble: {
    backgroundColor: 'white',
    borderBottomLeftRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userMessageText: {
    color: 'white',
  },
  aiMessageText: {
    color: '#1e293b',
  },
  messageTime: {
    fontSize: 12,
    opacity: 0.7,
    marginTop: 5,
  },
  loadingBubble: {
    backgroundColor: 'white',
    borderRadius: 15,
    borderBottomLeftRadius: 5,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  loadingText: {
    color: '#64748b',
    fontStyle: 'italic',
  },
  quickQuestions: {
    backgroundColor: 'white',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  quickTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#64748b',
    marginBottom: 10,
  },
  quickButton: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
    marginRight: 10,
  },
  quickButtonText: {
    fontSize: 14,
    color: '#3B82F6',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    maxHeight: 100,
    fontSize: 16,
    backgroundColor: '#f8fafc',
  },
  sendButton: {
    backgroundColor: '#3B82F6',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  sendButtonDisabled: {
    backgroundColor: '#cbd5e1',
  },
});