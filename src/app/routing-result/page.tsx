"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Bot, MapPin, Building2, ExternalLink, FileText, CheckCircle, Edit3 } from 'lucide-react';

import Header from '@/components/Header';
import { allPortals } from '@/lib/portalsRegistry';

export default function RoutingResult() {
  const router = useRouter();
  const [analysis, setAnalysis] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editableText, setEditableText] = useState("");
  const [recommendedPortal, setRecommendedPortal] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem('routingResult');
    if (data) {
      const parsed = JSON.parse(data);
      setAnalysis(parsed);
      // Support both old and new schema fields
      setEditableText(parsed.formalComplaint || parsed.suggestedComplaintText || "");

      // Portal Discovery Logic
      let matchedPortal = null;
      const category = parsed.category?.toLowerCase() || "";
      const state = parsed.location?.state || "";
      
      // 1. Check for specific categories (e.g. Railway)
      if (category.includes('railway')) {
        matchedPortal = allPortals.find(p => p.id === 'CG-2'); // RailMadad
      } 
      // 2. Check for State-specific match
      else if (state) {
        // Try to find a highly specific local/state match first
        const statePortals = allPortals.filter(p => p.state === state || p.jurisdiction.includes(state));
        
        if (statePortals.length > 0) {
          // Find by category match within state
          matchedPortal = statePortals.find(p => p.categories.some(c => c.toLowerCase().includes(category))) || statePortals[0];
        }
      }

      // 3. Fallback to Central/Default
      if (!matchedPortal) {
        matchedPortal = allPortals.find(p => p.id === 'CG-1'); // CPGRAMS
      }

      setRecommendedPortal(matchedPortal);
    }
  }, []);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/complaints/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          complaintData: {
            ...analysis,
            finalComplaintText: editableText
          } 
        })
      });
      const ct = res.headers.get("content-type");
      if (!ct || !ct.includes("application/json")) throw new Error("Invalid format");
      const data = await res.json();
      if (data.success) {
        alert(`Complaint submitted successfully! Your tracking ID is ${data.complaint.id}`);
        router.push('/tracking');
      } else {
        alert(data.error || "Submission failed");
      }
    } catch (e) {
      alert("Submission failed to connect.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!analysis) return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0a192f] to-slate-900 flex items-center justify-center text-white">
      <div className="p-12 text-center text-gray-400 animate-pulse font-bold bg-white/5 rounded-2xl border border-white/10">Loading AI Result...</div>
    </div>
  );

  const problemText = analysis.problemSummary || analysis.identifiedProblem || "Uncategorized Problem";
  const authorityText = analysis.recommendedAuthority || analysis.responsibleAuthority || "Local Municipal Authority";
  const locationText = analysis.location ? `${analysis.location.town}, ${analysis.location.district}, ${analysis.location.state}` : "Unknown Location";

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0a192f] to-slate-900 text-white font-sans flex flex-col">
      <Header title="AI Civic Assistant" backLink="/dashboard" />

      <main className="flex-grow max-w-4xl mx-auto p-4 md:p-8 space-y-6 w-full relative z-10">
        
        {/* AI Identified Problem */}
        <div className="bg-[#0f172a]/60 backdrop-blur-md rounded-2xl shadow-xl border border-white/10 overflow-hidden animate-in slide-in-from-bottom-4">
          <div className="bg-blue-600/30 text-blue-300 p-4 font-bold flex items-center gap-2 border-b border-blue-500/30">
            <CheckCircle size={20} className="text-blue-400" />
            <span>Problem Identified: {problemText}</span>
          </div>
          
          <div className="p-6 space-y-4">
            <div className="flex gap-3 text-gray-300">
              <MapPin className="shrink-0 text-teal-400 mt-0.5" size={20} />
              <div>
                <p className="font-semibold text-white">Verified Location</p>
                <p className="text-sm">{locationText}</p>
              </div>
            </div>

            <div className="flex gap-3 text-gray-300">
              <Building2 className="shrink-0 text-blue-400 mt-0.5" size={20} />
              <div>
                <p className="font-semibold text-white">Responsible Authority</p>
                <p className="text-sm font-bold text-blue-400">{authorityText}</p>
                <p className="text-xs text-gray-500 mt-1">Based on your location and jurisdiction rules.</p>
              </div>
            </div>
            
            <div className="pt-6 border-t border-white/10 mt-2">
              <p className="font-semibold text-white mb-3">Official Portal Action Required:</p>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white/5 p-4 rounded-xl border border-white/10 gap-4">
                <div>
                  <span className="text-sm font-bold text-white block mb-1">
                    {recommendedPortal ? recommendedPortal.name : "CPGRAMS (Central Grievance)"}
                  </span>
                  <span className="text-xs text-gray-400 block max-w-sm">
                    {recommendedPortal ? recommendedPortal.desc : "The primary central grievance portal."}
                  </span>
                </div>
                <button 
                  onClick={() => {
                    let url = recommendedPortal?.url || "https://pgportal.gov.in/";
                    window.open(url, '_blank', 'noopener,noreferrer');
                  }}
                  className="flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg shadow-lg transition-all text-sm font-bold w-full sm:w-auto justify-center whitespace-nowrap"
                >
                  Open Official Portal <ExternalLink size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* AI Suggested Complaint */}
        <div className="bg-[#0f172a]/60 backdrop-blur-md rounded-2xl shadow-xl border border-white/10 overflow-hidden animate-in slide-in-from-bottom-8 delay-150">
          <div className="bg-black/40 text-white p-4 font-bold flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-2">
              <FileText size={20} className="text-teal-400" />
              <span>Formal Complaint Draft</span>
            </div>
            {!isEditing && (
              <button onClick={() => setIsEditing(true)} className="flex items-center gap-1 text-sm bg-white/10 px-3 py-1.5 rounded-lg hover:bg-white/20 transition">
                <Edit3 size={14} /> Edit
              </button>
            )}
          </div>
          <div className="p-6 space-y-4">
            {isEditing ? (
              <textarea 
                value={editableText}
                onChange={e => setEditableText(e.target.value)}
                className="w-full h-48 bg-white/5 p-4 rounded-xl border border-white/20 focus:outline-none focus:border-teal-400 text-sm font-serif text-white placeholder-gray-500 transition-all custom-scrollbar shadow-inner"
              />
            ) : (
              <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-sm font-serif text-gray-200 whitespace-pre-wrap shadow-inner max-h-96 overflow-y-auto custom-scrollbar">
                {editableText}
              </div>
            )}

            {isEditing ? (
              <div className="flex justify-end pt-2">
                <button 
                  onClick={() => setIsEditing(false)} 
                  className="px-6 py-2.5 bg-teal-500 hover:bg-teal-400 text-white font-bold rounded-lg shadow-[0_0_15px_rgba(20,184,166,0.4)] transition-all"
                >
                  Save Draft
                </button>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(editableText);
                    alert("Copied to clipboard!");
                  }}
                  className="flex-1 py-3 bg-white/10 text-white border border-white/20 font-bold rounded-xl hover:bg-white/20 transition-all shadow-sm flex items-center justify-center"
                >
                  Copy Message
                </button>
                <button 
                  onClick={() => setIsEditing(true)}
                  className="flex-1 py-3 bg-white/10 text-white border border-white/20 font-bold rounded-xl hover:bg-white/20 transition-all shadow-sm flex items-center justify-center"
                >
                  Edit Message
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="text-center pt-4">
          <p className="text-xs text-gray-400 mb-6 max-w-lg mx-auto">
            The AI acts as an assistant. You are in full control of the final message submitted to the government.
          </p>
          <button 
            onClick={handleSubmit} 
            disabled={submitting || isEditing}
            className="px-10 py-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(20,184,166,0.6)] hover:scale-105 transition-all w-full md:w-auto disabled:opacity-50 disabled:scale-100 disabled:shadow-none"
          >
            {submitting ? "Submitting securely..." : "Confirm & Submit Complaint"}
          </button>
        </div>

      </main>
    </div>
  );
}
