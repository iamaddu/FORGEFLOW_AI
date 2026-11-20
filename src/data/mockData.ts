import {
  Supplier,
  SupplierQuote,
  MaterialRequirement,
  CostingOrder,
  CustomerQuotation,
  InvoiceDocument,
  AlertNotification,
  ActivityItem,
  UserProfile
} from '../types';
import { calculateQuoteLandedCost, calculateOrderCosting } from '../utils/calculations';

export const INITIAL_USER: UserProfile = {
  name: 'Dhanush S.',
  role: 'Managing Director / Plant Head',
  companyName: 'Apex Forge & Precision Works LLP',
  gstin: '27AABCA1234F1Z8',
  avatarInitials: 'DS',
  email: 'dhanush@apexforge.in'
};

export const INITIAL_SUPPLIERS: Supplier[] = [
  {
    id: 'sup-1',
    name: 'Apex Steel & Tubes Pvt Ltd',
    contactPerson: 'Rajesh Sharma',
    phone: '+91 98201 45890',
    email: 'rajesh@apexsteel.co.in',
    city: 'Pune',
    state: 'Maharashtra',
    gstin: '27AABCA9812M1Z5',
    rating: 4.8,
    materialsSupplied: ['MS Steel Sheets', 'CRCA Coils', 'Mild Steel Plates'],
    paymentTerms: '30 Days Net',
    onTimeDeliveryRate: 97,
    notes: 'Primary supplier for flat steel. Consistent quality and test certificates provided with every batch.',
    active: true
  },
  {
    id: 'sup-2',
    name: 'Jindal Alloys Traders',
    contactPerson: 'Vikram Jindal',
    phone: '+91 94140 23119',
    email: 'sales@jindalalloys.in',
    city: 'Mumbai',
    state: 'Maharashtra',
    gstin: '27AAACJ4321B1Z2',
    rating: 4.5,
    materialsSupplied: ['Stainless Steel 304', 'SS Rods', 'Round Bars'],
    paymentTerms: '15 Days / PDC',
    onTimeDeliveryRate: 92,
    notes: 'Offers competitive base pricing on bulk rods. Freight varies depending on warehouse stock.',
    active: true
  },
  {
    id: 'sup-3',
    name: 'Mittal Metasteel Corp',
    contactPerson: 'Sanjay Mittal',
    phone: '+91 98791 88320',
    email: 'orders@mittalmetasteel.com',
    city: 'Ahmedabad',
    state: 'Gujarat',
    gstin: '24AABCM7654C1Z9',
    rating: 4.7,
    materialsSupplied: ['Aluminium 6061-T6', 'Extruded Profiles', 'Brass Hex Bars'],
    paymentTerms: '45 Days Net',
    onTimeDeliveryRate: 95,
    notes: 'Zero transit damage recorded in last 12 shipments. Includes free delivery on orders above ₹25,000.',
    active: true
  },
  {
    id: 'sup-4',
    name: 'Bharat Forgings Supply',
    contactPerson: 'K. Venkatesh',
    phone: '+91 94440 12893',
    email: 'venkat@bharatforgingsupply.in',
    city: 'Chennai',
    state: 'Tamil Nadu',
    gstin: '33AABCB5544D1Z1',
    rating: 4.3,
    materialsSupplied: ['EN8 Carbon Steel', 'Forging Billets', 'EN19 Alloy'],
    paymentTerms: '30 Days Net',
    onTimeDeliveryRate: 89,
    notes: 'Strong metallurgical certification; longer dispatch lead time of 7-10 days.',
    active: true
  },
  {
    id: 'sup-5',
    name: 'Shri Ram Metals & Alloys',
    contactPerson: 'Rameshwar Gupta',
    phone: '+91 98110 56712',
    email: 'info@shrirammetals.in',
    city: 'Faridabad',
    state: 'Haryana',
    gstin: '06AABCS3322E1Z4',
    rating: 4.6,
    materialsSupplied: ['Copper Strips', 'Brass Sheets', 'Phosphor Bronze'],
    paymentTerms: 'Advance / 7 Days',
    onTimeDeliveryRate: 94,
    notes: 'Premium non-ferrous raw materials. Daily spot rate adjustments.',
    active: true
  }
];

