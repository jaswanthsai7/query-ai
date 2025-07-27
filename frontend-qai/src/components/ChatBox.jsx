import { useState, useEffect, useRef } from "react";
import { Send, Bot } from "lucide-react";
import theme from "../constants/theme";
import { useAuth } from "../context/AuthContext";
import apiTrailRemover from "../features/apiTrailRemover";

const API_BASE = import.meta.env.VITE_API_BASE_URL;
const API_AI_CHAT = import.meta.env.VITE_API_AI_CHAT;

const ChatBox = ({ onData }) => {
  const { token, userId } = useAuth();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const typingTimeoutRef = useRef(null);
  const typingIndexRef = useRef(0);

  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /** Show typing bubble (dots) if not already present */
  const showTypingBubble = () => {
    setMessages((prev) =>
      prev.some((m) => m.type === "bot" && m.isTyping)
        ? prev
        : [...prev, { type: "bot", text: "", isTyping: true }]
    );
  };

  /** Typewriter effect */
  const typeMessage = (fullText) => {
    // Ensure typing bubble exists
    setMessages((prev) => {
      if (!prev.some((m) => m.type === "bot" && m.isTyping)) {
        return [...prev, { type: "bot", text: "", isTyping: true }];
      }
      return prev;
    });

    typingIndexRef.current = 0;
    clearTimeout(typingTimeoutRef.current);

    const typeNextChar = () => {
      setMessages((prev) =>
        prev.map((msg) => {
          if (msg.type === "bot" && msg.isTyping) {
            const currentIndex = typingIndexRef.current;
            const isDone = currentIndex + 1 >= fullText.length;
            return {
              type: "bot",
              text: fullText.slice(0, currentIndex + 1),
              isTyping: !isDone,
            };
          }
          return msg;
        })
      );

      if (typingIndexRef.current < fullText.length - 1) {
        typingIndexRef.current++;
        typingTimeoutRef.current = setTimeout(typeNextChar, 40);
      }
    };

    typeNextChar();
  };

  /** On mount: show initial bot typing animation */
  useEffect(() => {
    let cancelled = false;

    setMessages([]); // Clear old bubbles
    showTypingBubble();

    const timeout = setTimeout(() => {
      if (!cancelled) {
        typeMessage("Hello! How can I assist you today?");
      }
    }, 500);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
      clearTimeout(typingTimeoutRef.current);
    };
  }, []);

  /** Send user message */
  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = input.trim();
    setInput("");

    // Add user message and ensure typing bubble
    setMessages((prev) => {
      const next = [...prev, { type: "user", text: userMessage }];
      const hasTyping = next.some((m) => m.type === "bot" && m.isTyping);
      return hasTyping
        ? next
        : [...next, { type: "bot", text: "", isTyping: true }];
    });

    try {
      const res = await fetch(apiTrailRemover(API_BASE,API_AI_CHAT), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: userMessage, userId }),
      });

      if (!res.ok) throw new Error("Failed to fetch");

      const json = await res.json();
      const chatMessage = json.ChatMessage ?? "Sorry, no reply.";
      const data = json.Data ?? [];

      clearTimeout(typingTimeoutRef.current);
      typeMessage(chatMessage);
      onData?.(data);
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.type === "bot" && m.isTyping
            ? {
                ...m,
                text: "Sorry, something went wrong. Please try again.",
                isTyping: false,
              }
            : m
        )
      );
      onData?.([]);
    }
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
              } ${msg.isTyping ? "italic opacity-70" : ""}`}
            >
              {msg.isTyping && !msg.text ? (
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-white rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </span>
              ) : (
                msg.text
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="sticky bottom-0 bg-white/10 backdrop-blur-md p-3 border-t border-white/20 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-4 py-3 rounded-full bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-pink-300"
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
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
