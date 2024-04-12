/* src/app/login/page.tsx */

"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const apiLogin = async () => {
    const response = await fetch('/api/login', { // URL relative to the site's domain and not a path in your file system
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Login success:", data);
      // Redirect
      router.push('/dashboard'); 
    } else {
      console.error("Login failed:", await response.text());
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
        <div className="w-5/6 relative mt-20">
          <input
            type="email"
            placeholder="Email"
            className="bg-black mb-4 h-20 w-full rounded-lg text-white px-8 text-lg"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="bg-black mb-4 h-20 w-full rounded-lg text-white px-8 text-lg"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="h-20 w-30 rounded-lg bg-blue-500 text-white px-4 text-lg"
            onClick={apiLogin}
          >
            Login
          </button>
        </div>
      </div>
    </main>
  );
}
