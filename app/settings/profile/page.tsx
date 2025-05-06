'use client';

import React, { useEffect, useState } from 'react';

export default function ProfileSettingsPage() {
  const [username, setUsername] = useState('');
  const [color, setColor] = useState('#00FFC8');

  useEffect(() => {
    const savedName = localStorage.getItem('profileUsername');
    const savedColor = localStorage.getItem('profileColor');
    if (savedName) setUsername(savedName);
    if (savedColor && /^#[0-9A-Fa-f]{6}$/.test(savedColor)) {
      setColor(savedColor);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('profileUsername', username);
    localStorage.setItem('profileColor', color);
    alert('Profile settings saved!');
  };

  return (
    <main className="min-h-screen bg-[#1B1B1F] text-white p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>

      <div className="max-w-md space-y-6">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-300">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 rounded bg-[#2B2B30] text-white border border-[#444]"
            placeholder="Enter your username"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-300">Profile Theme Color</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-16 h-10 rounded border border-[#444] bg-transparent"
          />
        </div>

        <button
          onClick={handleSave}
          className="px-4 py-2 bg-[#00FFC8] text-black font-semibold rounded hover:opacity-90"
        >
          Save Changes
        </button>
      </div>
    </main>
  );
}