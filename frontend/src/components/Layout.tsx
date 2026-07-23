import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Breadcrumbs from "./Breadcrumbs";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const isAdminPath = pathname.startsWith("/superadmin");
  const isHome = pathname === "/";

  if (isAdminPath) {
    return <main>{children}</main>;
  }

  return (
    <div>
      <Navbar />
      {!isHome && (
        <div className="max-w-7xl mx-auto px-6 relative z-50 pt-[90px] md:pt-[100px] pb-2 md:pb-4">
          <Breadcrumbs />
        </div>
      )}
      <main>{children}</main>
      <Footer />
    </div>
  );
}
