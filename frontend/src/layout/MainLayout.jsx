import Navbar from "../components/main-pages/Navbar";
import Footer from "../components/main-pages/Footer";

export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="pt-24">
        {children}
      </div>
      <Footer />
    </>
  );
}
