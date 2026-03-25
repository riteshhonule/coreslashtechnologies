import Navbar from "./Navbar";
import Footer from "./Footer";
import ServiceStrip from "../components/ServiceStrip";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <ServiceStrip />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
