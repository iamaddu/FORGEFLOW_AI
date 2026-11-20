import React, { createContext, useContext, useState, useEffect } from 'react';
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
import {
  INITIAL_USER,
  INITIAL_SUPPLIERS,
  INITIAL_MATERIAL_REQUIREMENTS,
  INITIAL_QUOTES,
  INITIAL_COSTING_ORDERS,
  INITIAL_QUOTATIONS,
  INITIAL_INVOICES,
  INITIAL_ALERTS,
  INITIAL_ACTIVITIES
} from '../data/mockData';
import { evaluateSupplierQuotes, calculateQuoteLandedCost, calculateOrderCosting } from '../utils/calculations';

export type PageId =
  | 'login'
  | 'dashboard'
  | 'procurement'
  | 'costing'
  | 'quotations'
  | 'invoices'
  | 'suppliers'
  | 'reports'
  | 'settings'
  | 'seller-dashboard'
  | 'seller-catalog'
  | 'seller-rfq'
  | 'seller-orders'
  | 'seller-analytics';

export type UserRole = 'buyer' | 'seller';

interface AppContextType {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  isAuthenticated: boolean;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  login: (email?: string, role?: UserRole) => void;
  logout: () => void;
  user: UserProfile;
  setUser: (u: UserProfile) => void;

  // Suppliers
  suppliers: Supplier[];
  addSupplier: (supplier: Omit<Supplier, 'id'>) => void;
  updateSupplier: (id: string, supplier: Partial<Supplier>) => void;
  deleteSupplier: (id: string) => void;

  // Material Requirements & Procurement Quotes
  materialRequirements: MaterialRequirement[];
  addMaterialRequirement: (req: Omit<MaterialRequirement, 'id' | 'createdDate' | 'status'>) => string;
  quotes: SupplierQuote[];
  addQuote: (quote: Omit<SupplierQuote, 'id' | 'baseAmount' | 'deliveryAmount' | 'taxableAmount' | 'taxAmount' | 'totalLandedCost' | 'effectiveCostPerUnit' | 'isBestOffer'>) => void;
  deleteQuote: (id: string) => void;

  // Intelligent Costing
  costingOrders: CostingOrder[];
  addCostingOrder: (order: Omit<CostingOrder, 'id' | 'createdDate' | 'totalProductionCost' | 'costPerUnit' | 'suggestedSellingPrice' | 'unitSellingPrice' | 'estimatedGrossProfit' | 'estimatedProfitMargin'>) => string;
  updateCostingOrder: (id: string, updates: Partial<CostingOrder>) => void;
  deleteCostingOrder: (id: string) => void;

  // Customer Quotations
  quotations: CustomerQuotation[];
  addQuotation: (quotation: Omit<CustomerQuotation, 'id'>) => string;
  updateQuotation: (id: string, updates: Partial<CustomerQuotation>) => void;
  deleteQuotation: (id: string) => void;

  // Invoice Intelligence
  invoices: InvoiceDocument[];
  addInvoice: (invoice: Omit<InvoiceDocument, 'id' | 'uploadDate'>) => void;
  updateInvoice: (id: string, updates: Partial<InvoiceDocument>) => void;
  deleteInvoice: (id: string) => void;

  // Alerts & Activities
  alerts: AlertNotification[];
  markAlertRead: (id: string) => void;
  activities: ActivityItem[];
  addActivity: (title: string, iconType: ActivityItem['iconType']) => void;

  // Toast / Feedback
  toast: { message: string; type: 'success' | 'info' | 'warning' | 'error' } | null;
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;

