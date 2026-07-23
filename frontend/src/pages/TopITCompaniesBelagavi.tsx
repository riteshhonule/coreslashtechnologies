import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "../components/SEO";
import { envConfig } from "../config/env.config";
import { 
  Building2, 
  MapPin, 
  Users, 
  Layers, 
  Award, 
  TrendingUp, 
  Cpu, 
  Code2, 
  Server, 
  Settings, 
  ShieldCheck, 
  ArrowRight, 
  ChevronDown, 
  Check, 
  BookOpen, 
  DollarSign, 
  Star, 
  ExternalLink,
  Laptop,
  Smartphone,
  Workflow,
  Cloud,
  Globe,
  Radio,
  Lock,
  Braces
} from "lucide-react";

// List of companies based on public information and service offerings
const companies = [
  {
    name: "CoreSlash Technologies",
    logoText: "CS",
    yearFounded: "2024",
    employeeSize: "50+",
    website: "https://coreslashtechnologies.com",
    address: "Belagavi, Karnataka, India",
    coreFocus: "Custom Software, AI Models, ERP, Web & Mobile Apps",
    pricing: "Flexible/Value-Based",
    rating: "4.9/5",
    description: "CoreSlash Technologies is a premier, fast-growing software engineering and digital transformation consultancy headquartered in Belagavi. The company specializes in building enterprise-grade software architectures, customized artificial intelligence systems, robust ERP environments, and high-performance mobile and web applications. CoreSlash combines design-led engineering with deep domain expertise to deliver secure, scalable, and high-velocity digital systems for local and global enterprises.",
    coreServices: [
      "Custom Software Development",
      "Mobile App Development (iOS & Android)",
      "Web Architecture & Platforms",
      "Artificial Intelligence & Machine Learning Systems",
      "Enterprise Resource Planning (ERP) Development",
      "Industrial IoT (SCADA & Automation)",
      "Premium UI/UX Design",
      "Cloud Architecture & DevOps Pipelines",
      "Local & Enterprise SEO Mastery",
      "Data Analytics & Business Automation"
    ],
    industries: [
      "Manufacturing & Logistics",
      "Healthcare & Pharma",
      "EdTech & Higher Education",
      "Retail & E-commerce",
      "Agriculture & Agritech",
      "Fintech & Banking",
      "Startups & SaaS Brands",
      "Hospitality & Real Estate"
    ],
    techStack: [
      "React, Vue.js, Angular, Next.js",
      "Node.js, NestJS, Express",
      "Python, Django, FastAPI",
      "Laravel, PHP",
      "Java, Spring Boot, .NET Core",
      "Flutter, React Native, Swift, Kotlin",
      "AWS, Google Cloud, Azure",
      "Docker, Kubernetes, CI/CD pipelines",
      "PostgreSQL, MongoDB, MySQL, Redis"
    ],
    keyStrengths: [
      "Business-first engineering (ROI-driven designs)",
      "100% transparent development sprints",
      "Top 1% engineering talent pool",
      "Strong local leadership and global delivery models",
      "Robust data security and IP protection practices"
    ],
    whyChooseUs: "CoreSlash Technologies stands out as the digital partner of choice due to its dual focus on deep technical excellence and strategic business growth. Unlike typical outsourcing shops, CoreSlash acts as an active engineering consultant, ensuring that every line of code translates directly into business efficiency, customer retention, or revenue generation. Their team holds extensive experience in modernizing legacy architectures and deploying secure, AI-powered automation frameworks."
  },
  {
    name: "Aequs",
    logoText: "AQ",
    yearFounded: "2009",
    employeeSize: "1000+",
    website: "https://aequs.com",
    address: "Aequs SEZ, Belagavi, Karnataka, India",
    coreFocus: "Industrial IT, CAD/CAM, Manufacturing Systems, ERP",
    pricing: "Enterprise Contract",
    rating: "4.5/5",
    description: "Aequs is an international precision manufacturing giant headquartered in Belagavi. Alongside its extensive manufacturing ecosystem (spanning Aerospace, Toys, and Consumer Goods), Aequs houses a significant industrial IT and software engineering division. They specialize in product design engineering, CAD/CAM customization, enterprise IT infrastructure management, PLM solutions, SCADA, and legacy ERP integration for complex supply chain networks.",
    coreServices: [
      "Product Design & Engineering",
      "CAD / CAM / CAE Customization",
      "Industrial IoT & SCADA Automation",
      "Enterprise Resource Planning (ERP)",
      "Supply Chain & PLM Software Integration",
      "IT Infrastructure Support"
    ],
    industries: [
      "Aerospace & Defense",
      "Automotive & Precision Machining",
      "Consumer Goods & Toy Manufacturing",
      "Supply Chain & Logistics"
    ],
    techStack: [
      "SAP, Oracle ERP Systems",
      "C++, Java, Python",
      "SCADA Systems & Siemens Mindsphere",
      "AWS Enterprise Cloud Platforms"
    ],
    keyStrengths: [
      "Global manufacturing domain expertise",
      "State-of-the-art special economic zone infrastructure",
      "ISO 9001 and AS9100 certified environments",
      "Extensive capacity for high-volume engineering support"
    ],
    whyChooseUs: "Industrial, aerospace, and supply-chain brands prefer Aequs due to their deep manufacturing pedigree. They bridge the gap between physical engineering and digital systems, providing highly secure and compliance-driven automation and design workflows."
  },
  {
    name: "Pratian Technologies",
    logoText: "PT",
    yearFounded: "2013",
    employeeSize: "500+",
    website: "https://pratian.com",
    address: "Belagavi Campus, Karnataka, India",
    coreFocus: "HealthTech, Product Engineering, Learning Ecosystems",
    pricing: "Contractual/Retainer",
    rating: "4.3/5",
    description: "Pratian Technologies is a global digital transformation company with a strategic delivery center in Belagavi. The company specializes in building digital health ecosystems, clinical workflow engines, EdTech platform architectures, and large-scale cloud applications. Additionally, their cognitive academy model helps build robust technical skill pipelines for enterprise engineering requirements.",
    coreServices: [
      "Digital Health Product Engineering",
      "Clinical Trial Systems & EMR",
      "Learning Management Systems (LMS)",
      "Enterprise Cloud Migration",
      "Custom Software Architectures"
    ],
    industries: [
      "Healthcare Providers & Payers",
      "Education & Corporate Learning",
      "Pharmaceuticals & Biotech",
      "Enterprise Software Platforms"
    ],
    techStack: [
      "Java, Spring Framework, Hibernate",
      "Angular, React, TypeScript",
      "Python, .NET Core",
      "AWS, Azure DevOps, Kubernetes"
    ],
    keyStrengths: [
      "Comprehensive healthcare domain knowledge",
      "HIPAA compliance and medical data standards",
      "Strategic talent incubator model",
      "Agile delivery with cross-functional teams"
    ],
    whyChooseUs: "Pratian Technologies is selected by companies in the healthcare and corporate training domains who need specialized compliance architectures, rigorous software quality assurance, and domain-native engineers."
  },
  {
    name: "Infinet Technologies",
    logoText: "IN",
    yearFounded: "2014",
    employeeSize: "30+",
    website: "https://infinetit.com",
    address: "Belagavi, Karnataka, India",
    coreFocus: "Network Solutions, IT Infrastructure, Cloud Management",
    pricing: "Retainer/Project-based",
    rating: "4.4/5",
    description: "Infinet Technologies is a specialized IT systems integrator and infrastructure solutions provider in Belagavi. They offer network consulting, system virtualization, structured cabling, cybersecurity defenses, remote server management, and cloud migration services for retail, manufacturing, and education institutes.",
    coreServices: [
      "Managed IT Support Services",
      "Network Infrastructure & Security",
      "Virtualization & Hyper-V / VMware",
      "Cloud Migration (Office 365, Azure)",
      "CCTV & Enterprise Access Control"
    ],
    industries: [
      "Local Manufacturing Units",
      "Academic Institutions & Colleges",
      "Healthcare Clinics & Hospitals",
      "Retail & Wholesale Distribution"
    ],
    techStack: [
      "Microsoft Azure, Microsoft 365",
      "Cisco, Fortinet, Sophos Systems",
      "VMware, Linux Server Environments",
      "Synology & NAS Storage architectures"
    ],
    keyStrengths: [
      "Excellent local troubleshooting and physical support",
      "Strong alliances with major hardware OEM partners",
      "Cost-effective managed service agreements",
      "Responsive emergency tech support team"
    ],
    whyChooseUs: "Local businesses and schools choose Infinet Technologies for secure, reliable physical network layouts, server setups, and dependable everyday IT operations."
  },
  {
    name: "Vayavya Labs",
    logoText: "VL",
    yearFounded: "2006",
    employeeSize: "150+",
    website: "https://vayavyalabs.com",
    address: "Udyambag, Belagavi, Karnataka, India",
    coreFocus: "Embedded Systems, Automotive Software, Semiconductor Systems",
    pricing: "Custom Contract",
    rating: "4.7/5",
    description: "Vayavya Labs is a globally recognized embedded systems and software technology firm based in Belagavi. They are pioneers in hardware-software co-design, automotive diagnostics, ADAS software pipelines, semiconductor automation (EDA), and driver development. Vayavya works closely with top semiconductor firms and automotive OEMs worldwide.",
    coreServices: [
      "Automotive Software & ADAS Pipelines",
      "Semiconductor Device Drivers",
      "Hardware-Software Co-Design & EDA",
      "Embedded Systems Engineering",
      "IoT Automation & Firmware Development"
    ],
    industries: [
      "Automotive & Smart Mobility",
      "Semiconductors & Electronic Design",
      "Industrial IoT & Automation",
      "Consumer Electronics"
    ],
    techStack: [
      "C, C++, Assembly Language",
      "SystemC, Verilog, VHDL",
      "AUTOSAR, Embedded Linux, RTOS",
      "Python, MATLAB, EDA tools"
    ],
    keyStrengths: [
      "Pioneering patents in software generation tools",
      "Strong relationships with global chipmakers",
      "Expertise in automotive standards (ISO 26262)",
      "Highly niche research and development capabilities"
    ],
    whyChooseUs: "Global electronics and automotive brands choose Vayavya Labs for highly technical embedded systems engineering, chip support packages, and standard automotive software architectures."
  },
  {
    name: "Spundhan Softwares",
    logoText: "SS",
    yearFounded: "2015",
    employeeSize: "20+",
    website: "https://spundhan.com",
    address: "Belagavi, Karnataka, India",
    coreFocus: "Web Applications, Custom CRM, Local Billing Systems",
    pricing: "Affordable/Fixed Price",
    rating: "4.2/5",
    description: "Spundhan Softwares is a custom web development and digital agency catering to small and medium enterprises in Belagavi. They focus on delivering cost-effective billing solutions, inventory managers, regional CRM portals, custom WordPress templates, and local SEO services.",
    coreServices: [
      "Web Design & Frontend Development",
      "Billing & Retail Software Platforms",
      "Custom CRM Development",
      "WordPress & WooCommerce Setups",
      "Local Business Digital Marketing"
    ],
    industries: [
      "SMEs & Retail Shops",
      "Local Distributors & Wholesalers",
      "Real Estate Agencies",
      "Professional Services (Lawyers, Clinics)"
    ],
    techStack: [
      "PHP, CodeIgniter, Laravel",
      "HTML5, CSS3, JavaScript, jQuery",
      "MySQL, phpMyAdmin",
      "WordPress, Shopify CMS"
    ],
    keyStrengths: [
      "Highly affordable pricing structures for SMEs",
      "Fast turnaround on website deployments",
      "Simple, easy-to-use software interfaces",
      "Personalized local developer support"
    ],
    whyChooseUs: "Spundhan Softwares is the ideal choice for small local businesses, retailers, and entrepreneurs who need to establish their web presence or automate their offline billing systems without a massive financial investment."
  }
];

