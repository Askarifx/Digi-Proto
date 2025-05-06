// File: app/creator/layout.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

// Creator data type
type Creator = {
    id: string;
    name: string;
    avatar: string;
    bio: string;
    location: string;
    posts: { id: number; image: string; title: string }[];
};

// Simulated mock data
const mockCreators: Record<string, Creator> = {
    jasmine: {
        id: 'jasmine',
        name: 'Jasmine Rivers',
        avatar: '/avatar.jpg',
        bio: 'Fitness coach and lifestyle creator.',
        location: 'Los Angeles, CA',
        posts: [
            { id: 1, image: '/post1.jpg', title: 'Morning Flow' },
            { id: 2, image: '/post2.jpg', title: 'Healthy Meal Prep' }
        ]
    },
    amy: {
        id: 'amy',
        name: 'Amy Chen',
        avatar: '/avatar2.jpg',
        bio: 'Visual artist and storyteller.',
        location: 'New York, NY',
        posts: [
            { id: 1, image: '/art1.jpg', title: 'Color Study' },
            { id: 2, image: '/art2.jpg', title: 'City Reflections' }
        ]
    }
};

export default function CreatorProfilePage() {
    const params = useParams();
    const [creator, setCreator] = useState<Creator | null>(null);
    const [themeColor, setThemeColor] = useState('#bda9c2');

    useEffect(() => {
        const fetchCreator = async () => {
            const idParam = params?.id;
            const creatorId = typeof idParam === 'string' ? idParam : Array.isArray(idParam) ? idParam[0] : 'jasmine';

            const storedColor = localStorage.getItem(`themeColor-${creatorId}`);
            if (storedColor && /^#[0-9A-Fa-f]{6}$/.test(storedColor)) {
                setThemeColor(storedColor);
            }

            const data = mockCreators[creatorId] || null;
            setCreator(data);
        };
        fetchCreator();
    }, [params]);

    if (!creator) {
        return <div className="min-h-screen bg-[#1B1B1F] text-white p-6">Loading...</div>;
    }

    return (
        <main className="min-h-screen bg-[#1B1B1F] text-white p-6">
            <div className="max-w-5xl mx-auto">
                <header className="flex items-center gap-6 mb-10">
                    <img src={creator.avatar} className="w-24 h-24 rounded-full border-4 border-[#444]" alt="Avatar" />
                    <div>
                        <h1 className="text-3xl font-bold" style={{ color: themeColor }}>{creator.name}</h1>
                        <p className="text-gray-400">{creator.bio}</p>
                        <p className="text-sm text-gray-500">📍 {creator.location}</p>
                    </div>
                </header>

                <h2 className="text-xl font-semibold mb-4" style={{ color: themeColor }}>Posts</h2>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {creator.posts.map((post) => (
                        <div key={post.id} className="bg-[#26262C] rounded-lg overflow-hidden shadow hover:scale-[1.02] transition-transform">
                            <img src={post.image} alt={post.title} className="w-full h-40 object-cover" />
                            <div className="p-3">
                                <p className="text-white font-semibold text-sm">{post.title}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
// Global layout with sidebar