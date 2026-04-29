/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { StudentProfile, TranscriptEntry } from '../types';

interface StudentContextType {
  profile: StudentProfile | null;
  grades: TranscriptEntry[];
  updateProfile: (updates: Partial<StudentProfile>) => Promise<boolean>;
  isSaving: boolean;
  isLoadingData: boolean;
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
  login: (email: string, studentId: string, role?: 'student' | 'teacher' | 'admin') => Promise<boolean>;
  signup: (email: string, studentId: string, firstName: string, lastName: string) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshData: () => Promise<void>;
  students: StudentProfile[];
  updateStudentGrade: (studentId: string, moduleCode: string, newGrade: string) => Promise<void>;
}

const defaultProfile: StudentProfile = {
  firstName: 'Elijah Miguel',
  lastName: 'Ornopia',
  email: 'elijahmiguel012207@gmail.com',
  phone: '0970-176-7945',
  language: 'English (US)',
  studentId: '2024-SIS-001',
  class: '12-JUPITER',
  college: 'TVL-ICT',
  status: 'Active Student',
  role: 'student',
};

const mockStudents: StudentProfile[] = [
  { firstName: 'John Carlo', lastName: 'Geronio', email: 'john@example.com', phone: '', language: 'English', studentId: '2024-SIS-002', class: '12-JUPITER', college: 'TVL-ICT', status: 'Active Student', role: 'student' },
  { firstName: 'Benjo Laurence', lastName: 'Silos', email: 'benjo@example.com', phone: '', language: 'English', studentId: '2024-SIS-003', class: '12-MARS', college: 'TVL-ICT', status: 'Active Student', role: 'student' },
];

const defaultGrades: TranscriptEntry[] = [
  { id: '1', studentId: '2024-SIS-001', module: 'Research 2', code: 'RES 2', instructor: 'Dr. Marlou M. Tangaliin', credits: 1.0, assessment: 'Paper & Defense', grade: '95' },
  { id: '2', studentId: '2024-SIS-001', module: "3I's", code: "3IS", instructor: 'Dr. Marlou M. Tangaliin', credits: 1.0, assessment: 'Portfolio', grade: '92' },
  { id: '3', studentId: '2024-SIS-001', module: 'Entrepreneurship', code: 'ENTREP', instructor: 'Mr. Jash Aiden Cortes III', credits: 1.0, assessment: 'Business Plan', grade: '88' },
  { id: '4', studentId: '2024-SIS-001', module: 'CSS (NC II)', code: 'ICT-CSS', instructor: 'Mr. Joseph Peter Simeon', credits: 1.0, assessment: 'Practical Exam', grade: '98' },
  { id: '5', studentId: '2024-SIS-001', module: 'HOPE', code: 'PE', instructor: 'Mr. Arbie Sadsad', credits: 1.0, assessment: 'Skills Test', grade: '90' },
  { id: '6', studentId: '2024-SIS-001', module: 'Work Immersion', code: 'WI', instructor: 'Mr. Charles Faz Jr.', credits: 1.0, assessment: 'Final Report', grade: '96' },
];

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export function StudentProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [grades, setGrades] = useState<TranscriptEntry[]>(defaultGrades);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    // Simulate auth check
    const checkAuth = () => {
      const storedUser = localStorage.getItem('southdale_v4_user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setProfile(userData.profile);
        setIsAuthenticated(true);
      }
      
      const storedGrades = localStorage.getItem('southdale_v4_grades');
      if (storedGrades) {
        setGrades(JSON.parse(storedGrades));
      }
      
      setIsCheckingAuth(false);
      setIsLoadingData(false);
    };

    const timer = setTimeout(checkAuth, 1000);
    return () => clearTimeout(timer);
  }, []);

  const signup = async (email: string, studentId: string, firstName: string, lastName: string) => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newProfile: StudentProfile = {
      ...defaultProfile,
      firstName,
      lastName,
      email,
      studentId,
    };
    
    localStorage.setItem('southdale_v4_user', JSON.stringify({ profile: newProfile }));
    setProfile(newProfile);
    setIsAuthenticated(true);
    setIsSaving(false);
    return true;
  };

  const login = async (email: string, studentId: string, role?: 'student' | 'teacher' | 'admin') => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, we accept any non-empty student ID
    if (studentId) {
      const storedUser = localStorage.getItem('southdale_user');
      let finalProfile: StudentProfile;

      if (storedUser) {
        const userData = JSON.parse(storedUser);
        finalProfile = {
          ...userData.profile,
          role: role || userData.profile.role || 'student'
        };
      } else {
        finalProfile = {
          ...defaultProfile,
          studentId: studentId,
          role: role || 'student'
        };
      }

      localStorage.setItem('southdale_v4_user', JSON.stringify({ profile: finalProfile }));
      setProfile(finalProfile);
      setIsAuthenticated(true);
      setIsSaving(false);
      return true;
    }
    
    setIsSaving(false);
    throw new Error("Institutional credential rejected.");
  };

  const logout = async () => {
    localStorage.removeItem('southdale_v4_user');
    setIsAuthenticated(false);
    setProfile(null);
  };

  const refreshData = async () => {
    setIsLoadingData(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsLoadingData(false);
  };

  const updateProfile = async (updates: Partial<StudentProfile>) => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setProfile(prev => {
      if (!prev) return null;
      const updated = { ...prev, ...updates };
      localStorage.setItem('southdale_v4_user', JSON.stringify({ profile: updated }));
      return updated;
    });
    
    setIsSaving(false);
    return true;
  };

  const updateStudentGrade = async (studentId: string, moduleCode: string, newGrade: string) => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 600));
    
    setGrades(prev => {
      let found = false;
      let updated = prev.map(entry => {
        if (entry.studentId === studentId && entry.code === moduleCode) {
          found = true;
          return { ...entry, grade: newGrade };
        }
        return entry;
      });

      if (!found) {
        // Only add if it's one of the valid default courses
        const course = defaultGrades.find(g => g.code === moduleCode);
        if (course) {
          const newEntry: TranscriptEntry = {
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            studentId,
            module: course.module,
            code: moduleCode,
            instructor: course.instructor,
            credits: course.credits,
            assessment: course.assessment,
            grade: newGrade
          };
          updated = [...updated, newEntry];
        }
      }
      
      localStorage.setItem('southdale_v4_grades', JSON.stringify(updated));
      return updated;
    });
    
    setIsSaving(false);
  };

  return (
    <StudentContext.Provider value={{ 
      profile: profile || defaultProfile, 
      grades,
      updateProfile, 
      isSaving, 
      isLoadingData,
      isAuthenticated, 
      isCheckingAuth,
      login, 
      signup, 
      logout,
      refreshData,
      students: mockStudents,
      updateStudentGrade
    }}>
      {children}
    </StudentContext.Provider>
  );
}

export function useStudent() {
  const context = useContext(StudentContext);
  if (context === undefined) {
    throw new Error('useStudent must be used within a StudentProvider');
  }
  return context;
}
