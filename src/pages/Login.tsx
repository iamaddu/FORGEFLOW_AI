import React, { useState } from 'react';
import {
  ArrowRight,
  ShoppingCart,
  Package,
  Lock,
  BookOpen,
  Check,
  User,
  Zap,
} from 'lucide-react';
import { useApp, UserRole } from '../context/AppContext';

export const Login: React.FC = () => {
  const { login, setIsStoryModalOpen } = useApp();
  const [selectedRole, setSelectedRole] = useState<UserRole>('buyer');
  const [fullName, setFullName] = useState('Dhanush S.');
  const [email, setEmail] = useState('dhanush@forgeflow.in');
  const [password, setPassword] = useState('pass1234');

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    if (role === 'buyer') {
      setFullName('Dhanush S.');
      setEmail('dhanush@forgeflow.in');
    } else {
      setFullName('Apex Steel & Tubes');
      setEmail('sales@apexsteel.co.in');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, selectedRole, fullName);
  };

  const handleDemoAccess = () => {
    if (selectedRole === 'buyer') {
      login('ravi@ravifabrication.in', 'buyer', 'Ravi Sharma');
    } else {
      login('sales@apexsteel.co.in', 'seller', 'Apex Steel & Tubes');
    }
  };

  const buyerFeatures = [
    { text: 'Compare supplier quotes & true landed costs' },
    { text: 'Calculate actual production costs & profit margins' },
    { text: 'Generate professional, margin-aware quotations' },
  ];

  const sellerFeatures = [
    { text: 'List raw materials with real-time stock & pricing' },
    { text: 'Respond to buyer RFQs instantly with landed preview' },
    { text: 'Track orders, dispatches & fulfillment delivery' },
  ];

  const features = selectedRole === 'buyer' ? buyerFeatures : sellerFeatures;

  return (
    <div className="min-h-screen bg-[#0E1424] text-[#F3F5F7] flex flex-col relative overflow-hidden select-none">
      {/* Subtle modern factory photography backdrop */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15 pointer-events-none mix-blend-luminosity"
        style={{ backgroundImage: "url('/modern-factory.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0E1424] via-[#0E1424]/85 to-[#0E1424]/95 pointer-events-none" />

      {/* Ambient gradient glows using PPT Royal Purple & Teal */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#523D8A]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#16B8A5]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="px-6 py-5 flex items-center justify-between border-b border-[#1E2840] relative z-10 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F5A636] to-[#E59524] flex items-center justify-center shadow-lg text-[#101B2B] font-heading font-black text-2xl">
            F
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-black text-xl text-white tracking-tight">ForgeFlow</span>
              <span className="text-[#16B8A5] font-heading font-black text-xl">AI</span>
            </div>
            <span className="text-[10px] uppercase tracking-wider text-[#F8C8BE] font-bold block -mt-1">
              MSME Smart Procurement & Costing
            </span>
          </div>
        </div>

        <button
          onClick={() => setIsStoryModalOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#523D8A]/30 hover:bg-[#523D8A]/50 border border-[#523D8A]/60 text-[#F8C8BE] text-xs font-heading font-bold transition-all shadow-sm"
        >
          <BookOpen className="w-3.5 h-3.5 text-[#F5A636]" />
          <span>A Day with ForgeFlow</span>
        </button>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-6 py-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10 flex-1">
        {/* Left: Headline & Feature Highlights */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 bg-[#523D8A]/40 border border-[#523D8A]/60 text-[#F8C8BE] px-3.5 py-1.5 rounded-full text-xs font-heading font-black tracking-wider uppercase shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#F5A636] animate-pulse" />
            {selectedRole === 'buyer' ? 'For Manufacturers & MSMEs' : 'For Suppliers & Metal Traders'}
          </div>

          <h1 className="font-heading font-black text-4xl sm:text-5xl text-white leading-tight">
            {selectedRole === 'buyer' ? (
              <>
                Every purchase <br />
                should protect <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A636] via-[#16B8A5] to-[#45DFCE]">
                  profit.
                </span>
              </>
            ) : (
              <>
                Win more RFQs. <br />
                Deliver with <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#16B8A5] to-[#45DFCE]">
                  confidence.
                </span>
              </>
            )}
          </h1>

          <div className="space-y-3 max-w-md">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-[#131C30]/85 backdrop-blur-md border border-[#202E4C] text-slate-200 px-4 py-3 rounded-2xl flex items-center gap-3 shadow-sm"
              >
                <div className="w-6 h-6 rounded-full bg-[#16B8A5]/20 text-[#16B8A5] border border-[#16B8A5]/30 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="font-medium text-xs sm:text-sm text-slate-200">{f.text}</span>
              </div>
            ))}
          </div>

          {/* High-res Industrial Manufacturing Visual Card */}
          <div className="relative rounded-2xl overflow-hidden h-36 max-w-md border border-[#202E4C] shadow-xl">
            <img
              src="/industrial-hero.jpg"
              alt="Industrial Manufacturing"
              className="w-full h-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0E1424] via-[#0E1424]/75 to-transparent flex items-center px-6">
              <div>
                <p className="font-heading font-black text-white text-sm">
                  {selectedRole === 'buyer' ? (fullName || "Fabrication Unit") : (fullName || "Metal Supplier")}
                </p>
                <p className="text-slate-400 text-xs mt-0.5">
                  {selectedRole === 'buyer' ? "MIDC Industrial Area • Sheet Metal & Heavy Fabrication" : "Certified Raw Material Supplier • 97% On-time Rate"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Modern Dark Glass Card Login */}
        <div className="lg:col-span-6">
          <div className="bg-[#131C30]/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-[#223354] text-[#F3F5F7]">
            {/* Role Toggle Selector */}
            <div className="mb-6">
              <p className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">
                Select Workspace Mode
              </p>
              <div className="grid grid-cols-2 gap-3">
                {/* Buyer Button */}
                <button
                  type="button"
                  onClick={() => handleRoleSelect('buyer')}
                  className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden ${
                    selectedRole === 'buyer'
                      ? 'border-[#523D8A] bg-[#523D8A]/25 text-white shadow-lg shadow-[#523D8A]/20'
                      : 'border-[#1E2840] bg-[#0E1424] text-slate-400 hover:border-slate-500 hover:text-slate-200'
                  }`}
                >
                  <ShoppingCart
                    className={`w-5 h-5 mb-2 ${selectedRole === 'buyer' ? 'text-[#F5A636]' : 'text-slate-500'}`}
                  />
                  <div className="font-heading font-black text-sm">I'm a Buyer</div>
                  <div className="text-[11px] mt-1 text-slate-400 leading-tight">
                    Cost orders &amp; compare quotes
                  </div>
                </button>

                {/* Seller Button */}
                <button
                  type="button"
                  onClick={() => handleRoleSelect('seller')}
                  className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden ${
                    selectedRole === 'seller'
                      ? 'border-[#16B8A5] bg-[#16B8A5]/20 text-white shadow-lg shadow-[#16B8A5]/20'
                      : 'border-[#1E2840] bg-[#0E1424] text-slate-400 hover:border-slate-500 hover:text-slate-200'
                  }`}
                >
                  <Package
                    className={`w-5 h-5 mb-2 ${selectedRole === 'seller' ? 'text-[#16B8A5]' : 'text-slate-500'}`}
                  />
                  <div className="font-heading font-black text-sm">I'm a Supplier</div>
                  <div className="text-[11px] mt-1 text-slate-400 leading-tight">
                    List stock &amp; respond to RFQs
                  </div>
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Your Full Name / Business Owner
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    placeholder="e.g. Dhanush S."
                    className="w-full bg-[#0E1424] border border-[#223354] rounded-xl pl-9 pr-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#16B8A5] focus:ring-1 focus:ring-[#16B8A5] font-medium"
                  />
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Work Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="e.g. dhanush@forgeflow.in"
                  className="w-full bg-[#0E1424] border border-[#223354] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#16B8A5] focus:ring-1 focus:ring-[#16B8A5] font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-[#0E1424] border border-[#223354] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#16B8A5] focus:ring-1 focus:ring-[#16B8A5] font-medium"
                  />
                  <Lock className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-[#16B8A5] to-[#0E9786] hover:from-[#139E8E] hover:to-[#0C8575] text-[#0B1320] font-heading font-black text-sm transition-all shadow-lg shadow-[#16B8A5]/25 flex items-center justify-center gap-2"
              >
                <span>Enter Workspace as {fullName || 'User'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick pre-configured demo access */}
            <div className="mt-5 pt-4 border-t border-[#1E2840]">
              <button
                type="button"
                onClick={handleDemoAccess}
                className="w-full py-2.5 px-4 rounded-xl bg-[#523D8A]/20 hover:bg-[#523D8A]/35 text-[#F8C8BE] text-xs font-heading font-black flex items-center justify-center gap-2 transition-all border border-[#523D8A]/50 shadow-sm"
              >
                <Zap className="w-3.5 h-3.5 text-[#F5A636]" />
                {selectedRole === 'buyer'
                  ? 'Sample Persona: Load Ravi (Pune MIDC Fabricator)'
                  : 'Sample Persona: Load Apex Steel (Supplier)'}
              </button>
              <p className="text-center text-[10px] text-slate-500 mt-2 font-medium">
                Type any name above or click demo to instantly evaluate.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 border-t border-[#1E2840] text-center text-xs text-slate-500 relative z-10 flex flex-col sm:flex-row items-center justify-between max-w-6xl mx-auto w-full">
        <span>© 2026 ForgeFlow AI • Protecting MSME Manufacturing Margins</span>
        <div className="flex items-center gap-3 mt-2 sm:mt-0 font-medium text-slate-400">
          <span>Landed Cost Engine</span>
          <span>•</span>
          <span>Deterministic Costing</span>
          <span>•</span>
          <span>Invoice Intelligence</span>
        </div>
      </footer>
    </div>
  );
};
