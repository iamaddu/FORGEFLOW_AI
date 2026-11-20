// Core data types for ForgeFlow AI

export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  gstin: string;
  rating: number; // 1 to 5
  materialsSupplied: string[];
  paymentTerms: string;
  onTimeDeliveryRate: number; // e.g. 96%
  notes: string;
  active: boolean;
}

export interface SupplierQuote {
  id: string;
  materialReqId: string;
  supplierId: string;
  supplierName: string;
  materialSpec: string;
  unitPrice: number; // in INR per unit (e.g. ₹/kg)
  quantity: number;
  unit: string; // kg, tonnes, pcs, meters
  deliveryCharges: number; // Flat or per order
  taxRatePercent: number; // 5%, 12%, 18%, 28%
  deliveryTimeDays: number;
  quotedDate: string;
  validUntil: string;
  notes?: string;
  // Computed fields:
  baseAmount: number;
  deliveryAmount: number;
  taxableAmount: number;
  taxAmount: number;
  totalLandedCost: number;
  effectiveCostPerUnit: number;
  isBestOffer?: boolean;
  score?: number; // Landed cost + delivery speed composite score
}

export interface MaterialRequirement {
  id: string;
  title: string;
  category: string;
  quantity: number;
  unit: string;
  gradeSpec: string;
  deliveryLocation: string;
  targetDate: string;
  status: 'Open' | 'Comparing' | 'Finalized' | 'PO Issued';
  createdDate: string;
  selectedQuoteId?: string;
}

export interface CostingOrder {
  id: string;
  orderNumber: string;
  productName: string;
  customerName: string;
  quantity: number;
  unit: string;
  // Cost Components:
  rawMaterialCost: number;
  labourCost: number;
  machineCost: number;
  overheads: number;
  otherExpenses: number;
  scrapRecoveryValue: number;
  // Financial margins:
  targetMarginPercent: number; // e.g. 24%
  // Computed:
  totalProductionCost: number;
  costPerUnit: number;
  suggestedSellingPrice: number;
  unitSellingPrice: number;
  estimatedGrossProfit: number;
  estimatedProfitMargin: number;
  status: 'Draft' | 'Approved' | 'Quoted' | 'In Production';
  createdDate: string;
}

export interface QuotationItem {
  id: string;
  description: string;
  hsnCode: string;
  quantity: number;
  unit: string;
  unitCost: number;
  unitPrice: number;
  gstRate: number;
  totalCost: number;
  totalPrice: number;
}

export interface CustomerQuotation {
  id: string;
  quoteNumber: string;
  date: string;
  validUntil: string;
  costingOrderId?: string;
  customer: {
    name: string;
    company: string;
    gstin: string;
    email: string;
    phone: string;
    billingAddress: string;
    deliveryAddress: string;
  };
  items: QuotationItem[];
  paymentTerms: string;
  deliveryTerms: string;
  subtotal: number;
  cgst: number;
  sgst: number;
  igst: number;
  totalTax: number;
  grandTotal: number;
  estimatedCost: number;
  estimatedProfit: number;
  profitMarginPercent: number;
  status: 'Draft' | 'Sent' | 'Accepted' | 'Rejected';
  notes: string;
}

export interface InvoiceDocument {
  id: string;
  invoiceNumber: string;
  supplierName: string;
  supplierGstin: string;
  invoiceDate: string;
  dueDate: string;
  category: string;
  taxableValue: number;
  cgst: number;
  sgst: number;
  igst: number;
  totalAmount: number;
  status: 'Extracted' | 'Verified' | 'Pending' | 'Flagged';
  fileName: string;
  fileSize: string;
  uploadDate: string;
  discrepancies: string[];
  matchedPoNumber?: string;
  hsnBreakdown: Array<{
    hsn: string;
    desc: string;
    rate: number;
    amount: number;
  }>;
}

export interface AlertNotification {
  id: string;
  title: string;
  description: string;
  type: 'danger' | 'warning' | 'success' | 'info';
  timestamp: string;
  linkPage?: string;
  read: boolean;
}

export interface ActivityItem {
  id: string;
  title: string;
  actor: string;
  timeAgo: string;
  iconType: 'cart' | 'calculator' | 'invoice' | 'supplier' | 'alert';
}

export interface UserProfile {
  name: string;
  role: string;
  companyName: string;
  gstin: string;
  avatarInitials: string;
  email: string;
}
