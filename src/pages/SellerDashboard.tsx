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
  { id: 'RFQ-2847', material: 'MS Sheet 3mm', buyer: 'Ravi Precision', qty: '500 kg', location: 'Bhosari, Pune', status: 'New', statusColor: 'bg-[#EFEBF8] text-[#523D8A]', action: 'Respond', actionColor: 'bg-[#523D8A] text-white hover:bg-[#3E2C6B]' },
  { id: 'RFQ-2846', material: 'CRCA Coils', buyer: 'Mehta Fab Works', qty: '1,200 kg', location: 'Peenya, Bangalore', status: 'Quoted', statusColor: 'bg-purple-100 text-purple-700', action: 'View Quote', actionColor: 'bg-slate-100 text-slate-700 hover:bg-slate-200' },
  { id: 'RFQ-2845', material: 'SS Round Bar 304', buyer: 'Kumar Engineers', qty: '300 kg', location: 'Chakan, Pune', status: 'Negotiating', statusColor: 'bg-amber-100 text-amber-800', action: 'Update Quote', actionColor: 'bg-[#FEF3D6] text-amber-800 hover:bg-amber-100' },
];

export const SellerDashboard: React.FC = () => {
  const { setCurrentPage } = useApp();

  return (
    <div className="space-y-6 pb-12">

      {/* Hero Banner with Authentic Precision Fiber Laser Sheet Metal Photo */}
      <div className="relative rounded-3xl overflow-hidden min-h-[220px] flex items-center bg-gradient-to-r from-[#3E296C] via-[#523D8A] to-[#3E296C] border-2 border-white/20 shadow-2xl">
        <div className="relative z-10 p-8 sm:p-10 max-w-lg">
          <p className="text-[#F8C8BE] text-xs sm:text-sm font-medium mb-1">Supplier Portal</p>
          <h1 className="font-heading font-black text-3xl sm:text-4xl text-white leading-tight">
            Welcome, <span className="text-[#F5A636]">Apex Steel</span>
          </h1>
          <p className="text-white/85 text-xs sm:text-sm mt-2 max-w-md font-medium">Your supplier quotation &amp; order performance at a glance. 7 incoming RFQs awaiting your review.</p>
          <div className="flex flex-wrap gap-3 mt-6">
            <button onClick={() => setCurrentPage('seller-catalog')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white text-[#523D8A] text-sm font-heading font-black transition-all shadow-md hover:bg-slate-100">
              <Package className="w-4 h-4 text-[#523D8A]" /> Add Material
            </button>
            <button onClick={() => setCurrentPage('seller-rfq')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#F5A636] hover:bg-[#e59524] text-[#1E1638] text-sm font-heading font-black transition-all shadow-md">
              <Inbox className="w-4 h-4" /> View RFQs
            </button>
          </div>
        </div>
        <div className="absolute inset-0 flex items-stretch pointer-events-none">
          <div className="flex-1" />
          <div className="w-full sm:w-6/12 relative">
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#523D8A] via-[#523D8A]/80 to-transparent z-10" />
            <img
              src="/steel-warehouse-coils.jpg"
              alt="Raw Steel Material Depot & Coils"
              className="w-full h-full object-cover opacity-85 object-center"
              style={{ maxHeight: 240 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#3E296C]/80 via-transparent to-transparent" />
          </div>
        </div>
      </div>

      {/* KPI Cards (Crisp White PPT Style Cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Materials Listed', value: '24', delta: '+3', icon: Package, iconBg: 'bg-[#EFEBF8]', iconColor: 'text-[#523D8A]', deltaColor: 'text-[#523D8A] bg-[#EFEBF8]' },
          { label: 'Active RFQs', value: '7', delta: '+2', icon: Inbox, iconBg: 'bg-[#FEF3D6]', iconColor: 'text-amber-700', deltaColor: 'text-amber-700 bg-amber-50' },
          { label: 'Orders Fulfilled', value: '156', delta: '+12', icon: Truck, iconBg: 'bg-[#F8C8BE]', iconColor: 'text-orange-950', deltaColor: 'text-orange-800 bg-orange-50' },
          { label: 'Avg Response Time', value: '4.2h', delta: '↓1h', icon: Clock, iconBg: 'bg-emerald-100', iconColor: 'text-emerald-800', deltaColor: 'text-emerald-700 bg-emerald-50' },
        ].map(({ label, value, delta, icon: Icon, iconBg, iconColor, deltaColor }) => (
          <div key={label} className="p-5 rounded-3xl bg-white shadow-card border-2 border-white/80 text-[#1E1638]">
            <div className="flex items-center justify-between">
              <div className={`p-2.5 rounded-2xl ${iconBg}`}><Icon className={`w-4 h-4 ${iconColor}`} /></div>
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${deltaColor}`}>{delta}</span>
            </div>
            <div className="mt-3">
              <div className="font-heading font-black text-2xl text-[#1E1638]">{value}</div>
              <div className="text-xs text-slate-500 mt-0.5 font-medium">{label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* RFQ Table + Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Recent RFQs */}
        <div className="lg:col-span-7 bg-white rounded-3xl shadow-card border-2 border-white/80 overflow-hidden text-[#1E1638]">
          <div className="flex items-center justify-between p-6 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Inbox className="w-4 h-4 text-[#523D8A]" />
              <h3 className="font-heading font-black text-sm text-[#1E1638]">Recent RFQs</h3>
            </div>
            <button onClick={() => setCurrentPage('seller-rfq')} className="text-xs font-bold text-[#523D8A] hover:underline">View All →</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
                  <th className="text-left px-5 py-3">Material</th>
                  <th className="text-left px-5 py-3">Buyer</th>
                  <th className="text-left px-5 py-3">Qty</th>
                  <th className="text-left px-5 py-3">Status</th>
                  <th className="text-left px-5 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rfqRows.map(r => (
                  <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3.5 font-semibold text-slate-900">{r.material}</td>
                    <td className="px-5 py-3.5 text-slate-600">{r.buyer}</td>
                    <td className="px-5 py-3.5 text-slate-600 font-medium">{r.qty}</td>
                    <td className="px-5 py-3.5">
                      <span className={`px-2.5 py-1 rounded-full font-bold ${r.statusColor}`}>{r.status}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <button onClick={() => setCurrentPage('seller-rfq')}
                        className={`px-3 py-1.5 rounded-xl font-bold transition-all ${r.actionColor}`}>
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
        <div className="lg:col-span-5 bg-white rounded-3xl shadow-card border-2 border-white/80 p-6 text-[#1E1638]">
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-4 h-4 text-[#F5A636]" />
            <h3 className="font-heading font-black text-sm text-[#1E1638]">Performance Metrics</h3>
          </div>
          <div className="space-y-4">
            {[
              { label: 'On-time Delivery', value: '97%', color: 'bg-emerald-600' },
              { label: 'Quote Win Rate', value: '68%', color: 'bg-[#523D8A]' },
            ].map(m => (
              <div key={m.label}>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>{m.label}</span><span className="font-black text-slate-900">{m.value}</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${m.color}`} style={{ width: m.value }} />
                </div>
              </div>
            ))}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-600 font-medium">Avg Quote Turnaround</span>
              <span className="text-xs font-black text-[#523D8A] bg-[#EFEBF8] px-2.5 py-1 rounded-full">4.2 hrs</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-600 font-medium">Buyer Rating</span>
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 text-[#F5A636]" fill="#F5A636" />)}
                <span className="text-xs font-black text-slate-900 ml-1">4.8</span>
                <span className="text-[10px] text-slate-400 font-medium">(12 reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Trend */}
      <div className="bg-white rounded-3xl shadow-card border-2 border-white/80 p-6 text-[#1E1638]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#523D8A]" />
            <h3 className="font-heading font-black text-sm text-[#1E1638]">Monthly Revenue Trend</h3>
          </div>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> 22% this month
          </span>
        </div>
        <div className="h-36">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="purpleGradSeller" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#523D8A" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#523D8A" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="#94A3B8" fontSize={10} tickLine={false} />
              <YAxis stroke="#94A3B8" fontSize={10} tickFormatter={v => `₹${v}L`} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0', borderRadius: '16px', fontSize: '11px', color: '#1E1638', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }} formatter={(v: any) => [`₹${v}L`, 'Revenue']} />
              <Area type="monotone" dataKey="revenue" stroke="#523D8A" strokeWidth={2.5} fill="url(#purpleGradSeller)"
                dot={{ stroke: '#523D8A', strokeWidth: 2, r: 3, fill: '#FFFFFF' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
