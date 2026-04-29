/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Users, CheckCircle, GraduationCap, Save, Loader2, AlertCircle, Filter, ChevronDown } from 'lucide-react';
import { useStudent } from '../context/StudentContext';
import { COURSES } from '../constants';

export default function GradeManagement() {
  const { students, updateStudentGrade, isSaving, grades } = useStudent();
  const [selectedCourse, setSelectedCourse] = useState(COURSES[0].code);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingGrades, setEditingGrades] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorHeader, setErrorHeader] = useState<string | null>(null);

  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = `${student.firstName} ${student.lastName} ${student.studentId}`.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [students, searchQuery]);

  const handleGradeChange = (studentId: string, value: string) => {
    setEditingGrades(prev => ({
      ...prev,
      [studentId]: value
    }));
    if (errorHeader) setErrorHeader(null);
  };

  const handleSaveAll = async () => {
    const studentIds = Object.keys(editingGrades);
    if (studentIds.length === 0) return;

    // Validation: 75 to 100
    for (const studentId of studentIds) {
      const grade = Number(editingGrades[studentId]);
      if (isNaN(grade) || grade < 75 || grade > 100) {
        setErrorHeader(`Invalid Grade for ${studentId}. Must be between 75 and 100.`);
        setTimeout(() => setErrorHeader(null), 4000);
        return;
      }
    }

    try {
      for (const studentId of studentIds) {
        await updateStudentGrade(studentId, selectedCourse, editingGrades[studentId]);
      }

      setEditingGrades({});
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      setErrorHeader('Sync failed. Please try again.');
      setTimeout(() => setErrorHeader(null), 4000);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-secondary mb-1">
            <GraduationCap size={20} />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Academic Registrar</span>
          </div>
          <h1 className="text-4xl font-headline font-bold text-on-surface tracking-tight">Grade Management</h1>
          <p className="text-on-surface-variant max-w-2xl">
            Review and update student assessments for the current term. Changes are synchronized with the institutional database in real-time.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative group min-w-[150px] flex justify-end items-center px-4">
            <AnimatePresence>
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2 text-secondary"
                >
                  <CheckCircle size={20} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Synchronized</span>
                </motion.div>
              )}
              {errorHeader && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2 text-red-500"
                >
                  <AlertCircle size={20} />
                  <span className="text-[9px] font-bold uppercase tracking-tighter max-w-[200px] text-right">{errorHeader}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button 
            onClick={handleSaveAll}
            disabled={isSaving || Object.keys(editingGrades).length === 0}
            className="flex items-center gap-2 bg-secondary text-on-secondary px-6 py-3 rounded-xl font-bold uppercase text-[10px] tracking-widest shadow-lg shadow-secondary/20 hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale disabled:scale-100 metallic-glow min-w-[160px] justify-center"
          >
            {isSaving ? (
              <>
                <Loader2 size={14} className="animate-spin text-on-secondary" />
                <span>Syncing...</span>
              </>
            ) : (
              <>
                <Save size={14} />
                <span>Sync Changes</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative md:col-span-2">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50" size={18} />
          <input 
            type="text"
            placeholder="Search by name or student ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-container border border-white/10 rounded-xl py-4 pl-12 pr-4 text-on-surface placeholder:text-on-surface-variant/40 focus:border-secondary/50 focus:ring-1 focus:ring-secondary/50 transition-all outline-none"
          />
        </div>

        <div className="relative">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50" size={18} />
          <select 
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full bg-surface-container border border-white/10 rounded-xl py-4 pl-12 pr-10 text-on-surface appearance-none focus:border-secondary/50 focus:ring-1 focus:ring-secondary/50 transition-all outline-none cursor-pointer"
          >
            {COURSES.map(course => (
              <option key={course.id} value={course.code}>{course.title} ({course.code})</option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 pointer-events-none" size={18} />
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-surface-container rounded-2xl border border-white/5 overflow-hidden velvet-depth">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-6 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Student Identity</th>
                <th className="px-6 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest text-center">Class</th>
                <th className="px-6 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Current Assessment</th>
                <th className="px-6 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest w-40">Grade (75 - 100)</th>
                <th className="px-6 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student.studentId} className="group border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center p-1 overflow-hidden group-hover:border-secondary/30 transition-colors">
                          {student.avatar ? (
                            <img src={student.avatar} alt="" className="w-full h-full object-cover rounded-lg" />
                          ) : (
                            <Users size={20} className="text-on-surface-variant/50 group-hover:text-secondary transition-colors" />
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-on-surface group-hover:text-secondary transition-colors">{student.firstName} {student.lastName}</div>
                          <div className="text-[10px] font-bold text-on-surface-variant/60 tracking-wider uppercase">{student.studentId}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6 text-center">
                      <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                        {student.class}
                      </span>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-2 text-on-surface-variant text-sm italic">
                        {(() => {
                          const currentGrade = grades.find(g => g.studentId === student.studentId && g.code === selectedCourse);
                          return currentGrade 
                            ? <span className="font-bold text-on-surface not-italic">Current Grade: {currentGrade.grade}</span>
                            : <span>No grade entry yet</span>;
                        })()}
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex flex-col gap-2">
                        <input 
                          type="number"
                          min="75"
                          max="100"
                          step="1"
                          placeholder="75"
                          value={editingGrades[student.studentId] || ''}
                          onChange={(e) => handleGradeChange(student.studentId, e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-sm text-secondary focus:border-secondary focus:ring-1 focus:ring-secondary transition-all outline-none"
                        />
                        {editingGrades[student.studentId] && (
                          <div className={`text-[9px] font-bold uppercase tracking-widest ${Number(editingGrades[student.studentId]) >= 75 ? 'text-green-500' : 'text-red-500'}`}>
                            {Number(editingGrades[student.studentId]) >= 75 ? 'Passing' : 'Failing'}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-6 text-right">
                      {editingGrades[student.studentId] ? (
                        <span className="text-[10px] font-bold text-secondary uppercase animate-pulse tracking-widest">Pending Sync</span>
                      ) : (
                        <div className="flex items-center justify-end gap-1 text-on-surface-variant/40">
                          <CheckCircle size={14} className="text-green-500/50" />
                          <span className="text-[9px] font-bold uppercase tracking-tighter">Verified</span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <AlertCircle size={40} className="text-on-surface-variant/20" />
                      <p className="text-on-surface-variant italic">No student matches found in the academic register.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
