/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { StudentProfile, TranscriptEntry } from '../types';
import { auth, db, handleFirestoreError, OperationType } from '../lib/firebase';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  updateProfile as updateAuthProfile
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  collection, 
  onSnapshot, 
  query, 
  where,
  addDoc
} from 'firebase/firestore';
import { DEFAULT_SUBJECTS } from '../constants';

interface StudentContextType {
  profile: StudentProfile | null;
  grades: TranscriptEntry[];
  updateProfile: (updates: Partial<StudentProfile>) => Promise<boolean>;
  isSaving: boolean;
  isLoadingData: boolean;
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
  emailVerified: boolean;
  sendVerification: () => Promise<void>;
  login: (email: string, password: string) => Promise<any>;
  signInWithGoogle: () => Promise<void>;
  signup: (email: string, password: string, studentId: string | undefined, firstName: string, lastName: string, role?: 'student' | 'faculty' | 'admin', section?: string, college?: string) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshData: () => Promise<void>;
  students: StudentProfile[];
  updateStudentGrade: (studentId: string, moduleCode: string, gradeUpdates: Partial<TranscriptEntry>) => Promise<void>;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const defaultProfile: StudentProfile = {
  firstName: 'Elijah Miguel',
  lastName: 'Ornopia',
  fullName: 'Elijah Miguel Ornopia',
  email: 'elijahmiguel012207@gmail.com',
  phone: '0970-176-7945',
  language: 'English (US)',
  studentId: '2026-SIS-001',
  class: '12-JUPITER',
  college: 'TVL-ICT',
  status: 'Active Student',
  role: 'student',
};

const mockStudents: StudentProfile[] = [];

const defaultGrades: TranscriptEntry[] = DEFAULT_SUBJECTS.map((subject, idx) => ({
  id: (idx + 1).toString(),
  studentId: '',
  module: subject.module,
  code: subject.code,
  instructor: '',
  credits: 1.0,
  assessment: 'N/A',
  grade: 'IP',
  q1: '', q2: '', q3: '', q4: '',
  average: 'IP'
}));

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export function StudentProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [grades, setGrades] = useState<TranscriptEntry[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [emailVerified, setEmailVerified] = useState(false);
  const [students, setStudents] = useState<StudentProfile[]>(mockStudents);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setEmailVerified(user.emailVerified);
        const profilePath = `profiles/${user.uid}`;
        try {
          const profileDoc = await getDoc(doc(db, profilePath));
          if (profileDoc.exists()) {
            const profileData = profileDoc.data() as StudentProfile;
            const profileWithUid = { ...profileData, uid: user.uid };
            
            if (user.email === 'elijahmiguel012207@gmail.com' && profileData.role !== 'admin') {
              profileWithUid.role = 'admin';
              setProfile(profileWithUid);
              await updateDoc(doc(db, profilePath), { role: 'admin' });
            } else {
              setProfile(profileWithUid);
            }
            
            setIsAuthenticated(true);
          } else {
            const newProfile: StudentProfile = {
              ...defaultProfile,
              uid: user.uid,
              firstName: user.displayName?.split(' ')[0] || 'Elijah Miguel',
              lastName: user.displayName?.split(' ').slice(1).join(' ') || 'Ornopia',
              fullName: user.displayName || 'Elijah Miguel Ornopia',
              email: user.email || 'elijahmiguel012207@gmail.com',
              role: user.email === 'elijahmiguel012207@gmail.com' ? 'admin' : 'student',
            };
            await setDoc(doc(db, profilePath), newProfile);
            setProfile(newProfile);
            setIsAuthenticated(true);
          }
        } catch (error) {
          handleFirestoreError(error, OperationType.GET, profilePath);
        }
      } else {
        setProfile(null);
        setIsAuthenticated(false);
        setGrades([]);
      }
      setIsCheckingAuth(false);
      setIsLoadingData(false);
    });

    return () => unsubscribeAuth();
  }, []);

  // Real-time grades listener
  useEffect(() => {
    if (!isAuthenticated || !profile || !profile.role) return;

    const gradesPath = 'grades';
    const currentUid = auth.currentUser?.uid;
    if (!currentUid) return;

    const q = (profile.role === 'student') 
      ? query(collection(db, gradesPath), where('studentId', '==', currentUid))
      : collection(db, gradesPath);
    
    const unsubscribeGrades = onSnapshot(q, (snapshot) => {
      const dbGrades: TranscriptEntry[] = [];
      snapshot.forEach((doc) => {
        dbGrades.push({ id: doc.id, ...doc.data() } as TranscriptEntry);
      });
      setGrades(dbGrades);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, gradesPath);
    });

    return () => unsubscribeGrades();
  }, [isAuthenticated, profile?.role, profile?.studentId]);

  // Faculty/admin listener for all students
  useEffect(() => {
    if (!isAuthenticated || (profile?.role !== 'faculty' && profile?.role !== 'admin')) return;

    const profilesPath = 'profiles';
    const unsubscribeProfiles = onSnapshot(collection(db, profilesPath), (snapshot) => {
      const studentData: StudentProfile[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data() as StudentProfile;
        if (data.role === 'student') {
          studentData.push({ ...data, uid: doc.id });
        }
      });
      const sanitizedMock = mockStudents.map(s => ({ ...s, uid: s.studentId }));
      setStudents(studentData.length > 0 ? studentData : sanitizedMock);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, profilesPath);
    });

    return () => unsubscribeProfiles();
  }, [isAuthenticated, profile?.role]);

  const sendVerification = async () => {
    if (auth.currentUser) {
      const { sendEmailVerification } = await import('firebase/auth');
      await sendEmailVerification(auth.currentUser);
    }
  };

  const signup = async (
    email: string,
    password: string,
    studentId: string | undefined,
    firstName: string,
    lastName: string,
    role?: 'student' | 'faculty' | 'admin',
    section?: string,
    college?: string
  ) => {
    setIsSaving(true);
    const normalizedEmail = email.includes('@') ? email : `${email}@southdale.edu.ph`;
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, normalizedEmail, password);
      const user = userCredential.user;

      const { sendEmailVerification } = await import('firebase/auth');
      await sendEmailVerification(user);
      setEmailVerified(false);

      await updateAuthProfile(user, { displayName: `${firstName} ${lastName}` });

      const newProfile: StudentProfile = {
        firstName,
        lastName,
        fullName: `${firstName} ${lastName}`,
        email: normalizedEmail,
        phone: '',
        language: 'English (US)',
        studentId: studentId || (role === 'student' ? `SIS-${Date.now().toString().slice(-6)}` : ''),
        class: section || (role === 'student' ? '12-JUPITER' : ''),
        college: college || 'TVL-ICT',
        status: 'Active Student',
        role: role || 'student',
      };

      const profilePath = `profiles/${user.uid}`;
      await setDoc(doc(db, profilePath), newProfile);

      setProfile(newProfile);
      setIsSaving(false);
      return true;
    } catch (error: any) {
      setIsSaving(false);
      console.error('Signup error:', error);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    setIsSaving(true);
    const normalizedEmail = email.includes('@') ? email : `${email}@southdale.edu.ph`;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, normalizedEmail, password);
      const user = userCredential.user;

      const profilePath = `profiles/${user.uid}`;
      const profileDoc = await getDoc(doc(db, profilePath));
      
      if (profileDoc.exists()) {
        const profileData = profileDoc.data() as StudentProfile;
        setProfile(profileData);
        setIsSaving(false);
        return profileData;
      } else {
        throw new Error('Profile not found');
      }
    } catch (error: any) {
      setIsSaving(false);
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    await signOut(auth);
    setIsAuthenticated(false);
    setProfile(null);
    setGrades([]);
  };

  const refreshData = async () => {
    setIsLoadingData(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsLoadingData(false);
  };

  const updateProfile = async (updates: Partial<StudentProfile>) => {
    if (!auth.currentUser) return false;
    setIsSaving(true);
    
    const profilePath = `profiles/${auth.currentUser.uid}`;
    try {
      await updateDoc(doc(db, profilePath), updates);
      setProfile(prev => prev ? { ...prev, ...updates } : null);
      setIsSaving(false);
      return true;
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, profilePath);
      setIsSaving(false);
      return false;
    }
  };

  const signInWithGoogle = async () => {
    console.warn('Google login disabled');
  };

  const updateStudentGrade = async (
    studentId: string,
    moduleCode: string,
    gradeUpdates: Partial<TranscriptEntry>
  ) => {
    if (!profile || (profile.role !== 'faculty' && profile.role !== 'admin')) return;
    setIsSaving(true);

    // ✅ FIX: Use moduleCode directly — NO sanitization so codes match exactly
    // e.g. "3IS", "ICTCSS", "FB2", "BT34" are all safe for Firestore paths
    const code = moduleCode;
    const globalGradesPath = `grades/${studentId}_${code}`;
    
    try {
      // Find module name from defaults
      const course = defaultGrades.find(g => g.code === code);

      const data = {
        ...gradeUpdates,
        studentId,
        code,  // ✅ store exact code so student query matches
        module: gradeUpdates.module || course?.module || code,
        instructor: profile.fullName || `${profile.firstName} ${profile.lastName}`,
        updatedAt: new Date().toISOString()
      };

      await setDoc(doc(db, globalGradesPath), data, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, globalGradesPath);
    } finally {
      setIsSaving(false);
    }
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
      emailVerified,
      sendVerification,
      login, 
      signInWithGoogle,
      signup, 
      logout,
      refreshData,
      students,
      updateStudentGrade,
      theme,
      toggleTheme
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