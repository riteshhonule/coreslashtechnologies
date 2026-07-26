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
    <div className="bg-[#F9FAFB] min-h-screen">
      <Navbar />
      {!isHome && (
        <div className="w-full bg-[#F9FAFB] border-b border-gray-200/50">
          <div className="max-w-[1600px] mx-auto px-8 md:px-14 relative z-50 pt-[88px] md:pt-[100px] pb-2 md:pb-2">
            <Breadcrumbs />
          </div>
        </div>
      )}
      <main>{children}</main>
      <Footer />
    </div>
  );
}
