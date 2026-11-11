import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Complete Route Preloader Map matching all defined lazy routes in App.tsx
// This guarantees that the active page component is in memory before React mounts,
// avoiding the Suspense fallback={null} blank-screen flash.
const routePreloaders: Record<string, () => Promise<unknown>> = {
  '/': () => import('./pages/home'),
  '/about': () => import('./pages/AboutPage'),
  '/portfolio': () => import('./pages/PortfolioPage'),
  '/contact': () => import('./pages/ContactPage'),
  '/careers': () => import('./pages/CareersPage'),
  '/blog': () => import('./pages/BlogPage'),
  '/services': () => import('./pages/ServicesPage'),
  '/services/web-development': () => import('./pages/services/WebsiteDevelopment'),
  '/services/website-development': () => import('./pages/services/WebsiteDevelopment'),
  '/services/app-development': () => import('./pages/services/AppDevelopment'),
  '/services/shopify-development': () => import('./pages/services/ShopifyDevelopment'),
  '/services/seo-solutions': () => import('./pages/services/SEOOptimization'),
  '/services/seo': () => import('./pages/services/SEOOptimization'),
  '/services/digital-marketing': () => import('./pages/services/SEOOptimization'),
  '/services/ecommerce-solutions': () => import('./pages/services/EcommerceWebsite'),
  '/services/ecommerce': () => import('./pages/services/EcommerceWebsite'),
  '/services/software-systems': () => import('./pages/services/SoftwareSystems'),
  '/services/software-development': () => import('./pages/services/SoftwareSystems'),
  '/services/enterprise-it-solutions': () => import('./pages/services/SoftwareSystems'),
  '/services/erp-crm-development': () => import('./pages/services/ErpCrmDevelopment'),
  '/services/ai-automation': () => import('./pages/services/AIAutomation'),
  '/services/cloud-infrastructure': () => import('./pages/services/CloudInfrastructure'),
  '/services/data-analytics': () => import('./pages/services/DataAnalytics'),
  '/services/ppc': () => import('./pages/services/PPCServices'),
  '/privacy-policy': () => import('./pages/PrivacyPolicyPage'),
  '/terms-of-service': () => import('./pages/TermsOfServicePage'),
  '/cookie-policy': () => import('./pages/CookiePolicyPage'),
  '/enquiry-form': () => import('./pages/EnquiryFormPage'),
  '/partner': () => import('./pages/PartnerPage'),
  '/partner-program': () => import('./pages/PartnerPage'),
  '/dealership': () => import('./pages/PartnerPage'),
  '/partner-form': () => import('./pages/PartnerFormPage'),
  '/partner/form': () => import('./pages/PartnerFormPage'),
  '/software-company-in-belagavi': () => import('./pages/SoftwareCompanyInBelagavi'),
  '/top-it-companies-in-belgavi': () => import('./pages/SoftwareCompanyInBelagavi'),
  '/top-it-companies-in-belagavi': () => import('./pages/SoftwareCompanyInBelagavi'),
  '/website-audit': () => import('./pages/WebsiteAuditPage'),
  '/ai-tools': () => import('./pages/WebsiteAuditPage'),
}

async function bootClient() {
  const rootElement = document.getElementById('root')
  if (!rootElement) return

  // Determine active route path
  const pathname = window.location.pathname.replace(/\/$/, '') || '/'

  // Resolve matching preloader (exact match or dynamic prefix)
  let preloader = routePreloaders[pathname]
  if (!preloader) {
    if (pathname.startsWith('/blog/')) {
      preloader = () => import('./pages/BlogPostPage')
    } else if (pathname.startsWith('/admin')) {
      preloader = () => import('./pages/admin/AdminDashboard')
    }
  }

  // Preload route chunk if matched
  if (preloader) {
    try {
      await preloader()
    } catch (preloadError) {
      console.warn('[Preload Recovery] Route chunk preload failed:', preloadError)
      // On failure (e.g. temporary network drop), do not crash or empty the static snapshot.
      // We still proceed to createRoot so React Router's built-in error boundaries can handle it.
    }
  }

  // Scroll Guard: On initial mount, page and layout components invoke window.scrollTo(0, 0).
  // If the user has scrolled down the static HTML while chunks were loading, suppress resetting
  // to (0, 0) so the user's reading position is preserved.
  // DEFECT FIX (C): The guard must ONLY protect the initial route mount. If the user navigates
  // to another route (via SPA Link, popstate, or programmatic navigation) at any point, the guard
  // must immediately disengage and allow the route transition to scroll to (0, 0).
  const nativeScrollTo = window.scrollTo.bind(window)
  const initialPathname = window.location.pathname
  let initialMountSettled = false
  let timerId: ReturnType<typeof setTimeout> | null = null

  const restoreNativeScroll = () => {
    if (!initialMountSettled) {
      initialMountSettled = true
      window.scrollTo = nativeScrollTo
      window.removeEventListener('popstate', restoreNativeScroll)
      if (timerId !== null) {
        clearTimeout(timerId)
        timerId = null
      }
    }
  }

  window.addEventListener('popstate', restoreNativeScroll, { once: true })

  window.scrollTo = function (optionsOrX?: any, y?: any) {
    if (!initialMountSettled) {
      // If user navigated away from the initial route, disengage guard immediately
      if (window.location.pathname !== initialPathname) {
        restoreNativeScroll()
        return nativeScrollTo(optionsOrX, y)
      }

      const targetTop = typeof optionsOrX === 'object' ? optionsOrX?.top : y
      // If attempting to reset to top on the initial route while user has already scrolled down, suppress reset
      if (targetTop === 0 && window.scrollY > 0) {
        return
      }
    }
    return nativeScrollTo(optionsOrX, y)
  }

  // Fallback: Restore native scrollTo after initial React mount phase completes
  timerId = setTimeout(restoreNativeScroll, 1200)

  // Note: createRoot does NOT hydrate pre-rendered HTML; it replaces root container contents.
  // Preloading the route chunk guarantees that this replacement occurs in a single synchronous commit
  // rather than showing an empty fallback Suspense state while downloading over the network.
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

bootClient()
