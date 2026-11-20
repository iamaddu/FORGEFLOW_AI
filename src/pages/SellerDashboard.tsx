import React from 'react';
import {
  Package, Inbox, Truck, Star, TrendingUp, ArrowUpRight,
  ArrowRight, CheckCircle2, Clock, MessageSquare, AlertCircle, BarChart3
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const revenueData = [
  { month: 'Jun', revenue: 4.2 }, { month: 'Jul', revenue: 5.1 },
  { month: 'Aug', revenue: 4.8 }, { month: 'Sep', revenue: 6.3 },
  { month: 'Oct', revenue: 5.9 }, { month: 'Nov', revenue: 7.2 },
];

const rfqRows = [
  { id: 'RFQ-2847', material: 'MS Sheet 3mm', buyer: 'Ravi Precision', qty: '500 kg', location: 'Bhosari, Pune', status: 'New', statusColor: 'bg-blue-100 text-blue-700', action: 'Respond', actionColor: 'bg-[#1A957E] text-white hover:bg-[#15806b]' },
  { id: 'RFQ-2846', material: 'CRCA Coils', buyer: 'Mehta Fab Works', qty: '1,200 kg', location: 'Peenya, Bangalore', status: 'Quoted', statusColor: 'bg-purple-100 text-purple-700', action: 'View Quote', actionColor: 'bg-slate-100 text-slate-700 hover:bg-slate-200' },
  { id: 'RFQ-2845', material: 'SS Round Bar 304', buyer: 'Kumar Engineers', qty: '300 kg', location: 'Chakan, Pune', status: 'Negotiating', statusColor: 'bg-amber-100 text-amber-700', action: 'Update Quote', actionColor: 'bg-amber-100 text-amber-800 hover:bg-amber-200' },
];

export const SellerDashboard: React.FC = () => {
  const { setCurrentPage } = useApp();

  return (
    <div className="space-y-5 pb-10">

      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden min-h-[200px] flex items-center bg-[#1A1F36] border border-white/10">
        <div className="relative z-10 p-8 max-w-lg">
          <p className="text-white/50 text-sm mb-1">Supplier Portal</p>
          <h1 className="font-heading font-black text-3xl sm:text-4xl text-white leading-tight">
            Welcome, <span className="text-[#1A957E]">Apex Steel</span>
          </h1>
          <p className="text-white/60 text-sm mt-2 max-w-xs">Your supplier performance at a glance. 7 new RFQs waiting.</p>
          <div className="flex flex-wrap gap-3 mt-5">
            <button onClick={() => setCurrentPage('seller-catalog')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1A957E] hover:bg-[#15806b] text-white text-sm font-heading font-bold transition-all">
              <Package className="w-4 h-4" /> Add Material
            </button>
            <button onClick={() => setCurrentPage('seller-rfq')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F5A636] hover:bg-[#e59524] text-[#1E1638] text-sm font-heading font-bold transition-all">
              <Inbox className="w-4 h-4" /> View RFQs
            </button>
          </div>
        </div>
        <div className="absolute inset-0 flex items-stretch">
          <div className="flex-1" />
          <div className="w-5/12 relative">
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#1A1F36] to-transparent z-10" />
            <img src="/ravi-workshop.jpg" alt="Supplier workshop" className="w-full h-full object-cover opacity-50" style={{ maxHeight: 220 }} />
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Materials Listed', value: '24', delta: '+3', icon: Package, iconBg: 'bg-blue-50', iconColor: 'text-blue-600', deltaColor: 'text-emerald-600 bg-emerald-50' },
          { label: 'Active RFQs', value: '7', delta: '+2', icon: Inbox, iconBg: 'bg-purple-50', iconColor: 'text-purple-600', deltaColor: 'text-emerald-600 bg-emerald-50' },
          { label: 'Orders Fulfilled', value: '156', delta: '+12', icon: Truck, iconBg: 'bg-amber-50', iconColor: 'text-amber-600', deltaColor: 'text-emerald-600 bg-emerald-50' },
          { label: 'Avg Response Time', value: '4.2h', delta: '↓1h', icon: Clock, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600', deltaColor: 'text-emerald-600 bg-emerald-50' },
        ].map(({ label, value, delta, icon: Icon, iconBg, iconColor, deltaColor }) => (
          <div key={label} className="p-5 rounded-2xl bg-white shadow-sm border border-slate-100">
            <div className="flex items-center justify-between">
              <div className={`p-2 rounded-xl ${iconBg}`}><Icon className={`w-4 h-4 ${iconColor}`} /></div>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${deltaColor}`}>{delta}</span>
            </div>
            <div className="mt-3">
              <div className="font-heading font-black text-2xl text-[#1E1638]">{value}</div>
              <div className="text-xs text-slate-500 mt-0.5">{label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* RFQ Table + Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Recent RFQs */}
        <div className="lg:col-span-7 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Inbox className="w-4 h-4 text-[#523D8A]" />
              <h3 className="font-heading font-black text-sm text-[#1E1638]">Recent RFQs</h3>
            </div>
            <button onClick={() => setCurrentPage('seller-rfq')} className="text-xs font-bold text-[#1A957E] hover:underline">View All →</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-500 font-bold">
                  <th className="text-left px-4 py-3">Material</th>
                  <th className="text-left px-4 py-3">Buyer</th>
                  <th className="text-left px-4 py-3">Qty</th>
                  <th className="text-left px-4 py-3">Status</th>
                  <th className="text-left px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {rfqRows.map(r => (
                  <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-semibold text-slate-800">{r.material}</td>
                    <td className="px-4 py-3 text-slate-600">{r.buyer}</td>
                    <td className="px-4 py-3 text-slate-600">{r.qty}</td>
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
        <div className="lg:col-span-5 bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-4 h-4 text-[#F5A636]" />
            <h3 className="font-heading font-black text-sm text-[#1E1638]">Performance Metrics</h3>
          </div>
          <div className="space-y-4">
            {[
              { label: 'On-time Delivery', value: '97%', pct: 97, color: 'bg-emerald-500' },
              { label: 'Quote Win Rate', value: '68%', pct: 68, color: 'bg-blue-500' },
            ].map(m => (
              <div key={m.label}>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>{m.label}</span><span className="font-black">{m.value}</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${m.color}`} style={{ width: m.value }} />
                </div>
              </div>
            ))}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-600 font-medium">Avg Quote Turnaround</span>
              <span className="text-xs font-black text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">4.2 hrs</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-600 font-medium">Buyer Rating</span>
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 text-[#F5A636]" fill="#F5A636" />)}
                <span className="text-xs font-black text-slate-800 ml-1">4.8</span>
                <span className="text-[10px] text-slate-400">(12)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Trend */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#1A957E]" />
            <h3 className="font-heading font-black text-sm text-[#1E1638]">Monthly Revenue Trend</h3>
          </div>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" /> 22% this month
          </span>
        </div>
        <div className="h-36">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="tealGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1A957E" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#1A957E" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="#CBD5E1" fontSize={10} tickLine={false} />
              <YAxis stroke="#CBD5E1" fontSize={10} tickFormatter={v => `₹${v}L`} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '12px', fontSize: '11px', borderColor: '#E2E8F0' }} formatter={(v: any) => [`₹${v}L`, 'Revenue']} />
              <Area type="monotone" dataKey="revenue" stroke="#1A957E" strokeWidth={2.5} fill="url(#tealGrad)"
                dot={{ stroke: '#1A957E', strokeWidth: 2, r: 3, fill: '#fff' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
