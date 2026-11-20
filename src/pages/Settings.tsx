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
  DollarSign,
  BookOpen
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Settings: React.FC = () => {
  const { user, setUser, resetToSampleData, showToast, setIsStoryModalOpen } = useApp();

  const [companyName, setCompanyName] = useState(user.companyName);
  const [userName, setUserName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [gstin, setGstin] = useState(user.gstin);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      ...user,
      companyName,
      name: userName,
      email,
      gstin
    });
    showToast('Workshop settings & plant configurations saved successfully!');
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="font-heading font-black text-3xl text-white">Workshop Settings</h1>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FAD5C8] text-[#1E1736]">
            Plant Configuration
          </span>
        </div>
        <p className="text-xs text-[#E8E2F6] mt-1">
          Manage factory identity, legal GSTIN registration, standard costing margins, and demo session state.
        </p>
      </div>

      {/* Workshop Profile Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border-2 border-slate-100 space-y-5 text-[#1E1736]">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#E8E2F6] text-[#4E3C80]">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-black text-base text-slate-900">
                Fabrication Unit Legal Identity & GST Profile
              </h3>
              <p className="text-xs text-slate-500">
                Printed on customer quotations and used for GSTR-2B input tax credit checks.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Company / Entity Name</label>
              <input
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full bg-[#F3F0FA] border border-[#D2C6EA] rounded-xl px-3.5 py-2.5 text-[#1E1736] font-medium focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">GSTIN Number</label>
              <input
                type="text"
                required
                value={gstin}
                onChange={(e) => setGstin(e.target.value)}
                className="w-full bg-[#F3F0FA] border border-[#D2C6EA] rounded-xl px-3.5 py-2.5 text-[#1E1736] font-mono focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Plant Head / Manager Name</label>
              <input
                type="text"
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full bg-[#F3F0FA] border border-[#D2C6EA] rounded-xl px-3.5 py-2.5 text-[#1E1736] font-medium focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Official Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#F3F0FA] border border-[#D2C6EA] rounded-xl px-3.5 py-2.5 text-[#1E1736] font-medium focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-[#4E3C80] hover:bg-[#3B2C63] text-white font-heading font-black text-xs transition-all shadow-md"
            >
              Save Profile Changes
            </button>
          </div>
        </form>
      </div>

      {/* Story & Reset Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border-2 border-slate-100 space-y-4 text-[#1E1736]">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="p-2.5 rounded-2xl bg-[#FEF3D6] text-amber-900">
            <RotateCcw className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading font-black text-base text-slate-900">
              Demo Data & Illustrative Journey
            </h3>
            <p className="text-xs text-slate-500">
              Explore Ravi's storyboard or restore the original factory dataset.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
          <div>
            <h5 className="font-bold text-xs text-slate-900">Reset Local Storage Dataset</h5>
            <p className="text-xs text-slate-500 max-w-md mt-0.5">
              Reset mock suppliers, quotations, and costing orders to initial factory defaults.
            </p>
          </div>

          <button
            onClick={resetToSampleData}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#F3F0FA] hover:bg-rose-50 border border-[#D2C6EA] hover:border-rose-300 text-slate-700 hover:text-rose-700 text-xs font-bold transition-all shrink-0"
          >
            <RotateCcw className="w-4 h-4 text-amber-600" />
            <span>Reset Factory Data</span>
          </button>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 font-medium">
          <span>Curious how ForgeFlow works in practice?</span>
          <button
            onClick={() => setIsStoryModalOpen(true)}
            className="text-[#4E3C80] hover:underline font-bold flex items-center gap-1"
          >
            <BookOpen className="w-4 h-4" />
            <span>Open "A Day with ForgeFlow" Story →</span>
          </button>
        </div>
      </div>
    </div>
  );
};
