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
  { icon: LayoutDashboard, label: 'Dashboard', to: '/' },
  { icon: Calendar, label: 'Schedule', to: '/schedule' },
  { icon: GraduationCap, label: 'Courses', to: '/courses' },
  { icon: User, label: 'Student Profile', to: '/profile' },
  { icon: UserCheck, label: 'Admissions', to: '/admissions' },
  { icon: Settings, label: 'Settings', to: '/settings' },
];

export function Sidebar() {
  const { profile, logout } = useStudent();
  return (
    <aside className="bg-primary fixed left-0 top-0 h-full w-72 pt-28 border-r border-white/5 flex flex-col z-40 hidden md:flex">
      <div className="px-8 mb-12">
        <NavLink to="/settings" className={({ isActive }) => cn(
          "flex items-center gap-4 mb-2 group cursor-pointer p-2 -mx-2 rounded-lg transition-colors",
          isActive ? "bg-white/10" : "hover:bg-white/5"
        )}>
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white/5 border border-white/10 group-hover:border-secondary/50 transition-all shrink-0 overflow-hidden">
            {profile.avatar ? (
              <img src={profile.avatar} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User className="text-on-surface-variant group-hover:text-secondary" size={24} />
            )}
          </div>
          <div>
            <div className="text-on-surface font-bold text-sm group-hover:text-secondary transition-colors line-clamp-1">{profile.firstName} {profile.lastName}</div>
            <div className="text-on-surface-variant text-[10px] font-bold uppercase tracking-[0.1em]">
              {profile.role === 'teacher' || profile.role === 'admin' 
                ? `${profile.college} • ${profile.role === 'admin' ? 'Administrator' : 'Faculty'}`
                : `${profile.college} • ${profile.class}`
              }
            </div>
          </div>
        </NavLink>
      </div>

      <nav className="flex flex-col gap-1 flex-1">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            className={({ isActive }) => cn(
              "flex items-center gap-4 py-4 px-8 transition-all duration-200 border-l-4 border-transparent",
              isActive 
                ? "bg-secondary text-on-secondary border-secondary shadow-lg shadow-secondary/10" 
                : "text-on-surface-variant hover:bg-white/5 hover:text-on-surface hover:translate-x-1"
            )}
          >
            <item.icon size={20} />
            <span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em]">{item.label}</span>
          </NavLink>
        ))}
        {profile.role === 'student' && (
          <NavLink
            to="/academic-records"
            className={({ isActive }) => cn(
              "flex items-center gap-4 py-4 px-8 transition-all duration-200 border-l-4 border-transparent",
              isActive 
                ? "bg-secondary text-on-secondary border-secondary shadow-lg shadow-secondary/10" 
                : "text-on-surface-variant hover:bg-white/5 hover:text-on-surface hover:translate-x-1"
            )}
          >
            <BookOpen size={20} />
            <span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em]">Academic Records</span>
          </NavLink>
        )}
        {(profile.role === 'admin' || profile.role === 'teacher') && (
          <NavLink
            to="/grades"
            className={({ isActive }) => cn(
              "flex items-center gap-4 py-4 px-8 transition-all duration-200 border-l-4 border-transparent",
              isActive 
                ? "bg-secondary text-on-secondary border-secondary shadow-lg shadow-secondary/10" 
                : "text-on-surface-variant hover:bg-white/5 hover:text-on-surface hover:translate-x-1"
            )}
          >
            <ClipboardList size={20} />
            <span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em]">Grade Management</span>
          </NavLink>
        )}
      </nav>

      <div className="mt-auto px-6 pb-12 flex flex-col gap-4">
        <div className="flex items-center justify-center mb-4">
          <img 
            src={LOGO_URL} 
            alt="SIS Branding" 
            className="h-16 w-auto opacity-40 grayscale group-hover:grayscale-0 hover:opacity-100 transition-all duration-700" 
          />
        </div>
        <button className="w-full flex items-center justify-center gap-2 border border-white/20 text-on-surface py-3 rounded hover:bg-white/5 hover:border-white/40 transition-all font-bold uppercase text-[10px] tracking-widest">
          <LifeBuoy size={14} />
          {profile.role === 'teacher' || profile.role === 'admin' ? 'IT Support' : 'Student Support'}
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
