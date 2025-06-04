'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser } from '../lib/actions';

export default function SignupForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const result = await registerUser({ name, email, password });
    if (result.success) {
      router.push('/login');
    } else {
      setError(result.message || 'Signup failed');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <h1 className="mb-3 text-2xl">Sign Up</h1>
      <div>
        <label htmlFor="name" className="block text-xs font-medium">Name</label>
        <input id="name" name="name" type="text" required className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm" />
      </div>
      <div>
        <label htmlFor="email" className="block text-xs font-medium">Email</label>
        <input id="email" name="email" type="email" required className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm" />
      </div>
      <div>
        <label htmlFor="password" className="block text-xs font-medium">Password</label>
        <input id="password" name="password" type="password" minLength={6} required className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm" />
      </div>
      <button type="submit" className="mt-4 w-full bg-blue-600 text-white py-2 rounded">Sign Up</button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
}