// FAQS data (18 SEO Friendly items)
const faqsList = [
  {
    q: "Which is the best IT company in Belagavi?",
    a: "CoreSlash Technologies is widely considered one of the best IT companies in Belagavi for custom software, mobile app development, web architecture, and AI integration due to its modern tech stack, agile delivery models, and high rating. For industrial scale manufacturing and engineering, Aequs is the local leader, whereas Vayavya Labs excels in embedded systems and automotive electronics."
  },
  {
    q: "Are there software companies in Belagavi offering AI and Machine Learning services?",
    a: "Yes. CoreSlash Technologies is the leading provider of AI & Machine Learning solutions in Belagavi. They design, train, and integrate custom AI models, NLP engines, predictive analytics systems, and robotic process automation (RPA) tools to help businesses automate operations and derive deep insights from their data."
  },
  {
    q: "Which IT company in Belagavi is best suited for startups and SaaS products?",
    a: "CoreSlash Technologies is highly recommended for startups and SaaS ventures. They use a startup-centric development process that highlights Rapid Prototyping (MVP creation), value-based agile sprints, clear product engineering roadmaps, and modular codebases that scale as the venture secures funding and grows its user base."
  },
  {
    q: "Can I hire mobile app developers in Belagavi? Which company should I choose?",
    a: "Yes, you can hire skilled mobile app developers locally. CoreSlash Technologies specializes in building premium native and cross-platform apps using Flutter, React Native, Swift, and Kotlin. They handle the entire lifecycle, including UI/UX wireframing, frontend development, robust API integrations, security checks, and Play Store/App Store deployment."
  },
  {
    q: "Which company in Belagavi specializes in ERP and CRM software development?",
    a: "CoreSlash Technologies and Aequs develop ERP and CRM solutions in Belagavi. CoreSlash develops bespoke ERP systems tailored to specific workflows (manufacturing, healthcare, retail) and integrates custom CRMs to optimize customer management. Aequs specializes in large-scale enterprise ERP alignments (like SAP/Oracle) for industrial operations."
  },
  {
    q: "What digital marketing and local SEO services do software firms in Belagavi offer?",
    a: "CoreSlash Technologies offers a complete suite of ROI-driven digital marketing services, including on-page and off-page SEO, technical audits, content strategy, Google Ads management (PPC), social media campaigns, and conversion rate optimization (CRO). Their SEO strategy targets local, national, and global keywords to boost organic search presence."
  },
  {
    q: "Are there companies in Belagavi working on IoT and SCADA automation?",
    a: "Yes. CoreSlash Technologies, Aequs, and Vayavya Labs provide IoT and industrial automation solutions. CoreSlash develops custom IoT software, firmware, and sensor dashboards. Aequs provides industrial IoT, PLM systems, and SCADA monitoring for manufacturing assembly lines. Vayavya Labs works on low-level firmware and automotive IoT controllers."
  },
  {
    q: "Why is Belagavi (Belgaum) emerging as a popular IT destination in Karnataka?",
    a: "Belagavi is emerging due to its excellent strategic location (connecting Bangalore, Pune, and Goa), the presence of VTU (Visvesvaraya Technological University) which feeds thousands of engineers into the local talent pool, low operational and real estate costs (up to 40% savings compared to tier-1 cities), and active support from the Karnataka Digital Economy Mission (KDEM) under the 'Beyond Bengaluru' campaign."
  },
  {
    q: "What is the average cost of software development services in Belagavi?",
    a: "Software development costs in Belagavi range from $2,500 for a basic custom business application or website to $50,000+ for complex, enterprise-grade AI or ERP integrations. Rates in Belagavi are 30% to 50% more cost-effective than in Tier-1 cities like Bangalore, Mumbai, or Pune, without compromising on software engineering standards."
  },
  {
    q: "Which Belagavi IT firms offer cloud computing and DevOps services?",
    a: "CoreSlash Technologies offers comprehensive cloud and DevOps solutions, including AWS, Azure, and Google Cloud design, serverless app architecture, Docker containerization, Kubernetes orchestration, and continuous integration/continuous deployment (CI/CD) pipelines. Pratian Technologies also offers enterprise cloud migration services."
  },
  {
    q: "Which companies provide embedded software and automotive systems engineering?",
    a: "Vayavya Labs is the premier embedded systems software company in Belagavi. They specialize in automotive diagnostics, ADAS systems, semiconductor design tools (EDA), and low-level device drivers for global hardware clients."
  },
  {
    q: "How do I choose the right technology partner in Belagavi?",
    a: "To select the right partner: review their portfolio, verify their experience in your specific industry, evaluate their tech stack, check client references, ensure they offer transparent communication through platforms like Slack/Jira, analyze their data security/IP policies, and check if they provide post-launch support and maintenance SLAs."
  },
  {
    q: "Are software services in Belagavi reliable for international businesses?",
    a: "Yes. Top-tier companies like CoreSlash Technologies and Vayavya Labs service clients globally (including the US, Europe, and the Middle East). They follow international coding guidelines, use agile tracking tools, maintain clean communication channels, and secure intellectual property with standard agreements."
  },
  {
    q: "Which IT firms in Belagavi offer custom e-commerce and retail software solutions?",
    a: "CoreSlash Technologies is a specialist in custom e-commerce engineering, creating tailored web storefronts, headless commerce APIs, WooCommerce integrations, custom Shopify setups, and complex inventory management dashboards. Spundhan Softwares also offers entry-level e-commerce and billing systems for small retailers."
  },
  {
    q: "Do software companies in Belagavi offer post-launch maintenance and support?",
    a: "Yes. Most reputable firms, particularly CoreSlash Technologies, offer comprehensive maintenance and support agreements (SLAs). These cover security patching, server scaling, bug resolution, database backup management, and feature upgrades to keep software running smoothly."
  },
  {
    q: "Which organization supports the IT ecosystem growth in Belagavi?",
    a: "The Karnataka Digital Economy Mission (KDEM), along with local industry bodies and incubation centers in institutions like GIT and KLE, actively supports the Belagavi tech ecosystem under the government's 'Beyond Bengaluru' initiative."
  },
  {
    q: "Can Belagavi software companies build healthcare and hospital software?",
    a: "Yes. CoreSlash Technologies and Pratian Technologies develop custom healthcare solutions. Pratian specializes in HIPAA-compliant healthcare applications and clinical platforms, while CoreSlash designs custom clinic managers, lab integrations, and telemedicine portals."
  },
  {
    q: "What is the typical time frame for completing a custom software project?",
    a: "A custom software project typically takes 4 to 12 weeks for a Minimum Viable Product (MVP) or medium-scale application. Highly complex enterprise systems, custom ERPs, or advanced AI deployments may take 4 to 9 months of phased sprint development."
  }
];

