import React from 'react';
import { useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Toast } from './components/Toast';
import { JudgeTourModal } from './components/JudgeTourModal';

// Pages
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Procurement } from './pages/Procurement';
import { Costing } from './pages/Costing';
import { Quotations } from './pages/Quotations';
import { Invoices } from './pages/Invoices';
import { Suppliers } from './pages/Suppliers';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';

export const App: React.FC = () => {
  const { currentPage, isAuthenticated } = useApp();

  // If not authenticated or on login page, display full-screen Login
  if (!isAuthenticated || currentPage === 'login') {
    return (
      <>
        <Login />
        <Toast />
        <JudgeTourModal />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A111D] text-[#F3F5F7] flex flex-row">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <Header />

        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          {currentPage === 'dashboard' && <Dashboard />}
          {currentPage === 'procurement' && <Procurement />}
          {currentPage === 'costing' && <Costing />}
          {currentPage === 'quotations' && <Quotations />}
          {currentPage === 'invoices' && <Invoices />}
          {currentPage === 'suppliers' && <Suppliers />}
          {currentPage === 'reports' && <Reports />}
          {currentPage === 'settings' && <Settings />}
        </main>
      </div>

      {/* Persistent Floating Elements */}
      <Toast />
      <JudgeTourModal />
    </div>
  );
};
