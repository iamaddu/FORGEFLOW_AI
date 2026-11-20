import React, { useState } from 'react';
import {
  ArrowRight,
  ShoppingCart,
  Package,
  Lock,
  BookOpen,
  Check,
  TrendingUp,
  FileText,
  Zap,
  Star,
  Inbox,
  Truck,
} from 'lucide-react';
import { useApp, UserRole } from '../context/AppContext';

export const Login: React.FC = () => {
  const { login, setIsStoryModalOpen } = useApp();
  const [selectedRole, setSelectedRole] = useState<UserRole>('buyer');
  const [email, setEmail] = useState('ravi@ravifabrication.in');
  const [password, setPassword] = useState('ravi1234');

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setEmail(role === 'buyer' ? 'ravi@ravifabrication.in' : 'sales@apexsteel.co.in');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, selectedRole);
  };

  const handleDemoAccess = () => {
    login(selectedRole === 'buyer' ? 'ravi@ravifabrication.in' : 'sales@apexsteel.co.in', selectedRole);
  };

  const buyerFeatures = [
    { icon: ShoppingCart, text: 'Compare supplier quotes & landed costs' },
    { icon: TrendingUp, text: 'Calculate production costs & margins' },
    { icon: FileText, text: 'Generate professional quotations' },
  ];

  const sellerFeatures = [
    { icon: Package, text: 'List materials with price & stock' },
    { icon: Inbox, text: 'Respond to buyer RFQs instantly' },
    { icon: Truck, text: 'Track orders & delivery performance' },
  ];

  const features = selectedRole === 'buyer' ? buyerFeatures : sellerFeatures;

  return (
    <div className="min-h-screen bg-[#523D8A] text-white flex flex-col relative overflow-hidden select-none">

      {/* Background texture circles */}
      <div className="absolute top-[-80px] right-[-80px] w-96 h-96 rounded-full bg-white/5 pointer-events-none" />
      <div className="absolute bottom-[-100px] left-[-60px] w-80 h-80 rounded-full bg-white/5 pointer-events-none" />

      {/* Header */}
      <header className="px-6 py-5 flex items-center justify-between border-b border-white/15 relative z-10 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#F5A636] flex items-center justify-center shadow-md text-[#1E1638] font-heading font-black text-2xl">F</div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-black text-xl text-white">ForgeFlow</span>
              <span className="text-[#F8C8BE] font-heading font-black text-xl">AI</span>
            </div>
            <span className="text-[10px] uppercase tracking-wider text-[#F8C8BE] font-bold block -mt-1">MSME Smart Procurement & Costing</span>
          </div>
        </div>
        <button
          onClick={() => setIsStoryModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#F8C8BE] text-[#1E1638] text-xs font-heading font-black shadow-md hover:bg-[#f3b5a8] transition-all"
        >
          <BookOpen className="w-3.5 h-3.5 text-[#523D8A]" />
          A Day with ForgeFlow
        </button>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-6 py-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10 flex-1">

        {/* Left: headline + feature pills */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-block bg-[#F8C8BE] text-[#1E1638] px-4 py-1.5 rounded-2xl text-xs font-heading font-black tracking-wider uppercase shadow-sm">
            {selectedRole === 'buyer' ? 'FOR MANUFACTURERS & MSMES' : 'FOR SUPPLIERS & TRADERS'}
          </div>

          <h1 className="font-heading font-black text-4xl sm:text-5xl text-white leading-tight">
            {selectedRole === 'buyer'
              ? <>Every purchase<br />should protect<br /><span className="text-[#F5A636]">profit.</span></>
              : <>Win more RFQs.<br />Deliver with<br /><span className="text-[#1A957E]">confidence.</span></>
            }
          </h1>

          <div className="space-y-3 max-w-sm">
            {features.map(({ icon: Icon, text }) => (
              <div key={text} className="bg-white/10 backdrop-blur-sm text-white px-4 py-3 rounded-2xl flex items-center gap-3 border border-white/15">
                <div className="w-7 h-7 rounded-full bg-[#10B981] text-white flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <span className="font-heading font-bold text-sm">{text}</span>
              </div>
            ))}
          </div>

          {/* Workshop illustration teaser */}
          <div className="relative rounded-2xl overflow-hidden h-40 max-w-sm">
            <img src="/ravi-workshop.jpg" alt="Workshop" className="w-full h-full object-cover opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#523D8A]/80 to-transparent flex items-center px-5">
              <div>
                <p className="font-heading font-black text-white text-sm">
                  {selectedRole === 'buyer' ? "Ravi's Fabrication Unit" : 'Apex Steel & Tubes'}
                </p>
                <p className="text-white/70 text-xs mt-0.5">
                  {selectedRole === 'buyer' ? 'Bhosari MIDC, Pune' : 'Supplier — 97% on-time delivery'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Login card */}
        <div className="lg:col-span-6">
          <div className="bg-white rounded-3xl p-8 shadow-2xl border-4 border-white/60 text-[#1E1638]">

            {/* Role Toggle — big cards */}
            <div className="mb-6">
              <p className="text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider">Select your role</p>
              <div className="grid grid-cols-2 gap-3">
                {/* Buyer */}
                <button
                  type="button"
                  onClick={() => handleRoleSelect('buyer')}
                  className={`p-4 rounded-2xl border-2 text-left transition-all ${
                    selectedRole === 'buyer'
                      ? 'border-[#523D8A] bg-[#523D8A] text-white shadow-lg'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-[#523D8A]/50'
                  }`}
                >
                  <ShoppingCart className={`w-6 h-6 mb-2 ${selectedRole === 'buyer' ? 'text-[#F5A636]' : 'text-slate-400'}`} />
                  <div className="font-heading font-black text-sm">I'm a Buyer</div>
                  <div className={`text-[11px] mt-1 leading-tight ${selectedRole === 'buyer' ? 'text-white/70' : 'text-slate-400'}`}>
                    Compare quotes & cost orders
                  </div>
                </button>

                {/* Seller */}
                <button
                  type="button"
                  onClick={() => handleRoleSelect('seller')}
                  className={`p-4 rounded-2xl border-2 text-left transition-all ${
                    selectedRole === 'seller'
                      ? 'border-[#1A957E] bg-[#1A957E] text-white shadow-lg'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-[#1A957E]/50'
                  }`}
                >
                  <Package className={`w-6 h-6 mb-2 ${selectedRole === 'seller' ? 'text-[#F5A636]' : 'text-slate-400'}`} />
                  <div className="font-heading font-black text-sm">I'm a Supplier</div>
                  <div className={`text-[11px] mt-1 leading-tight ${selectedRole === 'seller' ? 'text-white/70' : 'text-slate-400'}`}>
                    List materials & respond to RFQs
                  </div>
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-[#F3F0FA] border border-[#D2C6EA] rounded-xl px-3.5 py-2.5 text-sm text-[#1E1736] focus:outline-none focus:border-[#523D8A] font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
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
                className={`w-full py-3.5 rounded-2xl text-white font-heading font-black text-sm transition-all shadow-md flex items-center justify-center gap-2 ${
                  selectedRole === 'buyer' ? 'bg-[#523D8A] hover:bg-[#3E2C6B]' : 'bg-[#1A957E] hover:bg-[#15806b]'
                }`}
              >
                Enter {selectedRole === 'buyer' ? 'Buyer' : 'Supplier'} Workspace
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Demo access */}
            <div className="mt-4 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={handleDemoAccess}
                className="w-full py-2.5 px-4 rounded-xl bg-[#F8C8BE] hover:bg-[#f3b5a8] text-[#1E1736] text-xs font-heading font-black flex items-center justify-center gap-2 transition-all"
              >
                <Zap className="w-3.5 h-3.5 text-[#523D8A]" />
                {selectedRole === 'buyer' ? 'Enter as Buyer Demo (Ravi)' : 'Enter as Supplier Demo (Apex Steel)'}
              </button>
              <p className="text-center text-[10px] text-slate-400 mt-2">
                Sample data only. No real account required.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 border-t border-white/15 text-center text-xs text-white/70 relative z-10 flex flex-col sm:flex-row items-center justify-between max-w-6xl mx-auto w-full">
        <span>© 2026 ForgeFlow AI • Protecting MSME Manufacturing Margins</span>
        <div className="flex items-center gap-3 mt-2 sm:mt-0">
          <span>Landed Cost Comparison</span><span>•</span><span>Deterministic Costing</span><span>•</span><span>GST Intelligence</span>
        </div>
      </footer>
    </div>
  );
};
