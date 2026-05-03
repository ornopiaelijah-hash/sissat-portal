/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserPlus, ArrowRight, Lock, Mail, User, ShieldCheck, AlertCircle, GraduationCap, CheckCircle2, Shield, Loader2, Sun, Moon } from 'lucide-react';
import { useStudent } from '../context/StudentContext';
import { useNavigate, Link } from 'react-router-dom';
import { LOGO_URL } from '../constants';

export default function Signup() {
  const { signup, theme, toggleTheme } = useStudent();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [college, setCollege] = useState('TVL-ICT');
  const [role, setRole] = useState<'student' | 'faculty' | 'admin'>('student');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedPassword = 'password123'; // Default password for demo sync
    const sanitizedFirstName = firstName.trim();
    const sanitizedLastName = lastName.trim();
    const selectedRole = role;

    try {
      const success = await signup(sanitizedEmail, sanitizedPassword, undefined, sanitizedFirstName, sanitizedLastName, selectedRole, undefined, college);
      if (success) {
        setIsSuccess(true);
      }
    } catch (err: any) {
      setError(err.message || 'Enrollment sequence failed. Please check your details.');
    } finally {
      setIsLoading(false);
    }
  };

  const roles = [
    { id: 'student', label: 'Student', icon: GraduationCap },
    { id: 'faculty', label: 'Faculty', icon: Shield },
    { id: 'admin', label: 'Admin', icon: Lock },
  ] as const;

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Theme Toggle */}
      <button 
        onClick={toggleTheme}
        className="absolute top-6 right-6 p-3 rounded-xl bg-surface-container border border-on-surface/10 text-on-surface hover:text-secondary hover:border-secondary transition-all z-20 shadow-xl"
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-container rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-on-surface/5 rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl border-4 border-primary-container mb-6 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-secondary/5 group-hover:bg-secondary/10 transition-colors" />
            <img 
              alt="Southdale Logo" 
              className="w-12 h-12 object-contain relative z-10" 
              src={LOGO_URL}
            />
          </div>
          <h1 className="text-3xl text-on-surface font-black tracking-tighter mb-2 font-headline uppercase leading-tight">
            SISSAT-PORTAL
          </h1>
          <p className="text-secondary italic uppercase tracking-[0.3em] text-[8px] font-bold font-sans">Institutional Enrollment Sequence</p>
        </div>

        <div className="bg-surface-container border border-on-surface/10 rounded-2xl velvet-depth p-8 relative overflow-hidden">
          <header className="mb-6 border-b border-on-surface/5 pb-4">
            <h2 className="text-xl font-bold text-on-surface font-headline mb-1">Create Account</h2>
            <p className="text-on-surface-variant text-xs">Fill in your details to get started.</p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-secondary mb-3 block">Access Protocol</label>
              <div className="grid grid-cols-3 gap-2">
                {roles.map((r) => {
                  const Icon = r.icon;
                  const isActive = role === r.id;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setRole(r.id)}
                      className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-all duration-300 ${
                        isActive 
                          ? 'bg-secondary/10 border-secondary shadow-[0_0_15px_rgba(212,175,55,0.1)]' 
                          : 'bg-primary-container/20 border-on-surface/5 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 hover:border-on-surface/20'
                      }`}
                    >
                      <Icon size={16} className={isActive ? 'text-secondary' : 'text-on-surface-variant'} />
                      <span className={`text-[8px] font-black uppercase tracking-widest ${isActive ? 'text-secondary' : 'text-on-surface-variant'}`}>
                        {r.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-secondary mb-1.5 block">First Name</label>
                <div className="relative group">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-secondary transition-colors" size={16} />
                  <input 
                    required
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter your first name"
                    className="w-full bg-primary-container/20 border border-on-surface/10 rounded-lg py-3 pl-10 pr-3 text-sm text-on-surface focus:outline-none focus:border-secondary transition-all placeholder:text-on-surface-variant/30"
                  />
                </div>
              </div>
              <div className="relative">
                <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-secondary mb-1.5 block">Last Name</label>
                <div className="relative group">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-secondary transition-colors" size={16} />
                  <input 
                    required
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter your last name"
                    className="w-full bg-primary-container/20 border border-on-surface/10 rounded-lg py-3 pl-10 pr-3 text-sm text-on-surface focus:outline-none focus:border-secondary transition-all placeholder:text-on-surface-variant/30"
                  />
                </div>
              </div>
            </div>

            {role === 'student' && (
              <div className="relative">
                <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-secondary mb-1.5 block">Academic Track / Department</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setCollege('TVL-ICT')}
                    className={`p-3 rounded-lg border text-[10px] font-bold uppercase tracking-widest transition-all ${
                      college === 'TVL-ICT' 
                        ? 'bg-secondary/10 border-secondary text-secondary shadow-[0_0_10px_rgba(212,175,55,0.1)]' 
                        : 'bg-primary-container/20 border-on-surface/5 text-on-surface-variant opacity-60 hover:opacity-100 hover:border-on-surface/20'
                    }`}
                  >
                    TVL-ICT
                  </button>
                  <button
                    type="button"
                    onClick={() => setCollege('TVL-H.E')}
                    className={`p-3 rounded-lg border text-[10px] font-bold uppercase tracking-widest transition-all ${
                      college === 'TVL-H.E' 
                        ? 'bg-secondary/10 border-secondary text-secondary shadow-[0_0_10px_rgba(212,175,55,0.1)]' 
                        : 'bg-primary-container/20 border-on-surface/5 text-on-surface-variant opacity-60 hover:opacity-100 hover:border-on-surface/20'
                    }`}
                  >
                    TVL-H.E
                  </button>
                </div>
              </div>
            )}

            <div className="relative">
              <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-secondary mb-1.5 block">
                {role === 'student' ? 'Institutional Student ID' : role === 'faculty' ? 'Faculty Access Code' : 'Administrator Key'}
              </label>
              <div className="relative group">
                <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-secondary transition-colors" size={16} />
                <input 
                  required
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={role === 'student' ? 'e.g. 3518' : role === 'faculty' ? 'FAC-XXXX' : 'ADM-XXXX'}
                  className="w-full bg-primary-container/20 border border-on-surface/10 rounded-lg py-3 pl-10 pr-3 text-sm text-on-surface focus:outline-none focus:border-secondary transition-all placeholder:text-on-surface-variant/30"
                />
              </div>
              <p className="text-[8px] text-on-surface-variant uppercase tracking-widest font-bold mt-2 text-center opacity-60">Institutional ID acts as your secure entry token</p>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div 
                   initial={{ opacity: 0, height: 0 }}
                   animate={{ opacity: 1, height: 'auto' }}
                   exit={{ opacity: 0, height: 0 }}
                   className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-start gap-2"
                >
                   <AlertCircle className="text-red-400 shrink-0 mt-0.5" size={14} />
                   <p className="text-[10px] text-red-400 leading-relaxed font-medium uppercase tracking-wider">{error}</p>
                </motion.div>
              )}
              {isSuccess && (
                <motion.div 
                   initial={{ opacity: 0, height: 0 }}
                   animate={{ opacity: 1, height: 'auto' }}
                   exit={{ opacity: 0, height: 0 }}
                   className="bg-secondary/10 border border-secondary/20 rounded-lg p-4 flex items-start gap-3"
                >
                   <CheckCircle2 className="text-secondary shrink-0 mt-0.5" size={16} />
                   <div>
                     <p className="text-xs text-on-surface font-bold uppercase tracking-wider mb-1">Authorization Pending</p>
                     <p className="text-[10px] text-on-surface-variant leading-relaxed">
                       Your enrollment sequence has been initiated. Please check your **institutional email** to verify your account and complete the synchronization.
                     </p>
                   </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button 
              disabled={isLoading}
              className="w-full bg-secondary text-on-secondary py-3.5 rounded-lg font-black tracking-[0.4em] text-[10px] uppercase transition-all hover:brightness-110 hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 mt-4 shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              {isLoading ? (
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-primary-container rounded-full animate-bounce" />
                  <div className="w-1 h-1 bg-primary-container rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1 h-1 bg-primary-container rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              ) : (
                <>
                  Sign Up <UserPlus size={14} />
                </>
              )}
            </button>
          </form>

          <footer className="mt-6 pt-4 border-t border-on-surface/5 text-center">
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">
              Already have an account?{' '}
              <Link to="/login" className="text-secondary hover:underline ml-1">Sign In</Link>
            </p>
          </footer>
        </div>
      </motion.div>
    </div>
  );
}
