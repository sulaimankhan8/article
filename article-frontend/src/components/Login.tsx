import { useClerk } from '@clerk/nextjs';

export default function Login() {
  const { openSignIn } = useClerk();

  return (
    <button
      onClick={() => openSignIn()}
      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
    >
      Sign In
    </button>
  );
}