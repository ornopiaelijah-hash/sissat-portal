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
  login: (email: string, studentId: string) => Promise<boolean>;
  signup: (email: string, studentId: string, firstName: string, lastName: string) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshData: () => Promise<void>;
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
  status: 'Active Student'
};

const defaultGrades: TranscriptEntry[] = [
  { id: '1', module: 'Advanced Computer Architecture', code: 'CS301', instructor: 'Dr. Sarah Vance', credits: 3.0, assessment: 'Final Exam', grade: '1.25' },
  { id: '2', module: 'Database Systems & Design', code: 'CS302', instructor: 'Prof. Marcus Chen', credits: 3.0, assessment: 'Term Project', grade: '1.0' },
  { id: '3', module: 'Human-Computer Interaction', code: 'IT305', instructor: 'Elena Rodriguez', credits: 3.0, assessment: 'Usability Audit', grade: '1.5' },
  { id: '4', module: 'Professional Ethics in Computing', code: 'ETH101', instructor: 'Fr. Julian Santos', credits: 2.0, assessment: 'Case Analysis', grade: '1.0' },
  { id: '5', module: 'Data Structures & Algorithms II', code: 'CS202', instructor: 'Dr. Alan Turing', credits: 3.0, assessment: 'Coding Sprint', grade: '1.75' },
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
      const storedUser = localStorage.getItem('southdale_user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setProfile(userData.profile);
        setIsAuthenticated(true);
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
    
    localStorage.setItem('southdale_user', JSON.stringify({ profile: newProfile }));
    setProfile(newProfile);
    setIsAuthenticated(true);
    setIsSaving(false);
    return true;
  };

  const login = async (email: string, studentId: string) => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, we accept the student ID "3518" as requested by user in previous turns
    // or any non-empty student ID
    if (studentId) {
      const storedUser = localStorage.getItem('southdale_user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setProfile(userData.profile);
      } else {
        setProfile({
          ...defaultProfile,
          studentId: studentId
        });
      }
      setIsAuthenticated(true);
      setIsSaving(false);
      return true;
    }
    
    setIsSaving(false);
    throw new Error("Institutional credential rejected.");
  };

  const logout = async () => {
    localStorage.removeItem('southdale_user');
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
      localStorage.setItem('southdale_user', JSON.stringify({ profile: updated }));
      return updated;
    });
    
    setIsSaving(false);
    return true;
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
      refreshData
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
