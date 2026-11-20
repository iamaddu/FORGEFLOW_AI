import React, { useState } from 'react';
import {
  Truck,
  CheckCircle2,
  Package,
  Clock,
  ArrowRight,
  X,
  FileText,
  MapPin,
  Phone,
  ShieldCheck,
  Download,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Card3D } from '../components/Card3D';

interface OrderItem {
  id: string;
  material: string;
  buyer: string;
  buyerLocation: string;
  qty: string;
  amount: string;
  status: 'Order Received' | 'Confirmed' | 'Dispatched' | 'Delivered';
  steps: string[];
  currentStep: number;
  date: string;
  eta: string;
  vehicleNo: string;
  driverName: string;
  driverPhone: string;
  ewayBill: string;
  heatNo: string;
}

const INITIAL_ORDERS: OrderItem[] = [
  {
    id: 'ORD-1156',
    material: 'MS Sheet 3mm',
    buyer: 'Ravi Precision Fabrication Works',
    buyerLocation: 'Plot 42, Sector 7, Bhosari MIDC, Pune 411026',
    qty: '500 kg',
    amount: '₹27,000',
    status: 'Dispatched',
    steps: ['Order Received', 'Confirmed', 'Dispatched', 'Delivered'],
    currentStep: 2,
    date: '20 Nov 2026',
    eta: '22 Nov 2026 (On Schedule)',
    vehicleNo: 'MH-12-PQ-4821 (Tata 407 LCV)',
    driverName: 'Ramesh Shinde',
    driverPhone: '+91 98220 48192',
    ewayBill: '2810 4910 8492',
    heatNo: 'H-8492 / IS 2062 E250',
  },
  {
    id: 'ORD-1155',
    material: 'GI Sheets (0.8mm)',
    buyer: 'Sharma Sheet Metal',
    buyerLocation: 'Plot 18, Phase 2, Peenya Industrial Area, Bangalore 560058',
    qty: '800 kg',
    amount: '₹73,200',
    status: 'Delivered',
    steps: ['Order Received', 'Confirmed', 'Dispatched', 'Delivered'],
    currentStep: 3,
    date: '15 Nov 2026',
    eta: 'Delivered on 18 Nov',
    vehicleNo: 'KA-04-E-9021 (Eicher Pro)',
    driverName: 'Suresh Kumar',
    driverPhone: '+91 97401 29481',
    ewayBill: '1940 3829 1049',
    heatNo: 'GI-3829 / IS 277',
  },
  {
    id: 'ORD-1154',
    material: 'CRCA Coils',
    buyer: 'Mehta Fab Works',
    buyerLocation: 'Gala 12, Chakan Industrial Corridor, Pune 410501',
    qty: '1,200 kg',
    amount: '₹84,000',
    status: 'Confirmed',
    steps: ['Order Received', 'Confirmed', 'Dispatched', 'Delivered'],
    currentStep: 1,
    date: '18 Nov 2026',
    eta: '25 Nov 2026',
    vehicleNo: 'MH-14-BT-1102 (Mahindra Bolero Maxi)',
    driverName: 'Kailash Patil',
    driverPhone: '+91 98231 90812',
    ewayBill: '7829 1049 2831',
    heatNo: 'CR-9041 / IS 513',
  },
  {
    id: 'ORD-1153',
    material: 'SS Round Bar 304',
    buyer: 'Kumar Engineers',
    buyerLocation: 'Block C, Pimpri Industrial Belt, Pune 411018',
    qty: '300 kg',
    amount: '₹73,500',
    status: 'Delivered',
    steps: ['Order Received', 'Confirmed', 'Dispatched', 'Delivered'],
    currentStep: 3,
    date: '10 Nov 2026',
    eta: 'Delivered on 14 Nov',
    vehicleNo: 'MH-12-TR-3391 (Tata Ace)',
    driverName: 'Vikas Jadhav',
    driverPhone: '+91 98229 11849',
    ewayBill: '5920 1849 2819',
    heatNo: 'SS-304-X81 / ASTM A276',
  },
  {
    id: 'ORD-1152',
    material: 'MS Plates (10mm)',
    buyer: 'VK Fabricators',
    buyerLocation: 'W-92, TTC Industrial Area, MIDC Pawane, Navi Mumbai 400705',
    qty: '200 kg',
    amount: '₹11,600',
    status: 'Order Received',
    steps: ['Order Received', 'Confirmed', 'Dispatched', 'Delivered'],
    currentStep: 0,
    date: '20 Nov 2026',
    eta: '28 Nov 2026',
    vehicleNo: 'Pending Dispatch Assignment',
    driverName: 'Unassigned',
    driverPhone: '—',
    ewayBill: 'Draft in Progress',
    heatNo: 'H-1049 / IS 2062',
  },
];

