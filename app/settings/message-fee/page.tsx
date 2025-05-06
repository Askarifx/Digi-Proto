'use client';

import React, { useState, useEffect } from 'react';

export default function MessageFeeSettingsPage() {
  const [messageFee, setMessageFee] = useState<string>('');
  const [dateFee, setDateFee] = useState<string>('');

  useEffect(() => {
    const storedMessageFee = localStorage.getItem('creatorMessageFee');
    const storedDateFee = localStorage.getItem('creatorDateFee');
    if (storedMessageFee && !isNaN(Number(storedMessageFee))) setMessageFee(storedMessageFee);
    if (storedDateFee && !isNaN(Number(storedDateFee))) setDateFee(storedDateFee);
  }, []);

  const handleSave = () => {
    localStorage.setItem('creatorMessageFee', messageFee);
    localStorage.setItem('creatorDateFee', dateFee);
    alert('Fees saved successfully!');
  };

  return (
    <main className="min-h-screen bg-[#1B1B1F] text-white p-6">
      <h1 className="text-2xl font-bold mb-6 text-[#00FFC8]">Set Your Custom Fees</h1>

      <div className="max-w-md space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Message Fee (USD)
          </label>
          <input
            type="number"
            min="0"
            value={messageFee}
            onChange={(e) => setMessageFee(e.target.value)}
            className="w-full px-4 py-2 rounded bg-[#2B2B30] text-white border border-[#444]"
            placeholder="e.g., 5.00"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Video Date Fee (USD)
          </label>
          <input
            type="number"
            min="0"
            value={dateFee}
            onChange={(e) => setDateFee(e.target.value)}
            className="w-full px-4 py-2 rounded bg-[#2B2B30] text-white border border-[#444]"
            placeholder="e.g., 25.00"
          />
        </div>

        <button
          onClick={handleSave}
          className="mt-4 px-4 py-2 bg-[#00FFC8] text-black font-semibold rounded hover:opacity-90"
        >
          Save Fees
        </button>
      </div>
    </main>
  );
}
