// Database service with Firebase integration
interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  language: string;
  createdAt: Date;
}

interface ClassSession {
  id: string;
  title: string;
  teacherId: string;
  students: string[];
  startTime: Date;
  endTime?: Date;
  isActive: boolean;
}

interface TestResult {
  id: string;
  studentId: string;
  testId: string;
  answers: {[questionId: string]: string};
  score: number;
  violations: string[];
  submittedAt: Date;
}

export class DatabaseService {
  // Mock data for demo
  private static users: User[] = [
    {
      id: '1',
      name: 'राम प्रकाश शर्मा',
      email: 'teacher@example.com',
      role: 'teacher',
      language: 'hi',
      createdAt: new Date()
    },
    {
      id: '2',
      name: 'प्रिया कुमारी',
      email: 'student@example.com',
      role: 'student',
      language: 'hi',
      createdAt: new Date()
    }
  ];

  private static sessions: ClassSession[] = [
    {
      id: '1',
      title: 'गणित कक्षा - कक्षा 10',
      teacherId: '1',
      students: ['2'],
      startTime: new Date(),
      isActive: true
    }
  ];

  static async getUser(id: string): Promise<User | null> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return this.users.find(user => user.id === id) || null;
  }

  static async createUser(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const user: User = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    this.users.push(user);
    return user;
  }

  static async getActiveSession(teacherId: string): Promise<ClassSession | null> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return this.sessions.find(session => 
      session.teacherId === teacherId && session.isActive
    ) || null;
  }

  static async createSession(sessionData: Omit<ClassSession, 'id'>): Promise<ClassSession> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const session: ClassSession = {
      ...sessionData,
      id: Date.now().toString()
    };
    this.sessions.push(session);
    return session;
  }

  static async joinSession(sessionId: string, studentId: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 100));
    const session = this.sessions.find(s => s.id === sessionId);
    if (session && !session.students.includes(studentId)) {
      session.students.push(studentId);
      return true;
    }
    return false;
  }

  static async saveTestResult(result: Omit<TestResult, 'id'>): Promise<TestResult> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const testResult: TestResult = {
      ...result,
      id: Date.now().toString()
    };
    // In real app, save to Firebase/PostgreSQL
    return testResult;
  }

  static async saveCode(code: string, language: string, userId: string): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const codeId = Date.now().toString();
    // In real app, save to database
    if (typeof window !== 'undefined') {
      localStorage.setItem(`code_${codeId}`, JSON.stringify({
        code,
        language,
        userId,
        timestamp: new Date().toISOString()
      }));
    }
    return codeId;
  }

  static async getStudentProgress(studentId: string): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return {
      totalClasses: 25,
      attendedClasses: 23,
      averageScore: 85,
      completedAssignments: 18,
      totalAssignments: 20
    };
  }
}

export default DatabaseService;