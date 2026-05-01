/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Search } from 'lucide-react';
import { LOGO_URL } from '../constants';

export function Navbar() {
  return (
    <header className="bg-primary/90 backdrop-blur-xl fixed top-0 z-50 h-24 w-full border-b border-white/10 shadow-lg shadow-black/40">
      <div className="flex justify-between items-center w-full px-12 max-w-screen-2xl mx-auto h-full">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4">
            <img 
              alt="Southdale International School Logo" 
              className="h-12 w-auto" 
              src={LOGO_URL}
            />
            <div className="font-headline text-sm font-bold text-on-surface tracking-widest uppercase hidden lg:block leading-tight max-w-[300px]">
              Southdale International School
            </div>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <nav className="hidden md:flex items-center gap-8">
            <a href="/dashboard" className="font-headline tracking-tight text-lg text-on-surface/80 hover:text-secondary transition-all">Home</a>
            <a href="/courses" className="font-headline tracking-tight text-lg text-on-surface/80 hover:text-secondary transition-all border-b-2 border-transparent hover:border-secondary">Courses</a>
            <a 
              href="https://www.facebook.com/share/1F4cmLUatG/" 
              target="_blank"
              rel="noopener noreferrer"
              className="font-headline tracking-tight text-lg text-on-surface/80 hover:text-secondary transition-all"
            >
              About Us
            </a>
          </nav>

          <div className="relative hidden lg:block group">
            <input 
              className="bg-white/10 border-none text-slate-100 placeholder:text-slate-400 focus:ring-1 focus:ring-secondary py-2 pl-4 pr-10 rounded-lg w-64 transition-all duration-300" 
              placeholder="Search resources..." 
              type="text" 
            />
            <Search className="absolute right-3 top-2.5 text-slate-400 group-hover:text-secondary transition-colors" size={18} />
          </div>
        </div>
      </div>
    </header>
  );
}
