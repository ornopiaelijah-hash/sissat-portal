/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Clock, Calendar, Info, MapPin, User } from 'lucide-react';
import { useStudent } from '../context/StudentContext';

const SCHEDULE_DATA = [
  {
    time: '08:00 - 08:55 AM',
    monday: { subject: 'Research 2', instructor: 'S. Marlou', color: 'bg-orange-500/20 text-orange-200 border-orange-500/30' },
    tuesday: { subject: 'Research 2', instructor: 'S. Marlou', color: 'bg-orange-500/20 text-orange-200 border-orange-500/30' },
    wednesday: null,
    thursday: { subject: 'Entrepreneurship', instructor: '', color: 'bg-green-500/20 text-green-200 border-green-500/30' },
    friday: { subject: 'Food & Beverages 2', instructor: '', color: 'bg-pink-500/20 text-pink-200 border-pink-500/30' },
    saturday: { subject: 'Work Immersion', instructor: '', color: 'bg-yellow-500/20 text-yellow-200 border-yellow-500/30' },
  },
  {
    time: '08:55 - 09:50 AM',
    monday: { subject: "3I's", instructor: 'S. Marlou', color: 'bg-orange-500/20 text-orange-200 border-orange-500/30' },
    tuesday: { subject: "3I's", instructor: 'S. Marlou', color: 'bg-orange-500/20 text-orange-200 border-orange-500/30' },
    wednesday: null,
    thursday: { subject: 'Entrepreneurship', instructor: '', color: 'bg-green-500/20 text-green-200 border-green-500/30' },
    friday: { subject: 'CSS (NC II)', instructor: '', color: 'bg-yellow-600/20 text-yellow-100 border-yellow-600/30' },
    saturday: { subject: 'HOPE', instructor: '', color: 'bg-orange-600/20 text-orange-100 border-orange-600/30' },
  },
  {
    time: '09:50 - 10:10 AM',
    isBreak: true,
    label: 'SHORT BREAK',
  },
  {
    time: '10:10 - 11:05 AM',
    monday: null,
    tuesday: null,
    wednesday: null,
    thursday: { subject: 'Food & Beverages 2', instructor: '', color: 'bg-pink-500/20 text-pink-200 border-pink-500/30' },
    friday: { subject: 'Bartending 3&4', instructor: '', color: 'bg-yellow-400/20 text-yellow-100 border-yellow-400/30' },
    saturday: null,
  },
  {
    time: '11:05 - 12:00 NN',
    monday: null,
    tuesday: null,
    wednesday: null,
    thursday: { subject: 'Bartending 3&4 / CSS (NC II)', instructor: '', color: 'bg-yellow-400/20 text-yellow-100 border-yellow-400/30' },
    friday: { subject: 'HOPE', instructor: '', color: 'bg-orange-600/20 text-orange-100 border-orange-600/30' },
    saturday: null,
  },
  {
    time: '12:00 - 01:00 PM',
    isBreak: true,
    label: 'LUNCH BREAK',
  },
  {
    time: '01:00 - 01:55 PM',
    isEmpty: true,
  },
  {
    time: '01:55 - 02:50 PM',
    isEmpty: true,
  },
  {
    time: '02:50 - 03:10 PM',
    isBreak: true,
    label: 'SHORT BREAK',
  },
  {
    time: '03:10 - 04:05 PM',
    isEmpty: true,
  },
  {
    time: '04:05 - 05:00 PM',
    isEmpty: true,
  },
];

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const TimeDisplay = ({ range }: { range: string }) => {
  const parts = range.split(' - ');
  if (parts.length !== 2) return <span className="font-mono text-[10px] font-bold">{range}</span>;
  
  const start = parts[0];
  const endParts = parts[1].split(' ');
  const end = endParts[0];
  const period = endParts[1] || '';

  return (
    <div className="flex flex-col items-center justify-center gap-0.5 leading-none py-2 translate-y-1">
      <span className="text-base font-bold text-on-surface font-mono tracking-tighter">{start}</span>
      <div className="h-px w-4 bg-white/10 my-1" />
      <span className="text-base font-bold text-on-surface font-mono tracking-tighter">{end}</span>
      <span className="text-[9px] font-bold text-secondary uppercase tracking-[0.2em] mt-1.5">{period}</span>
    </div>
  );
};

