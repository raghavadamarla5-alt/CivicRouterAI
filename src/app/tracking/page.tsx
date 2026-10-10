"use client";

import Link from 'next/link';
import { Search, History, Clock, CheckCircle2, XCircle, ChevronRight, MessageSquareWarning, ArrowRight, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

type Complaint = {
  id: string;
  problem: string;
  location: string;
  authority: string;
  status: string;
  date: string;
  raw?: any;
};

import Header from '@/components/Header';

export default function TrackingDashboard() {
  const { t } = useTranslation();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);

  useEffect(() => {
    async function fetchComplaints() {
      try {
        const res = await fetch('/api/complaints');
        const ct = res.headers.get("content-type");
        if (!ct || !ct.includes("application/json")) throw new Error("Invalid format");
        const data = await res.json();
        if (data.success) {
          setComplaints(data.complaints);
        }
      } catch (e) {
        console.error("Failed to fetch", e);
      } finally {
        setLoading(false);
      }
    }
    fetchComplaints();
  }, []);

  const getStatusIcon = (status: string) => {
    if (status === 'Resolved') return CheckCircle2;
    if (status === 'Rejected') return XCircle;
    return Clock;
  };

  const getStatusColor = (status: string) => {
    if (status === 'Resolved') return { color: 'text-teal-400', bg: 'bg-teal-500/20', border: 'border-teal-500/30' };
    if (status === 'Rejected') return { color: 'text-red-400', bg: 'bg-red-500/20', border: 'border-red-500/30' };
    return { color: 'text-blue-400', bg: 'bg-blue-500/20', border: 'border-blue-500/30' };
  };

  const filteredComplaints = complaints.filter(c => {
    const matchesSearch = c.id.toLowerCase().includes(searchQuery.toLowerCase()) || c.problem.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All Statuses' || c.status === statusFilter || (statusFilter === 'In Progress' && c.status !== 'Resolved' && c.status !== 'Rejected');
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0a192f] to-slate-900 text-white font-sans flex flex-col">
      <Header title={t('tracking.title', 'My Complaints')} backLink="/dashboard" />

      <main className="flex-grow max-w-5xl mx-auto p-4 md:p-8 space-y-6 w-full relative z-10">
        
        {/* Search & Filter */}
        <div className="glass-panel p-4 rounded-2xl border border-white/10 bg-[#0f172a]/60 backdrop-blur-xl shadow-lg flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 w-full relative">
            <input 
              type="text" 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={t('tracking.searchPlaceholder', 'Search by Complaint ID or Problem...')} 
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:border-blue-400 text-white placeholder-gray-500 transition"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
          <select 
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="w-full md:w-auto p-3 bg-[#1e293b] border border-white/20 rounded-xl focus:outline-none focus:border-blue-400 text-white appearance-none cursor-pointer"
          >
            <option>All Statuses</option>
            <option>In Progress</option>
            <option>Resolved</option>
            <option>Rejected</option>
          </select>
        </div>

        {/* Complaints List */}
        <div className="space-y-4">
          {loading ? (
            <div className="p-12 text-center text-gray-400 animate-pulse font-bold bg-white/5 rounded-2xl border border-white/10">
              {t('tracking.loading', 'Loading your tracking history...')}
            </div>
          ) : filteredComplaints.length === 0 ? (
            <div className="p-12 text-center bg-white/5 rounded-2xl border border-white/10 shadow-lg">
              <History size={48} className="mx-auto mb-4 text-gray-500 opacity-50" />
              <p className="font-bold text-lg text-white">{t('tracking.noComplaints', 'No complaints found.')}</p>
              <p className="text-sm text-gray-400 mt-2">{t('tracking.noComplaintsDesc', 'Try adjusting your filters or go back to the dashboard to report a problem.')}</p>
            </div>
          ) : (
            filteredComplaints.map((complaint) => {
              const StatusIcon = getStatusIcon(complaint.status);
              const { color: statusColor, bg: bgColor, border } = getStatusColor(complaint.status);
              const isSelected = selectedComplaint?.id === complaint.id;
              
              return (
                <div key={complaint.id} className={`bg-[#0f172a]/60 backdrop-blur-md rounded-2xl shadow-lg border ${isSelected ? 'border-blue-500/50' : 'border-white/10'} overflow-hidden transition-all hover:border-white/30`}>
                  <div className="p-5 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center cursor-pointer" onClick={() => setSelectedComplaint(isSelected ? null : complaint)}>
                    
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-bold bg-blue-600 text-white px-2.5 py-1 rounded-md shadow-sm">
                          {complaint.id}
                        </span>
                        <span className="text-xs text-gray-400 font-medium">{complaint.date}</span>
                      </div>
                      <h3 className="font-bold text-lg text-white">{complaint.problem}</h3>
                      <p className="text-sm text-gray-400">{complaint.location}</p>
                      <p className="text-xs font-bold text-blue-400 mt-1 uppercase tracking-wider">{complaint.authority}</p>
                    </div>
                    
                    <div className="flex flex-col items-end gap-3 w-full md:w-auto">
                      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold ${bgColor} ${statusColor} border ${border}`}>
                        <StatusIcon size={16} />
                        {complaint.status}
                      </div>
                      <button className="flex items-center gap-1 text-sm font-bold text-blue-400 hover:text-blue-300 transition w-full md:w-auto justify-end">
                        {isSelected ? 'Hide Details' : 'View Details'} <ChevronRight size={16} className={`transform transition-transform ${isSelected ? 'rotate-90' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Expanded Timeline View */}
                  {isSelected && (
                    <div className="border-t border-white/10 bg-black/20 p-5 md:p-8">
                      <h4 className="font-bold text-white mb-6">Complaint Status Timeline</h4>
                      
                      <div className="relative">
                        {/* Vertical line connecting timeline dots */}
                        <div className="absolute left-3.5 top-2 bottom-2 w-0.5 bg-gray-700"></div>
                        
                        <div className="space-y-6">
                          <div className="relative flex items-start gap-4">
                            <div className="z-10 bg-teal-500 p-1 rounded-full text-white shadow-[0_0_10px_rgba(20,184,166,0.6)]"><CheckCircle2 size={16}/></div>
                            <div>
                              <p className="font-bold text-white text-sm">Complaint Created in CIVIC</p>
                              <p className="text-xs text-gray-400">Date: {complaint.date}</p>
                            </div>
                          </div>

                          <div className="relative flex items-start gap-4">
                            <div className="z-10 bg-teal-500 p-1 rounded-full text-white shadow-[0_0_10px_rgba(20,184,166,0.6)]"><CheckCircle2 size={16}/></div>
                            <div>
                              <p className="font-bold text-white text-sm">Prepared for Official Submission</p>
                              <p className="text-xs text-gray-400">AI analysis complete.</p>
                            </div>
                          </div>
                          
                          {complaint.status === "Submitted to Civic AI" || complaint.status === "In Progress" ? (
                             <div className="relative flex items-start gap-4 opacity-100">
                               <div className="z-10 bg-blue-500 p-1 rounded-full text-white shadow-[0_0_10px_rgba(59,130,246,0.6)] animate-pulse"><Clock size={16}/></div>
                               <div>
                                 <p className="font-bold text-blue-400 text-sm">Official Submission Pending</p>
                                 <p className="text-xs text-gray-400 mb-2">You must submit this complaint to the official portal to proceed.</p>
                                 <button onClick={() => window.open('https://pgportal.gov.in/', '_blank')} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition">
                                    Open Official Portal <ExternalLink size={12}/>
                                 </button>
                               </div>
                             </div>
                          ) : (
                            <div className="relative flex items-start gap-4 opacity-50">
                               <div className="z-10 bg-gray-700 p-1 rounded-full text-gray-400"><Clock size={16}/></div>
                               <div>
                                 <p className="font-bold text-gray-400 text-sm">Officially Submitted</p>
                                 <p className="text-xs text-gray-500">Awaiting official acknowledgment.</p>
                               </div>
                             </div>
                          )}

                           <div className="relative flex items-start gap-4 opacity-50">
                             <div className="z-10 bg-gray-700 p-1 rounded-full text-gray-400"><Clock size={16}/></div>
                             <div>
                               <p className="font-bold text-gray-400 text-sm">Department Processing</p>
                               <p className="text-xs text-gray-500">Status not available — check the official portal.</p>
                             </div>
                           </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* AI Escalation Assistant for Rejected Complaints */}
                  {complaint.status === "Rejected" && (
                    <div className="bg-red-500/10 border-t border-red-500/20 p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                      <div className="flex gap-3">
                        <MessageSquareWarning className="text-red-400 shrink-0 mt-0.5" size={20} />
                        <div>
                          <p className="text-sm font-bold text-red-400">AI Escalation Assistant</p>
                          <p className="text-xs text-red-300/70 mt-1">This complaint was rejected due to "Insufficient Evidence". You can appeal or re-submit with better photos.</p>
                        </div>
                      </div>
                      <button className="whitespace-nowrap px-4 py-2 bg-red-600/20 text-red-400 border border-red-500/30 font-bold text-sm rounded-lg hover:bg-red-600 hover:text-white transition">
                        View Appeal Options
                      </button>
                    </div>
                  )}

                </div>
              )
            })
          )}
        </div>
      </main>
    </div>
  );
}
