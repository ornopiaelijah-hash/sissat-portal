import React from 'react';
import { motion } from 'motion/react';
import { useStudent } from '../context/StudentContext';
import { useStudentGrades } from '../hooks/useStudentGrades';
import { BookOpen, Loader2 } from 'lucide-react';
import { LOGO_URL, DEFAULT_SUBJECTS } from '../constants';
import { TranscriptEntry } from '../types';

export default function StudentGrades() {
  const { profile } = useStudent();
  const studentId = profile?.uid || '';
  const { grades: dbGrades, isLoading } = useStudentGrades(studentId);

  const myGrades = DEFAULT_SUBJECTS.map((def, idx) => {
    const match = dbGrades.find(g => g.code === def.code);
    return {
      ...(match || {
        grade: 'IP',
        q1: '', q2: '', q3: '', q4: '',
        average: 'IP'
      }),
      id: match?.id || `default-${idx}`,
      studentId,
      code: def.code,
      module: def.module // Always use correct display name
    } as TranscriptEntry;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 md:p-8 max-w-5xl mx-auto relative overflow-hidden"
    >
      {/* Background Faded Logo */}
      <div className="absolute -right-32 -top-32 opacity-10 rotate-12 select-none pointer-events-none transform scale-150 [mask-image:radial-gradient(circle,black_20%,transparent_70%)] z-0">
        <img src={LOGO_URL} alt="" className="w-[500px] h-[500px] grayscale brightness-125 contrast-75" />
      </div>
      <header className="mb-10 text-center">
        <h1 className="text-2xl font-black text-on-surface uppercase tracking-tight">Academic Records</h1>
        <p className="text-xs text-on-surface-variant/60 font-bold uppercase tracking-widest mt-1">Grade Summary for {profile?.firstName} {profile?.lastName}</p>
      </header>

      <div className="bg-surface-container border border-white/5 rounded-2xl overflow-hidden shadow-xl">
        {isLoading ? (
          <div className="py-20 text-center">
            <Loader2 className="mx-auto text-secondary animate-spin mb-4" size={48} />
            <p className="text-on-surface-variant font-medium uppercase tracking-widest text-[10px]">Retrieving Academic Records...</p>
          </div>
        ) : myGrades.length > 0 ? (
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5 border-b border-white/5">
                <th className="px-6 py-4 text-[10px] uppercase font-black tracking-widest text-secondary">Code</th>
                <th className="px-6 py-4 text-[10px] uppercase font-black tracking-widest text-secondary">Subject / Module</th>
                <th className="px-6 py-4 text-[10px] uppercase font-black tracking-widest text-secondary text-center bg-secondary/5">Average</th>
                <th className="px-6 py-4 text-[10px] uppercase font-black tracking-widest text-secondary text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {myGrades.map((gradeEntry, index) => {
                const gradeNum = Number(gradeEntry.grade);
                const isIP = gradeEntry.grade === 'IP' || !gradeEntry.grade;
                const isPassing = !isIP && (isNaN(gradeNum) ? true : gradeNum >= 75);
                
                let statusText = 'Failed';
                if (isIP) statusText = 'In Progress';
                else if (isPassing) statusText = 'Passed';

                return (
                   <tr key={gradeEntry.id} className="hover:bg-white/2 transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-[10px] font-mono font-bold text-on-surface-variant">
                        {gradeEntry.code}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-on-surface">
                        {gradeEntry.module}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center bg-secondary/5">
                      <span className={`text-xl font-headline font-black ${isIP ? 'text-on-surface-variant/40' : (isPassing ? 'text-green-400' : 'text-red-400')}`}>
                        {gradeEntry.grade}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`text-[10px] font-black uppercase tracking-widest ${isIP ? 'text-on-surface-variant/40' : (isPassing ? 'text-green-400/70' : 'text-red-400/70')}`}>
                        {statusText}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="py-20 text-center">
            <BookOpen size={48} className="mx-auto text-on-surface-variant/20 mb-4" />
            <p className="text-on-surface-variant font-medium">No records found for ID: {profile?.studentId}</p>
          </div>
        )}
      </div>

      <div className="mt-8 pt-6 border-t border-white/5 text-center">
        <p className="text-[9px] font-bold text-on-surface-variant/30 uppercase tracking-[0.3em]">Southdale Integrated School Official Transcript</p>
      </div>
    </motion.div>
  );
}
