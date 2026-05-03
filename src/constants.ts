/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Course, Lecture, Deadline, Announcement, Submission, TranscriptEntry } from './types';

export const LOGO_URL = 'https://i.postimg.cc/vmKVrbXN/southdale.jpg';

export const COURSES: Course[] = [
  {
    id: '1',
    title: 'Research 2',
    code: 'RES2',
    instructor: 'Dr. Marlou M. Tangaliin',
    category: 'Academic',
    description: 'Practical Research 2: Quantitative Research across various fields of inquiry.',
    progress: 85,
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    title: "3I's",
    code: "3IS",
    instructor: 'Dr. Marlou M. Tangaliin',
    category: 'Applied',
    description: 'Inquiries, Investigation, and Immersion: Developing critical thinking skills.',
    progress: 60,
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    title: 'Entrepreneurship',
    code: 'ENTREP',
    instructor: 'Mr. Jash Aiden Cortes III',
    category: 'Applied',
    description: 'Key concepts of entrepreneurship and small business management.',
    progress: 45,
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '4',
    title: 'CSS (NC II)',
    code: 'ICTCSS',
    instructor: 'Mr. Joseph Peter Simeon',
    category: 'Specialization',
    description: 'Computer System Servicing: Installation and maintenance of computer systems.',
    progress: 90,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '5',
    title: 'HOPE',
    code: 'PE',
    instructor: 'Mr. Arbie Sadsad',
    category: 'Core',
    description: 'Health Optimizing Physical Education (Physical Education).',
    progress: 100,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '6',
    title: 'Work Immersion',
    code: 'WI',
    instructor: 'Mr. Charles Faz Jr.',
    category: 'Applied',
    description: 'Hands-on experience in a real work environment related to the ICT track.',
    progress: 30,
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '7',
    title: 'Food & Beverages 2',
    code: 'FB2',
    instructor: 'Ms. Maria Clara',
    category: 'Specialization',
    description: 'Advanced food and beverage service techniques and management.',
    progress: 0,
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '8',
    title: 'Bartending 3&4',
    code: 'BT34',
    instructor: 'Mr. Juan Dela Cruz',
    category: 'Specialization',
    description: 'Advanced bartending skills and mixology workshop.',
    progress: 0,
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800'
  }
];

export const LECTURES: Lecture[] = [
  {
    id: '1',
    time: '08:30',
    duration: '1 hr 30',
    title: 'Research 2: Data Collection',
    instructor: 'Dr. Marlou M. Tangaliin',
    location: 'Research Lab A',
    type: 'Core',
    notes: 'Bring Drafts'
  },
  {
    id: '2',
    time: '11:00',
    duration: '1 hr 00',
    title: 'CSS: Hardware Servicing',
    instructor: 'Mr. Joseph Peter Simeon',
    location: 'Com Lab 3',
    type: 'Specialization'
  }
];

export const DEADLINES: Deadline[] = [
  {
    id: '1',
    title: 'Negodem',
    course: 'ENTREP',
    dueDate: 'April 25 (11:59)',
    type: 'Project',
    daysRemaining: 6
  },
  {
    id: '2',
    title: 'CSS Diagnostic Test',
    course: 'ICTCSS',
    dueDate: 'next Friday',
    type: 'Exam',
    daysRemaining: 5
  }
];

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: '1',
    title: 'School Intramurals: April 27 - 30',
    category: 'Sports & Spirit',
    content: 'Get ready to bring your A-game! Join us for a week of sportsmanship, community, and school pride. Wear your team colors with pride!',
    image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=800',
    date: 'Apr 27',
    details: [
      'April 27-28: Kick-off and Sports Eliminations 🏀🏐',
      'April 29: Family Fun Day! Join us for a day of fun, bonding, and community games. 👨‍👩‍👧‍👦',
      'April 30: Championship Games & the Grand Awarding Ceremony. 🏆'
    ]
  }
];

export const SUBMISSIONS: Submission[] = [
  {
    id: '1',
    assignment: 'Sample Size Calculation',
    course: 'RES2',
    dueDate: 'Oct 22',
    status: 'In 2 Days',
    action: 'Submit Portal'
  },
  {
    id: '2',
    assignment: 'Marketing Strategy Pitch',
    course: 'ENTREP',
    dueDate: 'Oct 24',
    status: 'Upcoming',
    action: 'View Brief'
  },
  {
    id: '3',
    assignment: "OS Installation Guide",
    course: 'ICTCSS',
    dueDate: 'Oct 29',
    status: 'Upcoming',
    action: 'View Brief'
  }
];

export const SUBJECT_MAP = {
  RES2: `Research 2`,
  '3IS': `3I's`,
  ENTREP: `Entrepreneurship`,
  FB2: `Food & Beverages 2`,
  PE: `HOPE`,
  BT34: `Bartending 3&4`,
  ICTCSS: `CSS (NC II)`,
  WI: `Work Immersion`
} as const;

export const DEFAULT_SUBJECTS = Object.entries(SUBJECT_MAP).map(([code, name]) => ({
  module: name,
  code: code
}));

export const TRANSCRIPT: TranscriptEntry[] = [
  {
    id: '1',
    studentId: '2026-SIS-001',
    module: 'Research 2',
    code: 'RES2',
    instructor: 'Dr. Marlou M. Tangaliin',
    credits: 1.0,
    assessment: 'Paper & Defense',
    grade: '95',
    q1: '94',
    q2: '96',
    q3: '95',
    q4: '95',
    average: '95'
  },
  {
    id: '2',
    studentId: '2026-SIS-001',
    module: "3I's",
    code: '3IS',
    instructor: 'Dr. Marlou M. Tangaliin',
    credits: 1.0,
    assessment: 'Portfolio',
    grade: '92',
    q1: '90',
    q2: '93',
    q3: '92',
    q4: '93',
    average: '92'
  },
  {
    id: '3',
    studentId: '2026-SIS-001',
    module: 'Entrepreneurship',
    code: 'ENTREP',
    instructor: '',
    credits: 1.0,
    assessment: 'Business Plan',
    grade: 'IP',
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    average: 'IP'
  },
  {
    id: '4',
    studentId: '2026-SIS-001',
    module: 'Food & Beverages 2',
    code: 'FB2',
    instructor: '',
    credits: 1.0,
    assessment: 'Practical Skills',
    grade: 'IP',
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    average: 'IP'
  },
  {
    id: '5',
    studentId: '2026-SIS-001',
    module: 'HOPE',
    code: 'PE',
    instructor: '',
    credits: 1.0,
    assessment: 'Skills Test',
    grade: 'IP',
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    average: 'IP'
  },
  {
    id: '6',
    studentId: '2026-SIS-001',
    module: 'Bartending 3&4',
    code: 'BT34',
    instructor: '',
    credits: 1.0,
    assessment: 'Performance Task',
    grade: 'IP',
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    average: 'IP'
  },
  {
    id: '7',
    studentId: '2026-SIS-001',
    module: 'CSS (NC II)',
    code: 'ICTCSS',
    instructor: '',
    credits: 1.0,
    assessment: 'Practical Exam',
    grade: 'IP',
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    average: 'IP'
  },
  {
    id: '8',
    studentId: '2026-SIS-001',
    module: 'Work Immersion',
    code: 'WI',
    instructor: '',
    credits: 1.0,
    assessment: 'Final Report',
    grade: 'IP',
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    average: 'IP'
  }
];
