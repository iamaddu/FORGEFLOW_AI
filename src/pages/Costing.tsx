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
  Tooltip
} from 'recharts';
import { useApp } from '../context/AppContext';
import { formatINR, calculateOrderCosting } from '../utils/calculations';

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

  const activeOrder = costingOrders.find(o => o.id === selectedOrderId) || costingOrders[0];

  const [targetMargin, setTargetMargin] = useState<number>(
    activeOrder?.targetMarginPercent || 25
  );

  React.useEffect(() => {
    if (activeOrder) {
      setTargetMargin(activeOrder.targetMarginPercent);
    }
  }, [activeOrder?.id]);

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

  const chartData = activeOrder
    ? [
        { name: 'Raw Material', value: activeOrder.rawMaterialCost, color: '#4E3C80' },
        { name: 'Direct Labour', value: activeOrder.labourCost, color: '#F9C349' },
        { name: 'Machine / Power', value: activeOrder.machineCost, color: '#EA580C' },
        { name: 'Factory Overheads', value: activeOrder.overheads, color: '#8B5CF6' },
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
        billingAddress: 'MIDC Bhosari Industrial Area, Pune',
        deliveryAddress: 'Plant Stores Gate, Pune'
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
            <h1 className="font-heading font-black text-3xl text-white">Intelligent Costing</h1>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FAD5C8] text-[#1E1736]">
              Deterministic Cost Engine
            </span>
          </div>
          <p className="text-xs text-[#E8E2F6] mt-1">
            Calculate accurate manufacturing cost breakdown and simulate target gross margins in real-time.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#FAD5C8] hover:bg-[#f6c6b6] text-[#1E1736] text-xs font-heading font-black transition-all shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>New Manufacturing Order</span>
        </button>
      </div>

      {/* Order Selector Tabs */}
      <div className="bg-white rounded-3xl p-4 shadow-card border-2 border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3 overflow-x-auto pb-1 md:pb-0">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0">
            Select Order:
          </span>
          {costingOrders.map(order => (
            <button
              key={order.id}
              onClick={() => setSelectedOrderId(order.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                order.id === selectedOrderId
                  ? 'bg-[#4E3C80] text-white shadow-md'
                  : 'bg-[#F3F0FA] text-slate-700 hover:text-black border border-[#D2C6EA]'
              }`}
            >
              <span>{order.productName}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                order.id === selectedOrderId ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {order.quantity} {order.unit}
              </span>
            </button>
          ))}
        </div>

        {activeOrder && (
          <div className="text-xs text-slate-600 flex items-center gap-4 shrink-0 bg-[#F3F0FA] px-3.5 py-1.5 rounded-2xl border border-[#D2C6EA]">
            <div>
              <span className="text-slate-500">Client: </span>
              <span className="font-bold text-slate-900">{activeOrder.customerName}</span>
            </div>
          </div>
        )}
      </div>

      {activeOrder && liveCalculation && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Direct Production Cost Centers & Margin Slider */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-card border-2 border-slate-100 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-[#E8E2F6] text-[#4E3C80]">
                    <Layers className="w-4 h-4" />
                  </div>
                  <h3 className="font-heading font-black text-base text-[#1E1736]">
                    Direct Production Cost Centers
                  </h3>
                </div>
                <span className="text-xs text-slate-500 font-medium">
                  Batch: {activeOrder.quantity} {activeOrder.unit}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* Raw Material */}
                <div className="p-4 rounded-2xl bg-[#F3F0FA] border border-[#D2C6EA]">
                  <div className="flex items-center justify-between text-slate-600 mb-1 font-bold">
                    <span>Raw Material Cost</span>
                    <span>{((activeOrder.rawMaterialCost / liveCalculation.totalProductionCost) * 100).toFixed(0)}%</span>
                  </div>
                  <div className="font-heading font-black text-xl text-[#4E3C80] font-mono">
                    {formatINR(activeOrder.rawMaterialCost)}
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    ₹{(activeOrder.rawMaterialCost / activeOrder.quantity).toFixed(2)} / unit
                  </span>
                </div>

                {/* Direct Labour */}
                <div className="p-4 rounded-2xl bg-[#FEF3D6] border border-[#F9C349]/50">
                  <div className="flex items-center justify-between text-amber-900 mb-1 font-bold">
                    <span>Direct Labour Cost</span>
                    <span>{((activeOrder.labourCost / liveCalculation.totalProductionCost) * 100).toFixed(0)}%</span>
                  </div>
                  <div className="font-heading font-black text-xl text-amber-900 font-mono">
                    {formatINR(activeOrder.labourCost)}
                  </div>
                  <span className="text-[10px] text-amber-700 mt-1 block">
                    Fitting, welding & machining
                  </span>
                </div>

                {/* Machine & Power */}
                <div className="p-4 rounded-2xl bg-[#FDECE6] border border-[#FAD5C8]">
                  <div className="flex items-center justify-between text-orange-900 mb-1 font-bold">
                    <span>Machine & Power</span>
                    <span>{((activeOrder.machineCost / liveCalculation.totalProductionCost) * 100).toFixed(0)}%</span>
                  </div>
                  <div className="font-heading font-black text-xl text-orange-900 font-mono">
                    {formatINR(activeOrder.machineCost)}
                  </div>
                  <span className="text-[10px] text-orange-700 mt-1 block">
                    Machine hour rate & peak electricity
                  </span>
                </div>

                {/* Overheads */}
                <div className="p-4 rounded-2xl bg-[#F3F0FA] border border-[#D2C6EA]">
                  <div className="flex items-center justify-between text-slate-700 mb-1 font-bold">
                    <span>Factory Overheads</span>
                    <span>{((activeOrder.overheads / liveCalculation.totalProductionCost) * 100).toFixed(0)}%</span>
                  </div>
                  <div className="font-heading font-black text-xl text-slate-900 font-mono">
                    {formatINR(activeOrder.overheads)}
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    Tooling, rent & consumables
                  </span>
                </div>

                {/* Other Expenses */}
                <div className="p-4 rounded-2xl bg-[#F3F0FA] border border-[#D2C6EA]">
                  <div className="flex items-center justify-between text-slate-700 mb-1 font-bold">
                    <span>Other Expenses</span>
                    <span>{((activeOrder.otherExpenses / liveCalculation.totalProductionCost) * 100).toFixed(0)}%</span>
                  </div>
                  <div className="font-heading font-black text-xl text-slate-900 font-mono">
                    {formatINR(activeOrder.otherExpenses)}
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    Zinc plating & surface finishing
                  </span>
                </div>

                {/* Scrap Recovery */}
                <div className="p-4 rounded-2xl bg-[#D1FAE5] border border-emerald-300">
                  <div className="flex items-center justify-between text-emerald-900 mb-1 font-bold">
                    <span>Scrap Recovery</span>
                    <span>Deduction</span>
                  </div>
                  <div className="font-heading font-black text-xl text-emerald-800 font-mono">
                    - {formatINR(activeOrder.scrapRecoveryValue)}
                  </div>
                  <span className="text-[10px] text-emerald-700 mt-1 block">
                    Metal offcuts & swarf credit
                  </span>
                </div>
              </div>
            </div>

            {/* Target Gross Margin Slider */}
            <div className="p-6 rounded-3xl bg-white text-[#1E1736] border-2 border-slate-100 shadow-card space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-[#FAD5C8] text-[#1E1736]">
                    <Sliders className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-base text-[#1E1736]">
                      Target Gross Margin Slider
                    </h3>
                    <p className="text-xs text-slate-500">
                      Instantly recalculates suggested quoting price with verified deterministic math.
                    </p>
                  </div>
                </div>

                <div className="bg-[#4E3C80] text-white px-4 py-1.5 rounded-2xl font-heading font-black text-xl">
                  {targetMargin}%
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-slate-500 w-8">5%</span>
                  <input
                    type="range"
                    min="5"
                    max="50"
                    step="1"
                    value={targetMargin}
                    onChange={(e) => handleApplyMarginChange(Number(e.target.value))}
                    className="flex-1 accent-[#4E3C80] h-2.5 bg-slate-200 rounded-lg cursor-pointer"
                  />
                  <span className="text-xs font-bold text-slate-500 w-8 text-right">50%</span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-1 font-medium">
                  <span>Minimum break-even</span>
                  <span className="text-[#4E3C80] font-bold">MSME target range: 20% - 28%</span>
                  <span>High precision: 35%+</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Computed Summary & Quotation Trigger */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-card border-2 border-slate-100 space-y-5 text-[#1E1736]">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h4 className="font-heading font-black text-base text-[#1E1736]">
                  Order Financial Summary
                </h4>
                <span className="text-[10px] uppercase font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                  Verified Math
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-600 font-medium">Total Net Production Cost:</span>
                  <span className="font-heading font-black text-base text-slate-900 font-mono">
                    {formatINR(liveCalculation.totalProductionCost)}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-600 font-medium">Unit Production Cost:</span>
                  <span className="font-mono font-bold text-slate-800 text-sm">
                    {formatINR(liveCalculation.costPerUnit)} / {activeOrder.unit}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-600 font-medium">Estimated Gross Profit:</span>
                  <span className="font-heading font-black text-base text-emerald-700 font-mono">
                    + {formatINR(liveCalculation.estimatedGrossProfit)}
                  </span>
                </div>

                {/* Big Suggested Selling Price Card */}
                <div className="p-5 rounded-2xl bg-[#FAD5C8] border-2 border-[#F8C4B4] text-center space-y-1">
                  <span className="text-xs uppercase tracking-wider font-black text-[#4E3C80] block">
                    Suggested Selling Price (Pre-GST)
                  </span>
                  <div className="font-heading font-black text-3xl text-[#1E1736] font-mono tracking-tight">
                    {formatINR(liveCalculation.suggestedSellingPrice)}
                  </div>
                  <span className="text-xs text-slate-700 font-medium block">
                    Includes {liveCalculation.estimatedProfitMargin}% margin on {activeOrder.quantity} {activeOrder.unit}
                  </span>
                </div>
              </div>

              <button
                onClick={handleSendToQuotation}
                className="w-full py-3.5 rounded-2xl bg-[#4E3C80] hover:bg-[#3B2C63] text-white font-heading font-black text-xs transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Generate Customer Quotation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Cost Breakdown Donut Chart */}
            <div className="bg-white rounded-3xl p-6 shadow-card border-2 border-slate-100 text-[#1E1736]">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-heading font-black text-sm text-[#1E1736] flex items-center gap-2">
                  <PieIcon className="w-4 h-4 text-[#4E3C80]" />
                  <span>Cost Distribution</span>
                </h4>
              </div>

              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={68}
                      paddingAngle={4}
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(val: any) => [formatINR(val), 'Cost']}
                      contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#D2C6EA', borderRadius: '16px', fontSize: '11px', color: '#1E1736' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] font-bold text-slate-600 pt-2 border-t border-slate-100">
                {chartData.map(item => (
                  <div key={item.name} className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="truncate">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: New Manufacturing Order */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in">
          <div className="bg-white text-[#1E1736] rounded-3xl p-6 max-w-xl w-full shadow-2xl relative border-4 border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200">
              <h3 className="font-heading font-black text-lg text-[#1E1736] flex items-center gap-2">
                <Calculator className="w-5 h-5 text-[#4E3C80]" />
                <span>Create Manufacturing Order Cost Sheet</span>
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-black text-base"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateOrder} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Product / Part Name</label>
                  <input
                    type="text"
                    required
                    value={newProductName}
                    onChange={(e) => setNewProductName(e.target.value)}
                    placeholder="e.g. CNC Hydraulic Manifold Block"
                    className="w-full bg-[#F3F0FA] border border-[#D2C6EA] rounded-xl px-3 py-2 text-[#1E1736] font-medium focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Customer / Client</label>
                  <input
                    type="text"
                    value={newCustomerName}
                    onChange={(e) => setNewCustomerName(e.target.value)}
                    placeholder="e.g. Bharat Auto Components"
                    className="w-full bg-[#F3F0FA] border border-[#D2C6EA] rounded-xl px-3 py-2 text-[#1E1736] font-medium focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Order Quantity</label>
                  <input
                    type="number"
                    required
                    value={newQty}
                    onChange={(e) => setNewQty(e.target.value)}
                    className="w-full bg-[#F3F0FA] border border-[#D2C6EA] rounded-xl px-3 py-2 text-[#1E1736] font-medium focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Unit of Measure</label>
                  <select
                    value={newUnit}
                    onChange={(e) => setNewUnit(e.target.value)}
                    className="w-full bg-[#F3F0FA] border border-[#D2C6EA] rounded-xl px-3 py-2 text-[#1E1736] font-medium focus:outline-none"
                  >
                    <option value="pcs">pieces (pcs)</option>
                    <option value="sets">sets</option>
                    <option value="kg">kg</option>
                    <option value="meters">meters</option>
                  </select>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#F3F0FA] border border-[#D2C6EA] space-y-3">
                <span className="font-heading font-black text-slate-800 block text-xs">
                  Cost Breakdown Centers (INR)
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-600 mb-1 font-medium">Raw Material Cost (₹)</label>
                    <input
                      type="number"
                      required
                      value={newRawCost}
                      onChange={(e) => setNewRawCost(e.target.value)}
                      className="w-full bg-white border border-[#D2C6EA] rounded-xl px-3 py-1.5 text-[#1E1736] font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1 font-medium">Direct Labour Cost (₹)</label>
                    <input
                      type="number"
                      required
                      value={newLabourCost}
                      onChange={(e) => setNewLabourCost(e.target.value)}
                      className="w-full bg-white border border-[#D2C6EA] rounded-xl px-3 py-1.5 text-[#1E1736] font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1 font-medium">Machine & Power (₹)</label>
                    <input
                      type="number"
                      required
                      value={newMachineCost}
                      onChange={(e) => setNewMachineCost(e.target.value)}
                      className="w-full bg-white border border-[#D2C6EA] rounded-xl px-3 py-1.5 text-[#1E1736] font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1 font-medium">Factory Overheads (₹)</label>
                    <input
                      type="number"
                      value={newOverheads}
                      onChange={(e) => setNewOverheads(e.target.value)}
                      className="w-full bg-white border border-[#D2C6EA] rounded-xl px-3 py-1.5 text-[#1E1736] font-medium"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Desired Gross Margin (%)
                </label>
                <input
                  type="number"
                  min="1"
                  max="80"
                  value={newMargin}
                  onChange={(e) => setNewMargin(e.target.value)}
                  className="w-full bg-[#F3F0FA] border border-[#D2C6EA] rounded-xl px-3 py-2 text-[#1E1736] font-medium focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:text-black font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-2xl bg-[#4E3C80] text-white font-bold shadow-md"
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
