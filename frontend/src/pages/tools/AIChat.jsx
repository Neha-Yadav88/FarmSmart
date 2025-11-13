import { useState, useRef, useEffect } from "react";
import { HiPaperAirplane, HiSparkles } from "react-icons/hi2";

export default function AIChat() {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "👋 Namaste! I am your AI Farming Assistant. Ask me about crops, soil, pests, weather, or any farming-related questions!",
    },
  ]);

  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // SEND MESSAGE FUNCTION
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = {
      sender: "user",
      text: input.trim(),
    };

    // Add user message instantly
    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInput("");
    setTyping(true);

    try {
      const res = await fetch("http://localhost:5000/api/assistant/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg.text,
          history: newHistory.map((msg) => ({
            role: msg.sender === "user" ? "user" : "assistant",
            text: msg.text,
          })),
        }),
      });

      const data = await res.json();
      setTyping(false);

      // Add AI Response
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: data.reply || "⚠️ No response from AI." },
      ]);
    } catch (err) {
      console.error("AI Error:", err);
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "❌ Server error. Please try again." },
      ]);
    }
  };

  // Quick questions suggestions
  const quickQuestions = [
    "Best crops for sandy soil?",
    "How to control pests naturally?",
    "When to harvest wheat?",
    "Organic fertilizer options"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-4 lg:p-8">
      <div className="max-w-4xl mx-auto h-[85vh] flex flex-col bg-white/80 backdrop-blur-sm rounded-3xl shadow-md border border-white/50 overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-2xl backdrop-blur-sm">
              🤖
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold">AI Farming Assistant</h1>
              <p className="text-green-100 text-sm mt-1">24/7 farming guidance & support</p>
            </div>
            <div className="ml-auto flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-xs">
              <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
              <span>Online</span>
            </div>
          </div>
        </div>

        {/* Quick Questions */}
        {messages.length === 1 && (
          <div className="p-4 border-b border-gray-100">
            <p className="text-sm text-gray-600 mb-3 font-medium">Quick questions you can ask:</p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => setInput(question)}
                  className="bg-green-50 text-green-700 px-3 py-2 rounded-xl text-sm font-medium hover:bg-green-100 transition-all duration-200 border border-green-200 hover:scale-105"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* CHAT AREA */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} items-start gap-3`}
            >
              {/* AI Avatar */}
              {msg.sender === "ai" && (
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-md">
                  AI
                </div>
              )}

              {/* Message Bubble */}
              <div
                className={`max-w-[80%] rounded-2xl p-4 shadow-md transition-all duration-300 ${
                  msg.sender === "user"
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-br-none"
                    : "bg-gray-50 text-gray-800 rounded-bl-none border border-gray-100"
                }`}
              >
                <div className="whitespace-pre-line leading-6 text-sm lg:text-base">
                  {msg.text}
                </div>
                
                {/* Message Time */}
                <div className={`text-xs mt-2 ${
                  msg.sender === "user" ? 'text-green-100' : 'text-gray-500'
                }`}>
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>

              {/* User Avatar */}
              {msg.sender === "user" && (
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-md">
                  You
                </div>
              )}
            </div>
          ))}

          {/* AI TYPING INDICATOR */}
          {typing && (
            <div className="flex justify-start items-start gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white text-sm font-bold shadow-md">
                AI
              </div>
              <div className="bg-gray-50 text-gray-600 px-4 py-3 rounded-2xl rounded-bl-none shadow-md border border-gray-100">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* INPUT BOX */}
        <div className="p-6 border-t border-gray-100 bg-white/50 backdrop-blur-sm">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Ask anything about farming, crops, soil, weather..."
                className="w-full p-4 pr-12 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white shadow-md transition-all duration-300"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <HiSparkles />
              </div>
            </div>

            <button
              onClick={sendMessage}
              disabled={!input.trim() || typing}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-2xl hover:shadow-md transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-md flex items-center justify-center"
            >
              <HiPaperAirplane className="text-xl" />
            </button>
          </div>
          
          {/* Helper Text */}
          <p className="text-xs text-gray-500 text-center mt-3">
            Press Enter to send • Ask about crops, soil, pests, weather, and more
          </p>
        </div>
      </div>
    </div>
  );
}