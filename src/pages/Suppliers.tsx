import React, { useState } from 'react';
import {
  Users,
  Plus,
  Star,
  Building2,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Trash2,
  Search,
  Filter,
  TrendingUp,
  Clock,
  FileText
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Suppliers: React.FC = () => {
  const { suppliers, addSupplier, updateSupplier, deleteSupplier, quotes } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const [name, setName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Maharashtra');
  const [gstin, setGstin] = useState('');
  const [rating, setRating] = useState('4.8');
  const [materials, setMaterials] = useState('MS Plates, CRCA Sheets, Forging Steel');
  const [paymentTerms, setPaymentTerms] = useState('30 Days Net');
  const [notes, setNotes] = useState('');

  const filteredSuppliers = suppliers.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.gstin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.materialsSupplied.some(m => m.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleCreateSupplier = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    addSupplier({
      name,
      contactPerson,
      phone,
      email,
      city,
      state,
      gstin: gstin || '27AABCA0000Z1Z5',
      rating: Number(rating) || 4.5,
      materialsSupplied: materials.split(',').map(m => m.trim()),
      paymentTerms,
      onTimeDeliveryRate: 95,
      notes,
      active: true
    });

    setShowAddModal(false);
    setName('');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading font-black text-3xl text-white">Supplier Management</h1>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FAD5C8] text-[#1E1736]">
              Vendor Directory
            </span>
          </div>
          <p className="text-xs text-[#E8E2F6] mt-1">
            Maintain centralized supplier profiles, quality ratings, on-time delivery benchmarks, and historical quotation logs.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#FAD5C8] hover:bg-[#f6c6b6] text-[#1E1736] text-xs font-heading font-black transition-all shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Supplier</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-3xl p-4 shadow-card border-2 border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search suppliers by name, city, GSTIN or materials..."
            className="w-full bg-[#F3F0FA] border border-[#D2C6EA] text-xs text-[#1E1736] placeholder:text-slate-500 pl-9 pr-3 py-2.5 rounded-xl focus:outline-none"
          />
        </div>

        <div className="text-xs text-slate-600 flex items-center gap-2 shrink-0">
          <span className="font-medium">Total Registered Vendors:</span>
          <span className="font-heading font-black text-slate-900 text-sm">{suppliers.length}</span>
        </div>
      </div>

      {/* Suppliers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSuppliers.map(sup => {
          const supQuotesCount = quotes.filter(q => q.supplierId === sup.id).length;

          return (
            <div
              key={sup.id}
              className="bg-white rounded-3xl p-6 shadow-card border-2 border-slate-100 hover:border-[#4E3C80] transition-all flex flex-col justify-between space-y-4 group"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-heading font-black text-base text-slate-900 group-hover:text-[#4E3C80] transition-colors">
                      {sup.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-[#EA580C]" />
                      <span>{sup.city}, {sup.state}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 bg-[#FEF3D6] border border-[#F9C349] px-2.5 py-1 rounded-xl text-xs font-black text-amber-900">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{sup.rating}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">Contact:</span>
                    <span className="font-bold text-slate-900">{sup.contactPerson}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">Phone:</span>
                    <span className="font-mono text-slate-800">{sup.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">GSTIN:</span>
                    <span className="font-mono text-[11px] font-bold text-[#4E3C80]">{sup.gstin}</span>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {sup.materialsSupplied.map((m, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-xl text-[10px] font-bold bg-[#F3F0FA] text-[#4E3C80] border border-[#D2C6EA]"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{sup.onTimeDeliveryRate}% On-Time</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-500 font-medium">
                    {supQuotesCount} quotes
                  </span>
                  <button
                    onClick={() => deleteSupplier(sup.id)}
                    className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Add Supplier */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in">
          <div className="bg-white text-[#1E1736] rounded-3xl p-6 max-w-lg w-full shadow-2xl relative border-4 border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200">
              <h3 className="font-heading font-black text-lg text-[#1E1736] flex items-center gap-2">
                <Users className="w-5 h-5 text-[#4E3C80]" />
                <span>Register New Supplier</span>
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-black text-base"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSupplier} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Company / Trade Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Mahavir Steel Alloys Pvt Ltd"
                  className="w-full bg-[#F3F0FA] border border-[#D2C6EA] rounded-xl px-3 py-2 text-[#1E1736] font-medium focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Contact Person</label>
                  <input
                    type="text"
                    required
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    className="w-full bg-[#F3F0FA] border border-[#D2C6EA] rounded-xl px-3 py-2 text-[#1E1736] font-medium focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Phone Number</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#F3F0FA] border border-[#D2C6EA] rounded-xl px-3 py-2 text-[#1E1736] font-medium focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">City / Depot</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-[#F3F0FA] border border-[#D2C6EA] rounded-xl px-3 py-2 text-[#1E1736] font-medium focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">GSTIN</label>
                  <input
                    type="text"
                    value={gstin}
                    onChange={(e) => setGstin(e.target.value)}
                    className="w-full bg-[#F3F0FA] border border-[#D2C6EA] rounded-xl px-3 py-2 text-[#1E1736] font-mono focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Materials Supplied (Comma-separated)
                </label>
                <input
                  type="text"
                  value={materials}
                  onChange={(e) => setMaterials(e.target.value)}
                  className="w-full bg-[#F3F0FA] border border-[#D2C6EA] rounded-xl px-3 py-2 text-[#1E1736] font-medium focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:text-black font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-2xl bg-[#4E3C80] text-white font-bold shadow-md"
                >
                  Save Supplier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
