import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Briefcase, Download, Search, Edit2, X, ChevronLeft, ChevronRight, FileText, Globe, Handshake } from 'lucide-react';
import { format } from 'date-fns';

type TabType = 'jobs' | 'enquiries' | 'partnerships';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('jobs');
  const [stats, setStats] = useState({
    totalJobs: 0,
    newJobs: 0,
    totalEnquiries: 0,
    newEnquiries: 0,
    totalPartnerships: 0,
    newPartnerships: 0
  });

  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token = localStorage.getItem('admin_token');

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/admin/stats', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setStats(await res.json());
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchData = async () => {
    try {
      const url = new URL(window.location.origin + `/api/admin/${activeTab}`);
      url.searchParams.append('page', page.toString());
      url.searchParams.append('limit', '10');
      if (search) url.searchParams.append('search', search);
      if (statusFilter) url.searchParams.append('status', statusFilter);

      const res = await fetch(url.toString(), {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const json = await res.json();
        setData(json.items || []);
        setTotal(json.total || 0);
        setTotalPages(json.totalPages || 1);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [activeTab]);

  useEffect(() => {
    fetchData();
  }, [activeTab, page, search, statusFilter]);

  const handleUpdateStatus = async (id: string | number, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/${activeTab}/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        fetchData();
        fetchStats();
        if (selectedItem && selectedItem.id === id) {
          setSelectedItem({ ...selectedItem, status: newStatus });
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const JobStatuses = ['NEW', 'REVIEWED', 'SHORTLISTED', 'REJECTED'];
  const EnquiryStatuses = ['NEW', 'CONTACTED', 'IN_PROGRESS', 'COMPLETED', 'REJECTED'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'NEW': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'REVIEWED': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'CONTACTED': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'IN_PROGRESS': return 'bg-indigo-100 text-indigo-700 border-indigo-200';
      case 'SHORTLISTED': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'COMPLETED': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'REJECTED': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Job Applications</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-black text-slate-900">{stats.totalJobs}</span>
              {stats.newJobs > 0 && (
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                  {stats.newJobs} new
                </span>
              )}
            </div>
          </div>
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
            <Briefcase className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Project Enquiries</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-black text-slate-900">{stats.totalEnquiries}</span>
              {stats.newEnquiries > 0 && (
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
                  {stats.newEnquiries} new
                </span>
              )}
            </div>
          </div>
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Partnerships</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-black text-slate-900">{stats.totalPartnerships || 0}</span>
              {(stats.newPartnerships || 0) > 0 && (
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                  {stats.newPartnerships} new
                </span>
              )}
            </div>
          </div>
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
            <Handshake className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col min-h-[600px]">
        {/* Tabs & Filters Header */}
        <div className="border-b border-slate-200 p-4 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg self-start">
              <button
                onClick={() => { setActiveTab('jobs'); setPage(1); setStatusFilter(''); }}
                className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${activeTab === 'jobs' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Job Applications
              </button>
              <button
                onClick={() => { setActiveTab('enquiries'); setPage(1); setStatusFilter(''); }}
                className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${activeTab === 'enquiries' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Project Enquiries
              </button>
              <button
                onClick={() => { setActiveTab('partnerships'); setPage(1); setStatusFilter(''); }}
                className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${activeTab === 'partnerships' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Partnerships
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                  className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium"
              >
                <option value="">All Statuses</option>
                {(activeTab === 'jobs' ? JobStatuses : EnquiryStatuses).map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase text-xs font-bold tracking-wider">
              <tr>
                <th className="px-6 py-4">Name / Date</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">
                  {activeTab === 'jobs' ? 'Position' : activeTab === 'enquiries' ? 'Service & Location' : 'Company & Type'}
                </th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-900">{item.fullName}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{format(new Date(item.createdAt), 'MMM dd, yyyy HH:mm')}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-slate-700 font-medium">{activeTab === 'jobs' ? item.email : item.workEmail}</p>
                    <p className="text-slate-500 text-xs mt-0.5">{item.phone || item.contactNumber || 'Not provided'}</p>
                  </td>
                  <td className="px-6 py-4">
                    {activeTab === 'jobs' && (
                      <p className="font-semibold text-slate-700 max-w-[200px] truncate">{item.position}</p>
                    )}
                    {activeTab === 'enquiries' && (
                      <>
                        <p className="font-semibold text-slate-700 max-w-[200px] truncate">{item.service}</p>
                        <p className="text-xs text-slate-500 mt-0.5 max-w-[200px] truncate">{item.location}</p>
                      </>
                    )}
                    {activeTab === 'partnerships' && (
                      <>
                        <p className="font-semibold text-slate-700 max-w-[200px] truncate">{item.partnershipType || 'General Partnership'}</p>
                        <p className="text-xs text-slate-500 mt-0.5 max-w-[200px] truncate">{item.companyName || 'N/A'}</p>
                      </>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black border uppercase tracking-wider inline-block ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => { setSelectedItem(item); setIsModalOpen(true); }}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-md transition-colors cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" /> View / Edit
                    </button>
                  </td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500 font-medium">
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="border-t border-slate-200 p-4 bg-slate-50 flex items-center justify-between">
          <p className="text-xs text-slate-500 font-medium">
            Showing <span className="font-bold text-slate-900">{data.length}</span> of <span className="font-bold text-slate-900">{total}</span>
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-1.5 rounded bg-white border border-slate-200 text-slate-600 disabled:opacity-50 hover:bg-slate-50 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold text-slate-700 mx-2">Page {page} of {totalPages || 1}</span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="p-1.5 rounded bg-white border border-slate-200 text-slate-600 disabled:opacity-50 hover:bg-slate-50 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col z-10"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
                <h3 className="text-lg font-black text-slate-900">
                  {activeTab === 'jobs' ? 'Job Application Details' : activeTab === 'enquiries' ? 'Project Enquiry Details' : 'Partnership Enquiry Details'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700 bg-white p-1 rounded-md shadow-sm border border-slate-200 transition-colors cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto custom-scrollbar space-y-6">

                {/* Status Update */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Current Status</p>
                    <span className={`px-3 py-1 rounded-full text-xs font-black border uppercase tracking-wider inline-block ${getStatusColor(selectedItem.status)}`}>
                      {selectedItem.status}
                    </span>
                  </div>
                  <div className="flex-1 max-w-xs">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Update Status</p>
                    <select
                      value={selectedItem.status}
                      onChange={(e) => handleUpdateStatus(selectedItem.id, e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    >
                      {(activeTab === 'jobs' ? JobStatuses : EnquiryStatuses).map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Full Name</p>
                    <p className="text-sm font-semibold text-slate-900">{selectedItem.fullName}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Email Address</p>
                    <p className="text-sm font-semibold text-blue-600">{activeTab === 'jobs' ? selectedItem.email : selectedItem.workEmail}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Contact Number</p>
                    <p className="text-sm font-semibold text-slate-900">{selectedItem.phone || selectedItem.contactNumber || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Submitted On</p>
                    <p className="text-sm font-semibold text-slate-900">{format(new Date(selectedItem.createdAt), 'PPpp')}</p>
                  </div>

                  {activeTab === 'jobs' && (
                    <>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Position</p>
                        <p className="text-sm font-semibold text-slate-900">{selectedItem.position}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Portfolio / Link</p>
                        {selectedItem.portfolioUrl ? (
                          <a href={selectedItem.portfolioUrl.startsWith('http') ? selectedItem.portfolioUrl : `https://${selectedItem.portfolioUrl}`} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-blue-600 flex items-center gap-1 hover:underline">
                            <Globe className="w-3.5 h-3.5" /> View Link
                          </a>
                        ) : <span className="text-sm text-slate-400 italic">Not provided</span>}
                      </div>
                    </>
                  )}

                  {activeTab === 'enquiries' && (
                    <>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Service / Industry</p>
                        <p className="text-sm font-semibold text-slate-900">{selectedItem.service}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Location</p>
                        <p className="text-sm font-semibold text-slate-900">{selectedItem.location}</p>
                      </div>
                    </>
                  )}

                  {activeTab === 'partnerships' && (
                    <>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Partnership Type</p>
                        <p className="text-sm font-semibold text-slate-900">{selectedItem.partnershipType || 'General Partnership'}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Company Name</p>
                        <p className="text-sm font-semibold text-slate-900">{selectedItem.companyName || 'Not provided'}</p>
                      </div>
                    </>
                  )}
                </div>

                {/* Long Text / Additional Areas */}
                {activeTab === 'jobs' && (
                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Cover Note</p>
                      <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-700 whitespace-pre-wrap font-medium">
                        {selectedItem.coverNote || <span className="italic text-slate-400">No cover note provided.</span>}
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Resume Document</p>
                      <a
                        href={`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}${selectedItem.resumeUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-sm font-bold transition-colors border border-blue-200"
                      >
                        <FileText className="w-4 h-4" /> View Resume
                        <Download className="w-4 h-4 ml-2" />
                      </a>
                    </div>
                  </div>
                )}

                {activeTab === 'enquiries' && (
                  <div className="pt-4 border-t border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Project Details</p>
                    <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-700 whitespace-pre-wrap font-medium leading-relaxed">
                      {selectedItem.projectDetails}
                    </div>
                  </div>
                )}

                {activeTab === 'partnerships' && (
                  <div className="pt-4 border-t border-slate-100 space-y-3">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Consents & Permissions</p>
                    <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-700 space-y-2 font-medium">
                      <p>Data Processing Consent: <span className="font-bold text-emerald-600">{selectedItem.consentData ? 'Yes' : 'No'}</span></p>
                      <p>Marketing Communications: <span className="font-bold text-slate-900">{selectedItem.consentMarketing ? 'Yes' : 'No'}</span></p>
                    </div>
                  </div>
                )}

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
