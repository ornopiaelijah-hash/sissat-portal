/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { COURSES, ANNOUNCEMENTS, LOGO_URL } from '../constants';
import { 
  Calendar, 
  Users, 
  ClipboardList, 
  BookOpen, 
  ChevronRight, 
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  GraduationCap
} from 'lucide-react';
import { useStudent } from '../context/StudentContext';

const FACULTY_SCHEDULE = [
  {
    id: '1',
    time: '08:30',
    duration: '1 hr 30',
    title: 'Research 2: Data Collection',
    section: '12-JUPITER',
    location: 'Research Lab A',
    students: 32,
    type: 'Lecture'
  },
  {
    id: '2',
    time: '10:30',
    duration: '1 hr 00',
    title: 'Research 2: Methodology',
    section: '12-MARS',
    location: 'Room 204',
    students: 28,
    type: 'Discussion'
  },
  {
    id: '3',
    time: '13:00',
    duration: '2 hr 00',
    title: "3I's: Portfolio Review",
    section: '12-VENUS',
    location: 'Conference Room B',
    students: 25,
    type: 'Assessment'
  }
];

const PENDING_TASKS = [
  {
    id: '1',
    title: 'Grade Research Proposals',
    course: 'Research 2',
    section: '12-JUPITER',
    dueDate: 'Tomorrow',
    submissions: 28,
    total: 32,
    urgent: true
  },
  {
    id: '2',
    title: 'Review Portfolio Submissions',
    course: "3I's",
    section: '12-MARS',
    dueDate: 'Apr 28',
    submissions: 25,
    total: 28,
    urgent: false
  },
  {
    id: '3',
    title: 'Finalize Term Grades',
    course: 'All Sections',
    section: '',
    dueDate: 'Apr 30',
    submissions: 85,
    total: 85,
    urgent: false
  }
];

const QUICK_STATS = [
  { label: 'Total Students', value: '85', icon: Users, trend: '+3 this sem' },
  { label: 'Classes Today', value: '3', icon: Calendar, trend: 'Next: 10:30' },
  { label: 'Pending Grades', value: '12', icon: ClipboardList, trend: 'Due this week' },
  { label: 'Avg. Class Score', value: '91.2', icon: TrendingUp, trend: '+2.4% from last' },
];

