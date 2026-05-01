/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserPlus, ArrowRight, Lock, Mail, User, ShieldCheck, AlertCircle, GraduationCap, CheckCircle2 } from 'lucide-react';
import { useStudent } from '../context/StudentContext';
import { useNavigate, Link } from 'react-router-dom';
import { LOGO_URL } from '../constants';

export default function Signup() {
  const { signup } = useStudent();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [studentId, setStudentId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedStudentId = studentId.trim();
    const sanitizedFirstName = firstName.trim();
    const sanitizedLastName = lastName.trim();

    try {
      const success = await signup(sanitizedEmail, sanitizedStudentId, sanitizedFirstName, sanitizedLastName);
      if (success) {
        setIsSuccess(true);
        // We don't navigate immediately if they need to verify email
      }
    } catch (err: any) {
      setError(err.message || 'Enrollment sequence failed. Please check your details.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-white/5 rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl border-4 border-primary mb-6 shadow-2xl relative overflow-hidden group">
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

        <div className="bg-surface-container border border-white/10 rounded-2xl velvet-depth p-8 relative overflow-hidden">
          <header className="mb-6 border-b border-white/5 pb-4">
            <h2 className="text-xl font-bold text-on-surface font-headline mb-1">Create Account</h2>
            <p className="text-on-surface-variant text-xs">Fill in your details to get started.</p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-4">
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
                    placeholder="Elijah"
                    className="w-full bg-primary/50 border border-white/10 rounded-lg py-3 pl-10 pr-3 text-sm text-on-surface focus:outline-none focus:border-secondary transition-all placeholder:text-on-surface-variant/30"
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
                    placeholder="Ornopia"
                    className="w-full bg-primary/50 border border-white/10 rounded-lg py-3 pl-10 pr-3 text-sm text-on-surface focus:outline-none focus:border-secondary transition-all placeholder:text-on-surface-variant/30"
                  />
                </div>
              </div>
            </div>

            <div className="relative">
              <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-secondary mb-1.5 block">Institutional Email</label>
              <div className="relative group">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-secondary transition-colors" size={16} />
                <input 
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@southdale.edu"
                  className="w-full bg-primary/50 border border-white/10 rounded-lg py-3 pl-10 pr-3 text-sm text-on-surface focus:outline-none focus:border-secondary transition-all placeholder:text-on-surface-variant/30"
                />
              </div>
            </div>

            <div className="relative">
              <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-secondary mb-1.5 block">Student ID Number</label>
              <div className="relative group">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-secondary transition-colors" size={16} />
                <input 
                  required
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="2024-XXXX-XXXX"
                  className="w-full bg-primary/50 border border-white/10 rounded-lg py-3 pl-10 pr-3 text-sm text-on-surface focus:outline-none focus:border-secondary transition-all placeholder:text-on-surface-variant/30 font-mono"
                />
              </div>
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
                  <div className="w-1 h-1 bg-primary rounded-full animate-bounce" />
                  <div className="w-1 h-1 bg-primary rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1 h-1 bg-primary rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              ) : (
                <>
                  Sign Up <UserPlus size={14} />
                </>
              )}
            </button>
          </form>

          <footer className="mt-6 pt-4 border-t border-white/5 text-center">
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
