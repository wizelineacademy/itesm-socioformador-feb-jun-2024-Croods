// src/app/signup/page.tsx
"use client";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function Signup() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle signing in with GitHub using a popup
  const handleSignInGithub = async (providerId) => {
    const result = await signIn(providerId, {
      callbackUrl: '/dashboard',
      redirect: false,
      windowFeatures: "width=800,height=600"
    });

    if (result?.url) {
      window.open(result.url, 'GitHubLogin', 'width=800,height=600');
    }

    if (result?.error) {
      console.error("Authentication failed:", result.error);
    }
  };

  const handleSignInGoogle = async (providerId) => {
    const result = await signIn(providerId, {
      callbackUrl: '/dashboard',
      redirect: false,
      windowFeatures: "width=800,height=600"
    });

    if (result?.url) {
      window.open(result.url, 'GoogleLogin', 'width=800,height=600');
    }

    if (result?.error) {
      console.error("Authentication failed:", result.error);
    }
  };

  const handleSignInSlack = async (providerId) => {
    const result = await signIn(providerId, {
      callbackUrl: '/dashboard',
      redirect: false,
      windowFeatures: "width=800,height=600"
    });

    if (result?.url) {
      window.open(result.url, 'SlackLogin', 'width=800,height=600');
    }

    if (result?.error) {
      console.error("Authentication failed:", result.error);
    }
  }

  const handleSignInEmail = async () => {
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
      callbackUrl: '/dashboard'
    });
  
    if (result?.url) {
      router.push(result.url);
    }
  
    if (result?.error) {
      console.error("Authentication failed:", result.error);
    }
  };

  return (
    <main className="bg-backgroundLight">
      <div className="mx-auto px-6 max-w-6xl h-screen text-gray-600 flex flex-wrap content-center justify-center">
        <section className="fixed top-0 left-0 right-0 py-3 flex justify-center">
          <Image
            src="/Logo.svg"
            alt="Next.js Logo"
            width={100}
            height={100}
            priority
          />
        </section>
        <div className="mt-20 space-y-4">

          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="flex items-center justify-center w-64 h-16 rounded-lg bg-black text-white px-4"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="flex items-center justify-center w-64 h-16 rounded-lg bg-black text-white px-4"
          />
          <button
            onClick={handleSignInEmail}
            className="flex items-center justify-center w-32 h-10 rounded-lg bg-black text-textGray px-8 text-lg ml-16 " 
          >
            Next
          </button>

          <button
            className="flex items-center justify-center h-16 w-64 rounded-lg bg-black text-textGray px-8 text-lg"
            onClick={() => handleSignInGithub('github')}
          >
            Sign Up with GitHub
          </button>
          <button
            className="flex items-center justify-center h-16 w-64 rounded-lg bg-black text-textGray px-8 text-lg"
            onClick={() => handleSignInGoogle('google')}
          >
            Sign Up with Google
          </button>
          <button
            className="flex items-center justify-center h-16 w-64 rounded-lg bg-black text-textGray px-8 text-lg mt-4"
            onClick={() => handleSignInSlack('slack')}
          >
             Sign Up with Slack
          </button>
        </div>
      </div>
    </main>
  );
}
