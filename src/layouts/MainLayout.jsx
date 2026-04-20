import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import WhatsAppButton from "../components/common/WhatsAppButton";
import Chatbot from "../components/common/Chatbot";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "70vh" }}>
        <Outlet />
      </main>
      <WhatsAppButton />
      <Chatbot />
      <Footer />
    </>
  );
};

export default MainLayout;