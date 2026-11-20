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
  'Dispatched': 'bg-blue-100 text-blue-700',
  'Delivered': 'bg-emerald-100 text-emerald-700',
  'Confirmed': 'bg-purple-100 text-purple-700',
  'Order Received': 'bg-amber-100 text-amber-700',
};

export const SellerOrders: React.FC = () => {
  return (
    <div className="space-y-5 pb-10">
      <div>
        <h1 className="font-heading font-black text-2xl text-white">Orders & Delivery</h1>
        <p className="text-white/60 text-sm mt-0.5">{orders.length} orders • {orders.filter(o => o.status === 'Delivered').length} delivered</p>
      </div>

      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex-1">
                {/* Header row */}
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-slate-400">#{order.id}</span>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${statusColor[order.status] ?? 'bg-slate-100 text-slate-600'}`}>
                    {order.status}
                  </span>
                </div>
                <h3 className="font-heading font-black text-base text-[#1E1638]">{order.material}</h3>
                <div className="flex flex-wrap gap-4 mt-1 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><Package className="w-3.5 h-3.5" />{order.buyer}</span>
                  <span>{order.qty}</span>
                  <span className="font-bold text-slate-800">{order.amount}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />Ordered: {order.date}</span>
                  {order.eta !== '—' && <span className="flex items-center gap-1"><Truck className="w-3.5 h-3.5" />ETA: {order.eta}</span>}
                </div>

                {/* Progress pipeline */}
                <div className="mt-4 flex items-center gap-0">
                  {order.steps.map((step, i) => {
                    const done = i <= order.currentStep;
                    const active = i === order.currentStep;
                    const isLast = i === order.steps.length - 1;
                    return (
                      <React.Fragment key={step}>
                        <div className="flex flex-col items-center">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${done ? (active ? 'bg-[#523D8A]' : 'bg-emerald-500') : 'bg-slate-200'}`}>
                            {done && !active
                              ? <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                              : active
                                ? <span className="w-2.5 h-2.5 rounded-full bg-white" />
                                : <span className="w-2 h-2 rounded-full bg-slate-300" />
                            }
                          </div>
                          <span className={`text-[9px] font-bold mt-1 text-center max-w-[60px] leading-tight ${done ? 'text-slate-700' : 'text-slate-400'}`}>
                            {step}
                          </span>
                        </div>
                        {!isLast && (
                          <div className={`h-0.5 flex-1 mx-1 mb-4 rounded-full ${i < order.currentStep ? 'bg-emerald-400' : 'bg-slate-200'}`} />
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col gap-2 shrink-0">
                {order.status !== 'Delivered' && (
                  <button className="px-4 py-2 rounded-xl bg-[#1A957E] hover:bg-[#15806b] text-white text-xs font-heading font-black transition-all flex items-center gap-1.5">
                    Update Status <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
                <button className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all">
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
