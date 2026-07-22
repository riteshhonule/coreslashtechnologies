import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SEO from "../../components/SEO";
import { 
  getContacts, 
  getInquiries, 
  getCandidates, 
  updateCandidateStatus, 
  getMarketingInquiries,
  getCertificatesAdmin,
  createCertificateAdmin,
  updateCertificateAdmin,
  deleteCertificateAdmin,
  uploadCertificatePdf,
  getNextCertificateNumberAdmin
} from "../../lib/api";
import { envConfig } from "../../config/env.config";
import { motion, AnimatePresence } from "framer-motion";
import { 
  PhoneCall, 
  MessageSquare, 
  Briefcase, 
  Layers, 
  Award, 
  Search, 
  Plus, 
  Trash2, 
  FileText, 
  Calendar, 
  User, 
  MapPin, 
  ExternalLink, 
  LogOut, 
  Copy, 
  Check, 
  BookOpen, 
  Hash, 
  ArrowLeft,
  ChevronDown
} from "lucide-react";

interface Certificate {
  id: string;
  certificateNumber: string;
  candidateName: string;
  courseName: string;
  issueDate: string;
  completionDate?: string | null;
  grade?: string | null;
  status: "Verified" | "Revoked" | "Expired";
  certificateUrl?: string | null;
  createdAt: string;
  updatedAt: string;
}

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