  // Story modal state: "A Day with ForgeFlow (Ravi's Story)"
  isStoryModalOpen: boolean;
  setIsStoryModalOpen: (open: boolean) => void;
  resetToSampleData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY_PREFIX = 'forgeflow_v2_';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem(`${STORAGE_KEY_PREFIX}auth`) === 'true';
  });

  const [userRole, setUserRoleState] = useState<UserRole>(() => {
    return (localStorage.getItem(`${STORAGE_KEY_PREFIX}role`) as UserRole) || 'buyer';
  });

  const setUserRole = (role: UserRole) => {
    setUserRoleState(role);
    localStorage.setItem(`${STORAGE_KEY_PREFIX}role`, role);
    setCurrentPage(role === 'seller' ? 'seller-dashboard' : 'dashboard');
  };

  const [currentPage, setCurrentPage] = useState<PageId>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}page`) as PageId;
    return saved || 'dashboard';
  });

  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}user`);
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [suppliers, setSuppliers] = useState<Supplier[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}suppliers`);
    return saved ? JSON.parse(saved) : INITIAL_SUPPLIERS;
  });

  const [materialRequirements, setMaterialRequirements] = useState<MaterialRequirement[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}mat_reqs`);
    return saved ? JSON.parse(saved) : INITIAL_MATERIAL_REQUIREMENTS;
  });

  const [quotes, setQuotes] = useState<SupplierQuote[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}quotes`);
    return saved ? JSON.parse(saved) : evaluateSupplierQuotes(INITIAL_QUOTES);
  });

  const [costingOrders, setCostingOrders] = useState<CostingOrder[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}costing_orders`);
    return saved ? JSON.parse(saved) : INITIAL_COSTING_ORDERS;
  });

  const [quotations, setQuotations] = useState<CustomerQuotation[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}quotations`);
    return saved ? JSON.parse(saved) : INITIAL_QUOTATIONS;
  });

  const [invoices, setInvoices] = useState<InvoiceDocument[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}invoices`);
    return saved ? JSON.parse(saved) : INITIAL_INVOICES;
  });

  const [alerts, setAlerts] = useState<AlertNotification[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}alerts`);
    return saved ? JSON.parse(saved) : INITIAL_ALERTS;
  });

  const [activities, setActivities] = useState<ActivityItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}activities`);
    return saved ? JSON.parse(saved) : INITIAL_ACTIVITIES;
  });

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'warning' | 'error' } | null>(null);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}auth`, String(isAuthenticated));
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}page`, currentPage);
  }, [currentPage]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}suppliers`, JSON.stringify(suppliers));
  }, [suppliers]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}mat_reqs`, JSON.stringify(materialRequirements));
  }, [materialRequirements]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}quotes`, JSON.stringify(quotes));
  }, [quotes]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}costing_orders`, JSON.stringify(costingOrders));
  }, [costingOrders]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}quotations`, JSON.stringify(quotations));
  }, [quotations]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}invoices`, JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}alerts`, JSON.stringify(alerts));
  }, [alerts]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}activities`, JSON.stringify(activities));
  }, [activities]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const login = (email?: string, role: UserRole = 'buyer') => {
    setIsAuthenticated(true);
    setUserRoleState(role);
    localStorage.setItem(`${STORAGE_KEY_PREFIX}role`, role);
    if (email) {
      setUser(prev => ({ ...prev, email }));
    }
    setCurrentPage(role === 'seller' ? 'seller-dashboard' : 'dashboard');
    showToast(`Welcome back, ${user.name}! Workspace synchronized.`, 'success');
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentPage('login');
    showToast('Signed out successfully.', 'info');
  };

  const addActivity = (title: string, iconType: ActivityItem['iconType'] = 'cart') => {
    const newAct: ActivityItem = {
      id: `act-${Date.now()}`,
      title,
      actor: 'You',
      timeAgo: 'Just now',
      iconType
    };
    setActivities(prev => [newAct, ...prev.slice(0, 9)]);
  };

  const addSupplier = (s: Omit<Supplier, 'id'>) => {
    const newSup: Supplier = { ...s, id: `sup-${Date.now()}` };
    setSuppliers(prev => [newSup, ...prev]);
    addActivity(`Added new supplier: ${s.name}`, 'supplier');
    showToast(`Supplier "${s.name}" added successfully.`);
  };

  const updateSupplier = (id: string, updates: Partial<Supplier>) => {
    setSuppliers(prev => prev.map(s => (s.id === id ? { ...s, ...updates } : s)));
    showToast('Supplier details updated.');
  };

  const deleteSupplier = (id: string) => {
    setSuppliers(prev => prev.filter(s => s.id !== id));
    showToast('Supplier removed.', 'info');
  };

  const addMaterialRequirement = (req: Omit<MaterialRequirement, 'id' | 'createdDate' | 'status'>): string => {
    const newId = `req-${Date.now()}`;
    const newReq: MaterialRequirement = {
      ...req,
      id: newId,
      status: 'Comparing',
      createdDate: new Date().toISOString().split('T')[0]
    };
    setMaterialRequirements(prev => [newReq, ...prev]);
    addActivity(`Created requirement: ${req.title}`, 'cart');
    showToast(`Material requirement "${req.title}" created.`);
    return newId;
  };

  const addQuote = (quoteData: Omit<SupplierQuote, 'id' | 'baseAmount' | 'deliveryAmount' | 'taxableAmount' | 'taxAmount' | 'totalLandedCost' | 'effectiveCostPerUnit' | 'isBestOffer'>) => {
    const calc = calculateQuoteLandedCost({
      unitPrice: quoteData.unitPrice,
      quantity: quoteData.quantity,
      deliveryCharges: quoteData.deliveryCharges,
      taxRatePercent: quoteData.taxRatePercent
    });

    const newQuote: SupplierQuote = {
      ...quoteData,
      ...calc,
      id: `quote-${Date.now()}`,
      isBestOffer: false
    };

    setQuotes(prev => {
      const updated = [...prev, newQuote];
      return evaluateSupplierQuotes(updated);
    });

    addActivity(`Added quotation from ${quoteData.supplierName}`, 'cart');
    showToast(`Quotation from ${quoteData.supplierName} added & landed cost calculated.`);
  };

  const deleteQuote = (id: string) => {
    setQuotes(prev => {
      const filtered = prev.filter(q => q.id !== id);
      return evaluateSupplierQuotes(filtered);
    });
    showToast('Quotation deleted.', 'info');
  };

  const addCostingOrder = (orderData: Omit<CostingOrder, 'id' | 'createdDate' | 'totalProductionCost' | 'costPerUnit' | 'suggestedSellingPrice' | 'unitSellingPrice' | 'estimatedGrossProfit' | 'estimatedProfitMargin'>): string => {
    const calculations = calculateOrderCosting({
      quantity: orderData.quantity,
      rawMaterialCost: orderData.rawMaterialCost,
      labourCost: orderData.labourCost,
      machineCost: orderData.machineCost,
      overheads: orderData.overheads,
      otherExpenses: orderData.otherExpenses,
      scrapRecoveryValue: orderData.scrapRecoveryValue,
      targetMarginPercent: orderData.targetMarginPercent
    });

    const newId = `ord-${Date.now()}`;
    const newOrder: CostingOrder = {
      ...orderData,
      ...calculations,
      id: newId,
      createdDate: new Date().toISOString().split('T')[0]
    };

    setCostingOrders(prev => [newOrder, ...prev]);
    addActivity(`Calculated costing for: ${orderData.productName}`, 'calculator');
    showToast(`Cost sheet computed for ${orderData.productName}`);
    return newId;
  };

  const updateCostingOrder = (id: string, updates: Partial<CostingOrder>) => {
    setCostingOrders(prev =>
      prev.map(ord => {
        if (ord.id !== id) return ord;
        const merged = { ...ord, ...updates };
        const recalculated = calculateOrderCosting({
          quantity: merged.quantity,
          rawMaterialCost: merged.rawMaterialCost,
          labourCost: merged.labourCost,
          machineCost: merged.machineCost,
          overheads: merged.overheads,
          otherExpenses: merged.otherExpenses,
          scrapRecoveryValue: merged.scrapRecoveryValue,
          targetMarginPercent: merged.targetMarginPercent
        });
        return { ...merged, ...recalculated };
      })
    );
    showToast('Order costing recomputed.');
  };

  const deleteCostingOrder = (id: string) => {
    setCostingOrders(prev => prev.filter(o => o.id !== id));
    showToast('Costing order removed.', 'info');
  };

  const addQuotation = (quotationData: Omit<CustomerQuotation, 'id'>): string => {
    const newId = `quot-${Date.now()}`;
    const newQuot: CustomerQuotation = { ...quotationData, id: newId };
    setQuotations(prev => [newQuot, ...prev]);
    addActivity(`Generated quote ${quotationData.quoteNumber} for ${quotationData.customer.company}`, 'invoice');
    showToast(`Quotation ${quotationData.quoteNumber} created!`);
    return newId;
  };

  const updateQuotation = (id: string, updates: Partial<CustomerQuotation>) => {
    setQuotations(prev => prev.map(q => (q.id === id ? { ...q, ...updates } : q)));
    showToast('Quotation updated.');
  };

  const deleteQuotation = (id: string) => {
    setQuotations(prev => prev.filter(q => q.id !== id));
    showToast('Quotation deleted.', 'info');
  };

  const addInvoice = (inv: Omit<InvoiceDocument, 'id' | 'uploadDate'>) => {
    const newId = `inv-${Date.now()}`;
    const newInvoice: InvoiceDocument = {
      ...inv,
      id: newId,
      uploadDate: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })
    };
    setInvoices(prev => [newInvoice, ...prev]);
    addActivity(`Processed invoice ${inv.invoiceNumber} from ${inv.supplierName}`, 'invoice');
    showToast(`Invoice ${inv.invoiceNumber} extracted and indexed.`);
  };

  const updateInvoice = (id: string, updates: Partial<InvoiceDocument>) => {
    setInvoices(prev => prev.map(inv => (inv.id === id ? { ...inv, ...updates } : inv)));
    showToast('Invoice updated.');
  };

  const deleteInvoice = (id: string) => {
    setInvoices(prev => prev.filter(inv => inv.id !== id));
    showToast('Invoice deleted.', 'info');
  };

  const markAlertRead = (id: string) => {
    setAlerts(prev => prev.map(a => (a.id === id ? { ...a, read: true } : a)));
  };

  const resetToSampleData = () => {
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}suppliers`);
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}mat_reqs`);
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}quotes`);
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}costing_orders`);
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}quotations`);
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}invoices`);
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}alerts`);
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}activities`);

    setSuppliers(INITIAL_SUPPLIERS);
    setMaterialRequirements(INITIAL_MATERIAL_REQUIREMENTS);
    setQuotes(evaluateSupplierQuotes(INITIAL_QUOTES));
    setCostingOrders(INITIAL_COSTING_ORDERS);
    setQuotations(INITIAL_QUOTATIONS);
    setInvoices(INITIAL_INVOICES);
    setAlerts(INITIAL_ALERTS);
    setActivities(INITIAL_ACTIVITIES);

    showToast('Workspace reset to factory sample data.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        isAuthenticated,
        userRole,
        setUserRole,
        login,
        logout,
        user,
        setUser,
        suppliers,
        addSupplier,
        updateSupplier,
        deleteSupplier,
        materialRequirements,
        addMaterialRequirement,
        quotes,
        addQuote,
        deleteQuote,
        costingOrders,
        addCostingOrder,
        updateCostingOrder,
        deleteCostingOrder,
        quotations,
        addQuotation,
        updateQuotation,
        deleteQuotation,
        invoices,
        addInvoice,
        updateInvoice,
        deleteInvoice,
        alerts,
        markAlertRead,
        activities,
        addActivity,
        toast,
        showToast,
        isStoryModalOpen,
        setIsStoryModalOpen,
        resetToSampleData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
