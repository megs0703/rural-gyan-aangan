# 🏫 शिक्षा सेतु - Digital Learning Platform for Rural School Students in Nabha

*Problem Statement ID:* 25019  
*Theme:* Smart Education

## 🌟 Project Overview

**शिक्षा सेतु (Shiksha Setu)** is a comprehensive digital learning platform designed specifically for rural school students in Nabha and surrounding areas. The platform bridges the digital divide by providing modern educational tools optimized for low-end devices and poor connectivity.

## 🎯 Problem Statement

Many government schools in Nabha and surrounding rural areas lack:
- Updated infrastructure
- Reliable internet connectivity  
- Modern digital resources
- Qualified teachers for specialized subjects

This results in:
- Limited digital literacy
- Reduced access to quality educational content
- Widening gap between rural and urban education standards
- Lower employability skills among rural students

## 💡 Our Solution

A **mobile and web-based Digital Learning Platform** that provides:

### 🌟 Core Features

#### 1. 🎥 Virtual Classrooms
- **Interactive Whiteboard**: Real-time drawing, equations, and content sharing
- **Live Video Streaming**: HD quality teacher-student interaction
- **Screen Sharing**: Share presentations, documents, and applications
- **Real-time Chat**: Multilingual chat with live translation
- **Hand Raising**: Digital hand raising for student participation
- **Attendance Tracking**: Automated attendance with engagement monitoring

#### 2. 🤖 AI-Powered Tutor
- **24/7 Availability**: Always available AI assistant for doubt solving
- **Multilingual Support**: Hindi, English, Punjabi, and Urdu
- **Voice Interaction**: Speech-to-text and text-to-speech capabilities
- **Personalized Learning**: Adaptive learning based on student performance
- **Instant Solutions**: Real-time problem solving with step-by-step explanations
- **Subject Expertise**: Mathematics, Science, English, and Social Studies

#### 3. 💻 Code Lab Environment
- **Online Compiler**: Support for Python, JavaScript, Java, C++, HTML/CSS
- **Code Templates**: Pre-built templates for common programming concepts
- **Project-Based Learning**: Guided coding projects and challenges
- **Collaborative Coding**: Real-time code sharing and collaboration
- **Auto-Save**: Automatic code saving and version control
- **Learning Resources**: Integrated tutorials and documentation

#### 4. 🔒 Secure Online Testing
- **Proctoring System**: AI-powered monitoring and surveillance
- **Tab Monitoring**: Detection of tab switching and suspicious activities
- **Camera Surveillance**: Face detection and engagement monitoring
- **Browser Lock**: Fullscreen mode with restricted navigation
- **Violation Tracking**: Real-time logging of security violations
- **Secure Submission**: Encrypted test submission and grading

#### 5. 🌐 Multilingual Support
- **Live Translation**: Real-time translation between supported languages
- **Voice Recognition**: Multi-language speech recognition
- **Cultural Adaptation**: Content adapted for local context and culture
- **Regional Content**: Curriculum aligned with Punjab education board

#### 6. 📊 Real-time Monitoring & Analytics
- **Engagement Detection**: Camera-based attention and focus monitoring
- **Performance Analytics**: Detailed progress tracking and reporting
- **Teacher Dashboard**: Comprehensive student performance insights
- **Parent Portal**: Progress reports and communication tools

## 🛠 Technical Architecture

### Frontend Stack
- **React.js** with TypeScript for web application
- **Tailwind CSS** for responsive design
- **Shadcn/UI** for component library
- **Lucide React** for icons

### Backend Stack (Planned)
- **Node.js** with Express.js
- **Socket.io** for real-time communication
- **WebRTC** for video calling
- **MongoDB** for database

### AI & ML Integration
- **OpenAI API** for AI tutoring
- **Google Translate API** for live translation
- **TensorFlow.js** for face detection
- **Speech Recognition API** for voice interaction

