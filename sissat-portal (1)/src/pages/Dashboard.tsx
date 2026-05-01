/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { LECTURES, DEADLINES, ANNOUNCEMENTS, LOGO_URL } from '../constants';
import { Calendar, FileText, ChevronLeft, ChevronRight, ArrowRight, X, Trophy } from 'lucide-react';
import { useStudent } from '../context/StudentContext';
import { Announcement } from '../types';

export default function Dashboard() {
  const { profile } = useStudent();
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence>
        {selectedAnnouncement && (
          /* ... modal content ... */
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAnnouncement(null)}
              className="absolute inset-0 bg-primary/80 backdrop-blur-md"
            />
            <motion.div 
              layoutId={`announcement-${selectedAnnouncement.id}`}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-surface-container w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl relative z-10 border border-white/10"
            >
              <button 
                onClick={() => setSelectedAnnouncement(null)}
                className="absolute top-4 right-4 z-20 p-2 bg-primary/50 hover:bg-primary rounded-full text-on-surface transition-all"
              >
                <X size={20} />
              </button>

              <div className="aspect-video relative">
                {selectedAnnouncement.image && (
                  <img 
                    src={selectedAnnouncement.image} 
                    alt={selectedAnnouncement.title}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent" />
                <div className="absolute bottom-6 left-8">
                  <span className="bg-secondary text-primary text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded mb-3 inline-block shadow-lg">
                    {selectedAnnouncement.category}
                  </span>
                  <h2 className="text-3xl font-headline font-bold text-on-surface tracking-tight">
                    {selectedAnnouncement.title}
                  </h2>
                </div>
              </div>

              <div className="p-8 space-y-6">
                <p className="text-on-surface-variant leading-relaxed text-lg italic">
                  "{selectedAnnouncement.content}"
                </p>

                {selectedAnnouncement.details && (
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary flex items-center gap-2">
                       Event Schedule & Key Information
                    </h4>
                    <div className="space-y-3 bg-white/5 p-6 rounded-xl border border-white/5">
                      {selectedAnnouncement.details.map((detail, idx) => (
                        <div key={idx} className="flex gap-4 items-start py-2 border-b border-white/5 last:border-0">
                          <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0 shadow-[0_0_8px_#775a19]" />
                          <p className="text-on-surface font-sans text-sm leading-relaxed">{detail}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4 flex justify-between items-center text-on-surface-variant font-bold text-[10px] uppercase tracking-widest">
                  <span>Institutional Notice • {selectedAnnouncement.date}</span>
                  <button 
                    onClick={() => setSelectedAnnouncement(null)}
                    className="bg-secondary text-primary px-6 py-3 rounded-lg hover:brightness-110 transition-all shadow-xl active:scale-95"
                  >
                    Acknowledged
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <header className="mb-12 flex flex-col md:flex-row justify-between md:items-end gap-4 relative overflow-hidden p-8 bg-surface-container rounded-2xl border border-white/5">
        <div className="absolute -right-16 -top-16 opacity-[0.03] rotate-12 select-none pointer-events-none">
          <img src={LOGO_URL} alt="" className="w-96 h-96 grayscale" />
        </div>
        <div className="relative z-10">
          <h1 className="text-4xl text-on-surface font-bold tracking-tight mb-2 font-headline">
            {profile.role === 'admin' ? 'System Console' : profile.role === 'teacher' ? 'Faculty Portal' : `Welcome back, ${profile.firstName}`}
          </h1>
          {profile.role === 'student' && (
            <p className="text-on-surface-variant font-sans">{profile.college} • {profile.class}</p>
          )}
          {profile.role === 'teacher' && (
            <p className="text-on-surface-variant font-sans font-medium italic">Welcome back, Instructor</p>
          )}
          {profile.role === 'admin' && (
            <p className="text-on-surface-variant font-sans font-medium italic">Welcome back, System Administrator</p>
          )}
        </div>
        <div className="hidden lg:flex items-center gap-3 bg-white/5 px-6 py-3 rounded-xl border border-white/10 relative z-10">
          <img src={LOGO_URL} className="w-8 h-8 object-contain" alt="Branding" />
          <div className="text-[10px] font-bold uppercase tracking-widest text-secondary">Institutional Synchronization Active</div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-16">
        {/* Main Schedule Card */}
        <section className="md:col-span-8 bg-primary-container p-8 md:p-10 rounded-xl editorial-shadow border-l-4 border-secondary group">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl text-on-surface font-bold tracking-tight flex items-center gap-3 font-headline">
              <Calendar className="text-secondary" />
              {profile.role === 'admin' ? 'Recent Administrative Activity' : "Today's Classes"}
            </h2>
            <Link to={profile.role === 'admin' ? '/grades' : '/schedule'} className="text-[10px] font-bold uppercase tracking-widest text-secondary hover:underline transition-colors">
              {profile.role === 'admin' ? 'All Student Records' : 'Full Schedule'}
            </Link>
          </div>

          <div className="space-y-6">
            {LECTURES.map((lecture, idx) => (
              <div 
                key={lecture.id}
                className={`flex items-start gap-6 p-4 -mx-4 hover:bg-white/5 transition-all duration-200 rounded-lg cursor-pointer ${idx > 0 ? 'border-t border-white/5 pt-6' : ''}`}
              >
                <div className="w-20 pt-1 text-right shrink-0">
                  <div className="text-sm font-bold text-on-surface">{lecture.time}</div>
                  <div className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">{lecture.duration}</div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-headline text-on-surface group-hover:text-secondary transition-colors">{lecture.title}</h3>
                  <p className="text-sm text-on-surface-variant mb-2">{lecture.instructor} • {lecture.location}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-primary text-on-surface px-2 py-0.5 text-[10px] font-bold rounded uppercase border border-white/10">{lecture.type}</span>
                    {lecture.notes && (
                      <span className="bg-white/5 text-on-surface-variant px-2 py-0.5 text-[10px] font-bold rounded uppercase">{lecture.notes}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Side Stats */}
        <section className="md:col-span-4 space-y-8">
          <div className="bg-surface-container p-8 rounded-xl border border-white/5">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary mb-6">Upcoming Deadlines</h3>
            <ul className="space-y-4">
              {DEADLINES.map((deadline) => (
                <li key={deadline.id} className="flex items-center justify-between group cursor-pointer hover:bg-white/5 -mx-2 px-2 py-2 rounded transition-colors">
                  <div>
                    <p className="text-sm font-bold text-on-surface group-hover:text-secondary transition-colors">{deadline.title}</p>
                    <p className="text-[10px] text-error font-bold uppercase">Due in {deadline.dueDate}</p>
                  </div>
                  <FileText size={18} className="text-on-surface-variant group-hover:text-secondary transition-all" />
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-primary-container p-8 rounded-xl border border-secondary/10 hover:border-secondary/30 transition-all cursor-pointer group velvet-depth">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-secondary">
                {profile.role === 'admin' ? 'System Uptime' : 'Attendance Rate'}
              </span>
            </div>
            <div className="text-3xl font-headline text-on-surface mb-2">{profile.role === 'admin' ? '99.9%' : '98.4%'}</div>
            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: profile.role === 'admin' ? '99.9%' : '98.4%' }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-secondary shadow-[0_0_10px_#775a19]" 
              />
            </div>
          </div>
        </section>
      </div>

      <section className="mt-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl text-on-surface font-bold tracking-tight font-headline">Institutional Announcements</h2>
          <div className="flex gap-2">
            <button className="p-2 border border-white/10 rounded-lg hover:bg-white/10 hover:text-secondary transition-all">
              <ChevronLeft size={20} />
            </button>
            <button className="p-2 border border-white/10 rounded-lg hover:bg-white/10 hover:text-secondary transition-all">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ANNOUNCEMENTS.map((announcement) => (
            <div 
              key={announcement.id} 
              onClick={() => setSelectedAnnouncement(announcement)}
              className="group relative overflow-hidden rounded-xl aspect-[4/3] shadow-lg cursor-pointer bg-surface-container border border-white/5 transition-transform hover:scale-[1.02]"
            >
              {announcement.image ? (
                <>
                  <img 
                    alt={announcement.title} 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                    src={announcement.image} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                </>
              ) : (
                <div className="absolute inset-0 bg-primary-container p-8 flex flex-col justify-between velvet-depth" />
              )}
              <div className="absolute bottom-0 p-6 w-full">
                <span className="bg-secondary text-primary text-[10px] font-bold uppercase tracking-widest px-2 py-1 mb-3 inline-block shadow-sm">
                  {announcement.category}
                </span>
                <h3 className="text-xl font-headline text-on-surface leading-tight group-hover:text-secondary transition-colors">
                  {announcement.title}
                </h3>
                <p className="text-on-surface-variant text-sm mt-2 max-h-0 group-hover:max-h-20 opacity-0 group-hover:opacity-100 transition-all duration-500 overflow-hidden line-clamp-2">
                  {announcement.content}
                </p>
                {announcement.linkText && (
                   <button className="mt-4 text-[10px] font-bold text-secondary uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                    {announcement.linkText} <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