export const INITIAL_MATERIAL_REQUIREMENTS: MaterialRequirement[] = [
  {
    id: 'req-101',
    title: 'MS Steel Sheet (3mm IS 2062 Grade B)',
    category: 'Ferrous Metals',
    quantity: 500,
    unit: 'kg',
    gradeSpec: 'IS 2062 Grade B - 3.0mm thickness, Pickled & Oiled',
    deliveryLocation: 'Bhosari Industrial Estate, Pune (Factory Gate 2)',
    targetDate: '2025-06-25',
    status: 'Comparing',
    createdDate: '2025-06-14'
  },
  {
    id: 'req-102',
    title: 'SS 304 Bright Round Rods (25mm dia)',
    category: 'Stainless Steel',
    quantity: 350,
    unit: 'kg',
    gradeSpec: 'AISI 304 Annealed, peeled & polished finish',
    deliveryLocation: 'Bhosari Industrial Estate, Pune',
    targetDate: '2025-06-28',
    status: 'Open',
    createdDate: '2025-06-15'
  },
  {
    id: 'req-103',
    title: 'Aluminium 6061-T6 Extruded Square Bar',
    category: 'Non-Ferrous',
    quantity: 200,
    unit: 'kg',
    gradeSpec: 'ASTM B221, Temper T6, 40mm x 40mm',
    deliveryLocation: 'Bhosari Industrial Estate, Pune',
    targetDate: '2025-07-02',
    status: 'Finalized',
    createdDate: '2025-06-10'
  }
];

// Initial quotes for req-101 (Illustrative sample requested by user!)
const baseQuoteA = {
  id: 'quote-101-a',
  materialReqId: 'req-101',
  supplierId: 'sup-1',
  supplierName: 'Supplier A (Apex Steel)',
  materialSpec: 'MS Sheet 3mm IS 2062 Gr B (Tata Steel / JSW prime)',
  unitPrice: 50,
  quantity: 500,
  unit: 'kg',
  deliveryCharges: 500,
  taxRatePercent: 18,
  deliveryTimeDays: 2,
  quotedDate: '2025-06-15',
  validUntil: '2025-06-22',
  notes: 'Includes mill test certificate; next-day dispatch from Pune depot.'
};

const baseQuoteB = {
  id: 'quote-101-b',
  materialReqId: 'req-101',
  supplierId: 'sup-2',
  supplierName: 'Supplier B (Jindal Alloys)',
  materialSpec: 'MS Sheet 3mm IS 2062 Gr B (Secondary / Commercial Gr)',
  unitPrice: 48, // Appears cheaper at first glance!
  quantity: 500,
  unit: 'kg',
  deliveryCharges: 1500, // Higher freight wipes out unit savings!
  taxRatePercent: 18,
  deliveryTimeDays: 5,
  quotedDate: '2025-06-15',
  validUntil: '2025-06-20',
  notes: 'Dispatch from Navi Mumbai godown; freight extra.'
};

const baseQuoteC = {
  id: 'quote-101-c',
  materialReqId: 'req-101',
  supplierId: 'sup-3',
  supplierName: 'Supplier C (Mittal Metasteel)',
  materialSpec: 'MS Sheet 3mm IS 2062 Gr B (JSW Steel Prime certified)',
  unitPrice: 52,
  quantity: 500,
  unit: 'kg',
  deliveryCharges: 0, // Free delivery promo!
  taxRatePercent: 18,
  deliveryTimeDays: 3,
  quotedDate: '2025-06-15',
  validUntil: '2025-06-25',
  notes: 'Free door-step delivery in Pune region for orders above ₹25,000.'
};

export const INITIAL_QUOTES: SupplierQuote[] = [
  {
    ...baseQuoteA,
    ...calculateQuoteLandedCost(baseQuoteA),
    isBestOffer: true
  },
  {
    ...baseQuoteB,
    ...calculateQuoteLandedCost(baseQuoteB),
    isBestOffer: false
  },
  {
    ...baseQuoteC,
    ...calculateQuoteLandedCost(baseQuoteC),
    isBestOffer: false
  }
];

