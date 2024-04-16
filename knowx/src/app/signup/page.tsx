// src/app/signup/page.tsx
"use client";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react'; // Import signIn function

export default function Signup() {
  const router = useRouter();

  // Function to handle signing in with GitHub using a popup
  const handleSignIn = async (providerId) => {
    const result = await signIn(providerId, { 
      callbackUrl: '/dashboard', 
      redirect: false, // Prevent redirection
      windowFeatures: "width=800,height=600" // Use popup for authentication
    });

    if (result?.url) {
      // Open GitHub login in a popup window
      window.open(result.url, 'GitHubLogin', 'width=800,height=600');
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
        <div className="w-5/6 relative mt-20">
          <button
            className="h-20 w-full rounded-lg bg-blue-500 text-white px-4 text-lg"
            onClick={() => handleSignIn('github')}
          >
            Sign Up with GitHub
          </button>
        </div>
      </div>
    </main>
  );
}
