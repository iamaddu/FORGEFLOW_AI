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
import { Interactive3DMetalPart } from '../components/Interactive3DMetalPart';
import { Card3D } from '../components/Card3D';

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
    <div className="min-h-screen text-white flex flex-col justify-between relative overflow-hidden select-none">
      {/* Classy Glassy Manufacturing Background Image */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none scale-105"
        style={{
          backgroundImage: "url('./glassy-factory-bg.jpg')",
          filter: 'brightness(0.7) contrast(1.15)',
        }}
      />

      {/* Royal Purple PPT Glassmorphism Gradient Overlay */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-[#452F7D]/92 via-[#523D8A]/88 to-[#351F5E]/94 backdrop-blur-[6px] pointer-events-none" />

      {/* PPT Ambient Radial Glows */}
      <div className="fixed top-[-80px] right-[-80px] w-96 h-96 rounded-full bg-[#F5A636]/15 blur-3xl pointer-events-none z-0" />
      <div className="fixed bottom-[-100px] left-[-60px] w-80 h-80 rounded-full bg-[#F8C8BE]/15 blur-3xl pointer-events-none z-0" />

      {/* Header */}
      <header className="px-6 py-5 flex items-center justify-between border-b border-white/15 relative z-10 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#F5A636] flex items-center justify-center shadow-md text-[#1E1638] font-heading font-black text-2xl tracking-tighter">
            F
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

      {/* Main */}
      <main className="max-w-6xl mx-auto px-6 py-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10 flex-1">
        {/* Left: Headline & Feature Highlights matching Slide 1 */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-block bg-[#F8C8BE] text-[#1E1638] px-5 py-1.5 rounded-2xl text-xs font-heading font-black tracking-wider uppercase shadow-sm">
            {selectedRole === 'buyer' ? 'THE IMPACT' : 'SUPPLIER NETWORK'}
          </div>

          <h1 className="font-heading font-black text-4xl sm:text-6xl text-white leading-tight">
            {selectedRole === 'buyer' ? (
              <>
                Every purchase <br />
                should protect <br />
                <span className="text-[#F5A636]">
                  profit.
                </span>
              </>
            ) : (
              <>
                Win more RFQs. <br />
                Deliver with <br />
                <span className="text-[#F5A636]">
                  confidence.
                </span>
              </>
            )}
          </h1>

          {/* Three White Rounded Pills from Slide 1 */}
          <div className="space-y-3 pt-2 max-w-md">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-white text-[#1E1638] px-4 py-3 rounded-2xl flex items-center gap-3 shadow-md"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="font-heading font-bold text-sm text-[#1E1638]">{f.text}</span>
              </div>
            ))}
          </div>

          {/* Interactive 3D Metal Fabrication Model */}
          <div className="relative rounded-3xl overflow-hidden h-44 max-w-md bg-white/10 backdrop-blur-md border-2 border-white/30 shadow-2xl">
            <Interactive3DMetalPart height={176} showTelemetry={true} />
          </div>
        </div>

        {/* Right: Crisp White 3D Elevated Login Card matching PPT */}
        <div className="lg:col-span-6">
          <Card3D className="bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.25)] border-4 border-white/80 text-[#1E1638]">
            {/* Role Toggle Selector */}
            <div className="mb-6">
              <span className="text-[10px] uppercase font-bold text-[#523D8A] tracking-wider block mb-2">
                SELECT WORKSPACE MODE
              </span>
              <div className="grid grid-cols-2 gap-3">
                {/* Buyer Button */}
                <button
                  type="button"
                  onClick={() => handleRoleSelect('buyer')}
                  className={`p-4 rounded-2xl border-2 text-left transition-all ${
                    selectedRole === 'buyer'
                      ? 'border-[#523D8A] bg-[#523D8A] text-white shadow-md'
                      : 'border-slate-200 bg-[#F3F0FA] text-slate-700 hover:border-slate-400'
                  }`}
                >
                  <ShoppingCart
                    className={`w-5 h-5 mb-2 ${selectedRole === 'buyer' ? 'text-[#F5A636]' : 'text-[#523D8A]'}`}
                  />
                  <div className="font-heading font-black text-sm">I'm a Buyer</div>
                  <div className={`text-[11px] mt-1 leading-tight ${selectedRole === 'buyer' ? 'text-[#F8C8BE]' : 'text-slate-500'}`}>
                    Cost orders &amp; compare quotes
                  </div>
                </button>

                {/* Seller Button */}
                <button
                  type="button"
                  onClick={() => handleRoleSelect('seller')}
                  className={`p-4 rounded-2xl border-2 text-left transition-all ${
                    selectedRole === 'seller'
                      ? 'border-[#523D8A] bg-[#523D8A] text-white shadow-md'
                      : 'border-slate-200 bg-[#F3F0FA] text-slate-700 hover:border-slate-400'
                  }`}
                >
                  <Package
                    className={`w-5 h-5 mb-2 ${selectedRole === 'seller' ? 'text-[#F5A636]' : 'text-[#523D8A]'}`}
                  />
                  <div className="font-heading font-black text-sm">I'm a Supplier</div>
                  <div className={`text-[11px] mt-1 leading-tight ${selectedRole === 'seller' ? 'text-[#F8C8BE]' : 'text-slate-500'}`}>
                    List stock &amp; respond to RFQs
                  </div>
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Full Name / Business Owner
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    placeholder="e.g. Dhanush S."
                    className="w-full bg-[#F3F0FA] border border-[#D2C6EA] rounded-xl pl-9 pr-3.5 py-2.5 text-sm text-[#1E1638] focus:outline-none focus:border-[#523D8A] font-medium"
                  />
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Work Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="e.g. dhanush@forgeflow.in"
                  className="w-full bg-[#F3F0FA] border border-[#D2C6EA] rounded-xl px-3.5 py-2.5 text-sm text-[#1E1638] focus:outline-none focus:border-[#523D8A] font-medium"
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
                    className="w-full bg-[#F3F0FA] border border-[#D2C6EA] rounded-xl px-3.5 py-2.5 text-sm text-[#1E1638] focus:outline-none focus:border-[#523D8A] font-medium"
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3.5 rounded-2xl bg-[#523D8A] hover:bg-[#3E2C6B] text-white font-heading font-black text-sm transition-all shadow-[0_5px_0_#2b1a52,0_10px_20px_rgba(82,61,138,0.35)] active:translate-y-1 active:shadow-[0_1px_0_#2b1a52] flex items-center justify-center gap-2"
              >
                <span>Enter Workspace as {fullName || 'User'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick demo access (Peach Pill from Slide 1) */}
            <div className="mt-5 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={handleDemoAccess}
                className="w-full py-2.5 px-4 rounded-xl bg-[#F8C8BE] hover:bg-[#f3b5a8] text-[#1E1638] text-xs font-heading font-black flex items-center justify-center gap-2 transition-all shadow-[0_3px_0_#e59c90] active:translate-y-0.5 active:shadow-none"
              >
                <Zap className="w-3.5 h-3.5 text-[#523D8A]" />
                {selectedRole === 'buyer'
                  ? 'Sample Persona: Load Ravi (Pune MIDC Fabricator)'
                  : 'Sample Persona: Load Apex Steel (Supplier)'}
              </button>
              <p className="text-center text-[10px] text-slate-400 mt-2 font-medium">
                Type any name above or click demo to instantly evaluate.
              </p>
            </div>
          </Card3D>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 border-t border-white/15 text-center text-xs text-white/80 relative z-10 flex flex-col sm:flex-row items-center justify-between max-w-6xl mx-auto w-full">
        <span>© 2026 ForgeFlow AI • Protecting MSME Manufacturing Margins</span>
        <div className="flex items-center gap-3 mt-2 sm:mt-0 font-medium">
          <span>Landed Cost Comparison</span>
          <span>•</span>
          <span>Deterministic Costing</span>
          <span>•</span>
          <span>Invoice Intelligence</span>
        </div>
      </footer>
    </div>
  );
};
