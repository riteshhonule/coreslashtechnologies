import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getContacts, getInquiries } from "../../lib/api";
import { motion, AnimatePresence } from "framer-motion";

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  address?: string;
  businessType?: string;
  service?: string;
  message: string;
  createdAt: string;
}

interface Inquiry {
  id: string;
  fullName: string;
  mobile: string;
  email: string;
  organization?: string;
  services: string[];
  createdAt: string;
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"Contacts" | "Inquiries">("Contacts");
  
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [filteredInquiries, setFilteredInquiries] = useState<Inquiry[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Search & Filter state
  const [search, setSearch] = useState("");
  const [industryFilter, setIndustryFilter] = useState("All");

  // Details Modal
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  
  // Clipboard copying feedback state
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("superadmin_token");
    navigate("/superadmin/login");
  };

  const fetchData = async () => {
    const token = localStorage.getItem("superadmin_token");
    if (!token) {
      navigate("/superadmin/login");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      if (activeTab === "Contacts") {
        const response = await getContacts(token);
        // Backend now returns { data, total, page, totalPages } for contacts
        const contactData = Array.isArray(response.data) ? response.data : response.data.data;
        setContacts(contactData);
        setFilteredContacts(contactData);
      } else {
        const response = await getInquiries(token);
        setInquiries(response.data);
        setFilteredInquiries(response.data);
      }
    } catch (err: any) {
      console.error(err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.removeItem("superadmin_token");
        navigate("/superadmin/login");
      } else {
        setError("Failed to fetch data. Please refresh the page.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [navigate, activeTab]);

  // Handle Search and Filters
  useEffect(() => {
    if (activeTab === "Contacts") {
      let result = contacts;
      if (search.trim() !== "") {
        const q = search.toLowerCase();
        result = result.filter(
          (c) =>
            c.name.toLowerCase().includes(q) ||
            c.email.toLowerCase().includes(q) ||
            c.phone.includes(q) ||
            (c.address && c.address.toLowerCase().includes(q)) ||
            c.message.toLowerCase().includes(q)
        );
      }
      if (industryFilter !== "All") {
        result = result.filter((c) => c.businessType === industryFilter);
      }
      setFilteredContacts(result);
    } else {
      let result = inquiries;
      if (search.trim() !== "") {
        const q = search.toLowerCase();
        result = result.filter(
          (i) =>
            i.fullName.toLowerCase().includes(q) ||
            i.email.toLowerCase().includes(q) ||
            i.mobile.includes(q) ||
            (i.organization && i.organization.toLowerCase().includes(q)) ||
            i.services.some(s => s.toLowerCase().includes(q))
        );
      }
      setFilteredInquiries(result);
    }
  }, [search, industryFilter, contacts, inquiries, activeTab]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Get unique industries for the dropdown filter (only relevant for Contacts)
  const industries = ["All", ...Array.from(new Set(contacts.map((c) => c.businessType).filter(Boolean)))];

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-dark-black text-white p-4 md:p-8 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary-purple/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-cyan/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-6 border-b border-white/10">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white flex items-center gap-3">
              <span className="text-gradient-cyan">Superadmin</span> Portal
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/20">
                Live Data
              </span>
            </h1>
            <p className="text-white/50 text-sm mt-1">
              View and manage consultation submissions and customer inquiries
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="btn-pill btn-glass text-sm py-2 px-6 flex items-center gap-2 cursor-pointer self-stretch md:self-auto text-center justify-center text-white/80 hover:text-white"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Logout
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab("Contacts")}
            className={`px-6 py-2 rounded-full font-bold transition-all ${
              activeTab === "Contacts"
                ? "bg-accent-cyan text-dark-black shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
            }`}
          >
            Contact Leads
          </button>
          <button
            onClick={() => setActiveTab("Inquiries")}
            className={`px-6 py-2 rounded-full font-bold transition-all ${
              activeTab === "Inquiries"
                ? "bg-primary-purple text-white shadow-[0_0_15px_rgba(69,3,185,0.4)]"
                : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
            }`}
          >
            Form Inquiries
          </button>
        </div>

        {/* Filters and Search Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="md:col-span-3 relative">
            <input
              type="text"
              placeholder="Search by name, email, phone, message or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="glass-input pl-12"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div className="relative">
            <select
              value={industryFilter}
              onChange={(e) => setIndustryFilter(e.target.value)}
              className="glass-input appearance-none pr-10 cursor-pointer"
            >
              {industries.map((ind) => (
                <option key={ind} value={ind} className="bg-dark-black">
                  Industry: {ind}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/30">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center">
            <div className="w-10 h-10 border-4 border-accent-cyan border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-white/60">Fetching database submissions...</p>
          </div>
        ) : error ? (
          <div className="glass p-8 rounded-2xl border-red-500/20 text-center py-12">
            <p className="text-red-400 font-semibold mb-4">{error}</p>
            <button
              onClick={fetchContactsData}
              className="btn-pill btn-primary-glow mx-auto text-sm"
            >
              Retry Connection
            </button>
          </div>
        ) : filteredContacts.length === 0 ? (
          <div className="glass-card p-16 rounded-3xl text-center">
            <svg
              className="w-16 h-16 text-white/20 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
              />
            </svg>
            <h3 className="text-xl font-bold mb-1">No Submissions Found</h3>
            <p className="text-white/40 text-sm max-w-md mx-auto">
              {(activeTab === "Contacts" ? contacts.length : inquiries.length) === 0
                ? `No clients have submitted the ${activeTab === "Contacts" ? "contact" : "inquiry"} form yet.`
                : "No items match your active search filters."}
            </p>
          </div>
        ) : (
          <div className="glass-card rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10 text-white/60 text-xs uppercase tracking-wider">
                    <th className="py-4 px-6">Name</th>
                    <th className="py-4 px-6">Email</th>
                    <th className="py-4 px-6">Phone</th>
                    <th className="py-4 px-6">{activeTab === "Contacts" ? "Industry" : "Services"}</th>
                    <th className="py-4 px-6">Date</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {activeTab === "Contacts" ? filteredContacts.map((contact) => (
                    <tr
                      key={contact.id}
                      className="hover:bg-white/5 transition-colors cursor-pointer group"
                      onClick={() => setSelectedContact(contact)}
                    >
                      <td className="py-4 px-6 font-semibold text-white group-hover:text-accent-cyan transition-colors">
                        {contact.name}
                      </td>
                      <td className="py-4 px-6 text-white/70">{contact.email}</td>
                      <td className="py-4 px-6 text-white/70">{contact.phone}</td>
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary-purple/20 text-secondary-indigo border border-secondary-indigo/20">
                          {contact.businessType || "N/A"}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-white/50 text-sm">
                        {formatDate(contact.createdAt)}
                      </td>
                      <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => setSelectedContact(contact)}
                          className="text-xs text-accent-cyan hover:underline mr-4 cursor-pointer font-bold"
                        >
                          View Message
                        </button>
                      </td>
                    </tr>
                  )) : filteredInquiries.map((inquiry) => (
                    <tr
                      key={inquiry.id}
                      className="hover:bg-white/5 transition-colors cursor-pointer group"
                      onClick={() => setSelectedInquiry(inquiry)}
                    >
                      <td className="py-4 px-6 font-semibold text-white group-hover:text-accent-cyan transition-colors">
                        {inquiry.fullName}
                      </td>
                      <td className="py-4 px-6 text-white/70">{inquiry.email}</td>
                      <td className="py-4 px-6 text-white/70">{inquiry.mobile}</td>
                      <td className="py-4 px-6 max-w-[200px] truncate text-white/70">
                        {inquiry.services.join(", ")}
                      </td>
                      <td className="py-4 px-6 text-white/50 text-sm">
                        {formatDate(inquiry.createdAt)}
                      </td>
                      <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => setSelectedInquiry(inquiry)}
                          className="text-xs text-accent-cyan hover:underline mr-4 cursor-pointer font-bold"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="bg-white/5 px-6 py-4 border-t border-white/10 flex justify-between items-center text-xs text-white/40 font-semibold">
              <span>Showing {activeTab === "Contacts" ? filteredContacts.length : filteredInquiries.length} of {activeTab === "Contacts" ? contacts.length : inquiries.length} entries</span>
              <span>Secure Admin Session</span>
            </div>
          </div>
        )}
      </div>

      {/* Details View Modal */}
      <AnimatePresence>
        {(selectedContact || selectedInquiry) && (() => {
          const isContact = !!selectedContact;
          const data = selectedContact || (selectedInquiry as unknown as Contact); // we'll access dynamically
          const name = isContact ? selectedContact?.name : selectedInquiry?.fullName;
          const email = isContact ? selectedContact?.email : selectedInquiry?.email;
          const phone = isContact ? selectedContact?.phone : selectedInquiry?.mobile;
          const date = isContact ? selectedContact?.createdAt : selectedInquiry?.createdAt;

          return (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
            onClick={() => { setSelectedContact(null); setSelectedInquiry(null); }}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="bg-dark-black border border-white/10 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => { setSelectedContact(null); setSelectedInquiry(null); }}
                className="absolute right-6 top-6 text-white/40 hover:text-white transition-colors cursor-pointer"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Modal Content */}
              <div className="p-8">
                <div className="mb-6">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent-cyan">
                    {isContact ? "Lead Details" : "Inquiry Details"}
                  </span>
                  <h3 className="text-2xl font-bold mt-1 text-white">
                    {name}
                  </h3>
                  <p className="text-white/40 text-xs mt-1">
                    Received on {formatDate(date as string)}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-wider block">
                      Email Address
                    </span>
                    <div className="flex items-center gap-2 group">
                      <span className="text-sm text-white/80">{email}</span>
                      <button
                        onClick={() => copyToClipboard(email as string, "email")}
                        className="text-white/30 hover:text-white transition-colors cursor-pointer"
                        title="Copy to clipboard"
                      >
                        {copiedId === "email" ? (
                          <span className="text-[10px] text-accent-cyan font-bold">Copied!</span>
                        ) : (
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-wider block">
                      Phone Number
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-white/80">{phone}</span>
                      <button
                        onClick={() => copyToClipboard(phone as string, "phone")}
                        className="text-white/30 hover:text-white transition-colors cursor-pointer"
                        title="Copy to clipboard"
                      >
                        {copiedId === "phone" ? (
                          <span className="text-[10px] text-accent-cyan font-bold">Copied!</span>
                        ) : (
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-wider block">
                      {isContact ? "Location / Address" : "Organization / College"}
                    </span>
                    <span className="text-sm text-white/80">
                      {isContact ? (selectedContact?.address || "Not provided") : (selectedInquiry?.organization || "Not provided")}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-wider block">
                      {isContact ? "Industry Sector" : "Services Requested"}
                    </span>
                    <span className="text-sm text-white/80">
                      {isContact ? (selectedContact?.businessType || "Not provided") : selectedInquiry?.services.join(", ")}
                    </span>
                  </div>
                </div>

                {isContact && selectedContact?.message && (
                  <div className="space-y-2 border-t border-white/10 pt-6">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-white/30 uppercase tracking-wider">
                        Client Message / Vision
                      </span>
                      <button
                        onClick={() => copyToClipboard(selectedContact.message, "msg")}
                        className="text-xs text-accent-cyan hover:underline flex items-center gap-1 cursor-pointer font-bold"
                      >
                        {copiedId === "msg" ? "Copied Message!" : "Copy Full Message"}
                      </button>
                    </div>
                    <div className="bg-white/5 rounded-2xl p-5 border border-white/5 text-white/90 text-sm whitespace-pre-wrap max-h-[200px] overflow-y-auto leading-relaxed">
                      {selectedContact.message}
                    </div>
                  </div>
                )}

                <div className="mt-8 flex justify-end">
                  <button
                    onClick={() => { setSelectedContact(null); setSelectedInquiry(null); }}
                    className="btn-pill btn-primary-glow text-sm py-2 px-8 cursor-pointer"
                  >
                    Close View
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}
