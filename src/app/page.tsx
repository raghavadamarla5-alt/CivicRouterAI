import Link from 'next/link';
import { MapPin, Megaphone, Globe, ShieldAlert, Activity, Users, Building } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col text-white font-sans bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0a192f] to-slate-900">
      <header className="w-full p-4 md:p-6 glass sticky top-0 z-50 border-b border-white/10 backdrop-blur-xl bg-[#0a192f]/40">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.6)]">
              <Activity size={28} className="text-white" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-teal-300 to-cyan-300">
                CIVIC
              </h1>
              <span className="text-[10px] md:text-xs text-teal-200 tracking-wider font-medium uppercase opacity-80 -mt-1">AI Platform</span>
            </div>
          </div>
          <nav className="flex items-center gap-3 md:gap-6">
            <Link href="/portals" className="hidden md:flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
              <Building size={16} />
              <span>Explore Portals</span>
            </Link>
            <Link href="/login" className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all font-medium border border-white/20 shadow-lg backdrop-blur-md">
              Sign In
            </Link>
            <Link href="/login?signup=true" className="hidden sm:block px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all font-bold shadow-[0_0_15px_rgba(37,99,235,0.4)]">
              Create Account
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
        {/* Animated Background Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-teal-500/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>

        <div className="glass-panel p-8 md:p-16 max-w-5xl space-y-8 relative z-10 border border-white/10 bg-[#0f172a]/60 shadow-2xl backdrop-blur-2xl rounded-3xl">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-teal-500/10 border border-teal-400/30 text-teal-300 text-sm font-semibold mb-4 shadow-inner">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
            Now fully operational across All Indian States
          </div>
          
          <div className="space-y-4">
            <h2 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 leading-tight tracking-tight">
              Your Voice. Your City.
              <br/> <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">Your CIVIC.</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto font-medium">
              Report civic issues, discover the right government department, and follow your complaint journey in one place. Powered by intelligent routing.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center p-6 bg-white/5 rounded-2xl border border-white/10 transform transition hover:-translate-y-2 hover:bg-white/10 hover:border-blue-400/50 group">
              <div className="p-4 bg-blue-500/20 rounded-full mb-4 group-hover:scale-110 transition-transform">
                <MapPin className="text-blue-400" size={32}/> 
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Pinpoint Location</h3>
              <p className="text-gray-400 text-sm">Tell us your location anywhere in India to find local authorities.</p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-white/5 rounded-2xl border border-white/10 transform transition hover:-translate-y-2 hover:bg-white/10 hover:border-teal-400/50 group">
              <div className="p-4 bg-teal-500/20 rounded-full mb-4 group-hover:scale-110 transition-transform">
                <Megaphone className="text-teal-400" size={32}/> 
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Report in Any Language</h3>
              <p className="text-gray-400 text-sm">Describe your problem naturally. Our AI handles translation and routing.</p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-white/5 rounded-2xl border border-white/10 transform transition hover:-translate-y-2 hover:bg-white/10 hover:border-blue-400/50 group">
              <div className="p-4 bg-blue-500/20 rounded-full mb-4 group-hover:scale-110 transition-transform">
                <ShieldAlert className="text-blue-400" size={32}/> 
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Official Escalation</h3>
              <p className="text-gray-400 text-sm">We find the exact government grievance portal for your specific issue.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-6 pt-10">
            <Link href="/dashboard" className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white text-lg font-bold rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2">
              <Users size={20} /> Get Started Now
            </Link>
            <Link href="/tracking" className="px-8 py-4 glass text-white text-lg font-bold rounded-xl hover:bg-white/10 transition-all border border-white/20 flex items-center justify-center gap-2">
              Track My Complaint
            </Link>
          </div>
        </div>
      </main>

      <footer className="w-full p-8 glass text-center text-gray-400 text-sm z-10 border-t border-white/10 bg-[#0a192f]/80">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} CIVIC - India's Smart Civic AI Platform.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition">Terms of Service</Link>
            <Link href="/admin" className="hover:text-white transition">Admin Dashboard</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
