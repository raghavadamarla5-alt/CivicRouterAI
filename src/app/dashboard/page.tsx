"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { 
  Search, MapPin, Building, FileText, Droplets, Trash2, 
  Car, TestTube, Lightbulb, Zap, ArchiveRestore, Bus, 
  Train, TrafficCone, Wind, Map, PawPrint, TreePine, 
  Building2, HelpCircle 
} from 'lucide-react';

import Header from '@/components/Header';
import { useTranslation } from 'react-i18next';

const categories = [
  { name: 'Water Supply', icon: Droplets, color: 'text-blue-400', bg: 'bg-blue-500/20', desc: 'No water, contaminated supply, leaks' },
  { name: 'Garbage & Waste Management', icon: Trash2, color: 'text-emerald-400', bg: 'bg-emerald-500/20', desc: 'Uncollected garbage, illegal dumping' },
  { name: 'Potholes & Damaged Roads', icon: Car, color: 'text-orange-400', bg: 'bg-orange-500/20', desc: 'Bad roads, missing manhole covers' },
  { name: 'Drainage & Sewage', icon: TestTube, color: 'text-indigo-400', bg: 'bg-indigo-500/20', desc: 'Blocked drains, sewage overflow' },
  { name: 'Streetlight Problems', icon: Lightbulb, color: 'text-yellow-400', bg: 'bg-yellow-500/20', desc: 'Broken or non-functioning streetlights' },
  { name: 'Electricity Problems', icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-600/20', desc: 'Power cuts, dangerous wires' },
  { name: 'Public Sanitation', icon: ArchiveRestore, color: 'text-teal-400', bg: 'bg-teal-500/20', desc: 'Public toilets, hygiene issues' },
  { name: 'Public Transport & Bus Services', icon: Bus, color: 'text-blue-500', bg: 'bg-blue-600/20', desc: 'Bus delays, poor condition' },
  { name: 'Railway Complaints', icon: Train, color: 'text-red-400', bg: 'bg-red-500/20', desc: 'Train delays, station cleanliness' },
  { name: 'Traffic & Road Safety', icon: TrafficCone, color: 'text-orange-500', bg: 'bg-orange-600/20', desc: 'Signals not working, traffic issues' },
  { name: 'Air & Noise Pollution', icon: Wind, color: 'text-sky-400', bg: 'bg-sky-500/20', desc: 'Loud noise, industrial pollution' },
  { name: 'Encroachment & Illegal Dumping', icon: Map, color: 'text-rose-400', bg: 'bg-rose-500/20', desc: 'Illegal structures on public land' },
  { name: 'Stray Animals', icon: PawPrint, color: 'text-amber-400', bg: 'bg-amber-500/20', desc: 'Aggressive dogs, cattle on roads' },
  { name: 'Public Parks & Facilities', icon: TreePine, color: 'text-green-400', bg: 'bg-green-500/20', desc: 'Damaged parks, broken benches' },
  { name: 'Government Service Complaints', icon: Building2, color: 'text-purple-400', bg: 'bg-purple-500/20', desc: 'Delays in certificates, official apathy' },
  { name: 'Other Civic Issues', icon: HelpCircle, color: 'text-gray-400', bg: 'bg-gray-500/20', desc: 'Any other problems not listed here' },
];

export default function Dashboard() {
  const { t } = useTranslation();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    fetch('/api/profile')
      .then(res => {
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          return res.json();
        }
      })
      .then(data => {
        if (data?.success && data.profile) {
          setUserName(data.profile.name);
        }
      })
      .catch(e => console.error("Profile fetch error:", e));
  }, []);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      alert(t('dashboard.searchError', 'Please enter a civic problem to search.'));
      return;
    }
    router.push(`/report?category=Custom&problem=${encodeURIComponent(searchQuery)}`);
  };

  const handleCategoryClick = (categoryName: string) => {
    router.push(`/report?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0a192f] to-slate-900 text-white font-sans flex flex-col">
      <Header showSearch showLocation />

      <main className="flex-grow max-w-7xl mx-auto p-4 md:p-8 space-y-10 w-full relative z-10">
        
        {/* Welcome & Quick Search */}
        <section className="flex flex-col md:flex-row gap-8 items-center justify-between glass-panel p-8 bg-[#0f172a]/60 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl">
          <div className="flex-1 space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              {t('dashboard.greeting', 'Welcome back')}{userName ? `, ${userName}` : ''}
            </h1>
            <p className="text-gray-400 text-lg">
              {t('dashboard.subtitle', 'Report civic issues, discover the right government department, and follow your complaint journey in one place.')}
            </p>
            <div className="relative mt-4 max-w-xl">
              <input 
                id="search-input"
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder={t('dashboard.searchPlaceholder', 'Search services, portals, or civic problems...')} 
                className="w-full pl-5 pr-14 py-4 rounded-xl bg-white/5 border border-white/20 focus:outline-none focus:border-blue-400 text-white placeholder-gray-500 transition-all shadow-inner"
              />
              <button 
                onClick={handleSearch} 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition shadow-lg"
              >
                <Search size={20} />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
            <Link href="/report" className="flex flex-col items-center justify-center gap-2 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-blue-400/50 transition group">
              <div className="p-3 bg-blue-500/20 rounded-full text-blue-400 group-hover:scale-110 transition-transform"><MapPin size={24}/></div>
              <span className="text-sm font-semibold">{t('dashboard.reportAction', 'Report Problem')}</span>
            </Link>
            <Link href="/portals" className="flex flex-col items-center justify-center gap-2 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-teal-400/50 transition group">
              <div className="p-3 bg-teal-500/20 rounded-full text-teal-400 group-hover:scale-110 transition-transform"><Building size={24}/></div>
              <span className="text-sm font-semibold">{t('dashboard.portalsAction', 'Find Portals')}</span>
            </Link>
            <Link href="/tracking" className="flex flex-col items-center justify-center gap-2 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-purple-400/50 transition group">
              <div className="p-3 bg-purple-500/20 rounded-full text-purple-400 group-hover:scale-110 transition-transform"><FileText size={24}/></div>
              <span className="text-sm font-semibold">{t('dashboard.trackAction', 'Track Complaint')}</span>
            </Link>
            <button onClick={() => document.querySelector('.ai-chat-btn')?.dispatchEvent(new MouseEvent('click'))} className="flex flex-col items-center justify-center gap-2 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-orange-400/50 transition group">
              <div className="p-3 bg-orange-500/20 rounded-full text-orange-400 group-hover:scale-110 transition-transform"><HelpCircle size={24}/></div>
              <span className="text-sm font-semibold">{t('dashboard.askAiAction', 'Ask CIVIC AI')}</span>
            </button>
          </div>
        </section>

        {/* Problem Categories */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white tracking-tight">{t('dashboard.selectIssue', 'Select a Civic Issue')}</h3>
            <span className="text-sm text-gray-400 hidden sm:inline-block">{t('dashboard.selectIssueDesc', 'Click any category to begin your report')}</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <button 
                  key={idx} 
                  onClick={() => handleCategoryClick(cat.name)}
                  className="bg-white/5 backdrop-blur-sm p-5 rounded-2xl border border-white/10 flex items-start gap-4 hover:bg-white/10 hover:border-white/20 transition-all hover:-translate-y-1 text-left group"
                >
                  <div className={`p-3 rounded-xl ${cat.bg} ${cat.color} group-hover:scale-110 transition-transform shrink-0 shadow-inner`}>
                    <Icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm mb-1">{t(`categories.${cat.name}`, cat.name)}</h4>
                    <p className="text-xs text-gray-400 line-clamp-2">{t(`categories.${cat.name}_desc`, cat.desc)}</p>
                  </div>
                </button>
              )
            })}
          </div>
        </section>

        {/* Civic Issues Overview & Analytics */}
        <section className="pt-8 border-t border-white/10 mt-8">
          <div className="mb-6 text-center sm:text-left">
            <h3 className="text-2xl font-bold text-white tracking-tight">{t('dashboard.overview', 'Civic Issues Overview')}</h3>
            <p className="text-gray-400">{t('dashboard.overviewDesc', 'Live platform statistics across India')}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="glass-panel p-6 rounded-2xl border border-white/10 bg-[#0f172a]/40 text-center">
              <p className="text-4xl font-extrabold text-blue-400 mb-2">1,402</p>
              <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Total Recorded</p>
            </div>
            <div className="glass-panel p-6 rounded-2xl border border-white/10 bg-[#0f172a]/40 text-center">
              <p className="text-4xl font-extrabold text-yellow-400 mb-2">48</p>
              <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Awaiting Submission</p>
            </div>
            <div className="glass-panel p-6 rounded-2xl border border-white/10 bg-[#0f172a]/40 text-center">
              <p className="text-4xl font-extrabold text-teal-400 mb-2">856</p>
              <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Officially Submitted</p>
            </div>
            <div className="glass-panel p-6 rounded-2xl border border-white/10 bg-[#0f172a]/40 text-center">
              <p className="text-4xl font-extrabold text-purple-400 mb-2">29</p>
              <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">States & UTs Active</p>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/10 bg-white/5">
            <h4 className="text-lg font-bold text-white mb-4">Category Distribution</h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">Roads & Potholes</span>
                  <span className="text-white font-bold">35%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">Water Supply</span>
                  <span className="text-white font-bold">28%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '28%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">Garbage & Waste</span>
                  <span className="text-white font-bold">20%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">Streetlights & Power</span>
                  <span className="text-white font-bold">17%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '17%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
