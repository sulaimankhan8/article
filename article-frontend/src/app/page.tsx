'use client';

import { useUser } from '@clerk/nextjs';
import { useState } from 'react';
import GenreSelector from '@/components/GenreSelector';
import ArticleList from '@/components/ArticleList';
import Login from '@/components/Login';
import Register from '@/components/Register';

export default function Home() {
  const { isSignedIn } = useUser();
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);

  if (!isSignedIn) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Article Aggregator</h1>
        <p className="text-gray-600 mb-4">Please sign in to view articles.</p>
        <div className="flex justify-center gap-4">
          <Login />
          <Register />
        </div>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Article Aggregator</h1>
      <GenreSelector onSelect={setSelectedGenre} />
      {selectedGenre && <ArticleList genreId={selectedGenre} />}
    </>
  );
}
