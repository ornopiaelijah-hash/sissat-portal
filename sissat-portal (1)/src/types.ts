/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Course {
  id: string;
  title: string;
  code: string;
  instructor: string;
  category: string;
  description: string;
  progress: number;
  image: string;
  nextLecture?: string;
  nextDeadline?: string;
}

export interface Lecture {
  id: string;
  time: string;
  duration: string;
  title: string;
  instructor: string;
  location: string;
  type: string;
  notes?: string;
}

export interface Deadline {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  type: string;
  daysRemaining: number;
}

export interface Announcement {
  id: string;
  title: string;
  category: string;
  content: string;
  image?: string;
  date: string;
  linkText?: string;
  details?: string[];
}

export interface Submission {
  id: string;
  assignment: string;
  course: string;
  dueDate: string;
  status: 'In 2 Days' | string;
  action: string;
}

export interface TranscriptEntry {
  id: string;
  studentId: string;
  module: string;
  code: string;
  instructor: string;
  credits: number;
  assessment: string;
  grade: string;
}

export interface StudentProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  language: string;
  studentId: string;
  class: string;
  college: string;
  status: string;
  avatar?: string;
  role: 'student' | 'teacher' | 'admin';
}
