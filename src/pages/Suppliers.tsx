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
import { Supplier } from '../types';

export const Suppliers: React.FC = () => {
  const { suppliers, addSupplier, updateSupplier, deleteSupplier, quotes } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
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
            <h1 className="font-heading font-bold text-2xl text-white">Supplier Management</h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-500/20 text-purple-400 border border-purple-500/30 uppercase">
              Vendor Directory
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Maintain centralized supplier profiles, quality ratings, on-time delivery benchmarks, and historical quotation logs.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#16B8A5] hover:bg-[#13A291] text-[#0A111D] text-xs font-heading font-bold transition-all shadow-glow"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Supplier</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-[#101B2B] border border-[#1C2E46] rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search suppliers by name, city, GSTIN or materials..."
            className="w-full bg-[#132032] border border-[#1C2E46] text-xs text-white placeholder:text-slate-500 pl-9 pr-3 py-2 rounded-xl focus:outline-none focus:border-[#16B8A5]"
          />
        </div>

        <div className="text-xs text-slate-400 flex items-center gap-2 shrink-0">
          <span>Total Registered Vendors:</span>
          <span className="font-heading font-bold text-white text-sm">{suppliers.length}</span>
        </div>
      </div>

      {/* Suppliers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSuppliers.map(sup => {
          const supQuotesCount = quotes.filter(q => q.supplierId === sup.id).length;

          return (
            <div
              key={sup.id}
              className="bg-[#101B2B] border border-[#1C2E46] hover:border-[#16B8A5]/40 rounded-2xl p-5 shadow-card transition-all flex flex-col justify-between space-y-4 group"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-heading font-bold text-base text-white group-hover:text-[#16B8A5] transition-colors">
                      {sup.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-[#E5A84B]" />
                      <span>{sup.city}, {sup.state}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 bg-amber-500/15 border border-[#E5A84B]/30 px-2 py-0.5 rounded-lg text-xs font-bold text-[#E5A84B]">
                    <Star className="w-3 h-3 fill-current" />
                    <span>{sup.rating}</span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-[#1C2E46]/60 space-y-1.5 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">Contact:</span>
                    <span className="font-medium text-white">{sup.contactPerson}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">Phone:</span>
                    <span className="font-mono">{sup.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">GSTIN:</span>
                    <span className="font-mono text-[11px] text-[#16B8A5]">{sup.gstin}</span>
                  </div>
                </div>

                {/* Materials badges */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {sup.materialsSupplied.map((m, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md text-[10px] bg-[#132032] border border-[#1C2E46] text-slate-300"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom stats and notes */}
              <div className="pt-3 border-t border-[#1C2E46]/60 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{sup.onTimeDeliveryRate}% On-Time</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-400">
                    {supQuotesCount} {supQuotesCount === 1 ? 'quote' : 'quotes'}
                  </span>
                  <button
                    onClick={() => deleteSupplier(sup.id)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                    title="Delete Supplier"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#101B2B] border border-[#1C2E46] rounded-2xl p-6 max-w-lg w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#1C2E46]">
              <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-[#16B8A5]" />
                <span>Register New Supplier</span>
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSupplier} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Company / Trade Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Mahavir Steel Alloys Pvt Ltd"
                  className="w-full bg-[#132032] border border-[#1C2E46] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#16B8A5]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Contact Person</label>
                  <input
                    type="text"
                    required
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    placeholder="e.g. Ramesh Shah"
                    className="w-full bg-[#132032] border border-[#1C2E46] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#16B8A5]"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Phone Number</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98200 00000"
                    className="w-full bg-[#132032] border border-[#1C2E46] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#16B8A5]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sales@supplier.in"
                    className="w-full bg-[#132032] border border-[#1C2E46] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#16B8A5]"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">GSTIN</label>
                  <input
                    type="text"
                    value={gstin}
                    onChange={(e) => setGstin(e.target.value)}
                    placeholder="27AABCM1234D1Z8"
                    className="w-full bg-[#132032] border border-[#1C2E46] rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-[#16B8A5]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">City / Depot</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Pune / Mumbai / Ahmedabad"
                    className="w-full bg-[#132032] border border-[#1C2E46] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#16B8A5]"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Quality Rating (1 to 5)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="w-full bg-[#132032] border border-[#1C2E46] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#16B8A5]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Materials Supplied (Comma-separated)
                </label>
                <input
                  type="text"
                  value={materials}
                  onChange={(e) => setMaterials(e.target.value)}
                  placeholder="e.g. MS Plates, SS 304 Rods, Tool Steel"
                  className="w-full bg-[#132032] border border-[#1C2E46] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#16B8A5]"
                />
              </div>

              <div className="pt-3 border-t border-[#1C2E46] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#16B8A5] hover:bg-[#13A291] text-[#0A111D] font-bold shadow-glow"
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
