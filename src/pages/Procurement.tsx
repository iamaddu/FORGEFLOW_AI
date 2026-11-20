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

  // Active selected requirement
  const [selectedReqId, setSelectedReqId] = useState<string>(
    materialRequirements[0]?.id || 'req-101'
  );

  // Modals state
  const [showAddReqModal, setShowAddReqModal] = useState(false);
  const [showAddQuoteModal, setShowAddQuoteModal] = useState(false);

  // Dynamic simulation slider (overrides base quantity to demonstrate how volume changes the landed winner!)
  const [simulationQty, setSimulationQty] = useState<number>(500);
  const [useSimulation, setUseSimulation] = useState<boolean>(false);

  // Form states for New Requirement
  const [reqTitle, setReqTitle] = useState('');
  const [reqCategory, setReqCategory] = useState('Ferrous Metals');
  const [reqQty, setReqQty] = useState('500');
  const [reqUnit, setReqUnit] = useState('kg');
  const [reqSpec, setReqSpec] = useState('IS 2062 Grade B, 3mm Thickness');
  const [reqLocation, setReqLocation] = useState('Bhosari Industrial Estate, Pune (Factory Gate 2)');

  // Form states for New Quote
  const [quoteSupplierId, setQuoteSupplierId] = useState(suppliers[0]?.id || '');
  const [quoteUnitPrice, setQuoteUnitPrice] = useState('51');
  const [quoteDelivery, setQuoteDelivery] = useState('800');
  const [quoteTaxRate, setQuoteTaxRate] = useState('18');
  const [quoteLeadDays, setQuoteLeadDays] = useState('3');
  const [quoteSpec, setQuoteSpec] = useState('Prime Quality with Mill TC');
  const [quoteNotes, setQuoteNotes] = useState('Standard payment terms apply.');

  const currentReq = materialRequirements.find(r => r.id === selectedReqId) || materialRequirements[0];

  // Filter quotes for selected requirement
  const rawReqQuotes = quotes.filter(q => q.materialReqId === currentReq?.id);

  // Recalculate with simulation quantity if active
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

  // Determine true best offer (lowest effective landed cost per unit)
  const minEffectiveLanded = displayQuotes.length > 0 ? Math.min(...displayQuotes.map(q => q.effectiveCostPerUnit)) : 0;
  const enrichedQuotes = displayQuotes.map(q => ({
    ...q,
    isBestOffer: Math.abs(q.effectiveCostPerUnit - minEffectiveLanded) < 0.05
  }));

  // Identify who has the lowest headline unit price (to highlight the classic MSME trap!)
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
            <h1 className="font-heading font-bold text-2xl text-white">Smart Procurement</h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#16B8A5]/20 text-[#16B8A5] border border-[#16B8A5]/30 uppercase">
              Core Engine (PS 4.1)
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Compare supplier quotations and calculate actual landed costs with freight, GST & lead-time parity.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddReqModal(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#132032] hover:bg-[#182940] border border-[#1C2E46] text-slate-200 text-xs font-semibold transition-all"
          >
            <Plus className="w-4 h-4 text-[#16B8A5]" />
            <span>New Requirement</span>
          </button>
          <button
            onClick={() => setShowAddQuoteModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#16B8A5] hover:bg-[#13A291] text-[#0A111D] text-xs font-heading font-bold transition-all shadow-glow"
          >
            <Plus className="w-4 h-4" />
            <span>Add Supplier Quote</span>
          </button>
        </div>
      </div>

      {/* Requirement Selector Bar */}
      <div className="bg-[#101B2B] border border-[#1C2E46] rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3 overflow-x-auto pb-1 md:pb-0">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider shrink-0">
            Active Material:
          </span>
          {materialRequirements.map(req => (
            <button
              key={req.id}
              onClick={() => {
                setSelectedReqId(req.id);
                setSimulationQty(req.quantity);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                req.id === selectedReqId
                  ? 'bg-[#16B8A5] text-white shadow-glow font-semibold'
                  : 'bg-[#132032] text-slate-300 hover:text-white border border-[#1C2E46]'
              }`}
            >
              <span>{req.title}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                req.id === selectedReqId ? 'bg-[#0A111D]/30 text-white' : 'bg-slate-800 text-slate-400'
              }`}>
                {req.quantity} {req.unit}
              </span>
            </button>
          ))}
        </div>

        {/* Selected Requirement Metadata pill */}
        {currentReq && (
          <div className="text-xs text-slate-400 flex items-center gap-4 shrink-0 bg-[#0A111D] px-3 py-1.5 rounded-xl border border-[#1C2E46]/60">
            <div>
              <span className="text-slate-400">Spec: </span>
              <span className="text-slate-200 font-medium">{currentReq.gradeSpec}</span>
            </div>
            <div>
              <span className="text-slate-400">Location: </span>
              <span className="text-slate-200 font-medium">{currentReq.deliveryLocation.split(',')[0]}</span>
            </div>
          </div>
        )}
      </div>

      {/* Dynamic Quantity & Freight Sensitivity Interactive Playground */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#132032] via-[#0F1E30] to-[#132032] border border-[#16B8A5]/30 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#16B8A5]/20 text-[#16B8A5]">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-heading font-semibold text-xs text-white">
                Interactive Landed Cost Sensitivity Simulator
              </h4>
              <p className="text-[11px] text-slate-400">
                Drag the order quantity to see how delivery charges and taxes shift the best deal between Supplier A, B & C!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
              <input
                type="checkbox"
                checked={useSimulation}
                onChange={(e) => setUseSimulation(e.target.checked)}
                className="rounded accent-[#16B8A5] w-4 h-4 cursor-pointer"
              />
              <span>Enable Volume Simulation</span>
            </label>

            {useSimulation && (
              <div className="flex items-center gap-2 bg-[#0A111D] px-3 py-1 rounded-xl border border-[#1C2E46]">
                <span className="text-xs text-slate-400">Batch:</span>
                <span className="font-heading font-bold text-sm text-[#16B8A5]">
                  {simulationQty} {currentReq?.unit || 'kg'}
                </span>
              </div>
            )}
          </div>
        </div>

        {useSimulation && (
          <div className="mt-4 pt-3 border-t border-[#1C2E46]/60 flex items-center gap-4">
            <span className="text-xs text-slate-400 w-12 text-right">100 kg</span>
            <input
              type="range"
              min="100"
              max="2500"
              step="50"
              value={simulationQty}
              onChange={(e) => setSimulationQty(Number(e.target.value))}
              className="flex-1 accent-[#16B8A5] cursor-pointer"
            />
            <span className="text-xs text-slate-400 w-16">2,500 kg</span>
          </div>
        )}
      </div>

      {/* The Landed Cost Trap Alert Banner (Notice for Hackathon Judges!) */}
      {isTrapScenario && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-[#E5A84B]/40 flex items-start gap-3 text-xs shadow-glowAmber">
          <AlertTriangle className="w-5 h-5 text-[#E5A84B] shrink-0 mt-0.5" />
          <div className="flex-1">
            <h5 className="font-heading font-bold text-sm text-white">
              The "Cheapest Unit Rate" Illusion Detected:
            </h5>
            <p className="text-slate-300 mt-1 leading-relaxed">
              <strong>{lowestUnitPriceQuote?.supplierName}</strong> quotes the lowest base price at <strong>₹{lowestUnitPriceQuote?.unitPrice}/kg</strong>, but charges <strong>₹{lowestUnitPriceQuote?.deliveryCharges.toLocaleString('en-IN')}</strong> freight.
              Meanwhile, <strong>{bestLandedQuote?.supplierName}</strong> charges ₹{bestLandedQuote?.unitPrice}/kg with lower/free freight, resulting in a lower true landed cost of <strong>₹{bestLandedQuote?.effectiveCostPerUnit.toFixed(2)}/kg</strong>.
            </p>
          </div>
        </div>
      )}

      {/* Main Quotations Comparison Table */}
      <div className="bg-[#101B2B] border border-[#1C2E46] rounded-2xl shadow-card overflow-hidden">
        <div className="p-5 border-b border-[#1C2E46] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
              Supplier Comparison Matrix
              <span className="text-xs text-slate-400 font-normal">
                ({enrichedQuotes.length} quotes for {effectiveQty} {currentReq?.unit})
              </span>
            </h3>
            <span className="text-[11px] text-slate-400 block mt-0.5">
              *All figures shown are illustrative demo values for hackathon simulation.
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span>Recommended Landed Value</span>
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0D1624] text-slate-400 border-b border-[#1C2E46] uppercase font-semibold text-[10px] tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Supplier</th>
                <th className="py-3.5 px-4">Specification</th>
                <th className="py-3.5 px-4 text-right">Unit Price</th>
                <th className="py-3.5 px-4 text-right">Delivery / Freight</th>
                <th className="py-3.5 px-4 text-right">GST Rate</th>
                <th className="py-3.5 px-4 text-right">Total Landed Cost</th>
                <th className="py-3.5 px-4 text-right font-bold text-slate-200">Effective Cost / Unit</th>
                <th className="py-3.5 px-4 text-center">Delivery Time</th>
                <th className="py-3.5 px-4 text-center">Verdict</th>
                <th className="py-3.5 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1C2E46]/60">
              {enrichedQuotes.map((q) => {
                const isBest = q.isBestOffer;
                return (
                  <tr
                    key={q.id}
                    className={`transition-colors ${
                      isBest ? 'bg-[#16B8A5]/5 hover:bg-[#16B8A5]/10' : 'hover:bg-[#132032]'
                    }`}
                  >
                    {/* Supplier Name */}
                    <td className="py-4 px-4 font-medium text-white">
                      <div className="flex items-center gap-2">
                        {isBest && (
                          <div className="p-1 rounded bg-[#16B8A5]/20 text-[#16B8A5]">
                            <Award className="w-3.5 h-3.5" />
                          </div>
                        )}
                        <div>
                          <span className="block font-semibold text-slate-100">{q.supplierName}</span>
                          <span className="text-[10px] text-slate-400 block">Quote #{q.id.slice(0, 10)}</span>
                        </div>
                      </div>
                    </td>

                    {/* Specification */}
                    <td className="py-4 px-4 text-slate-300 max-w-xs truncate" title={q.materialSpec}>
                      {q.materialSpec}
                    </td>

                    {/* Unit Base Price */}
                    <td className="py-4 px-4 text-right font-mono text-slate-200">
                      ₹{q.unitPrice.toFixed(2)}/{q.unit}
                    </td>

                    {/* Delivery Freight */}
                    <td className="py-4 px-4 text-right font-mono">
                      {q.deliveryCharges === 0 ? (
                        <span className="text-emerald-400 font-semibold">FREE</span>
                      ) : (
                        <span className="text-slate-300">₹{q.deliveryCharges.toLocaleString('en-IN')}</span>
                      )}
                    </td>

                    {/* Taxes */}
                    <td className="py-4 px-4 text-right font-mono text-slate-400">
                      {q.taxRatePercent}% GST
                      <span className="block text-[10px] text-slate-500">
                        (₹{q.taxAmount.toLocaleString('en-IN')})
                      </span>
                    </td>

                    {/* Total Landed Cost */}
                    <td className="py-4 px-4 text-right font-mono font-bold text-white">
                      {formatINR(q.totalLandedCost)}
                    </td>

                    {/* Effective Cost Per Unit */}
                    <td className="py-4 px-4 text-right font-mono">
                      <div className={`inline-block px-2 py-1 rounded-lg font-bold text-sm ${
                        isBest
                          ? 'bg-[#16B8A5]/20 text-[#16B8A5] border border-[#16B8A5]/40'
                          : 'text-slate-200'
                      }`}>
                        ₹{q.effectiveCostPerUnit.toFixed(2)}/{q.unit}
                      </div>
                    </td>

                    {/* Delivery Time */}
                    <td className="py-4 px-4 text-center">
                      <div className="inline-flex items-center gap-1 text-[11px] text-slate-300 bg-[#0A111D] px-2 py-1 rounded-lg border border-[#1C2E46]">
                        <Clock className="w-3 h-3 text-[#E5A84B]" />
                        <span>{q.deliveryTimeDays} days</span>
                      </div>
                    </td>

                    {/* Verdict */}
                    <td className="py-4 px-4 text-center">
                      {isBest ? (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center justify-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Best Landed Deal</span>
                        </span>
                      ) : q.unitPrice === minUnitPrice ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-500/15 text-[#E5A84B] border border-amber-500/30" title="Low unit price wiped out by freight">
                          Misleading Low Rate
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-400">
                          +{(q.effectiveCostPerUnit - minEffectiveLanded).toFixed(2)}/kg
                        </span>
                      )}
                    </td>

                    {/* Action */}
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => deleteQuote(q.id)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                          title="Delete Quote"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
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
        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#132032] via-[#0E2235] to-[#132032] border border-[#16B8A5]/40 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#16B8A5]">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-heading font-semibold uppercase tracking-wider">
                Procurement Decision Recommendation
              </span>
            </div>
            <h3 className="font-heading font-bold text-xl text-white">
              Procure from {bestLandedQuote.supplierName}
            </h3>
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              Total landed spend for <strong>{effectiveQty} {currentReq.unit}</strong> will be <strong>{formatINR(bestLandedQuote.totalLandedCost)}</strong> (effective ₹{bestLandedQuote.effectiveCostPerUnit.toFixed(2)}/{currentReq.unit}).
              Expected delivery in <strong>{bestLandedQuote.deliveryTimeDays} days</strong> with eligible GST ITC credit of <strong>{formatINR(bestLandedQuote.taxAmount)}</strong>.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setCurrentPage('costing')}
              className="px-5 py-3 rounded-xl bg-[#16B8A5] hover:bg-[#13A291] text-[#0A111D] font-heading font-bold text-xs transition-all shadow-glow flex items-center gap-2"
            >
              <span>Transfer to Production Costing</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Modal: New Material Requirement */}
      {showAddReqModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#101B2B] border border-[#1C2E46] rounded-2xl p-6 max-w-lg w-full shadow-2xl relative">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#1C2E46]">
              <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
                <ShoppingCart className="w-4 h-4 text-[#16B8A5]" />
                <span>Create Material Requirement</span>
              </h3>
              <button
                onClick={() => setShowAddReqModal(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateRequirement} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Material Name & Thickness</label>
                <input
                  type="text"
                  required
                  value={reqTitle}
                  onChange={(e) => setReqTitle(e.target.value)}
                  placeholder="e.g. MS Steel Sheet (3mm IS 2062 Grade B)"
                  className="w-full bg-[#132032] border border-[#1C2E46] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#16B8A5]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Quantity</label>
                  <input
                    type="number"
                    required
                    value={reqQty}
                    onChange={(e) => setReqQty(e.target.value)}
                    className="w-full bg-[#132032] border border-[#1C2E46] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#16B8A5]"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Unit</label>
                  <select
                    value={reqUnit}
                    onChange={(e) => setReqUnit(e.target.value)}
                    className="w-full bg-[#132032] border border-[#1C2E46] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#16B8A5]"
                  >
                    <option value="kg">kg</option>
                    <option value="tonnes">tonnes</option>
                    <option value="pcs">pieces</option>
                    <option value="meters">meters</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Grade / Technical Specification</label>
                <input
                  type="text"
                  value={reqSpec}
                  onChange={(e) => setReqSpec(e.target.value)}
                  placeholder="e.g. IS 2062 Grade B, Mill Test Certificate required"
                  className="w-full bg-[#132032] border border-[#1C2E46] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#16B8A5]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Delivery Destination</label>
                <input
                  type="text"
                  value={reqLocation}
                  onChange={(e) => setReqLocation(e.target.value)}
                  placeholder="e.g. Bhosari Industrial Area, Pune"
                  className="w-full bg-[#132032] border border-[#1C2E46] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#16B8A5]"
                />
              </div>

              <div className="pt-3 border-t border-[#1C2E46] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddReqModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#16B8A5] hover:bg-[#13A291] text-[#0A111D] font-bold shadow-glow"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#101B2B] border border-[#1C2E46] rounded-2xl p-6 max-w-lg w-full shadow-2xl relative">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#1C2E46]">
              <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#16B8A5]" />
                <span>Add Supplier Quotation</span>
              </h3>
              <button
                onClick={() => setShowAddQuoteModal(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateQuote} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Select Supplier</label>
                <select
                  value={quoteSupplierId}
                  onChange={(e) => setQuoteSupplierId(e.target.value)}
                  className="w-full bg-[#132032] border border-[#1C2E46] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#16B8A5]"
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
                  <label className="block text-slate-300 font-medium mb-1">
                    Unit Base Price (₹/{currentReq?.unit || 'kg'})
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={quoteUnitPrice}
                    onChange={(e) => setQuoteUnitPrice(e.target.value)}
                    className="w-full bg-[#132032] border border-[#1C2E46] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#16B8A5]"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Delivery / Freight (₹ total)
                  </label>
                  <input
                    type="number"
                    value={quoteDelivery}
                    onChange={(e) => setQuoteDelivery(e.target.value)}
                    placeholder="0 if free"
                    className="w-full bg-[#132032] border border-[#1C2E46] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#16B8A5]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">GST Tax Rate</label>
                  <select
                    value={quoteTaxRate}
                    onChange={(e) => setQuoteTaxRate(e.target.value)}
                    className="w-full bg-[#132032] border border-[#1C2E46] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#16B8A5]"
                  >
                    <option value="18">18% (Standard Ferrous / Non-Ferrous)</option>
                    <option value="12">12%</option>
                    <option value="28">28%</option>
                    <option value="5">5%</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Lead Time (Days)</label>
                  <input
                    type="number"
                    value={quoteLeadDays}
                    onChange={(e) => setQuoteLeadDays(e.target.value)}
                    className="w-full bg-[#132032] border border-[#1C2E46] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#16B8A5]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Material Quality / Brand Grade</label>
                <input
                  type="text"
                  value={quoteSpec}
                  onChange={(e) => setQuoteSpec(e.target.value)}
                  placeholder="e.g. Tata Steel Prime, IS 2062 Grade B"
                  className="w-full bg-[#132032] border border-[#1C2E46] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#16B8A5]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Commercial Notes</label>
                <input
                  type="text"
                  value={quoteNotes}
                  onChange={(e) => setQuoteNotes(e.target.value)}
                  placeholder="e.g. Valid for 7 days, 30 days credit"
                  className="w-full bg-[#132032] border border-[#1C2E46] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#16B8A5]"
                />
              </div>

              <div className="pt-3 border-t border-[#1C2E46] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddQuoteModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#16B8A5] hover:bg-[#13A291] text-[#0A111D] font-bold shadow-glow"
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
