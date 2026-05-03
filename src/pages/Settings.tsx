/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Shield, Key, CheckCircle, LogOut, User } from 'lucide-react';
import { useStudent } from '../context/StudentContext';
import { LOGO_URL } from '../constants';

export default function Settings() {
  const { profile, logout } = useStudent();

  const isFaculty = profile.role === 'faculty' || profile.role === 'admin';

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden"
    >
      {/* Background Faded Logo */}
      <div className="absolute -right-32 -top-32 opacity-10 rotate-12 select-none pointer-events-none transform scale-150 [mask-image:radial-gradient(circle,black_20%,transparent_70%)] z-0">
        <img src={LOGO_URL} alt="" className="w-[500px] h-[500px] grayscale brightness-125 contrast-75" />
      </div>

      <header className="mb-16">
        <nav className="flex items-center gap-2 text-on-surface-variant text-[10px] mb-6 uppercase tracking-[0.2em] font-bold">
          <span>Portal</span>
          <ChevronRight size={12} />
          <span className="text-secondary">Account Settings</span>
        </nav>
        <h1 className="text-5xl md:text-6xl text-on-surface font-bold tracking-tight mb-4 font-headline">
          {isFaculty ? 'Institutional Registry' : 'The Student Ledger'}
        </h1>
        <p className="text-xl text-on-surface-variant max-w-2xl leading-relaxed italic">
          Manage your institutional identity, security protocols, and academic contact preferences within the Southdale International School ecosystem.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
        {/* Left Stats/Quick Navigation */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-surface-container p-8 rounded-xl editorial-shadow border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110 duration-500" />
            <div className="relative z-10">
              <div className="w-24 h-24 rounded-xl mb-6 ring-2 ring-secondary/20 flex items-center justify-center bg-white/5 shadow-2xl">
                {profile.role === 'admin' ? (
                  <Shield className="text-secondary/60" size={48} />
                ) : (
                  <User className="text-secondary/60" size={48} />
                )}
              </div>
              <h2 className="text-2xl font-bold text-on-surface mb-1 font-headline">
                {profile.role === 'admin' ? 'System Administrator' : profile.role === 'faculty' ? 'Faculty Member' : `${profile.fullName || profile.firstName + ' ' + profile.lastName}`}
              </h2>
              <p className="text-secondary text-xs font-bold uppercase tracking-widest mb-6">
                {profile.role === 'admin' ? 'Administrative Lead' : profile.role === 'faculty' ? 'Instructor' : `${profile.college} • ${profile.class}`}
              </p>
              <div className="space-y-4 pt-6 border-t border-white/10">
                {!isFaculty && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-on-surface-variant">Student ID</span>
                    <span className="font-mono font-bold text-on-surface">{profile.studentId}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-xs">
                  <span className="text-on-surface-variant">Department</span>
                  <span className="font-bold text-on-surface">
                    {isFaculty ? 'TVL - ICT' : profile.college}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-surface-container p-2 rounded-xl flex flex-col gap-1 border border-white/5">
            {profile.role === 'admin' ? (
              <div className="flex items-center justify-center w-full p-4 rounded-lg bg-secondary/10 border border-secondary/20 text-secondary shadow-lg font-black uppercase text-[10px] tracking-[0.2em]">
                Admin Access Authorized
              </div>
            ) : profile.role === 'faculty' ? (
              <div className="flex items-center justify-center w-full p-4 rounded-lg bg-secondary/10 border border-secondary/20 text-secondary shadow-lg font-black uppercase text-[10px] tracking-[0.2em]">
                Faculty ID Verified
              </div>
            ) : (
              <>
                <button className="flex items-center justify-between w-full p-4 rounded-lg bg-secondary text-on-secondary shadow-lg font-bold uppercase text-[10px] tracking-widest">
                  Profile Details <ChevronRight size={14} />
                </button>
                <button className="flex items-center justify-between w-full p-4 rounded-lg text-on-surface-variant hover:bg-white/5 transition-all text-[10px] font-bold uppercase tracking-widest">
                  Security & Privacy <ChevronRight size={14} />
                </button>
              </>
            )}
            <button className="flex items-center justify-between w-full p-4 rounded-lg text-on-surface-variant hover:bg-white/5 transition-all text-[10px] font-bold uppercase tracking-widest">
              Notification Ledger <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* Right Form Area */}
        <div className="lg:col-span-8 space-y-12">
          <section className="bg-surface-container p-10 rounded-xl border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <Shield size={120} className="text-on-surface" />
            </div>
            <h3 className="text-3xl font-bold text-on-surface mb-8 border-b-2 border-secondary inline-block pb-2 font-headline">Security Protocols</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-6 bg-primary rounded-xl border border-white/5 hover:border-secondary/30 transition-all cursor-pointer group">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-white/5 text-secondary rounded-lg flex items-center justify-center transition-transform group-hover:scale-110">
                    <Key size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-on-surface group-hover:text-secondary transition-colors">Master Access Key</p>
                    <p className="text-sm text-on-surface-variant">Last updated 14 days ago.</p>
                  </div>
                </div>
                <button className="text-secondary font-bold uppercase text-[10px] tracking-widest hover:underline">Revise</button>
              </div>

              <div className="flex items-center justify-between p-6 bg-primary rounded-xl border border-secondary/10 group cursor-default">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-lg flex items-center justify-center">
                    <CheckCircle size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-on-surface">Multi-Factor Authentication</p>
                    <p className="text-sm text-on-surface-variant">Active via Southdale Authenticator app.</p>
                  </div>
                </div>
                <div className="bg-secondary text-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm">
                  SECURE
                </div>
              </div>

              <div className="flex items-center justify-between p-6 bg-primary rounded-xl border border-white/5 hover:border-red-500/30 transition-all cursor-pointer group">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-red-500/5 text-red-400/80 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110">
                    <LogOut size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-on-surface group-hover:text-red-400 transition-colors">Session Ledger</p>
                    <p className="text-sm text-on-surface-variant">Active on 3 institutional devices.</p>
                  </div>
                </div>
                <button 
                  onClick={logout}
                  className="text-red-400/80 font-bold uppercase text-[10px] tracking-widest hover:underline"
                >
                  Terminate
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
}
