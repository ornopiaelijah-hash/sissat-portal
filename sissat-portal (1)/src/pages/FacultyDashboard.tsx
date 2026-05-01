/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useStudent } from '../context/StudentContext';
import { Users, GraduationCap, Save, Loader2, CheckCircle, AlertCircle, Search, BookOpen, Send } from 'lucide-react';

const SUBJECTS = [
  { name: 'Research 2', code: 'RES 2' },
  { name: "3I's", code: '3IS' },
  { name: 'Entrepreneurship', code: 'ENTREP' },
  { name: 'CSS', code: 'ICT-CSS' },
  { name: 'HOPE', code: 'PE' },
  { name: 'Work Immersion', code: 'WI' }
];

export default function FacultyDashboard() {
  const { students, updateStudentGrade, isSaving, grades } = useStudent();
  const [searchQuery, setSearchQuery] = useState('');
  const [tempGrades, setTempGrades] = useState<Record<string, Record<string, string>>>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  const filteredStudents = students.filter(student => 
    `${student.firstName} ${student.lastName} ${student.studentId}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleGradeChange = (studentId: string, subjectCode: string, value: string) => {
    setTempGrades(prev => ({
      ...prev,
      [studentId]: {
        ...(prev[studentId] || {}),
        [subjectCode]: value
      }
    }));
  };

  const getGrade = (studentId: string, subjectCode: string) => {
    // Check pending edits first
    if (tempGrades[studentId]?.[subjectCode] !== undefined) {
      return tempGrades[studentId][subjectCode];
    }
    // Then check existing grades
    const existing = grades.find(g => g.studentId === studentId && g.code === subjectCode);
    return existing ? existing.grade : '';
  };

  const handlePublish = async () => {
    const studentIds = Object.keys(tempGrades);
    if (studentIds.length === 0) {
      setErrorText("No changes to publish.");
      setTimeout(() => setErrorText(null), 3000);
      return;
    }

    // Validation
    for (const sid of studentIds) {
      for (const code of Object.keys(tempGrades[sid])) {
        const valStr = tempGrades[sid][code];
        if (valStr === '') continue;
        const val = Number(valStr);
        if (isNaN(val) || val < 75 || val > 100) {
          setErrorText("Grades must be between 75 and 100.");
          setTimeout(() => setErrorText(null), 3000);
          return;
        }
      }
    }

    try {
      for (const sid of studentIds) {
        const subjects = Object.keys(tempGrades[sid]);
        for (const code of subjects) {
          await updateStudentGrade(sid, code, tempGrades[sid][code]);
        }
      }
      setTempGrades({});
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      setErrorText("Failed to publish grades.");
      setTimeout(() => setErrorText(null), 3000);
    }
  };

  const pendingCount = Object.values(tempGrades).reduce<number>((acc, curr) => acc + Object.keys(curr).length, 0);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-12"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-surface-container p-8 rounded-3xl border border-white/5 velvet-depth">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-secondary">
            <GraduationCap size={28} />
            <span className="text-xs font-black uppercase tracking-[0.3em]">Faculty Portal</span>
          </div>
          <h1 className="text-5xl font-headline font-bold text-on-surface tracking-tight">
            Welcome back, <span className="text-secondary italic">Faculty</span>
          </h1>
          <p className="text-on-surface-variant max-w-xl font-medium">
            Academic records management system for final term assessments.
          </p>
        </div>

        <div className="flex flex-col items-end gap-3">
          <AnimatePresence>
            {showSuccess && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex items-center gap-2 text-green-400 bg-green-400/10 px-4 py-2 rounded-full border border-green-400/20 shadow-lg shadow-green-400/5"
              >
                <CheckCircle size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest">Grades Published</span>
              </motion.div>
            )}
            {errorText && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-red-400 bg-red-400/10 px-4 py-2 rounded-full border border-red-400/20"
              >
                <AlertCircle size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest">{errorText}</span>
              </motion.div>
            )}
          </AnimatePresence>
          
          <button
            onClick={handlePublish}
            disabled={isSaving || pendingCount === 0}
            className="group relative flex items-center gap-3 bg-secondary text-on-secondary px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-2xl shadow-secondary/30 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale disabled:scale-100 metallic-glow overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            {isSaving ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            )}
            <span className="relative z-10">Publish Grades {pendingCount > 0 && `(${pendingCount})`}</span>
          </button>
        </div>
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-surface-container rounded-3xl p-8 border border-white/5 shadow-2xl relative overflow-hidden">
          {/* Subtle background icon */}
          <BookOpen className="absolute -right-20 -bottom-20 text-white/[0.02]" size={400} />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center border border-secondary/20">
                <Users className="text-secondary" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-headline font-bold text-on-surface">Grade Management</h2>
                <p className="text-xs text-on-surface-variant uppercase tracking-widest font-bold">Institutional Academic Register</p>
              </div>
            </div>

            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50" size={18} />
              <input
                type="text"
                placeholder="Search students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-primary/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-on-surface placeholder:text-on-surface-variant/40 focus:border-secondary focus:ring-1 focus:ring-secondary transition-all outline-none font-sans"
              />
            </div>
          </div>

          <div className="overflow-x-auto relative z-10 rounded-2xl border border-white/5">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-primary/40">
                  <th className="px-6 py-6 text-[10px] font-black text-secondary uppercase tracking-[0.25em] border-b border-white/10">Student Name</th>
                  {SUBJECTS.map(sub => (
                    <th key={sub.code} className="px-4 py-6 text-[10px] font-black text-secondary uppercase tracking-[0.25em] border-b border-white/10 text-center min-w-[120px]">
                      {sub.name}
                      <div className="text-[8px] opacity-50 font-mono mt-1">{sub.code}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 lg:bg-transparent bg-primary/20">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <tr key={student.studentId} className="group hover:bg-white/[0.03] transition-colors">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center p-1 group-hover:border-secondary transition-colors">
                            <Users size={18} className="text-secondary/50 group-hover:text-secondary" />
                          </div>
                          <div>
                            <div className="font-bold text-on-surface group-hover:text-secondary transition-colors">{student.firstName} {student.lastName}</div>
                            <div className="text-[10px] font-mono text-on-surface-variant tracking-wider uppercase">{student.studentId}</div>
                          </div>
                        </div>
                      </td>
                      {SUBJECTS.map(sub => (
                        <td key={sub.code} className="px-4 py-5 text-center">
                          <div className="relative max-w-[100px] mx-auto">
                            <input
                              type="number"
                              min="75"
                              max="100"
                              placeholder="--"
                              value={getGrade(student.studentId, sub.code)}
                              onChange={(e) => handleGradeChange(student.studentId, sub.code, e.target.value)}
                              className={`w-full bg-white/5 border rounded-xl py-3 px-3 text-center text-sm font-bold transition-all outline-none appearance-none
                                ${tempGrades[student.studentId]?.[sub.code] 
                                  ? 'border-secondary text-secondary ring-1 ring-secondary shadow-lg shadow-secondary/10' 
                                  : 'border-white/10 text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary focus:bg-white/10'}
                              `}
                            />
                            {tempGrades[student.studentId]?.[sub.code] && (
                              <div className="absolute -top-2 -right-2 w-4 h-4 bg-secondary rounded-full flex items-center justify-center shadow-lg shadow-secondary/50">
                                <span className="text-[8px] font-black text-on-secondary">!</span>
                              </div>
                            )}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={SUBJECTS.length + 1} className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <Users size={64} className="text-white/5" />
                        <p className="text-on-surface-variant font-headline italic text-lg">No scholars discovered in the registries.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
