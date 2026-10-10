"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { MapPin, Bell, User as UserIcon, HelpCircle, LogOut, Settings, History, Search, Activity, Building, Home, Camera, FileText, Bot, Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LANGUAGES } from '@/lib/languages';

interface HeaderProps {
  title?: string;
  showSearch?: boolean;
  showLocation?: boolean;
  backLink?: string;
  backText?: string;
}

export default function Header({ 
  title = "CIVIC", 
  showSearch = false, 
  showLocation = false,
  backLink,
  backText = "Back"
}: HeaderProps) {
  const router = useRouter();
  const [profileOpen, setProfileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  
  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
    setLangOpen(false);
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
    } catch (e) {
      console.error("Logout failed", e);
    }
  };

  return (
    <header className="w-full p-4 glass sticky top-0 z-50 border-b border-white/10 backdrop-blur-xl bg-[#0a192f]/80 text-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Logo / Title */}
        <div className="flex items-center gap-3">
          {backLink ? (
            <Link href={backLink} className="text-sm bg-white/10 hover:bg-white/20 p-2 rounded-full transition mr-2 border border-white/10">
              <span className="sr-only">{backText}</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </Link>
          ) : (
            <Link href="/dashboard" className="p-2 bg-blue-600 rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.5)] flex items-center justify-center">
              <Activity size={20} className="text-white" />
            </Link>
          )}
          <Link href="/dashboard" className="flex flex-col">
            <h1 className="text-xl font-extrabold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-300">
              {title}
            </h1>
          </Link>
        </div>
        
        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-300">
          <Link href="/dashboard" className="hover:text-white flex items-center gap-1.5 transition"><Home size={16}/> {t('header.dashboard', 'Home')}</Link>
          <Link href="/portals" className="hover:text-white flex items-center gap-1.5 transition"><Building size={16}/> {t('header.portals', 'Government Portals')}</Link>
          <Link href="/report" className="hover:text-white flex items-center gap-1.5 transition"><Camera size={16}/> {t('header.report', 'Report Problem')}</Link>
          <Link href="/tracking" className="hover:text-white flex items-center gap-1.5 transition"><FileText size={16}/> {t('header.track', 'Track Complaint')}</Link>
        </nav>

        {/* Right side controls */}
        <div className="flex items-center gap-4 relative" ref={dropdownRef}>
          {showLocation && (
            <div className="hidden md:flex items-center gap-2 bg-white/10 border border-white/20 px-3 py-1.5 rounded-full text-xs text-teal-100">
              <MapPin size={14} className="text-teal-400" />
              <span>All India</span>
            </div>
          )}

          {showSearch && (
             <button aria-label="Search" onClick={() => document.getElementById('search-input')?.focus()} className="p-2 hover:bg-white/10 rounded-full transition">
               <Search size={18} />
             </button>
          )}

          {/* Language Selector */}
          <div className="relative" ref={langRef}>
            <button 
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-2 p-1.5 px-3 bg-white/5 border border-white/20 rounded-full hover:bg-white/10 transition text-sm text-gray-300"
              title={t('header.language', 'Language')}
            >
              <Languages size={16} className="text-teal-400" />
              <span className="hidden sm:inline uppercase font-bold text-xs">
                {i18n.language || 'en'}
              </span>
            </button>
            {langOpen && (
              <div className="absolute right-0 mt-3 w-56 max-h-96 overflow-y-auto custom-scrollbar bg-[#0f172a] rounded-xl shadow-2xl py-2 text-gray-300 border border-white/10 z-50 backdrop-blur-xl">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`w-full text-left px-4 py-2 hover:bg-white/10 transition flex items-center justify-between ${i18n.language === lang.code ? 'bg-blue-600/20 text-blue-400' : ''}`}
                  >
                    <span className="font-medium">{lang.nativeName}</span>
                    <span className="text-xs opacity-50">{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <button aria-label="Notifications" onClick={() => alert("No new notifications")} className="p-2 hover:bg-white/10 rounded-full transition">
            <Bell size={18} />
          </button>
          
          {/* Profile Dropdown */}
          <div className="relative">
            <button 
              aria-label="Profile" 
              onClick={() => setProfileOpen(!profileOpen)}
              className="p-1.5 bg-blue-600/20 border border-blue-400/30 rounded-full hover:bg-blue-600/40 transition flex items-center justify-center text-blue-300"
            >
              <UserIcon size={18} />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-[#0f172a] rounded-xl shadow-2xl py-2 text-gray-300 border border-white/10 z-50 backdrop-blur-xl">
                <div className="px-4 py-3 border-b border-white/10">
                  <p className="text-sm text-white font-bold">My Account</p>
                  <p className="text-xs text-gray-400 truncate">citizen@civic.in</p>
                </div>
                <div className="py-2">
                  <Link href="/profile" className="flex items-center gap-3 px-4 py-2 hover:bg-white/5 transition" onClick={() => setProfileOpen(false)}>
                    <UserIcon size={16} className="text-blue-400" /> Profile Settings
                  </Link>
                  <Link href="/tracking" className="flex items-center gap-3 px-4 py-2 hover:bg-white/5 transition" onClick={() => setProfileOpen(false)}>
                    <History size={16} className="text-teal-400" /> My Complaints
                  </Link>
                </div>
                <div className="h-px bg-white/10 my-1"></div>
                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 hover:bg-red-500/10 text-red-400 transition">
                  <LogOut size={16} /> Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