export const INITIAL_COSTING_ORDERS: CostingOrder[] = [
  {
    id: 'ord-243',
    orderNumber: 'ORD-2025-243',
    productName: 'Heavy Flange Assembly - Model F75',
    customerName: 'Mahindra & Mahindra Tier-1 vendor',
    quantity: 120,
    unit: 'pcs',
    rawMaterialCost: 45600,
    labourCost: 14400,
    machineCost: 18000,
    overheads: 7200,
    otherExpenses: 2800,
    scrapRecoveryValue: 3000,
    targetMarginPercent: 25,
    ...calculateOrderCosting({
      quantity: 120,
      rawMaterialCost: 45600,
      labourCost: 14400,
      machineCost: 18000,
      overheads: 7200,
      otherExpenses: 2800,
      scrapRecoveryValue: 3000,
      targetMarginPercent: 25
    }),
    status: 'Approved',
    createdDate: '2025-06-14'
  },
  {
    id: 'ord-237',
    orderNumber: 'ORD-2025-237',
    productName: 'Precision CNC Turned Spindle Shafts',
    customerName: 'Kirloskar Pneumatic Co Ltd',
    quantity: 250,
    unit: 'pcs',
    rawMaterialCost: 82500,
    labourCost: 22500,
    machineCost: 31000,
    overheads: 12500,
    otherExpenses: 4500,
    scrapRecoveryValue: 5000,
    targetMarginPercent: 28,
    ...calculateOrderCosting({
      quantity: 250,
      rawMaterialCost: 82500,
      labourCost: 22500,
      machineCost: 31000,
      overheads: 12500,
      otherExpenses: 4500,
      scrapRecoveryValue: 5000,
      targetMarginPercent: 28
    }),
    status: 'Quoted',
    createdDate: '2025-06-12'
  },
  {
    id: 'ord-240',
    orderNumber: 'ORD-2025-240',
    productName: 'Laser Cut Heavy Mounting Brackets (SS 304)',
    customerName: 'Thermax Heavy Boilers Div',
    quantity: 500,
    unit: 'pcs',
    rawMaterialCost: 115000,
    labourCost: 28000,
    machineCost: 42000,
    overheads: 15000,
    otherExpenses: 6000,
    scrapRecoveryValue: 12000,
    targetMarginPercent: 22,
    ...calculateOrderCosting({
      quantity: 500,
      rawMaterialCost: 115000,
      labourCost: 28000,
      machineCost: 42000,
      overheads: 15000,
      otherExpenses: 6000,
      scrapRecoveryValue: 12000,
      targetMarginPercent: 22
    }),
    status: 'In Production',
    createdDate: '2025-06-11'
  }
];

export const INITIAL_QUOTATIONS: CustomerQuotation[] = [
  {
    id: 'quot-101',
    quoteNumber: 'QUOT-2025-089',
    date: '2025-06-15',
    validUntil: '2025-07-15',
    costingOrderId: 'ord-243',
    customer: {
      name: 'Anand Deshmukh',
      company: 'Bharat Auto Components Ltd',
      gstin: '27AAACB9876Q1Z0',
      email: 'a.deshmukh@bharatauto.com',
      phone: '+91 98220 77611',
      billingAddress: 'Plot 44, MIDC Chakan Phase II, Pune - 410501',
      deliveryAddress: 'Plant Gate 4, MIDC Chakan Phase II, Pune - 410501'
    },
    items: [
      {
        id: 'item-1',
        description: 'Heavy Flange Assembly Model F75 (Machined & Zinc Plated)',
        hsnCode: '73269099',
        quantity: 120,
        unit: 'pcs',
        unitCost: 708.33,
        unitPrice: 944.44,
        gstRate: 18,
        totalCost: 85000,
        totalPrice: 113333
      }
    ],
    paymentTerms: '30 Days from date of invoice against Delivery Challan',
    deliveryTerms: 'Door delivery included to Chakan works within 10 days of PO',
    subtotal: 113333,
    cgst: 10200,
    sgst: 10200,
    igst: 0,
    totalTax: 20400,
    grandTotal: 133733,
    estimatedCost: 85000,
    estimatedProfit: 28333,
    profitMarginPercent: 25.0,
    status: 'Sent',
    notes: 'Quotation valid for 30 days. Material test certificates and 100% CMM inspection report will accompany the shipment.'
  }
];

