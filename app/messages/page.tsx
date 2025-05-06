// File: app/page.tsx

'use client';

import React, { useState, useEffect } from "react";

export default function HomePage(): JSX.Element {
  const [userType, setUserType] = useState<"creator" | "subscriber" | null>(null);
  const [profileColor, setProfileColor] = useState<string>("#D4AF37");
  const [featuredCreators, setFeaturedCreators] = useState<any[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storedColor = localStorage.getItem("profileColor");
        if (storedColor && /^#[0-9A-Fa-f]{6}$/.test(storedColor.trim())) {
          setProfileColor(storedColor.trim());
        }
      } catch (error) {
        console.error("Failed to retrieve profile color from localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const res = await fetch('/api/creators');
        const data = await res.json();
        setFeaturedCreators(data);
      } catch (error) {
        console.error('Failed to load featured creators:', error);
      }
    };
    fetchCreators();
  }, []);

  const renderDashboardLinks = (links: { href: string; label: string }[]) => (
    <nav className="flex flex-col space-y-4">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="text-[#CCCCCC] hover:text-white text-lg"
        >
          {link.label}
        </a>
      ))}
    </nav>
  );

  return (
    <main className="min-h-screen bg-[#1B1B1F] text-[#EAEAEA] flex">
      {userType && (
        <aside className="w-64 h-screen bg-[#1A1A1D] p-6 border-r border-[#333]">
          <h2
            className="text-2xl font-semibold mb-6"
            style={{ color: userType === "creator" ? profileColor : "#87CEFA" }}
          >
            {userType === "creator" ? "Creator" : "Subscriber"} Menu
          </h2>
          {renderDashboardLinks(
            userType === "creator"
              ? [
                  { href: "/upload", label: "Upload Content" },
                  { href: "/pricing", label: "Pricing" },
                  { href: "/stream", label: "Live Streams" },
                  { href: "/date", label: "Video Dates" },
                  { href: "/earnings", label: "Earnings" },
                  { href: "/settings", label: "Settings" },
                  { href: "/messages", label: "Messages" },
                  { href: "/profile-style", label: "Profile Theme" }
                ]
              : [
                  { href: "/creators", label: "Discover Creators" },
                  { href: "/content", label: "Exclusive Content" },
                  { href: "/livestreams", label: "Live Streams" },
                  { href: "/book-date", label: "Video Dates" },
                  { href: "/billing", label: "Billing" },
                  { href: "/notifications", label: "Notifications" },
                  { href: "/messages", label: "Messages" }
                ]
          )}
        </aside>
      )}

      <section className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-4" style={{ color: profileColor }}>
          Welcome to Digi
        </h1>
        <p className="text-lg mb-6 text-[#C0C0C0]">
          Monetize your content, host live streams, and get paid for video dates — all in one classy, customizable platform.
        </p>

        {!userType && (
          <div className="space-x-4">
            <button
              className="px-4 py-2 rounded-md"
              style={{ backgroundColor: profileColor, color: "#000" }}
              onClick={() => setUserType("creator")}
            >
              I'm a Creator
            </button>
            <button
              className="px-4 py-2 bg-[#87CEFA] text-black rounded-md hover:bg-[#6bbbe6]"
              onClick={() => setUserType("subscriber")}
            >
              I'm a Subscriber
            </button>
          </div>
        )}

        {userType && (
          <p className="text-[#AAAAAA] mt-8">
            Use the sidebar to navigate your dashboard.
          </p>
        )}

        <h2 className="text-3xl font-bold mb-6 text-center">Featured Creators</h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">
          {featuredCreators.map((creator) => (
            <a
              key={creator.id}
              href={`/creator/${creator.id}`}
              className="bg-[#26262C] rounded-lg shadow-md hover:scale-[1.02] transition-transform overflow-hidden"
            >
              <img src={creator.preview} alt={creator.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <div className="flex items-center gap-3">
                  <img src={creator.avatar} alt="avatar" className="w-10 h-10 rounded-full border" />
                  <div>
                    <p className="font-semibold">{creator.name}</p>
                    <p className="text-sm text-gray-400">{creator.bio}</p>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}