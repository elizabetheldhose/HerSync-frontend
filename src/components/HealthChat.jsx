import { useState, useEffect, useRef } from "react";
import API from "../services/api";

export default function HealthChat({ initialInsight }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Add AI initial message after save
  useEffect(() => {
    if (initialInsight) {
      setMessages([
        {
          sender: "ai",
          text: initialInsight,
        },
        {
          sender: "ai",
          text: "Would you like to know more about this?",
        },
      ]);
    }
  }, [initialInsight]);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await API.post("/chat", {
        message: input,
        history: messages,
      });

      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: res.data.reply },
      ]);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm
shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-rose-100 flex flex-col h-[500px]">

      {/* Header */}
      <div className="p-4 border-b border-rose-100 bg-gradient-to-r from-rose-400 to-pink-400 text-white rounded-t-3xl">
        <h2 className="font-semibold text-lg">AI Wellness Assistant</h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-rose-50">

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs px-4 py-3 rounded-2xl text-sm shadow-sm ${
                msg.sender === "user"
                  ? "bg-pink-500 text-white rounded-br-none"
                  : "bg-white text-gray-700 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white px-4 py-2 rounded-xl text-sm shadow-sm">
              Typing...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-rose-100 flex gap-3">
        <input
          type="text"
          placeholder="Ask something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border border-rose-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
        />
        <button
          onClick={sendMessage}
          className="bg-pink-500 text-white px-5 py-2 rounded-xl hover:bg-pink-600 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}
