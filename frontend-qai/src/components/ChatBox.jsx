import { useState } from "react";
import { Send, Bot } from "lucide-react";
import theme from "../constants/theme";

const ChatBox = () => {
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hello! How can I assist you today?" },
    { type: "user", text: "Show me my expenses." },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { type: "user", text: input }]);
    setInput("");

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: "Fetching your expenses..." },
      ]);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div
        className={`sticky top-0 z-10 bg-gradient-to-r ${theme.gradientchat} text-white text-center py-3 shadow-lg text-lg font-bold tracking-wide`}
      >
        Query AI
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-end gap-2 ${
              msg.type === "bot" ? "justify-start" : "justify-end"
            }`}
          >
            {msg.type === "bot" && (
              <div className="flex-shrink-0 bg-white/20 p-2 rounded-full">
                <Bot size={18} className="text-white" />
              </div>
            )}
            <div
              className={`max-w-[75%] px-4 py-2 rounded-2xl shadow-md text-sm md:text-base ${
                msg.type === "bot"
                  ? "bg-white/20 text-white"
                  : `bg-gradient-to-r ${theme.gradientchat} text-white`
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-end gap-2 justify-start">
            <div className="flex-shrink-0 bg-white/20 p-2 rounded-full">
              <Bot size={18} className="text-white" />
            </div>
            <div className="flex items-center gap-1 bg-white/20 text-white px-4 py-2 rounded-2xl shadow-md">
              <span className="w-2 h-2 bg-white rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="sticky bottom-0 bg-white/10 backdrop-blur-md p-3 border-t border-white/20 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-4 py-3 rounded-full bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-pink-300"
        />
        <button
          onClick={sendMessage}
          className={`flex items-center justify-center px-4 py-3 rounded-full bg-gradient-to-r ${theme.gradientchat} hover:opacity-90 shadow-lg transition transform hover:scale-105`}
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
