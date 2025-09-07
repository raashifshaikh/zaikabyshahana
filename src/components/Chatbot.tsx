import { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useChatbot } from "@/context/ChatbotContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Bot } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

const Chatbot = () => {
  const { isOpen, setIsOpen } = useChatbot();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi there! How can I help you with your cooking today?",
    },
  ]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const { mutate: sendMessage, isPending } = useMutation({
    mutationFn: async (newMessage: string) => {
      const { data, error } = await supabase.functions.invoke("chatbot-proxy", {
        body: { query: newMessage, history: messages },
      });

      if (error) {
        throw new Error(error.message || "Failed to get a response from the assistant.");
      }
      return data.reply;
    },
    onMutate: (newMessage) => {
      setMessages((prev) => [...prev, { role: "user", content: newMessage }]);
    },
    onSuccess: (reply) => {
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    },
    onError: () => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I'm having a little trouble right now. Please try again later.",
        },
      ]);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isPending) return;
    sendMessage(input);
    setInput("");
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isPending]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="flex flex-col p-0">
        <SheetHeader className="p-6 pb-4">
          <SheetTitle>Cooking Bot</SheetTitle>
          <SheetDescription>
            Ask me anything about recipes, ingredients, or cooking techniques!
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1" ref={scrollAreaRef}>
          <div className="p-6 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-start gap-3",
                  message.role === "user" && "justify-end"
                )}
              >
                {message.role === "assistant" && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://i.postimg.cc/tZy1x4jT/zaikabyshahana-high-resolution-logo-transparent.png" alt="Bot" />
                    <AvatarFallback>
                      <Bot />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    "p-3 rounded-lg max-w-xs md:max-w-md",
                    message.role === "user"
                      ? "bg-red-800 text-white rounded-br-none"
                      : "bg-stone-200 text-stone-800 rounded-bl-none"
                  )}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
            {isPending && (
              <div className="flex items-start gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://i.postimg.cc/tZy1x4jT/zaikabyshahana-high-resolution-logo-transparent.png" alt="Bot" />
                  <AvatarFallback>
                    <Bot />
                  </AvatarFallback>
                </Avatar>
                <div className="p-3 rounded-lg bg-stone-200 text-stone-800 rounded-bl-none">
                  <div className="flex items-center space-x-1">
                    <span className="h-2 w-2 bg-stone-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="h-2 w-2 bg-stone-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="h-2 w-2 bg-stone-400 rounded-full animate-bounce"></span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <form onSubmit={handleSubmit} className="flex gap-2 p-4 border-t bg-background">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about a recipe..."
            disabled={isPending}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={isPending || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default Chatbot;