# 🛠 Tech Stack - शिक्षा सेतु

## 🎯 Complete Technology Stack Implementation

### 🖥 Frontend
- **React.js** - Main web application framework
- **TypeScript** - Type-safe JavaScript development
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/UI** - High-quality component library
- **Lucide React** - Beautiful icon library

### 📱 Mobile (Future Implementation)
- **React Native** - Cross-platform mobile development
- **Expo** - React Native development platform
- **React Navigation** - Navigation library for mobile

### 🔧 Backend Services
- **Node.js/Express** - Server-side JavaScript runtime
- **Socket.io** - Real-time communication
- **WebRTC** - Peer-to-peer video calling
- **REST APIs** - HTTP-based API architecture

### 🗄 Database
- **Firebase** - Real-time database and authentication
  - Firestore - NoSQL document database
  - Firebase Auth - User authentication
  - Firebase Storage - File storage
- **PostgreSQL** - Relational database (alternative)

### 🤖 AI & NLP Integration
- **OpenAI API** - GPT models for AI tutoring
- **Google Gemini API** - Google's generative AI
- **Amazon Q** - AWS AI assistant integration
- **HuggingFace** - Open-source ML models
- **Custom AI Service** - Unified AI interface

### 👁 Engagement Detection
- **MediaPipe** - Face mesh and pose detection
- **OpenCV.js** - Computer vision in browser
- **TensorFlow.js** - Machine learning in browser
- **Camera API** - Browser camera access

### 💻 Compiler Integration
- **Judge0 API** - Online code execution
- **Replit API** - Alternative code execution
- **Monaco Editor** - VS Code editor in browser
- **Custom Compiler Service** - Unified execution interface

### 📱 PWA & Offline Support
- **Service Workers** - Background sync and caching
- **Web App Manifest** - PWA configuration
- **Cache API** - Offline content storage
- **IndexedDB** - Client-side database
- **Background Sync** - Offline data synchronization

## 📁 Project Structure

```
src/
├── components/
│   ├── LearningPlatform/
│   │   ├── VirtualClassroom.tsx    # Video calls, whiteboard
│   │   ├── AITutor.tsx             # AI chat interface
│   │   ├── CodeLab.tsx             # Code editor & compiler
│   │   └── SecureTest.tsx          # Proctored testing
│   └── ui/                         # Reusable UI components
├── lib/
│   ├── ai-services.ts              # AI integration layer
│   ├── compiler-service.ts         # Code execution service
│   ├── engagement-detection.ts     # Face/pose detection
│   ├── database.ts                 # Database operations
│   └── firebase.ts                 # Firebase configuration
├── hooks/
│   ├── usePWA.ts                   # PWA functionality
│   ├── use-mobile.tsx              # Mobile detection
│   └── use-toast.ts                # Notifications
└── pages/
    └── Index.tsx                   # Main application
```

## 🔧 Service Integrations

### AI Services
```typescript
// Unified AI interface supporting multiple providers
class AIService {
  static async getChatResponse(message: string, language: string)
  static async translateText(text: string, targetLanguage: string)
  static async generateCodeExplanation(code: string, language: string)
}
```

### Compiler Service
```typescript
// Code execution with multiple backend support
class CompilerService {
  static async executeCode(code: string, language: string, input?: string)
  static async saveCode(code: string, language: string, userId: string)
  static async loadCode(codeId: string)
}
```

### Engagement Detection
```typescript
// Real-time student engagement monitoring
class EngagementDetector {
  initialize(videoElement: HTMLVideoElement, canvasElement: HTMLCanvasElement)
  start(onMetricsUpdate?: (metrics: EngagementMetrics) => void)
  getAverageEngagement(timeWindow: number): number
}
```

### Database Service
```typescript
// Unified database interface
class DatabaseService {
  static async getUser(id: string): Promise<User | null>
  static async createSession(sessionData: SessionData): Promise<ClassSession>
  static async saveTestResult(result: TestResult): Promise<TestResult>
}
```

## 🌐 PWA Features

### Offline Support
- **Service Worker** caching for core functionality
- **Background sync** for data when connection returns
- **Offline indicators** to inform users of connection status
- **Cached content** for essential learning materials

### Installation
- **Add to Home Screen** prompt for mobile devices
- **Desktop installation** support for PWA
- **App-like experience** with standalone display mode
- **Push notifications** for class reminders (future)

## 🔐 Security Features

### Proctoring System
- **Camera monitoring** with face detection
- **Tab switch detection** and violation logging
- **Browser lock** during examinations
- **Screen recording** prevention
- **Keystroke monitoring** for suspicious activity

### Data Security
- **Firebase Authentication** for secure login
- **End-to-end encryption** for sensitive data
- **HTTPS enforcement** for all communications
- **Input validation** and sanitization

## 📊 Performance Optimizations

### Code Splitting
- **Route-based splitting** for faster initial load
- **Component lazy loading** for better performance
- **Dynamic imports** for heavy libraries

### Caching Strategy
- **Service Worker caching** for offline support
- **Browser caching** for static assets
- **API response caching** for frequently accessed data

## 🚀 Deployment Architecture

### Web Application
- **Vercel/Netlify** - Frontend hosting
- **CDN** - Global content delivery
- **Environment variables** - Secure configuration

### Backend Services
- **Firebase Functions** - Serverless backend
- **Node.js/Express** - Traditional server (alternative)
- **WebSocket servers** - Real-time communication

### Database
- **Firebase Firestore** - Primary database
- **PostgreSQL** - Alternative relational database
- **Redis** - Caching layer

## 🔄 Development Workflow

### Local Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Code linting
npm run test         # Run tests
```

### Environment Setup
```env
REACT_APP_FIREBASE_API_KEY=your_firebase_key
REACT_APP_OPENAI_API_KEY=your_openai_key
REACT_APP_GEMINI_API_KEY=your_gemini_key
REACT_APP_JUDGE0_API_KEY=your_judge0_key
```

## 📱 Future Mobile Implementation

### React Native Setup
```bash
npx react-native init ShikshaSetu
cd ShikshaSetu
npm install @react-navigation/native
npm install react-native-webrtc
npm install @react-native-firebase/app
```

### Shared Components
- **Cross-platform UI components**
- **Shared business logic**
- **Common API services**
- **Unified state management**

---

This tech stack provides a robust, scalable foundation for the **शिक्षा सेतु** platform, supporting both current web needs and future mobile expansion while maintaining high performance and security standards.