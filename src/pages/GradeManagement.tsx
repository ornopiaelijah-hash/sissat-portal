"use client";
import React from 'react';
import { useStudent } from '../context/StudentContext';
import { COURSES } from '../constants';

export default function GradeManagement() {
  const { students, updateStudentGrade, grades } = useStudent();

  const handleCellClick = async (studentId: string, subjectCode: string) => {
    const q1 = prompt('Enter grade for Q1 (0-100):');
    if (q1 === null) return;
    const q2 = prompt('Enter grade for Q2 (0-100):');
    if (q2 === null) return;
    const q3 = prompt('Enter grade for Q3 (0-100):');
    if (q3 === null) return;
    const q4 = prompt('Enter grade for Q4 (0-100):');
    if (q4 === null) return;

    const calculateAvg = (vals: string[]) => {
      const valid = vals.filter(v => v !== '' && !isNaN(Number(v)));
      if (valid.length === 0) return '--';
      return Math.round(valid.reduce((a, b) => a + Number(b), 0) / valid.length).toString();
    };

    const avg = calculateAvg([q1, q2, q3, q4]);

    try {
      await updateStudentGrade(studentId, subjectCode, {
        q1, q2, q3, q4,
        average: avg,
        grade: avg
      });
      alert('Grade saved successfully!');
    } catch (err) {
      alert('Error saving grade: ' + err);
    }
  };

  return (
    <div style={{ padding: '2rem', color: '#fff', background: '#0a1428', minHeight: '100vh' }}>
      <h1 style={{ marginBottom: '2rem', fontSize: '2rem' }}>Grade Management</h1>
      <p style={{ marginBottom: '1rem', color: '#8a9ab5' }}>Click any cell to set grades via prompt.</p>
      
      <table style={{ width: '100%', border: '1px solid #333', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#1a2c4e' }}>
            <th style={{ padding: '12px', border: '1px solid #333', textAlign: 'left' }}>Student Name</th>
            {COURSES.map(c => (
              <th key={c.code} style={{ padding: '12px', border: '1px solid #333' }}>{c.code}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s.uid} style={{ borderBottom: '1px solid #222' }}>
              <td style={{ padding: '12px', border: '1px solid #333' }}>
                {s.firstName} {s.lastName}
              </td>
              {COURSES.map(c => {
                const gradeDoc = grades.find(g => g.studentId === s.uid && g.code === c.code);
                const currentAvg = gradeDoc?.average || '--';
                return (
                  <td 
                    key={c.code}
                    onClick={() => handleCellClick(s.uid || '', c.code)}
                    style={{ 
                      padding: '12px', 
                      border: '1px solid #333', 
                      textAlign: 'center', 
                      cursor: 'pointer',
                      color: currentAvg !== '--' && Number(currentAvg) >= 75 ? '#00ff88' : '#f87171'
                    }}
                  >
                    {currentAvg}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
