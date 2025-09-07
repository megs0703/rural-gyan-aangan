# 📁 Project Structure - शिक्षा सेतु

## 🏗 Directory Structure

```
rural-gyan-aangan/
├── 📁 public/                          # Static assets
│   ├── favicon.ico                     # App favicon
│   ├── placeholder.svg                 # Placeholder images
│   └── robots.txt                      # SEO robots file
│
├── 📁 src/                             # Source code
│   ├── 📁 assets/                      # Static assets
│   │   └── hero-learning.jpg           # Hero section image
│   │
│   ├── 📁 components/                  # React components
│   │   ├── 📁 LearningPlatform/        # Main platform components
│   │   │   ├── Header.tsx              # Navigation header
│   │   │   ├── Hero.tsx                # Landing page hero
│   │   │   ├── VirtualClassroom.tsx    # Virtual classroom component
│   │   │   ├── AITutor.tsx             # AI tutor interface
│   │   │   ├── CodeLab.tsx             # Code editor and compiler
│   │   │   └── SecureTest.tsx          # Secure testing system
│   │   │
│   │   └── 📁 ui/                      # Reusable UI components
│   │       ├── button.tsx              # Button component
│   │       ├── card.tsx                # Card component
│   │       ├── badge.tsx               # Badge component
│   │       ├── tabs.tsx                # Tabs component
│   │       └── progress.tsx            # Progress bar component
│   │
│   ├── 📁 hooks/                       # Custom React hooks
│   │   ├── use-mobile.tsx              # Mobile detection hook
│   │   └── use-toast.ts                # Toast notification hook
│   │
│   ├── 📁 lib/                         # Utility libraries
│   │   └── utils.ts                    # Common utility functions
│   │
│   ├── 📁 pages/                       # Page components
│   │   ├── Index.tsx                   # Main landing page
│   │   └── NotFound.tsx                # 404 error page
│   │
│   ├── App.css                         # Global CSS styles
│   ├── App.tsx                         # Main App component
│   ├── index.css                       # Base CSS imports
│   ├── main.tsx                        # React app entry point
│   └── vite-env.d.ts                   # Vite type definitions
│
├── 📄 Configuration Files
├── .gitignore                          # Git ignore rules
├── components.json                     # Shadcn/UI configuration
├── eslint.config.js                    # ESLint configuration
├── index.html                          # HTML template
├── package.json                        # Dependencies and scripts
├── package-lock.json                   # Dependency lock file
├── postcss.config.js                   # PostCSS configuration
├── tailwind.config.ts                  # Tailwind CSS configuration
├── tsconfig.json                       # TypeScript configuration
├── tsconfig.app.json                   # App-specific TS config
├── tsconfig.node.json                  # Node-specific TS config
├── vite.config.ts                      # Vite build configuration
│
└── 📄 Documentation
    ├── README.md                       # Main project documentation
    └── PROJECT_STRUCTURE.md            # This file
```

## 🧩 Component Architecture

### 🏠 Main Components

#### 1. **Header.tsx**
- Navigation menu
- Language selector
- User authentication
- Platform branding

#### 2. **Hero.tsx**
- Landing page hero section
- Call-to-action buttons
- Feature highlights
- Statistics display

#### 3. **VirtualClassroom.tsx**
- Live video streaming
- Interactive whiteboard
- Real-time chat
- Participant management
- Screen sharing
- Security monitoring

#### 4. **AITutor.tsx**
- Chat interface with AI
- Voice interaction
- Multilingual support
- Subject selection
- Quick questions
- Response rating system

#### 5. **CodeLab.tsx**
- Code editor interface
- Multiple language support
- Code execution environment
- Template library
- Project management
- Collaboration tools

#### 6. **SecureTest.tsx**
- Proctored examination system
- Camera monitoring
- Tab switch detection
- Question navigation
- Violation logging
- Secure submission

### 🎨 UI Components

