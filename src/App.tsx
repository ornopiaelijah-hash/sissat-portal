/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import StudentProfile from './pages/StudentProfile';
import Settings from './pages/Settings';
import Schedule from './pages/Schedule';
import GradeManagement from './pages/GradeManagement';
import GradingSystem from './pages/GradingSystem';
import FacultyDashboard from './pages/FacultyDashboard';
import StudentGrades from './pages/StudentGrades';
import RoleGuard from '@/components/RoleGuard';
import { StudentProvider, useStudent } from './context/StudentContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import LandingPage from './pages/LandingPage';
import { Loader2 } from 'lucide-react';

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isCheckingAuth } = useStudent();
  
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <Loader2 className="animate-spin text-secondary" size={48} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function ComingSoon() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
      <h2 className="text-4xl font-headline font-bold text-on-surface mb-4">Module Under Maintenance</h2>
      <p className="text-secondary uppercase tracking-widest text-sm font-bold">Southdale International School Archive</p>
      <div className="mt-8 p-4 bg-white/5 rounded-lg border border-white/10 max-w-md">
        <p className="text-on-surface-variant text-sm">
          Access to this academic register is temporarily restricted for scheduled synchronization. 
          Please return at the start of the next term.
        </p>
      </div>
    </div>
  );
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isCheckingAuth } = useStudent();
  
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <Loader2 className="animate-spin text-secondary" size={48} />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <StudentProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
          <Route element={<AuthGuard><Layout /></AuthGuard>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/profile" element={<StudentProfile />} />
            <Route path="/academic-records" element={<GradingSystem />} />
            <Route 
              path="/grades" 
              element={
                <RoleGuard allowedRoles={['faculty', 'admin']}>
                  <FacultyDashboard />
                </RoleGuard>
              } 
            />
            <Route path="/settings" element={<Settings />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/admissions" element={<ComingSoon />} />
            <Route path="/about" element={<ComingSoon />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </StudentProvider>
  );
}
