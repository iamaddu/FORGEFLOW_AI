import React from 'react';
import {
  X,
  Sparkles,
  ArrowRight,
  ShoppingCart,
  Calculator,
  Receipt,
  CheckCircle2,
  AlertTriangle,
  Truck,
  MessageSquare,
  FileText
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const RaviStoryModal: React.FC = () => {
  const { isStoryModalOpen, setIsStoryModalOpen, setCurrentPage } = useApp();

  if (!isStoryModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-5xl bg-[#523D8A] rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-white/40 text-white overflow-hidden max-h-[92vh] flex flex-col relative">
        {/* Top Header matching Slide 1 & 2 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/20">
          <div className="flex items-center gap-4">
            <div className="bg-[#F8C8BE] text-[#1E1638] px-5 py-2 rounded-2xl font-heading font-black text-xl shadow-md tracking-tight">
              A day with ForgeFlow
            </div>
            <span className="text-xs sm:text-sm text-white font-medium hidden md:inline">
              Illustrative scenario: Ravi runs a small fabrication unit in Bhosari, Pune.
            </span>
          </div>

          <button
            onClick={() => setIsStoryModalOpen(false)}
            className="self-end sm:self-auto p-2 rounded-2xl bg-white/20 hover:bg-white text-white hover:text-[#523D8A] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Story Panels Grid */}
        <div className="overflow-y-auto py-6 space-y-6 flex-1 pr-1">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {/* Panel 1: Meet Ravi (Big Hero Card) */}
            <div className="md:col-span-5 bg-white text-[#1E1638] rounded-3xl p-5 shadow-card flex flex-col justify-between border-2 border-white">
              <div className="relative rounded-2xl overflow-hidden min-h-[220px]">
                <img
                  src="./ravi-workshop.jpg"
                  alt="Ravi's fabrication workshop"
                  className="w-full h-full object-cover object-center rounded-2xl"
                  style={{ minHeight: 220, maxHeight: 260 }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-2xl">
                  <div className="text-white font-heading font-black text-sm">Ravi's Fabrication Unit</div>
                  <div className="text-white/80 text-[11px] font-medium">Bhosari MIDC, Pune • Precision Sheet Metal</div>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-black text-white font-black flex items-center justify-center text-xs shrink-0">
                  1
                </span>
                <span className="font-heading font-black text-sm text-[#1E1638] leading-snug">
                  Meet Ravi. A customer enquiry just arrived.
                </span>
              </div>
            </div>

            {/* Panels 2, 3, 4 */}
            <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Panel 2 */}
              <div className="bg-white text-[#1E1638] rounded-3xl p-4 shadow-card flex flex-col justify-between">
                <div className="bg-[#EFEBF8] rounded-2xl p-3 flex flex-col items-center justify-center min-h-[140px] text-center">
                  <div className="text-2xl mb-1">📱</div>
                  <div className="w-full space-y-1 text-[10px] font-bold">
                    <div className="bg-[#523D8A] text-white py-1 px-2 rounded-xl">
                      Supplier A: ₹50/kg + ₹500
                    </div>
                    <div className="bg-[#3E2C6B] text-white py-1 px-2 rounded-xl">
                      Supplier B: ₹48/kg + ₹1,500
                    </div>
                    <div className="bg-[#F5A636] text-[#1E1638] py-1 px-2 rounded-xl">
                      Supplier C: ₹52/kg (Free)
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-black text-white font-black flex items-center justify-center text-xs shrink-0 mt-0.5">
                    2
                  </span>
                  <span className="text-xs font-bold text-[#1E1638] leading-tight">
                    Three quotes land on WhatsApp and PDF.
                  </span>
                </div>
              </div>

              {/* Panel 3 */}
              <div className="bg-white text-[#1E1736] rounded-3xl p-4 shadow-card flex flex-col justify-between">
                <div className="bg-[#FEF3D6] rounded-2xl p-3 flex flex-col items-center justify-center min-h-[140px] text-center">
                  <span className="text-[10px] font-bold text-slate-700 mb-1">Landed cost (₹/kg)</span>
                  <div className="flex items-end gap-2 h-16 w-full justify-center px-2">
                    <div className="w-4 bg-[#60A5FA] rounded-t-lg" style={{ height: '70%' }} />
                    <div className="w-4 bg-[#F87171] rounded-t-lg" style={{ height: '95%' }} />
                    <div className="w-4 bg-[#10B981] rounded-t-lg" style={{ height: '65%' }} />
                  </div>
                  <span className="text-[10px] text-emerald-800 font-bold mt-1">✓ Supplier A wins true landed</span>
                </div>
                <div className="mt-3 flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-black text-white font-black flex items-center justify-center text-xs shrink-0 mt-0.5">
                    3
                  </span>
                  <span className="text-xs font-bold text-[#1E1638] leading-tight">
                    ForgeFlow compares landed cost.
                  </span>
                </div>
              </div>

              {/* Panel 4 */}
              <div className="bg-white text-[#1E1638] rounded-3xl p-3.5 shadow-card flex flex-col justify-between">
                <div className="bg-[#F8C8BE] rounded-2xl p-2.5 flex flex-col justify-center min-h-[140px] text-[10px]">
                  <div className="font-black text-slate-900 text-xs mb-1">Quote SO-1042</div>
                  <div className="flex justify-between text-slate-800 font-medium"><span>Material:</span><span>₹20,000</span></div>
                  <div className="flex justify-between text-slate-800 font-medium"><span>Labour:</span><span>₹5,000</span></div>
                  <div className="flex justify-between text-slate-800 font-medium"><span>Overhead:</span><span>₹3,000</span></div>
                  <div className="border-t border-slate-300 mt-1 pt-1 flex justify-between font-black text-slate-900">
                    <span>Total Cost:</span><span>₹28,000</span>
                  </div>
                  <div className="mt-1.5 bg-[#10B981] text-white p-1 rounded-xl font-black text-center text-[10px]">
                    Quote: ₹35,000 (20% Margin)
                  </div>
                </div>
                <div className="mt-3 flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-black text-white font-black flex items-center justify-center text-xs shrink-0 mt-0.5">
                    4
                  </span>
                  <span className="text-xs font-bold text-[#1E1638] leading-tight">
                    Costing builds a margin-aware quote.
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Row: Panels 5, 6 and Intended Outcome Box */}
            <div className="md:col-span-12 grid grid-cols-1 sm:grid-cols-3 gap-5">
              {/* Panel 5 */}
              <div className="bg-white text-[#1E1638] rounded-3xl p-5 shadow-card flex flex-col justify-between">
                <div className="bg-[#FEF2F2] border border-rose-200 rounded-2xl p-3 flex flex-col justify-center min-h-[130px] text-xs">
                  <div className="flex items-center gap-2 text-rose-600 font-bold mb-1">
                    <AlertTriangle className="w-4 h-4" />
                    <span>OCR Discrepancy</span>
                  </div>
                  <div className="text-[11px] text-slate-800 space-y-0.5 font-medium">
                    <p>Invoice total: <strong>₹5,500</strong></p>
                    <p>Accepted quote: <strong>₹5,200</strong></p>
                  </div>
                  <div className="mt-2 bg-rose-500 text-white font-bold text-[10px] py-1 px-2 rounded-xl text-center">
                    ₹300 gap flagged early!
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-full bg-black text-white font-black flex items-center justify-center text-xs shrink-0">
                    5
                  </span>
                  <span className="text-xs font-bold text-[#1E1638]">
                    Invoice mismatch is flagged early.
                  </span>
                </div>
              </div>

              {/* Panel 6 */}
              <div className="bg-white text-[#1E1638] rounded-3xl p-5 shadow-card flex flex-col justify-between">
                <div className="bg-emerald-50 rounded-2xl p-3 flex flex-col items-center justify-center min-h-[130px] text-center border border-emerald-200">
                  <div className="w-10 h-10 rounded-full bg-[#10B981] text-white flex items-center justify-center text-lg mb-2 shadow-sm font-bold">
                    ✓
                  </div>
                  <span className="font-heading font-black text-sm text-emerald-900">
                    Quote Sent & Accepted
                  </span>
                  <span className="text-[10px] text-emerald-700 mt-0.5 font-bold">
                    Order goes out on time
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-full bg-black text-white font-black flex items-center justify-center text-xs shrink-0">
                    6
                  </span>
                  <span className="text-xs font-bold text-[#1E1638]">
                    Ravi approves. The order goes out.
                  </span>
                </div>
              </div>

              {/* Intended Outcome Card (Slide 1 Pink Card) */}
              <div className="bg-[#F8C8BE] text-[#1E1638] rounded-3xl p-5 shadow-card flex flex-col justify-between border border-[#F5C5B8]">
                <div>
                  <span className="text-[11px] uppercase font-mono tracking-wider font-black text-[#523D8A] block mb-2">
                    INTENDED OUTCOME
                  </span>
                  <h4 className="font-heading font-black text-xl text-[#1E1638] leading-tight">
                    Faster, clearer quotes. <br />
                    Margin visible before the order. <br />
                    Records organised.
                  </h4>
                </div>
                <p className="text-[10px] text-slate-700 italic mt-3 font-medium">
                  Not a guarantee. Sample figures.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span className="text-white font-medium">
            Test this workflow in your workshop right now:
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setIsStoryModalOpen(false);
                setCurrentPage('procurement');
              }}
              className="px-5 py-2.5 rounded-2xl bg-[#F5A636] hover:bg-[#e59524] text-[#1E1638] font-heading font-black transition-all shadow-md"
            >
              Open Smart Procurement
            </button>
            <button
              onClick={() => setIsStoryModalOpen(false)}
              className="px-4 py-2 rounded-2xl bg-white/20 hover:bg-white text-white hover:text-[#523D8A] font-bold"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
