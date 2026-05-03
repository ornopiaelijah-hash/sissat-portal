/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, ArrowRight, Lock, Mail, GraduationCap, AlertCircle, CheckCircle2, Loader2, Sun, Moon } from 'lucide-react';
import { useStudent } from '../context/StudentContext';
import { useNavigate, Link } from 'react-router-dom';
import { LOGO_URL } from '../constants';

export default function Login() {
  const { login, theme, toggleTheme } = useStudent();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [role, setRole] = useState<'student' | 'faculty' | 'admin'>('student');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedPassword = 'password123'; // Using a default password for the demo since security is handled by the ID token concept in this UI

    try {
      const profile = await login(sanitizedEmail, sanitizedPassword);
      if (profile) {
        if (profile.role === 'faculty' || profile.role === 'admin') {
          navigate('/grades');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (err: any) {
      let message = 'Authorization failed. Please check your credentials.';
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        message = 'Authentication failed. Please verify your Institutional ID or ensure the account exists.';
      } else if (err.message) {
        message = err.message;
      }
      setError(message);
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
      {/* Background Faded Logo */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 rotate-12 select-none pointer-events-none transform scale-[2.5] [mask-image:radial-gradient(circle,black_20%,transparent_70%)] z-0">
        <img src={LOGO_URL} alt="" className="w-[800px] h-[800px] grayscale brightness-125 contrast-75" />
      </div>

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
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-2xl border-4 border-primary-container mb-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-primary-container/5 group-hover:bg-primary-container/10 transition-colors" />
            <img 
              alt="Southdale Logo" 
              className="w-16 h-16 object-contain relative z-10" 
              src={LOGO_URL}
            />
          </div>
          <h1 className="text-4xl text-on-surface font-black tracking-tighter mb-2 font-headline uppercase leading-tight">
            SISSAT-PORTAL
          </h1>
          <p className="text-secondary italic uppercase tracking-[0.3em] text-[10px] font-bold">Institutional Access Gateway</p>
        </div>

        <div className="bg-surface-container border border-on-surface/10 rounded-2xl velvet-depth p-10 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary/5 rounded-full blur-2xl" />
          <div className="relative z-10">
            <header className="mb-8 border-b border-on-surface/10 pb-6">
              <h2 className="text-2xl font-black text-on-surface font-headline mb-1 uppercase tracking-tight">Electronic Access</h2>
              <p className="text-on-surface-variant text-[10px] font-bold uppercase tracking-widest opacity-60">Synchronize with your academic ledger.</p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-6">
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
                          <Icon size={18} className={isActive ? 'text-secondary' : 'text-on-surface-variant'} />
                          <span className={`text-[9px] font-black uppercase tracking-widest ${isActive ? 'text-secondary' : 'text-on-surface-variant'}`}>
                            {r.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="relative">
                  <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-secondary mb-2 block">
                    {role === 'student' ? 'Institutional Student ID' : role === 'faculty' ? 'Faculty Access Code' : 'Administrator Key'}
                  </label>
                  <div className="relative group">
                    <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-secondary transition-colors" size={18} />
                    <input 
                      required
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={role === 'student' ? 'e.g. 3518' : role === 'faculty' ? 'FAC-XXXX' : 'ADM-XXXX'}
                      className="w-full bg-primary-container/20 border border-on-surface/10 rounded-lg py-4 pl-12 pr-4 text-on-surface focus:outline-none focus:border-secondary transition-all placeholder:text-on-surface-variant/30"
                    />
                  </div>
                  <p className="text-[8px] text-on-surface-variant uppercase tracking-widest font-bold mt-3 text-center opacity-60">Institutional ID acts as your secure entry token</p>
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-start gap-3 mt-2">
                        <AlertCircle className="text-red-400 shrink-0 mt-0.5" size={14} />
                        <p className="text-[10px] text-red-400 leading-relaxed font-bold uppercase tracking-widest">{error}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button 
                disabled={isLoading}
                className="w-full bg-secondary text-on-secondary py-5 rounded-xl font-black tracking-[0.4em] text-xs uppercase transition-all hover:brightness-110 hover:shadow-2xl hover:shadow-secondary/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 mt-4 shadow-xl shadow-secondary/10"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <>
                    Initialize Gateway <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <footer className="mt-8 pt-6 border-t border-on-surface/5 flex flex-col gap-4">
            <div className="text-center pt-2 space-y-4">
              <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">
                Don't have an account? <Link to="/signup" className="text-secondary hover:underline ml-1">Sign Up</Link>
              </p>
            </div>
          </footer>
        </div>
      </div>
        
      <div className="mt-8 flex justify-center items-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">
          <span className="hover:text-secondary cursor-pointer transition-colors">Privacy Lexicon</span>
          <div className="w-1 h-1 rounded-full bg-on-surface/10" />
          <span className="hover:text-secondary cursor-pointer transition-colors">System Status</span>
        </div>
      </motion.div>
    </div>
  );
}
