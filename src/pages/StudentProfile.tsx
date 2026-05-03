/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useStudent } from '../context/StudentContext';
import { User, Mail, Phone, Globe, GraduationCap, School, ShieldCheck, Save, Loader2, Edit3, X, Check, CheckCircle, Camera } from 'lucide-react';
import { LOGO_URL } from '../constants';

export default function StudentProfile() {
  const { profile, updateProfile, isSaving, isLoadingData, grades } = useStudent();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    language: '',
    class: '',
    college: '',
    studentId: '',
    avatar: ''
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        phone: profile.phone || '',
        language: profile.language || '',
        class: profile.class || '',
        college: profile.college || '',
        studentId: profile.studentId || '',
        avatar: profile.avatar || ''
      });
      setAvatarPreview(profile.avatar || null);
    }
  }, [profile]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setAvatarPreview(base64String);
        setFormData(prev => ({ ...prev, avatar: base64String }));
        
        // Auto-save the avatar even if not in "Edit Identity Details" mode
        // if the user just wants to change the photo
        if (!isEditing) {
          updateProfile({ avatar: base64String });
          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 3000);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    const success = await updateProfile(formData);
    if (success) {
      setIsEditing(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  if (isLoadingData && !profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="animate-spin text-secondary" size={40} />
        <p className="text-xs uppercase tracking-widest text-on-surface-variant font-bold">Synchronizing Student Profile...</p>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="pb-24 relative overflow-hidden"
    >
      {/* Background Faded Logo */}
      <div className="absolute -right-32 -top-32 opacity-10 rotate-12 select-none pointer-events-none transform scale-150 [mask-image:radial-gradient(circle,black_20%,transparent_70%)] z-0">
        <img src={LOGO_URL} alt="" className="w-[500px] h-[500px] grayscale brightness-125 contrast-75" />
      </div>

      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className="fixed top-24 left-1/2 z-50 bg-secondary text-on-secondary px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 font-bold text-xs uppercase tracking-widest border border-white/20"
          >
            <CheckCircle size={16} /> Identity Record Synchronized
          </motion.div>
        )}
      </AnimatePresence>

      <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <span className="label-md uppercase tracking-[0.3em] text-secondary font-bold text-xs mb-4 block underline decoration-secondary/30 underline-offset-8">Information Repository</span>
          <h1 className="text-5xl md:text-6xl font-bold text-on-surface tracking-tight leading-tight font-headline">
            Institutional <br /> Student Profile
          </h1>
        </div>
        {!isEditing ? (
          <button 
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-secondary border border-white/10 rounded-lg font-bold text-xs uppercase tracking-widest transition-all hover:scale-105 active:scale-95"
          >
            <Edit3 size={14} /> Edit Identity Details
          </button>
        ) : (
          <div className="flex gap-3">
            <button 
              onClick={() => setIsEditing(false)}
              className="flex items-center gap-2 px-6 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg font-bold text-xs uppercase tracking-widest transition-all"
            >
              <X size={14} /> Cancel
            </button>
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-3 bg-secondary text-on-secondary rounded-lg font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-secondary/20 hover:shadow-secondary/40 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} 
              {isSaving ? "Saving..." : "Commit Changes"}
            </button>
          </div>
        )}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Avatar & Summary */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          <section className="bg-surface-container rounded-2xl p-1 border border-white/5 overflow-hidden">
            <div className="bg-primary-container rounded-xl p-8 velvet-depth flex flex-col items-center text-center">
              <div className="relative mb-6">
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageChange} 
                  accept="image/*" 
                  className="hidden" 
                />
                <div 
                  className="w-32 h-32 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center p-1 group cursor-pointer relative overflow-hidden"
                  onClick={handleImageClick}
                >
                  <div className="w-full h-full rounded-2xl bg-secondary/10 flex items-center justify-center overflow-hidden border border-secondary/20 transition-all duration-500 group-hover:scale-110">
                    {avatarPreview ? (
                      <img src={avatarPreview} alt="Student Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <img src={LOGO_URL} alt="Default Logo Avatar" className="w-20 h-20 object-contain opacity-40 group-hover:opacity-100 transition-opacity" />
                    )}
                  </div>
                  <div className="absolute inset-0 bg-primary/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center">
                    <Camera size={24} className="text-secondary mb-2" />
                    <p className="text-[10px] font-bold text-white uppercase tracking-widest text-center px-2">Update Photo</p>
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl bg-primary border-2 border-surface-container flex items-center justify-center shadow-2xl z-10">
                  <ShieldCheck size={20} className="text-secondary" />
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-on-surface mb-1 font-headline uppercase tracking-tight">
                {profile.firstName} {profile.lastName}
              </h2>
              <p className="text-xs font-mono text-secondary mb-6 tracking-wide">ID: {profile.studentId}</p>
              
              <div className="w-full h-px bg-white/5 mb-6"></div>
              
              <div className="w-full space-y-4">
                <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest">
                  <span className="text-on-surface-variant">Auth Status</span>
                  <span className="text-secondary flex items-center gap-1.5"><Check size={12} /> Verified</span>
                </div>
                <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest">
                  <span className="text-on-surface-variant">Membership</span>
                  <span className="text-on-surface">Regular Student</span>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-surface-container rounded-2xl p-1 border border-white/5">
            <div className="bg-primary-container rounded-xl p-6 velvet-depth">
              <h3 className="text-xs font-bold text-secondary uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <GraduationCap size={14} /> Academic Focus
              </h3>
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] font-bold uppercase text-on-surface-variant mb-2 tracking-widest opacity-50">Assigned Strand</p>
                  <p className="text-sm font-bold text-on-surface">{profile.college}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase text-on-surface-variant mb-2 tracking-widest opacity-50">Current Grade Level</p>
                  <p className="text-sm font-bold text-on-surface">{profile.class}</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Detailed Fields */}
        <div className="lg:col-span-8">
          <section className="bg-surface-container rounded-2xl p-1 border border-white/5 h-full">
            <div className="bg-primary-container rounded-xl p-8 md:p-12 velvet-depth h-full">
              <h3 className="text-xl font-bold text-on-surface mb-10 font-headline uppercase tracking-tight flex items-center gap-3">
                 Institutional Registry Fields
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                {/* Field: First Name */}
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase text-secondary tracking-[0.2em]">First Name</label>
                  {isEditing ? (
                    <input 
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-on-surface focus:outline-none focus:border-secondary transition-all font-sans text-sm"
                    />
                  ) : (
                    <div className="p-4 bg-white/2 rounded-lg border border-white/5 flex items-center gap-4 group">
                      <User className="text-on-surface-variant group-hover:text-secondary transition-colors" size={18} />
                      <span className="text-on-surface font-medium">{profile.firstName}</span>
                    </div>
                  )}
                </div>

                {/* Field: Last Name */}
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase text-secondary tracking-[0.2em]">Last Name</label>
                  {isEditing ? (
                    <input 
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-on-surface focus:outline-none focus:border-secondary transition-all font-sans text-sm"
                    />
                  ) : (
                    <div className="p-4 bg-white/2 rounded-lg border border-white/5 flex items-center gap-4 group">
                      <User className="text-on-surface-variant group-hover:text-secondary transition-colors" size={18} />
                      <span className="text-on-surface font-medium">{profile.lastName}</span>
                    </div>
                  )}
                </div>

                {/* Field: Institutional Email */}
                <div className="space-y-3 opacity-80">
                  <label className="text-[10px] font-bold uppercase text-secondary tracking-[0.2em]">Institutional Email</label>
                  <div className="p-4 bg-white/2 rounded-lg border border-white/5 flex items-center gap-4 cursor-not-allowed group">
                    <Mail className="text-on-surface-variant/50" size={18} />
                    <span className="text-on-surface-variant font-mono text-sm">{profile.email}</span>
                  </div>
                  <p className="text-[10px] text-on-surface-variant italic">Permanent credential provided by the Office of IT.</p>
                </div>

                {/* Field: Student ID */}
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase text-secondary tracking-[0.2em]">Student ID Number</label>
                  {isEditing ? (
                    <input 
                      type="text"
                      value={formData.studentId}
                      onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-on-surface focus:outline-none focus:border-secondary transition-all font-mono text-sm"
                    />
                  ) : (
                    <div className="p-4 bg-white/2 rounded-lg border border-white/5 flex items-center gap-4 group">
                      <ShieldCheck className="text-on-surface-variant group-hover:text-secondary transition-colors" size={18} />
                      <span className="text-on-surface font-mono">{profile.studentId}</span>
                    </div>
                  )}
                </div>

                {/* Field: Phone */}
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase text-secondary tracking-[0.2em]">Primary Contact</label>
                  {isEditing ? (
                    <input 
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-on-surface focus:outline-none focus:border-secondary transition-all font-sans text-sm"
                    />
                  ) : (
                    <div className="p-4 bg-white/2 rounded-lg border border-white/5 flex items-center gap-4 group">
                      <Phone className="text-on-surface-variant group-hover:text-secondary transition-colors" size={18} />
                      <span className="text-on-surface font-medium">{profile.phone}</span>
                    </div>
                  )}
                </div>

                {/* Field: Language */}
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase text-secondary tracking-[0.2em]">Instructional Language</label>
                  {isEditing ? (
                    <select 
                      value={formData.language}
                      onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-on-surface focus:outline-none focus:border-secondary transition-all font-sans text-sm appearance-none"
                    >
                      <option className="bg-primary" value="English (Global)">English (Global)</option>
                      <option className="bg-primary" value="Filipino">Filipino</option>
                      <option className="bg-primary" value="Spanish">Spanish</option>
                      <option className="bg-primary" value="Mandarin">Mandarin</option>
                    </select>
                  ) : (
                    <div className="p-4 bg-white/2 rounded-lg border border-white/5 flex items-center gap-4 group">
                      <Globe className="text-on-surface-variant group-hover:text-secondary transition-colors" size={18} />
                      <span className="text-on-surface font-medium">{profile.language}</span>
                    </div>
                  )}
                </div>
                
                {/* Field: Strand / College */}
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase text-secondary tracking-[0.2em]">Departmental Strand</label>
                  {isEditing ? (
                    <select 
                      value={formData.college}
                      onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-on-surface focus:outline-none focus:border-secondary transition-all font-sans text-sm appearance-none"
                    >
                      <option className="bg-primary" value="TVL-ICT">TVL-ICT</option>
                      <option className="bg-primary" value="TVL-H.E">TVL-H.E</option>
                    </select>
                  ) : (
                    <div className="p-4 bg-white/2 rounded-lg border border-white/5 flex items-center gap-4 group">
                      <School className="text-on-surface-variant group-hover:text-secondary transition-colors" size={18} />
                      <span className="text-on-surface font-medium">{profile.college}</span>
                    </div>
                  )}
                </div>

                {/* Field: Grade Level / Class */}
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase text-secondary tracking-[0.2em]">Grade / Year Level</label>
                  {isEditing ? (
                    <input 
                      type="text"
                      value={formData.class}
                      onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-on-surface focus:outline-none focus:border-secondary transition-all font-sans text-sm"
                    />
                  ) : (
                    <div className="p-4 bg-white/2 rounded-lg border border-white/5 flex items-center gap-4 group">
                      <GraduationCap className="text-on-surface-variant group-hover:text-secondary transition-colors" size={18} />
                      <span className="text-on-surface font-medium">{profile.class}</span>
                    </div>
                  )}
                </div>
              </div>
              
              {!isEditing && (
                <div className="mt-16 p-6 border-l-4 border-secondary/30 bg-secondary/5 rounded-r-xl">
                  <p className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-2">Privacy & Security Notice</p>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Some information in this repository is managed and verified centrally by Southdale International School. 
                    If critical fields like Email or Enrollment Status require correction, please coordinate directly with the **Office of Academic Records**.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* Academic Record Summary Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-8"
      >
        <section className="bg-surface-container rounded-2xl p-1 border border-white/5">
          <div className="bg-primary-container rounded-xl p-8 md:p-12 velvet-depth">
            <h3 className="text-xl font-bold text-on-surface mb-8 font-headline uppercase tracking-tight flex items-center gap-3">
              Official Academic Record Summary
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {grades.filter(g => g.studentId === profile.uid).length > 0 ? (
                grades
                  .filter(g => g.studentId === profile.uid)
                  .map((grade) => (
                    <div key={grade.id} className="p-6 bg-white/2 rounded-xl border border-white/5 hover:border-secondary/20 transition-all group">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="text-[10px] font-mono font-bold text-secondary uppercase tracking-widest mb-1">{grade.code}</p>
                          <h4 className="text-on-surface font-bold group-hover:text-secondary transition-colors">{grade.module}</h4>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">Final Average</p>
                          <div className={`text-2xl font-headline font-black ${Number(grade.grade) >= 75 ? 'text-green-400' : 'text-red-400'}`}>
                            {grade.grade || 'IP'}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="col-span-full py-12 flex flex-col items-center justify-center text-on-surface-variant opacity-40">
                  <GraduationCap size={48} className="mb-4" />
                  <p className="text-xs uppercase font-bold tracking-widest italic">No academic records synchronized for this identity.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </motion.div>
    </motion.div>
  );
}
