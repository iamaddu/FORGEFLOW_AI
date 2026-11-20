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
  BookOpen
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
    <div className="min-h-screen bg-[#4E3C80] text-[#1E1736] flex flex-col justify-between relative overflow-hidden select-none">
      {/* Background soft lavender & peach glowing orbs */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#FAD5C8]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-[#F9C349]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Navbar */}
      <header className="px-6 py-5 flex items-center justify-between border-b border-white/10 relative z-10 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#FAD5C8] to-[#F9C349] flex items-center justify-center shadow-lg text-[#1E1736] font-heading font-black text-2xl tracking-tighter">
            <span>F</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-black text-xl text-white">ForgeFlow</span>
              <span className="text-[#FAD5C8] font-heading font-black text-xl">AI</span>
            </div>
            <span className="text-[10px] uppercase tracking-wider text-[#D4C8EE] font-medium block -mt-1">
              MSME Smart Procurement & Costing
            </span>
          </div>
        </div>

        <button
          onClick={() => setIsStoryModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#FAD5C8] text-[#1E1736] text-xs font-heading font-bold shadow-md hover:bg-[#f6c6b6] transition-all"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>A Day with ForgeFlow</span>
        </button>
      </header>

      {/* Center Content */}
      <main className="max-w-6xl mx-auto px-6 py-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 flex-1">
        {/* Left Column: Hero & Product Identity */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAD5C8]/20 border border-[#FAD5C8]/40 text-[#FAD5C8] text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#F9C349]" />
            <span>Built for Indian MSME Fabricators & Machining Units</span>
          </div>

          <h1 className="font-heading font-black text-4xl sm:text-6xl text-white leading-tight">
            Buy Smarter. <br />
            Quote Better. <br />
            <span className="text-[#FAD5C8]">Grow Profitably.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#E8E2F6] max-w-xl leading-relaxed">
            Eliminate hidden freight surprises, calculate production costs accurately with deterministic formulas, and send margin-aware quotations in minutes.
          </p>

          {/* Storyboard Callout Card */}
          <div
            onClick={() => setIsStoryModalOpen(true)}
            className="p-4 rounded-2xl bg-[#392A62] border-2 border-[#5D4996] hover:border-[#FAD5C8] transition-all cursor-pointer flex items-center justify-between text-white group shadow-xl"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FAD5C8] text-[#1E1736] flex items-center justify-center font-black text-2xl shrink-0 shadow-md">
                👨🏽‍🏭
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#FAD5C8] tracking-wider block">
                  Interactive Story
                </span>
                <h4 className="font-heading font-bold text-sm text-white group-hover:text-[#FAD5C8] transition-colors">
                  How Ravi saves 8% on steel & stops profit leaks
                </h4>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-[#FAD5C8] group-hover:translate-x-1 transition-transform" />
          </div>

          <div className="flex items-center gap-2 text-xs text-[#D4C8EE]">
            <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
            <span>Ready-to-use sample dataset with MS steel sheets & CNC components</span>
          </div>
        </div>

        {/* Right Column: Clean White Card Login matching the image style */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-cardDeep border-4 border-slate-100 relative text-[#1E1736]">
            <div className="mb-6">
              <span className="text-[10px] uppercase font-bold text-[#4E3C80] tracking-wider block mb-1">
                MSME Workspace Login
              </span>
              <h2 className="font-heading font-black text-2xl text-[#1E1736]">
                Welcome to ForgeFlow
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Enter your workshop details or select a persona to explore.
              </p>
            </div>

            {/* Quick Persona Selector */}
            <div className="mb-5 p-1 bg-[#F3F0FA] rounded-2xl border border-[#D2C6EA] flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={() => handleQuickPersona('owner')}
                className={`flex-1 py-2 px-2 rounded-xl text-center font-bold transition-all ${
                  role === 'owner' ? 'bg-[#4E3C80] text-white shadow-md' : 'text-slate-600 hover:text-black'
                }`}
              >
                Ravi (Owner)
              </button>
              <button
                type="button"
                onClick={() => handleQuickPersona('procurement')}
                className={`flex-1 py-2 px-2 rounded-xl text-center font-bold transition-all ${
                  role === 'procurement' ? 'bg-[#4E3C80] text-white shadow-md' : 'text-slate-600 hover:text-black'
                }`}
              >
                Procurement
              </button>
              <button
                type="button"
                onClick={() => handleQuickPersona('costing')}
                className={`flex-1 py-2 px-2 rounded-xl text-center font-bold transition-all ${
                  role === 'costing' ? 'bg-[#4E3C80] text-white shadow-md' : 'text-slate-600 hover:text-black'
                }`}
              >
                Costing Eng.
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
                  className="w-full bg-[#F3F0FA] border border-[#D2C6EA] rounded-xl px-3.5 py-2.5 text-sm text-[#1E1736] focus:outline-none focus:border-[#4E3C80] font-medium"
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
                    className="w-full bg-[#F3F0FA] border border-[#D2C6EA] rounded-xl px-3.5 py-2.5 text-sm text-[#1E1736] focus:outline-none focus:border-[#4E3C80] font-medium"
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-[#4E3C80] hover:bg-[#3B2C63] text-white font-heading font-black text-sm transition-all shadow-glowPurple flex items-center justify-center gap-2"
              >
                <span>Enter Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-5 pt-4 border-t border-slate-200 text-center">
              <button
                type="button"
                onClick={() => handleQuickPersona('owner')}
                className="w-full py-2.5 px-4 rounded-xl bg-[#FAD5C8] hover:bg-[#f6c6b6] text-[#1E1736] text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <span>Instant Sign In as Ravi (Factory Owner)</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 border-t border-white/10 text-center text-xs text-[#D4C8EE] relative z-10 flex flex-col sm:flex-row items-center justify-between max-w-6xl mx-auto w-full">
        <span>© 2026 ForgeFlow AI • Helping Indian Fabrication MSMEs Grow Profitably</span>
        <div className="flex items-center gap-4 mt-2 sm:mt-0 text-white/80">
          <span>Landed Cost Engine</span>
          <span>•</span>
          <span>Deterministic Costing</span>
          <span>•</span>
          <span>GST Document Intelligence</span>
        </div>
      </footer>
    </div>
  );
};
