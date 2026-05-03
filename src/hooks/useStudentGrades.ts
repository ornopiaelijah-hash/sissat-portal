import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { TranscriptEntry } from '../types';

/**
 * Hook to listen for a student's grades in real-time.
 * @param studentId The UID of the student (as stored in grades collection)
 */
export function useStudentGrades(studentId: string | undefined) {
  const [grades, setGrades] = useState<TranscriptEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!studentId) {
      setGrades([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const gradesPath = 'grades';
    const q = query(collection(db, gradesPath), where('studentId', '==', studentId));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: TranscriptEntry[] = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as TranscriptEntry);
      });
      setGrades(data);
      setIsLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, gradesPath);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [studentId]);

  return { grades, isLoading };
}
