import React from 'react';
import {
  Package, Inbox, Truck, Star, TrendingUp, ArrowUpRight,
  Clock
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const revenueData = [
  { month: 'Jun', revenue: 4.2 }, { month: 'Jul', revenue: 5.1 },
  { month: 'Aug', revenue: 4.8 }, { month: 'Sep', revenue: 6.3 },
  { month: 'Oct', revenue: 5.9 }, { month: 'Nov', revenue: 7.2 },
];

const rfqRows = [
  { id: 'RFQ-2847', material: 'MS Sheet 3mm', buyer: 'Ravi Precision', qty: '500 kg', location: 'Bhosari, Pune', status: 'New', statusColor: 'bg-[#16B8A5]/10 text-[#16B8A5] border border-[#16B8A5]/30', action: 'Respond', actionColor: 'bg-gradient-to-r from-[#16B8A5] to-[#0E9786] text-[#0B1320] font-black hover:opacity-90' },
  { id: 'RFQ-2846', material: 'CRCA Coils', buyer: 'Mehta Fab Works', qty: '1,200 kg', location: 'Peenya, Bangalore', status: 'Quoted', statusColor: 'bg-purple-500/10 text-purple-400 border border-purple-500/30', action: 'View Quote', actionColor: 'bg-[#1E2D44] text-slate-200 hover:bg-[#253956]' },
  { id: 'RFQ-2845', material: 'SS Round Bar 304', buyer: 'Kumar Engineers', qty: '300 kg', location: 'Chakan, Pune', status: 'Negotiating', statusColor: 'bg-[#E5A84B]/10 text-[#E5A84B] border border-[#E5A84B]/30', action: 'Update Quote', actionColor: 'bg-[#E5A84B]/10 text-[#E5A84B] hover:bg-[#E5A84B]/20 border border-[#E5A84B]/30' },
];

export const SellerDashboard: React.FC = () => {
  const { setCurrentPage } = useApp();

  return (
    <div className="space-y-6 pb-12">

      {/* Hero Banner with Modern CNC Machining Photo */}
      <div className="relative rounded-3xl overflow-hidden min-h-[220px] flex items-center bg-gradient-to-r from-[#0D1522] via-[#132034] to-[#0D1522] border border-[#1E2E48] shadow-2xl">
        <div className="relative z-10 p-8 sm:p-10 max-w-lg">
          <p className="text-slate-400 text-xs sm:text-sm font-medium mb-1">Supplier Portal</p>
          <h1 className="font-heading font-black text-3xl sm:text-4xl text-white leading-tight">
            Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#16B8A5] to-[#45DFCE]">Apex Steel</span>
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-md">Your supplier performance at a glance. 7 incoming RFQs awaiting quotes.</p>
          <div className="flex flex-wrap gap-3 mt-6">
            <button onClick={() => setCurrentPage('seller-catalog')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#16B8A5] to-[#0E9786] hover:from-[#139E8E] hover:to-[#0C8575] text-[#0B1320] text-sm font-heading font-black transition-all shadow-lg shadow-[#16B8A5]/20">
              <Package className="w-4 h-4" /> Add Material
            </button>
            <button onClick={() => setCurrentPage('seller-rfq')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#152238] hover:bg-[#1C2D4A] text-white text-sm font-heading font-bold transition-all border border-[#233550] shadow-sm">
              <Inbox className="w-4 h-4 text-[#E5A84B]" /> View RFQs
            </button>
          </div>
        </div>
        <div className="absolute inset-0 flex items-stretch pointer-events-none">
          <div className="flex-1" />
          <div className="w-full sm:w-6/12 relative">
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0D1522] via-[#0D1522]/80 to-transparent z-10" />
            <img src="/cnc-machining.jpg" alt="Supplier Manufacturing Facility" className="w-full h-full object-cover opacity-60 mix-blend-screen" style={{ maxHeight: 240 }} />
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Materials Listed', value: '24', delta: '+3', icon: Package, iconBg: 'bg-[#16B8A5]/10', iconColor: 'text-[#16B8A5]', deltaColor: 'text-[#16B8A5] bg-[#16B8A5]/10 border border-[#16B8A5]/20' },
          { label: 'Active RFQs', value: '7', delta: '+2', icon: Inbox, iconBg: 'bg-purple-500/10', iconColor: 'text-purple-400', deltaColor: 'text-purple-400 bg-purple-500/10 border border-purple-500/20' },
          { label: 'Orders Fulfilled', value: '156', delta: '+12', icon: Truck, iconBg: 'bg-[#E5A84B]/10', iconColor: 'text-[#E5A84B]', deltaColor: 'text-[#E5A84B] bg-[#E5A84B]/10 border border-[#E5A84B]/20' },
          { label: 'Avg Response Time', value: '4.2h', delta: '↓1h', icon: Clock, iconBg: 'bg-emerald-500/10', iconColor: 'text-emerald-400', deltaColor: 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' },
        ].map(({ label, value, delta, icon: Icon, iconBg, iconColor, deltaColor }) => (
          <div key={label} className="p-5 rounded-2xl bg-[#131F33] shadow-lg border border-[#1E2E48]">
            <div className="flex items-center justify-between">
              <div className={`p-2 rounded-xl ${iconBg}`}><Icon className={`w-4 h-4 ${iconColor}`} /></div>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${deltaColor}`}>{delta}</span>
            </div>
            <div className="mt-3">
              <div className="font-heading font-black text-2xl text-white">{value}</div>
              <div className="text-xs text-slate-400 mt-0.5">{label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* RFQ Table + Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Recent RFQs */}
        <div className="lg:col-span-7 bg-[#131F33] rounded-2xl shadow-lg border border-[#1E2E48] overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-[#1E2E48]">
            <div className="flex items-center gap-2">
              <Inbox className="w-4 h-4 text-[#16B8A5]" />
              <h3 className="font-heading font-black text-sm text-white">Recent RFQs</h3>
            </div>
            <button onClick={() => setCurrentPage('seller-rfq')} className="text-xs font-bold text-[#16B8A5] hover:underline">View All →</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#0F1826] text-slate-400 font-bold border-b border-[#1E2E48]">
                  <th className="text-left px-4 py-3">Material</th>
                  <th className="text-left px-4 py-3">Buyer</th>
                  <th className="text-left px-4 py-3">Qty</th>
                  <th className="text-left px-4 py-3">Status</th>
                  <th className="text-left px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E2E48]">
                {rfqRows.map(r => (
                  <tr key={r.id} className="hover:bg-[#182842] transition-colors">
                    <td className="px-4 py-3 font-semibold text-white">{r.material}</td>
                    <td className="px-4 py-3 text-slate-300">{r.buyer}</td>
                    <td className="px-4 py-3 text-slate-300">{r.qty}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full font-bold ${r.statusColor}`}>{r.status}</span>
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => setCurrentPage('seller-rfq')}
                        className={`px-3 py-1.5 rounded-lg font-bold transition-all ${r.actionColor}`}>
                        {r.action}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Performance */}
        <div className="lg:col-span-5 bg-[#131F33] rounded-2xl shadow-lg border border-[#1E2E48] p-5">
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-4 h-4 text-[#E5A84B]" />
            <h3 className="font-heading font-black text-sm text-white">Performance Metrics</h3>
          </div>
          <div className="space-y-4">
            {[
              { label: 'On-time Delivery', value: '97%', color: 'bg-[#16B8A5]' },
              { label: 'Quote Win Rate', value: '68%', color: 'bg-blue-400' },
            ].map(m => (
              <div key={m.label}>
                <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                  <span>{m.label}</span><span className="font-black text-white">{m.value}</span>
                </div>
                <div className="h-2 bg-[#1E2D44] rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${m.color}`} style={{ width: m.value }} />
                </div>
              </div>
            ))}
            <div className="pt-2 border-t border-[#1E2E48] flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Avg Quote Turnaround</span>
              <span className="text-xs font-black text-[#E5A84B] bg-[#E5A84B]/10 px-2.5 py-1 rounded-full border border-[#E5A84B]/20">4.2 hrs</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Buyer Rating</span>
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 text-[#E5A84B]" fill="#E5A84B" />)}
                <span className="text-xs font-black text-white ml-1">4.8</span>
                <span className="text-[10px] text-slate-500">(12 reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Trend */}
      <div className="bg-[#131F33] rounded-2xl shadow-lg border border-[#1E2E48] p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#16B8A5]" />
            <h3 className="font-heading font-black text-sm text-white">Monthly Revenue Trend</h3>
          </div>
          <span className="text-xs font-bold text-[#16B8A5] bg-[#16B8A5]/10 px-2.5 py-1 rounded-full border border-[#16B8A5]/20 flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" /> 22% this month
          </span>
        </div>
        <div className="h-36">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="tealGrad4" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16B8A5" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#16B8A5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="#475569" fontSize={10} tickLine={false} />
              <YAxis stroke="#475569" fontSize={10} tickFormatter={v => `₹${v}L`} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#131F33', borderColor: '#233550', borderRadius: '12px', fontSize: '11px', color: '#F3F5F7' }} formatter={(v: any) => [`₹${v}L`, 'Revenue']} />
              <Area type="monotone" dataKey="revenue" stroke="#16B8A5" strokeWidth={2.5} fill="url(#tealGrad4)"
                dot={{ stroke: '#16B8A5', strokeWidth: 2, r: 3, fill: '#131F33' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
