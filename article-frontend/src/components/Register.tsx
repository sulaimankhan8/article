import { useClerk } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import api from '@/utils/api';

export default function Register() {
  const { openSignUp } = useClerk();
  const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

  // Fetch genres on component mount
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

  // Handle genre selection
  const handleGenreSelect = (genreId: number) => {
    if (selectedGenres.includes(genreId)) {
      setSelectedGenres(selectedGenres.filter((id) => id !== genreId));
    } else {
      if (selectedGenres.length < 2) {
        setSelectedGenres([...selectedGenres, genreId]);
      } else {
        alert('You can only select up to 2 genres.');
      }
    }
  };

  // Handle sign-up with genre selection
  const handleSignUp = async () => {
    if (selectedGenres.length !== 2) {
      alert('Please select exactly 2 genres.');
      return;
    }

    // Open Clerk sign-up modal
    openSignUp({
      afterSignUp: async (user) => {
        try {
          console.log('Clerk user:', user);

          // Save user to the database
          const userResponse = await api.post('/api/users', {
            userId: user.id,
            email: user.emailAddresses[0].emailAddress,
          });
          console.log('User save response:', userResponse.data);
          // Save selected genres for the user
          const genreResponse = await api.post('/api/genres/select', {
            userId: user.id,
            genreIds: selectedGenres,
          });
          console.log('Genre save response:', genreResponse.data);
          alert('Sign-up successful!');
        } catch (error) {
          console.error('Error during sign-up:', error);
          alert('Failed to complete sign-up. Please try again.');
        }
      },
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Sign Up</h2>
      <p className="text-gray-600">Select 2 genres to get started:</p>
      <div className="flex flex-wrap gap-2">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => handleGenreSelect(genre.id)}
            className={`px-4 py-2 rounded ${
              selectedGenres.includes(genre.id)
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {genre.name}
          </button>
        ))}
      </div>
      <button
        onClick={handleSignUp}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Sign Up
      </button>
    </div>
  );
}