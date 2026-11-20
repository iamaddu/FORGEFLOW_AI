import React, { useState } from 'react';
import {
  ShoppingCart,
  Plus,
  TrendingDown,
  Award,
  AlertTriangle,
  Info,
  CheckCircle2,
  Trash2,
  ExternalLink,
  Clock,
  Truck,
  Sparkles,
  Sliders,
  DollarSign
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatINR, calculateQuoteLandedCost } from '../utils/calculations';

export const Procurement: React.FC = () => {
  const {
    materialRequirements,
    addMaterialRequirement,
    quotes,
    addQuote,
    deleteQuote,
    suppliers,
    setCurrentPage
  } = useApp();

  const [selectedReqId, setSelectedReqId] = useState<string>(
    materialRequirements[0]?.id || 'req-101'
  );

  const [showAddReqModal, setShowAddReqModal] = useState(false);
  const [showAddQuoteModal, setShowAddQuoteModal] = useState(false);

  const [simulationQty, setSimulationQty] = useState<number>(500);
  const [useSimulation, setUseSimulation] = useState<boolean>(false);

  // Form states for New Requirement
  const [reqTitle, setReqTitle] = useState('');
  const [reqCategory, setReqCategory] = useState('Ferrous Metals');
  const [reqQty, setReqQty] = useState('500');
  const [reqUnit, setReqUnit] = useState('kg');
  const [reqSpec, setReqSpec] = useState('IS 2062 Grade B, 3mm Thickness');
  const [reqLocation, setReqLocation] = useState('Bhosari Industrial Area, Pune (Gate 2)');

  // Form states for New Quote
  const [quoteSupplierId, setQuoteSupplierId] = useState(suppliers[0]?.id || '');
  const [quoteUnitPrice, setQuoteUnitPrice] = useState('51');
  const [quoteDelivery, setQuoteDelivery] = useState('800');
  const [quoteTaxRate, setQuoteTaxRate] = useState('18');
  const [quoteLeadDays, setQuoteLeadDays] = useState('3');
  const [quoteSpec, setQuoteSpec] = useState('Prime Quality with Mill TC');
  const [quoteNotes, setQuoteNotes] = useState('Standard payment terms apply.');

  const currentReq = materialRequirements.find(r => r.id === selectedReqId) || materialRequirements[0];
  const rawReqQuotes = quotes.filter(q => q.materialReqId === currentReq?.id);
  const effectiveQty = useSimulation ? simulationQty : currentReq?.quantity || 500;

  const displayQuotes = rawReqQuotes.map(q => {
    const calc = calculateQuoteLandedCost({
      unitPrice: q.unitPrice,
      quantity: effectiveQty,
      deliveryCharges: q.deliveryCharges,
      taxRatePercent: q.taxRatePercent
    });
    return {
      ...q,
      quantity: effectiveQty,
      ...calc
    };
  });

  const minEffectiveLanded = displayQuotes.length > 0 ? Math.min(...displayQuotes.map(q => q.effectiveCostPerUnit)) : 0;
  const enrichedQuotes = displayQuotes.map(q => ({
    ...q,
    isBestOffer: Math.abs(q.effectiveCostPerUnit - minEffectiveLanded) < 0.05
  }));

  const minUnitPrice = displayQuotes.length > 0 ? Math.min(...displayQuotes.map(q => q.unitPrice)) : 0;
  const lowestUnitPriceQuote = displayQuotes.find(q => Math.abs(q.unitPrice - minUnitPrice) < 0.01);
  const bestLandedQuote = enrichedQuotes.find(q => q.isBestOffer);

  const isTrapScenario = lowestUnitPriceQuote && bestLandedQuote && lowestUnitPriceQuote.id !== bestLandedQuote.id;

  const handleCreateRequirement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reqTitle) return;
    const newId = addMaterialRequirement({
      title: reqTitle,
      category: reqCategory,
      quantity: Number(reqQty) || 100,
      unit: reqUnit,
      gradeSpec: reqSpec,
      deliveryLocation: reqLocation,
      targetDate: new Date(Date.now() + 10 * 86400000).toISOString().split('T')[0]
    });
    setSelectedReqId(newId);
    setShowAddReqModal(false);
    setReqTitle('');
  };

  const handleCreateQuote = (e: React.FormEvent) => {
    e.preventDefault();
    const sup = suppliers.find(s => s.id === quoteSupplierId) || suppliers[0];
    addQuote({
      materialReqId: currentReq.id,
      supplierId: sup.id,
      supplierName: sup.name,
      materialSpec: quoteSpec,
      unitPrice: Number(quoteUnitPrice) || 0,
      quantity: effectiveQty,
      unit: currentReq.unit,
      deliveryCharges: Number(quoteDelivery) || 0,
      taxRatePercent: Number(quoteTaxRate) || 18,
      deliveryTimeDays: Number(quoteLeadDays) || 2,
      quotedDate: new Date().toISOString().split('T')[0],
      validUntil: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      notes: quoteNotes
    });
    setShowAddQuoteModal(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading font-black text-3xl text-white">Smart Procurement</h1>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FAD5C8] text-[#1E1736]">
              Landed Cost Engine
            </span>
          </div>
          <p className="text-xs text-[#E8E2F6] mt-1">
            Compare supplier quotations and calculate actual landed costs with freight, GST & lead-time parity.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddReqModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white text-[#1E1736] hover:bg-[#F3F0FA] text-xs font-bold transition-all shadow-md"
          >
            <Plus className="w-4 h-4 text-[#4E3C80]" />
            <span>New Requirement</span>
          </button>
          <button
            onClick={() => setShowAddQuoteModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#FAD5C8] hover:bg-[#f6c6b6] text-[#1E1736] text-xs font-heading font-black transition-all shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Add Supplier Quote</span>
          </button>
        </div>
      </div>

      {/* Requirement Selector Bar */}
      <div className="bg-white rounded-3xl p-4 shadow-card border-2 border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3 overflow-x-auto pb-1 md:pb-0">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0">
            Active Material:
          </span>
          {materialRequirements.map(req => (
            <button
              key={req.id}
              onClick={() => {
                setSelectedReqId(req.id);
                setSimulationQty(req.quantity);
              }}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                req.id === selectedReqId
                  ? 'bg-[#4E3C80] text-white shadow-md'
                  : 'bg-[#F3F0FA] text-slate-700 hover:text-black border border-[#D2C6EA]'
              }`}
            >
              <span>{req.title}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                req.id === selectedReqId ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {req.quantity} {req.unit}
              </span>
            </button>
          ))}
        </div>

        {currentReq && (
          <div className="text-xs text-slate-600 flex items-center gap-4 shrink-0 bg-[#F3F0FA] px-3.5 py-2 rounded-2xl border border-[#D2C6EA]">
            <div>
              <span className="text-slate-500">Spec: </span>
              <span className="font-bold text-slate-900">{currentReq.gradeSpec}</span>
            </div>
          </div>
        )}
      </div>

      {/* Dynamic Quantity & Freight Sensitivity Interactive Playground */}
      <div className="p-5 rounded-3xl bg-white text-[#1E1736] border-2 border-slate-100 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#E8E2F6] text-[#4E3C80]">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-heading font-black text-sm text-[#1E1736]">
                Interactive Landed Cost Sensitivity Simulator
              </h4>
              <p className="text-xs text-slate-500">
                Drag the order quantity to see how delivery charges and taxes shift the best deal between Supplier A, B & C!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
              <input
                type="checkbox"
                checked={useSimulation}
                onChange={(e) => setUseSimulation(e.target.checked)}
                className="rounded accent-[#4E3C80] w-4 h-4 cursor-pointer"
              />
              <span>Enable Volume Simulation</span>
            </label>

            {useSimulation && (
              <div className="flex items-center gap-2 bg-[#FAD5C8] px-3.5 py-1.5 rounded-2xl">
                <span className="text-xs font-bold text-slate-700">Batch:</span>
                <span className="font-heading font-black text-sm text-[#4E3C80]">
                  {simulationQty} {currentReq?.unit || 'kg'}
                </span>
              </div>
            )}
          </div>
        </div>

        {useSimulation && (
          <div className="mt-4 pt-4 border-t border-slate-200 flex items-center gap-4">
            <span className="text-xs font-bold text-slate-500 w-12 text-right">100 kg</span>
            <input
              type="range"
              min="100"
              max="2500"
              step="50"
              value={simulationQty}
              onChange={(e) => setSimulationQty(Number(e.target.value))}
              className="flex-1 accent-[#4E3C80] cursor-pointer h-2 bg-slate-200 rounded-lg"
            />
            <span className="text-xs font-bold text-slate-500 w-16">2,500 kg</span>
          </div>
        )}
      </div>

      {/* The Landed Cost Trap Alert Banner */}
      {isTrapScenario && (
        <div className="p-5 rounded-3xl bg-[#FEF3D6] border-2 border-[#F9C349] flex items-start gap-3.5 text-xs shadow-md">
          <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h5 className="font-heading font-black text-sm text-slate-900">
              The "Cheapest Unit Rate" Illusion Detected:
            </h5>
            <p className="text-slate-700 mt-1 leading-relaxed">
              <strong>{lowestUnitPriceQuote?.supplierName}</strong> quotes the lowest base price at <strong>₹{lowestUnitPriceQuote?.unitPrice}/kg</strong>, but charges <strong>₹{lowestUnitPriceQuote?.deliveryCharges.toLocaleString('en-IN')}</strong> freight.
              Meanwhile, <strong>{bestLandedQuote?.supplierName}</strong> quotes ₹{bestLandedQuote?.unitPrice}/kg with lower/free freight, giving you a cheaper true landed cost of <strong>₹{bestLandedQuote?.effectiveCostPerUnit.toFixed(2)}/kg</strong>.
            </p>
          </div>
        </div>
      )}

      {/* Main Quotations Comparison Table */}
      <div className="bg-white text-[#1E1736] rounded-3xl shadow-card border-2 border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-heading font-black text-lg text-[#1E1736] flex items-center gap-2">
              Supplier Comparison Matrix
              <span className="text-xs text-slate-500 font-normal">
                ({enrichedQuotes.length} quotes for {effectiveQty} {currentReq?.unit})
              </span>
            </h3>
            <span className="text-xs text-slate-500 block mt-0.5">
              Includes base unit rate, delivery freight, and applicable 18% GST.
            </span>
          </div>

          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            ✓ Recommended Landed Deal Highlighted
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F3F0FA] text-slate-700 border-b border-slate-200 uppercase font-bold text-[10px] tracking-wider">
              <tr>
                <th className="py-4 px-4">Supplier</th>
                <th className="py-4 px-4">Specification</th>
                <th className="py-4 px-4 text-right">Unit Price</th>
                <th className="py-4 px-4 text-right">Delivery / Freight</th>
                <th className="py-4 px-4 text-right">GST Rate</th>
                <th className="py-4 px-4 text-right">Total Landed Cost</th>
                <th className="py-4 px-4 text-right font-black text-slate-900">Effective Cost / Unit</th>
                <th className="py-4 px-4 text-center">Delivery Time</th>
                <th className="py-4 px-4 text-center">Verdict</th>
                <th className="py-4 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {enrichedQuotes.map((q) => {
                const isBest = q.isBestOffer;
                return (
                  <tr
                    key={q.id}
                    className={`transition-colors ${
                      isBest ? 'bg-[#D1FAE5]/30 hover:bg-[#D1FAE5]/50' : 'hover:bg-[#F3F0FA]'
                    }`}
                  >
                    {/* Supplier Name */}
                    <td className="py-4 px-4 font-bold text-slate-900">
                      <div className="flex items-center gap-2">
                        {isBest && (
                          <div className="p-1 rounded-lg bg-emerald-100 text-emerald-700">
                            <Award className="w-4 h-4" />
                          </div>
                        )}
                        <div>
                          <span className="block font-bold text-slate-900">{q.supplierName}</span>
                          <span className="text-[10px] text-slate-500 font-normal">Quote #{q.id.slice(0, 10)}</span>
                        </div>
                      </div>
                    </td>

                    {/* Specification */}
                    <td className="py-4 px-4 text-slate-700 max-w-xs truncate" title={q.materialSpec}>
                      {q.materialSpec}
                    </td>

                    {/* Unit Base Price */}
                    <td className="py-4 px-4 text-right font-mono font-medium text-slate-900">
                      ₹{q.unitPrice.toFixed(2)}/{q.unit}
                    </td>

                    {/* Delivery Freight */}
                    <td className="py-4 px-4 text-right font-mono">
                      {q.deliveryCharges === 0 ? (
                        <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">FREE</span>
                      ) : (
                        <span className="text-slate-800">₹{q.deliveryCharges.toLocaleString('en-IN')}</span>
                      )}
                    </td>

                    {/* Taxes */}
                    <td className="py-4 px-4 text-right font-mono text-slate-600">
                      {q.taxRatePercent}% GST
                      <span className="block text-[10px] text-slate-400">
                        (₹{q.taxAmount.toLocaleString('en-IN')})
                      </span>
                    </td>

                    {/* Total Landed Cost */}
                    <td className="py-4 px-4 text-right font-mono font-black text-slate-900 text-sm">
                      {formatINR(q.totalLandedCost)}
                    </td>

                    {/* Effective Cost Per Unit */}
                    <td className="py-4 px-4 text-right font-mono">
                      <div className={`inline-block px-2.5 py-1 rounded-xl font-black text-sm ${
                        isBest
                          ? 'bg-[#10B981] text-white shadow-sm'
                          : 'text-slate-900'
                      }`}>
                        ₹{q.effectiveCostPerUnit.toFixed(2)}/{q.unit}
                      </div>
                    </td>

                    {/* Delivery Time */}
                    <td className="py-4 px-4 text-center">
                      <div className="inline-flex items-center gap-1 text-[11px] text-slate-700 bg-slate-100 px-2.5 py-1 rounded-xl">
                        <Clock className="w-3 h-3 text-amber-600" />
                        <span>{q.deliveryTimeDays} days</span>
                      </div>
                    </td>

                    {/* Verdict */}
                    <td className="py-4 px-4 text-center">
                      {isBest ? (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center justify-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Best Landed Deal</span>
                        </span>
                      ) : q.unitPrice === minUnitPrice ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300" title="Low unit price wiped out by freight">
                          Misleading Low Rate
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-500 font-mono">
                          +{(q.effectiveCostPerUnit - minEffectiveLanded).toFixed(2)}/kg
                        </span>
                      )}
                    </td>

                    {/* Action */}
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => deleteQuote(q.id)}
                        className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Delete Quote"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Strategic Recommendation Breakdown Card */}
      {bestLandedQuote && (
        <div className="p-6 rounded-3xl bg-[#FAD5C8] text-[#1E1736] border-2 border-[#F8C4B4] shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#4E3C80] block">
              Strategic Procurement Recommendation
            </span>
            <h3 className="font-heading font-black text-2xl text-[#1E1736]">
              Procure from {bestLandedQuote.supplierName}
            </h3>
            <p className="text-xs text-slate-800 max-w-xl leading-relaxed">
              Total landed spend for <strong>{effectiveQty} {currentReq.unit}</strong> is <strong>{formatINR(bestLandedQuote.totalLandedCost)}</strong> (effective ₹{bestLandedQuote.effectiveCostPerUnit.toFixed(2)}/{currentReq.unit}).
              Includes eligible GST ITC credit of <strong>{formatINR(bestLandedQuote.taxAmount)}</strong>.
            </p>
          </div>

          <button
            onClick={() => setCurrentPage('costing')}
            className="px-5 py-3 rounded-2xl bg-[#4E3C80] hover:bg-[#3B2C63] text-white font-heading font-black text-xs transition-all shadow-md flex items-center gap-2 shrink-0"
          >
            <span>Transfer to Costing</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Modal: New Material Requirement */}
      {showAddReqModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in">
          <div className="bg-white text-[#1E1736] rounded-3xl p-6 max-w-lg w-full shadow-2xl relative border-4 border-slate-100">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200">
              <h3 className="font-heading font-black text-lg text-[#1E1736] flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-[#4E3C80]" />
                <span>Create Material Requirement</span>
              </h3>
              <button
                onClick={() => setShowAddReqModal(false)}
                className="text-slate-400 hover:text-black text-base"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateRequirement} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Material Name & Thickness</label>
                <input
                  type="text"
                  required
                  value={reqTitle}
                  onChange={(e) => setReqTitle(e.target.value)}
                  placeholder="e.g. MS Steel Sheet (3mm IS 2062 Grade B)"
                  className="w-full bg-[#F3F0FA] border border-[#D2C6EA] rounded-xl px-3 py-2 text-[#1E1736] font-medium focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Quantity</label>
                  <input
                    type="number"
                    required
                    value={reqQty}
                    onChange={(e) => setReqQty(e.target.value)}
                    className="w-full bg-[#F3F0FA] border border-[#D2C6EA] rounded-xl px-3 py-2 text-[#1E1736] font-medium focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Unit</label>
                  <select
                    value={reqUnit}
                    onChange={(e) => setReqUnit(e.target.value)}
                    className="w-full bg-[#F3F0FA] border border-[#D2C6EA] rounded-xl px-3 py-2 text-[#1E1736] font-medium focus:outline-none"
                  >
                    <option value="kg">kg</option>
                    <option value="tonnes">tonnes</option>
                    <option value="pcs">pieces</option>
                    <option value="meters">meters</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Grade / Technical Specification</label>
                <input
                  type="text"
                  value={reqSpec}
                  onChange={(e) => setReqSpec(e.target.value)}
                  className="w-full bg-[#F3F0FA] border border-[#D2C6EA] rounded-xl px-3 py-2 text-[#1E1736] font-medium focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Delivery Destination</label>
                <input
                  type="text"
                  value={reqLocation}
                  onChange={(e) => setReqLocation(e.target.value)}
                  className="w-full bg-[#F3F0FA] border border-[#D2C6EA] rounded-xl px-3 py-2 text-[#1E1736] font-medium focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddReqModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:text-black font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-2xl bg-[#4E3C80] text-white font-bold shadow-md"
                >
                  Create Requirement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Supplier Quote */}
      {showAddQuoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in">
          <div className="bg-white text-[#1E1736] rounded-3xl p-6 max-w-lg w-full shadow-2xl relative border-4 border-slate-100">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200">
              <h3 className="font-heading font-black text-lg text-[#1E1736] flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#4E3C80]" />
                <span>Add Supplier Quotation</span>
              </h3>
              <button
                onClick={() => setShowAddQuoteModal(false)}
                className="text-slate-400 hover:text-black text-base"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateQuote} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Select Supplier</label>
                <select
                  value={quoteSupplierId}
                  onChange={(e) => setQuoteSupplierId(e.target.value)}
                  className="w-full bg-[#F3F0FA] border border-[#D2C6EA] rounded-xl px-3 py-2 text-[#1E1736] font-medium focus:outline-none"
                >
                  {suppliers.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.city})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Unit Base Price (₹/{currentReq?.unit || 'kg'})
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={quoteUnitPrice}
                    onChange={(e) => setQuoteUnitPrice(e.target.value)}
                    className="w-full bg-[#F3F0FA] border border-[#D2C6EA] rounded-xl px-3 py-2 text-[#1E1736] font-mono font-medium focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Delivery / Freight (₹ total)
                  </label>
                  <input
                    type="number"
                    value={quoteDelivery}
                    onChange={(e) => setQuoteDelivery(e.target.value)}
                    placeholder="0 if free"
                    className="w-full bg-[#F3F0FA] border border-[#D2C6EA] rounded-xl px-3 py-2 text-[#1E1736] font-mono font-medium focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">GST Tax Rate</label>
                  <select
                    value={quoteTaxRate}
                    onChange={(e) => setQuoteTaxRate(e.target.value)}
                    className="w-full bg-[#F3F0FA] border border-[#D2C6EA] rounded-xl px-3 py-2 text-[#1E1736] font-medium focus:outline-none"
                  >
                    <option value="18">18% (Standard Ferrous / Non-Ferrous)</option>
                    <option value="12">12%</option>
                    <option value="28">28%</option>
                    <option value="5">5%</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Lead Time (Days)</label>
                  <input
                    type="number"
                    value={quoteLeadDays}
                    onChange={(e) => setQuoteLeadDays(e.target.value)}
                    className="w-full bg-[#F3F0FA] border border-[#D2C6EA] rounded-xl px-3 py-2 text-[#1E1736] font-medium focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Material Quality / Brand Grade</label>
                <input
                  type="text"
                  value={quoteSpec}
                  onChange={(e) => setQuoteSpec(e.target.value)}
                  className="w-full bg-[#F3F0FA] border border-[#D2C6EA] rounded-xl px-3 py-2 text-[#1E1736] font-medium focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddQuoteModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:text-black font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-2xl bg-[#4E3C80] text-white font-bold shadow-md"
                >
                  Save & Evaluate Landed Cost
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
