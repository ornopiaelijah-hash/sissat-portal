/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, ArrowRight, Lock, Mail, GraduationCap, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { useStudent } from '../context/StudentContext';
import { useNavigate, Link } from 'react-router-dom';
import { LOGO_URL } from '../constants';

export default function Login() {
  const { login } = useStudent();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const sanitizedEmail = email.trim().toLowerCase();

    try {
      const success = await login(sanitizedEmail, password);
      if (success) {
        navigate('/');
      }
    } catch (err: any) {
      setError(err.message || 'Authorization failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-20">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-surface-container rounded-2xl border border-white/10 mb-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-secondary/5 group-hover:bg-secondary/10 transition-colors" />
            <img 
              alt="Southdale Logo" 
              className="w-12 h-12 object-contain relative z-10" 
              src={LOGO_URL}
            />
          </div>
          <h1 className="text-3xl text-on-surface font-bold tracking-tight mb-2 font-headline uppercase leading-tight">
            Southdale International School <br />
            <span className="text-lg opacity-80">of Science, Arts and Technology</span>
          </h1>
          <p className="text-secondary italic uppercase tracking-[0.3em] text-[10px] font-bold">Institutional Student Portal</p>
        </div>

        <div className="bg-surface-container border border-white/5 rounded-xl editorial-shadow p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <Shield size={120} className="text-on-surface" />
          </div>

          <header className="mb-8 border-b border-white/5 pb-6">
            <h2 className="text-2xl font-bold text-on-surface font-headline mb-1">Electronic Access</h2>
            <p className="text-on-surface-variant text-sm">Synchronize with your academic ledger.</p>
          </header>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-secondary mb-2 block">Institutional Student ID</label>
                  <div className="relative group">
                    <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-secondary transition-colors" size={18} />
                    <input 
                      required
                      type="text"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="e.g. 3518"
                      className="w-full bg-primary/50 border border-white/10 rounded-lg py-5 pl-12 pr-4 text-on-surface focus:outline-none focus:border-secondary transition-all placeholder:text-on-surface-variant/30 font-mono text-xl"
                    />
                  </div>
                  <p className="mt-2 text-[9px] text-on-surface-variant/60 uppercase tracking-widest text-center italic">Institutional ID acts as your secure entry token</p>
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
                      
                      {/* Show email field if ID lookup fails so they can provide email for the first time */}
                      <div className="mt-4 pt-4 border-t border-white/5">
                        <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-on-surface-variant/60 mb-2 block">First-time Sync Email</label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40" size={16} />
                          <input 
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="student@southdale.edu.ph"
                            className="w-full bg-primary/30 border border-white/5 rounded-lg py-3 pl-10 pr-4 text-xs text-on-surface-variant focus:outline-none focus:border-secondary transition-all placeholder:text-on-surface-variant/20"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button 
                disabled={isLoading}
                className="w-full bg-secondary text-primary py-5 rounded-xl font-black tracking-[0.4em] text-xs uppercase transition-all hover:brightness-110 hover:shadow-2xl hover:shadow-secondary/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 mt-4 shadow-xl"
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

          <footer className="mt-8 pt-6 border-t border-white/5 flex flex-col gap-4">
            <div className="text-center pt-2 space-y-4">
              <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">
                Don't have an account? <Link to="/signup" className="text-secondary hover:underline ml-1">Sign Up</Link>
              </p>
            </div>
          </footer>
        </div>
        
        <div className="mt-8 flex justify-center items-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">
          <span className="hover:text-secondary cursor-pointer transition-colors">Privacy Lexicon</span>
          <div className="w-1 h-1 rounded-full bg-white/10" />
          <span className="hover:text-secondary cursor-pointer transition-colors">System Status</span>
        </div>
      </motion.div>
    </div>
  );
}
