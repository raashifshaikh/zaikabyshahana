import { useState, useRef, useEffect } from "react";
import { Bot, Send, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Link } from "react-router-dom";
import { useChatbot } from "@/context/ChatbotContext";
import { supabase } from "@/integrations/supabase/client";
import { Recipe } from "@/data/recipes";

type Message = {
  sender: "user" | "bot";
  content: React.ReactNode;
};

const getBotResponse = async (message: string, allRecipes: Recipe[]): Promise<React.ReactNode> => {
  const lowerCaseMessage = message.toLowerCase();

  if (lowerCaseMessage.includes("hello") || lowerCaseMessage.includes("hi")) {
    return <p>Hello! How can I help you find a recipe today? You can ask for a cuisine, ingredient, or difficulty.</p>;
  }

  const keywords = lowerCaseMessage.split(" ").filter(word => word.length > 2);
  
  const matchedRecipes = allRecipes.filter(recipe => {
    const searchString = `${recipe.title} ${recipe.category} ${recipe.description} ${recipe.difficulty}`.toLowerCase();
    return keywords.some(kw => searchString.includes(kw));
  }).slice(0, 3);

  if (matchedRecipes.length > 0) {
    return (
      <div>
        <p>I found these recipes for you:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          {matchedRecipes.map(recipe => (
            <li key={recipe.id}>
              <Link to={`/recipes/${recipe.id}`} className="text-red-800 hover:underline font-semibold">
                {recipe.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return <p>I'm sorry, I couldn't find any recipes matching that. Try asking for something like "easy Indian recipes" or "recipes with salmon".</p>;
};

const Chatbot = () => {
  const { isOpen, setIsOpen } = useChatbot();
  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", content: "Welcome to Zaika! What delicious meal are you thinking of today?" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchAllRecipes = async () => {
      const { data } = await supabase.from("recipes").select("*");
      if (data) {
        setAllRecipes(data as Recipe[]);
      }
    };
    fetchAllRecipes();
  }, []);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputValue.trim() === "" || allRecipes.length === 0) return;

    const userMessage: Message = { sender: "user", content: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    const botResponseContent = await getBotResponse(inputValue, allRecipes);
    const botMessage: Message = { sender: "bot", content: botResponseContent };

    setMessages(prev => [...prev, botMessage]);
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent className="h-[70vh]">
        <div className="mx-auto w-full max-w-md flex flex-col h-full">
          <DrawerHeader>
            <DrawerTitle className="text-center text-red-900">Zaika Cooking Bot</DrawerTitle>
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