#### Reusable Components
- **Button**: Various styles and sizes
- **Card**: Content containers
- **Badge**: Status indicators
- **Tabs**: Navigation tabs
- **Progress**: Progress indicators

## 🔧 Technology Stack

### Frontend Framework
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/UI** - High-quality component library
- **Lucide React** - Beautiful icon library
- **CSS Variables** - Dynamic theming support

### State Management
- **React Hooks** - Built-in state management
- **Context API** - Global state sharing
- **Local Storage** - Persistent data storage

### Development Tools
- **ESLint** - Code linting and formatting
- **TypeScript** - Static type checking
- **PostCSS** - CSS processing
- **Vite HMR** - Hot module replacement

## 📦 Dependencies

### Core Dependencies
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "typescript": "^5.8.3",
  "vite": "^5.4.19"
}
```

### UI & Styling
```json
{
  "tailwindcss": "^3.4.17",
  "@radix-ui/react-*": "Various Radix UI components",
  "lucide-react": "^0.462.0",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "tailwind-merge": "^2.6.0"
}
```

### Planned Integrations
```json
{
  "@monaco-editor/react": "^4.6.0",
  "socket.io-client": "^4.7.5",
  "webrtc-adapter": "^9.0.1",
  "simple-peer": "^9.11.1",
  "fabric": "^6.0.2",
  "react-webcam": "^7.2.0",
  "face-api.js": "^0.22.2",
  "@tensorflow/tfjs": "^4.15.0",
  "i18next": "^23.7.16",
  "react-i18next": "^14.0.0",
  "openai": "^4.24.7",
  "axios": "^1.6.5"
}
```

## 🚀 Build & Deployment

### Development
```bash
npm run dev          # Start development server
npm run lint         # Run ESLint
npm run build:dev    # Build for development
```

### Production
```bash
npm run build        # Build for production
npm run preview      # Preview production build
```

### Deployment Targets
- **Vercel** - Recommended for frontend
- **Netlify** - Alternative hosting
- **GitHub Pages** - Free hosting option
- **Custom Server** - Self-hosted solution

## 🔐 Security Considerations

### Frontend Security
- Input validation and sanitization
- XSS protection
- CSRF token implementation
- Secure cookie handling

### API Security
- JWT token authentication
- Rate limiting
- CORS configuration
- Request validation

### Proctoring Security
- Camera access permissions
- Screen monitoring
- Tab switch detection
- Browser fingerprinting

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px
- **Large Desktop**: > 1440px

### Mobile-First Approach
- Progressive enhancement
- Touch-friendly interfaces
- Optimized for low-end devices
- Offline-first architecture (planned)

## 🌐 Internationalization

### Supported Languages
- **Hindi (हिंदी)** - Primary language
- **English** - Secondary language
- **Punjabi (ਪੰਜਾਬੀ)** - Regional language
- **Urdu (اردو)** - Regional language

### Implementation
- React i18next integration
- Dynamic language switching
- RTL support for Urdu
- Cultural adaptation

## 🧪 Testing Strategy

### Unit Testing
- Component testing with Jest
- Hook testing with React Testing Library
- Utility function testing

### Integration Testing
- API integration tests
- Component interaction tests
- User flow testing

### E2E Testing
- Cypress for end-to-end testing
- User journey validation
- Cross-browser testing

## 📊 Performance Optimization

### Code Splitting
- Route-based code splitting
- Component lazy loading
- Dynamic imports

### Asset Optimization
- Image compression and optimization
- CSS purging with Tailwind
- Bundle size analysis

### Runtime Performance
- React.memo for component optimization
- useMemo and useCallback hooks
- Virtual scrolling for large lists

## 🔄 Future Enhancements

### Planned Features
- Progressive Web App (PWA)
- Offline functionality
- Push notifications
- Background sync
- Service worker implementation

### Scalability Improvements
- Micro-frontend architecture
- Component library extraction
- API abstraction layer
- State management optimization

---

This structure provides a solid foundation for the **शिक्षा सेतु** platform while maintaining scalability and maintainability for future enhancements.