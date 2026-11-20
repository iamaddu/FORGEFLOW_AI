import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  Building2,
  RotateCcw,
  ShieldCheck,
  Cpu,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Globe,
  Sliders,
  DollarSign
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Settings: React.FC = () => {
  const { user, setUser, resetToSampleData, showToast, setIsJudgeTourOpen } = useApp();

  const [companyName, setCompanyName] = useState(user.companyName);
  const [userName, setUserName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [gstin, setGstin] = useState(user.gstin);
  const [defaultTaxRate, setDefaultTaxRate] = useState('18');
  const [defaultMargin, setDefaultMargin] = useState('24');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      ...user,
      companyName,
      name: userName,
      email,
      gstin
    });
    showToast('Company settings & plant configurations saved successfully!');
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="font-heading font-bold text-2xl text-white">Settings & Plant Configuration</h1>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#16B8A5]/20 text-[#16B8A5] border border-[#16B8A5]/30 uppercase">
            Workspace Admin
          </span>
        </div>
        <p className="text-xs text-slate-300 mt-1">
          Manage factory identity, legal GSTIN registration, standard costing margins, and demo session state.
        </p>
      </div>

      {/* MSME Profile Form */}
      <div className="bg-[#101B2B] border border-[#1C2E46] rounded-2xl p-6 shadow-card space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-[#1C2E46]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#16B8A5]/15 text-[#16B8A5]">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base text-white">
                Factory Legal Identity & GST Profile
              </h3>
              <p className="text-xs text-slate-400">
                Printed on customer quotations and used for GSTR-2B input tax credit checks.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Company / Entity Name</label>
              <input
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full bg-[#132032] border border-[#1C2E46] rounded-xl px-3.5 py-2.5 text-white font-medium focus:outline-none focus:border-[#16B8A5]"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">GSTIN Number</label>
              <input
                type="text"
                required
                value={gstin}
                onChange={(e) => setGstin(e.target.value)}
                className="w-full bg-[#132032] border border-[#1C2E46] rounded-xl px-3.5 py-2.5 text-white font-mono focus:outline-none focus:border-[#16B8A5]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Plant Head / Manager Name</label>
              <input
                type="text"
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full bg-[#132032] border border-[#1C2E46] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#16B8A5]"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Official Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#132032] border border-[#1C2E46] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#16B8A5]"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#16B8A5] hover:bg-[#13A291] text-[#0A111D] font-bold shadow-glow"
            >
              Save Profile Changes
            </button>
          </div>
        </form>
      </div>

      {/* Demo Session & Sample Data Reset */}
      <div className="bg-[#101B2B] border border-[#1C2E46] rounded-2xl p-6 shadow-card space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-[#1C2E46]">
          <div className="p-2 rounded-xl bg-[#E5A84B]/20 text-[#E5A84B]">
            <RotateCcw className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-base text-white">
              Hackathon Demo Data Management
            </h3>
            <p className="text-xs text-slate-400">
              Restore the initial pristine dataset of steel quotations, CNC costing orders, and GST invoices.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
          <div>
            <h5 className="font-semibold text-xs text-white">Reset Local Storage Dataset</h5>
            <p className="text-[11px] text-slate-400 max-w-md mt-0.5">
              Useful if you have added test records or deleted sample quotations and wish to restart the judge evaluation sequence.
            </p>
          </div>

          <button
            onClick={resetToSampleData}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#132032] hover:bg-rose-500/20 border border-[#1C2E46] hover:border-rose-500/50 text-slate-200 hover:text-rose-300 text-xs font-semibold transition-all shrink-0"
          >
            <RotateCcw className="w-4 h-4 text-[#E5A84B]" />
            <span>Reset Demo Data</span>
          </button>
        </div>

        <div className="pt-3 border-t border-[#1C2E46]/60 flex items-center justify-between text-xs text-slate-400">
          <span>Need a refresher on the 9-step hackathon pitch?</span>
          <button
            onClick={() => setIsJudgeTourOpen(true)}
            className="text-[#16B8A5] hover:underline font-semibold"
          >
            Open Guided Demo Walkthrough →
          </button>
        </div>
      </div>

      {/* Technical Architecture & Build Spec */}
      <div className="bg-[#101B2B] border border-[#1C2E46] rounded-2xl p-6 shadow-card space-y-3">
        <div className="flex items-center gap-2 text-white font-heading font-semibold text-sm">
          <Cpu className="w-4 h-4 text-[#16B8A5]" />
          <span>System Architecture & Tech Stack</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-300 pt-2">
          <div className="p-3 rounded-xl bg-[#0A111D] border border-[#1C2E46]">
            <span className="text-[10px] text-slate-400 block">Frontend</span>
            <span className="font-semibold text-white">React 18 + TypeScript</span>
          </div>
          <div className="p-3 rounded-xl bg-[#0A111D] border border-[#1C2E46]">
            <span className="text-[10px] text-slate-400 block">Styling Engine</span>
            <span className="font-semibold text-white">Tailwind CSS (B2B SaaS Theme)</span>
          </div>
          <div className="p-3 rounded-xl bg-[#0A111D] border border-[#1C2E46]">
            <span className="text-[10px] text-slate-400 block">Data Visuals</span>
            <span className="font-semibold text-white">Recharts Responsive</span>
          </div>
          <div className="p-3 rounded-xl bg-[#0A111D] border border-[#1C2E46]">
            <span className="text-[10px] text-slate-400 block">Persistence</span>
            <span className="font-semibold text-white">Browser LocalStorage</span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-[#0A111D] border border-[#1C2E46] text-xs text-slate-400 flex items-center justify-between">
          <span>Target Deployment: Vercel / Netlify (Production Ready)</span>
          <span className="text-emerald-400 font-mono">No API Keys Exposed in Client</span>
        </div>
      </div>
    </div>
  );
};
