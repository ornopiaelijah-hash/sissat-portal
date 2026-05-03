/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useStudent } from '../context/StudentContext';
import { TranscriptEntry } from '../types';
import { Users, GraduationCap, Save, Loader2, CheckCircle, Search, Calendar, Clock, User, X, Send } from 'lucide-react';
import { LOGO_URL, DEFAULT_SUBJECTS } from '../constants';

const SUBJECTS = DEFAULT_SUBJECTS.map(s => ({ name: s.module, code: s.code }));

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const SCHEDULE_DATA = [
  {
    time: '08:00 - 08:55 AM',
    monday: { subject: `Research 2`, instructor: 'S. Marlou', color: 'bg-orange-500/20 text-orange-200 border-orange-500/30' },
    tuesday: { subject: `Research 2`, instructor: 'S. Marlou', color: 'bg-orange-500/20 text-orange-200 border-orange-500/30' },
    wednesday: null,
    thursday: { subject: `Entrepreneurship`, instructor: '', color: 'bg-green-500/20 text-green-200 border-green-500/30' },
    friday: { subject: `Food & Beverages 2`, instructor: '', color: 'bg-pink-500/20 text-pink-200 border-pink-500/30' },
    saturday: { subject: `Work Immersion`, instructor: '', color: 'bg-yellow-500/20 text-yellow-200 border-yellow-500/30' },
  },
  {
    time: '08:55 - 09:50 AM',
    monday: { subject: `3I's`, instructor: 'S. Marlou', color: 'bg-orange-500/20 text-orange-200 border-orange-500/30' },
    tuesday: { subject: `3I's`, instructor: 'S. Marlou', color: 'bg-orange-500/20 text-orange-200 border-orange-500/30' },
    wednesday: null,
    thursday: { subject: `Entrepreneurship`, instructor: '', color: 'bg-green-500/20 text-green-200 border-green-500/30' },
    friday: { subject: `CSS (NC II)`, instructor: '', color: 'bg-yellow-600/20 text-yellow-100 border-yellow-600/30' },
    saturday: { subject: `HOPE`, instructor: '', color: 'bg-orange-600/20 text-orange-100 border-orange-600/30' },
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
];

const TimeDisplay = ({ range }: { range: string }) => {
  const parts = range.split(' - ');
  if (parts.length !== 2) return <span className="font-mono text-[10px] font-bold">{range}</span>;
  
  const start = parts[0];
  const endParts = parts[1].split(' ');
  const end = endParts[0];
  const period = endParts[1] || '';

  return (
    <div className="flex flex-col items-center justify-center gap-0.5 leading-none py-2 translate-y-1">
      <span className="text-xs font-bold text-on-surface font-mono tracking-tighter">{start}</span>
      <div className="h-px w-3 bg-white/10 my-1" />
      <span className="text-xs font-bold text-on-surface font-mono tracking-tighter">{end}</span>
      <span className="text-[8px] font-bold text-secondary uppercase tracking-[0.2em] mt-1">{period}</span>
    </div>
  );
};

export default function FacultyDashboard() {
  const { students, updateStudentGrade, isSaving, grades, profile } = useStudent();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCell, setActiveCell] = useState<{ studentId: string, subjectCode: string } | null>(null);
  const [localEdits, setLocalEdits] = useState<Record<string, Record<string, Partial<TranscriptEntry>>>>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'grades' | 'schedule'>('grades');

  const filteredStudents = students.filter(student => 
    `${student.firstName} ${student.lastName} ${student.studentId}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const calculateAvg = (vals: Partial<TranscriptEntry>) => {
    const quarters = [vals.q1, vals.q2, vals.q3, vals.q4];
    const valid = quarters.filter(v => v !== undefined && v !== '' && !isNaN(Number(v)));
    if (valid.length === 0) return '--';
    const sum = valid.reduce((a, b) => a + Number(b), 0);
    return Math.round(sum / valid.length).toString();
  };

  const handleQuarterChange = (studentId: string, subjectCode: string, q: string, value: string) => {
    setLocalEdits(prev => {
      const studentEdits = { ...(prev[studentId] || {}) };
      const subjectEdit = { ...(studentEdits[subjectCode] || {}) };
      
      return {
        ...prev,
        [studentId]: {
          ...studentEdits,
          [subjectCode]: { 
            ...subjectEdit, 
            [q]: value 
          }
        }
      };
    });
  };

  const handleSave = async (studentId: string, subjectCode: string) => {
    const edits = localEdits[studentId]?.[subjectCode];
    if (!edits) return;

    // Calculate final grade/average at save time
    const currentData = getDisplayData(studentId, subjectCode);
    const avg = calculateAvg({ ...currentData, ...edits });

    try {
      await updateStudentGrade(studentId, subjectCode, { 
        ...edits,
        average: avg,
        grade: avg
      });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
      setActiveCell(null);
    } catch (err) {
      setErrorText("Failed to update grade");
      setTimeout(() => setErrorText(null), 3000);
    }
  };

  const getDisplayData = (studentId: string, subjectCode: string) => {
    const gradeDoc = grades.find(g => g.studentId === studentId && g.code === subjectCode);
    const editData = localEdits[studentId]?.[subjectCode] || {};
    return { ...gradeDoc, ...editData };
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-12 relative overflow-hidden"
    >
      {/* Background Faded Logo */}
      <div className="absolute -right-32 -top-32 opacity-10 rotate-12 select-none pointer-events-none transform scale-150 [mask-image:radial-gradient(circle,black_20%,transparent_70%)] z-0">
        <img src={LOGO_URL} alt="" className="w-[500px] h-[500px] grayscale brightness-125 contrast-75" />
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-surface-container p-8 rounded-3xl border border-on-surface/5 velvet-depth relative z-10">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-secondary">
            <GraduationCap size={28} />
            <span className="text-xs font-black uppercase tracking-[0.3em]">Faculty Dashboard</span>
          </div>
          <h1 className="text-5xl font-headline font-bold text-on-surface tracking-tight">
            Hello, <span className="text-secondary italic">{profile?.firstName || 'Faculty'}</span>
          </h1>
          <p className="text-on-surface-variant max-w-xl font-medium">
            Manage academic assessments and quarterly ratings. Click any cell below to edit.
          </p>
        </div>

        <div className="flex flex-col items-end gap-3 font-sans">
          <div className="flex bg-primary-container/30 p-1 rounded-xl border border-on-surface/5">
            <button 
              onClick={() => setActiveTab('grades')}
              className={`px-6 py-2.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === 'grades' ? 'bg-secondary text-primary shadow-lg shadow-secondary/20' : 'text-on-surface-variant hover:text-on-surface'}`}
            >
              Grade Records
            </button>
            <button 
              onClick={() => setActiveTab('schedule')}
              className={`px-6 py-2.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === 'schedule' ? 'bg-secondary text-primary shadow-lg shadow-secondary/20' : 'text-on-surface-variant hover:text-on-surface'}`}
            >
              Class Schedule
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'grades' ? (
          <motion.div 
            key="grades"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6 relative z-10"
          >
            <div className="bg-surface-container rounded-[2rem] p-8 border border-on-surface/5 shadow-2xl relative overflow-hidden backdrop-blur-md">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center border border-secondary/20">
                    <Users className="text-secondary" size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-headline font-bold text-on-surface">Modular Assessment</h2>
                    <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-black">Quarterly Grading Sheet</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="relative w-full md:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50" size={18} />
                    <input
                      type="text"
                      placeholder="Search students..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-black/20 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-on-surface placeholder:text-on-surface-variant/40 focus:border-secondary focus:ring-1 focus:ring-secondary transition-all outline-none"
                    />
                  </div>
                  
                  {showSuccess && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex items-center gap-2 text-green-400 bg-green-400/10 px-4 py-2 rounded-full border border-green-400/20"
                    >
                      <CheckCircle size={14} />
                      <span className="text-[9px] font-black uppercase tracking-widest">Database Updated</span>
                    </motion.div>
                  )}
                </div>
              </div>

              <div className="overflow-x-auto rounded-3xl border border-white/5 bg-black/10">
                <table className="w-full text-left border-collapse min-w-[1000px]">
                  <thead>
                    <tr className="bg-white/[0.02]">
                      <th className="px-8 py-6 text-[10px] font-black text-secondary uppercase tracking-[0.3em] border-b border-white/5">Scholar Identity</th>
                      {SUBJECTS.map(sub => (
                        <th key={sub.code} className="px-4 py-6 text-[10px] font-black text-secondary uppercase tracking-[0.3em] border-b border-white/5 text-center min-w-[100px]">
                          {sub.code}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student) => {
                      const studentId = student.uid || '';
                      const isExpanding = activeCell?.studentId === studentId;
                      
                      return (
                        <React.Fragment key={studentId}>
                          <tr className={`group transition-all ${isExpanding ? 'bg-secondary/5' : 'hover:bg-white/[0.02] border-b border-white/5 last:border-0'}`}>
                            <td className="px-8 py-6">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center font-black text-secondary text-xs">
                                  {student.firstName[0]}
                                </div>
                                <div>
                                  <div className="font-bold text-on-surface text-sm">{student.firstName} {student.lastName}</div>
                                  <div className="text-[10px] font-mono text-on-surface-variant/60 tracking-wider uppercase">{student.studentId}</div>
                                </div>
                              </div>
                            </td>
                            {SUBJECTS.map(sub => {
                              const data = getDisplayData(studentId, sub.code);
                              const avg = calculateAvg(data);
                              const isActiveCell = activeCell?.studentId === studentId && activeCell?.subjectCode === sub.code;
                              
                              return (
                                <td 
                                  key={sub.code} 
                                  onClick={() => setActiveCell({ studentId, subjectCode: sub.code })}
                                  className={`px-2 py-6 text-center cursor-pointer transition-all ${isActiveCell ? 'ring-2 ring-inset ring-secondary bg-secondary/10' : ''}`}
                                >
                                  <div className={`text-lg font-headline font-bold ${avg !== '--' ? (Number(avg) >= 75 ? 'text-[#00ff88]' : 'text-red-400') : 'text-white/10'}`}>
                                    {avg}
                                  </div>
                                  <div className="text-[7px] font-black text-white/20 uppercase tracking-tighter mt-1">
                                    {isActiveCell ? 'Editing...' : 'Click to Set'}
                                  </div>
                                </td>
                              );
                            })}
                          </tr>
                          
                          {/* Expanded Editor Row */}
                          {isExpanding && (
                            <tr className="bg-secondary/[0.03] border-b border-secondary/20">
                              <td colSpan={SUBJECTS.length + 1} className="p-0">
                                <motion.div 
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  className="p-8 flex items-center gap-10 overflow-hidden"
                                >
                                  <div className="min-w-[140px] flex flex-col justify-center">
                                    <span className="text-[9px] font-black text-secondary uppercase tracking-[0.2em] mb-1">Subject Entry</span>
                                    <h4 className="text-xl font-headline font-bold text-white">{activeCell.subjectCode}</h4>
                                    <p className="text-[10px] text-on-surface-variant font-medium mt-1 uppercase">{SUBJECTS.find(s => s.code === activeCell.subjectCode)?.name}</p>
                                  </div>

                                  <div className="flex-1 flex gap-4">
                                    {['q1', 'q2', 'q3', 'q4'].map((q, idx) => {
                                      const data = getDisplayData(studentId, activeCell.subjectCode);
                                      const val = (data as any)[q] || '';
                                      return (
                                        <div key={q} className="flex-1 bg-black/40 rounded-2xl p-4 border border-white/5 focus-within:border-secondary/40 transition-all">
                                          <label className="block text-[8px] font-black text-on-surface-variant/40 uppercase tracking-widest mb-3">Quarter {idx + 1}</label>
                                          <input
                                            type="number"
                                            min="0"
                                            max="100"
                                            placeholder="--"
                                            value={val}
                                            onChange={(e) => handleQuarterChange(studentId, activeCell.subjectCode, q, e.target.value)}
                                            className="w-full bg-transparent text-2xl font-headline font-black text-secondary outline-none placeholder:text-white/5"
                                            autoFocus={q === 'q1'}
                                          />
                                        </div>
                                      );
                                    })}
                                  </div>

                                  <div className="flex items-center gap-6 px-4">
                                    <div className="flex gap-3">
                                      <button 
                                        onClick={() => setActiveCell(null)}
                                        className="p-4 rounded-xl text-on-surface-variant hover:text-white hover:bg-white/5 transition-all"
                                      >
                                        <X size={20} />
                                      </button>
                                      <button 
                                        disabled={isSaving}
                                        onClick={() => handleSave(studentId, activeCell.subjectCode)}
                                        className="flex items-center gap-3 bg-secondary text-primary px-8 py-4 rounded-2xl font-black uppercase text-[11px] tracking-widest shadow-2xl shadow-secondary/20 hover:scale-[1.02] active:scale-95 transition-all"
                                      >
                                        {isSaving ? <Loader2 className="animate-spin" size={16} /> : <Save size={18} />}
                                        Save Record
                                      </button>
                                    </div>
                                  </div>
                                </motion.div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="schedule"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="bg-surface-container rounded-3xl p-8 border border-on-surface/5 shadow-2xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center border border-secondary/20">
                  <Calendar className="text-secondary" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-headline font-bold text-on-surface">Weekly Schedule</h2>
                  <p className="text-xs text-on-surface-variant uppercase tracking-widest font-bold">Faculty Academic Calendar</p>
                </div>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-on-surface/5">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-primary-container/40 border-b border-on-surface/10">
                      <th className="p-6 text-left text-[10px] font-bold uppercase tracking-[0.2em] text-secondary border-r border-on-surface/5 w-40">Time</th>
                      {DAYS.map(day => (
                        <th key={day} className="p-6 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface min-w-[160px] border-r border-on-surface/5 last:border-r-0">
                          {day}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {SCHEDULE_DATA.map((row, idx) => (
                      <tr key={idx} className="border-b border-on-surface/5 hover:bg-on-surface/5 transition-colors group">
                        <td className="p-6 text-center text-on-surface-variant border-r border-on-surface/5">
                          <TimeDisplay range={row.time} />
                        </td>
                        {[row.monday, row.tuesday, row.wednesday, row.thursday, row.friday, row.saturday].map((cell, i) => (
                          <td key={i} className="p-4 border-r border-on-surface/5 last:border-r-0 align-top">
                            {cell && (
                              <div className={`p-4 rounded-xl border ${cell.color} text-[10px] font-bold uppercase tracking-tight`}>
                                <p className="mb-2 leading-tight">{cell.subject}</p>
                                {cell.instructor && (
                                  <div className="flex items-center gap-1.5 opacity-70">
                                    <User size={10} />
                                    <span>{cell.instructor}</span>
                                  </div>
                                )}
                              </div>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
