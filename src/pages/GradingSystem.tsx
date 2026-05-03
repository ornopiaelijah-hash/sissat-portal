/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  Search, 
  Save, 
  Loader2, 
  Edit3, 
  CheckCircle, 
  AlertCircle,
  Eye,
  EyeOff,
  Filter,
  GraduationCap
} from 'lucide-react';
import { useStudent } from '../context/StudentContext';
import { useStudentGrades } from '../hooks/useStudentGrades';
import { TranscriptEntry, StudentProfile } from '../types';
import { LOGO_URL, DEFAULT_SUBJECTS } from '../constants';

export default function GradingSystem() {
  const { profile, students, updateStudentGrade, isSaving } = useStudent();
  const [selectedStudent, setSelectedStudent] = useState<StudentProfile | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showQuarters, setShowQuarters] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<TranscriptEntry>>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const isTeacher = profile?.role === 'faculty' || profile?.role === 'admin';

  // For students, automatically select them
  useEffect(() => {
    if (!isTeacher && profile) {
      setSelectedStudent(profile);
    }
  }, [isTeacher, profile]);

  const filteredStudents = students.filter(s => 
    `${s.firstName} ${s.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeStudentId = (isTeacher ? selectedStudent?.uid : profile?.uid) || (isTeacher ? selectedStudent?.studentId : profile?.studentId) || '';
  const { grades: rawGrades, isLoading: isLoadingGrades } = useStudentGrades(activeStudentId);
  
  // Merge with default subjects if no grades exist or to ensure all subjects are shown
  const studentGrades = DEFAULT_SUBJECTS.map(subject => {
    // Standardize comparison by code
    const existingGrade = rawGrades.find(g => g.code === subject.code);
    if (existingGrade) return { ...existingGrade, module: subject.module }; // Ensure display name is fresh
    
    // Create a virtual grade entry for the default subject
    return {
      id: `virtual-${subject.code}`,
      studentId: activeStudentId,
      module: subject.module,
      code: subject.code,
      instructor: '',
      credits: 1,
      assessment: 'N/A',
      grade: 'IP',
      q1: '',
      q2: '',
      q3: '',
      q4: '',
      average: ''
    } as TranscriptEntry;
  });

  const getDisplayAvg = (grade: TranscriptEntry | Partial<TranscriptEntry>) => {
    const quarters = [grade.q1, grade.q2, grade.q3, grade.q4];
    const valid = quarters.filter(v => v !== undefined && v !== '' && !isNaN(Number(v)));
    if (valid.length === 0) {
      const existing = (grade as any).average || (grade as any).grade;
      return (existing && existing !== 'IP') ? existing : '--';
    }
    const sum = valid.reduce((a, b) => a + Number(b), 0);
    return Math.round(sum / valid.length).toString();
  };

  const handleEditClick = (grade: TranscriptEntry) => {
    setEditingId(grade.id);
    setEditValues({
      ...grade,
      q1: grade.q1 || '',
      q2: grade.q2 || '',
      q3: grade.q3 || '',
      q4: grade.q4 || '',
    });
  };

  const handleValueChange = (field: keyof TranscriptEntry, value: string) => {
    // Basic validation: numeric or IP
    if (value !== '' && value !== 'IP') {
      const num = Number(value);
      if (isNaN(num) || num < 0 || num > 100) return;
    }
    
    setEditValues(prev => {
      const next = { ...prev, [field]: value };
      if (['q1', 'q2', 'q3', 'q4'].includes(field as string)) {
        const avg = getDisplayAvg(next);
        next.average = avg;
        next.grade = avg;
      }
      return next;
    });
  };

  const handleSave = async (moduleCode: string) => {
    if (!activeStudentId) return;
    
    try {
      await updateStudentGrade(activeStudentId, moduleCode, editValues);
      setEditingId(null);
      setSuccessMessage('Grade records synchronized');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-secondary/10 rounded-lg">
              <GraduationCap className="text-secondary" size={24} />
            </div>
            <h2 className="text-2xl font-headline font-black text-on-surface tracking-tight uppercase">
              Grading System
            </h2>
          </div>
          <p className="text-secondary font-bold text-[10px] uppercase tracking-[0.3em]">
            Academic Register • Real-time Synchronization
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowQuarters(!showQuarters)}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest text-on-surface hover:bg-secondary/20 hover:border-secondary/30 transition-all group"
          >
            {showQuarters ? <EyeOff size={14} className="text-secondary" /> : <Eye size={14} className="text-secondary" />}
            {showQuarters ? 'Hide Quarters' : 'View Quarters'}
          </button>
        </div>
      </div>

      {isTeacher && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Student Selector Sidebar (Faculty Only) */}
          <div className="lg:col-span-1 space-y-4">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-secondary transition-colors" size={16} />
              <input 
                type="text"
                placeholder="SEARCH STUDENT..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs font-bold text-on-surface focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all placeholder:text-on-surface-variant/30 uppercase tracking-widest"
              />
            </div>

            <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden max-h-[500px] overflow-y-auto custom-scrollbar">
              {filteredStudents.map((student) => (
                <button
                  key={student.studentId}
                  onClick={() => setSelectedStudent(student)}
                  className={`w-full flex items-center gap-3 p-4 border-b border-white/5 transition-all hover:bg-white/10 text-left ${selectedStudent?.studentId === student.studentId ? 'bg-secondary/10 border-r-4 border-r-secondary' : ''}`}
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary/30 to-secondary/10 flex items-center justify-center text-secondary font-black border border-secondary/20">
                    {student.firstName[0]}
                  </div>
                  <div>
                    <div className={`text-xs font-black uppercase tracking-tight ${selectedStudent?.studentId === student.studentId ? 'text-secondary' : 'text-on-surface'}`}>
                      {student.firstName} {student.lastName}
                    </div>
                    <div className="text-[9px] font-bold text-on-surface-variant uppercase tracking-widest">
                      {student.studentId}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Main Table view */}
          <div className="lg:col-span-3 space-y-6">
            {!selectedStudent ? (
              <div className="bg-white/5 border border-dashed border-white/20 rounded-3xl p-20 flex flex-col items-center justify-center text-center">
                <Search size={48} className="text-white/10 mb-4" />
                <p className="text-on-surface-variant font-bold uppercase tracking-[0.2em]">Select a student to view records</p>
              </div>
            ) : isLoadingGrades ? (
              <div className="bg-white/5 border border-white/10 rounded-3xl p-20 flex flex-col items-center justify-center text-center">
                <Loader2 size={48} className="text-secondary animate-spin mb-4" />
                <p className="text-on-surface-variant font-bold uppercase tracking-[0.2em] text-[10px]">Synchronizing Records...</p>
              </div>
            ) : (
              <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden backdrop-blur-md">
                <div className="p-6 border-b border-white/5 bg-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                      <GraduationCap className="text-secondary" size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-headline font-black text-on-surface uppercase tracking-tight">
                        {selectedStudent.firstName} {selectedStudent.lastName}
                      </h3>
                      <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                        Academic Profile • {selectedStudent.class} • {selectedStudent.section || 'N/A'}
                      </p>
                    </div>
                  </div>
                  {successMessage && (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-2 text-green-400 bg-green-400/10 px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest"
                    >
                      <CheckCircle size={14} />
                      {successMessage}
                    </motion.div>
                  )}
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-[#0f1d33] border-b border-white/10">
                        <th className="px-6 py-4 text-[10px] uppercase font-black tracking-[0.2em] text-secondary">Code</th>
                        <th className="px-6 py-4 text-[10px] uppercase font-black tracking-[0.2em] text-secondary">Module</th>
                        {showQuarters && (
                          <>
                            <th className="px-4 py-4 text-[10px] uppercase font-black tracking-[0.2em] text-secondary text-center">Q1</th>
                            <th className="px-4 py-4 text-[10px] uppercase font-black tracking-[0.2em] text-secondary text-center">Q2</th>
                            <th className="px-4 py-4 text-[10px] uppercase font-black tracking-[0.2em] text-secondary text-center">Q3</th>
                            <th className="px-4 py-4 text-[10px] uppercase font-black tracking-[0.2em] text-secondary text-center">Q4</th>
                          </>
                        )}
                        <th className="px-6 py-4 text-[10px] uppercase font-black tracking-[0.2em] text-secondary text-center bg-secondary/5 border-x border-white/5">Final Average</th>
                        <th className="px-6 py-4 text-[10px] uppercase font-black tracking-[0.2em] text-secondary text-right">Status</th>
                        {isTeacher && <th className="px-6 py-4 text-[10px] uppercase font-black tracking-[0.2em] text-secondary text-center">Actions</th>}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {studentGrades.map((grade) => {
                        const isEditing = editingId === grade.id;
                        const displayGrade = isEditing ? editValues.average : getDisplayAvg(grade);
                        const avgNum = Number(displayGrade);
                        
                        let status = '--';
                        let statusColor = 'text-on-surface-variant bg-white/10 border-white/10';
                        
                        if (displayGrade !== '--' && !isNaN(avgNum)) {
                          if (avgNum >= 75) {
                            status = 'PASSED';
                            statusColor = 'text-green-400 bg-green-400/10 border-green-400/20';
                          } else {
                            status = 'FAILED';
                            statusColor = 'text-red-400 bg-red-400/10 border-red-400/20';
                          }
                        }

                        return (
                          <motion.tr 
                            key={grade.id}
                            layout
                            className="group hover:bg-white/5 transition-colors"
                          >
                            <td className="px-6 py-6 text-xs font-black text-secondary/70">{grade.code}</td>
                            <td className="px-6 py-6">
                              <span className="text-xs font-bold text-on-surface uppercase tracking-tight block truncate max-w-[150px]">
                                {grade.module}
                              </span>
                            </td>
                            {showQuarters && (
                              <>
                                {['q1', 'q2', 'q3', 'q4'].map((q) => (
                                  <td key={q} className="px-4 py-6 text-center">
                                    {isEditing ? (
                                      <input 
                                        type="text"
                                        value={(editValues as any)[q]}
                                        onChange={(e) => handleValueChange(q as any, e.target.value)}
                                        className="w-12 bg-white/5 border-b-2 border-secondary/30 text-center text-xs font-black py-1 focus:outline-none focus:border-secondary transition-colors text-secondary"
                                      />
                                    ) : (
                                      <span className="text-xs font-bold text-on-surface-variant/70">{(grade as any)[q] || '--'}</span>
                                    )}
                                  </td>
                                ))}
                              </>
                            )}
                            <td className="px-6 py-6 text-center bg-secondary/5 border-x border-white/5">
                              <span className={`text-xl font-headline font-black ${status === 'PASSED' ? 'text-[#00ff88]' : status === 'FAILED' ? 'text-red-400' : 'text-on-surface-variant/50'}`}>
                                {displayGrade}
                              </span>
                            </td>
                            <td className="px-6 py-6 text-right">
                              <span className={`inline-flex px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-[0.2em] border ${statusColor}`}>
                                {status}
                              </span>
                            </td>
                            {isTeacher && (
                              <td className="px-6 py-6 text-center">
                                {isEditing ? (
                                  <button 
                                    onClick={() => handleSave(grade.code)}
                                    disabled={isSaving}
                                    className="p-2 bg-secondary/20 rounded-lg text-secondary hover:bg-secondary/30 transition-all disabled:opacity-50"
                                  >
                                    {isSaving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                                  </button>
                                ) : (
                                  <button 
                                    onClick={() => handleEditClick(grade)}
                                    className="p-2 bg-white/5 rounded-lg text-on-surface-variant hover:text-secondary hover:bg-secondary/10 transition-all"
                                  >
                                    <Edit3 size={16} />
                                  </button>
                                )}
                              </td>
                            )}
                          </motion.tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Student View (Simplified) */}
      {!isTeacher && (
        <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden backdrop-blur-md">
          <div className="p-6 border-b border-white/5 bg-white/5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                <GraduationCap className="text-secondary" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-headline font-black text-on-surface uppercase tracking-tight">
                  Academic Performance
                </h3>
                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                  Standardized Assessment Records • Final Evaluation
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            {isLoadingGrades ? (
              <div className="py-20 text-center">
                <Loader2 size={32} className="text-secondary animate-spin mx-auto mb-4" />
                <p className="text-on-surface-variant font-black uppercase tracking-[0.2em] text-[10px]">Accessing Secure Records...</p>
              </div>
            ) : (
              <table className="w-full text-left">
              <thead>
                <tr className="bg-[#0f1d33] border-b border-white/10">
                  <th className="px-6 py-4 text-[10px] uppercase font-black tracking-[0.2em] text-secondary">Code</th>
                  <th className="px-6 py-4 text-[10px] uppercase font-black tracking-[0.2em] text-secondary">Subject / Module</th>
                  {showQuarters && (
                    <>
                      <th className="px-4 py-4 text-[10px] uppercase font-black tracking-[0.2em] text-secondary text-center">Q1</th>
                      <th className="px-4 py-4 text-[10px] uppercase font-black tracking-[0.2em] text-secondary text-center">Q2</th>
                      <th className="px-4 py-4 text-[10px] uppercase font-black tracking-[0.2em] text-secondary text-center">Q3</th>
                      <th className="px-4 py-4 text-[10px] uppercase font-black tracking-[0.2em] text-secondary text-center">Q4</th>
                    </>
                  )}
                  <th className="px-6 py-4 text-[10px] uppercase font-black tracking-[0.2em] text-secondary text-center bg-secondary/5 border-x border-white/5">Final Average</th>
                  <th className="px-6 py-4 text-[10px] uppercase font-black tracking-[0.2em] text-secondary text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {studentGrades.map((grade) => {
                  const displayGrade = getDisplayAvg(grade);
                  const avgNum = Number(displayGrade);
                  
                  let status = '--';
                  let statusColor = 'text-on-surface-variant bg-white/10 border-white/10';
                  
                  if (displayGrade !== '--' && !isNaN(avgNum)) {
                    if (avgNum >= 75) {
                      status = 'PASSED';
                      statusColor = 'text-green-400 bg-green-400/10 border-green-400/20';
                    } else {
                      status = 'FAILED';
                      statusColor = 'text-red-400 bg-red-400/10 border-red-400/20';
                    }
                  }

                  return (
                    <tr key={grade.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-6 text-xs font-black text-secondary/70">{grade.code}</td>
                      <td className="px-6 py-6">
                        <span className="text-xs font-bold text-on-surface uppercase tracking-tight">
                          {grade.module}
                        </span>
                      </td>
                      {showQuarters && (
                        <>
                          <td className="px-4 py-6 text-center text-xs font-bold text-on-surface-variant/70">{grade.q1 || '--'}</td>
                          <td className="px-4 py-6 text-center text-xs font-bold text-on-surface-variant/70">{grade.q2 || '--'}</td>
                          <td className="px-4 py-6 text-center text-xs font-bold text-on-surface-variant/70">{grade.q3 || '--'}</td>
                          <td className="px-4 py-6 text-center text-xs font-bold text-on-surface-variant/70">{grade.q4 || '--'}</td>
                        </>
                      )}
                      <td className="px-6 py-6 text-center bg-secondary/5 border-x border-white/5">
                        <span className={`text-xl font-headline font-black ${status === 'PASSED' ? 'text-[#00ff88]' : status === 'FAILED' ? 'text-red-400' : 'text-on-surface-variant/50'}`}>
                          {displayGrade}
                        </span>
                      </td>
                      <td className="px-6 py-6 text-right">
                        <span className={`inline-flex px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-[0.2em] border ${statusColor}`}>
                          {status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}