const statusColor: Record<string, string> = {
  Dispatched: 'bg-blue-100 text-blue-800 border border-blue-200',
  Delivered: 'bg-emerald-100 text-emerald-800 border border-emerald-200',
  Confirmed: 'bg-purple-100 text-purple-800 border border-purple-200',
  'Order Received': 'bg-amber-100 text-amber-800 border border-amber-200',
};

export const SellerOrders: React.FC = () => {
  const { showToast } = useApp();
  const [orders, setOrders] = useState<OrderItem[]>(INITIAL_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);

  // Advance Order Pipeline
  const handleUpdateStatus = (orderId: string) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;

        if (order.currentStep >= order.steps.length - 1) {
          showToast(`Order #${order.id} is already Delivered!`, 'info');
          return order;
        }

        const nextStep = order.currentStep + 1;
        const newStatus = order.steps[nextStep] as OrderItem['status'];

        showToast(
          `Order #${order.id} updated: advanced to "${newStatus}"!`,
          'success'
        );

        return {
          ...order,
          currentStep: nextStep,
          status: newStatus,
          eta: newStatus === 'Delivered' ? 'Delivered Just Now ✓' : order.eta,
        };
      })
    );
  };

  return (
    <div className="space-y-6 pb-12 select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-black text-2xl text-white">Orders &amp; Delivery Tracking</h1>
          <p className="text-[#F8C8BE] text-sm mt-0.5">
            {orders.length} active orders • {orders.filter((o) => o.status === 'Delivered').length} fulfilled &amp; delivered
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-white/90 bg-white/20 border border-white/30 px-3 py-1.5 rounded-2xl shadow-sm">
            🚚 Live Fleet &amp; Dispatch Active
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <Card3D
            key={order.id}
            className="bg-white/95 backdrop-blur-md rounded-3xl border-2 border-white/80 shadow-[0_12px_28px_rgba(0,0,0,0.14)] p-6 text-[#1E1638]"
          >
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">
              <div className="flex-1">
                {/* Header row */}
                <div className="flex flex-wrap items-center gap-2.5 mb-2">
                  <span className="text-xs font-bold text-slate-400 font-mono">#{order.id}</span>
                  <span className={`text-xs font-black px-3 py-0.5 rounded-full ${statusColor[order.status] ?? 'bg-slate-100 text-slate-600'}`}>
                    {order.status}
                  </span>
                  {order.status === 'Dispatched' && (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full animate-pulse">
                      <Truck className="w-3 h-3" /> In Transit
                    </span>
                  )}
                </div>

                <h3 className="font-heading font-black text-xl text-[#1E1638]">{order.material}</h3>

                <div className="flex flex-wrap gap-4 mt-2.5 text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1.5 text-slate-800 font-bold">
                    <Package className="w-4 h-4 text-[#523D8A]" />
                    {order.buyer}
                  </span>
                  <span className="text-slate-800 font-bold bg-slate-100 px-2.5 py-0.5 rounded-lg">{order.qty}</span>
                  <span className="font-black text-amber-800 bg-[#FEF3D6] px-2.5 py-0.5 rounded-lg">{order.amount}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    Ordered: {order.date}
                  </span>
                  {order.eta !== '—' && (
                    <span className="flex items-center gap-1 text-[#523D8A] font-bold bg-[#EFEBF8] px-2.5 py-0.5 rounded-lg">
                      <Truck className="w-3.5 h-3.5" />
                      ETA: {order.eta}
                    </span>
                  )}
                </div>

                {/* Progress pipeline */}
                <div className="mt-6 flex items-center gap-0">
                  {order.steps.map((step, i) => {
                    const done = i <= order.currentStep;
                    const active = i === order.currentStep;
                    const isLast = i === order.steps.length - 1;
                    return (
                      <React.Fragment key={step}>
                        <div className="flex flex-col items-center">
                          <button
                            type="button"
                            onClick={() => handleUpdateStatus(order.id)}
                            title={`Click to set stage to ${step}`}
                            className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-md transition-all cursor-pointer ${
                              done
                                ? active
                                  ? 'bg-[#523D8A] text-white ring-4 ring-[#523D8A]/25'
                                  : 'bg-emerald-600 text-white'
                                : 'bg-slate-200 text-slate-400 hover:bg-slate-300'
                            }`}
                          >
                            {done && !active ? (
                              <CheckCircle2 className="w-4 h-4" />
                            ) : active ? (
                              <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                            ) : (
                              <span className="text-[11px] font-bold">{i + 1}</span>
                            )}
                          </button>
                          <span
                            className={`text-[10px] font-bold mt-2 text-center max-w-[70px] leading-tight ${
                              done ? 'text-slate-900' : 'text-slate-400'
                            }`}
                          >
                            {step}
                          </span>
                        </div>
                        {!isLast && (
                          <div
                            className={`h-1.5 flex-1 mx-1.5 mb-5 rounded-full transition-all duration-300 ${
                              i < order.currentStep ? 'bg-[#523D8A]' : 'bg-slate-200'
                            }`}
                          />
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-row lg:flex-col gap-2.5 shrink-0 self-end lg:self-start mt-2 lg:mt-0">
                {order.status !== 'Delivered' ? (
                  <button
                    type="button"
                    onClick={() => handleUpdateStatus(order.id)}
                    className="px-5 py-2.5 rounded-2xl bg-[#523D8A] hover:bg-[#3E2C6B] text-white text-xs font-heading font-black transition-all shadow-[0_4px_0_#2b1a52,0_8px_16px_rgba(82,61,138,0.35)] active:translate-y-1 active:shadow-[0_1px_0_#2b1a52] flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Update Status</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <span className="px-4 py-2 rounded-2xl bg-emerald-50 text-emerald-800 text-xs font-heading font-black flex items-center justify-center gap-1.5 border border-emerald-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Fulfilled
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => setSelectedOrder(order)}
                  className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-500" />
                  View Details
                </button>
              </div>
            </div>
          </Card3D>
        ))}
      </div>

      {/* ── INTERACTIVE ORDER DETAILS MODAL ── */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-150">
          <div className="w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-white/60 text-[#1E1638] relative overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-[#EFEBF8] text-[#523D8A]">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-black text-xl text-[#1E1638]">
                      Order #{selectedOrder.id}
                    </span>
                    <span className={`text-xs font-black px-2.5 py-0.5 rounded-full ${statusColor[selectedOrder.status]}`}>
                      {selectedOrder.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium">
                    {selectedOrder.material} • Total: {selectedOrder.amount}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="p-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body Details */}
            <div className="py-5 space-y-4 text-xs">
              {/* Buyer & Delivery Cluster */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                  BUYER &amp; DELIVERY CLUSTER
                </span>
                <p className="font-heading font-black text-sm text-slate-900">{selectedOrder.buyer}</p>
                <p className="flex items-start gap-1.5 text-slate-600 mt-1 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  {selectedOrder.buyerLocation}
                </p>
              </div>

              {/* Logistics & Dispatch Fleet */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-[#EFEBF8] border border-[#D2C6EA]">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#523D8A] block mb-1">
                    DISPATCH VEHICLE
                  </span>
                  <p className="font-bold text-slate-900 text-xs">{selectedOrder.vehicleNo}</p>
                  <p className="text-slate-600 mt-1 flex items-center gap-1">
                    <Phone className="w-3 h-3 text-[#523D8A]" />
                    Driver: {selectedOrder.driverName} ({selectedOrder.driverPhone})
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FEF3D6] border border-amber-200">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 block mb-1">
                    E-WAY BILL &amp; COMPLIANCE
                  </span>
                  <p className="font-bold text-slate-900 text-xs">{selectedOrder.ewayBill}</p>
                  <p className="text-slate-600 mt-1 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    Heat / Batch No: {selectedOrder.heatNo}
                  </p>
                </div>
              </div>

              {/* Live Status Pipeline in Modal */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    DISPATCH PROGRESS (CLICK TO ADVANCE)
                  </span>
                  <span className="text-xs font-bold text-[#523D8A]">Step {selectedOrder.currentStep + 1} of 4</span>
                </div>
                <div className="flex gap-2">
                  {selectedOrder.steps.map((st, i) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => {
                        handleUpdateStatus(selectedOrder.id);
                        setSelectedOrder((prev) =>
                          prev
                            ? {
                                ...prev,
                                currentStep: Math.min(prev.currentStep + 1, 3),
                                status: prev.steps[Math.min(prev.currentStep + 1, 3)] as OrderItem['status'],
                              }
                            : null
                        );
                      }}
                      className={`flex-1 py-2 rounded-xl text-[10px] font-black transition-all ${
                        i <= selectedOrder.currentStep
                          ? 'bg-[#523D8A] text-white shadow-sm'
                          : 'bg-slate-200 text-slate-500 hover:bg-slate-300'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-3 justify-end">
              <button
                type="button"
                onClick={() => {
                  showToast(`Dispatch Challan for #${selectedOrder.id} downloaded!`, 'success');
                }}
                className="px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5 text-slate-600" />
                Download Delivery Challan
              </button>

              <button
                type="button"
                onClick={() => {
                  handleUpdateStatus(selectedOrder.id);
                  setSelectedOrder(null);
                }}
                className="px-5 py-2.5 rounded-2xl bg-[#523D8A] hover:bg-[#3E2C6B] text-white text-xs font-heading font-black transition-all shadow-[0_4px_0_#2b1a52] active:translate-y-1 active:shadow-none flex items-center gap-1.5"
              >
                <span>Advance to Next Step</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
