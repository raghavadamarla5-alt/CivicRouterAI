"use client";

import { useState } from 'react';
import { Search, Building, ExternalLink, Globe, MapPin, ShieldCheck, FileWarning, RotateCcw } from 'lucide-react';
import Header from '@/components/Header';
import { allPortals, STATES_AND_UTS } from '@/lib/portalsRegistry';
import { useTranslation } from 'react-i18next';

export default function GovernmentPortals() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedDept, setSelectedDept] = useState('All');

  const levels = ["All", "Central Government", "State Government", "Union Territory", "District Administration", "Municipal Corporation", "Municipality", "Gram Panchayat", "Other"];
  const departments = ["All", "Railways", "Roads and Public Works", "Water Supply", "Sanitation and Waste", "Electricity", "Transport", "Public Grievances", "Police and Public Safety", "Revenue and Land Records", "Health", "Education", "Other"];

  const filteredPortals = allPortals.filter(portal => {
    const matchesSearch = portal.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          portal.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          portal.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          portal.jurisdiction.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          portal.categories.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Jurisdiction logic: If user selects a specific state, show portals in that state PLUS "All India" portals (which apply everywhere).
    const matchesState = selectedState === 'All' || portal.state === selectedState || portal.state === 'All India';
    const matchesLevel = selectedLevel === 'All' || portal.level === selectedLevel;
    const matchesDept = selectedDept === 'All' || portal.department === selectedDept || portal.categories.includes(selectedDept);
    
    return matchesSearch && matchesState && matchesLevel && matchesDept;
  });

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedState('All');
    setSelectedLevel('All');
    setSelectedDept('All');
  };

  // Coverage statistics logic
  const totalPortals = allPortals.length;
  const centralCount = allPortals.filter(p => p.level === "Central Government").length;
  const stateUtCount = allPortals.filter(p => p.level === "State Government" || p.level === "Union Territory").length;
  const localCount = allPortals.filter(p => p.level === "Municipal Corporation").length;
  const verifiedCount = allPortals.filter(p => p.verified).length;

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0a192f] to-slate-900 text-white font-sans flex flex-col">
      <Header title="CIVIC" backLink="/dashboard" />

      <main className="flex-grow max-w-7xl mx-auto p-4 md:p-8 space-y-8 w-full relative z-10">
        
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-3xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-400">
            {t('portals.title', 'Government Portal Directory')}
          </h1>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            {t('portals.desc', 'Discover verified official grievance and service portals across Central, State, and Local authorities.')}
          </p>
        </div>

        {/* Coverage Statistics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
          <div className="glass-panel p-4 rounded-xl border border-white/10 bg-[#0f172a]/40 text-center">
            <p className="text-2xl font-extrabold text-white mb-1">{totalPortals}</p>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Total Records</p>
          </div>
          <div className="glass-panel p-4 rounded-xl border border-white/10 bg-[#0f172a]/40 text-center">
            <p className="text-2xl font-extrabold text-blue-400 mb-1">{centralCount}</p>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Central Portals</p>
          </div>
          <div className="glass-panel p-4 rounded-xl border border-white/10 bg-[#0f172a]/40 text-center">
            <p className="text-2xl font-extrabold text-teal-400 mb-1">{stateUtCount}</p>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">State / UT Portals</p>
          </div>
          <div className="glass-panel p-4 rounded-xl border border-white/10 bg-[#0f172a]/40 text-center">
            <p className="text-2xl font-extrabold text-purple-400 mb-1">{localCount}</p>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Local Bodies</p>
          </div>
          <div className="glass-panel p-4 rounded-xl border border-white/10 bg-[#0f172a]/40 text-center">
            <p className="text-2xl font-extrabold text-emerald-400 mb-1">{verifiedCount}</p>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Verified Links</p>
          </div>
        </div>

        {/* Filters */}
        <div className="glass-panel p-4 md:p-6 bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 rounded-2xl flex flex-col gap-4">
          <div className="flex flex-col lg:flex-row gap-4 w-full">
            <div className="flex-1 relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search portals by name, department, or service..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:border-teal-400 text-white placeholder-gray-500 transition-all"
              />
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <select 
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full pl-9 pr-4 py-3 bg-[#1e293b] border border-white/20 rounded-xl text-sm focus:outline-none focus:border-teal-400 text-white appearance-none cursor-pointer"
              >
                <option value="All">All States & UTs (Jurisdiction)</option>
                {STATES_AND_UTS.map(state => <option key={state} value={state}>{state}</option>)}
              </select>
            </div>
            <div className="relative flex-1">
              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <select 
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full pl-9 pr-4 py-3 bg-[#1e293b] border border-white/20 rounded-xl text-sm focus:outline-none focus:border-teal-400 text-white appearance-none cursor-pointer"
              >
                {levels.map(level => <option key={level} value={level}>{level}</option>)}
              </select>
            </div>
            <div className="relative flex-1">
              <select 
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="w-full px-4 py-3 bg-[#1e293b] border border-white/20 rounded-xl text-sm focus:outline-none focus:border-teal-400 text-white appearance-none cursor-pointer"
              >
                {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
              </select>
            </div>
            {(searchQuery || selectedState !== 'All' || selectedLevel !== 'All' || selectedDept !== 'All') && (
              <button 
                onClick={resetFilters}
                className="p-3 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-xl border border-red-500/30 transition-all flex items-center justify-center flex-none"
                title="Reset Filters"
              >
                <RotateCcw size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Search Results Summary */}
        <div className="text-sm text-gray-400 font-medium">
          Showing {filteredPortals.length} {filteredPortals.length === 1 ? 'result' : 'results'}
          {selectedState !== 'All' && ` for ${selectedState}`}
          {selectedLevel !== 'All' && ` in ${selectedLevel}`}
        </div>

        {/* Portal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPortals.length === 0 ? (
            <div className="col-span-full py-16 text-center text-gray-400 bg-white/5 border border-white/10 rounded-2xl shadow-lg backdrop-blur-sm">
              <FileWarning size={48} className="mx-auto mb-4 opacity-50 text-orange-400" />
              <p className="text-xl font-bold text-white mb-2">No verified portals found</p>
              <p className="max-w-md mx-auto text-sm text-gray-400">
                Active filters: State ({selectedState}), Level ({selectedLevel}).<br/>
                We are constantly expanding our directory. If you believe a portal is missing, please try adjusting your search terms or resetting filters.
              </p>
              <button onClick={resetFilters} className="mt-6 px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition border border-white/20">
                Reset All Filters
              </button>
            </div>
          ) : (
            filteredPortals.map(portal => (
              <div key={portal.id} className="bg-[#0f172a]/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:bg-white/10 hover:border-white/20 transition-all shadow-xl group">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 bg-teal-500/10 text-teal-300 rounded border border-teal-500/20">
                      {portal.level}
                    </span>
                    <span className="text-[11px] font-medium text-gray-400 flex items-center gap-1 bg-black/30 px-2 py-1 rounded">
                      <MapPin size={10} className="text-blue-400"/> {portal.state}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-1 leading-tight group-hover:text-blue-300 transition-colors">{portal.name}</h3>
                  <p className="text-xs text-blue-400 mb-3 font-semibold">{portal.department}</p>
                  <p className="text-sm text-gray-400 mb-5 leading-relaxed">{portal.desc}</p>
                  
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-1.5">
                      {portal.categories.map((cat, i) => (
                        <span key={i} className="text-[10px] font-medium px-2 py-1 bg-white/5 text-gray-300 rounded border border-white/10">
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-3 mt-auto">
                  {portal.verified && (
                    <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold px-2">
                      <ShieldCheck size={14} /> Verified Official Website
                    </div>
                  )}
                  <button 
                    onClick={() => {
                      if (portal.url.startsWith('http')) {
                        window.open(portal.url, '_blank', 'noopener,noreferrer');
                      } else {
                        alert("Invalid or missing official URL.");
                      }
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all font-bold shadow-lg group-hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                  >
                    Open Portal <ExternalLink size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </main>
    </div>
  );
}
