/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { BookOpen, Target, Clock, Users, ArrowRight, HelpCircle, Info, LogIn, Facebook, Calendar, ChevronRight, ChevronLeft, Play, Pause, Sun, Moon } from 'lucide-react';
import { LOGO_URL } from '../constants';
import { useStudent } from '../context/StudentContext';

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
  const { theme, toggleTheme } = useStudent();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slides = [
    "LOGO_SLIDE", // Special marker for the first slide
    "https://scontent.fcrk3-3.fna.fbcdn.net/v/t39.30808-6/654092735_1526433246150793_8589719289779299419_n.png?_nc_cat=100&ccb=1-7&_nc_sid=2a1932&_nc_eui2=AeEbgjVtgSkCCpeG05m0SRBjhkyjoayuypKGTKOhrK7Kki6FrlBzC663swCzTBouKqFjY_BKSoYOxZ6COpvqmZ2V&_nc_ohc=ca-ah0WCQtMQ7kNvwEUdGTn&_nc_oc=Adqp5jYXMYdvcA_Zd60nVa28Y904-JvVK77wRO6rRqDsFBfodU9EY7wDj0UBVakS6BE&_nc_zt=23&_nc_ht=scontent.fcrk3-3.fna&_nc_gid=_Dtg8GFixcs0G8asFA53zw&_nc_ss=7b2a8&oh=00_Af4NC4mdGqJg79Mm_0MtJkEhEdQKo14ji8SVFgb5uHW_vg&oe=69FC86A8",
    "https://scontent.fcrk3-3.fna.fbcdn.net/v/t39.30808-6/653716269_1524752566318861_4665345315009211760_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeGdYoMllG_Cqg00Q3EzU6_KE7B_DRHg8kITsH8NEeDyQgVojarRcKy57mlNDrEauWzl3jEhelfvs---GYDoA_2c&_nc_ohc=C0Lw_gWQWFsQ7kNvwEpC2Ix&_nc_oc=Ado2bC0uNOd8sw4FPPutGQj90wU5bXu_bj2X1td4SvaWvNkd2yeExgMhi6xyr5VBL8g&_nc_zt=23&_nc_ht=scontent.fcrk3-3.fna&_nc_gid=MRo5OE8faeKGi-6TEe7m1w&_nc_ss=7b2a8&oh=00_Af7LsVh2PXckVFHujrUSVZaDi6e52GPmy-0oHMF5xQnUyg&oe=69FC95D7"
  ];

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [slides.length, isPaused]);

  const nextSlide = () => setCurrentSlide(prev => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-surface/90 backdrop-blur-md border-b border-on-surface/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border-2 border-secondary rounded-lg flex items-center justify-center overflow-hidden bg-white shadow-sm">
              <img src={LOGO_URL} alt="Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-on-surface font-bold text-lg hidden md:block font-poppins whitespace-nowrap">Southdale International School</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-on-surface-variant font-bold text-sm font-poppins">
            <Link to="/helpdesk" className="flex items-center gap-2 hover:text-secondary transition-colors">
              <HelpCircle size={18} /> Campus Helpdesk
            </Link>
            <Link to="/faq" className="flex items-center gap-2 hover:text-secondary transition-colors">
              <Info size={18} /> FAQ
            </Link>
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-on-surface/5 border border-on-surface/10 text-on-surface hover:text-secondary hover:border-secondary transition-all"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Link 
              to="/login"
              className="bg-secondary text-on-secondary px-6 py-2 rounded-full flex items-center gap-2 hover:opacity-90 transition-all shadow-lg hover:shadow-secondary/20"
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
      <section className="relative h-[600px] lg:h-[800px] flex items-center justify-center overflow-hidden">
        {/* Background Carousel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-0"
          >
            {/* Multi-layered overlay for maximum readability */}
            <div className="absolute inset-0 bg-primary/60 z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/40 to-transparent z-15" />
            
            {slides[currentSlide] === "LOGO_SLIDE" ? (
              <div className="w-full h-full bg-white flex items-center justify-center relative overflow-hidden">
                {/* Large Background Watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <img 
                    src={LOGO_URL} 
                    alt="Watermark" 
                    className="w-[600px] h-[600px] md:w-[800px] md:h-[800px] lg:w-[1000px] lg:h-[1000px] object-contain opacity-[0.12]" 
                  />
                </div>
              </div>
            ) : (
              <img 
                src={slides[currentSlide]} 
                alt={`Slide ${currentSlide + 1}`}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            )}
          </motion.div>
        </AnimatePresence>
        
        <div className="max-w-7xl mx-auto px-6 relative z-20 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-5xl lg:text-7xl text-secondary font-bold uppercase mb-4 font-headline tracking-tight drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">
              START YOUR FUTURE WITH SOUTHDALE
            </h2>
            <div className="space-y-2">
              <h1 className="text-7xl md:text-9xl font-bold uppercase tracking-tighter leading-none text-white drop-shadow-[5px_5px_0px_#002147] font-headline">
                WELCOME
              </h1>
              <h1 className="text-6xl md:text-8xl font-bold uppercase tracking-tighter leading-none text-secondary drop-shadow-[5px_5px_0px_#000a1e] font-headline">
                Southdaleans
              </h1>
            </div>
          </motion.div>
 
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center lg:justify-start gap-6"
          >
            <Link 
              to="/login"
              className="bg-primary text-secondary border-2 border-secondary/50 px-10 py-5 rounded-full font-black uppercase text-sm tracking-widest flex items-center gap-3 hover:bg-secondary hover:text-primary transition-all shadow-[0_0_20px_rgba(0,0,0,0.3)] hover:shadow-secondary/20 font-poppins"
            >
              Access Portal <ArrowRight size={20} />
            </Link>
            <a 
              href="https://www.facebook.com/share/v/1FsYWy2XJW/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent text-white border-2 border-white/50 px-10 py-5 rounded-full font-black uppercase text-sm tracking-widest flex items-center gap-3 hover:bg-white hover:text-primary transition-all shadow-[0_0_20px_rgba(0,0,0,0.3)] font-poppins"
            >
              Learn More <ArrowRight size={20} />
            </a>
          </motion.div>
        </div>
 
        {/* Carousel Navigation Buttons */}
        <button 
          onClick={prevSlide}
          className="absolute left-8 top-1/2 -translate-y-1/2 z-30 w-16 h-16 bg-white/5 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white/50 hover:bg-secondary hover:text-primary hover:border-secondary hover:scale-110 active:scale-95 transition-all group shadow-2xl"
          aria-label="Previous slide"
        >
          <ChevronLeft size={32} strokeWidth={2.5} />
        </button>

        <button 
          onClick={nextSlide}
          className="absolute right-8 top-1/2 -translate-y-1/2 z-30 w-16 h-16 bg-white/5 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white/50 hover:bg-secondary hover:text-primary hover:border-secondary hover:scale-110 active:scale-95 transition-all group shadow-2xl"
          aria-label="Next slide"
        >
          <ChevronRight size={32} strokeWidth={2.5} />
        </button>

        {/* Slide Indicators & Controls */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex items-center gap-6">
          <div className="flex gap-3">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-12 h-1.5 rounded-full transition-all ${currentSlide === idx ? 'bg-secondary' : 'bg-white/30'}`}
              />
            ))}
          </div>

          <button
            onClick={() => setIsPaused(!isPaused)}
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-secondary hover:bg-secondary hover:text-primary transition-all shadow-xl"
            aria-label={isPaused ? "Play" : "Pause"}
          >
            {isPaused ? <Play size={20} fill="currentColor" /> : <Pause size={20} fill="currentColor" />}
          </button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-surface-container">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURE_CARDS.map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
                className="bg-surface p-8 rounded-3xl border border-on-surface/10 shadow-sm hover:shadow-xl transition-all group"
              >
                <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-on-surface mb-3 font-poppins">{feature.title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed font-poppins">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Branding */}
      <footer className="py-8 border-t border-on-surface/10 bg-surface">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-on-surface-variant text-xs font-bold uppercase tracking-widest">
            © 2026 Southdale International School • Institutional Portal
          </p>
          <div className="flex gap-4 items-center">
             <a 
               href="https://www.facebook.com/share/1F4cmLUatG/"
               target="_blank"
               rel="noopener noreferrer"
               className="w-10 h-10 rounded-full bg-on-surface/10 flex items-center justify-center text-on-surface hover:bg-secondary hover:text-on-secondary transition-all shadow-lg hover:shadow-secondary/20"
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