export const INITIAL_INVOICES: InvoiceDocument[] = [
  {
    id: 'inv-1042',
    invoiceNumber: 'INV-1042',
    supplierName: 'Apex Steel & Tubes Pvt Ltd',
    supplierGstin: '27AABCA9812M1Z5',
    invoiceDate: '2025-06-15',
    dueDate: '2025-07-15',
    category: 'Raw Material',
    taxableValue: 125000,
    cgst: 11250,
    sgst: 11250,
    igst: 0,
    totalAmount: 147500,
    status: 'Extracted',
    fileName: 'INV_1042_Apex_Steel_Signed.pdf',
    fileSize: '412 KB',
    uploadDate: '2025-06-15 10:14 AM',
    discrepancies: [
      'Missing E-Way Bill Number on page 1',
      'HSN 7208 description slightly differs from purchase requisition'
    ],
    matchedPoNumber: 'PO-2025-091',
    hsnBreakdown: [
      { hsn: '72083890', desc: 'MS Plate 12mm IS 2062 E250', rate: 18, amount: 125000 }
    ]
  },
  {
    id: 'inv-1041',
    invoiceNumber: 'INV-1041',
    supplierName: 'Jindal Alloys Traders',
    supplierGstin: '27AAACJ4321B1Z2',
    invoiceDate: '2025-06-13',
    dueDate: '2025-06-28',
    category: 'Raw Material',
    taxableValue: 88400,
    cgst: 7956,
    sgst: 7956,
    igst: 0,
    totalAmount: 104312,
    status: 'Verified',
    fileName: 'Jindal_INV_1041.pdf',
    fileSize: '620 KB',
    uploadDate: '2025-06-13 03:45 PM',
    discrepancies: [],
    matchedPoNumber: 'PO-2025-088',
    hsnBreakdown: [
      { hsn: '72221119', desc: 'SS 304 Round Bars 25mm dia', rate: 18, amount: 88400 }
    ]
  },
  {
    id: 'inv-1040',
    invoiceNumber: 'INV-1040',
    supplierName: 'Mittal Metasteel Corp',
    supplierGstin: '24AABCM7654C1Z9',
    invoiceDate: '2025-06-11',
    dueDate: '2025-07-26',
    category: 'Consumables & Tooling',
    taxableValue: 46200,
    cgst: 0,
    sgst: 0,
    igst: 8316,
    totalAmount: 54516,
    status: 'Pending',
    fileName: 'Mittal_Tax_Invoice_1040.png',
    fileSize: '1.2 MB',
    uploadDate: '2025-06-11 11:20 AM',
    discrepancies: [
      'IGST applied for interstate shipment from Gujarat to Maharashtra (Pending 2B reconciliation)'
    ],
    matchedPoNumber: 'PO-2025-085',
    hsnBreakdown: [
      { hsn: '76042910', desc: 'Aluminium 6061 Extrusions', rate: 18, amount: 46200 }
    ]
  }
];

export const INITIAL_ALERTS: AlertNotification[] = [
  {
    id: 'alt-1',
    title: 'GST Document Missing',
    description: 'Invoice #INV-1042 missing valid E-Way Bill attachment for input tax credit eligibility.',
    type: 'danger',
    timestamp: '2h ago',
    linkPage: 'invoices',
    read: false
  },
  {
    id: 'alt-2',
    title: 'Price Hike Alert',
    description: 'Steel billet benchmark prices up by 5.2% on MCX / NCDEX spot index this week.',
    type: 'warning',
    timestamp: '4h ago',
    linkPage: 'procurement',
    read: false
  },
  {
    id: 'alt-3',
    title: 'Quotation Ready',
    description: 'Order #Q-237 quotation preview ready for Anand Deshmukh (Bharat Auto Components).',
    type: 'success',
    timestamp: '5h ago',
    linkPage: 'quotations',
    read: false
  }
];

export const INITIAL_ACTIVITIES: ActivityItem[] = [
  {
    id: 'act-1',
    title: 'New supplier quotation added for MS Sheet 3mm',
    actor: 'You',
    timeAgo: '2m ago',
    iconType: 'cart'
  },
  {
    id: 'act-2',
    title: 'Costing analysis completed for Order #ORD-2025-243',
    actor: 'You',
    timeAgo: '5m ago',
    iconType: 'calculator'
  },
  {
    id: 'act-3',
    title: 'Invoice processed and HSN verified: INV-1042',
    actor: 'Auto-Scanner',
    timeAgo: '10m ago',
    iconType: 'invoice'
  },
  {
    id: 'act-4',
    title: 'Supplier score updated for Apex Steel & Tubes (97%)',
    actor: 'System',
    timeAgo: '1h ago',
    iconType: 'supplier'
  }
];

export const PROFITABILITY_TREND_DATA = [
  { month: 'Jan', margin: 14, target: 20 },
  { month: 'Feb', margin: 18, target: 20 },
  { month: 'Mar', margin: 19, target: 20 },
  { month: 'Apr', margin: 16, target: 20 },
  { month: 'May', margin: 22, target: 20 },
  { month: 'Jun', margin: 26, target: 20 }
];

export const SPEND_MONTHLY_DATA = [
  { month: 'Jan', spend: 320000, orders: 5 },
  { month: 'Feb', spend: 380000, orders: 7 },
  { month: 'Mar', spend: 410000, orders: 8 },
  { month: 'Apr', spend: 390000, orders: 6 },
  { month: 'May', spend: 450000, orders: 9 },
  { month: 'Jun', spend: 480000, orders: 8 }
];