### Security Features
- **JWT Authentication** for secure login
- **End-to-end Encryption** for communications
- **Browser Fingerprinting** for device identification
- **Activity Monitoring** for proctoring

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- Modern web browser with camera/microphone access

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd rural-gyan-aangan
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:5173
```

### Environment Setup

Create a `.env` file in the root directory:
```env
VITE_OPENAI_API_KEY=your_openai_api_key
VITE_GOOGLE_TRANSLATE_API_KEY=your_google_translate_key
VITE_WEBRTC_CONFIG=your_webrtc_configuration
```

## 📱 Features Walkthrough

### 1. Virtual Classroom
- Join live classes with video and audio
- Interactive whiteboard for real-time collaboration
- Multi-language chat with translation
- Screen sharing for presentations
- Engagement monitoring and analytics

### 2. AI Tutor
- Ask questions in natural language
- Get step-by-step solutions
- Voice interaction capabilities
- Personalized learning recommendations
- 24/7 availability

### 3. Code Lab
- Write and execute code online
- Multiple programming languages
- Code templates and examples
- Project-based learning
- Collaborative coding environment

### 4. Secure Testing
- Proctored online examinations
- Real-time monitoring and surveillance
- Violation detection and logging
- Secure browser environment
- Automated grading system

## 🎯 Target Impact

### For Students
- **Digital Literacy**: Exposure to modern technology and tools
- **Quality Education**: Access to expert teachers and AI tutoring
- **Skill Development**: Programming and technical skills
- **Language Skills**: Multilingual learning environment
- **Future Readiness**: Preparation for digital economy

### For Teachers
- **Enhanced Teaching**: Modern tools for effective instruction
- **Student Analytics**: Detailed insights into student performance
- **Resource Access**: Rich library of educational content
- **Professional Development**: Training on digital teaching methods

### For Community
- **Bridge Digital Divide**: Equal access to quality education
- **Economic Development**: Skilled workforce for local industries
- **Social Mobility**: Better opportunities for rural students
- **Cultural Preservation**: Content in local languages

## 📊 Success Metrics

- **Student Enrollment**: Target 2000+ rural students
- **Teacher Adoption**: 150+ teachers using the platform
- **Course Completion**: 95% course completion rate
- **Skill Assessment**: Measurable improvement in digital literacy
- **Employment**: Increased employability of rural students

## 🔮 Future Roadmap

### Phase 1 (Current)
### Phase 2 (Next 3 months)
- 📱 Mobile application development

## 🧭 User Roles & Roadmap (Added)

The project now defines three primary user roles with dashboards and responsibilities. This roadmap reflects the `update.md` requirements and the planned mobile support.

### User roles

- Admin: full system access — teacher & student management, logs, and reports.
- Teacher: conduct virtual classes, setup quizzes, view allocated subjects and class-level analytics.
- Student: attend virtual classes (live translation), access materials, use AI Tutor, and use the virtual code editor.

### Short-term roadmap (next steps)

1. Implement role-based authentication and protected routes (Admin / Teacher / Student).
2. Create data models for Teacher, Student and Logs (attendance, performance, reviews).
3. Build admin UI to view/manage teachers/students and logs.
4. Wire teacher dashboards to the virtual classroom and quiz creation flows.
5. Add student dashboard features: AI Tutor integration, code editor, and proctored exams.

### Mobile App

- A React Native (Expo) mobile app will be developed in parallel. See `docs/mobile-plan.md` for the scaffold and milestones.
- Mobile will support English/Hindi and offline caching for low-bandwidth scenarios.

### How this was added

- Basic placeholder pages were added under `src/pages/` for Admin, Teacher and Student dashboards to serve as starting points.
- A small `LanguageToggle` component was added at `src/components/ui/LanguageToggle.tsx` to persist language preference locally.
- Specification docs were added under `docs/` (`roles.md`, `mobile-plan.md`).
- 🔄 Offline-first architecture
- 🎮 Gamification and rewards system
- 📚 Expanded curriculum content

### Phase 3 (Next 6 months)
- 🤝 Integration with government education systems
- 📈 Advanced analytics and reporting
- 🌐 Multi-school collaboration features
- 🎓 Certification and assessment programs

### Phase 4 (Next 12 months)
- 🚀 AI-powered personalized learning paths
- 🔬 Virtual labs for science experiments
- 🎨 Creative tools for arts and design
- 🌍 Expansion to other rural areas

## 🤝 Contributing

We welcome contributions from developers, educators, and community members!

### How to Contribute
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

### Areas for Contribution
- Frontend development
- Backend API development
- AI/ML model integration
- UI/UX design improvements
- Content creation
- Testing and quality assurance

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact & Support

- **Project Lead**: [Your Name]
- **Email**: [your.email@example.com]
- **GitHub**: [github.com/your-username]
- **Documentation**: [project-docs-url]

## 🙏 Acknowledgments

- Punjab Education Department for curriculum guidance
- Rural schools in Nabha for feedback and testing
- Open source community for tools and libraries
- Students and teachers for continuous feedback

---

**शिक्षा सेतु** - *Bridging the gap between rural and urban education through technology*

*"Education is the most powerful weapon which you can use to change the world." - Nelson Mandela*