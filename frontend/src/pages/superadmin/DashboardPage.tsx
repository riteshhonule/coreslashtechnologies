import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  getContacts, 
  getInquiries, 
  getCandidates, 
  updateCandidateStatus, 
  getMarketingInquiries 
} from "../../lib/api";
import { envConfig } from "../../config/env.config";
import { motion, AnimatePresence } from "framer-motion";

interface Contact {
  id: string;
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

interface Candidate {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  currentCity: string;
  position: string;
  experience: string;
  qualification: string;
  skills: string;
  resumeUrl: string;
  portfolioUrl?: string;
  introduction?: string;
  status: string;
  createdAt: string;
}

interface MarketingInquiry {
  id: string;
  fullName: string;
  mobile: string;
  email: string;
  college: string;
  mode: string;
  focusAreas: string[];
  duration: string;
  createdAt: string;
}

type TabType = "Contacts" | "Inquiries" | "Candidates" | "Marketing";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<TabType>("Contacts");
  
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [filteredInquiries, setFilteredInquiries] = useState<Inquiry[]>([]);

  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);

  const [marketingInquiries, setMarketingInquiries] = useState<MarketingInquiry[]>([]);
  const [filteredMarketingInquiries, setFilteredMarketingInquiries] = useState<MarketingInquiry[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Search & Filter state
  const [search, setSearch] = useState("");
  const [industryFilter, setIndustryFilter] = useState("All");
  const [positionFilter, setPositionFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [modeFilter, setModeFilter] = useState("All");

  // Details Modals
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [selectedMarketingInquiry, setSelectedMarketingInquiry] = useState<MarketingInquiry | null>(null);
  
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
        const contactData = Array.isArray(response.data) ? response.data : response.data.data;
        setContacts(contactData);
        setFilteredContacts(contactData);
      } else if (activeTab === "Inquiries") {
        const response = await getInquiries(token);
        setInquiries(response.data);
        setFilteredInquiries(response.data);
      } else if (activeTab === "Candidates") {
        const response = await getCandidates(token);
        setCandidates(response.data);
        setFilteredCandidates(response.data);
      } else if (activeTab === "Marketing") {
        const response = await getMarketingInquiries(token);
        setMarketingInquiries(response.data);
        setFilteredMarketingInquiries(response.data);
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
    const q = search.toLowerCase().trim();

    if (activeTab === "Contacts") {
      let result = contacts;
      if (q !== "") {
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
    } else if (activeTab === "Inquiries") {
      let result = inquiries;
      if (q !== "") {
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
    } else if (activeTab === "Candidates") {
      let result = candidates;
      if (q !== "") {
        result = result.filter(
          (c) =>
            c.fullName.toLowerCase().includes(q) ||
            c.email.toLowerCase().includes(q) ||
            c.mobile.includes(q) ||
            c.currentCity.toLowerCase().includes(q) ||
            c.skills.toLowerCase().includes(q) ||
            c.position.toLowerCase().includes(q)
        );
      }
      if (positionFilter !== "All") {
        result = result.filter((c) => c.position === positionFilter);
      }
      if (statusFilter !== "All") {
        result = result.filter((c) => c.status === statusFilter);
      }
      setFilteredCandidates(result);
    } else if (activeTab === "Marketing") {
      let result = marketingInquiries;
      if (q !== "") {
        result = result.filter(
          (m) =>
            m.fullName.toLowerCase().includes(q) ||
            m.email.toLowerCase().includes(q) ||
            m.mobile.includes(q) ||
            m.college.toLowerCase().includes(q) ||
            m.focusAreas.some(s => s.toLowerCase().includes(q))
        );
      }
      if (modeFilter !== "All") {
        result = result.filter((m) => m.mode === modeFilter);
      }
      setFilteredMarketingInquiries(result);
    }
  }, [search, industryFilter, positionFilter, statusFilter, modeFilter, contacts, inquiries, candidates, marketingInquiries, activeTab]);

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    const token = localStorage.getItem("superadmin_token");
    if (!token) return;

    try {
      await updateCandidateStatus(token, id, newStatus);
      // Update local state
      setCandidates(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
      if (selectedCandidate && selectedCandidate.id === id) {
        setSelectedCandidate(prev => prev ? { ...prev, status: newStatus } : null);
      }
    } catch (err) {
      console.error("Failed to update candidate status", err);
      alert("Failed to update status. Please try again.");
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getResumeUrl = (url: string) => {
    const base = envConfig.apiUrl.replace(/\/api$/, "");
    return url.startsWith("http") ? url : `${base}${url}`;
  };

  // Get unique industries for the dropdown filter (only relevant for Contacts)
  const industries = ["All", ...Array.from(new Set(contacts.map((c) => c.businessType).filter(Boolean)))];

  const positions = [
    "All",
    "Software Developer",
    "Python Developer",
    "React Developer",
    "Full Stack Developer",
    "UI/UX Designer",
    "Digital Marketing",
    "Business Development",
    "HR",
    "Internship",
    "Other"
  ];

  const statuses = ["All", "New", "Shortlisted", "Interview Scheduled", "Selected", "Rejected"];

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

  const getStatusColorClass = (status: string) => {
    switch (status) {
      case "Shortlisted":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "Interview Scheduled":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      case "Selected":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "Rejected":
        return "bg-rose-500/10 text-rose-450 border-rose-500/20";
      default:
        return "bg-sky-500/10 text-sky-400 border-sky-500/20";
    }
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
              Manage client consultation inquiries, careers, and student marketing applications
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="btn-pill btn-glass text-sm py-2 px-6 flex items-center gap-2 cursor-pointer self-stretch md:self-auto text-center justify-center text-white/80 hover:text-white"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => { setActiveTab("Contacts"); setSearch(""); }}
            className={`px-5 py-2 rounded-full font-bold transition-all text-sm cursor-pointer ${
              activeTab === "Contacts"
                ? "bg-accent-cyan text-dark-black shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
            }`}
          >
            Contact Leads
          </button>
          <button
            onClick={() => { setActiveTab("Inquiries"); setSearch(""); }}
            className={`px-5 py-2 rounded-full font-bold transition-all text-sm cursor-pointer ${
              activeTab === "Inquiries"
                ? "bg-primary-purple text-white shadow-[0_0_15px_rgba(69,3,185,0.4)]"
                : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
            }`}
          >
            Form Inquiries
          </button>
          <button
            onClick={() => { setActiveTab("Candidates"); setSearch(""); }}
            className={`px-5 py-2 rounded-full font-bold transition-all text-sm cursor-pointer ${
              activeTab === "Candidates"
                ? "bg-emerald-500 text-dark-black shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
            }`}
          >
            Careers Applications
          </button>
          <button
            onClick={() => { setActiveTab("Marketing"); setSearch(""); }}
            className={`px-5 py-2 rounded-full font-bold transition-all text-sm cursor-pointer ${
              activeTab === "Marketing"
                ? "bg-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]"
                : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
            }`}
          >
            Marketing Internships
          </button>
        </div>

        {/* Filters and Search Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="md:col-span-2 relative">
            <input
              type="text"
              placeholder={`Search in ${activeTab.toLowerCase()}...`}
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

          {/* Conditional Dropdown Filters based on active tab */}
          {activeTab === "Contacts" && (
            <div className="relative md:col-span-2">
              <select
                value={industryFilter}
                onChange={(e) => setIndustryFilter(e.target.value)}
                className="glass-input appearance-none pr-10 cursor-pointer text-sm"
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
          )}

          {activeTab === "Candidates" && (
            <>
              <div className="relative">
                <select
                  value={positionFilter}
                  onChange={(e) => setPositionFilter(e.target.value)}
                  className="glass-input appearance-none pr-10 cursor-pointer text-sm"
                >
                  {positions.map((pos) => (
                    <option key={pos} value={pos} className="bg-dark-black">
                      Position: {pos}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/30">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="glass-input appearance-none pr-10 cursor-pointer text-sm"
                >
                  {statuses.map((stat) => (
                    <option key={stat} value={stat} className="bg-dark-black">
                      Status: {stat}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/30">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </>
          )}

          {activeTab === "Marketing" && (
            <div className="relative md:col-span-2">
              <select
                value={modeFilter}
                onChange={(e) => setModeFilter(e.target.value)}
                className="glass-input appearance-none pr-10 cursor-pointer text-sm"
              >
                <option value="All" className="bg-dark-black">Mode: All Modes</option>
                <option value="Work From Home" className="bg-dark-black">Mode: Work From Home</option>
                <option value="Office" className="bg-dark-black">Mode: Belagavi Office</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/30">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          )}
        </div>

        {/* Main Content Area */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center">
            <div className="w-10 h-10 border-4 border-accent-cyan border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-white/60 text-sm">Fetching database submissions...</p>
          </div>
        ) : error ? (
          <div className="glass p-8 rounded-2xl border border-red-500/20 text-center py-12">
            <p className="text-red-400 font-semibold mb-4">{error}</p>
            <button onClick={fetchData} className="btn-pill btn-primary-glow mx-auto text-sm">
              Retry Connection
            </button>
          </div>
        ) : (
          (() => {
            // Get active list lengths
            let currentListLength = 0;
            let filteredListLength = 0;

            if (activeTab === "Contacts") {
              currentListLength = contacts.length;
              filteredListLength = filteredContacts.length;
            } else if (activeTab === "Inquiries") {
              currentListLength = inquiries.length;
              filteredListLength = filteredInquiries.length;
            } else if (activeTab === "Candidates") {
              currentListLength = candidates.length;
              filteredListLength = filteredCandidates.length;
            } else if (activeTab === "Marketing") {
              currentListLength = marketingInquiries.length;
              filteredListLength = filteredMarketingInquiries.length;
            }

            if (filteredListLength === 0) {
              return (
                <div className="glass-card p-16 rounded-3xl text-center border border-white/10">
                  <svg className="w-16 h-16 text-white/20 mx-auto mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                  </svg>
                  <h3 className="text-xl font-bold mb-1">No Submissions Found</h3>
                  <p className="text-white/40 text-sm max-w-md mx-auto">
                    {currentListLength === 0
                      ? `No records exist in the database for ${activeTab.toLowerCase()}.`
                      : "No items match your active search filters."}
                  </p>
                </div>
              );
            }

            return (
              <div className="glass-card rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-white/5 border-b border-white/10 text-white/60 text-xs uppercase tracking-wider">
                        {activeTab === "Contacts" && (
                          <>
                            <th className="py-4 px-6">Name</th>
                            <th className="py-4 px-6">Email</th>
                            <th className="py-4 px-6">Phone</th>
                            <th className="py-4 px-6">Industry</th>
                            <th className="py-4 px-6">Date</th>
                            <th className="py-4 px-6 text-right">Actions</th>
                          </>
                        )}
                        {activeTab === "Inquiries" && (
                          <>
                            <th className="py-4 px-6">Name</th>
                            <th className="py-4 px-6">Email</th>
                            <th className="py-4 px-6">Phone</th>
                            <th className="py-4 px-6">Services</th>
                            <th className="py-4 px-6">Date</th>
                            <th className="py-4 px-6 text-right">Actions</th>
                          </>
                        )}
                        {activeTab === "Candidates" && (
                          <>
                            <th className="py-4 px-6">Name</th>
                            <th className="py-4 px-6">Position</th>
                            <th className="py-4 px-6">Experience</th>
                            <th className="py-4 px-6">Location</th>
                            <th className="py-4 px-6">Status</th>
                            <th className="py-4 px-6">Date</th>
                            <th className="py-4 px-6 text-right">Actions</th>
                          </>
                        )}
                        {activeTab === "Marketing" && (
                          <>
                            <th className="py-4 px-6">Name</th>
                            <th className="py-4 px-6">Email</th>
                            <th className="py-4 px-6">Phone</th>
                            <th className="py-4 px-6">College / Qualification</th>
                            <th className="py-4 px-6">Mode</th>
                            <th className="py-4 px-6">Date</th>
                            <th className="py-4 px-6 text-right">Actions</th>
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {activeTab === "Contacts" && filteredContacts.map((contact) => (
                        <tr key={contact.id} className="hover:bg-white/5 transition-colors cursor-pointer group" onClick={() => setSelectedContact(contact)}>
                          <td className="py-4 px-6 font-semibold text-white group-hover:text-accent-cyan transition-colors">{contact.name}</td>
                          <td className="py-4 px-6 text-white/70">{contact.email}</td>
                          <td className="py-4 px-6 text-white/70">{contact.phone}</td>
                          <td className="py-4 px-6">
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary-purple/20 text-indigo-300 border border-primary-purple/20">
                              {contact.businessType || "N/A"}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-white/50 text-sm">{formatDate(contact.createdAt)}</td>
                          <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                            <button onClick={() => setSelectedContact(contact)} className="text-xs text-accent-cyan hover:underline mr-4 cursor-pointer font-bold">
                              View Message
                            </button>
                          </td>
                        </tr>
                      ))}

                      {activeTab === "Inquiries" && filteredInquiries.map((inquiry) => (
                        <tr key={inquiry.id} className="hover:bg-white/5 transition-colors cursor-pointer group" onClick={() => setSelectedInquiry(inquiry)}>
                          <td className="py-4 px-6 font-semibold text-white group-hover:text-accent-cyan transition-colors">{inquiry.fullName}</td>
                          <td className="py-4 px-6 text-white/70">{inquiry.email}</td>
                          <td className="py-4 px-6 text-white/70">{inquiry.mobile}</td>
                          <td className="py-4 px-6 max-w-[200px] truncate text-white/70">{inquiry.services.join(", ")}</td>
                          <td className="py-4 px-6 text-white/50 text-sm">{formatDate(inquiry.createdAt)}</td>
                          <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                            <button onClick={() => setSelectedInquiry(inquiry)} className="text-xs text-accent-cyan hover:underline mr-4 cursor-pointer font-bold">
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}

                      {activeTab === "Candidates" && filteredCandidates.map((cand) => (
                        <tr key={cand.id} className="hover:bg-white/5 transition-colors cursor-pointer group" onClick={() => setSelectedCandidate(cand)}>
                          <td className="py-4 px-6 font-semibold text-white group-hover:text-accent-cyan transition-colors">{cand.fullName}</td>
                          <td className="py-4 px-6 text-white/70 font-semibold">{cand.position}</td>
                          <td className="py-4 px-6 text-white/75">{cand.experience}</td>
                          <td className="py-4 px-6 text-white/70">{cand.currentCity}</td>
                          <td className="py-4 px-6">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-extrabold border ${getStatusColorClass(cand.status)}`}>
                              {cand.status}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-white/50 text-sm">{formatDate(cand.createdAt)}</td>
                          <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                            <button onClick={() => setSelectedCandidate(cand)} className="text-xs text-accent-cyan hover:underline mr-4 cursor-pointer font-bold">
                              View Profile
                            </button>
                          </td>
                        </tr>
                      ))}

                      {activeTab === "Marketing" && filteredMarketingInquiries.map((m) => (
                        <tr key={m.id} className="hover:bg-white/5 transition-colors cursor-pointer group" onClick={() => setSelectedMarketingInquiry(m)}>
                          <td className="py-4 px-6 font-semibold text-white group-hover:text-accent-cyan transition-colors">{m.fullName}</td>
                          <td className="py-4 px-6 text-white/70">{m.email}</td>
                          <td className="py-4 px-6 text-white/70">{m.mobile}</td>
                          <td className="py-4 px-6 text-white/75 font-semibold truncate max-w-[200px]">{m.college}</td>
                          <td className="py-4 px-6">
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                              {m.mode}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-white/50 text-sm">{formatDate(m.createdAt)}</td>
                          <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                            <button onClick={() => setSelectedMarketingInquiry(m)} className="text-xs text-accent-cyan hover:underline mr-4 cursor-pointer font-bold">
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="bg-white/5 px-6 py-4 border-t border-white/10 flex justify-between items-center text-xs text-white/40 font-semibold">
                  <span>Showing {filteredListLength} of {currentListLength} entries</span>
                  <span>Secure Admin Session</span>
                </div>
              </div>
            );
          })()
        )}
      </div>

      {/* Details View Modals */}
      <AnimatePresence>
        {/* Contact Lead Details Modal */}
        {selectedContact && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedContact(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-dark-black border border-white/10 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setSelectedContact(null)} className="absolute right-6 top-6 text-white/40 hover:text-white transition-colors cursor-pointer">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="p-8">
                <div className="mb-6">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent-cyan">Lead Details</span>
                  <h3 className="text-2xl font-bold mt-1 text-white">{selectedContact.name}</h3>
                  <p className="text-white/40 text-xs mt-1">Received on {formatDate(selectedContact.createdAt)}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-wider block">Email Address</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-white/80">{selectedContact.email}</span>
                      <button onClick={() => copyToClipboard(selectedContact.email, "email")} className="text-white/30 hover:text-white transition-colors cursor-pointer">
                        {copiedId === "email" ? <span className="text-[10px] text-accent-cyan font-bold">Copied!</span> : (
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-wider block">Phone Number</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-white/80">{selectedContact.phone}</span>
                      <button onClick={() => copyToClipboard(selectedContact.phone, "phone")} className="text-white/30 hover:text-white transition-colors cursor-pointer">
                        {copiedId === "phone" ? <span className="text-[10px] text-accent-cyan font-bold">Copied!</span> : (
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-wider block">Location / Address</span>
                    <span className="text-sm text-white/80">{selectedContact.address || "Not provided"}</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-wider block">Industry Sector</span>
                    <span className="text-sm text-white/80">{selectedContact.businessType || "Not provided"}</span>
                  </div>
                </div>

                {selectedContact.message && (
                  <div className="space-y-2 border-t border-white/10 pt-6">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-white/30 uppercase tracking-wider">Client Message</span>
                      <button onClick={() => copyToClipboard(selectedContact.message, "msg")} className="text-xs text-accent-cyan hover:underline cursor-pointer font-bold">
                        {copiedId === "msg" ? "Copied Message!" : "Copy Full Message"}
                      </button>
                    </div>
                    <div className="bg-white/5 rounded-2xl p-5 border border-white/5 text-white/90 text-sm whitespace-pre-wrap max-h-[200px] overflow-y-auto leading-relaxed">
                      {selectedContact.message}
                    </div>
                  </div>
                )}

                <div className="mt-8 flex justify-end">
                  <button onClick={() => setSelectedContact(null)} className="btn-pill btn-primary-glow text-sm py-2 px-8 cursor-pointer">
                    Close View
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Consultation Inquiry Details Modal */}
        {selectedInquiry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedInquiry(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-dark-black border border-white/10 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setSelectedInquiry(null)} className="absolute right-6 top-6 text-white/40 hover:text-white transition-colors cursor-pointer">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="p-8">
                <div className="mb-6">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary-purple">Inquiry Details</span>
                  <h3 className="text-2xl font-bold mt-1 text-white">{selectedInquiry.fullName}</h3>
                  <p className="text-white/40 text-xs mt-1">Received on {formatDate(selectedInquiry.createdAt)}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-wider block">Email Address</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-white/80">{selectedInquiry.email}</span>
                      <button onClick={() => copyToClipboard(selectedInquiry.email, "email")} className="text-white/30 hover:text-white transition-colors cursor-pointer">
                        {copiedId === "email" ? <span className="text-[10px] text-accent-cyan font-bold">Copied!</span> : (
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-wider block">Phone Number</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-white/80">{selectedInquiry.mobile}</span>
                      <button onClick={() => copyToClipboard(selectedInquiry.mobile, "phone")} className="text-white/30 hover:text-white transition-colors cursor-pointer">
                        {copiedId === "phone" ? <span className="text-[10px] text-accent-cyan font-bold">Copied!</span> : (
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1 col-span-2">
                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-wider block">Organization / College</span>
                    <span className="text-sm text-white/80">{selectedInquiry.organization || "Not provided"}</span>
                  </div>
                </div>

                <div className="space-y-3 border-t border-white/10 pt-6">
                  <span className="text-[10px] font-bold text-white/30 uppercase tracking-wider block">Services Selected</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedInquiry.services.map((srv) => (
                      <span key={srv} className="px-3 py-1 rounded-full text-xs font-semibold bg-primary-purple/20 text-indigo-300 border border-primary-purple/20">
                        {srv}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button onClick={() => setSelectedInquiry(null)} className="btn-pill btn-primary-glow text-sm py-2 px-8 cursor-pointer">
                    Close View
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Careers Candidate Application Details Modal */}
        {selectedCandidate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedCandidate(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-dark-black border border-white/10 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setSelectedCandidate(null)} className="absolute right-6 top-6 text-white/40 hover:text-white transition-colors cursor-pointer">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="p-8 max-h-[90vh] overflow-y-auto">
                <div className="mb-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">Candidate Profile</span>
                    <h3 className="text-2xl font-bold mt-1 text-white">{selectedCandidate.fullName}</h3>
                    <p className="text-white/40 text-xs mt-1">Applied on {formatDate(selectedCandidate.createdAt)}</p>
                  </div>
                  
                  {/* Status Dropdown inside Modal */}
                  <div className="space-y-1 shrink-0">
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider block">Application Status</span>
                    <select
                      value={selectedCandidate.status}
                      onChange={(e) => handleStatusUpdate(selectedCandidate.id, e.target.value)}
                      className="bg-white/5 border border-white/15 rounded-xl py-1.5 px-3 text-white text-xs font-bold focus:outline-none focus:border-accent-cyan cursor-pointer transition-all"
                    >
                      <option value="New" className="bg-dark-black">New</option>
                      <option value="Shortlisted" className="bg-dark-black">Shortlisted</option>
                      <option value="Interview Scheduled" className="bg-dark-black">Interview Scheduled</option>
                      <option value="Selected" className="bg-dark-black">Selected</option>
                      <option value="Rejected" className="bg-dark-black">Rejected</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-wider block">Email Address</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-white/80">{selectedCandidate.email}</span>
                      <button onClick={() => copyToClipboard(selectedCandidate.email, "email")} className="text-white/30 hover:text-white transition-colors cursor-pointer">
                        {copiedId === "email" ? <span className="text-[10px] text-accent-cyan font-bold">Copied!</span> : (
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-wider block">Phone Number</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-white/80">{selectedCandidate.mobile}</span>
                      <button onClick={() => copyToClipboard(selectedCandidate.mobile, "phone")} className="text-white/30 hover:text-white transition-colors cursor-pointer">
                        {copiedId === "phone" ? <span className="text-[10px] text-accent-cyan font-bold">Copied!</span> : (
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-wider block">Applying For</span>
                    <span className="text-sm text-emerald-400 font-bold">{selectedCandidate.position}</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-wider block">Experience Level</span>
                    <span className="text-sm text-white/80">{selectedCandidate.experience}</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-wider block">Highest Qualification</span>
                    <span className="text-sm text-white/80">{selectedCandidate.qualification}</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-wider block">Current City</span>
                    <span className="text-sm text-white/80">{selectedCandidate.currentCity}</span>
                  </div>

                  {selectedCandidate.portfolioUrl && (
                    <div className="space-y-1 col-span-2">
                      <span className="text-[10px] font-bold text-white/30 uppercase tracking-wider block">Portfolio / LinkedIn URL</span>
                      <a href={selectedCandidate.portfolioUrl} target="_blank" rel="noreferrer" className="text-sm text-accent-cyan hover:underline inline-flex items-center gap-1">
                        {selectedCandidate.portfolioUrl}
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  )}
                </div>

                <div className="space-y-2 border-t border-white/10 pt-5">
                  <span className="text-[10px] font-bold text-white/30 uppercase tracking-wider block">Key Skills</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCandidate.skills.split(",").map(skill => (
                      <span key={skill} className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white/5 border border-white/10 text-white/70">
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedCandidate.introduction && (
                  <div className="space-y-2 border-t border-white/10 pt-5 mt-5">
                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-wider block">Short Introduction</span>
                    <div className="bg-white/5 rounded-2xl p-4 border border-white/5 text-white/90 text-sm whitespace-pre-wrap leading-relaxed italic">
                      "{selectedCandidate.introduction}"
                    </div>
                  </div>
                )}

                <div className="mt-8 pt-5 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <a
                    href={getResumeUrl(selectedCandidate.resumeUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:opacity-95 text-dark-black font-bold text-sm rounded-xl text-center flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/10"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    Download Resume
                  </a>
                  
                  <button onClick={() => setSelectedCandidate(null)} className="w-full sm:w-auto btn-pill btn-primary-glow text-sm py-2 px-8 cursor-pointer">
                    Close Profile
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Marketing Internship Inquiry Details Modal */}
        {selectedMarketingInquiry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedMarketingInquiry(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-dark-black border border-white/10 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setSelectedMarketingInquiry(null)} className="absolute right-6 top-6 text-white/40 hover:text-white transition-colors cursor-pointer">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="p-8">
                <div className="mb-6">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-400">Marketing Internship Application</span>
                  <h3 className="text-2xl font-bold mt-1 text-white">{selectedMarketingInquiry.fullName}</h3>
                  <p className="text-white/40 text-xs mt-1">Received on {formatDate(selectedMarketingInquiry.createdAt)}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-wider block">Email Address</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-white/80">{selectedMarketingInquiry.email}</span>
                      <button onClick={() => copyToClipboard(selectedMarketingInquiry.email, "email")} className="text-white/30 hover:text-white transition-colors cursor-pointer">
                        {copiedId === "email" ? <span className="text-[10px] text-accent-cyan font-bold">Copied!</span> : (
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-wider block">Phone Number</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-white/80">{selectedMarketingInquiry.mobile}</span>
                      <button onClick={() => copyToClipboard(selectedMarketingInquiry.mobile, "phone")} className="text-white/30 hover:text-white transition-colors cursor-pointer">
                        {copiedId === "phone" ? <span className="text-[10px] text-accent-cyan font-bold">Copied!</span> : (
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-wider block">College / Qualification</span>
                    <span className="text-sm text-white/80 font-bold">{selectedMarketingInquiry.college}</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-wider block">Internship Mode</span>
                    <span className="text-sm text-indigo-300 font-bold">{selectedMarketingInquiry.mode}</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-wider block">Internship Duration</span>
                    <span className="text-sm text-white/80">{selectedMarketingInquiry.duration}</span>
                  </div>
                </div>

                <div className="space-y-3 border-t border-white/10 pt-6">
                  <span className="text-[10px] font-bold text-white/30 uppercase tracking-wider block">Areas of Interest (Focus Areas)</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedMarketingInquiry.focusAreas.map((area) => (
                      <span key={area} className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/20">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button onClick={() => setSelectedMarketingInquiry(null)} className="btn-pill btn-primary-glow text-sm py-2 px-8 cursor-pointer">
                    Close View
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
