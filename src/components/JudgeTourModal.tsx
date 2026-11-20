import React, { useState } from 'react';
import {
  X,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShoppingCart,
  Calculator,
  FileSpreadsheet,
  Receipt,
  RotateCcw,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';
import { useApp, PageId } from '../context/AppContext';

interface Step {
  step: number;
  title: string;
  description: string;
  page: PageId;
  actionText: string;
  keyHighlight: string;
}

const TOUR_STEPS: Step[] = [
  {
    step: 1,
    title: 'Executive Dashboard & Smart Insight',
    description: 'Explore the high-level manufacturing cockpit: ₹4.8L procurement spend, 12 active suppliers, order profitability trends, and the smart insight flagging that current quotes are 8% above lowest offer.',
    page: 'dashboard',
    actionText: 'Go to Dashboard',
    keyHighlight: 'Notice the visual parity with the approved design, live reactive metrics, and alert triggers.'
  },
  {
    step: 2,
    title: 'Smart Procurement & Landed Cost Engine',
    description: 'Inspect material requirement "MS Steel Sheet 3mm" where 3 suppliers have submitted bids.',
    page: 'procurement',
    actionText: 'View Smart Procurement',
    keyHighlight: 'Account for freight, GST, and payment terms — not just headline unit rates.'
  },
  {
    step: 3,
    title: 'The Landed Cost Paradigm Shift (Supplier A vs B vs C)',
    description: 'Supplier B quotes ₹48/kg (lowest base price!), but charges ₹1,500 delivery. Supplier A quotes ₹50/kg with ₹500 delivery, and Supplier C quotes ₹52/kg with free delivery.',
    page: 'procurement',
    actionText: 'Inspect Comparison Matrix',
    keyHighlight: 'ForgeFlow automatically proves how hidden freight makes Supplier A the superior landed choice!'
  },
  {
    step: 4,
    title: 'Intelligent Production Costing',
    description: 'Open manufacturing order #ORD-2025-243 ("Heavy Flange Assembly - Model F75"). All cost centers are structured deterministically.',
    page: 'costing',
    actionText: 'Open Intelligent Costing',
    keyHighlight: 'Includes Raw Material, Labour, Machine Hour rate, Overheads, and Scrap Recovery.'
  },
  {
    step: 5,
    title: 'Dynamic Profit Margin Recalculation',
    description: 'Drag the target margin slider between 5% and 50%. The suggested selling price and gross profit recalculate in real-time.',
    page: 'costing',
    actionText: 'Adjust Profit Margins',
    keyHighlight: 'Uses deterministic gross margin formula: Price = Cost / (1 - Margin%). No random AI hallucinations.'
  },
  {
    step: 6,
    title: 'Professional Quotation Generator & Export',
    description: 'Select an order, verify customer GSTIN & billing location, and preview the proforma quotation with HSN codes, CGST/SGST/IGST, and payment terms.',
    page: 'quotations',
    actionText: 'Generate Customer Quotation',
    keyHighlight: 'One-click Print or Export to high-resolution PDF for immediate customer delivery.'
  },
  {
    step: 7,
    title: 'Invoice Intelligence & GST OCR Extraction',
    description: 'Review scanned supplier tax invoices (e.g., INV-1042). The system extracts GSTIN, invoice date, HSN breakdown, and flags missing E-Way Bills.',
    page: 'invoices',
    actionText: 'Test Invoice Intelligence',
    keyHighlight: 'Upload any invoice image/PDF or test with pre-loaded samples to see instant OCR parsing.'
  },
  {
    step: 8,
    title: 'Supplier Performance & Directory',
    description: 'Track vendor reliability, on-time delivery percentages (97% for Apex Steel), price history, and contact dossiers.',
    page: 'suppliers',
    actionText: 'Explore Supplier Directory',
    keyHighlight: 'Keep institutional supplier knowledge centralized rather than lost in WhatsApp chats.'
  },
  {
    step: 9,
    title: 'Business Insights & Spend Analytics',
    description: 'Review monthly spend patterns, material price inflation benchmarks, order margin distributions, and GST 2B reconciliation readiness.',
    page: 'reports',
    actionText: 'View Business Analytics',
    keyHighlight: 'Full enterprise visibility designed specifically for Indian manufacturing MSMEs.'
  }
];

export const JudgeTourModal: React.FC = () => {
  const { isJudgeTourOpen, setIsJudgeTourOpen, setCurrentPage, resetToSampleData } = useApp();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  if (!isJudgeTourOpen) return null;

  const currentStep = TOUR_STEPS[currentStepIndex];

  const handleGoToStep = (index: number) => {
    setCurrentStepIndex(index);
    setCurrentPage(TOUR_STEPS[index].page);
  };

  const handleNext = () => {
    if (currentStepIndex < TOUR_STEPS.length - 1) {
      handleGoToStep(currentStepIndex + 1);
    } else {
      setIsJudgeTourOpen(false);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      handleGoToStep(currentStepIndex - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-3xl bg-[#101B2B] border border-[#1C2E46] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-5 border-b border-[#1C2E46] flex items-center justify-between bg-gradient-to-r from-[#132032] to-[#101B2B]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#E5A84B]/20 text-[#E5A84B]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
                Hackathon Judge Walkthrough Guide
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#16B8A5]/20 text-[#16B8A5]">
                  Demo Flow
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Step-by-step verification of problem statement 4.1 for MSME manufacturing
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsJudgeTourOpen(false)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-[#132032] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Progress Tracker */}
          <div className="flex items-center justify-between gap-1 bg-[#0A111D] p-2 rounded-xl border border-[#1C2E46]/60 overflow-x-auto">
            {TOUR_STEPS.map((s, idx) => (
              <button
                key={s.step}
                onClick={() => handleGoToStep(idx)}
                className={`flex items-center justify-center min-w-[32px] h-8 rounded-lg text-xs font-semibold transition-all shrink-0 ${
                  idx === currentStepIndex
                    ? 'bg-[#16B8A5] text-white shadow-glow'
                    : idx < currentStepIndex
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#132032]'
                }`}
                title={`Step ${s.step}: ${s.title}`}
              >
                {idx < currentStepIndex ? '✓' : s.step}
              </button>
            ))}
          </div>

          {/* Current Step Spotlight */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#132032] to-[#0D1624] border border-[#1C2E46] relative overflow-hidden">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#E5A84B] block mb-1">
                  Step {currentStep.step} of {TOUR_STEPS.length}
                </span>
                <h4 className="font-heading font-bold text-lg text-white">
                  {currentStep.title}
                </h4>
              </div>
              <button
                onClick={() => {
                  setCurrentPage(currentStep.page);
                  setIsJudgeTourOpen(false);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#16B8A5] hover:bg-[#13A291] text-[#0A111D] text-xs font-bold transition-all shadow-glow shrink-0"
              >
                <span>Jump to Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-sm text-slate-300 mt-3 leading-relaxed">
              {currentStep.description}
            </p>

            <div className="mt-4 p-3.5 rounded-xl bg-[#16B8A5]/10 border border-[#16B8A5]/30 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#16B8A5] shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-semibold text-white">Key Takeaway for Judges: </span>
                <span className="text-slate-300">{currentStep.keyHighlight}</span>
              </div>
            </div>
          </div>

          {/* All Steps Grid Preview */}
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Full Evaluation Sequence
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {TOUR_STEPS.map((s, idx) => (
                <div
                  key={s.step}
                  onClick={() => handleGoToStep(idx)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    idx === currentStepIndex
                      ? 'bg-[#182940] border-[#16B8A5]'
                      : 'bg-[#0A111D]/60 border-[#1C2E46] hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-mono text-[#E5A84B]">#{s.step}</span>
                    <span className="text-[10px] text-slate-400 uppercase">{s.page}</span>
                  </div>
                  <div className="font-medium text-xs text-slate-200 truncate">
                    {s.title}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sample Data Disclaimer Note */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-slate-400" />
              <span>All figures shown are illustrative demo values for hackathon simulation.</span>
            </span>
            <button
              onClick={resetToSampleData}
              className="text-[#E5A84B] hover:underline flex items-center gap-1 font-medium"
            >
              <RotateCcw className="w-3 h-3" />
              Reset Demo Data
            </button>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#1C2E46] bg-[#0A111D] flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            className="px-4 py-2 rounded-xl border border-[#1C2E46] text-slate-300 hover:text-white hover:bg-[#132032] text-xs font-medium disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            Previous
          </button>

          <div className="text-xs text-slate-400">
            Step <span className="text-white font-semibold">{currentStepIndex + 1}</span> of {TOUR_STEPS.length}
          </div>

          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-[#16B8A5] hover:bg-[#13A291] text-[#0A111D] text-xs font-bold transition-all shadow-glow"
          >
            <span>{currentStepIndex === TOUR_STEPS.length - 1 ? 'Finish Tour' : 'Next Step'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
