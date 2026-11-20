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
  { name: 'MS Sheets', value: 38, color: '#523D8A' },
  { name: 'CRCA Coils', value: 27, color: '#F5A636' },
  { name: 'SS Round Bar', value: 18, color: '#16B8A5' },
  { name: 'GI Sheets', value: 12, color: '#F8C8BE' },
  { name: 'Others', value: 5, color: '#94A3B8' },
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
        <p className="text-[#F8C8BE] text-sm mt-0.5">Revenue trend, quote win rates, top buyers &amp; material distribution</p>
      </div>

      {/* KPI summary row (Crisp White PPT Style Cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue (Nov)', value: '₹7.2L', delta: '+22%', icon: TrendingUp, iconBg: 'bg-emerald-100', iconColor: 'text-emerald-800' },
          { label: 'Materials Sold', value: '5.6k kg', delta: '+18%', icon: Package, iconBg: 'bg-[#EFEBF8]', iconColor: 'text-[#523D8A]' },
          { label: 'Quote Win Rate', value: '68%', delta: '+5%', icon: Percent, iconBg: 'bg-[#FEF3D6]', iconColor: 'text-amber-800' },
          { label: 'Buyer Rating', value: '4.8 ★', delta: '+0.2', icon: Star, iconBg: 'bg-[#F8C8BE]', iconColor: 'text-orange-950' },
        ].map(({ label, value, delta, icon: Icon, iconBg, iconColor }) => (
          <div key={label} className="p-5 bg-white rounded-3xl shadow-card border-2 border-white/80 text-[#1E1638]">
            <div className="flex items-center justify-between">
              <div className={`p-2.5 rounded-2xl ${iconBg}`}><Icon className={`w-4 h-4 ${iconColor}`} /></div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">{delta}</span>
            </div>
            <div className="mt-3">
              <div className="font-heading font-black text-2xl sm:text-3xl text-[#1E1638]">{value}</div>
              <div className="text-xs text-slate-500 mt-1 font-medium">{label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Trend + Material Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7 bg-white rounded-3xl shadow-card border-2 border-white/80 p-6 text-[#1E1638]">
          <h3 className="font-heading font-black text-sm text-[#1E1638] mb-4">Monthly Revenue Trend</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="purpleGradAnalytics" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#523D8A" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#523D8A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={10} tickFormatter={v => `₹${v}L`} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0', borderRadius: '16px', fontSize: '11px', color: '#1E1638' }} formatter={(v: any) => [`₹${v}L`, 'Revenue']} />
                <Area type="monotone" dataKey="revenue" stroke="#523D8A" strokeWidth={2.5} fill="url(#purpleGradAnalytics)"
                  dot={{ stroke: '#523D8A', strokeWidth: 2, r: 3, fill: '#FFFFFF' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-5 bg-white rounded-3xl shadow-card border-2 border-white/80 p-6 text-[#1E1638]">
          <h3 className="font-heading font-black text-sm text-[#1E1638] mb-4">Material-wise Sales %</h3>
          <div className="flex items-center gap-4">
            <div className="h-40 w-40 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={materialBreakdown} cx="50%" cy="50%" innerRadius={35} outerRadius={60} dataKey="value" strokeWidth={2}>
                    {materialBreakdown.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0', borderRadius: '12px', fontSize: '11px', color: '#1E1638' }} formatter={(v: any) => [`${v}%`]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 flex-1">
              {materialBreakdown.map(m => (
                <div key={m.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: m.color }} />
                    <span className="text-slate-600 font-medium">{m.name}</span>
                  </div>
                  <span className="font-black text-[#1E1638]">{m.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Buyers + Win/Loss */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7 bg-white rounded-3xl shadow-card border-2 border-white/80 p-6 text-[#1E1638]">
          <h3 className="font-heading font-black text-sm text-[#1E1638] mb-4">Top Buyers by Volume (kg)</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={buyerData} layout="vertical" margin={{ top: 0, right: 10, left: 60, bottom: 0 }}>
                <XAxis type="number" stroke="#94A3B8" fontSize={10} tickLine={false} />
                <YAxis type="category" dataKey="buyer" stroke="#94A3B8" fontSize={10} tickLine={false} width={60} />
                <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0', borderRadius: '12px', fontSize: '11px', color: '#1E1638' }} formatter={(v: any) => [`${v} kg`]} />
                <Bar dataKey="volume" fill="#523D8A" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-5 bg-white rounded-3xl shadow-card border-2 border-white/80 p-6 text-[#1E1638]">
          <h3 className="font-heading font-black text-sm text-[#1E1638] mb-4">Quote Win vs Lost Rate</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={winLoss} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0', borderRadius: '12px', fontSize: '11px', color: '#1E1638' }} />
                <Legend iconSize={8} iconType="circle" wrapperStyle={{ fontSize: 10 }} />
                <Bar dataKey="won" name="Won" fill="#523D8A" radius={[4, 4, 0, 0]} />
                <Bar dataKey="lost" name="Lost" fill="#F8C8BE" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
