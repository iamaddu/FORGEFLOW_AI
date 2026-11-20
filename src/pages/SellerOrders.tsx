import React from 'react';
import { Truck, CheckCircle2, Package, Clock, ArrowRight } from 'lucide-react';

const orders = [
  {
    id: 'ORD-1156', material: 'MS Sheet 3mm', buyer: 'Ravi Precision Fabrication Works',
    qty: '500 kg', amount: '₹27,000', status: 'Dispatched',
    steps: ['Order Received', 'Confirmed', 'Dispatched', 'Delivered'],
    currentStep: 2, date: '20 Nov 2026', eta: '22 Nov 2026',
  },
  {
    id: 'ORD-1155', material: 'GI Sheets (0.8mm)', buyer: 'Sharma Sheet Metal',
    qty: '800 kg', amount: '₹73,200', status: 'Delivered',
    steps: ['Order Received', 'Confirmed', 'Dispatched', 'Delivered'],
    currentStep: 3, date: '15 Nov 2026', eta: '—',
  },
  {
    id: 'ORD-1154', material: 'CRCA Coils', buyer: 'Mehta Fab Works',
    qty: '1,200 kg', amount: '₹84,000', status: 'Confirmed',
    steps: ['Order Received', 'Confirmed', 'Dispatched', 'Delivered'],
    currentStep: 1, date: '18 Nov 2026', eta: '25 Nov 2026',
  },
  {
    id: 'ORD-1153', material: 'SS Round Bar 304', buyer: 'Kumar Engineers',
    qty: '300 kg', amount: '₹73,500', status: 'Delivered',
    steps: ['Order Received', 'Confirmed', 'Dispatched', 'Delivered'],
    currentStep: 3, date: '10 Nov 2026', eta: '—',
  },
  {
    id: 'ORD-1152', material: 'MS Plates (10mm)', buyer: 'VK Fabricators',
    qty: '200 kg', amount: '₹11,600', status: 'Order Received',
    steps: ['Order Received', 'Confirmed', 'Dispatched', 'Delivered'],
    currentStep: 0, date: '20 Nov 2026', eta: '28 Nov 2026',
  },
];

const statusColor: Record<string, string> = {
  'Dispatched': 'bg-blue-500/10 text-blue-400 border border-blue-500/30',
  'Delivered': 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30',
  'Confirmed': 'bg-purple-500/10 text-purple-400 border border-purple-500/30',
  'Order Received': 'bg-[#E5A84B]/10 text-[#E5A84B] border border-[#E5A84B]/30',
};

export const SellerOrders: React.FC = () => {
  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="font-heading font-black text-2xl text-white">Orders &amp; Delivery Tracking</h1>
        <p className="text-slate-400 text-sm mt-0.5">{orders.length} purchase orders • {orders.filter(o => o.status === 'Delivered').length} successfully delivered</p>
      </div>

      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="bg-[#131F33] rounded-2xl border border-[#1E2E48] shadow-lg p-5">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex-1">
                {/* Header row */}
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-slate-400">#{order.id}</span>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${statusColor[order.status] ?? 'bg-[#182842] text-slate-400'}`}>
                    {order.status}
                  </span>
                </div>
                <h3 className="font-heading font-black text-lg text-white">{order.material}</h3>
                <div className="flex flex-wrap gap-4 mt-1.5 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5 text-slate-300"><Package className="w-3.5 h-3.5 text-[#16B8A5]" />{order.buyer}</span>
                  <span className="text-slate-300 font-semibold">{order.qty}</span>
                  <span className="font-bold text-[#E5A84B]">{order.amount}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-slate-500" />Ordered: {order.date}</span>
                  {order.eta !== '—' && <span className="flex items-center gap-1.5 text-[#16B8A5]"><Truck className="w-3.5 h-3.5" />ETA: {order.eta}</span>}
                </div>

                {/* Progress pipeline */}
                <div className="mt-5 flex items-center gap-0">
                  {order.steps.map((step, i) => {
                    const done = i <= order.currentStep;
                    const active = i === order.currentStep;
                    const isLast = i === order.steps.length - 1;
                    return (
                      <React.Fragment key={step}>
                        <div className="flex flex-col items-center">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${done ? (active ? 'bg-[#16B8A5] text-[#0B1320] shadow-md shadow-[#16B8A5]/30' : 'bg-emerald-500 text-[#0B1320]') : 'bg-[#1E2E48] text-slate-500'}`}>
                            {done && !active
                              ? <CheckCircle2 className="w-3.5 h-3.5" />
                              : active
                                ? <span className="w-2 h-2 rounded-full bg-[#0B1320]" />
                                : <span className="w-2 h-2 rounded-full bg-slate-600" />
                            }
                          </div>
                          <span className={`text-[10px] font-bold mt-1.5 text-center max-w-[65px] leading-tight ${done ? 'text-slate-200' : 'text-slate-500'}`}>
                            {step}
                          </span>
                        </div>
                        {!isLast && (
                          <div className={`h-0.5 flex-1 mx-1 mb-4 rounded-full ${i < order.currentStep ? 'bg-[#16B8A5]' : 'bg-[#1E2E48]'}`} />
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col gap-2 shrink-0">
                {order.status !== 'Delivered' && (
                  <button className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#16B8A5] to-[#0E9786] hover:from-[#139E8E] hover:to-[#0C8575] text-[#0B1320] text-xs font-heading font-black transition-all shadow-md shadow-[#16B8A5]/20 flex items-center justify-center gap-1.5">
                    Update Status <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
                <button className="px-4 py-2 rounded-xl bg-[#182842] hover:bg-[#203456] text-slate-300 text-xs font-bold transition-all border border-[#233550]">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
