'use client'; // Mark as a Client Component

import { useState, useEffect } from 'react';
import api from '@/utils/api';

export default function GenreSelector({ onSelect }: { onSelect: (genreId: number) => void }) {
  const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await api.get('/api/genres');
        setGenres(response.data);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };
    fetchGenres();
  }, []);

  return (
    <div className="flex flex-wrap gap-2">
      {genres.map((genre) => (
        <button
          key={genre.id}
          onClick={() => onSelect(genre.id)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
}