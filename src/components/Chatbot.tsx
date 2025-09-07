import { useState, useRef, useEffect } from "react";
import { Bot, Send, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { useChatbot } from "@/context/ChatbotContext";
import { supabase } from "@/integrations/supabase/client";

type Message = {
  sender: "user" | "bot";
  content: React.ReactNode;
};

const getBotResponse = async (message: string): Promise<React.ReactNode> => {
  const { data, error } = await supabase.functions.invoke("deepseek-proxy", {
    body: { message },
  });

  if (error) {
    console.error("Error invoking Supabase function:", error);
    const detailedError = (error as any).context?.error?.message || error.message;
    return <p className="text-red-500">I'm sorry, an error occurred: {detailedError}</p>;
  }

  if (data.error) {
    console.error("Error payload from Supabase function:", data.error);
    return <p className="text-red-500">I'm sorry, something went wrong: {data.error}</p>;
  }
  
  if (!data || !data.reply) {
    return <p className="text-red-500">I'm sorry, I received an unexpected response from the server.</p>;
  }

  return <p>{data.reply}</p>;
};

const Chatbot = () => {
  const { isOpen, setIsOpen } = useChatbot();
  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", content: "Welcome to ZaikabyShahana! I'm your AI cooking assistant. How can I help you today?" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputValue.trim() === "") return;

    const userMessage: Message = { sender: "user", content: inputValue };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue("");

    const botResponseContent = await getBotResponse(currentInput);
    const botMessage: Message = { sender: "bot", content: botResponseContent };

    setMessages(prev => [...prev, botMessage]);
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent className="h-[70vh]">
        <div className="mx-auto w-full max-w-md flex flex-col h-full">
          <DrawerHeader>
            <DrawerTitle className="text-center text-red-900">ZaikabyShahana Cooking Bot</DrawerTitle>
          </DrawerHeader>
          <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                  {msg.sender === 'bot' && <Bot className="h-8 w-8 text-red-800 flex-shrink-0" />}
                  <div className={`rounded-lg p-3 max-w-xs ${msg.sender === 'user' ? 'bg-red-800 text-white' : 'bg-stone-100'}`}>
                    {msg.content}
                  </div>
                  {msg.sender === 'user' && <User className="h-8 w-8 text-stone-500 flex-shrink-0" />}
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="p-4 border-t">
            <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}>
              <div className="relative">
                <Input
                  placeholder="Ask for a recipe..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="pr-12"
                />
                <Button type="submit" size="icon" className="absolute top-1/2 right-1 -translate-y-1/2 h-8 w-10 bg-red-800 hover:bg-red-900">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default Chatbot;