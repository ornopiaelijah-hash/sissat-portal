/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { COURSES, SUBMISSIONS, LOGO_URL } from '../constants';
import { BookOpen, Book, ArrowRight } from 'lucide-react';

export default function Courses() {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden"
    >
      {/* Background Faded Logo */}
      <div className="absolute -right-32 -top-32 opacity-10 rotate-12 select-none pointer-events-none transform scale-150 [mask-image:radial-gradient(circle,black_20%,transparent_70%)] z-0">
        <img src={LOGO_URL} alt="" className="w-[500px] h-[500px] grayscale brightness-125 contrast-75" />
      </div>

      <header className="mb-16">
        <h1 className="text-5xl md:text-7xl font-headline font-bold text-on-surface tracking-tight mb-4">My Courses</h1>
        <p className="text-on-surface-variant max-w-2xl text-lg font-light leading-relaxed">
          Refining the pursuit of excellence through curated academic paths. Manage your current enrollments, track milestones, and access specialized research materials.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-24">
        {/* Featured Card */}
        <div className="md:col-span-12 bg-surface-container rounded-xl overflow-hidden editorial-shadow flex flex-col lg:flex-row min-h-[400px] border border-white/5 hover:border-white/10 transition-colors group">
          <div className="lg:w-1/2 relative overflow-hidden">
            <img 
              alt={COURSES[0].title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              src={COURSES[0].image}
            />
            <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors" />
          </div>
          <div className="lg:w-1/2 p-10 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-6">
                <span className="text-[10px] font-bold uppercase tracking-widest text-secondary">{COURSES[0].category}</span>
                <BookOpen className="text-secondary" size={20} />
              </div>
              <h2 className="text-3xl font-headline font-bold text-on-surface mb-4 group-hover:text-secondary transition-colors">
                {COURSES[0].title}
              </h2>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-8">{COURSES[0].description}</p>
            </div>
            <div>
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-on-surface mb-2">
                <span>Progress</span>
                <span>{COURSES[0].progress}%</span>
              </div>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${COURSES[0].progress}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full metallic-glow" 
                />
              </div>
              <div className="mt-8 flex gap-4">
                <button className="bg-secondary-container text-primary px-6 py-3 text-xs font-bold uppercase tracking-widest rounded-lg hover:brightness-110 transition-all active:scale-95">Continue Reading</button>
                <button className="text-on-surface px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors border border-white/10 rounded-lg active:scale-95">Resources</button>
              </div>
            </div>
          </div>
        </div>

        {/* Other Courses */}
        {COURSES.slice(1).map((course) => (
          <div key={course.id} className="md:col-span-4 bg-surface-container p-8 rounded-xl editorial-shadow flex flex-col justify-between border border-white/5 hover:border-white/10 transition-all group">
            <div>
              <div className="w-full h-40 mb-6 bg-primary overflow-hidden rounded-lg relative">
                <img 
                  alt={course.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  src={course.image}
                />
                <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/5 transition-opacity" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-secondary-container/70">{course.category}</span>
              <h3 className="text-xl font-headline font-bold text-on-surface mt-2 mb-4 group-hover:text-secondary transition-colors">
                {course.title}
              </h3>
            </div>
            <div className="mt-8">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">
                <span>Progress</span>
                <span>{course.progress}%</span>
              </div>
              <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: `${course.progress}%` }}
                   transition={{ duration: 1, delay: 0.7 }}
                   className="h-full bg-secondary" 
                />
              </div>
              <div className="mt-6 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-all">
                <button className="bg-secondary/20 hover:bg-secondary/40 text-secondary-container text-[10px] font-bold uppercase px-4 py-2 rounded-lg transition-colors">Resume Unit</button>
                <Book className="text-secondary/50" size={16} />
              </div>
            </div>
          </div>
        ))}

      </div>

      <section className="relative">
        <h2 className="text-3xl font-headline font-bold text-on-surface mb-8">Upcoming Submissions</h2>
        <div className="bg-surface-container rounded-xl editorial-shadow overflow-hidden border border-white/5 relative">
          {/* Under Development Overlay */}
          <div className="absolute inset-0 bg-primary/40 backdrop-blur-[2px] z-10 flex items-center justify-center pointer-events-none">
            <div className="bg-secondary/90 text-primary px-8 py-4 rounded-lg shadow-2xl skew-x-[-12deg] border-2 border-primary/20">
              <span className="block text-2xl font-headline font-bold uppercase tracking-tighter skew-x-[12deg]">Portal Under Development</span>
              <span className="block text-[10px] uppercase tracking-[0.3em] font-bold mt-1 text-center skew-x-[12deg]">Online Submissions Coming Soon</span>
            </div>
          </div>
          
          <div className="grid grid-cols-12 px-8 py-6 bg-white/5 text-[10px] font-bold uppercase tracking-[0.2em] text-secondary opacity-20">
            <div className="col-span-6">Assignment</div>
            <div className="col-span-3">Due Date</div>
            <div className="col-span-3 text-right">Action</div>
          </div>
          {SUBMISSIONS.map((sub) => (
             <div key={sub.id} className="grid grid-cols-12 px-8 py-8 items-center hover:bg-white/5 transition-colors group cursor-pointer border-b border-white/5 last:border-0 opacity-20 filter grayscale">
              <div className="col-span-6">
                <p className="font-headline font-bold text-on-surface text-lg group-hover:text-secondary transition-colors">{sub.assignment}</p>
                <p className="text-xs text-on-surface-variant mt-1">{sub.course}</p>
              </div>
              <div className="col-span-3">
                <span className={`px-3 py-1 text-[10px] font-bold uppercase rounded-sm ${
                  sub.status === 'In 2 Days' ? 'bg-red-500/80 text-white' : 'bg-white/10 text-on-surface-variant'
                }`}>
                  {sub.status === 'In 2 Days' ? sub.status : sub.dueDate}
                </span>
              </div>
              <div className="col-span-3 text-right">
                <button className="text-secondary font-bold text-[10px] uppercase tracking-widest border-b border-secondary/20 pb-1 hover:border-secondary transition-all">
                  {sub.action}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