export default function Schedule() {
  const { profile } = useStudent();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto"
    >
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <Calendar className="text-secondary" size={24} />
          <span className="text-secondary font-bold uppercase tracking-[0.3em] text-xs">Academic Calendar</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-on-surface tracking-tight font-headline mb-4 uppercase">
          Class Schedule
        </h1>
        <div className="flex flex-wrap items-center gap-6 text-on-surface-variant text-sm font-medium">
          <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg border border-white/10">
            <Info size={16} className="text-secondary" />
            <span>Grade 12 - Jupiter (TVL-ICT/HE)</span>
          </div>
          <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg border border-white/10">
            <Clock size={16} className="text-secondary" />
            <span>SY 2025-2026</span>
          </div>
        </div>
      </header>

      <div className="bg-surface-container rounded-2xl border border-white/5 editorial-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-primary-container border-b border-white/10">
                <th className="p-6 text-left text-[10px] font-bold uppercase tracking-[0.2em] text-secondary border-r border-white/5 w-40">Time</th>
                {DAYS.map(day => (
                  <th key={day} className="p-6 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface min-w-[160px] border-r border-white/5 last:border-r-0">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SCHEDULE_DATA.map((row, idx) => {
                if (row.isBreak) {
                  return (
                    <tr key={idx} className="bg-white/5 border-b border-white/5">
                      <td className="p-4 text-center text-on-surface-variant border-r border-white/5">
                        <TimeDisplay range={row.time} />
                      </td>
                      <td colSpan={6} className="p-4 text-center">
                        <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-secondary/60 italic">
                          {row.label}
                        </span>
                      </td>
                    </tr>
                  );
                }

                if (row.isEmpty) {
                  return (
                    <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                      <td className="p-6 text-center text-on-surface-variant border-r border-white/5">
                         <TimeDisplay range={row.time} />
                      </td>
                      {Array.from({ length: 6 }).map((_, i) => (
                        <td key={i} className="p-6 border-r border-white/5 last:border-r-0" />
                      ))}
                    </tr>
                  );
                }

                return (
                  <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                    <td className="p-6 text-center text-on-surface-variant border-r border-white/5">
                      <TimeDisplay range={row.time} />
                    </td>
                    {[row.monday, row.tuesday, row.wednesday, row.thursday, row.friday, row.saturday].map((cell, i) => (
                      <td key={i} className="p-4 border-r border-white/5 last:border-r-0 align-top">
                        {cell ? (
                          <motion.div 
                            whileHover={{ scale: 1.02 }}
                            className={`p-4 rounded-xl border ${cell.color} shadow-lg shadow-black/20`}
                          >
                            <p className="text-sm font-bold leading-tight mb-2 uppercase tracking-wide">{cell.subject}</p>
                            {cell.instructor && (
                              <div className="flex items-center gap-1.5 opacity-80 mt-auto">
                                <User size={10} />
                                <span className="text-[10px] font-bold uppercase tracking-wider">{cell.instructor}</span>
                              </div>
                            )}
                          </motion.div>
                        ) : null}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <footer className="mt-12 flex flex-col md:flex-row justify-between items-center bg-surface-container rounded-xl p-8 border border-white/5 gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center border border-secondary/20">
            <Info className="text-secondary" size={20} />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-secondary mb-1">Administrative Note</p>
            <p className="text-xs text-on-surface-variant font-medium">Schedule is subject to institutional adjustments. DRRR status: <span className="text-on-surface font-bold">TBA</span></p>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="bg-secondary text-primary px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-xl">
            Export iCal
          </button>
          <button className="bg-white/5 border border-white/10 text-on-surface px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all">
            Print Version
          </button>
        </div>
      </footer>
    </motion.div>
  );
}
