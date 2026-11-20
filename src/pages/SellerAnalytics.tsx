import React from 'react';
import { TrendingUp, Package, Star, Percent } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';

const revenueData = [
  { month: 'Jun', revenue: 4.2 }, { month: 'Jul', revenue: 5.1 },
  { month: 'Aug', revenue: 4.8 }, { month: 'Sep', revenue: 6.3 },
  { month: 'Oct', revenue: 5.9 }, { month: 'Nov', revenue: 7.2 },
];

const buyerData = [
  { buyer: 'Ravi Precision', volume: 1850 },
  { buyer: 'Mehta Fab', volume: 2400 },
  { buyer: 'Kumar Engg', volume: 980 },
  { buyer: 'Sharma Steel', volume: 1600 },
  { buyer: 'VK Fab', volume: 740 },
];

const materialBreakdown = [
  { name: 'MS Sheets', value: 38, color: '#16B8A5' },
  { name: 'CRCA Coils', value: 27, color: '#0EA5E9' },
  { name: 'SS Round Bar', value: 18, color: '#E5A84B' },
  { name: 'GI Sheets', value: 12, color: '#8B5CF6' },
  { name: 'Others', value: 5, color: '#64748B' },
];

const winLoss = [
  { month: 'Aug', won: 12, lost: 5 }, { month: 'Sep', won: 15, lost: 4 },
  { month: 'Oct', won: 11, lost: 6 }, { month: 'Nov', won: 14, lost: 3 },
];

export const SellerAnalytics: React.FC = () => {
  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="font-heading font-black text-2xl text-white">Supplier Sales &amp; Performance Analytics</h1>
        <p className="text-slate-400 text-sm mt-0.5">Revenue trend, quote win rates, top buyers &amp; material distribution</p>
      </div>

      {/* KPI summary row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue (Nov)', value: '₹7.2L', delta: '+22%', icon: TrendingUp, iconBg: 'bg-emerald-500/10', iconColor: 'text-emerald-400' },
          { label: 'Materials Sold', value: '5.6k kg', delta: '+18%', icon: Package, iconBg: 'bg-[#16B8A5]/10', iconColor: 'text-[#16B8A5]' },
          { label: 'Quote Win Rate', value: '68%', delta: '+5%', icon: Percent, iconBg: 'bg-purple-500/10', iconColor: 'text-purple-400' },
          { label: 'Buyer Rating', value: '4.8 ★', delta: '+0.2', icon: Star, iconBg: 'bg-[#E5A84B]/10', iconColor: 'text-[#E5A84B]' },
        ].map(({ label, value, delta, icon: Icon, iconBg, iconColor }) => (
          <div key={label} className="p-5 bg-[#131F33] rounded-2xl border border-[#1E2E48] shadow-lg">
            <div className="flex items-center justify-between">
              <div className={`p-2 rounded-xl ${iconBg}`}><Icon className={`w-4 h-4 ${iconColor}`} /></div>
              <span className="text-xs font-bold text-[#16B8A5] bg-[#16B8A5]/10 px-2 py-0.5 rounded-full border border-[#16B8A5]/25">{delta}</span>
            </div>
            <div className="mt-3">
              <div className="font-heading font-black text-2xl sm:text-3xl text-white">{value}</div>
              <div className="text-xs text-slate-400 mt-1">{label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Trend + Material Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7 bg-[#131F33] rounded-2xl border border-[#1E2E48] shadow-lg p-5">
          <h3 className="font-heading font-black text-sm text-white mb-4">Monthly Revenue Trend</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="tealGradAnalytics" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16B8A5" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#16B8A5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#475569" fontSize={10} tickLine={false} />
                <YAxis stroke="#475569" fontSize={10} tickFormatter={v => `₹${v}L`} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#131F33', borderColor: '#233550', borderRadius: '12px', fontSize: '11px', color: '#F3F5F7' }} formatter={(v: any) => [`₹${v}L`, 'Revenue']} />
                <Area type="monotone" dataKey="revenue" stroke="#16B8A5" strokeWidth={2.5} fill="url(#tealGradAnalytics)"
                  dot={{ stroke: '#16B8A5', strokeWidth: 2, r: 3, fill: '#131F33' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-5 bg-[#131F33] rounded-2xl border border-[#1E2E48] shadow-lg p-5">
          <h3 className="font-heading font-black text-sm text-white mb-4">Material-wise Sales %</h3>
          <div className="flex items-center gap-4">
            <div className="h-40 w-40 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={materialBreakdown} cx="50%" cy="50%" innerRadius={35} outerRadius={60} dataKey="value" strokeWidth={2}>
                    {materialBreakdown.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#131F33', borderColor: '#233550', borderRadius: '12px', fontSize: '11px', color: '#F3F5F7' }} formatter={(v: any) => [`${v}%`]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 flex-1">
              {materialBreakdown.map(m => (
                <div key={m.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: m.color }} />
                    <span className="text-slate-300 font-medium">{m.name}</span>
                  </div>
                  <span className="font-bold text-white">{m.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Buyers + Win/Loss */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7 bg-[#131F33] rounded-2xl border border-[#1E2E48] shadow-lg p-5">
          <h3 className="font-heading font-black text-sm text-white mb-4">Top Buyers by Volume (kg)</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={buyerData} layout="vertical" margin={{ top: 0, right: 10, left: 60, bottom: 0 }}>
                <XAxis type="number" stroke="#475569" fontSize={10} tickLine={false} />
                <YAxis type="category" dataKey="buyer" stroke="#475569" fontSize={10} tickLine={false} width={60} />
                <Tooltip contentStyle={{ backgroundColor: '#131F33', borderColor: '#233550', borderRadius: '12px', fontSize: '11px', color: '#F3F5F7' }} formatter={(v: any) => [`${v} kg`]} />
                <Bar dataKey="volume" fill="#16B8A5" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-5 bg-[#131F33] rounded-2xl border border-[#1E2E48] shadow-lg p-5">
          <h3 className="font-heading font-black text-sm text-white mb-4">Quote Win vs Lost Rate</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={winLoss} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <XAxis dataKey="month" stroke="#475569" fontSize={10} tickLine={false} />
                <YAxis stroke="#475569" fontSize={10} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#131F33', borderColor: '#233550', borderRadius: '12px', fontSize: '11px', color: '#F3F5F7' }} />
                <Legend iconSize={8} iconType="circle" wrapperStyle={{ fontSize: 10 }} />
                <Bar dataKey="won" name="Won" fill="#16B8A5" radius={[4, 4, 0, 0]} />
                <Bar dataKey="lost" name="Lost" fill="#F87171" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
