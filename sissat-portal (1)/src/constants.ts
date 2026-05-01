/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Course, Lecture, Deadline, Announcement, Submission, TranscriptEntry } from './types';

export const LOGO_URL = 'https://scontent.fcrk3-2.fna.fbcdn.net/v/t39.30808-6/435174027_936209608506496_6474096949489195287_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeHdu-RKuvnAKWcgjq4T33wf9HmFRBbIePD0eYVEFsh48BySZzcoiZdJInaiP7X4qQ1uPIcSGdgTSvPG2ZqqvpkV&_nc_ohc=Q4TWpGRFgHUQ7kNvwH-9WGO&_nc_oc=AdoRqFli7dGFQ4vzahvVCZlWJO0bRXR9AA7U71gg8ENvc0w5p7iQBJANh2non4Xl9cE&_nc_zt=23&_nc_ht=scontent.fcrk3-2.fna&_nc_gid=cB6Rr4ccL_deBBEUaa7ZLw&_nc_ss=7b2a8&oh=00_Af2GsgdMBWTz7qSsK_YP8MJFUM163AuWgoMF-51bYdn2ew&oe=69F54471';

export const COURSES: Course[] = [
  {
    id: '1',
    title: 'Research 2',
    code: 'RES 2',
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
    image: 'https://images.unsplash.com/photo-1450364193850-d954e155de01?auto=format&fit=crop&q=80&w=800'
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
    code: 'ICT-CSS',
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
    course: 'Entrepreneurship',
    dueDate: 'April 25 (11:59)',
    type: 'Project',
    daysRemaining: 6
  },
  {
    id: '2',
    title: 'CSS Diagnostic Test',
    course: 'ICT-CSS',
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
    course: 'Research 2',
    dueDate: 'Oct 22',
    status: 'In 2 Days',
    action: 'Submit Portal'
  },
  {
    id: '2',
    assignment: 'Marketing Strategy Pitch',
    course: 'Entrepreneurship',
    dueDate: 'Oct 24',
    status: 'Upcoming',
    action: 'View Brief'
  },
  {
    id: '3',
    assignment: "OS Installation Guide",
    course: 'CSS (NC II)',
    dueDate: 'Oct 29',
    status: 'Upcoming',
    action: 'View Brief'
  }
];

export const TRANSCRIPT: TranscriptEntry[] = [
  {
    id: '1',
    studentId: '2026-SIS-001',
    module: 'Research 2',
    code: 'RES 2',
    instructor: 'Dr. Marlou M. Tangaliin',
    credits: 1.0,
    assessment: 'Paper & Defense',
    grade: '95'
  },
  {
    id: '2',
    studentId: '2026-SIS-001',
    module: "3I's",
    code: "3IS",
    instructor: 'Dr. Marlou M. Tangaliin',
    credits: 1.0,
    assessment: 'Portfolio',
    grade: '92'
  },
  {
    id: '3',
    studentId: '2026-SIS-001',
    module: 'Entrepreneurship',
    code: 'ENTREP',
    instructor: 'Mr. Jash Aiden Cortes III',
    credits: 1.0,
    assessment: 'Business Plan',
    grade: '88'
  },
  {
    id: '4',
    studentId: '2026-SIS-001',
    module: 'CSS (NC II)',
    code: 'ICT-CSS',
    instructor: 'Mr. Joseph Peter Simeon',
    credits: 1.0,
    assessment: 'Practical Exam',
    grade: '98'
  },
  {
    id: '5',
    studentId: '2026-SIS-001',
    module: 'HOPE',
    code: 'PE',
    instructor: 'Mr. Arbie Sadsad',
    credits: 1.0,
    assessment: 'Skills Test',
    grade: '90'
  },
  {
    id: '6',
    studentId: '2026-SIS-001',
    module: 'Work Immersion',
    code: 'WI',
    instructor: 'Mr. Charles Faz Jr.',
    credits: 1.0,
    assessment: 'Final Report',
    grade: '96'
  }
];
