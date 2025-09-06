import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { Outlet } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useChatbot } from "@/context/ChatbotContext";

const Layout = () => {
  const { setIsOpen } = useChatbot();
  return (
    <div className="relative">
      <Header />
      <Outlet />
      <Footer />
      <Chatbot />
      <Button
        className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg bg-red-800 hover:bg-red-900 z-50"
        onClick={() => setIsOpen(true)}
        aria-label="Open chatbot"
      >
        <MessageCircle className="h-8 w-8" />
      </Button>
    </div>
  );
};

export default Layout;