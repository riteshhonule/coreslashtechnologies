import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="py-32 px-6 md:px-12 max-w-[1400px] mx-auto min-h-[70vh] flex flex-col items-center justify-center text-center">
      <Helmet>
        <title>Page Not Found | CoreSlash Technologies</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <h1 className="text-8xl font-extrabold text-blue-600 mb-4">404</h1>
      <h2 className="text-3xl font-bold mb-6">Page Not Found</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link 
        to="/" 
        className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors"
      >
        Return to Home
      </Link>
    </div>
  );
}
