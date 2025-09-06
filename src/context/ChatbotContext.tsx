import { createContext, useState, useContext, ReactNode } from 'react';

interface ChatbotContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

export const ChatbotProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <ChatbotContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </ChatbotContext.Provider>
  );
};

export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (!context) {
    throw new Error('useChatbot must be used within a ChatbotProvider');
  }
  return context;
};