type TabType = "Contacts" | "Inquiries" | "Candidates" | "Marketing" | "Certificates";

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

  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [filteredCertificates, setFilteredCertificates] = useState<Certificate[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Search & Filter state
  const [search, setSearch] = useState("");
  const [industryFilter, setIndustryFilter] = useState("All");
  const [positionFilter, setPositionFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [modeFilter, setModeFilter] = useState("All");
  const [certStatusFilter, setCertStatusFilter] = useState("All");

  // Admin certificate creation form state
  const [isCreateCertModalOpen, setIsCreateCertModalOpen] = useState(false);
  const [newCertNumber, setNewCertNumber] = useState("");
  const [newCertCandidate, setNewCertCandidate] = useState("");
  const [newCertCourse, setNewCertCourse] = useState("");
  const [newCertIssueDate, setNewCertIssueDate] = useState("");
  const [newCertCompletionDate, setNewCertCompletionDate] = useState("");
  const [newCertGrade, setNewCertGrade] = useState("");
  const [newCertStatus, setNewCertStatus] = useState<"Verified" | "Revoked" | "Expired">("Verified");
  const [newCertUrl, setNewCertUrl] = useState("");
  const [certFormError, setCertFormError] = useState<string | null>(null);
  const [certFormLoading, setCertFormLoading] = useState(false);

  const [certUploadMethod, setCertUploadMethod] = useState<"upload" | "url">("upload");
  const [isUploadingCert, setIsUploadingCert] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

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
      
      const [contRes, inqRes, candRes, markRes, certRes] = await Promise.all([
        getContacts(token).catch(() => ({ data: [] })),
        getInquiries(token).catch(() => ({ data: [] })),
        getCandidates(token).catch(() => ({ data: [] })),
        getMarketingInquiries(token).catch(() => ({ data: [] })),
        getCertificatesAdmin(token).catch(() => ({ data: [] }))
      ]);

      const contactData = Array.isArray(contRes.data) ? contRes.data : contRes.data?.data || [];
      setContacts(contactData);
      setInquiries(inqRes.data || []);
      setCandidates(candRes.data || []);
      setMarketingInquiries(markRes.data || []);
      setCertificates(certRes.data || []);

      if (activeTab === "Contacts") setFilteredContacts(contactData);
      else if (activeTab === "Inquiries") setFilteredInquiries(inqRes.data || []);
      else if (activeTab === "Candidates") setFilteredCandidates(candRes.data || []);
      else if (activeTab === "Marketing") setFilteredMarketingInquiries(markRes.data || []);
      else if (activeTab === "Certificates") setFilteredCertificates(certRes.data || []);

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

  useEffect(() => {
    if (isCreateCertModalOpen) {
      const token = localStorage.getItem("superadmin_token");
      if (!token) return;

      getNextCertificateNumberAdmin(token)
        .then((res) => {
          if (res.data && res.data.nextNumber) {
            setNewCertNumber(res.data.nextNumber);
          }
        })
        .catch((err) => {
          console.error("Failed to fetch next certificate number", err);
        });
    }
  }, [isCreateCertModalOpen]);

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
    } else if (activeTab === "Certificates") {
      let result = certificates;
      if (q !== "") {
        result = result.filter(
          (c) =>
            c.certificateNumber.toLowerCase().includes(q) ||
            c.candidateName.toLowerCase().includes(q) ||
            c.courseName.toLowerCase().includes(q) ||
            (c.grade && c.grade.toLowerCase().includes(q))
        );
      }
      if (certStatusFilter !== "All") {
        result = result.filter((c) => c.status === certStatusFilter);
      }
      setFilteredCertificates(result);
    }
  }, [search, industryFilter, positionFilter, statusFilter, modeFilter, certStatusFilter, contacts, inquiries, candidates, marketingInquiries, certificates, activeTab]);

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    const token = localStorage.getItem("superadmin_token");
    if (!token) return;

    try {
      await updateCandidateStatus(token, id, newStatus);
      setCandidates(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
      if (selectedCandidate && selectedCandidate.id === id) {
        setSelectedCandidate(prev => prev ? { ...prev, status: newStatus } : null);
      }
    } catch (err) {
      console.error("Failed to update candidate status", err);
      alert("Failed to update status. Please try again.");
    }
  };

  const handleCertFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setCertFormError("Only PDF files are allowed.");
      return;
    }

    const token = localStorage.getItem("superadmin_token");
    if (!token) return;

    try {
      setIsUploadingCert(true);
      setCertFormError(null);
      const res = await uploadCertificatePdf(token, file);
      if (res.data && res.data.url) {
        setNewCertUrl(res.data.url);
        setUploadedFileName(file.name);
      }
    } catch (err: any) {
      console.error(err);
      setCertFormError(err.response?.data?.message || "Failed to upload certificate PDF.");
    } finally {
      setIsUploadingCert(false);
    }
  };

  const handleCreateCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("superadmin_token");
    if (!token) return;

    if (!newCertNumber.trim() || !newCertCandidate.trim() || !newCertCourse.trim() || !newCertIssueDate.trim()) {
      setCertFormError("Please fill out all required fields.");
      return;
    }

    try {
      setCertFormLoading(true);
      setCertFormError(null);

      const response = await createCertificateAdmin(token, {
        certificateNumber: newCertNumber,
        candidateName: newCertCandidate,
        courseName: newCertCourse,
        issueDate: newCertIssueDate,
        completionDate: newCertCompletionDate || null,
        grade: newCertGrade || null,
        status: newCertStatus,
        certificateUrl: newCertUrl || null,
      });

      if (response.data) {
        setCertificates(prev => [response.data, ...prev]);
        setFilteredCertificates(prev => [response.data, ...prev]);
        setIsCreateCertModalOpen(false);

        // Reset form
        setNewCertNumber("");
        setNewCertCandidate("");
        setNewCertCourse("");
        setNewCertIssueDate("");
        setNewCertCompletionDate("");
        setNewCertGrade("");
        setNewCertStatus("Verified");
        setNewCertUrl("");
        setCertUploadMethod("upload");
        setUploadedFileName(null);
      }
    } catch (err: any) {
      console.error(err);
      const errMsg = err.response?.data?.message;
      setCertFormError(Array.isArray(errMsg) ? errMsg.join(" ") : errMsg || "Failed to create certificate. Ensure number is unique.");
    } finally {
      setCertFormLoading(false);
    }
  };

  const handleCertStatusUpdate = async (id: string, newStatus: "Verified" | "Revoked" | "Expired") => {
    const token = localStorage.getItem("superadmin_token");
    if (!token) return;

    try {
      await updateCertificateAdmin(token, id, { status: newStatus });
      setCertificates(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
      setFilteredCertificates(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
    } catch (err: any) {
      console.error("Failed to update status", err);
      alert(err.response?.data?.message || "Failed to update status. Please try again.");
    }
  };

  const handleDeleteCertificate = async (id: string) => {
    const token = localStorage.getItem("superadmin_token");
    if (!token) return;

    if (!window.confirm("Are you sure you want to delete this certificate? This action cannot be undone.")) {
      return;
    }

    try {
      await deleteCertificateAdmin(token, id);
      setCertificates(prev => prev.filter(c => c.id !== id));
      setFilteredCertificates(prev => prev.filter(c => c.id !== id));
    } catch (err: any) {
      console.error("Failed to delete certificate", err);
      alert(err.response?.data?.message || "Failed to delete certificate. Please try again.");
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

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case "Verified":
      case "Selected":
        return "bg-neutral-100 text-neutral-800 border-neutral-300";
      case "Shortlisted":
        return "bg-neutral-50 text-neutral-700 border-neutral-300";
      case "Interview Scheduled":
        return "bg-neutral-50 text-neutral-700 border-neutral-300";
      case "Rejected":
      case "Revoked":
        return "bg-neutral-100 text-neutral-500 border-neutral-200";
      case "Expired":
        return "bg-neutral-50 text-neutral-600 border-neutral-200";
      default:
        return "bg-neutral-100 text-neutral-700 border-neutral-300";
    }
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 p-4 md:p-8 relative overflow-hidden font-sans">
      <SEO title="Superadmin Dashboard | CoreSlash Technologies" noindex={true} />
      {/* Subtle Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 pb-6 border-b border-neutral-200">
          <div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-neutral-900 flex items-center gap-3">
              Superadmin Portal
              <span className="text-[10px] font-bold uppercase px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 border border-neutral-300 tracking-wider">
                Console
              </span>
            </h1>
            <p className="text-neutral-500 text-sm mt-1.5 leading-relaxed">
              Consolidated query center, recruiting desk, and official credential ledger.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 bg-white hover:bg-blue-50 border border-neutral-300 text-neutral-700 hover:text-blue-650 hover:border-blue-200 px-5 py-2.5 rounded-2xl cursor-pointer text-sm font-semibold tracking-wide transition-all duration-200 shadow-sm"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        {/* Overview Stats Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white border border-neutral-200 rounded-2xl p-5 hover:border-neutral-400 transition-all duration-300 flex flex-col justify-between shadow-sm">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Contact Leads</span>
              <div className="p-1.5 rounded-xl bg-neutral-50 text-neutral-900 border border-neutral-200"><PhoneCall className="w-4 h-4" /></div>
            </div>
            <h3 className="text-3xl font-extrabold text-neutral-900 mt-4">{contacts.length}</h3>
          </div>

          <div className="bg-white border border-neutral-200 rounded-2xl p-5 hover:border-neutral-400 transition-all duration-300 flex flex-col justify-between shadow-sm">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Form Inquiries</span>
              <div className="p-1.5 rounded-xl bg-neutral-50 text-neutral-900 border border-neutral-200"><MessageSquare className="w-4 h-4" /></div>
            </div>
            <h3 className="text-3xl font-extrabold text-neutral-900 mt-4">{inquiries.length}</h3>
          </div>

          <div className="bg-white border border-neutral-200 rounded-2xl p-5 hover:border-neutral-400 transition-all duration-300 flex flex-col justify-between shadow-sm">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Careers</span>
              <div className="p-1.5 rounded-xl bg-neutral-50 text-neutral-900 border border-neutral-200"><Briefcase className="w-4 h-4" /></div>
            </div>
            <h3 className="text-3xl font-extrabold text-neutral-900 mt-4">{candidates.length}</h3>
          </div>

          <div className="bg-white border border-neutral-200 rounded-2xl p-5 hover:border-neutral-400 transition-all duration-300 flex flex-col justify-between shadow-sm">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Marketing Interns</span>
              <div className="p-1.5 rounded-xl bg-neutral-50 text-neutral-900 border border-neutral-200"><Layers className="w-4 h-4" /></div>
            </div>
            <h3 className="text-3xl font-extrabold text-neutral-900 mt-4">{marketingInquiries.length}</h3>
          </div>

          <div className="bg-white border border-neutral-200 rounded-2xl p-5 hover:border-neutral-400 transition-all duration-300 flex flex-col justify-between col-span-2 lg:col-span-1 shadow-sm">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Issued Credentials</span>
              <div className="p-1.5 rounded-xl bg-neutral-50 text-neutral-900 border border-neutral-200"><Award className="w-4 h-4" /></div>
            </div>
            <h3 className="text-3xl font-extrabold text-neutral-900 mt-4">{certificates.length}</h3>
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <div className="flex flex-wrap gap-2.5 mb-8">
          {[
            { id: "Contacts", label: "Contact Leads", icon: PhoneCall },
            { id: "Inquiries", label: "Form Inquiries", icon: MessageSquare },
            { id: "Candidates", label: "Careers applications", icon: Briefcase },
            { id: "Marketing", label: "Marketing Internships", icon: Layers },
            { id: "Certificates", label: "Issued Certificates", icon: Award }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id as TabType); setSearch(""); }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold tracking-wide transition-all text-sm cursor-pointer border ${
                  isActive
                    ? "bg-blue-50 text-blue-700 border-blue-300 shadow-sm"
                    : "bg-white text-neutral-500 border-neutral-200 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50/50"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Search & Filters Controls */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="md:col-span-2 relative">
            <input
              type="text"
              placeholder={`Search in ${activeTab.toLowerCase()}...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 bg-white border border-neutral-200 rounded-2xl text-neutral-900 text-sm font-semibold focus:outline-none focus:border-black transition-all placeholder:text-neutral-400"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-450">
              <Search className="w-4 h-4" />
            </div>
          </div>

          {/* Contextual Filters */}
          {activeTab === "Contacts" && (
            <div className="relative md:col-span-2">
              <select
                value={industryFilter}
                onChange={(e) => setIndustryFilter(e.target.value)}
                className="w-full pl-4 pr-10 py-3.5 bg-white border border-neutral-200 rounded-2xl text-neutral-700 text-sm font-semibold focus:outline-none focus:border-black appearance-none cursor-pointer"
              >
                {industries.map((ind) => (
                  <option key={ind} value={ind} className="bg-white text-neutral-900">
                    Industry: {ind}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          )}

          {activeTab === "Candidates" && (
            <>
              <div className="relative">
                <select
                  value={positionFilter}
                  onChange={(e) => setPositionFilter(e.target.value)}
                  className="w-full pl-4 pr-10 py-3.5 bg-white border border-neutral-200 rounded-2xl text-neutral-700 text-sm font-semibold focus:outline-none focus:border-black appearance-none cursor-pointer"
                >
                  {positions.map((pos) => (
                    <option key={pos} value={pos} className="bg-white text-neutral-900">
                      Position: {pos}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>

              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full pl-4 pr-10 py-3.5 bg-white border border-neutral-200 rounded-2xl text-neutral-700 text-sm font-semibold focus:outline-none focus:border-black appearance-none cursor-pointer"
                >
                  {statuses.map((stat) => (
                    <option key={stat} value={stat} className="bg-white text-neutral-900">
                      Status: {stat}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </>
          )}

          {activeTab === "Marketing" && (
            <div className="relative md:col-span-2">
              <select
                value={modeFilter}
                onChange={(e) => setModeFilter(e.target.value)}
                className="w-full pl-4 pr-10 py-3.5 bg-white border border-neutral-200 rounded-2xl text-neutral-700 text-sm font-semibold focus:outline-none focus:border-black appearance-none cursor-pointer"
              >
                <option value="All" className="bg-white text-neutral-900">Mode: All Modes</option>
                <option value="Work From Home" className="bg-white text-neutral-900">Mode: Work From Home</option>
                <option value="Office" className="bg-white text-neutral-900">Mode: Belagavi Office</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          )}

          {activeTab === "Certificates" && (
            <>
              <div className="relative md:col-span-1">
                <select
                  value={certStatusFilter}
                  onChange={(e) => setCertStatusFilter(e.target.value)}
                  className="w-full pl-4 pr-10 py-3.5 bg-white border border-neutral-200 rounded-2xl text-neutral-700 text-sm font-semibold focus:outline-none focus:border-black appearance-none cursor-pointer"
                >
                  <option value="All" className="bg-white text-neutral-900">Status: All</option>
                  <option value="Verified" className="bg-white text-neutral-900">Status: Verified</option>
                  <option value="Revoked" className="bg-white text-neutral-900">Status: Revoked</option>
                  <option value="Expired" className="bg-white text-neutral-900">Status: Expired</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>

              <div className="md:col-span-1">
                <button
                  onClick={() => setIsCreateCertModalOpen(true)}
                  className="w-full flex items-center justify-center gap-2 bg-white hover:bg-blue-50 border border-neutral-300 hover:border-blue-300 text-neutral-800 hover:text-blue-750 py-3.5 px-5 rounded-2xl font-bold cursor-pointer text-xs tracking-wider uppercase shadow-sm transition-all duration-200"
                >
                  <Plus className="w-4 h-4" />
                  Issue Certificate
                </button>
              </div>
            </>
          )}
        </div>

        {/* Data List Container */}
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center">
            <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-neutral-500 text-sm">Synchronizing ledger...</p>
          </div>
        ) : error ? (
          <div className="bg-white border border-neutral-200 p-8 rounded-3xl text-center py-12 shadow-sm">
            <p className="text-neutral-500 font-semibold mb-4">{error}</p>
            <button onClick={fetchData} className="px-6 py-2.5 bg-black text-white font-bold rounded-xl text-xs hover:bg-neutral-800 transition-all">
              Retry Connection
            </button>
          </div>
        ) : (
          (() => {
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
            } else if (activeTab === "Certificates") {
              currentListLength = certificates.length;
              filteredListLength = filteredCertificates.length;
            }

            if (filteredListLength === 0) {
              return (
                <div className="bg-white border border-neutral-200 p-16 rounded-3xl text-center shadow-md">
                  <div className="w-12 h-12 bg-neutral-50 border border-neutral-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Layers className="w-5 h-5 text-neutral-500" />
                  </div>
                  <h3 className="text-lg font-bold mb-1 text-neutral-900">No Records Found</h3>
                  <p className="text-neutral-500 text-xs max-w-sm mx-auto leading-relaxed">
                    {currentListLength === 0
                      ? `No database submissions exist inside the ${activeTab.toLowerCase()} ledger.`
                      : "No results match your active search filter query."}
                  </p>
                </div>
              );
            }

            return (
              <div className="bg-white border border-neutral-200 rounded-3xl overflow-hidden shadow-md relative">
                {/* Thin top highlight line */}
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-neutral-300 to-transparent" />
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-neutral-50 border-b border-neutral-200 text-neutral-550 text-[10px] font-bold uppercase tracking-wider">
                        {activeTab === "Contacts" && (
                          <>
                            <th className="py-4.5 px-6">Name</th>
                            <th className="py-4.5 px-6">Email</th>
                            <th className="py-4.5 px-6">Phone</th>
                            <th className="py-4.5 px-6">Industry</th>
                            <th className="py-4.5 px-6">Date</th>
                            <th className="py-4.5 px-6 text-right">Actions</th>
                          </>
                        )}
                        {activeTab === "Inquiries" && (
                          <>
                            <th className="py-4.5 px-6">Name</th>
                            <th className="py-4.5 px-6">Email</th>
                            <th className="py-4.5 px-6">Phone</th>
                            <th className="py-4.5 px-6">Services</th>
                            <th className="py-4.5 px-6">Date</th>
                            <th className="py-4.5 px-6 text-right">Actions</th>
                          </>
                        )}
                        {activeTab === "Candidates" && (
                          <>
                            <th className="py-4.5 px-6">Name</th>
                            <th className="py-4.5 px-6">Position</th>
                            <th className="py-4.5 px-6">Experience</th>
                            <th className="py-4.5 px-6">Location</th>
                            <th className="py-4.5 px-6">Status</th>
                            <th className="py-4.5 px-6">Date</th>
                            <th className="py-4.5 px-6 text-right">Actions</th>
                          </>
                        )}
                        {activeTab === "Marketing" && (
                          <>
                            <th className="py-4.5 px-6">Name</th>
                            <th className="py-4.5 px-6">Email</th>
                            <th className="py-4.5 px-6">Phone</th>
                            <th className="py-4.5 px-6">College / Program</th>
                            <th className="py-4.5 px-6">Mode</th>
                            <th className="py-4.5 px-6">Date</th>
                            <th className="py-4.5 px-6 text-right">Actions</th>
                          </>
                        )}
                        {activeTab === "Certificates" && (
                          <>
                            <th className="py-4.5 px-6">Candidate</th>
                            <th className="py-4.5 px-6">Credential Number</th>
                            <th className="py-4.5 px-6">Course / Program</th>
                            <th className="py-4.5 px-6">Grade</th>
                            <th className="py-4.5 px-6">Status</th>
                            <th className="py-4.5 px-6">Issue Date</th>
                            <th className="py-4.5 px-6 text-right">Actions</th>
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {activeTab === "Contacts" && filteredContacts.map((contact) => (
                        <tr key={contact.id} className="hover:bg-neutral-50 transition-colors cursor-pointer group" onClick={() => setSelectedContact(contact)}>
                          <td className="py-4 px-6 font-semibold text-neutral-900 group-hover:underline transition-all">{contact.name}</td>
                          <td className="py-4 px-6 text-neutral-600 text-sm">{contact.email}</td>
                          <td className="py-4 px-6 text-neutral-600 text-sm">{contact.phone}</td>
                          <td className="py-4 px-6">
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-neutral-100 text-neutral-800 border border-neutral-200 tracking-wide">
                              {contact.businessType || "N/A"}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-neutral-550 text-xs">{formatDate(contact.createdAt)}</td>
                          <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                            <button onClick={() => setSelectedContact(contact)} className="text-xs text-black hover:text-blue-600 hover:underline mr-4 cursor-pointer font-bold transition-all">
                              View Message
                            </button>
                          </td>
                        </tr>
                      ))}

                      {activeTab === "Inquiries" && filteredInquiries.map((inquiry) => (
                        <tr key={inquiry.id} className="hover:bg-neutral-50 transition-colors cursor-pointer group" onClick={() => setSelectedInquiry(inquiry)}>
                          <td className="py-4 px-6 font-semibold text-neutral-900 group-hover:underline transition-all">{inquiry.fullName}</td>
                          <td className="py-4 px-6 text-neutral-600 text-sm">{inquiry.email}</td>
                          <td className="py-4 px-6 text-neutral-600 text-sm">{inquiry.mobile}</td>
                          <td className="py-4 px-6 max-w-[200px] truncate text-neutral-600 text-sm">{inquiry.services.join(", ")}</td>
                          <td className="py-4 px-6 text-neutral-550 text-xs">{formatDate(inquiry.createdAt)}</td>
                          <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                            <button onClick={() => setSelectedInquiry(inquiry)} className="text-xs text-black hover:text-blue-600 hover:underline mr-4 cursor-pointer font-bold transition-all">
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}

                      {activeTab === "Candidates" && filteredCandidates.map((cand) => (
                        <tr key={cand.id} className="hover:bg-neutral-50 transition-colors cursor-pointer group" onClick={() => setSelectedCandidate(cand)}>
                          <td className="py-4 px-6 font-semibold text-neutral-900 group-hover:underline transition-all">{cand.fullName}</td>
                          <td className="py-4 px-6 text-neutral-800 text-sm font-semibold">{cand.position}</td>
                          <td className="py-4 px-6 text-neutral-650 text-sm">{cand.experience}</td>
                          <td className="py-4 px-6 text-neutral-650 text-sm">{cand.currentCity}</td>
                          <td className="py-4 px-6">
                            <span className={`px-2.5 py-1.5 rounded-xl text-[10px] font-bold border tracking-wide ${getStatusBadgeStyle(cand.status)}`}>
                              {cand.status}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-neutral-550 text-xs">{formatDate(cand.createdAt)}</td>
                          <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                            <button onClick={() => setSelectedCandidate(cand)} className="text-xs text-black hover:text-blue-600 hover:underline mr-4 cursor-pointer font-bold transition-all">
                              View Profile
                            </button>
                          </td>
                        </tr>
                      ))}

                      {activeTab === "Marketing" && filteredMarketingInquiries.map((m) => (
                        <tr key={m.id} className="hover:bg-neutral-50 transition-colors cursor-pointer group" onClick={() => setSelectedMarketingInquiry(m)}>
                          <td className="py-4 px-6 font-semibold text-neutral-900 group-hover:underline transition-all">{m.fullName}</td>
                          <td className="py-4 px-6 text-neutral-650 text-sm">{m.email}</td>
                          <td className="py-4 px-6 text-neutral-655 text-sm">{m.mobile}</td>
                          <td className="py-4 px-6 text-neutral-800 text-sm font-semibold truncate max-w-[200px]">{m.college}</td>
                          <td className="py-4 px-6">
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-neutral-100 text-neutral-800 border border-neutral-200 tracking-wide">
                              {m.mode}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-neutral-550 text-xs">{formatDate(m.createdAt)}</td>
                          <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                            <button onClick={() => setSelectedMarketingInquiry(m)} className="text-xs text-black hover:text-blue-600 hover:underline mr-4 cursor-pointer font-bold transition-all">
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}

                      {activeTab === "Certificates" && filteredCertificates.map((cert) => (
                         <tr key={cert.id} className="hover:bg-neutral-50 transition-colors group">
                           <td className="py-4 px-6 font-semibold text-neutral-900 group-hover:underline transition-all">{cert.candidateName}</td>
                           <td className="py-4 px-6 text-neutral-700 font-mono text-sm font-bold tracking-wide">{cert.certificateNumber}</td>
                           <td className="py-4 px-6 text-neutral-800 text-sm">{cert.courseName}</td>
                           <td className="py-4 px-6 text-neutral-650 text-sm">{cert.grade || "N/A"}</td>
                           <td className="py-4 px-6" onClick={(e) => e.stopPropagation()}>
                             <select
                               value={cert.status}
                               onChange={(e) => handleCertStatusUpdate(cert.id, e.target.value as any)}
                               className="bg-white border border-neutral-300 rounded-xl py-1 px-2.5 text-neutral-800 text-xs font-semibold focus:outline-none focus:border-black cursor-pointer transition-all"
                             >
                               <option value="Verified" className="bg-white text-black">Verified</option>
                               <option value="Revoked" className="bg-white text-black">Revoked</option>
                               <option value="Expired" className="bg-white text-black">Expired</option>
                             </select>
                           </td>
                           <td className="py-4 px-6 text-neutral-550 text-xs">
                             {new Date(cert.issueDate).toLocaleDateString("en-US", {
                               day: "numeric",
                               month: "short",
                               year: "numeric"
                             })}
                           </td>
                           <td className="py-4 px-6 text-right space-x-3" onClick={(e) => e.stopPropagation()}>
                             {cert.certificateUrl && (
                               <a
                                 href={getResumeUrl(cert.certificateUrl)}
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 className="text-xs text-black hover:text-blue-600 hover:underline font-bold inline-flex items-center gap-1 transition-all"
                               >
                                 <FileText className="w-3.5 h-3.5" />
                                 PDF
                               </a>
                             )}
                             <button
                               onClick={() => handleDeleteCertificate(cert.id)}
                               className="text-xs text-neutral-600 hover:text-red-500 font-bold inline-flex items-center gap-1 transition-all"
                             >
                               <Trash2 className="w-3.5 h-3.5" />
                               Delete
                             </button>
                           </td>
                         </tr>
                       ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="bg-neutral-50 px-6 py-4.5 border-t border-neutral-200 flex justify-between items-center text-[10px] text-neutral-500 font-bold uppercase tracking-wider">
                  <span>Showing {filteredListLength} of {currentListLength} entries</span>
                  <span className="flex items-center gap-1.5 text-neutral-650">
                    <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                    Secure Session Active
                  </span>
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedContact(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white border border-neutral-200 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setSelectedContact(null)} className="absolute right-6 top-6 text-neutral-400 hover:text-black transition-colors cursor-pointer">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="p-8">
                <div className="mb-6">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">Lead Details</span>
                  <h3 className="text-2xl font-black mt-1 text-neutral-900">{selectedContact.name}</h3>
                  <p className="text-neutral-550 text-xs mt-1">Received on {formatDate(selectedContact.createdAt)}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Email Address</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-neutral-800 font-semibold">{selectedContact.email}</span>
                      <button onClick={() => copyToClipboard(selectedContact.email, "email")} className="text-neutral-500 hover:text-black transition-colors cursor-pointer">
                        {copiedId === "email" ? <span className="text-[10px] text-black font-bold">Copied!</span> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Phone Number</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-neutral-800 font-semibold">{selectedContact.phone}</span>
                      <button onClick={() => copyToClipboard(selectedContact.phone, "phone")} className="text-neutral-500 hover:text-black transition-colors cursor-pointer">
                        {copiedId === "phone" ? <span className="text-[10px] text-black font-bold">Copied!</span> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Location / Address</span>
                    <span className="text-sm text-neutral-800 font-semibold">{selectedContact.address || "Not provided"}</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Industry Sector</span>
                    <span className="text-sm text-neutral-800 font-semibold">{selectedContact.businessType || "Not provided"}</span>
                  </div>
                </div>

                {selectedContact.message && (
                  <div className="space-y-2 border-t border-neutral-200 pt-6">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Client Message</span>
                      <button onClick={() => copyToClipboard(selectedContact.message, "msg")} className="text-xs text-neutral-500 hover:text-black hover:underline cursor-pointer font-bold">
                        {copiedId === "msg" ? "Copied Message!" : "Copy Full Message"}
                      </button>
                    </div>
                    <div className="bg-neutral-50 rounded-2xl p-5 border border-neutral-200 text-neutral-700 text-sm whitespace-pre-wrap max-h-[200px] overflow-y-auto leading-relaxed">
                      {selectedContact.message}
                    </div>
                  </div>
                )}

                <div className="mt-8 flex justify-end">
                  <button onClick={() => setSelectedContact(null)} className="px-6 py-2.5 bg-white hover:bg-blue-50 border border-neutral-300 hover:border-blue-300 text-neutral-800 hover:text-blue-750 font-bold rounded-xl text-sm transition-all cursor-pointer shadow-sm">
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedInquiry(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white border border-neutral-200 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setSelectedInquiry(null)} className="absolute right-6 top-6 text-neutral-400 hover:text-black transition-colors cursor-pointer">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="p-8">
                <div className="mb-6">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">Inquiry Details</span>
                  <h3 className="text-2xl font-black mt-1 text-neutral-900">{selectedInquiry.fullName}</h3>
                  <p className="text-neutral-550 text-xs mt-1">Received on {formatDate(selectedInquiry.createdAt)}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Email Address</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-neutral-800 font-semibold">{selectedInquiry.email}</span>
                      <button onClick={() => copyToClipboard(selectedInquiry.email, "email")} className="text-neutral-400 hover:text-black transition-colors cursor-pointer">
                        {copiedId === "email" ? <span className="text-[10px] text-black font-bold">Copied!</span> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Phone Number</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-neutral-800 font-semibold">{selectedInquiry.mobile}</span>
                      <button onClick={() => copyToClipboard(selectedInquiry.mobile, "phone")} className="text-neutral-400 hover:text-black transition-colors cursor-pointer">
                        {copiedId === "phone" ? <span className="text-[10px] text-black font-bold">Copied!</span> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1 col-span-2">
                    <span className="text-[10px] font-bold text-neutral-500 tracking-wider block">Organization / College</span>
                    <span className="text-sm text-neutral-800 font-semibold">{selectedInquiry.organization || "Not provided"}</span>
                  </div>
                </div>

                <div className="space-y-3 border-t border-neutral-200 pt-6">
                  <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Services Selected</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedInquiry.services.map((srv) => (
                      <span key={srv} className="px-3 py-1.5 rounded-full text-xs font-semibold bg-neutral-50 text-neutral-800 border border-neutral-200">
                        {srv}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button onClick={() => setSelectedInquiry(null)} className="px-6 py-2.5 bg-white hover:bg-blue-50 border border-neutral-300 hover:border-blue-300 text-neutral-800 hover:text-blue-750 font-bold rounded-xl text-sm transition-all cursor-pointer shadow-sm">
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedCandidate(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white border border-neutral-200 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setSelectedCandidate(null)} className="absolute right-6 top-6 text-neutral-400 hover:text-black transition-colors cursor-pointer">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="p-8 max-h-[90vh] overflow-y-auto">
                <div className="mb-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">Candidate Profile</span>
                    <h3 className="text-2xl font-black mt-1 text-neutral-900">{selectedCandidate.fullName}</h3>
                    <p className="text-neutral-550 text-xs mt-1">Applied on {formatDate(selectedCandidate.createdAt)}</p>
                  </div>
                  
                  {/* Status Dropdown inside Modal */}
                  <div className="space-y-1.5 shrink-0">
                    <span className="text-[10px] font-bold text-neutral-550 uppercase tracking-wider block">Application Status</span>
                    <select
                      value={selectedCandidate.status}
                      onChange={(e) => handleStatusUpdate(selectedCandidate.id, e.target.value)}
                      className="bg-white border border-neutral-300 rounded-xl py-1.5 px-3 text-neutral-800 text-xs font-bold focus:outline-none focus:border-black cursor-pointer transition-all"
                    >
                      <option value="New" className="bg-white text-black">New</option>
                      <option value="Shortlisted" className="bg-white text-black">Shortlisted</option>
                      <option value="Interview Scheduled" className="bg-white text-black">Interview Scheduled</option>
                      <option value="Selected" className="bg-white text-black">Selected</option>
                      <option value="Rejected" className="bg-white text-black">Rejected</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Email Address</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-neutral-800 font-semibold">{selectedCandidate.email}</span>
                      <button onClick={() => copyToClipboard(selectedCandidate.email, "email")} className="text-neutral-450 hover:text-black transition-colors cursor-pointer">
                        {copiedId === "email" ? <span className="text-[10px] text-black font-bold">Copied!</span> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Phone Number</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-neutral-800 font-semibold">{selectedCandidate.mobile}</span>
                      <button onClick={() => copyToClipboard(selectedCandidate.mobile, "phone")} className="text-neutral-450 hover:text-black transition-colors cursor-pointer">
                        {copiedId === "phone" ? <span className="text-[10px] text-black font-bold">Copied!</span> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Applying For</span>
                    <span className="text-sm text-neutral-900 font-black">{selectedCandidate.position}</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Experience Level</span>
                    <span className="text-sm text-neutral-750 font-semibold">{selectedCandidate.experience}</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Highest Qualification</span>
                    <span className="text-sm text-neutral-750 font-semibold">{selectedCandidate.qualification}</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Current City</span>
                    <span className="text-sm text-neutral-750 font-semibold">{selectedCandidate.currentCity}</span>
                  </div>

                  {selectedCandidate.portfolioUrl && (
                    <div className="space-y-1 col-span-2">
                      <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Portfolio / LinkedIn URL</span>
                      <a href={selectedCandidate.portfolioUrl} target="_blank" rel="noreferrer" className="text-sm text-neutral-700 hover:text-black hover:underline inline-flex items-center gap-1 font-semibold">
                        {selectedCandidate.portfolioUrl}
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </div>

                <div className="space-y-2 border-t border-neutral-200 pt-5">
                  <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Key Skills</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCandidate.skills.split(",").map(skill => (
                      <span key={skill} className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-neutral-50 border border-neutral-200 text-neutral-800">
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedCandidate.introduction && (
                  <div className="space-y-2 border-t border-neutral-200 pt-5 mt-5">
                    <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Short Introduction</span>
                    <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-200 text-neutral-700 text-sm whitespace-pre-wrap leading-relaxed italic">
                      "{selectedCandidate.introduction}"
                    </div>
                  </div>
                )}

                <div className="mt-8 pt-5 border-t border-neutral-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <a
                    href={getResumeUrl(selectedCandidate.resumeUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl text-center flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-all"
                  >
                    <FileText className="w-4 h-4" />
                    Download Resume
                  </a>
                  
                  <button onClick={() => setSelectedCandidate(null)} className="w-full sm:w-auto px-6 py-2.5 bg-neutral-100 hover:bg-blue-50 hover:text-blue-650 border border-neutral-350 text-neutral-805 rounded-xl text-sm font-semibold transition-all cursor-pointer">
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedMarketingInquiry(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white border border-neutral-200 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setSelectedMarketingInquiry(null)} className="absolute right-6 top-6 text-neutral-400 hover:text-black transition-colors cursor-pointer">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="p-8">
                <div className="mb-6">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">Marketing Internship Application</span>
                  <h3 className="text-2xl font-black mt-1 text-neutral-900">{selectedMarketingInquiry.fullName}</h3>
                  <p className="text-neutral-550 text-xs mt-1">Received on {formatDate(selectedMarketingInquiry.createdAt)}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Email Address</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-neutral-250 font-semibold">{selectedMarketingInquiry.email}</span>
                      <button onClick={() => copyToClipboard(selectedMarketingInquiry.email, "email")} className="text-neutral-400 hover:text-black transition-colors cursor-pointer">
                        {copiedId === "email" ? <span className="text-[10px] text-black font-bold">Copied!</span> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Phone Number</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-neutral-250 font-semibold">{selectedMarketingInquiry.mobile}</span>
                      <button onClick={() => copyToClipboard(selectedMarketingInquiry.mobile, "phone")} className="text-neutral-450 hover:text-black transition-colors cursor-pointer">
                        {copiedId === "phone" ? <span className="text-[10px] text-black font-bold">Copied!</span> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">College / Qualification</span>
                    <span className="text-sm text-neutral-800 font-bold">{selectedMarketingInquiry.college}</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Internship Mode</span>
                    <span className="text-sm text-neutral-900 font-bold">{selectedMarketingInquiry.mode}</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Internship Duration</span>
                    <span className="text-sm text-neutral-750 font-semibold">{selectedMarketingInquiry.duration}</span>
                  </div>
                </div>

                <div className="space-y-3 border-t border-neutral-200 pt-6">
                  <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Areas of Interest (Focus Areas)</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedMarketingInquiry.focusAreas.map((area) => (
                      <span key={area} className="px-3 py-1.5 rounded-full text-xs font-semibold bg-neutral-50 text-neutral-805 border border-neutral-200">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button onClick={() => setSelectedMarketingInquiry(null)} className="px-6 py-2.5 bg-white hover:bg-blue-50 border border-neutral-300 hover:border-blue-300 text-neutral-800 hover:text-blue-750 font-bold rounded-xl text-sm transition-all cursor-pointer shadow-sm">
                    Close View
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Issue Certificate Modal */}
        {isCreateCertModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setIsCreateCertModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white border border-neutral-200 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsCreateCertModalOpen(false)}
                className="absolute right-6 top-6 text-neutral-500 hover:text-black transition-colors cursor-pointer"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <form onSubmit={handleCreateCertificate} className="p-8">
                <div className="mb-6">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">Certificate Registry</span>
                  <h3 className="text-2xl font-black mt-1 text-neutral-900">Issue New Certificate</h3>
                  <p className="text-neutral-500 text-xs mt-1">Publish student completion credentials to the public registry</p>
                </div>

                {certFormError && (
                  <div className="mb-4 text-xs font-semibold text-rose-800 bg-rose-50 border border-rose-205 px-4 py-2.5 rounded-xl">
                    {certFormError}
                  </div>
                )}

                <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Candidate Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={newCertCandidate}
                      onChange={(e) => setNewCertCandidate(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-2xl text-neutral-900 text-sm font-semibold focus:outline-none focus:border-black transition-all placeholder:text-neutral-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Certificate Number *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. CS-2026-0001"
                      value={newCertNumber}
                      onChange={(e) => setNewCertNumber(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-2xl text-neutral-900 text-sm font-semibold focus:outline-none focus:border-black transition-all placeholder:text-neutral-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Course Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Full Stack Web Development"
                      value={newCertCourse}
                      onChange={(e) => setNewCertCourse(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-2xl text-neutral-900 text-sm font-semibold focus:outline-none focus:border-black transition-all placeholder:text-neutral-400"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Issue Date *</label>
                      <input
                        type="date"
                        required
                        value={newCertIssueDate}
                        onChange={(e) => setNewCertIssueDate(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-2xl text-neutral-700 text-sm font-semibold focus:outline-none focus:border-black transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Completion Date</label>
                      <input
                        type="date"
                        value={newCertCompletionDate}
                        onChange={(e) => setNewCertCompletionDate(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-2xl text-neutral-700 text-sm font-semibold focus:outline-none focus:border-black transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Grade / Rating</label>
                      <input
                        type="text"
                        placeholder="e.g. A+"
                        value={newCertGrade}
                        onChange={(e) => setNewCertGrade(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-2xl text-neutral-900 text-sm font-semibold focus:outline-none focus:border-black transition-all placeholder:text-neutral-400"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Status</label>
                      <select
                        value={newCertStatus}
                        onChange={(e) => setNewCertStatus(e.target.value as any)}
                        className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-2xl text-neutral-750 text-sm font-semibold focus:outline-none focus:border-black appearance-none cursor-pointer"
                      >
                        <option value="Verified" className="bg-white text-black">Verified</option>
                        <option value="Revoked" className="bg-white text-black">Revoked</option>
                        <option value="Expired" className="bg-white text-black">Expired</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Certificate PDF Source</label>
                    <div className="flex gap-6 mb-2">
                      <label className="flex items-center gap-1.5 text-xs text-neutral-800 cursor-pointer font-semibold">
                        <input
                          type="radio"
                          name="uploadMethod"
                          checked={certUploadMethod === "upload"}
                          onChange={() => setCertUploadMethod("upload")}
                          className="text-black focus:ring-black bg-white border-neutral-300"
                        />
                        Upload PDF File
                      </label>
                      <label className="flex items-center gap-1.5 text-xs text-neutral-800 cursor-pointer font-semibold">
                        <input
                          type="radio"
                          name="uploadMethod"
                          checked={certUploadMethod === "url"}
                          onChange={() => setCertUploadMethod("url")}
                          className="text-black focus:ring-black bg-white border-neutral-300"
                        />
                        Provide URL
                      </label>
                    </div>

                    {certUploadMethod === "upload" ? (
                      <div className="space-y-2">
                        <div className="flex items-center justify-center w-full">
                          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-neutral-300 hover:border-neutral-500 rounded-2xl cursor-pointer bg-neutral-50 hover:bg-neutral-100 transition-all">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              {isUploadingCert ? (
                                <>
                                  <div className="w-7 h-7 border-3 border-black border-t-transparent rounded-full animate-spin mb-3" />
                                  <p className="text-xs text-neutral-500 font-bold">Uploading file...</p>
                                </>
                              ) : uploadedFileName ? (
                                <>
                                  <svg className="w-8 h-8 text-neutral-900 mb-2" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  <p className="text-xs text-neutral-800 font-bold max-w-[250px] truncate">{uploadedFileName}</p>
                                  <p className="text-[10px] text-neutral-500 mt-1">Click or drag to replace</p>
                                </>
                              ) : (
                                <>
                                  <svg className="w-8 h-8 text-neutral-400 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                  </svg>
                                  <p className="text-xs text-neutral-500 font-semibold">Click to upload PDF</p>
                                  <p className="text-[10px] text-neutral-400 mt-1">PDF format only, up to 5MB</p>
                                </>
                              )}
                            </div>
                            <input
                              type="file"
                              accept=".pdf"
                              onChange={handleCertFileChange}
                              disabled={isUploadingCert}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                    ) : (
                      <input
                        type="url"
                        placeholder="e.g. https://domain.com/cert.pdf"
                        value={newCertUrl}
                        onChange={(e) => setNewCertUrl(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-2xl text-neutral-900 text-sm font-semibold focus:outline-none focus:border-black transition-all placeholder:text-neutral-450"
                      />
                    )}
                  </div>
                </div>

                <div className="mt-8 flex justify-end gap-3 border-t border-neutral-200 pt-5">
                  <button
                    type="button"
                    onClick={() => setIsCreateCertModalOpen(false)}
                    className="px-6 py-2.5 bg-neutral-100 hover:bg-blue-50 hover:text-blue-655 border border-neutral-300 rounded-xl text-sm font-semibold transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={certFormLoading || isUploadingCert}
                    className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl cursor-pointer transition-all flex items-center gap-2"
                  >
                    {certFormLoading && <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                    Publish Credentials
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
