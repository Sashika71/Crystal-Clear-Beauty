import { useState, useRef, useEffect } from "react";

const API_URL = "http://localhost:5000";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Welcome to Crystal Clear Beauty! 💕 How can I help you today?",
    },
  ]);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const send = async () => {
    const question = input.trim();
    if (!question || loading) return;

    setMessages((m) => [...m, { role: "user", text: question }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: "bot", text: data.answer || data.error }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "bot", text: "Couldn't connect right now. Please try again shortly." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end font-sans">
      {open && (
        <div
          className={`mb-3 flex flex-col overflow-hidden rounded-3xl border border-pink-200 bg-white shadow-2xl shadow-pink-200/50 transition-all duration-300 ${
            expanded ? "h-[440px] w-[600px]" : "h-[440px] w-80"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-pink-800 px-4 py-4">
            <div>
              <p className="flex items-center gap-1 font-semibold leading-tight text-white">
                ✨ Crystal Clear Assistant
              </p>
              <p className="text-xs text-pink-100">Usually replies within a few minutes</p>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setExpanded((e) => !e)}
                className="rounded-full p-1.5 text-pink-100 transition hover:bg-pink-700 hover:text-white"
                aria-label={expanded ? "Shrink chat" : "Expand chat"}
                title={expanded ? "Shrink" : "Expand"}
              >
                {expanded ? "⤡" : "⤢"}
              </button>
              <button
                onClick={() => setOpen(false)}
                className="rounded-full p-1.5 text-pink-100 transition hover:bg-pink-700 hover:text-white"
                aria-label="Close chat"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-2.5 overflow-y-auto bg-pink-50/40 p-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "ml-auto rounded-br-md bg-pink-800 text-white"
                    : "rounded-bl-md border border-pink-100 bg-white text-gray-700 shadow-sm"
                }`}
              >
                {m.text}
              </div>
            ))}
            {loading && (
              <div className="w-fit rounded-2xl rounded-bl-md border border-pink-100 bg-white px-3.5 py-2.5 text-sm text-pink-300 shadow-sm">
                Typing...
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 border-t border-pink-100 bg-white p-2.5">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask a question..."
              className="flex-1 rounded-full border border-pink-200 bg-white px-4 py-2 text-sm text-gray-700 outline-none placeholder:text-pink-300 focus:border-pink-500"
            />
            <button
              onClick={send}
              disabled={loading}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-pink-800 text-white transition hover:bg-pink-900 disabled:opacity-50"
              aria-label="Send"
            >
              ➤
            </button>
          </div>
        </div>
      )}

      {/* Bubble button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Toggle chat"
        className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-pink-800 text-2xl text-white shadow-lg shadow-pink-300/60 transition hover:scale-105 hover:bg-pink-900"
      >
        {open ? "✕" : "💬"}
      </button>
    </div>
  );
}