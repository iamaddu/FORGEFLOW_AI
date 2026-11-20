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
    <div className="min-h-screen text-[#1E1638] flex flex-row antialiased relative selection:bg-[#F5A636]/30 overflow-x-hidden">
      {/* ── Classy Glassy Manufacturing Background Image ── */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none scale-105"
        style={{
          backgroundImage: "url('/glassy-factory-bg.jpg')",
          filter: 'brightness(0.75) contrast(1.15)',
        }}
      />

      {/* Royal Purple PPT Glassmorphism Gradient Overlay */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-[#452F7D]/92 via-[#523D8A]/88 to-[#351F5E]/94 backdrop-blur-[6px] pointer-events-none" />

      {/* Ambient PPT Soft Mango & Peach Glows */}
      <div className="fixed -top-24 right-1/4 w-[520px] h-[520px] bg-[#F5A636]/15 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed -bottom-24 left-1/4 w-[520px] h-[520px] bg-[#F8C8BE]/18 rounded-full blur-[140px] pointer-events-none z-0" />

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
