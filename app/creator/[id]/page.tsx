'use client';

import React, { useState, useEffect } from 'react';

export default function MessagesPage() {
  const [themeColor, setThemeColor] = useState('#D4AF37');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'You', content: 'Hey! Excited to chat with you!' },
    { id: 2, sender: 'Amy', content: 'Same here! 😊' },
    { id: 3, sender: 'You', content: 'When are you free to video call?' }
  ]);

  useEffect(() => {
    const storedColor = localStorage.getItem('profileColor');
    if (storedColor && /^#[0-9A-Fa-f]{6}$/.test(storedColor)) {
      setThemeColor(storedColor);
    }
  }, []);

  const [creatorPrompt, setCreatorPrompt] = useState('');

  useEffect(() => {
    const prompt = localStorage.getItem('creatorPrompt');
    if (prompt) setCreatorPrompt(prompt);
  }, []);

  return (
    <main className="min-h-screen bg-[#1B1B1F] text-white p-6">
      <h1 className="text-2xl font-bold mb-6" style={{ color: themeColor }}>
        Messages
      </h1>

      <div className="space-y-4 max-w-xl mx-auto">
        {creatorPrompt && (
          <div className="p-4 bg-[#2B2B30] rounded-lg text-sm text-white shadow border border-[#444]">
            <p className="italic">{creatorPrompt}</p>
          </div>
        )}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-4 rounded-lg shadow ${
              msg.sender === 'You'
                ? 'text-black self-end'
                : 'text-white self-start bg-[#333]'
            }`}
            style={{
              backgroundColor: msg.sender === 'You' ? themeColor : undefined
            }}
          >
            <p className="text-sm opacity-70">{msg.sender}</p>
            <p className="font-medium">{msg.content}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
