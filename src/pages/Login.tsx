import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Cpu,
  BarChart3,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Login: React.FC = () => {
  const { login, setIsJudgeTourOpen } = useApp();
  const [email, setEmail] = useState('dhanush@apexforge.in');
  const [password, setPassword] = useState('demo1234');
  const [role, setRole] = useState<'owner' | 'procurement' | 'costing'>('owner');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
  };

  const handleQuickDemo = (demoRole: 'owner' | 'procurement' | 'costing') => {
    setRole(demoRole);
    if (demoRole === 'owner') {
      setEmail('dhanush@apexforge.in');
    } else if (demoRole === 'procurement') {
      setEmail('procurement@apexforge.in');
    } else {
      setEmail('costing@apexforge.in');
    }
    login(demoRole === 'owner' ? 'dhanush@apexforge.in' : `${demoRole}@apexforge.in`);
  };

  return (
    <div className="min-h-screen bg-[#0A111D] flex flex-col justify-between text-slate-100 relative overflow-hidden">
      {/* Background radial glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#16B8A5]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#E5A84B]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Navbar */}
      <header className="px-6 py-5 flex items-center justify-between border-b border-[#1C2E46]/60 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#16B8A5] to-[#14c7b2] flex items-center justify-center shadow-glow text-[#0B131F] font-black text-2xl tracking-tighter">
            <span>F</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-bold text-xl text-white">ForgeFlow</span>
              <span className="text-[#16B8A5] font-heading font-bold text-xl">AI</span>
            </div>
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium block -mt-1">
              MSME Smart Procurement & Costing
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 hidden sm:inline">Built for Indian MSME Manufacturers</span>
          <button
            onClick={() => {
              login();
              setTimeout(() => setIsJudgeTourOpen(true), 300);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#E5A84B]/15 border border-[#E5A84B]/40 text-[#E5A84B] text-xs font-semibold hover:bg-[#E5A84B]/25 transition-all shadow-glowAmber"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Judge 1-Click Access</span>
          </button>
        </div>
      </header>

      {/* Center Content */}
      <main className="max-w-6xl mx-auto px-6 py-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 flex-1">
        {/* Left column: Value Proposition & Product Identity */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#16B8A5]/10 border border-[#16B8A5]/30 text-[#16B8A5] text-xs font-semibold">
            <Cpu className="w-3.5 h-3.5 animate-pulse" />
            <span>Problem Statement 4.1 Solution • Production Demo</span>
          </div>

          <h1 className="font-heading font-bold text-4xl sm:text-5xl text-white leading-tight">
            Buy Smarter. <br />
            Quote Better. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#16B8A5] to-[#E5A84B]">
              Grow Profitably.
            </span>
          </h1>

          <p className="text-base text-slate-300 max-w-xl leading-relaxed">
            The intelligent procurement, deterministic order costing, and quotation platform tailored for Indian manufacturing MSMEs, fabrication shops, and machining units.
          </p>

          {/* 3 Core Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-[#132032] border border-[#1C2E46] flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[#16B8A5]/15 text-[#16B8A5] shrink-0">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">True Landed Cost Engine</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Exposes hidden freight charges & GST credits so you never overpay for steel.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#132032] border border-[#1C2E46] flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[#E5A84B]/15 text-[#E5A84B] shrink-0">
                <BarChart3 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Deterministic Costing</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Accurate material, labour, electricity, and overheads calculation with dynamic margin sliders.
                </p>
              </div>
            </div>
          </div>

          {/* Verification Badge */}
          <div className="flex items-center gap-2 text-xs text-slate-400 pt-2">
            <CheckCircle2 className="w-4 h-4 text-[#16B8A5]" />
            <span>Full persistent demo dataset included • Zero setup required</span>
          </div>
        </div>

        {/* Right column: Login / Instant Demo Entry Card */}
        <div className="lg:col-span-5">
          <div className="bg-[#101B2B] border border-[#1C2E46] rounded-2xl p-6 sm:p-8 shadow-card relative">
            <div className="mb-6">
              <h2 className="font-heading font-bold text-xl text-white">Welcome to ForgeFlow AI</h2>
              <p className="text-xs text-slate-400 mt-1">
                Sign in to your manufacturing workspace or choose a demo persona below.
              </p>
            </div>

            {/* Quick Demo Persona Switcher */}
            <div className="mb-6 p-1 bg-[#0A111D] rounded-xl border border-[#1C2E46] flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={() => handleQuickDemo('owner')}
                className={`flex-1 py-1.5 px-2 rounded-lg text-center font-medium transition-all ${
                  role === 'owner' ? 'bg-[#16B8A5] text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                Factory Head
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('procurement')}
                className={`flex-1 py-1.5 px-2 rounded-lg text-center font-medium transition-all ${
                  role === 'procurement' ? 'bg-[#16B8A5] text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                Procurement
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('costing')}
                className={`flex-1 py-1.5 px-2 rounded-lg text-center font-medium transition-all ${
                  role === 'costing' ? 'bg-[#16B8A5] text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                Costing Eng.
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Business Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="name@company.com"
                  className="w-full bg-[#132032] border border-[#1C2E46] rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-[#16B8A5] transition-all"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-medium text-slate-300">Password</label>
                  <span className="text-[11px] text-[#16B8A5] cursor-pointer hover:underline">
                    Demo Mode Active
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full bg-[#132032] border border-[#1C2E46] rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-[#16B8A5] transition-all"
                  />
                  <Lock className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#16B8A5] hover:bg-[#13A291] text-[#0A111D] font-heading font-bold text-sm transition-all shadow-glow flex items-center justify-center gap-2"
              >
                <span>Enter Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Judge 1-click bypass button */}
            <div className="mt-5 pt-5 border-t border-[#1C2E46] text-center">
              <button
                type="button"
                onClick={() => {
                  login('judge.evaluator@hackathon.org');
                  setTimeout(() => setIsJudgeTourOpen(true), 400);
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#16B8A5]/20 to-[#E5A84B]/20 hover:from-[#16B8A5]/30 hover:to-[#E5A84B]/30 border border-[#16B8A5]/40 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-glow"
              >
                <Sparkles className="w-4 h-4 text-[#E5A84B]" />
                <span>Judge Quick Entry & Guided Tour</span>
              </button>
              <p className="text-[11px] text-slate-400 mt-2">
                Pre-populated with MSME steel quotations, CNC costing, & GST invoices.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 border-t border-[#1C2E46]/60 text-center text-xs text-slate-400 relative z-10 flex flex-col sm:flex-row items-center justify-between max-w-6xl mx-auto w-full">
        <span>© 2026 ForgeFlow AI. Built for Indian Manufacturing MSMEs.</span>
        <div className="flex items-center gap-4 mt-2 sm:mt-0">
          <span>Deterministic Cost Engine</span>
          <span>•</span>
          <span>GSTIN & E-Way Bill Extraction</span>
          <span>•</span>
          <span>True Landed Cost</span>
        </div>
      </footer>
    </div>
  );
};
