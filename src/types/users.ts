// Updated user types for 3-tier system

export interface BaseUser {
  id: string;
  username: string;
  fullName: string;
  email: string;
  role: 'admin' | 'teacher' | 'student';
  language: 'en' | 'hi';
  createdAt: Date;
  updatedAt: Date;
}

export interface AdminProfile {
  permissions: string[];
  systemAccess: string[];
  canManageTeachers: boolean;
  canManageStudents: boolean;
  canViewAllLogs: boolean;
}

export interface TeacherProfile {
  employeeId: string;
  qualifications: string[];
  subjects: Subject[];
  classes: Class[];
  hireDate: Date;
  status: 'active' | 'inactive' | 'on_leave';
  performanceRating: number;
  totalLectures: number;
  leavesTaken: number;
}

export interface StudentProfile {
  enrollmentNo: string; // Format: (Year)-RollNo e.g., "2024-001"
  currentStandard: string; // e.g., "10"
  section: string; // e.g., "A"
  rollNo: string;
  classTeacher: string;
  parentContact: string;
  parentEmail?: string;
  address: string;
  photo?: string;
  dateOfBirth: Date;
  admissionDate: Date;
}

export interface Subject {
  id: string;
  name: string;
  code: string; // e.g., "MATH10", "SCI9"
  description: string;
  standard: string;
}

export interface Class {
  id: string;
  name: string; // e.g., "Class 10-A"
  standard: string; // e.g., "10"
  section: string; // e.g., "A"
  classTeacherId: string;
  students: StudentProfile[];
  subjects: Subject[];
}