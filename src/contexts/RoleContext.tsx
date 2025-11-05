import React, { createContext, useContext, useState, useEffect } from 'react';
import { BaseUser, AdminProfile, TeacherProfile, StudentProfile } from '@/types/users';

interface RoleContextType {
  user: BaseUser | null;
  userRole: 'admin' | 'teacher' | 'student' | null;
  adminProfile?: AdminProfile;
  teacherProfile?: TeacherProfile;
  studentProfile?: StudentProfile;
  setUser: (user: BaseUser) => void;
  hasPermission: (permission: string) => boolean;
  canAccessFeature: (feature: string) => boolean;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<BaseUser | null>(null);
  const [adminProfile, setAdminProfile] = useState<AdminProfile>();
  const [teacherProfile, setTeacherProfile] = useState<TeacherProfile>();
  const [studentProfile, setStudentProfile] = useState<StudentProfile>();

  const setUser = (newUser: BaseUser) => {
    setUserState(newUser);
    // Load role-specific profile based on user role
    loadUserProfile(newUser);
  };

  const loadUserProfile = async (user: BaseUser) => {
    switch (user.role) {
      case 'admin':
        // Load admin profile
        setAdminProfile({
          permissions: ['manage_teachers', 'manage_students', 'view_logs', 'system_admin'],
          systemAccess: ['all'],
          canManageTeachers: true,
          canManageStudents: true,
          canViewAllLogs: true
        });
        break;
      case 'teacher':
        // Load teacher profile
        setTeacherProfile({
          employeeId: 'T001',
          qualifications: ['B.Ed', 'M.Sc Mathematics'],
          subjects: [],
          classes: [],
          hireDate: new Date(),
          status: 'active',
          performanceRating: 4.5,
          totalLectures: 150,
          leavesTaken: 5
        });
        break;
      case 'student':
        // Load student profile
        setStudentProfile({
          enrollmentNo: '2024-001',
          currentStandard: '10',
          section: 'A',
          rollNo: '001',
          classTeacher: 'Mrs. Sharma',
          parentContact: '+91-9876543210',
          address: 'Nabha, Punjab',
          dateOfBirth: new Date('2008-01-01'),
          admissionDate: new Date('2024-01-01')
        });
        break;
    }
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    
    switch (user.role) {
      case 'admin':
        return adminProfile?.permissions.includes(permission) || false;
      case 'teacher':
        return ['create_quiz', 'manage_class', 'view_students'].includes(permission);
      case 'student':
        return ['take_quiz', 'join_class', 'use_ai_tutor'].includes(permission);
      default:
        return false;
    }
  };

  const canAccessFeature = (feature: string): boolean => {
    if (!user) return false;

    const roleFeatures = {
      admin: ['teacher_management', 'student_management', 'system_logs', 'analytics'],
      teacher: ['virtual_classroom', 'quiz_setup', 'student_performance', 'class_management'],
      student: ['virtual_classroom', 'ai_tutor', 'code_editor', 'materials', 'performance_tracker']
    };

    return roleFeatures[user.role]?.includes(feature) || false;
  };

  return (
    <RoleContext.Provider value={{
      user,
      userRole: user?.role || null,
      adminProfile,
      teacherProfile,
      studentProfile,
      setUser,
      hasPermission,
      canAccessFeature
    }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within RoleProvider');
  }
  return context;
}