import { SupplierQuote } from '../types';

/**
 * Calculates accurate Landed Cost for Indian manufacturing procurement:
 * Base Price = unitPrice * quantity
 * Delivery / Freight Charges
 * Taxable Base = Base Price + Freight (per standard GST valuation rules)
 * Tax Amount = Taxable Base * (taxRatePercent / 100)
 * Total Landed Cost = Taxable Base + Tax Amount
 * Effective Cost Per Unit = Total Landed Cost / quantity
 */
export function calculateQuoteLandedCost(quote: {
  unitPrice: number;
  quantity: number;
  deliveryCharges: number;
  taxRatePercent: number;
}): {
  baseAmount: number;
  deliveryAmount: number;
  taxableAmount: number;
  taxAmount: number;
  totalLandedCost: number;
  effectiveCostPerUnit: number;
} {
  const baseAmount = Number(quote.unitPrice || 0) * Number(quote.quantity || 0);
  const deliveryAmount = Number(quote.deliveryCharges || 0);
  // In Indian GST, transport charges incurred by supplier are bundled in taxable value:
  const taxableAmount = baseAmount + deliveryAmount;
  const taxRate = Number(quote.taxRatePercent || 0) / 100;
  const taxAmount = taxableAmount * taxRate;
  const totalLandedCost = taxableAmount + taxAmount;
  const quantity = Number(quote.quantity || 1) || 1;
  const effectiveCostPerUnit = totalLandedCost / quantity;

  return {
    baseAmount: Math.round(baseAmount * 100) / 100,
    deliveryAmount: Math.round(deliveryAmount * 100) / 100,
    taxableAmount: Math.round(taxableAmount * 100) / 100,
    taxAmount: Math.round(taxAmount * 100) / 100,
    totalLandedCost: Math.round(totalLandedCost * 100) / 100,
    effectiveCostPerUnit: Math.round(effectiveCostPerUnit * 100) / 100,
  };
}

/**
 * Identifies the best comparable offer from a list of supplier quotes based on Total Landed Cost.
 * Also calculates percentage difference vs the lowest quote.
 */
export function evaluateSupplierQuotes(quotes: SupplierQuote[]): SupplierQuote[] {
  if (!quotes || quotes.length === 0) return [];

  // First enrich all quotes with calculated landed costs
  const enriched = quotes.map(q => {
    const calc = calculateQuoteLandedCost({
      unitPrice: q.unitPrice,
      quantity: q.quantity,
      deliveryCharges: q.deliveryCharges,
      taxRatePercent: q.taxRatePercent,
    });
    return {
      ...q,
      ...calc,
      isBestOffer: false,
    };
  });

  // Find minimum landed cost
  const minLanded = Math.min(...enriched.map(q => q.effectiveCostPerUnit));

  return enriched.map(q => {
    const isBest = Math.abs(q.effectiveCostPerUnit - minLanded) < 0.01;
    return {
      ...q,
      isBestOffer: isBest,
    };
  });
}

/**
 * Calculates deterministic production costs and margins:
 * Total Cost = Raw Material + Labour + Machine/Power + Overheads + Other Expenses - Scrap Recovery
 * Suggested Selling Price = Total Cost / (1 - (targetMarginPercent / 100))
 * Gross Profit = Suggested Selling Price - Total Cost
 */
export function calculateOrderCosting(data: {
  quantity: number;
  rawMaterialCost: number;
  labourCost: number;
  machineCost: number;
  overheads: number;
  otherExpenses: number;
  scrapRecoveryValue: number;
  targetMarginPercent: number;
}) {
  const qty = Math.max(1, Number(data.quantity) || 1);
  const raw = Number(data.rawMaterialCost) || 0;
  const labour = Number(data.labourCost) || 0;
  const machine = Number(data.machineCost) || 0;
  const overheads = Number(data.overheads) || 0;
  const other = Number(data.otherExpenses) || 0;
  const scrap = Number(data.scrapRecoveryValue) || 0;

  const totalCost = Math.max(0, raw + labour + machine + overheads + other - scrap);
  const costPerUnit = totalCost / qty;

  const targetMargin = Math.min(95, Math.max(0, Number(data.targetMarginPercent) || 0));
  // Selling price formula with target gross margin: Price = Cost / (1 - MarginRate)
  const marginFraction = targetMargin / 100;
  const sellingPrice = marginFraction < 1 ? totalCost / (1 - marginFraction) : totalCost * 1.5;
  const unitSellingPrice = sellingPrice / qty;
  const grossProfit = sellingPrice - totalCost;
  const actualMarginPercent = sellingPrice > 0 ? (grossProfit / sellingPrice) * 100 : 0;

  return {
    totalProductionCost: Math.round(totalCost * 100) / 100,
    costPerUnit: Math.round(costPerUnit * 100) / 100,
    suggestedSellingPrice: Math.round(sellingPrice * 100) / 100,
    unitSellingPrice: Math.round(unitSellingPrice * 100) / 100,
    estimatedGrossProfit: Math.round(grossProfit * 100) / 100,
    estimatedProfitMargin: Math.round(actualMarginPercent * 10) / 10,
  };
}

/**
 * Format currency in Indian standard formatting (Lakhs & Crores or comma separated)
 */
export function formatINR(val: number, options?: { compact?: boolean; hideSymbol?: boolean }): string {
  const num = Number(val) || 0;
  const symbol = options?.hideSymbol ? '' : '₹';

  if (options?.compact) {
    if (Math.abs(num) >= 10000000) {
      return `${symbol}${(num / 10000000).toFixed(2)} Cr`;
    }
    if (Math.abs(num) >= 100000) {
      return `${symbol}${(num / 100000).toFixed(1)}L`;
    }
    if (Math.abs(num) >= 1000) {
      return `${symbol}${(num / 1000).toFixed(1)}k`;
    }
    return `${symbol}${num.toLocaleString('en-IN')}`;
  }

  return `${symbol}${num.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
}
