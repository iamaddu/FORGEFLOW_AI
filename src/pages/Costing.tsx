import React, { useState } from 'react';
import {
  Calculator,
  Plus,
  Sliders,
  DollarSign,
  TrendingUp,
  PieChart as PieIcon,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Trash2,
  Sparkles,
  RefreshCw,
  Coins
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';
import { useApp } from '../context/AppContext';
import { formatINR, calculateOrderCosting } from '../utils/calculations';
import { CostingOrder } from '../types';

export const Costing: React.FC = () => {
  const {
    costingOrders,
    addCostingOrder,
    updateCostingOrder,
    deleteCostingOrder,
    setCurrentPage,
    addQuotation
  } = useApp();

  const [selectedOrderId, setSelectedOrderId] = useState<string>(
    costingOrders[0]?.id || 'ord-243'
  );
  const [showAddModal, setShowAddModal] = useState(false);

  // Active Order
  const activeOrder = costingOrders.find(o => o.id === selectedOrderId) || costingOrders[0];

  // Local state for live margin slider adjustment
  const [targetMargin, setTargetMargin] = useState<number>(
    activeOrder?.targetMarginPercent || 25
  );

  // Sync targetMargin when switching orders
  React.useEffect(() => {
    if (activeOrder) {
      setTargetMargin(activeOrder.targetMarginPercent);
    }
  }, [activeOrder?.id]);

  // Recalculate deterministic figures live based on targetMargin slider
  const liveCalculation = activeOrder
    ? calculateOrderCosting({
        quantity: activeOrder.quantity,
        rawMaterialCost: activeOrder.rawMaterialCost,
        labourCost: activeOrder.labourCost,
        machineCost: activeOrder.machineCost,
        overheads: activeOrder.overheads,
        otherExpenses: activeOrder.otherExpenses,
        scrapRecoveryValue: activeOrder.scrapRecoveryValue,
        targetMarginPercent: targetMargin
      })
    : null;

  // New Order Form State
  const [newProductName, setNewProductName] = useState('');
  const [newCustomerName, setNewCustomerName] = useState('');
  const [newQty, setNewQty] = useState('100');
  const [newUnit, setNewUnit] = useState('pcs');
  const [newRawCost, setNewRawCost] = useState('35000');
  const [newLabourCost, setNewLabourCost] = useState('12000');
  const [newMachineCost, setNewMachineCost] = useState('15000');
  const [newOverheads, setNewOverheads] = useState('6000');
  const [newOther, setNewOther] = useState('2000');
  const [newScrap, setNewScrap] = useState('2500');
  const [newMargin, setNewMargin] = useState('24');

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = addCostingOrder({
      orderNumber: `ORD-2025-${Math.floor(100 + Math.random() * 900)}`,
      productName: newProductName,
      customerName: newCustomerName || 'Unspecified Customer',
      quantity: Number(newQty) || 1,
      unit: newUnit,
      rawMaterialCost: Number(newRawCost) || 0,
      labourCost: Number(newLabourCost) || 0,
      machineCost: Number(newMachineCost) || 0,
      overheads: Number(newOverheads) || 0,
      otherExpenses: Number(newOther) || 0,
      scrapRecoveryValue: Number(newScrap) || 0,
      targetMarginPercent: Number(newMargin) || 20,
      status: 'Approved'
    });
    setSelectedOrderId(newId);
    setShowAddModal(false);
    setNewProductName('');
  };

  const handleApplyMarginChange = (val: number) => {
    setTargetMargin(val);
    if (activeOrder) {
      updateCostingOrder(activeOrder.id, {
        targetMarginPercent: val
      });
    }
  };

  // Convert active order cost components to Pie chart data
  const chartData = activeOrder
    ? [
        { name: 'Raw Material', value: activeOrder.rawMaterialCost, color: '#16B8A5' },
        { name: 'Direct Labour', value: activeOrder.labourCost, color: '#38BDF8' },
        { name: 'Machine / Power', value: activeOrder.machineCost, color: '#E5A84B' },
        { name: 'Factory Overheads', value: activeOrder.overheads, color: '#A855F7' },
        { name: 'Other Expenses', value: activeOrder.otherExpenses, color: '#F43F5E' },
      ].filter(item => item.value > 0)
    : [];

  const handleSendToQuotation = () => {
    if (!activeOrder || !liveCalculation) return;

    const newQuoteNum = `QUOT-2025-${Math.floor(100 + Math.random() * 900)}`;
    const subtotal = liveCalculation.suggestedSellingPrice;
    const cgst = Math.round(subtotal * 0.09);
    const sgst = Math.round(subtotal * 0.09);
    const totalTax = cgst + sgst;
    const grandTotal = subtotal + totalTax;

    addQuotation({
      quoteNumber: newQuoteNum,
      date: new Date().toISOString().split('T')[0],
      validUntil: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      costingOrderId: activeOrder.id,
      customer: {
        name: 'Procurement Head',
        company: activeOrder.customerName,
        gstin: '27AABCA9999Z1Z5',
        email: 'purchase@clientworks.in',
        phone: '+91 98200 11223',
        billingAddress: 'MIDC Industrial Area, Pune, Maharashtra',
        deliveryAddress: 'Plant Stores Gate, Pune, Maharashtra'
      },
      items: [
        {
          id: `item-${Date.now()}`,
          description: activeOrder.productName,
          hsnCode: '73269099',
          quantity: activeOrder.quantity,
          unit: activeOrder.unit,
          unitCost: liveCalculation.costPerUnit,
          unitPrice: liveCalculation.unitSellingPrice,
          gstRate: 18,
          totalCost: liveCalculation.totalProductionCost,
          totalPrice: liveCalculation.suggestedSellingPrice
        }
      ],
      paymentTerms: '30 Days Net from Delivery Challan',
      deliveryTerms: 'Ex-Works Pune / Transit insurance covered by buyer',
      subtotal,
      cgst,
      sgst,
      igst: 0,
      totalTax,
      grandTotal,
      estimatedCost: liveCalculation.totalProductionCost,
      estimatedProfit: liveCalculation.estimatedGrossProfit,
      profitMarginPercent: liveCalculation.estimatedProfitMargin,
      status: 'Draft',
      notes: 'Prices are valid for 30 calendar days. All dimensions strictly per approved engineering drawings.'
    });

    setCurrentPage('quotations');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading font-bold text-2xl text-white">Intelligent Costing</h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#E5A84B]/20 text-[#E5A84B] border border-[#E5A84B]/30 uppercase">
              Deterministic Math
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Calculate accurate manufacturing cost breakdown and simulate target gross margins in real-time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#16B8A5] hover:bg-[#13A291] text-[#0A111D] text-xs font-heading font-bold transition-all shadow-glow"
          >
            <Plus className="w-4 h-4" />
            <span>New Manufacturing Order</span>
          </button>
        </div>
      </div>

      {/* Order Selector Tabs */}
      <div className="bg-[#101B2B] border border-[#1C2E46] rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3 overflow-x-auto pb-1 md:pb-0">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider shrink-0">
            Select Order:
          </span>
          {costingOrders.map(order => (
            <button
              key={order.id}
              onClick={() => setSelectedOrderId(order.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                order.id === selectedOrderId
                  ? 'bg-[#16B8A5] text-white shadow-glow font-semibold'
                  : 'bg-[#132032] text-slate-300 hover:text-white border border-[#1C2E46]'
              }`}
            >
              <span>{order.productName}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                order.id === selectedOrderId ? 'bg-[#0A111D]/30 text-white' : 'bg-slate-800 text-slate-400'
              }`}>
                {order.quantity} {order.unit}
              </span>
            </button>
          ))}
        </div>

        {activeOrder && (
          <div className="text-xs text-slate-400 flex items-center gap-4 shrink-0 bg-[#0A111D] px-3 py-1.5 rounded-xl border border-[#1C2E46]/60">
            <div>
              <span className="text-slate-400">Order: </span>
              <span className="text-slate-200 font-mono font-medium">{activeOrder.orderNumber}</span>
            </div>
            <div>
              <span className="text-slate-400">Client: </span>
              <span className="text-slate-200 font-medium">{activeOrder.customerName}</span>
            </div>
          </div>
        )}
      </div>

      {activeOrder && liveCalculation && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Interactive Costing Inputs & Sliders (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Cost Centers Input Breakdown */}
            <div className="bg-[#101B2B] border border-[#1C2E46] rounded-2xl p-5 shadow-card space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#1C2E46]">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-[#16B8A5]/20 text-[#16B8A5]">
                    <Layers className="w-4 h-4" />
                  </div>
                  <h3 className="font-heading font-semibold text-sm text-white">
                    Direct Production Cost Centers
                  </h3>
                </div>
                <span className="text-xs text-slate-400">
                  Batch: {activeOrder.quantity} {activeOrder.unit}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* Raw Material Cost */}
                <div className="p-3 rounded-xl bg-[#132032] border border-[#1C2E46]">
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#16B8A5]" />
                      <span>Raw Material Cost</span>
                    </span>
                    <span className="font-mono text-slate-300">
                      {((activeOrder.rawMaterialCost / liveCalculation.totalProductionCost) * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="font-heading font-bold text-lg text-white font-mono">
                    {formatINR(activeOrder.rawMaterialCost)}
                  </div>
                  <span className="text-[10px] text-slate-400">
                    ₹{(activeOrder.rawMaterialCost / activeOrder.quantity).toFixed(2)} / unit
                  </span>
                </div>

                {/* Direct Labour Cost */}
                <div className="p-3 rounded-xl bg-[#132032] border border-[#1C2E46]">
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
                      <span>Direct Labour Cost</span>
                    </span>
                    <span className="font-mono text-slate-300">
                      {((activeOrder.labourCost / liveCalculation.totalProductionCost) * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="font-heading font-bold text-lg text-white font-mono">
                    {formatINR(activeOrder.labourCost)}
                  </div>
                  <span className="text-[10px] text-slate-400">
                    Machinist, helper & fitting wages
                  </span>
                </div>

                {/* Machine & Electricity Cost */}
                <div className="p-3 rounded-xl bg-[#132032] border border-[#1C2E46]">
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#E5A84B]" />
                      <span>Machine & Power Cost</span>
                    </span>
                    <span className="font-mono text-slate-300">
                      {((activeOrder.machineCost / liveCalculation.totalProductionCost) * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="font-heading font-bold text-lg text-white font-mono">
                    {formatINR(activeOrder.machineCost)}
                  </div>
                  <span className="text-[10px] text-slate-400">
                    CNC machine hour rate & peak power
                  </span>
                </div>

                {/* Overheads & Consumables */}
                <div className="p-3 rounded-xl bg-[#132032] border border-[#1C2E46]">
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#A855F7]" />
                      <span>Factory Overheads</span>
                    </span>
                    <span className="font-mono text-slate-300">
                      {((activeOrder.overheads / liveCalculation.totalProductionCost) * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="font-heading font-bold text-lg text-white font-mono">
                    {formatINR(activeOrder.overheads)}
                  </div>
                  <span className="text-[10px] text-slate-400">
                    Coolants, tooling inserts, rent allocation
                  </span>
                </div>

                {/* Other Expenses */}
                <div className="p-3 rounded-xl bg-[#132032] border border-[#1C2E46]">
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#F43F5E]" />
                      <span>Other Expenses</span>
                    </span>
                    <span className="font-mono text-slate-300">
                      {((activeOrder.otherExpenses / liveCalculation.totalProductionCost) * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="font-heading font-bold text-lg text-white font-mono">
                    {formatINR(activeOrder.otherExpenses)}
                  </div>
                  <span className="text-[10px] text-slate-400">
                    Surface treatment / zinc electroplating
                  </span>
                </div>

                {/* Scrap Recovery Credit */}
                <div className="p-3 rounded-xl bg-[#132032] border border-emerald-500/30">
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="text-emerald-400 font-medium">Scrap Recovery Value</span>
                    </span>
                    <span className="font-mono text-emerald-400">Deduction</span>
                  </div>
                  <div className="font-heading font-bold text-lg text-emerald-400 font-mono">
                    - {formatINR(activeOrder.scrapRecoveryValue)}
                  </div>
                  <span className="text-[10px] text-slate-400">
                    Boring chips & offcut buyback credit
                  </span>
                </div>
              </div>
            </div>

            {/* Dynamic Target Margin Slider */}
            <div className="bg-[#101B2B] border border-[#16B8A5]/40 rounded-2xl p-5 shadow-glow space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-[#E5A84B]/20 text-[#E5A84B]">
                    <Sliders className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-sm text-white">
                      Target Gross Margin Slider
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Instantly recalculates suggested quoting price using standard deterministic margin formula.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-[#0A111D] px-3.5 py-1.5 rounded-xl border border-[#1C2E46]">
                  <span className="text-xs text-slate-400">Margin:</span>
                  <span className="font-heading font-bold text-xl text-[#16B8A5]">
                    {targetMargin}%
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-4">
                  <span className="text-xs text-slate-400 w-8">5%</span>
                  <input
                    type="range"
                    min="5"
                    max="50"
                    step="1"
                    value={targetMargin}
                    onChange={(e) => handleApplyMarginChange(Number(e.target.value))}
                    className="flex-1 accent-[#16B8A5] h-2 bg-slate-800 rounded-lg cursor-pointer"
                  />
                  <span className="text-xs text-slate-400 w-8 text-right">50%</span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 px-1 pt-1">
                  <span>Break-even floor: 0%</span>
                  <span className="text-[#E5A84B]">Standard MSME benchmark: 20% - 28%</span>
                  <span className="text-emerald-400">Premium / High-Precision: 35%+</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Cost Breakdown Visuals & Final Quotation Summary (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Computed Financial Summary Card */}
            <div className="bg-gradient-to-b from-[#132032] to-[#101B2B] border border-[#1C2E46] rounded-2xl p-5 shadow-card space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#1C2E46]">
                <h4 className="font-heading font-semibold text-sm text-white">
                  Deterministic Financial Summary
                </h4>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                  Verified Math
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between py-1 border-b border-[#1C2E46]/50">
                  <span className="text-slate-400">Total Net Production Cost:</span>
                  <span className="font-heading font-bold text-base text-white font-mono">
                    {formatINR(liveCalculation.totalProductionCost)}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-[#1C2E46]/50">
                  <span className="text-slate-400">Unit Production Cost:</span>
                  <span className="font-heading font-semibold text-sm text-slate-200 font-mono">
                    {formatINR(liveCalculation.costPerUnit)} / {activeOrder.unit}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-[#1C2E46]/50">
                  <span className="text-slate-400">Estimated Gross Profit:</span>
                  <span className="font-heading font-bold text-base text-emerald-400 font-mono">
                    + {formatINR(liveCalculation.estimatedGrossProfit)}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-[#1C2E46]/50">
                  <span className="text-slate-400">Unit Selling Price:</span>
                  <span className="font-heading font-bold text-base text-[#16B8A5] font-mono">
                    {formatINR(liveCalculation.unitSellingPrice)} / {activeOrder.unit}
                  </span>
                </div>

                {/* Big Final Suggested Selling Price */}
                <div className="p-4 rounded-xl bg-[#0A111D] border border-[#16B8A5]/40 text-center space-y-1">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-[#16B8A5] block">
                    Suggested Order Selling Price (Pre-GST)
                  </span>
                  <div className="font-heading font-black text-2xl sm:text-3xl text-white font-mono tracking-tight">
                    {formatINR(liveCalculation.suggestedSellingPrice)}
                  </div>
                  <span className="text-[11px] text-slate-400 block">
                    Includes {liveCalculation.estimatedProfitMargin}% Gross Margin on {activeOrder.quantity} {activeOrder.unit}
                  </span>
                </div>
              </div>

              {/* Action: Send to Quotation Generator */}
              <button
                onClick={handleSendToQuotation}
                className="w-full py-3 rounded-xl bg-[#16B8A5] hover:bg-[#13A291] text-[#0A111D] font-heading font-bold text-xs transition-all shadow-glow flex items-center justify-center gap-2"
              >
                <span>Generate Customer Quotation from this Order</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Cost Breakdown Donut Chart */}
            <div className="bg-[#101B2B] border border-[#1C2E46] rounded-2xl p-5 shadow-card">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-heading font-semibold text-xs text-white flex items-center gap-2">
                  <PieIcon className="w-3.5 h-3.5 text-[#16B8A5]" />
                  <span>Cost Center Distribution</span>
                </h4>
              </div>

              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={70}
                      paddingAngle={3}
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(val: any) => [formatINR(val), 'Cost']}
                      contentStyle={{ backgroundColor: '#132032', borderColor: '#1C2E46', borderRadius: '12px', fontSize: '11px', color: '#F3F5F7' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Chart Legend */}
              <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400 pt-2 border-t border-[#1C2E46]/60">
                {chartData.map(item => (
                  <div key={item.name} className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="truncate">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: New Manufacturing Costing Order */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#101B2B] border border-[#1C2E46] rounded-2xl p-6 max-w-xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#1C2E46]">
              <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
                <Calculator className="w-4 h-4 text-[#16B8A5]" />
                <span>Create Manufacturing Order Cost Sheet</span>
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateOrder} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Product / Part Name</label>
                  <input
                    type="text"
                    required
                    value={newProductName}
                    onChange={(e) => setNewProductName(e.target.value)}
                    placeholder="e.g. CNC Hydraulic Manifold Block"
                    className="w-full bg-[#132032] border border-[#1C2E46] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#16B8A5]"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Customer / Client</label>
                  <input
                    type="text"
                    value={newCustomerName}
                    onChange={(e) => setNewCustomerName(e.target.value)}
                    placeholder="e.g. Bosch Rexroth India"
                    className="w-full bg-[#132032] border border-[#1C2E46] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#16B8A5]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Order Quantity</label>
                  <input
                    type="number"
                    required
                    value={newQty}
                    onChange={(e) => setNewQty(e.target.value)}
                    className="w-full bg-[#132032] border border-[#1C2E46] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#16B8A5]"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Unit of Measure</label>
                  <select
                    value={newUnit}
                    onChange={(e) => setNewUnit(e.target.value)}
                    className="w-full bg-[#132032] border border-[#1C2E46] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#16B8A5]"
                  >
                    <option value="pcs">pieces (pcs)</option>
                    <option value="sets">sets</option>
                    <option value="kg">kg</option>
                    <option value="meters">meters</option>
                  </select>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0A111D] border border-[#1C2E46] space-y-3">
                <span className="font-heading font-semibold text-slate-200 block text-xs">
                  Cost Breakdown Centers (INR)
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1">Raw Material Cost (₹)</label>
                    <input
                      type="number"
                      required
                      value={newRawCost}
                      onChange={(e) => setNewRawCost(e.target.value)}
                      className="w-full bg-[#132032] border border-[#1C2E46] rounded-xl px-3 py-1.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Direct Labour Cost (₹)</label>
                    <input
                      type="number"
                      required
                      value={newLabourCost}
                      onChange={(e) => setNewLabourCost(e.target.value)}
                      className="w-full bg-[#132032] border border-[#1C2E46] rounded-xl px-3 py-1.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Machine & Power (₹)</label>
                    <input
                      type="number"
                      required
                      value={newMachineCost}
                      onChange={(e) => setNewMachineCost(e.target.value)}
                      className="w-full bg-[#132032] border border-[#1C2E46] rounded-xl px-3 py-1.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Factory Overheads (₹)</label>
                    <input
                      type="number"
                      value={newOverheads}
                      onChange={(e) => setNewOverheads(e.target.value)}
                      className="w-full bg-[#132032] border border-[#1C2E46] rounded-xl px-3 py-1.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Other Expenses (₹)</label>
                    <input
                      type="number"
                      value={newOther}
                      onChange={(e) => setNewOther(e.target.value)}
                      className="w-full bg-[#132032] border border-[#1C2E46] rounded-xl px-3 py-1.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-emerald-400 mb-1">Scrap Recovery Credit (₹)</label>
                    <input
                      type="number"
                      value={newScrap}
                      onChange={(e) => setNewScrap(e.target.value)}
                      className="w-full bg-[#132032] border border-emerald-500/40 rounded-xl px-3 py-1.5 text-emerald-400"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Desired Gross Margin (%)
                </label>
                <input
                  type="number"
                  min="1"
                  max="80"
                  value={newMargin}
                  onChange={(e) => setNewMargin(e.target.value)}
                  className="w-full bg-[#132032] border border-[#1C2E46] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#16B8A5]"
                />
              </div>

              <div className="pt-3 border-t border-[#1C2E46] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#16B8A5] hover:bg-[#13A291] text-[#0A111D] font-bold shadow-glow"
                >
                  Calculate Cost Sheet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
