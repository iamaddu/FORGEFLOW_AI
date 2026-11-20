import React from 'react';
import { CheckCircle2, AlertTriangle, Info, XCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-in slide-in-from-bottom-5 fade-in duration-200">
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#132032] border border-[#1C2E46] shadow-2xl text-slate-100 text-xs font-medium max-w-md">
        {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-[#16B8A5] shrink-0" />}
        {toast.type === 'warning' && <AlertTriangle className="w-4 h-4 text-[#E5A84B] shrink-0" />}
        {toast.type === 'error' && <XCircle className="w-4 h-4 text-rose-500 shrink-0" />}
        {toast.type === 'info' && <Info className="w-4 h-4 text-sky-400 shrink-0" />}
        <span className="leading-snug">{toast.message}</span>
      </div>
    </div>
  );
};
