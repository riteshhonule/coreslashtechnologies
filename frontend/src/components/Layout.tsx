import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const isAdminPath = pathname.startsWith("/superadmin");

  if (isAdminPath) {
    return <main>{children}</main>;
  }

  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
