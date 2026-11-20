import React from 'react';
import { useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Toast } from './components/Toast';
import { RaviStoryModal } from './components/RaviStoryModal';

// Buyer Pages
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Procurement } from './pages/Procurement';
import { Costing } from './pages/Costing';
import { Quotations } from './pages/Quotations';
import { Invoices } from './pages/Invoices';
import { Suppliers } from './pages/Suppliers';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';

// Seller Pages
import { SellerDashboard } from './pages/SellerDashboard';
import { SellerCatalog } from './pages/SellerCatalog';
import { SellerRFQ } from './pages/SellerRFQ';
import { SellerOrders } from './pages/SellerOrders';
import { SellerAnalytics } from './pages/SellerAnalytics';

export const App: React.FC = () => {
  const { currentPage, isAuthenticated } = useApp();

  if (!isAuthenticated || currentPage === 'login') {
    return (
      <>
        <Login />
        <Toast />
        <RaviStoryModal />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 flex flex-row antialiased">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 min-h-screen bg-[#0F172A]">
        <Header />
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          {/* Buyer pages */}
          {currentPage === 'dashboard' && <Dashboard />}
          {currentPage === 'procurement' && <Procurement />}
          {currentPage === 'costing' && <Costing />}
          {currentPage === 'quotations' && <Quotations />}
          {currentPage === 'invoices' && <Invoices />}
          {currentPage === 'suppliers' && <Suppliers />}
          {currentPage === 'reports' && <Reports />}
          {currentPage === 'settings' && <Settings />}
          {/* Seller pages */}
          {currentPage === 'seller-dashboard' && <SellerDashboard />}
          {currentPage === 'seller-catalog' && <SellerCatalog />}
          {currentPage === 'seller-rfq' && <SellerRFQ />}
          {currentPage === 'seller-orders' && <SellerOrders />}
          {currentPage === 'seller-analytics' && <SellerAnalytics />}
        </main>
      </div>
      <Toast />
      <RaviStoryModal />
    </div>
  );
};
