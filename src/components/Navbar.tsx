/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Search, Sun, Moon } from 'lucide-react';
import { LOGO_URL } from '../constants';
import { useStudent } from '../context/StudentContext';

export function Navbar() {
  const { theme, toggleTheme } = useStudent();

  return (
    <header className="bg-primary/90 backdrop-blur-xl fixed top-0 z-50 h-24 w-full border-b border-on-surface/10 shadow-lg shadow-black/40">
      <div className="flex justify-between items-center w-full px-12 max-w-screen-2xl mx-auto h-full">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4">
            <img 
              alt="Southdale International School Logo" 
              className="h-12 w-auto" 
              src={LOGO_URL}
            />
            <div className="font-poppins text-sm font-bold text-on-primary tracking-widest uppercase hidden lg:block whitespace-nowrap">
              Southdale International School
            </div>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <nav className="hidden md:flex items-center gap-8">
            <a href="/dashboard" className="font-poppins tracking-tight text-lg text-on-primary/80 hover:text-secondary transition-all">Home</a>
            <a href="/courses" className="font-poppins tracking-tight text-lg text-on-primary/80 hover:text-secondary transition-all border-b-2 border-transparent hover:border-secondary">Courses</a>
            <a 
              href="https://www.facebook.com/share/1F4cmLUatG/" 
              target="_blank"
              rel="noopener noreferrer"
              className="font-poppins tracking-tight text-lg text-on-primary/80 hover:text-secondary transition-all"
            >
              About Us
            </a>
          </nav>

          <button 
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-on-primary hover:text-secondary hover:border-secondary transition-all"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <div className="relative hidden lg:block group">
            <input 
              className="bg-white/10 border-none text-on-primary placeholder:text-on-primary/40 focus:ring-1 focus:ring-secondary py-2 pl-4 pr-10 rounded-lg w-64 transition-all duration-300" 
              placeholder="Search resources..." 
              type="text" 
            />
            <Search className="absolute right-3 top-2.5 text-on-primary/40 group-hover:text-secondary transition-colors" size={18} />
          </div>
        </div>
      </div>
    </header>
  );
}