export default function FacultyDashboard() {
  const { profile, students } = useStudent();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <header className="mb-12 flex flex-col md:flex-row justify-between md:items-end gap-4 relative overflow-hidden p-8 bg-surface-container rounded-2xl border border-white/5">
        <div className="absolute -right-16 -top-16 opacity-[0.03] rotate-12 select-none pointer-events-none">
          <img src={LOGO_URL} alt="" className="w-96 h-96 grayscale" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-secondary mb-2">
            <GraduationCap size={18} />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Faculty Portal</span>
          </div>
          <h1 className="text-4xl text-on-surface font-bold tracking-tight mb-2 font-headline">Welcome back, {profile.firstName}</h1>
          <p className="text-on-surface-variant font-sans">Department of {profile.college} • Senior Faculty</p>
        </div>
        <div className="hidden lg:flex items-center gap-3 bg-white/5 px-6 py-3 rounded-xl border border-white/10 relative z-10">
          <img src={LOGO_URL} className="w-8 h-8 object-contain" alt="Branding" />
          <div className="text-[10px] font-bold uppercase tracking-widest text-secondary">Academic Term: 2024-2025 Q4</div>
        </div>
      </header>

      {/* Quick Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {QUICK_STATS.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-surface-container p-6 rounded-xl border border-white/5 hover:border-secondary/20 transition-all group cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 bg-white/5 rounded-lg group-hover:bg-secondary/10 transition-colors">
                <stat.icon size={20} className="text-on-surface-variant group-hover:text-secondary transition-colors" />
              </div>
            </div>
            <div className="text-3xl font-headline font-bold text-on-surface mb-1">{stat.value}</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">{stat.label}</div>
            <div className="text-[9px] text-secondary mt-2 font-bold">{stat.trend}</div>
          </motion.div>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        {/* Today's Schedule */}
        <section className="lg:col-span-7 bg-primary-container p-8 rounded-xl editorial-shadow border-l-4 border-secondary">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl text-on-surface font-bold tracking-tight flex items-center gap-3 font-headline">
              <Calendar className="text-secondary" />
              Today&apos;s Teaching Schedule
            </h2>
            <Link to="/schedule" className="text-[10px] font-bold uppercase tracking-widest text-secondary hover:underline transition-colors">
              Full Schedule
            </Link>
          </div>

          <div className="space-y-4">
            {FACULTY_SCHEDULE.map((item, idx) => (
              <div 
                key={item.id}
                className={`flex items-start gap-6 p-4 -mx-4 hover:bg-white/5 transition-all duration-200 rounded-lg cursor-pointer ${idx > 0 ? 'border-t border-white/5' : ''}`}
              >
                <div className="w-20 pt-1 text-right shrink-0">
                  <div className="text-sm font-bold text-on-surface">{item.time}</div>
                  <div className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">{item.duration}</div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-headline text-on-surface">{item.title}</h3>
                  <p className="text-sm text-on-surface-variant mb-2">{item.section} • {item.location}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-primary text-on-surface px-2 py-0.5 text-[10px] font-bold rounded uppercase border border-white/10">{item.type}</span>
                    <span className="bg-white/5 text-on-surface-variant px-2 py-0.5 text-[10px] font-bold rounded uppercase flex items-center gap-1">
                      <Users size={10} /> {item.students} Students
                    </span>
                  </div>
                </div>
                <ChevronRight size={20} className="text-on-surface-variant/30 mt-2" />
              </div>
            ))}
          </div>
        </section>

        {/* Pending Tasks */}
        <section className="lg:col-span-5 space-y-6">
          <div className="bg-surface-container p-6 rounded-xl border border-white/5">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary flex items-center gap-2">
                <ClipboardList size={14} />
                Pending Tasks
              </h3>
              <Link to="/grades" className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant hover:text-secondary transition-colors">
                View All
              </Link>
            </div>
            <ul className="space-y-4">
              {PENDING_TASKS.map((task) => (
                <li 
                  key={task.id} 
                  className="group cursor-pointer hover:bg-white/5 -mx-2 px-2 py-3 rounded-lg transition-colors border-l-2 border-transparent hover:border-secondary"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-bold text-on-surface group-hover:text-secondary transition-colors">{task.title}</p>
                        {task.urgent && (
                          <span className="px-1.5 py-0.5 bg-red-500/10 text-red-400 text-[8px] font-bold uppercase rounded">Urgent</span>
                        )}
                      </div>
                      <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">
                        {task.course} {task.section && `• ${task.section}`}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-[10px] text-secondary font-bold">{task.dueDate}</div>
                      <div className="text-[9px] text-on-surface-variant mt-1">
                        {task.submissions}/{task.total} done
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 h-1 w-full bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-secondary/60" 
                      style={{ width: `${(task.submissions / task.total) * 100}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Actions */}
          <div className="bg-primary-container p-6 rounded-xl border border-secondary/10 velvet-depth">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <Link 
                to="/grades"
                className="flex flex-col items-center gap-2 p-4 bg-white/5 rounded-lg hover:bg-secondary/10 transition-all group border border-white/5 hover:border-secondary/30"
              >
                <ClipboardList size={24} className="text-on-surface-variant group-hover:text-secondary transition-colors" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-on-surface-variant group-hover:text-on-surface">Manage Grades</span>
              </Link>
              <Link 
                to="/courses"
                className="flex flex-col items-center gap-2 p-4 bg-white/5 rounded-lg hover:bg-secondary/10 transition-all group border border-white/5 hover:border-secondary/30"
              >
                <BookOpen size={24} className="text-on-surface-variant group-hover:text-secondary transition-colors" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-on-surface-variant group-hover:text-on-surface">Course Materials</span>
              </Link>
              <Link 
                to="/schedule"
                className="flex flex-col items-center gap-2 p-4 bg-white/5 rounded-lg hover:bg-secondary/10 transition-all group border border-white/5 hover:border-secondary/30"
              >
                <Calendar size={24} className="text-on-surface-variant group-hover:text-secondary transition-colors" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-on-surface-variant group-hover:text-on-surface">Schedule</span>
              </Link>
              <Link 
                to="/profile"
                className="flex flex-col items-center gap-2 p-4 bg-white/5 rounded-lg hover:bg-secondary/10 transition-all group border border-white/5 hover:border-secondary/30"
              >
                <Users size={24} className="text-on-surface-variant group-hover:text-secondary transition-colors" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-on-surface-variant group-hover:text-on-surface">My Profile</span>
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* My Classes Overview */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl text-on-surface font-bold tracking-tight font-headline flex items-center gap-3">
            <BookOpen className="text-secondary" />
            My Classes
          </h2>
          <Link to="/courses" className="text-[10px] font-bold uppercase tracking-widest text-secondary hover:underline">
            View All Courses
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COURSES.slice(0, 3).map((course, idx) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-surface-container rounded-xl overflow-hidden border border-white/5 hover:border-secondary/20 transition-all group cursor-pointer"
            >
              <div className="h-32 relative overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <span className="bg-secondary text-primary text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded">
                    {course.category}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-headline font-bold text-on-surface mb-1 group-hover:text-secondary transition-colors">
                  {course.title}
                </h3>
                <p className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold mb-3">
                  {course.code} • 3 Sections
                </p>
                <div className="flex items-center justify-between text-[10px]">
                  <div className="flex items-center gap-1 text-on-surface-variant">
                    <Users size={12} />
                    <span>85 Students</span>
                  </div>
                  <div className="flex items-center gap-1 text-secondary">
                    <CheckCircle2 size={12} />
                    <span className="font-bold">{course.progress}% Graded</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recent Student Activity */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl text-on-surface font-bold tracking-tight font-headline flex items-center gap-3">
            <Clock className="text-secondary" />
            Recent Submissions
          </h2>
        </div>
        <div className="bg-surface-container rounded-xl border border-white/5 overflow-hidden">
          <div className="divide-y divide-white/5">
            {students.map((student) => (
              <div 
                key={student.studentId}
                className="flex items-center gap-4 p-5 hover:bg-white/5 transition-colors cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Users size={18} className="text-on-surface-variant" />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-on-surface text-sm">{student.firstName} {student.lastName}</div>
                  <div className="text-[10px] text-on-surface-variant uppercase tracking-wider">
                    {student.class} • Submitted Research Proposal
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-secondary font-bold">2 hours ago</div>
                  <div className="flex items-center gap-1 text-[9px] text-green-500 mt-1">
                    <CheckCircle2 size={10} />
                    <span className="uppercase tracking-wider font-bold">On Time</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
