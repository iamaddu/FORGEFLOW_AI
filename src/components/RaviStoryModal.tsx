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
      <div className="w-full max-w-5xl bg-[#4E3C80] rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-[#3B2C63] text-white overflow-hidden max-h-[92vh] flex flex-col relative">
        {/* Top Header matching the uploaded image */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/20">
          <div className="flex items-center gap-4">
            <div className="bg-[#FAD5C8] text-[#1E1736] px-5 py-2 rounded-2xl font-heading font-black text-xl shadow-md tracking-tight">
              A day with ForgeFlow
            </div>
            <span className="text-xs sm:text-sm text-[#E8E2F6] font-medium hidden md:inline">
              Illustrative scenario: Ravi runs a small fabrication unit.
            </span>
          </div>

          <button
            onClick={() => setIsStoryModalOpen(false)}
            className="self-end sm:self-auto p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Story Panels Grid */}
        <div className="overflow-y-auto py-6 space-y-6 flex-1 pr-1">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {/* Panel 1: Meet Ravi (Big Hero Card - 5 cols) */}
            <div className="md:col-span-5 bg-white text-[#1E1736] rounded-2xl p-5 shadow-card flex flex-col justify-between border-2 border-slate-100">
              <div className="relative rounded-xl overflow-hidden bg-gradient-to-b from-[#FEF3D6] to-[#E8E2F6] p-5 flex flex-col items-center justify-center min-h-[220px]">
                {/* Visual of Fabrication Unit with Ravi */}
                <div className="w-20 h-20 rounded-full bg-[#F9C349] flex items-center justify-center shadow-md mb-3 text-3xl">
                  👨🏽‍🏭
                </div>
                <div className="text-center">
                  <div className="font-heading font-black text-lg text-[#1E1736]">
                    Ravi's Fabrication Unit
                  </div>
                  <div className="text-xs text-slate-600 mt-1">
                    Bhosari MIDC, Pune • Sheet Metal & Heavy Works
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2 text-xs bg-white/80 px-3 py-1 rounded-full text-slate-700 font-medium">
                  <Truck className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>Raw material arriving at Gate 2</span>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-black text-white font-bold flex items-center justify-center text-xs shrink-0">
                  1
                </span>
                <span className="font-heading font-bold text-sm text-[#1E1736] leading-snug">
                  Meet Ravi. A customer enquiry just arrived.
                </span>
              </div>
            </div>

            {/* Panels 2, 3, 4 (Right Top 7 cols - grid of 3) */}
            <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Panel 2: Three quotes land */}
              <div className="bg-white text-[#1E1736] rounded-2xl p-4 shadow-card flex flex-col justify-between border-2 border-slate-100">
                <div className="bg-[#E8E2F6] rounded-xl p-3 flex flex-col items-center justify-center min-h-[140px] text-center">
                  <div className="text-2xl mb-1">📱</div>
                  <div className="w-full space-y-1 text-[10px]">
                    <div className="bg-[#4E3C80] text-white py-1 px-2 rounded font-medium">
                      Supplier A: ₹50/kg + ₹500
                    </div>
                    <div className="bg-[#3B2C63] text-white py-1 px-2 rounded font-medium">
                      Supplier B: ₹48/kg + ₹1,500
                    </div>
                    <div className="bg-[#E5A84B] text-slate-900 py-1 px-2 rounded font-bold">
                      Supplier C: ₹52/kg (Free)
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-black text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                    2
                  </span>
                  <span className="text-xs font-semibold text-[#1E1736] leading-tight">
                    Three quotes land on WhatsApp and PDF.
                  </span>
                </div>
              </div>

              {/* Panel 3: ForgeFlow compares landed cost */}
              <div className="bg-white text-[#1E1736] rounded-2xl p-4 shadow-card flex flex-col justify-between border-2 border-slate-100">
                <div className="bg-[#FEF3D6] rounded-xl p-3 flex flex-col items-center justify-center min-h-[140px] text-center">
                  <span className="text-[10px] font-bold text-slate-700 mb-1">Landed cost (₹/kg)</span>
                  <div className="flex items-end gap-2 h-16 w-full justify-center px-2">
                    <div className="w-4 bg-[#60A5FA] rounded-t" style={{ height: '70%' }} />
                    <div className="w-4 bg-[#F87171] rounded-t" style={{ height: '95%' }} />
                    <div className="w-4 bg-[#10B981] rounded-t" style={{ height: '65%' }} />
                  </div>
                  <span className="text-[9px] text-emerald-700 font-bold mt-1">✓ Supplier A wins true landed</span>
                </div>
                <div className="mt-3 flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-black text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                    3
                  </span>
                  <span className="text-xs font-semibold text-[#1E1736] leading-tight">
                    ForgeFlow compares true landed cost.
                  </span>
                </div>
              </div>

              {/* Panel 4: Costing builds quote */}
              <div className="bg-white text-[#1E1736] rounded-2xl p-4 shadow-card flex flex-col justify-between border-2 border-slate-100">
                <div className="bg-[#FDECE6] rounded-xl p-2.5 flex flex-col justify-center min-h-[140px] text-[10px]">
                  <div className="font-bold text-slate-800 text-[11px] mb-1">Quote SO-1042</div>
                  <div className="flex justify-between text-slate-600"><span>Material:</span><span>₹20,000</span></div>
                  <div className="flex justify-between text-slate-600"><span>Labour:</span><span>₹5,000</span></div>
                  <div className="flex justify-between text-slate-600"><span>Overheads:</span><span>₹3,000</span></div>
                  <div className="border-t border-slate-300 mt-1 pt-1 flex justify-between font-bold text-slate-900">
                    <span>Total Cost:</span><span>₹28,000</span>
                  </div>
                  <div className="mt-1.5 bg-[#10B981] text-white p-1 rounded font-bold text-center text-[10px]">
                    Quote: ₹35,000 (20% Margin)
                  </div>
                </div>
                <div className="mt-3 flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-black text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                    4
                  </span>
                  <span className="text-xs font-semibold text-[#1E1736] leading-tight">
                    Costing builds a margin-aware quote.
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Row: Panels 5, 6 and Intended Outcome Box */}
            <div className="md:col-span-12 grid grid-cols-1 sm:grid-cols-3 gap-5">
              {/* Panel 5: Invoice mismatch flagged */}
              <div className="bg-white text-[#1E1736] rounded-2xl p-5 shadow-card flex flex-col justify-between border-2 border-slate-100">
                <div className="bg-[#FEF2F2] border border-rose-200 rounded-xl p-3 flex flex-col justify-center min-h-[130px] text-xs">
                  <div className="flex items-center gap-2 text-rose-600 font-bold mb-1">
                    <AlertTriangle className="w-4 h-4" />
                    <span>OCR Discrepancy</span>
                  </div>
                  <div className="text-[11px] text-slate-700 space-y-0.5">
                    <p>Invoice total: <strong>₹5,500</strong></p>
                    <p>Accepted quote: <strong>₹5,200</strong></p>
                  </div>
                  <div className="mt-2 bg-rose-500 text-white font-bold text-[10px] py-1 px-2 rounded text-center">
                    ₹300 freight gap flagged early!
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-black text-white font-bold flex items-center justify-center text-xs shrink-0">
                    5
                  </span>
                  <span className="text-xs font-semibold text-[#1E1736]">
                    Invoice mismatch is flagged early.
                  </span>
                </div>
              </div>

              {/* Panel 6: Ravi approves. Order goes out */}
              <div className="bg-white text-[#1E1736] rounded-2xl p-5 shadow-card flex flex-col justify-between border-2 border-slate-100">
                <div className="bg-[#D1FAE5] rounded-xl p-3 flex flex-col items-center justify-center min-h-[130px] text-center">
                  <div className="w-10 h-10 rounded-full bg-[#10B981] text-white flex items-center justify-center text-lg mb-2 shadow-sm">
                    ✓
                  </div>
                  <span className="font-heading font-black text-sm text-emerald-900">
                    Quotation Approved
                  </span>
                  <span className="text-[10px] text-emerald-700 mt-0.5">
                    Customer PO received • Profit locked
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-black text-white font-bold flex items-center justify-center text-xs shrink-0">
                    6
                  </span>
                  <span className="text-xs font-semibold text-[#1E1736]">
                    Ravi approves. The order goes out.
                  </span>
                </div>
              </div>

              {/* Intended Outcome Card (Coral-Peach Box matching screenshot) */}
              <div className="bg-[#FAD5C8] text-[#1E1736] rounded-2xl p-5 shadow-card flex flex-col justify-between border-2 border-[#F8C4B4]">
                <div>
                  <span className="text-[11px] uppercase font-mono tracking-wider font-bold text-[#4E3C80] block mb-2">
                    INTENDED OUTCOME
                  </span>
                  <h4 className="font-heading font-black text-lg text-[#1E1736] leading-snug">
                    Faster, clearer quotes. <br />
                    Margin visible before order. <br />
                    Records organised.
                  </h4>
                </div>
                <p className="text-[10px] text-slate-600 italic mt-3">
                  Designed specifically for Indian MSME fabricators.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer with quick jump */}
        <div className="pt-4 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span className="text-[#E8E2F6]">
            Try this workflow in ForgeFlow AI right now:
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setIsStoryModalOpen(false);
                setCurrentPage('procurement');
              }}
              className="px-4 py-2 rounded-xl bg-[#FAD5C8] hover:bg-[#f6c6b6] text-[#1E1736] font-bold transition-all shadow-md"
            >
              Test Landed Cost Matrix
            </button>
            <button
              onClick={() => setIsStoryModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
