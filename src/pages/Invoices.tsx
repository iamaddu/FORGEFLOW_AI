import React, { useState } from 'react';
import {
  Receipt,
  Upload,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Eye,
  Trash2,
  Sparkles,
  Building2,
  Calendar,
  DollarSign,
  ShieldAlert,
  Search,
  Filter,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatINR } from '../utils/calculations';
import { InvoiceDocument } from '../types';

export const Invoices: React.FC = () => {
  const {
    invoices,
    addInvoice,
    updateInvoice,
    deleteInvoice,
    suppliers,
    showToast
  } = useApp();

  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string>(
    invoices[0]?.id || 'inv-1042'
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  const activeInvoice = invoices.find(inv => inv.id === selectedInvoiceId) || invoices[0];

  // Simulated File Upload and OCR Parser Flow
  const handleSimulateUpload = (sampleType: 'apex' | 'jindal' | 'mittal' | 'custom', customFile?: File) => {
    setIsScanning(true);
    setScanProgress(15);

    const timer1 = setTimeout(() => setScanProgress(45), 300);
    const timer2 = setTimeout(() => setScanProgress(75), 650);
    const timer3 = setTimeout(() => {
      setScanProgress(100);
      setIsScanning(false);

      if (sampleType === 'apex') {
        addInvoice({
          invoiceNumber: `INV-${Math.floor(1050 + Math.random() * 50)}`,
          supplierName: 'Apex Steel & Tubes Pvt Ltd',
          supplierGstin: '27AABCA9812M1Z5',
          invoiceDate: new Date().toISOString().split('T')[0],
          dueDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
          category: 'Raw Material',
          taxableValue: 145000,
          cgst: 13050,
          sgst: 13050,
          igst: 0,
          totalAmount: 171100,
          status: 'Extracted',
          fileName: 'ApexSteel_TaxInvoice_Batch99.pdf',
          fileSize: '480 KB',
          discrepancies: [
            'Missing E-Way Bill Number on page 1',
            'HSN 7208 description slightly differs from purchase requisition'
          ],
          matchedPoNumber: 'PO-2025-102',
          hsnBreakdown: [
            { hsn: '72083890', desc: 'MS Plate 12mm IS 2062 E250', rate: 18, amount: 145000 }
          ]
        });
      } else if (sampleType === 'jindal') {
        addInvoice({
          invoiceNumber: `INV-${Math.floor(1050 + Math.random() * 50)}`,
          supplierName: 'Jindal Alloys Traders',
          supplierGstin: '27AAACJ4321B1Z2',
          invoiceDate: new Date().toISOString().split('T')[0],
          dueDate: new Date(Date.now() + 15 * 86400000).toISOString().split('T')[0],
          category: 'Raw Material',
          taxableValue: 92000,
          cgst: 8280,
          sgst: 8280,
          igst: 0,
          totalAmount: 108560,
          status: 'Verified',
          fileName: 'Jindal_SS_Invoice_Scanned.pdf',
          fileSize: '540 KB',
          discrepancies: [],
          matchedPoNumber: 'PO-2025-098',
          hsnBreakdown: [
            { hsn: '72221119', desc: 'SS 304 Round Bars 25mm dia', rate: 18, amount: 92000 }
          ]
        });
      } else {
        const fileTitle = customFile?.name || 'Uploaded_Invoice_Document.pdf';
        addInvoice({
          invoiceNumber: `INV-${Math.floor(2000 + Math.random() * 8000)}`,
          supplierName: 'Mittal Metasteel Corp',
          supplierGstin: '24AABCM7654C1Z9',
          invoiceDate: new Date().toISOString().split('T')[0],
          dueDate: new Date(Date.now() + 45 * 86400000).toISOString().split('T')[0],
          category: 'Raw Material',
          taxableValue: 64000,
          cgst: 0,
          sgst: 0,
          igst: 11520,
          totalAmount: 75520,
          status: 'Extracted',
          fileName: fileTitle,
          fileSize: customFile ? `${(customFile.size / 1024).toFixed(0)} KB` : '780 KB',
          discrepancies: [
            'Interstate IGST applied (Verify GSTR-2B filing status)'
          ],
          matchedPoNumber: 'PO-2025-094',
          hsnBreakdown: [
            { hsn: '76042910', desc: 'Aluminium 6061 Extrusions', rate: 18, amount: 64000 }
          ]
        });
      }

      showToast('Document uploaded & OCR metadata extracted successfully!');
    }, 1000);
  };

  const filteredInvoices = invoices.filter(inv => {
    const matchesSearch =
      inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.supplierGstin.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading font-bold text-2xl text-white">Invoice Intelligence</h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#16B8A5]/20 text-[#16B8A5] border border-[#16B8A5]/30 uppercase">
              OCR & GST Assistant
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Extract supplier metadata, HSN tax breakdowns, and identify missing E-Way bills or GSTR-2B reconciliation mismatches.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-400 bg-[#0A111D] px-3 py-1.5 rounded-xl border border-[#1C2E46] hidden sm:inline">
            Demonstration OCR Flow
          </span>
        </div>
      </div>

      {/* Upload Zone & Quick Sample Triggers */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Drag & Drop Upload Zone (lg:col-span-8) */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-[#101B2B] border-2 border-dashed border-[#1C2E46] hover:border-[#16B8A5]/50 transition-all flex flex-col items-center justify-center text-center relative group">
          <input
            type="file"
            accept=".pdf,.png,.jpg,.jpeg"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleSimulateUpload('custom', e.target.files[0]);
              }
            }}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            disabled={isScanning}
          />

          <div className="w-14 h-14 rounded-2xl bg-[#16B8A5]/15 text-[#16B8A5] flex items-center justify-center shadow-glow mb-3 group-hover:scale-110 transition-transform">
            <Upload className="w-6 h-6" />
          </div>

          <h3 className="font-heading font-bold text-base text-white">
            Upload Supplier Invoice or Purchase Bill
          </h3>
          <p className="text-xs text-slate-400 max-w-md mt-1">
            Drag and drop your PDF or image file (PDF, PNG, JPG up to 10MB). System will extract GSTIN, HSN items & tax credits.
          </p>

          {isScanning && (
            <div className="mt-4 w-full max-w-xs space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span className="flex items-center gap-1.5 text-[#16B8A5]">
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                  <span>Extracting document metadata...</span>
                </span>
                <span className="font-mono">{scanProgress}%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#16B8A5] to-[#E5A84B] h-full transition-all duration-300"
                  style={{ width: `${scanProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Quick Demo Preloaded Invoices (lg:col-span-4) */}
        <div className="lg:col-span-4 p-5 rounded-2xl bg-[#101B2B] border border-[#1C2E46] shadow-card flex flex-col justify-between space-y-3">
          <div>
            <span className="text-xs font-heading font-semibold text-[#E5A84B] uppercase tracking-wider block mb-1">
              Hackathon Judge Testing
            </span>
            <h4 className="font-heading font-bold text-sm text-white">
              Instant OCR Simulation Tests
            </h4>
            <p className="text-[11px] text-slate-400 mt-1">
              Click any sample below to simulate instant invoice ingestion & discrepancy detection:
            </p>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => handleSimulateUpload('apex')}
              disabled={isScanning}
              className="w-full p-2.5 rounded-xl bg-[#132032] hover:bg-[#182940] border border-[#1C2E46] text-left text-xs transition-colors flex items-center justify-between group"
            >
              <div>
                <span className="font-medium text-slate-200 block group-hover:text-[#16B8A5]">
                  Apex Steel (INV-1042)
                </span>
                <span className="text-[10px] text-rose-400 block">Trigger: Missing E-Way Bill</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white" />
            </button>

            <button
              onClick={() => handleSimulateUpload('jindal')}
              disabled={isScanning}
              className="w-full p-2.5 rounded-xl bg-[#132032] hover:bg-[#182940] border border-[#1C2E46] text-left text-xs transition-colors flex items-center justify-between group"
            >
              <div>
                <span className="font-medium text-slate-200 block group-hover:text-[#16B8A5]">
                  Jindal Alloys (Clean Invoice)
                </span>
                <span className="text-[10px] text-emerald-400 block">Trigger: 100% Verified</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Invoice Documents List & Details Review Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Invoices List & Filters (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Search & Filter Header */}
          <div className="bg-[#101B2B] border border-[#1C2E46] rounded-2xl p-4 space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search invoice number, supplier or GSTIN..."
                className="w-full bg-[#132032] border border-[#1C2E46] text-xs text-white placeholder:text-slate-500 pl-9 pr-3 py-2 rounded-xl focus:outline-none focus:border-[#16B8A5]"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto text-[11px]">
              {['All', 'Extracted', 'Verified', 'Pending'].map(status => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1 rounded-lg transition-colors whitespace-nowrap ${
                    statusFilter === status
                      ? 'bg-[#16B8A5] text-white font-semibold'
                      : 'bg-[#132032] text-slate-400 hover:text-white'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Invoices Stack */}
          <div className="space-y-2.5">
            {filteredInvoices.map(inv => {
              const isSelected = inv.id === selectedInvoiceId;
              return (
                <div
                  key={inv.id}
                  onClick={() => setSelectedInvoiceId(inv.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#132032] border-[#16B8A5] shadow-glow'
                      : 'bg-[#101B2B] border-[#1C2E46] hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-heading font-bold text-sm text-white font-mono">
                          {inv.invoiceNumber}
                        </span>
                        {inv.status === 'Extracted' && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-400">
                            Extracted
                          </span>
                        )}
                        {inv.status === 'Verified' && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-sky-500/20 text-sky-400">
                            Verified
                          </span>
                        )}
                        {inv.status === 'Pending' && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#E5A84B]/20 text-[#E5A84B]">
                            Pending
                          </span>
                        )}
                      </div>
                      <h4 className="font-medium text-xs text-slate-300 mt-1">
                        {inv.supplierName}
                      </h4>
                    </div>

                    <div className="text-right">
                      <span className="font-heading font-bold text-sm text-white font-mono block">
                        {formatINR(inv.totalAmount)}
                      </span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        {inv.invoiceDate}
                      </span>
                    </div>
                  </div>

                  {inv.discrepancies.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-[#1C2E46]/60 flex items-center gap-1.5 text-[11px] text-[#E5A84B]">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{inv.discrepancies[0]}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Editable Review Screen & HSN Breakdown (lg:col-span-7) */}
        {activeInvoice && (
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[#101B2B] border border-[#1C2E46] rounded-2xl p-6 shadow-card space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-[#1C2E46]">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#16B8A5]/15 text-[#16B8A5]">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base text-white">
                      Extracted Document Review
                    </h3>
                    <p className="text-xs text-slate-400">
                      File: {activeInvoice.fileName} ({activeInvoice.fileSize})
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      updateInvoice(activeInvoice.id, { status: 'Verified', discrepancies: [] });
                      showToast('Invoice marked as Verified & GST reconciled.');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 text-xs font-semibold border border-emerald-500/30 flex items-center gap-1.5 transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Approve & Verify</span>
                  </button>
                  <button
                    onClick={() => deleteInvoice(activeInvoice.id)}
                    className="p-1.5 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Discrepancies Alert Box */}
              {activeInvoice.discrepancies.length > 0 && (
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 space-y-1.5">
                  <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>Automated Discrepancy Warnings</span>
                  </div>
                  <ul className="list-disc list-inside text-xs text-slate-300 space-y-1 pl-1">
                    {activeInvoice.discrepancies.map((disc, idx) => (
                      <li key={idx}>{disc}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Editable Fields Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">Supplier Name</label>
                  <input
                    type="text"
                    value={activeInvoice.supplierName}
                    onChange={(e) => updateInvoice(activeInvoice.id, { supplierName: e.target.value })}
                    className="w-full bg-[#132032] border border-[#1C2E46] rounded-xl px-3 py-2 text-white font-medium focus:outline-none focus:border-[#16B8A5]"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Supplier GSTIN</label>
                  <input
                    type="text"
                    value={activeInvoice.supplierGstin}
                    onChange={(e) => updateInvoice(activeInvoice.id, { supplierGstin: e.target.value })}
                    className="w-full bg-[#132032] border border-[#1C2E46] rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-[#16B8A5]"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Invoice Number</label>
                  <input
                    type="text"
                    value={activeInvoice.invoiceNumber}
                    onChange={(e) => updateInvoice(activeInvoice.id, { invoiceNumber: e.target.value })}
                    className="w-full bg-[#132032] border border-[#1C2E46] rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-[#16B8A5]"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Invoice Date</label>
                  <input
                    type="date"
                    value={activeInvoice.invoiceDate}
                    onChange={(e) => updateInvoice(activeInvoice.id, { invoiceDate: e.target.value })}
                    className="w-full bg-[#132032] border border-[#1C2E46] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#16B8A5]"
                  />
                </div>
              </div>

              {/* Financial Taxes & Subtotal Card */}
              <div className="p-4 rounded-xl bg-[#0A111D] border border-[#1C2E46] space-y-3">
                <span className="font-heading font-semibold text-xs text-white uppercase tracking-wider block">
                  Tax Breakdown & Input Tax Credit (ITC)
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block">Taxable Base</span>
                    <span className="font-mono font-bold text-white text-sm">
                      {formatINR(activeInvoice.taxableValue)}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">CGST</span>
                    <span className="font-mono text-slate-200">
                      {formatINR(activeInvoice.cgst)}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">SGST</span>
                    <span className="font-mono text-slate-200">
                      {formatINR(activeInvoice.sgst)}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">IGST</span>
                    <span className="font-mono text-slate-200">
                      {formatINR(activeInvoice.igst)}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#1C2E46]/60 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-300">Total Invoice Amount:</span>
                  <span className="font-heading font-bold text-lg text-[#16B8A5] font-mono">
                    {formatINR(activeInvoice.totalAmount)}
                  </span>
                </div>
              </div>

              {/* HSN Line Items Table */}
              <div>
                <span className="font-heading font-semibold text-xs text-white block mb-2">
                  HSN / SAC Classified Line Items
                </span>
                <table className="w-full text-left text-xs border border-[#1C2E46] rounded-xl overflow-hidden">
                  <thead className="bg-[#132032] text-slate-400 uppercase text-[10px]">
                    <tr>
                      <th className="p-2.5">HSN Code</th>
                      <th className="p-2.5">Description</th>
                      <th className="p-2.5 text-center">GST Rate</th>
                      <th className="p-2.5 text-right">Taxable Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1C2E46]/60 bg-[#0D1624]">
                    {activeInvoice.hsnBreakdown.map((item, idx) => (
                      <tr key={idx}>
                        <td className="p-2.5 font-mono text-slate-300">{item.hsn}</td>
                        <td className="p-2.5 text-white">{item.desc}</td>
                        <td className="p-2.5 text-center font-mono text-slate-400">{item.rate}%</td>
                        <td className="p-2.5 text-right font-mono font-medium text-white">
                          {formatINR(item.amount)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Legal Disclaimer Pill */}
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-slate-500 shrink-0" />
                <span>
                  *Demonstration functionality. ForgeFlow AI aids internal MSME document collation and does not perform statutory GST returns or legal filing.
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
