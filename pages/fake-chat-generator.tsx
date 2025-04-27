// /pages/fake-chat-generator.tsx

import { useState } from "react";
import html2canvas from "html2canvas";
import React from "react";

export default function FakeChatGenerator() {
  const [messages, setMessages] = useState<{ name: string; text: string }[]>([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const addMessage = () => {
    if (!name.trim() || !text.trim()) return;
    setMessages((prev) => [...prev, { name, text }]);
    setText("");
  };

  const downloadChatAsImage = async () => {
    const chatElement = document.getElementById("chat-area");
    if (!chatElement) return;

    const canvas = await html2canvas(chatElement);
    const link = document.createElement("a");
    link.download = "fake_chat.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="min-h-screen p-8 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">Fake Chat Generator</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Character name"
          className="flex-1 p-3 rounded-lg bg-gray-800"
        />
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message (emojis supported!)"
          className="flex-1 p-3 rounded-lg bg-gray-800"
        />
        <button
          onClick={addMessage}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg"
        >
          Add Message
        </button>
      </div>

      <div
        id="chat-area"
        className="bg-gray-800 p-6 rounded-lg min-h-[300px] mb-6 space-y-4"
      >
        {messages.map((msg, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <div className="font-bold text-green-400">{msg.name}:</div>
            <div className="text-white">{msg.text}</div>
          </div>
        ))}
      </div>

      <button
        onClick={downloadChatAsImage}
        disabled={messages.length === 0}
        className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg disabled:opacity-50"
      >
        Download as Image
      </button>
    </div>
  );
}
