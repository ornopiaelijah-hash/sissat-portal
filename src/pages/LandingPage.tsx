/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { BookOpen, Target, Clock, Users, ArrowRight, HelpCircle, Info, LogIn, Facebook, Calendar } from 'lucide-react';
import { LOGO_URL } from '../constants';

const FEATURE_CARDS = [
  {
    title: 'Easy access for grades',
    description: 'Easy access to digital modules and academic resources anytime, anywhere.',
    icon: BookOpen,
    color: 'bg-blue-500/10 text-blue-500'
  },
  {
    title: 'Class Schedule',
    description: 'View your personalized daily schedule, including subject timings, room assignments, and faculty details.',
    icon: Calendar,
    color: 'bg-orange-500/10 text-orange-500'
  },
  {
    title: 'Smart Attendance',
    description: 'Real-time student attendance monitoring for both online and face-to-face sessions.',
    icon: Clock,
    color: 'bg-amber-500/10 text-amber-500'
  },
  {
    title: 'Student Lounge',
    description: 'Collaborate with classmates and join forum discussions within the digital campus.',
    icon: Users,
    color: 'bg-emerald-500/10 text-emerald-500'
  }
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border-2 border-primary rounded-lg flex items-center justify-center overflow-hidden bg-white shadow-sm">
              <img src={LOGO_URL} alt="Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-primary font-bold text-lg hidden md:block">Southdale International School</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-gray-600 font-bold text-sm">
            <Link to="/helpdesk" className="flex items-center gap-2 hover:text-secondary transition-colors">
              <HelpCircle size={18} /> Campus Helpdesk
            </Link>
            <Link to="/faq" className="flex items-center gap-2 hover:text-secondary transition-colors">
              <Info size={18} /> FAQ
            </Link>
            <Link 
              to="/login"
              className="bg-primary text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/20"
            >
              <LogIn size={18} /> Log in
            </Link>
          </nav>

          <button className="md:hidden text-primary">
            <Users size={24} />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-secondary">
        {/* Slanted background split */}
        <div className="absolute inset-0 bg-primary translate-x-1/2 -skew-x-12 hidden lg:block" />
        
        <div className="max-w-[1600px] mx-auto px-6 py-12 lg:py-24 relative z-10 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative mb-8"
            >
              <h2 className="text-3xl md:text-5xl lg:text-7xl text-primary font-black uppercase italic leading-tight -ml-2 pr-2">
                START YOUR FUTURE WITH SOUTHDALE
              </h2>
              <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-none mt-2 text-primary text-stroke-thick drop-shadow-[5px_5px_0px_#002147]">
                WELCOME
              </h1>
              <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none text-secondary text-stroke-medium drop-shadow-[5px_5px_0px_#000a1e] -mt-2">
                Southdaleans
              </h1>
            </motion.div>
 
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4"
            >
              <Link 
                to="/login"
                className="bg-primary text-white px-10 py-4 rounded-full font-black uppercase text-sm tracking-widest flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-xl hover:shadow-primary/30"
              >
                Access Portal <ArrowRight size={20} />
              </Link>
              <a 
                href="https://www.facebook.com/share/v/1FsYWy2XJW/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary text-primary px-10 py-4 rounded-full font-black uppercase text-sm tracking-widest flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-xl hover:shadow-secondary/30"
              >
                Learn More <ArrowRight size={20} />
              </a>
            </motion.div>
          </div>
 
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex-[1.5] relative w-full lg:min-h-[600px] flex items-center"
          >
            <div className="aspect-[4/3] lg:aspect-[16/10] bg-white shadow-2xl rounded-3xl overflow-hidden border-2 border-white w-full lg:mr-0 transform hover:scale-[1.02] transition-transform duration-500">
               {/* High-quality Student Image */}
               <img 
                 src="https://scontent.fcrk3-3.fna.fbcdn.net/v/t39.30808-6/654092735_1526433246150793_8589719289779299419_n.png?_nc_cat=100&ccb=1-7&_nc_sid=2a1932&_nc_eui2=AeEbgjVtgSkCCpeG05m0SRBjhkyjoayuypKGTKOhrK7Kki6FrlBzC663swCzTBouKqFjY_BKSoYOxZ6COpvqmZ2V&_nc_ohc=fgEipAAFefwQ7kNvwEZUkt1&_nc_oc=Adq9ZmTYPWiSFwVH00l_PBKsYf10t7MTvVHExMO4gpbsAcukEsfJctSpiUjzB3ak340&_nc_zt=23&_nc_ht=scontent.fcrk3-3.fna&_nc_gid=rkvRiIOZLipxQgkcFgffng&_nc_ss=7b2a8&oh=00_Af6AzxYvAUb_Zm0LA7lAhpgFvJJZbi7-OfqcDeMPRMSgPA&oe=69FA1BE8" 
                 alt="Students" 
                 className="w-full h-full object-contain transition-all duration-700"
                 referrerPolicy="no-referrer"
               />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURE_CARDS.map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
                className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group"
              >
                <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Branding */}
      <footer className="py-8 border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
            © 2026 Southdale International School • Institutional Portal
          </p>
          <div className="flex gap-4 items-center">
             <a 
               href="https://www.facebook.com/share/1F4cmLUatG/"
               target="_blank"
               rel="noopener noreferrer"
               className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-lg hover:shadow-primary/20"
               title="Follow us on Facebook"
             >
               <Facebook size={20} />
             </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
