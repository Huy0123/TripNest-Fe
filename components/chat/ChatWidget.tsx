"use client";

import React, { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can we help you today?", isUser: false },
  ]);
  const [inputValue, setInputValue] = useState("");

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMsg = { id: Date.now(), text: inputValue, isUser: true };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");

    // Simulate bot response
    setTimeout(() => {
      const botMsg = {
        id: Date.now() + 1,
        text: "Thanks for your message! Our team will get back to you shortly.",
        isUser: false,
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-grey-200 overflow-hidden flex flex-col h-[500px] animate-in slide-in-from-bottom-5 fade-in duration-300">
          {/* Header */}
          <div className="bg-primary-600 p-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Trip Nest Support</h3>
                <p className="text-xs text-primary-100">We're online!</p>
              </div>
            </div>
            <button onClick={toggleOpen} className="p-1 hover:bg-white/10 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-grey-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${
                    msg.isUser
                      ? "bg-primary-600 text-white rounded-br-none"
                      : "bg-white text-grey-800 border border-grey-200 rounded-bl-none shadow-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-grey-100">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 px-4 py-2 rounded-full border border-grey-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="p-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* FAB */}
      <Button
        onClick={toggleOpen}
        className={`h-14 w-14 rounded-full shadow-lg transition-transform duration-300 hover:scale-105 ${
            isOpen ? "bg-grey-800 hover:bg-grey-900" : "bg-primary-600 hover:bg-primary-700" 
        }`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </Button>
    </div>
  );
}
