import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Cpu,
  BarChart3,
  CheckCircle2,
  Lock,
  BookOpen,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Login: React.FC = () => {
  const { login, setIsStoryModalOpen } = useApp();
  const [email, setEmail] = useState('ravi@ravifabrication.in');
  const [password, setPassword] = useState('ravi1234');
  const [role, setRole] = useState<'owner' | 'procurement' | 'costing'>('owner');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
  };

  const handleQuickPersona = (persona: 'owner' | 'procurement' | 'costing') => {
    setRole(persona);
    if (persona === 'owner') {
      setEmail('ravi@ravifabrication.in');
    } else if (persona === 'procurement') {
      setEmail('procurement@ravifabrication.in');
    } else {
      setEmail('costing@ravifabrication.in');
    }
    login(persona === 'owner' ? 'ravi@ravifabrication.in' : `${persona}@ravifabrication.in`);
  };

  return (
    <div className="min-h-screen bg-[#523D8A] text-[#1E1638] flex flex-col justify-between relative overflow-hidden select-none">
      {/* Top Navbar */}
      <header className="px-6 py-5 flex items-center justify-between border-b border-white/15 relative z-10 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#F5A636] flex items-center justify-center shadow-md text-[#1E1638] font-heading font-black text-2xl tracking-tighter">
            <span>F</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-black text-xl text-white">ForgeFlow</span>
              <span className="text-[#F8C8BE] font-heading font-black text-xl">AI</span>
            </div>
            <span className="text-[10px] uppercase tracking-wider text-[#F8C8BE] font-bold block -mt-1">
              MSME Smart Procurement & Costing
            </span>
          </div>
        </div>

        <button
          onClick={() => setIsStoryModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#F8C8BE] text-[#1E1638] text-xs font-heading font-black shadow-md hover:bg-[#f3b5a8] transition-all"
        >
          <BookOpen className="w-3.5 h-3.5 text-[#523D8A]" />
          <span>A Day with ForgeFlow</span>
        </button>
      </header>

      {/* Center Content: Matching Slide 1 & Slide 2 Aesthetic Exactly */}
      <main className="max-w-6xl mx-auto px-6 py-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 flex-1">
        {/* Left Column: Direct Slide 1 Layout */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-block bg-[#F8C8BE] text-[#1E1638] px-5 py-1.5 rounded-2xl text-xs font-heading font-black tracking-wider uppercase shadow-sm">
            THE IMPACT
          </div>

          <h1 className="font-heading font-black text-4xl sm:text-6xl text-white leading-tight">
            Every purchase should <br />
            protect profit
          </h1>

          {/* Three White Rounded Pills with Green Checkmark Circles from Slide 1 */}
          <div className="space-y-3 pt-2 max-w-md">
            <div className="bg-white text-[#1E1638] px-4 py-3 rounded-full flex items-center gap-3 shadow-md">
              <div className="w-7 h-7 rounded-full bg-[#10B981] text-white flex items-center justify-center font-bold text-sm shrink-0">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <span className="font-heading font-bold text-base text-[#1E1638]">
                Smarter purchasing
              </span>
            </div>

            <div className="bg-white text-[#1E1638] px-4 py-3 rounded-full flex items-center gap-3 shadow-md">
              <div className="w-7 h-7 rounded-full bg-[#10B981] text-white flex items-center justify-center font-bold text-sm shrink-0">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <span className="font-heading font-bold text-base text-[#1E1638]">
                More accurate quotations
              </span>
            </div>

            <div className="bg-white text-[#1E1638] px-4 py-3 rounded-full flex items-center gap-3 shadow-md">
              <div className="w-7 h-7 rounded-full bg-[#10B981] text-white flex items-center justify-center font-bold text-sm shrink-0">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <span className="font-heading font-bold text-base text-[#1E1638]">
                Better records
              </span>
            </div>
          </div>

          {/* Slide 1 Mango CTA Button */}
          <div className="pt-2">
            <button
              onClick={() => handleQuickPersona('owner')}
              className="px-8 py-4 rounded-2xl bg-[#F5A636] hover:bg-[#e59524] text-[#1E1638] font-heading font-black text-lg transition-all shadow-button flex items-center gap-3"
            >
              <span>Buy smarter. Build profit.</span>
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </button>
            <span className="text-xs text-white/70 italic mt-2 block">
              Intended outcomes, not guarantees.
            </span>
          </div>
        </div>

        {/* Right Column: Crisp Pure White Login Box */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-3xl p-8 shadow-cardLg border-4 border-white/60 relative text-[#1E1638]">
            <div className="mb-6">
              <span className="text-[10px] uppercase font-bold text-[#523D8A] tracking-wider block mb-1">
                Workshop Access
              </span>
              <h2 className="font-heading font-black text-2xl text-[#1E1736]">
                Welcome to ForgeFlow
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Select your role or enter credentials to open the factory dashboard.
              </p>
            </div>

            {/* Quick Persona Selector */}
            <div className="mb-5 p-1 bg-[#F3F0FA] rounded-2xl border border-[#D2C6EA] flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={() => handleQuickPersona('owner')}
                className={`flex-1 py-2 px-2 rounded-xl text-center font-black transition-all ${
                  role === 'owner' ? 'bg-[#523D8A] text-white shadow-md' : 'text-slate-600 hover:text-black'
                }`}
              >
                Ravi (Owner)
              </button>
              <button
                type="button"
                onClick={() => handleQuickPersona('procurement')}
                className={`flex-1 py-2 px-2 rounded-xl text-center font-black transition-all ${
                  role === 'procurement' ? 'bg-[#523D8A] text-white shadow-md' : 'text-slate-600 hover:text-black'
                }`}
              >
                Procurement
              </button>
              <button
                type="button"
                onClick={() => handleQuickPersona('costing')}
                className={`flex-1 py-2 px-2 rounded-xl text-center font-black transition-all ${
                  role === 'costing' ? 'bg-[#523D8A] text-white shadow-md' : 'text-slate-600 hover:text-black'
                }`}
              >
                Costing
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Workshop Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-[#F3F0FA] border border-[#D2C6EA] rounded-xl px-3.5 py-2.5 text-sm text-[#1E1736] focus:outline-none focus:border-[#523D8A] font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-[#F3F0FA] border border-[#D2C6EA] rounded-xl px-3.5 py-2.5 text-sm text-[#1E1736] focus:outline-none focus:border-[#523D8A] font-medium"
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-[#523D8A] hover:bg-[#3E2C6B] text-white font-heading font-black text-sm transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Enter Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-5 pt-4 border-t border-slate-100 text-center">
              <button
                type="button"
                onClick={() => handleQuickPersona('owner')}
                className="w-full py-2.5 px-4 rounded-xl bg-[#F8C8BE] hover:bg-[#f3b5a8] text-[#1E1736] text-xs font-heading font-black flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <span>Instant Login as Ravi (Plant Owner)</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 border-t border-white/15 text-center text-xs text-white/80 relative z-10 flex flex-col sm:flex-row items-center justify-between max-w-6xl mx-auto w-full">
        <span>© 2026 ForgeFlow AI • Protecting MSME Manufacturing Margins</span>
        <div className="flex items-center gap-4 mt-2 sm:mt-0 font-medium">
          <span>Landed Cost Comparison</span>
          <span>•</span>
          <span>Deterministic Costing</span>
          <span>•</span>
          <span>GST Intelligence</span>
        </div>
      </footer>
    </div>
  );
};
