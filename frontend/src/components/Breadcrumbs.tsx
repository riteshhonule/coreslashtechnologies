import { useLocation, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronRight } from 'lucide-react';

export const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (pathnames.length === 0) return null;

  const breadcrumbListSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `${import.meta.env.VITE_APP_URL || 'https://coreslashtechnologies.com'}/`
      },
      ...pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        // Format name: capitalize and replace hyphens with spaces
        const formattedName = name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        return {
          "@type": "ListItem",
          "position": index + 2,
          "name": formattedName,
          "item": isLast ? undefined : `${import.meta.env.VITE_APP_URL || 'https://coreslashtechnologies.com'}${routeTo}`
        };
      })
    ]
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbListSchema)}
        </script>
      </Helmet>
      
      <nav aria-label="breadcrumb" className="py-4">
        <ol className="flex items-center space-x-2 text-sm text-white/40">
          <li>
            <Link to="/" className="hover:text-accent-cyan transition-colors">Home</Link>
          </li>
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;
            const formattedName = name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

            return (
              <li key={name} className="flex items-center space-x-2">
                <ChevronRight className="w-4 h-4 text-white/20" />
                {isLast ? (
                  <span className="text-white/80 font-bold" aria-current="page">{formattedName}</span>
                ) : (
                  <Link to={routeTo} className="hover:text-accent-cyan transition-colors">{formattedName}</Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumbs;
