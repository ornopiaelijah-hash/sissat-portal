/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { NavLink } from 'react-router-dom';
import { useStudent } from '../context/StudentContext';
import { LayoutDashboard, Calendar, GraduationCap, BookOpen, UserCheck, Settings, LifeBuoy, LogOut, User, ClipboardList } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { LOGO_URL } from '../constants';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', to: '/dashboard' },
  { icon: Calendar, label: 'Schedule', to: '/schedule' },
  { icon: GraduationCap, label: 'Courses', to: '/courses' },
  { icon: Settings, label: 'Settings', to: '/settings' },
];

export function Sidebar() {
  const { profile, logout, emailVerified, sendVerification } = useStudent();
  const [isSending, setIsSending] = React.useState(false);
  const [isSent, setIsSent] = React.useState(false);

  const handleResend = async () => {
    setIsSending(true);
    try {
      await sendVerification();
      setIsSent(true);
      setTimeout(() => setIsSent(false), 5000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <aside className="bg-primary fixed left-0 top-0 h-full w-72 pt-28 border-r border-on-primary/5 flex flex-col z-40 hidden md:flex">
      

      <nav className="flex flex-col gap-1 flex-1">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            className={({ isActive }) => cn(
              "flex items-center gap-4 py-4 px-8 transition-all duration-200 border-l-4 border-transparent",
              isActive 
                ? "bg-secondary text-on-secondary border-secondary shadow-lg shadow-secondary/10" 
                : "text-on-primary/70 hover:bg-on-primary/5 hover:text-on-primary hover:translate-x-1"
            )}
          >
            <item.icon size={20} />
            <span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em]">{item.label}</span>
          </NavLink>
        ))}
        {profile.role === 'student' && (
          <>
            <NavLink
              to="/profile"
              className={({ isActive }) => cn(
                "flex items-center gap-4 py-4 px-8 transition-all duration-200 border-l-4 border-transparent",
                isActive 
                  ? "bg-secondary text-on-secondary border-secondary shadow-lg shadow-secondary/10" 
                  : "text-on-primary/70 hover:bg-on-primary/5 hover:text-on-primary hover:translate-x-1"
              )}
            >
              <User size={20} />
              <span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em]">Student Profile</span>
            </NavLink>
            <NavLink
              to="/academic-records"
              className={({ isActive }) => cn(
                "flex items-center gap-4 py-4 px-8 transition-all duration-200 border-l-4 border-transparent",
                isActive 
                  ? "bg-secondary text-on-secondary border-secondary shadow-lg shadow-secondary/10" 
                  : "text-on-primary/70 hover:bg-on-primary/5 hover:text-on-primary hover:translate-x-1"
              )}
            >
              <BookOpen size={20} />
              <span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em]">Academic Records</span>
            </NavLink>
          </>
        )}
        {(profile.role === 'admin' || profile.role === 'faculty') && (
          <NavLink
            to="/grades"
            className={({ isActive }) => cn(
              "flex items-center gap-4 py-4 px-8 transition-all duration-200 border-l-4 border-transparent",
              isActive 
                ? "bg-secondary text-on-secondary border-secondary shadow-lg shadow-secondary/10" 
                : "text-on-primary/70 hover:bg-on-primary/5 hover:text-on-primary hover:translate-x-1"
            )}
          >
            <ClipboardList size={20} />
            <span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em]">Faculty Dashboard</span>
          </NavLink>
        )}
      </nav>

      <div className="mt-auto px-6 pb-12 flex flex-col gap-4">
        <button className="w-full flex items-center justify-center gap-2 border border-on-primary/20 text-on-primary py-3 rounded hover:bg-on-primary/5 hover:border-on-primary/40 transition-all font-bold uppercase text-[10px] tracking-widest">
          <LifeBuoy size={14} />
          Student Support
        </button>
        <button 
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 text-red-400/80 hover:text-red-400 py-2 font-bold uppercase text-[10px] tracking-widest group transition-colors"
        >
          <LogOut size={14} className="group-hover:rotate-12 transition-transform" />
          Logout
        </button>
      </div>
    </aside>
  );
}
