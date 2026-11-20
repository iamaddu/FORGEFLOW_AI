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
    <div className="min-h-screen bg-gradient-to-br from-[#4A3482] via-[#523D8A] to-[#3B2668] text-[#1E1638] flex flex-row antialiased relative selection:bg-[#F5A636]/30">
      {/* Ambient PPT Radial Glows */}
      <div className="fixed top-0 right-1/4 w-96 h-96 bg-[#F5A636]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 left-1/3 w-96 h-96 bg-[#F8C8BE]/12 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-row w-full min-h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 min-h-screen bg-transparent">
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
      </div>
      <Toast />
      <RaviStoryModal />
    </div>
  );
};
