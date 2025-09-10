import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => Promise<void>;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Auth
    login: 'Login',
    register: 'Register',
    email: 'Email',
    password: 'Password',
    fullName: 'Full Name',
    loginButton: 'Login',
    registerButton: 'Create Account',
    switchToRegister: 'Create new account',
    switchToLogin: 'Already have account? Login',
    
    // Navigation
    home: 'Home',
    classroom: 'Classroom',
    aiTutor: 'AI Tutor',
    codeLab: 'Code Lab',
    profile: 'Profile',
    
    // Home
    greeting: 'Hello',
    subtitle: 'What would you like to learn today?',
    virtualClassroom: 'Virtual Classroom',
    joinLiveClasses: 'Join live classes',
    aiTeacher: 'AI Teacher',
    askQuestions: 'Ask questions instantly',
    coding: 'Coding',
    learnProgramming: 'Learn programming',
    tests: 'Tests',
    takeOnlineTests: 'Take online tests',
    
    // AI Tutor
    aiTutorTitle: 'AI Teacher',
    askQuestion: 'Ask your question here...',
    quickQuestions: 'Quick Questions:',
    
    // Code Lab
    codeLabTitle: 'Code Lab',
    runCode: 'Run Code',
    
    // Profile
    student: 'Student',
    teacher: 'Teacher',
    logout: 'Logout',
    settings: 'Settings',
    language: 'Language',
    
    // App
    appName: 'Shiksha Setu',
    appSubtitle: 'Digital Learning Platform'
  },
  hi: {
    // Auth
    login: 'लॉगिन करें',
    register: 'नया खाता बनाएं',
    email: 'ईमेल',
    password: 'पासवर्ड',
    fullName: 'पूरा नाम',
    loginButton: 'लॉगिन करें',
    registerButton: 'खाता बनाएं',
    switchToRegister: 'नया खाता बनाएं',
    switchToLogin: 'पहले से खाता है? लॉगिन करें',
    
    // Navigation
    home: 'होम',
    classroom: 'कक्षा',
    aiTutor: 'AI शिक्षक',
    codeLab: 'कोड लैब',
    profile: 'प्रोफाइल',
    
    // Home
    greeting: 'नमस्ते',
    subtitle: 'आज क्या सीखना चाहते हैं?',
    virtualClassroom: 'वर्चुअल क्लासरूम',
    joinLiveClasses: 'लाइव कक्षाओं में भाग लें',
    aiTeacher: 'AI शिक्षक',
    askQuestions: 'तुरंत सवाल पूछें',
    coding: 'कोडिंग',
    learnProgramming: 'प्रोग्रामिंग सीखें',
    tests: 'परीक्षा',
    takeOnlineTests: 'ऑनलाइन टेस्ट दें',
    
    // AI Tutor
    aiTutorTitle: 'AI शिक्षक',
    askQuestion: 'अपना सवाल यहाँ लिखें...',
    quickQuestions: 'त्वरित सवाल:',
    
    // Code Lab
    codeLabTitle: 'कोड लैब',
    runCode: 'कोड चलाएं',
    
    // Profile
    student: 'छात्र',
    teacher: 'शिक्षक',
    logout: 'लॉगआउट',
    settings: 'सेटिंग्स',
    language: 'भाषा',
    
    // App
    appName: 'शिक्षा सेतु',
    appSubtitle: 'Digital Learning Platform'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState('en');

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('language');
      if (savedLanguage) {
        setLanguageState(savedLanguage);
      }
    } catch (error) {
      console.error('Failed to load language:', error);
    }
  };

  const setLanguage = async (lang: string) => {
    try {
      await AsyncStorage.setItem('language', lang);
      setLanguageState(lang);
    } catch (error) {
      console.error('Failed to save language:', error);
    }
  };

  const t = (key: string): string => {
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}