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
  const handleSignInGithub = async (providerId: string) => {
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

  const handleSignInGoogle = async (providerId: string) => {
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

  const handleSignInSlack = async (providerId: string) => {
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
        <section className="w-full top-10 flex justify-center mb-10 absolute">
          <Image
            src="/Logo.svg"
            alt="Next.js Logo"
            width={100}
            height={100}
            priority
          />
        </section>
        <div className="flex-col flex items-center justify-center space-y-15 bg-white p-8 rounded-[25px] mt-20">
          <div className="flex-col flex items-center justify-center space-y-4">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="flex items-center justify-center w-64 h-12 rounded-lg bg-backgroundLight shadow-md text-black px-4"
            />
            <button
              onClick={handleSignInEmail}
              className="flex items-center justify-center w-30 h-8 rounded-lg shadow text-black px-8 text-md mb-10 border-[#0000001a] border-2 transition ease-in-out hover:bg-backgroundLight" 
            >
              Sign in
            </button>

          </div>
          <hr className="w-64 border-black mt-10 before:content-['or'] before:text-black before:relative before:-top-3.5 text-center overflow-visible before:px-2 before:bg-white"></hr>
          <div className="flex-col flex items-center justify-center mt-10 space-y-4">

            <button
              className="flex items-center justify-center h-12 w-64 rounded-lg border-2 border-[#0000001a] bg-[#24292f] text-white py-3 px-4 text-lg transition ease-in-out hover:bg-[#24292fcc]"
              onClick={() => handleSignInGithub('github')}
            >
              <img loading="lazy" height="24" width="24" id="provider-logo-dark" src="https://authjs.dev/img/providers/github.svg"></img>
              <span className="grow">Sign in with GitHub</span>
            </button>
            <button
              className="flex items-center justify-center h-12 w-64 rounded-lg border-2 border-[#0000001a] bg-white text-black py-3 px-4 text-lg transition ease-in-out hover:bg-[#ffffffcc]"
              onClick={() => handleSignInGoogle('google')}
            >
              <img loading="lazy" height="24" width="24" id="provider-logo-dark" src="https://authjs.dev/img/providers/google.svg"></img>
              <span className="grow">Sign in with Google</span>
            </button>
            <button
              className="flex items-center justify-center h-12 w-64 rounded-lg border-2 border-[#0000001a] bg-black text-white py-3 px-4 text-lg transition ease-in-out hover:bg-[#000000cc]"
              onClick={() => handleSignInSlack('slack')}
            >
              <img loading="lazy" height="24" width="24" id="provider-logo-dark" src="https://authjs.dev/img/providers/slack.svg"></img>
              <span className="grow">Sign in with Slack</span>
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}
