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

  const handleSimulateUpload = (sampleType: 'apex' | 'jindal' | 'mittal' | 'custom', customFile?: File) => {
    setIsScanning(true);
    setScanProgress(20);

    const timer1 = setTimeout(() => setScanProgress(55), 300);
    const timer2 = setTimeout(() => setScanProgress(85), 650);
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
    }, 900);
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
            <h1 className="font-heading font-black text-3xl text-white">Invoice Intelligence</h1>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FAD5C8] text-[#1E1736]">
              OCR & GST Assistant
            </span>
          </div>
          <p className="text-xs text-[#E8E2F6] mt-1">
            Extract supplier metadata, HSN tax breakdowns, and identify missing E-Way bills or reconciliation gaps.
          </p>
        </div>
      </div>

      {/* Upload Zone & Quick Sample Triggers */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Drag & Drop Upload Zone */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-white border-2 border-dashed border-[#D2C6EA] hover:border-[#4E3C80] transition-all flex flex-col items-center justify-center text-center relative group shadow-card">
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

          <div className="w-14 h-14 rounded-2xl bg-[#E8E2F6] text-[#4E3C80] flex items-center justify-center shadow-md mb-3 group-hover:scale-105 transition-transform">
            <Upload className="w-6 h-6" />
          </div>

          <h3 className="font-heading font-black text-base text-[#1E1736]">
            Upload Supplier Invoice or Purchase Bill
          </h3>
          <p className="text-xs text-slate-500 max-w-md mt-1">
            Drag and drop your PDF or image file (PDF, PNG, JPG). System will extract GSTIN, HSN items & tax credits.
          </p>

          {isScanning && (
            <div className="mt-4 w-full max-w-xs space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-700 font-bold">
                <span className="flex items-center gap-1.5 text-[#4E3C80]">
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                  <span>Extracting document metadata...</span>
                </span>
                <span className="font-mono">{scanProgress}%</span>
              </div>
              <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#4E3C80] to-[#FAD5C8] h-full transition-all duration-300"
                  style={{ width: `${scanProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Quick Sample Triggers */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-white text-[#1E1736] border-2 border-slate-100 shadow-card flex flex-col justify-between space-y-3">
          <div>
            <span className="text-xs font-bold text-[#4E3C80] uppercase tracking-wider block mb-1">
              Sample Document Scans
            </span>
            <h4 className="font-heading font-black text-base text-[#1E1736]">
              Instant OCR Ingestion
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              Click any sample below to simulate instant invoice ingestion & discrepancy detection:
            </p>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => handleSimulateUpload('apex')}
              disabled={isScanning}
              className="w-full p-3 rounded-2xl bg-[#F3F0FA] hover:bg-[#E8E2F6] border border-[#D2C6EA] text-left text-xs transition-colors flex items-center justify-between group"
            >
              <div>
                <span className="font-bold text-slate-900 block group-hover:text-[#4E3C80]">
                  Apex Steel (INV-1042)
                </span>
                <span className="text-[10px] text-rose-600 font-bold block">Trigger: Missing E-Way Bill</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-black" />
            </button>

            <button
              onClick={() => handleSimulateUpload('jindal')}
              disabled={isScanning}
              className="w-full p-3 rounded-2xl bg-[#F3F0FA] hover:bg-[#E8E2F6] border border-[#D2C6EA] text-left text-xs transition-colors flex items-center justify-between group"
            >
              <div>
                <span className="font-bold text-slate-900 block group-hover:text-[#4E3C80]">
                  Jindal Alloys (Clean Invoice)
                </span>
                <span className="text-[10px] text-emerald-700 font-bold block">Trigger: 100% Verified</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-black" />
            </button>
          </div>
        </div>
      </div>

      {/* Invoices Stack & Details View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Invoices List */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl p-4 shadow-card border-2 border-slate-100 space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search invoice number, supplier or GSTIN..."
                className="w-full bg-[#F3F0FA] border border-[#D2C6EA] text-xs text-[#1E1736] placeholder:text-slate-500 pl-9 pr-3 py-2.5 rounded-xl focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto text-[11px]">
              {['All', 'Extracted', 'Verified', 'Pending'].map(status => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1 rounded-xl transition-colors whitespace-nowrap font-bold ${
                    statusFilter === status
                      ? 'bg-[#4E3C80] text-white'
                      : 'bg-[#F3F0FA] text-slate-700 hover:text-black'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2.5">
            {filteredInvoices.map(inv => {
              const isSelected = inv.id === selectedInvoiceId;
              return (
                <div
                  key={inv.id}
                  onClick={() => setSelectedInvoiceId(inv.id)}
                  className={`p-4 rounded-3xl border-2 cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-white border-[#4E3C80] shadow-cardDeep'
                      : 'bg-white/95 border-slate-100 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-heading font-black text-sm text-[#1E1736] font-mono">
                          {inv.invoiceNumber}
                        </span>
                        {inv.status === 'Extracted' && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#D1FAE5] text-emerald-800">
                            Extracted
                          </span>
                        )}
                        {inv.status === 'Verified' && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E8E2F6] text-[#4E3C80]">
                            Verified
                          </span>
                        )}
                        {inv.status === 'Pending' && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FEF3D6] text-amber-800">
                            Pending
                          </span>
                        )}
                      </div>
                      <h4 className="font-bold text-xs text-slate-800 mt-1">
                        {inv.supplierName}
                      </h4>
                    </div>

                    <div className="text-right">
                      <span className="font-heading font-black text-sm text-slate-900 font-mono block">
                        {formatINR(inv.totalAmount)}
                      </span>
                      <span className="text-[10px] text-slate-500 block mt-0.5">
                        {inv.invoiceDate}
                      </span>
                    </div>
                  </div>

                  {inv.discrepancies.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-amber-700 font-medium">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{inv.discrepancies[0]}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Editable Review Screen */}
        {activeInvoice && (
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-card border-2 border-slate-100 space-y-5 text-[#1E1736]">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-[#E8E2F6] text-[#4E3C80]">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-base text-[#1E1736]">
                      Extracted Document Review
                    </h3>
                    <p className="text-xs text-slate-500">
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
                    className="px-3.5 py-2 rounded-2xl bg-[#D1FAE5] text-emerald-800 text-xs font-bold hover:bg-emerald-200 transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Approve & Verify</span>
                  </button>
                  <button
                    onClick={() => deleteInvoice(activeInvoice.id)}
                    className="p-2 rounded-2xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Discrepancies Alert Box */}
              {activeInvoice.discrepancies.length > 0 && (
                <div className="p-4 rounded-2xl bg-[#FEF2F2] border-2 border-rose-200 space-y-1.5">
                  <div className="flex items-center gap-2 text-rose-700 text-xs font-bold">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>Automated Discrepancy Warnings</span>
                  </div>
                  <ul className="list-disc list-inside text-xs text-slate-700 space-y-1 pl-1">
                    {activeInvoice.discrepancies.map((disc, idx) => (
                      <li key={idx}>{disc}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Editable Fields Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Supplier Name</label>
                  <input
                    type="text"
                    value={activeInvoice.supplierName}
                    onChange={(e) => updateInvoice(activeInvoice.id, { supplierName: e.target.value })}
                    className="w-full bg-[#F3F0FA] border border-[#D2C6EA] rounded-xl px-3 py-2 text-[#1E1736] font-medium focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-bold mb-1">Supplier GSTIN</label>
                  <input
                    type="text"
                    value={activeInvoice.supplierGstin}
                    onChange={(e) => updateInvoice(activeInvoice.id, { supplierGstin: e.target.value })}
                    className="w-full bg-[#F3F0FA] border border-[#D2C6EA] rounded-xl px-3 py-2 text-[#1E1736] font-mono focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-bold mb-1">Invoice Number</label>
                  <input
                    type="text"
                    value={activeInvoice.invoiceNumber}
                    onChange={(e) => updateInvoice(activeInvoice.id, { invoiceNumber: e.target.value })}
                    className="w-full bg-[#F3F0FA] border border-[#D2C6EA] rounded-xl px-3 py-2 text-[#1E1736] font-mono focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-bold mb-1">Invoice Date</label>
                  <input
                    type="date"
                    value={activeInvoice.invoiceDate}
                    onChange={(e) => updateInvoice(activeInvoice.id, { invoiceDate: e.target.value })}
                    className="w-full bg-[#F3F0FA] border border-[#D2C6EA] rounded-xl px-3 py-2 text-[#1E1736] focus:outline-none"
                  />
                </div>
              </div>

              {/* Tax & ITC Breakdown */}
              <div className="p-5 rounded-2xl bg-[#FAD5C8] border border-[#F8C4B4] space-y-3">
                <span className="font-heading font-black text-xs text-[#4E3C80] uppercase tracking-wider block">
                  Tax Breakdown & Input Tax Credit (ITC)
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-slate-700 block">Taxable Base</span>
                    <span className="font-mono font-bold text-slate-900 text-sm">
                      {formatINR(activeInvoice.taxableValue)}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-700 block">CGST</span>
                    <span className="font-mono text-slate-900">
                      {formatINR(activeInvoice.cgst)}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-700 block">SGST</span>
                    <span className="font-mono text-slate-900">
                      {formatINR(activeInvoice.sgst)}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-700 block">IGST</span>
                    <span className="font-mono text-slate-900">
                      {formatINR(activeInvoice.igst)}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#1E1736]/10 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">Total Invoice Amount:</span>
                  <span className="font-heading font-black text-xl text-[#4E3C80] font-mono">
                    {formatINR(activeInvoice.totalAmount)}
                  </span>
                </div>
              </div>

              {/* HSN Table */}
              <div>
                <span className="font-heading font-black text-xs text-[#1E1736] block mb-2">
                  HSN / SAC Classified Line Items
                </span>
                <table className="w-full text-left text-xs border border-slate-200 rounded-2xl overflow-hidden">
                  <thead className="bg-[#F3F0FA] text-slate-700 uppercase text-[10px] font-bold">
                    <tr>
                      <th className="p-3">HSN Code</th>
                      <th className="p-3">Description</th>
                      <th className="p-3 text-center">GST Rate</th>
                      <th className="p-3 text-right">Taxable Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {activeInvoice.hsnBreakdown.map((item, idx) => (
                      <tr key={idx}>
                        <td className="p-3 font-mono font-medium text-slate-700">{item.hsn}</td>
                        <td className="p-3 font-bold text-slate-900">{item.desc}</td>
                        <td className="p-3 text-center font-mono">{item.rate}%</td>
                        <td className="p-3 text-right font-mono font-bold text-slate-900">
                          {formatINR(item.amount)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