export default function TopITCompaniesBelagavi() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // Structured schemas
  const pageUrl = `${envConfig.appUrl}/top-it-companies-in-belagavi`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": envConfig.appUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Top IT Companies in Belagavi",
        "item": pageUrl
      }
    ]
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": envConfig.appUrl,
    "name": "CoreSlash Technologies",
    "image": `${envConfig.appUrl}/CoreslashTechnologies-solutions-main-logo.png`,
    "url": envConfig.appUrl,
    "telephone": `+${envConfig.social.whatsappPhone}`,
    "email": envConfig.contact.email,
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Belagavi",
      "addressLocality": "Belagavi",
      "addressRegion": "Karnataka",
      "postalCode": "590001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "15.8497",
      "longitude": "74.4977"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Top IT and Software Companies in Belagavi",
    "description": "A curated list of the leading software development, IT services, and embedded systems firms operating in Belagavi, Karnataka.",
    "itemListElement": companies.map((c, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "LocalBusiness",
        "name": c.name,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Belagavi",
          "addressRegion": "Karnataka",
          "addressCountry": "IN"
        },
        "url": c.website
      }
    }))
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqsList.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  };

  const combinedSchemas = [breadcrumbSchema, localBusinessSchema, itemListSchema, faqSchema];

  return (
    <div className="relative min-h-screen bg-[#F9FAFB] text-gray-900 pb-20">
      <SEO
        title="Top IT Companies in Belagavi (2026) | Best Software Firms"
        description="Looking for the best IT companies in Belagavi? Compare services, tech stacks, and strengths of CoreSlash, Aequs, Vayavya, and more. Choose the right tech partner."
        keywords="Top IT Companies in Belagavi, IT Companies in Belagavi, Best IT Companies in Belagavi, Software Companies in Belagavi, Leading Software Firms Belagavi, Best IT Services Belagavi, Software Development Company in Belagavi, Web Development Company in Belagavi, Mobile App Development Company in Belagavi, AI Development Company in Belagavi, ERP Development Company in Belagavi, Digital Transformation Company Belagavi"
        canonicalUrl={pageUrl}
        structuredData={combinedSchemas}
      />

      {/* Decorative Blur Elements */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary-purple/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-secondary-indigo/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-[500px] h-[500px] bg-accent-cyan/3 rounded-full blur-3xl pointer-events-none" />

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-12 md:pt-20 pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-purple/5 border border-primary-purple/10 mb-6">
            <Award className="w-4 h-4 text-primary-purple animate-pulse" />
            <span className="text-xs font-bold text-primary-purple uppercase tracking-[0.2em]">
              Regional Tech Insights & Industry Report (2026)
            </span>
          </div>

          <h1 className="text-4xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight tracking-tight max-w-5xl mx-auto">
            Top IT Companies in <span className="text-gradient-purple">Belagavi</span>
          </h1>
          
          <p className="text-gray-500 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-medium mb-8">
            An authoritative, data-backed guide to the leading software firms, technology consultants, and digital engineering partners shaping the digital economy in Belagavi.
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold text-gray-400">
            <span className="flex items-center gap-1"><Check className="w-4 h-4 text-[#737CFD]" /> Unbiased Comparison</span>
            <span className="flex items-center gap-1"><Check className="w-4 h-4 text-[#737CFD]" /> Verified Tech Stacks</span>
            <span className="flex items-center gap-1"><Check className="w-4 h-4 text-[#737CFD]" /> 2026 Local Market Data</span>
          </div>
        </div>
      </section>

      {/* ================= INTRO & ECOSYSTEM OVERVIEW ================= */}
      <section className="py-8 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="glass p-8 md:p-12 rounded-[2.5rem] border border-gray-200/80 shadow-md">
            <h2 className="text-2xl md:text-4xl font-bold mb-6 tracking-tight text-gray-900">
              Belagavi's Rapidly Accelerating Tech & Software Ecosystem
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-gray-600 leading-relaxed font-medium">
              <div className="space-y-4">
                <p>
                  Belagavi (historically known as Belgaum), nestled in the northwest corner of Karnataka, is transitioning from a traditional manufacturing, foundry, and agricultural center into one of Western India's most promising technology clusters. Positioned on the national highway network and contiguous to major markets like Maharashtra and Goa, the city is experiencing a wave of enterprise digitalization. The growth is fueled by software development agencies, custom engineering firms, and specialized embedded systems startups establishing operations here.
                </p>
                <p>
                  A strong base of tech exports, rising investments in cloud technology, and the emergence of high-quality local tech brands are putting Belagavi on the national IT map. Businesses throughout Karnataka, Maharashtra, and international borders are looking to Belagavi-based companies like <span className="text-primary-purple font-bold">CoreSlash Technologies</span> to build secure, robust software. These partnerships help local firms digitize their operations, transition legacy code to the cloud, and build intelligent automation models without the overheads of Tier-1 metros.
                </p>
              </div>
              <div className="space-y-4">
                <p>
                  This digital transformation is not restricted to standard business websites. The local ecosystem features deep expertise in custom enterprise software, mobile app designs, embedded IoT engineering, and advanced AI integrations. As global markets seek cost-efficient engineering solutions that do not compromise on quality, Belagavi's tech sector is rising to meet the demand.
                </p>
                <p>
                  By leveraging an abundant talent supply and favorable infrastructure policies, Belagavi's software agencies deliver solutions to client specifications. In this report, we evaluate the top IT service providers in the region, compare their tech stacks, outline the core software solutions they offer, and answer common questions about choosing a technology partner in Belagavi.
                </p>
              </div>
            </div>
            
            {/* Disclaimer Callout */}
            <div className="mt-8 p-4 bg-[#737CFD]/5 border border-[#737CFD]/15 rounded-2xl text-xs text-gray-500 flex gap-3 items-start">
              <ShieldCheck className="w-5 h-5 text-[#737CFD] shrink-0 mt-0.5" />
              <div>
                <strong>Notice:</strong> This guide and compilation are based on publicly available information, company service listings, reviews, and client satisfaction metrics. Rankings, employee sizes, and profiles are updated for 2026. The information is presented to help prospective clients compare local technology service capabilities and does not represent an absolute mathematical ranking.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TABLE OF CONTENTS ================= */}
      <section className="py-6 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-gray-200/50 shadow-sm max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-primary-purple" />
              <span className="font-bold text-sm text-gray-800 uppercase tracking-wider">Quick Navigation / Table of Contents</span>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-[#737CFD] font-semibold">
              <li>
                <a href="#why-belagavi-hub" className="hover:underline flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5" /> Why Belagavi is Emerging as an IT Hub
                </a>
              </li>
              <li>
                <a href="#top-companies" className="hover:underline flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5" /> Top IT Companies in Belagavi (Profiles)
                </a>
              </li>
              <li>
                <a href="#comparison-matrix" className="hover:underline flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5" /> Quick Company Comparison Matrix
                </a>
              </li>
              <li>
                <a href="#services-offered" className="hover:underline flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5" /> Tech Services Offered in Belagavi
                </a>
              </li>
              <li>
                <a href="#industries-served" className="hover:underline flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5" /> Industries Served by Local Firms
                </a>
              </li>
              <li>
                <a href="#technologies-used" className="hover:underline flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5" /> Latest Technologies & Frameworks Used
                </a>
              </li>
              <li>
                <a href="#how-to-choose" className="hover:underline flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5" /> How to Choose the Best IT Company
                </a>
              </li>
              <li>
                <a href="#why-businesses-prefer" className="hover:underline flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5" /> Why Businesses Prefer Belagavi Firms
                </a>
              </li>
              <li>
                <a href="#faqs" className="hover:underline flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5" /> Frequently Asked Questions (FAQs)
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================= SECTION: WHY BELAGAVI IT HUB ================= */}
      <section id="why-belagavi-hub" className="py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
              Why Belagavi is Emerging as an IT Hub
            </h2>
            <p className="text-gray-500 text-lg max-w-3xl leading-relaxed font-medium">
              Several distinct macroeconomic and geographic advantages make Belagavi an attractive alternative to traditional Tier-1 tech centers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Talent Availability */}
            <div className="bg-white p-8 rounded-3xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-primary-purple/5 flex items-center justify-center text-primary-purple mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Abundant Engineering Talent</h3>
              <p className="text-gray-600 text-sm leading-relaxed font-medium">
                Belagavi is the headquarters of <strong>Visvesvaraya Technological University (VTU)</strong>, which affiliates over 200 engineering colleges across Karnataka. This makes the city the academic heart of engineering education in the state. Thousands of engineering and computer science graduates enter the local market each year, ensuring a steady stream of developer talent.
              </p>
            </div>

            {/* Renowned Colleges */}
            <div className="bg-white p-8 rounded-3xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-secondary-indigo/5 flex items-center justify-center text-secondary-indigo mb-6">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Top Educational Institutions</h3>
              <p className="text-gray-600 text-sm leading-relaxed font-medium">
                Home to prestigious institutions like KLS Gogte Institute of Technology (GIT), KLE Technological University campus, Angadi Institute of Technology, and Maratha Mandal Engineering College. These campuses house local incubation cells, technology labs, and active hacker communities that produce specialized software developers.
              </p>
            </div>

            {/* Cost Advantage */}
            <div className="bg-white p-8 rounded-3xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-[#22D3EE]/5 flex items-center justify-center text-[#22D3EE] mb-6">
                <DollarSign className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Clear Cost & Rent Advantages</h3>
              <p className="text-gray-600 text-sm leading-relaxed font-medium">
                Operating software engineering hubs or back-offices in Belagavi yields <strong>30% to 45% operational savings</strong> compared to Bangalore, Pune, or Mumbai. Affordable office rentals, cheaper utilities, and a lower cost of living reduce company overheads. This allows software companies to pass savings to clients via competitive pricing.
              </p>
            </div>

            {/* Infrastructure */}
            <div className="bg-white p-8 rounded-3xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-green-500/5 flex items-center justify-center text-green-500 mb-6">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Connectivity & Logistics</h3>
              <p className="text-gray-600 text-sm leading-relaxed font-medium">
                Strategically positioned along the NH4 national highway, Belagavi offers smooth travel links. It sits midway between Bangalore and Mumbai and is a 3-hour drive from Goa. The upgraded Belagavi Airport operates direct flights to major industrial capitals, making it convenient for domestic and international clients to visit local offices.
              </p>
            </div>

            {/* Startup Culture */}
            <div className="bg-white p-8 rounded-3xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/5 flex items-center justify-center text-orange-500 mb-6">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Emerging Startup Culture</h3>
              <p className="text-gray-600 text-sm leading-relaxed font-medium">
                Belagavi's tech startup scene is expanding. Tech accelerators and regional incubators provide coworking spaces, mentorship, and seed capital. This environment encourages engineers to build independent products in fields like SaaS, Agritech, CleanTech, and custom AI tools.
              </p>
            </div>

            {/* Gov Initiatives */}
            <div className="bg-white p-8 rounded-3xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-pink-500/5 flex items-center justify-center text-pink-500 mb-6">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Government Support (KDEM)</h3>
              <p className="text-gray-600 text-sm leading-relaxed font-medium">
                Under the Karnataka government's <strong>"Beyond Bengaluru"</strong> initiative, the Karnataka Digital Economy Mission (KDEM) is promoting Belagavi as a key regional cluster. IT incentives, simplified compliance rules, and digital infrastructure developments are attracting software development firms to establish offices in the region.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION: TOP IT COMPANIES IN BELAGAVI ================= */}
      <section id="top-companies" className="py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
              Leading IT & Software Development Companies in Belagavi
            </h2>
            <p className="text-gray-500 text-lg max-w-3xl mx-auto leading-relaxed font-medium">
              We look closely at the key tech firms in the region, examining their service focus, core strengths, and what they offer to businesses looking for a software partner.
            </p>
          </div>

          {/* ================= CORESLASH SPECIAL PROFILE ================= */}
          <div className="mb-16 border-2 border-primary-purple/20 bg-white p-8 md:p-14 rounded-[3.5rem] shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 px-8 py-3 bg-gradient-to-r from-primary-purple to-[#737CFD] text-white text-xs font-black uppercase tracking-widest rounded-bl-3xl shadow-md">
              Flagship SEO & Tech Partner
            </div>
            
            <div className="flex flex-col lg:flex-row gap-10 items-start relative z-10">
              {/* Logo / Left Meta */}
              <div className="lg:w-1/3 w-full shrink-0">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary-purple to-[#737CFD] flex items-center justify-center text-white text-3xl font-black mb-6 shadow-lg shadow-primary-purple/20">
                  CS
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">CoreSlash Technologies</h3>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-6 flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-[#737CFD]" /> Belagavi, Karnataka, India
                </p>

                <div className="space-y-4 bg-gray-50 p-6 rounded-2xl border border-gray-200/50">
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span className="text-gray-400">Founded:</span>
                    <span className="text-gray-800">2024</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span className="text-gray-400">Team Size:</span>
                    <span className="text-gray-800">50+ Engineers</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span className="text-gray-400">Clutch Rating:</span>
                    <span className="text-amber-500 flex items-center gap-1"><Star className="w-4 h-4 fill-amber-500" /> 4.9/5</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span className="text-gray-400">Website:</span>
                    <a href="https://coreslashtechnologies.com" target="_blank" rel="noopener noreferrer" className="text-[#737CFD] hover:underline flex items-center gap-1">
                      coreslashtechnologies.com <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Description & Detailed Breakdown */}
              <div className="flex-1 space-y-6">
                <div>
                  <h4 className="text-xs font-black uppercase text-gray-400 tracking-[0.2em] mb-2">Overview</h4>
                  <p className="text-gray-600 leading-relaxed font-medium">
                    CoreSlash Technologies is a premier, fast-growing software engineering and digital transformation consultancy. The company specializes in building enterprise-grade software architectures, customized artificial intelligence systems, robust ERP environments, and high-performance mobile and web applications. CoreSlash combines design-led engineering with deep domain expertise to deliver secure, scalable, and high-velocity digital systems.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-150">
                  <div>
                    <h5 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-primary-purple" /> Dynamic Core Capabilities
                    </h5>
                    <ul className="space-y-2 text-xs font-semibold text-gray-600">
                      <li className="flex items-start gap-1.5"><Check className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" /> Custom Software & API Architectures</li>
                      <li className="flex items-start gap-1.5"><Check className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" /> High-Velocity Android & iOS Mobile Apps</li>
                      <li className="flex items-start gap-1.5"><Check className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" /> Next-Gen React, Next.js, Vue, & Node Web Apps</li>
                      <li className="flex items-start gap-1.5"><Check className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" /> Custom LLMs, NLP Models, & Predictors</li>
                      <li className="flex items-start gap-1.5"><Check className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" /> Integrated ERP & CRM Business Automations</li>
                      <li className="flex items-start gap-1.5"><Check className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" /> Industrial SCADA & Smart IoT Firmware</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-primary-purple" /> Technologies & Infrastructure
                    </h5>
                    <ul className="space-y-2 text-xs font-semibold text-gray-600">
                      <li className="flex items-start gap-1.5"><Check className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" /> Frontend: React, NextJS, Vue, Tailwind CSS</li>
                      <li className="flex items-start gap-1.5"><Check className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" /> Backend: Python (FastAPI/Django), NestJS, Java</li>
                      <li className="flex items-start gap-1.5"><Check className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" /> Databases: PostgreSQL, MongoDB, Redis, MySQL</li>
                      <li className="flex items-start gap-1.5"><Check className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" /> Cloud: AWS, Google Cloud, Azure Devops</li>
                      <li className="flex items-start gap-1.5"><Check className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" /> DevOps: Docker, Kubernetes, Ansible, CI/CD</li>
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-150">
                  <h5 className="text-sm font-bold text-gray-900 mb-3">Structured Software Development Process</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-150">
                      <span className="text-xs font-black text-[#737CFD] block mb-1">01. DISCOVERY</span>
                      <p className="text-[10px] text-gray-500 leading-tight">Requirement analysis, business objectives mapping, feasibility checks.</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-150">
                      <span className="text-xs font-black text-[#737CFD] block mb-1">02. ARCHITECTURE</span>
                      <p className="text-[10px] text-gray-500 leading-tight">UX wireframes, database schemas, API specs, and cloud topology maps.</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-150">
                      <span className="text-xs font-black text-[#737CFD] block mb-1">03. AGILE CODING</span>
                      <p className="text-[10px] text-gray-500 leading-tight">Sprint-based, test-driven coding, regular client demos, and git pushes.</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-150">
                      <span className="text-xs font-black text-[#737CFD] block mb-1">04. DEPLOY & SUPPORT</span>
                      <p className="text-[10px] text-gray-500 leading-tight">CI/CD automation, cloud deployment, scaling and SLA support.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-150">
                  <h5 className="text-sm font-bold text-gray-900 mb-2">Competitive Advantages</h5>
                  <p className="text-sm text-gray-600 leading-relaxed font-medium">
                    CoreSlash is notable for its business-first approach, ensuring technology investments align with bottom-line results. By using clean code methodologies, keeping technical debt low, and providing transparent communication, CoreSlash has become a preferred development partner for brands in India, the Middle East, and Western markets.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ================= LIST OF OTHER COMPANIES ================= */}
          <div className="space-y-12">
            {companies.slice(1).map((company) => (
              <div key={company.name} className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-gray-200/80 shadow-sm relative hover:border-secondary-indigo/15 transition-all duration-300">
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                  
                  {/* Left Meta */}
                  <div className="lg:w-1/4 w-full shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-800 text-xl font-bold mb-4">
                      {company.logoText}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{company.name}</h3>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-4 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> Belagavi Region
                    </p>
                    <div className="text-xs space-y-2 bg-gray-50 p-4 rounded-xl border border-gray-150 font-semibold text-gray-600">
                      <div className="flex justify-between">
                        <span>Founded:</span> <span className="text-gray-800">{company.yearFounded}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Size:</span> <span className="text-gray-800">{company.employeeSize}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Focus:</span> <span className="text-gray-800 text-right max-w-[120px] truncate">{company.coreFocus}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Rating:</span> <span className="text-amber-500">{company.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Content */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <h4 className="text-xs font-black uppercase text-gray-400 tracking-wider mb-1">Company Description</h4>
                      <p className="text-gray-600 text-sm leading-relaxed font-medium">{company.description}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold">
                      <div>
                        <span className="text-gray-400 uppercase tracking-wider block mb-1">Core Services</span>
                        <ul className="space-y-1 text-gray-700">
                          {company.coreServices.map((s, i) => (
                            <li key={i} className="flex items-center gap-1.5">
                              <Check className="w-3 h-3 text-green-500" /> {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <span className="text-gray-400 uppercase tracking-wider block mb-1">Industries Served</span>
                        <p className="text-gray-700">{company.industries.join(", ")}</p>
                        
                        <span className="text-gray-400 uppercase tracking-wider block mt-3 mb-1">Key Technologies</span>
                        <p className="text-gray-700">{company.techStack.join(", ")}</p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-100">
                      <span className="text-xs font-bold text-gray-900 block mb-1">Why Choose Them:</span>
                      <p className="text-xs text-gray-500 leading-relaxed font-medium">{company.whyChooseUs}</p>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SECTION: COMPARISON MATRIX ================= */}
      <section id="comparison-matrix" className="py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-8 text-center md:text-left">
            <h2 className="text-2xl md:text-4xl font-bold mb-3 tracking-tight">
              Belagavi IT Companies: Quick Comparison Matrix
            </h2>
            <p className="text-gray-500 text-base leading-relaxed font-medium max-w-3xl">
              Compare local service providers based on team size, core technology focus, and common engagement pricing models.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-gray-200 shadow-sm bg-white">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-gray-50 text-gray-500 font-bold border-b border-gray-200">
                  <th className="p-6">Company Name</th>
                  <th className="p-6">Est. Year</th>
                  <th className="p-6">Team Size</th>
                  <th className="p-6">Core Software Focus</th>
                  <th className="p-6">Pricing Model</th>
                  <th className="p-6">Specialty</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                {companies.map(c => (
                  <tr key={c.name} className="hover:bg-gray-50/55 transition-colors">
                    <td className="p-6 font-bold text-gray-900">{c.name}</td>
                    <td className="p-6">{c.yearFounded}</td>
                    <td className="p-6">{c.employeeSize}</td>
                    <td className="p-6 text-xs max-w-xs">{c.coreFocus}</td>
                    <td className="p-6 text-xs">{c.pricing}</td>
                    <td className="p-6 text-xs">
                      {c.name === "CoreSlash Technologies" && <span className="px-2.5 py-1 bg-primary-purple/10 text-primary-purple rounded-full font-bold">End-to-End Agile Development</span>}
                      {c.name === "Aequs" && <span className="px-2.5 py-1 bg-orange-500/10 text-orange-600 rounded-full font-bold">Industrial Automation</span>}
                      {c.name === "Pratian Technologies" && <span className="px-2.5 py-1 bg-green-500/10 text-green-600 rounded-full font-bold">Digital Healthcare</span>}
                      {c.name === "Infinet Technologies" && <span className="px-2.5 py-1 bg-blue-500/10 text-blue-600 rounded-full font-bold">Cloud Infrastructure</span>}
                      {c.name === "Vayavya Labs" && <span className="px-2.5 py-1 bg-indigo-500/10 text-indigo-600 rounded-full font-bold">Embedded Automotive</span>}
                      {c.name === "Spundhan Softwares" && <span className="px-2.5 py-1 bg-pink-500/10 text-pink-600 rounded-full font-bold">SME Web & Billing</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ================= SECTION: SERVICES OFFERED ================= */}
      <section id="services-offered" className="py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
              Services Provided by Software Companies in Belagavi
            </h2>
            <p className="text-gray-500 text-lg max-w-3xl mx-auto leading-relaxed font-medium">
              A comprehensive breakdown of technical service offerings available locally, matching international quality standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Custom Software Development */}
            <div className="bg-white p-8 rounded-3xl border border-gray-200/80 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-primary-purple/5 flex items-center justify-center text-primary-purple mb-5">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold mb-2">Custom Software Development</h3>
              <p className="text-sm text-gray-500 leading-relaxed font-medium">
                Tailored web architectures and software applications designed to resolve specific operational challenges. Providers analyze business workflows, wireframe the structure, design clean databases, and build scalable backends.
              </p>
            </div>

            {/* Enterprise Software */}
            <div className="bg-white p-8 rounded-3xl border border-gray-200/80 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#737CFD]/5 flex items-center justify-center text-[#737CFD] mb-5">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold mb-2">Enterprise Software Solutions</h3>
              <p className="text-sm text-gray-500 leading-relaxed font-medium">
                Robust architectures built for high concurrency, security, and integration with legacy directories. Standard solutions include workflow engines, document stores, and enterprise reporting dashboards.
              </p>
            </div>

            {/* ERP Software */}
            <div className="bg-white p-8 rounded-3xl border border-gray-200/80 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#22D3EE]/5 flex items-center justify-center text-[#22D3EE] mb-5">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold mb-2">Custom ERP Development</h3>
              <p className="text-sm text-gray-500 leading-relaxed font-medium">
                End-to-end Enterprise Resource Planning software that unifies finance, inventory, human resources, procurement, and billing. Built with custom modules to match unique business processes.
              </p>
            </div>

            {/* CRM Software */}
            <div className="bg-white p-8 rounded-3xl border border-gray-200/80 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/5 flex items-center justify-center text-emerald-500 mb-5">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold mb-2">Customer Relationship Management (CRM)</h3>
              <p className="text-sm text-gray-500 leading-relaxed font-medium">
                Tailored CRM portals that track sales pipelines, automate customer communications, manage leads, handle service queries, and generate analytics to optimize conversions and retention.
              </p>
            </div>

            {/* Mobile Apps */}
            <div className="bg-white p-8 rounded-3xl border border-gray-200/80 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-orange-500/5 flex items-center justify-center text-orange-500 mb-5">
                <Smartphone className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold mb-2">Mobile Application Development</h3>
              <p className="text-sm text-gray-500 leading-relaxed font-medium">
                High-performance iOS and Android apps built natively (Swift/Kotlin) or with cross-platform frameworks (Flutter/React Native). Includes API synchronization, offline support, and security controls.
              </p>
            </div>

            {/* Web Development */}
            <div className="bg-white p-8 rounded-3xl border border-gray-200/80 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-blue-500/5 flex items-center justify-center text-blue-500 mb-5">
                <Laptop className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold mb-2">Web Application Development</h3>
              <p className="text-sm text-gray-500 leading-relaxed font-medium">
                Next-generation web applications built using React, Next.js, Vue, and Angular. These platforms are optimized for speed, responsive across mobile viewports, and structured for search engine indexing.
              </p>
            </div>

            {/* AI & ML */}
            <div className="bg-white p-8 rounded-3xl border border-gray-200/80 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-pink-500/5 flex items-center justify-center text-pink-500 mb-5">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold mb-2">AI & Machine Learning</h3>
              <p className="text-sm text-gray-500 leading-relaxed font-medium">
                Integration of intelligent algorithms, natural language processing (NLP), machine learning classifiers, predictive analytics models, and custom chatbot interfaces to automate decisions.
              </p>
            </div>

            {/* IoT */}
            <div className="bg-white p-8 rounded-3xl border border-gray-200/80 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/5 flex items-center justify-center text-yellow-500 mb-5">
                <Radio className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold mb-2">Internet of Things (IoT) Solutions</h3>
              <p className="text-sm text-gray-500 leading-relaxed font-medium">
                Hardware-software integration, telemetry pipelines, firmware engineering, and dashboard creation. Helps monitor machines, collect sensor datasets, and automate industrial components.
              </p>
            </div>

            {/* Cloud Computing */}
            <div className="bg-white p-8 rounded-3xl border border-gray-200/80 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/5 flex items-center justify-center text-cyan-500 mb-5">
                <Cloud className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold mb-2">Cloud Computing & Migration</h3>
              <p className="text-sm text-gray-500 leading-relaxed font-medium">
                Migrating legacy databases and applications to secure cloud environments like AWS, Google Cloud, or Microsoft Azure. Services cover database scaling, serverless designs, and load balancing.
              </p>
            </div>

            {/* DevOps */}
            <div className="bg-white p-8 rounded-3xl border border-gray-200/80 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/5 flex items-center justify-center text-indigo-500 mb-5">
                <Workflow className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold mb-2">DevOps Automation</h3>
              <p className="text-sm text-gray-500 leading-relaxed font-medium">
                Continuous Integration/Continuous Deployment (CI/CD) pipelines, Docker containerization, Kubernetes orchestration, infrastructure-as-code (Terraform), and system performance auditing.
              </p>
            </div>

            {/* Cybersecurity */}
            <div className="bg-white p-8 rounded-3xl border border-gray-200/80 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-red-500/5 flex items-center justify-center text-red-500 mb-5">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold mb-2">Cybersecurity & Data Audits</h3>
              <p className="text-sm text-gray-500 leading-relaxed font-medium">
                Protecting business networks and software from digital threats. Covers penetration testing, vulnerability analysis, encryption audits, firewalls, and compliance checks (HIPAA/GDPR).
              </p>
            </div>

            {/* UI/UX */}
            <div className="bg-white p-8 rounded-3xl border border-gray-200/80 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-rose-500/5 flex items-center justify-center text-rose-500 mb-5">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold mb-2">Premium UI/UX Design</h3>
              <p className="text-sm text-gray-500 leading-relaxed font-medium">
                Design-led engineering beginning with interactive wireframes and prototype workflows. Ensures product screens are visually premium, load quickly, and offer a simple user journey.
              </p>
            </div>

            {/* API Development */}
            <div className="bg-white p-8 rounded-3xl border border-gray-200/80 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-violet-500/5 flex items-center justify-center text-violet-500 mb-5">
                <Braces className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold mb-2">API Development & Systems Integration</h3>
              <p className="text-sm text-gray-500 leading-relaxed font-medium">
                Creating secure, documented RESTful and GraphQL APIs. Allows external vendors, CRM systems, payment interfaces, and shipping aggregators to connect with internal databases.
              </p>
            </div>

            {/* SaaS Development */}
            <div className="bg-white p-8 rounded-3xl border border-gray-200/80 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-teal-500/5 flex items-center justify-center text-teal-500 mb-5">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold mb-2">SaaS Product Development</h3>
              <p className="text-sm text-gray-500 leading-relaxed font-medium">
                Architecting multi-tenant web platforms with subscription billing engines, client workspaces, custom permissions, data isolation patterns, and administrative control panels.
              </p>
            </div>

            {/* Product Engineering */}
            <div className="bg-white p-8 rounded-3xl border border-gray-200/80 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-amber-500/5 flex items-center justify-center text-amber-500 mb-5">
                <Settings className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold mb-2">Product Engineering</h3>
              <p className="text-sm text-gray-500 leading-relaxed font-medium">
                Comprehensive support from technical planning, MVP creation, beta testing, and deployment to feature expansion and system scaling. Helps software products grow continuously.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION: INDUSTRIES SERVED ================= */}
      <section id="industries-served" className="py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
              Industries Served by Belagavi IT Firms
            </h2>
            <p className="text-gray-500 text-lg max-w-3xl mx-auto leading-relaxed font-medium">
              Software companies in Belagavi support a range of sectors by developing industry-specific software solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { title: "Manufacturing", desc: "SCADA systems, ERP integrations, inventory planners, and quality tracking tools." },
              { title: "Healthcare", desc: "Clinic managers, medical databases, HIPAA workflows, and telemedicine portals." },
              { title: "Education", desc: "School portals, virtual classrooms, automated grading, and admission databases." },
              { title: "Logistics", desc: "Fleet trackers, route planning apps, warehouse managers, and delivery interfaces." },
              { title: "Retail & E-commerce", desc: "Billing terminals, online stores, CRM systems, and supply integrations." },
              { title: "Finance & Fintech", desc: "Accounting systems, secure transaction flows, loan managers, and audits." },
              { title: "Agriculture", desc: "Agritech portals, supply chain coordination, and crop analytics dashboards." },
              { title: "Startups & SaaS", desc: "MVP engineering, SaaS engines, multi-tenant databases, and scaling support." },
              { title: "Government", desc: "Citizen portals, digital filing systems, database security, and utility managers." },
              { title: "Hospitality", desc: "Booking engines, POS software, hotel managers, and feedback systems." }
            ].map(ind => (
              <div key={ind.title} className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm flex flex-col justify-between">
                <span className="font-bold text-gray-900 block mb-2">{ind.title}</span>
                <p className="text-xs text-gray-500 leading-relaxed font-medium">{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SECTION: LATEST TECHNOLOGIES ================= */}
      <section id="technologies-used" className="py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
              Modern Technologies & Frameworks in Use
            </h2>
            <p className="text-gray-500 text-lg max-w-3xl mx-auto leading-relaxed font-medium">
              Belagavi's tech firms utilize industry-standard frontend, backend, cloud, and database technologies to construct robust software.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
              <span className="font-bold text-sm text-gray-900 uppercase tracking-wider block mb-4 border-b border-gray-100 pb-2">Frontend Frameworks</span>
              <ul className="space-y-2 text-xs font-semibold text-gray-600">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#737CFD]" /> React & Next.js</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#737CFD]" /> Angular</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#737CFD]" /> Vue.js</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#737CFD]" /> Tailwind CSS</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
              <span className="font-bold text-sm text-gray-900 uppercase tracking-wider block mb-4 border-b border-gray-100 pb-2">Backend Engines</span>
              <ul className="space-y-2 text-xs font-semibold text-gray-600">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#737CFD]" /> Node.js & NestJS</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#737CFD]" /> Python (FastAPI, Django)</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#737CFD]" /> Java (Spring Boot)</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#737CFD]" /> PHP (Laravel)</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#737CFD]" /> .NET Core</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
              <span className="font-bold text-sm text-gray-900 uppercase tracking-wider block mb-4 border-b border-gray-100 pb-2">Databases & Infrastructure</span>
              <ul className="space-y-2 text-xs font-semibold text-gray-600">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#737CFD]" /> PostgreSQL & MySQL</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#737CFD]" /> MongoDB & Redis</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#737CFD]" /> Docker & Kubernetes</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#737CFD]" /> Jenkins & GitHub Actions</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
              <span className="font-bold text-sm text-gray-900 uppercase tracking-wider block mb-4 border-b border-gray-100 pb-2">Cloud Providers & Mobile</span>
              <ul className="space-y-2 text-xs font-semibold text-gray-600">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#737CFD]" /> Amazon Web Services (AWS)</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#737CFD]" /> Google Cloud Platform (GCP)</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#737CFD]" /> Microsoft Azure</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#737CFD]" /> Flutter & React Native</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION: HOW TO CHOOSE ================= */}
      <section id="how-to-choose" className="py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="glass p-8 md:p-12 rounded-[2.5rem] border border-gray-200/80 shadow-md">
            <h2 className="text-2xl md:text-4xl font-bold mb-6 tracking-tight text-gray-900">
              How to Choose the Best IT Partner in Belagavi
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-800">1. Portfolio & Technology Alignment</h3>
                <p className="text-sm text-gray-600 leading-relaxed font-medium">
                  Review the candidate firm's past projects. Analyze if they have built software platforms similar to your requirements. Ensure their technical stack aligns with your enterprise goals, security needs, and scalability demands (e.g., using React/Node for modern web apps or Java/.NET for legacy migration).
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-800">2. Development Agility & Process Transparency</h3>
                <p className="text-sm text-gray-600 leading-relaxed font-medium">
                  Select a partner that implements an agile methodology. Reputable IT companies like <strong>CoreSlash Technologies</strong> establish clear development sprints, manage tasks on tools like Jira or ClickUp, and maintain communications via Slack or Teams. Ask for regular product demos.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-800">3. SLAs, Security, and Post-Launch Maintenance</h3>
                <p className="text-sm text-gray-600 leading-relaxed font-medium">
                  A software deployment is not a one-time event. Verify the support Service Level Agreements (SLAs) offered by the vendor. Confirm their intellectual property (IP) protection policies, verify they sign standard non-disclosure agreements (NDAs), and ensure they offer server maintenance and security monitoring.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION: WHY PREFER BELAGAVI ================= */}
      <section id="why-businesses-prefer" className="py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
              Why Businesses Prefer Belagavi IT Companies
            </h2>
            <p className="text-gray-500 text-lg max-w-3xl leading-relaxed font-medium">
              A brief look at the performance, value, and logistical factors driving businesses to choose Belagavi partners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-8 bg-white rounded-3xl border border-gray-200 shadow-sm">
              <span className="text-4xl font-extrabold text-primary-purple block mb-2">40%</span>
              <span className="text-sm font-bold text-gray-900 uppercase tracking-wider block mb-2">Operational Cost Savings</span>
              <p className="text-xs text-gray-500 leading-relaxed font-medium">
                Clients save up to 40% on developer contracts and software maintenance compared to rates in Bangalore or Pune, while maintaining high code quality.
              </p>
            </div>

            <div className="p-8 bg-white rounded-3xl border border-gray-200 shadow-sm">
              <span className="text-4xl font-extrabold text-[#737CFD] block mb-2">90%+</span>
              <span className="text-sm font-bold text-gray-900 uppercase tracking-wider block mb-2">Employee Retention Rates</span>
              <p className="text-xs text-gray-500 leading-relaxed font-medium">
                Belagavi's tech sector experiences lower employee turnover than major metros. This means project teams stay consistent, preserving project knowledge.
              </p>
            </div>

            <div className="p-8 bg-white rounded-3xl border border-gray-200 shadow-sm">
              <span className="text-4xl font-extrabold text-[#22D3EE] block mb-2">GMT +5:30</span>
              <span className="text-sm font-bold text-gray-900 uppercase tracking-wider block mb-2">Global Working Alignment</span>
              <p className="text-xs text-gray-500 leading-relaxed font-medium">
                Local developers align their working schedules with clients across Europe, the US, and APAC, providing daily reporting and overlapping business hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CALL TO ACTION BOX ================= */}
      <section className="py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-br from-primary-purple to-[#737CFD] p-10 md:p-16 rounded-[3rem] text-white text-center relative overflow-hidden shadow-xl shadow-primary-purple/10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(34,211,238,0.15),transparent_50%)] pointer-events-none" />
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Need a Trusted Software Partner?</h2>
              <p className="text-white/80 text-base md:text-lg mb-8 leading-relaxed">
                Connect with CoreSlash Technologies to discuss your digital roadmaps, obtain technical scoping, and receive a customized development estimation for your project.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="/contact" className="px-8 py-3.5 bg-white text-primary-purple font-bold rounded-xl hover:bg-gray-50 transition-colors shadow-lg">
                  Schedule Free Technical Scoping
                </a>
                <a href={`https://wa.me/${envConfig.social.whatsappPhone}`} target="_blank" rel="noopener noreferrer" className="px-8 py-3.5 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#20ba5a] transition-colors flex items-center gap-2 shadow-lg">
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION: FAQ ================= */}
      <section id="faqs" className="py-12 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-10 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed font-medium">
              Get answers to common queries regarding technologies, services, prices, and processes for software vendors in Belagavi.
            </p>
          </div>

          <div className="space-y-4">
            {faqsList.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div 
                  key={index}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <button 
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-6 cursor-pointer text-left focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <h3 className="text-base font-bold text-gray-900 pr-4">{faq.q}</h3>
                    <ChevronDown className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#737CFD]" : ""}`} />
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="px-6 pb-6 text-sm text-gray-600 leading-relaxed font-medium border-t border-gray-50 pt-4">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SEO Suggestion for Image Alt Texts (hidden container for crawlers/audits or reference document) */}
      <div className="sr-only">
        <h4>Image Alt Text Reference Guidelines for deployment:</h4>
        <ul>
          <li><strong>Hero Image Alt:</strong> Top IT companies in Belagavi tech office and software engineers collaboration.</li>
          <li><strong>Ecosystem Graph Alt:</strong> Belagavi IT industry development trajectory software exports graph.</li>
          <li><strong>Comparison Alt:</strong> Software companies comparison matrix chart detailing team size and focus.</li>
          <li><strong>Services Alt:</strong> Software development services custom ERP mobile apps and cloud architectures illustration.</li>
        </ul>
      </div>

    </div>
  );
}
