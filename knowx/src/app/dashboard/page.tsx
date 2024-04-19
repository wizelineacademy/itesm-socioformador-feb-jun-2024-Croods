/* src/app/dashboard/page.tsx */

import Image from "next/image";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
  const { data: session } = useSession();

  if (!session) {
    redirect('/auth');
  }

  return (
    <main className="bg-backgroundLight">
      <div className="mx-auto px-6 max-w-6xl h-screen text-gray-600 flex flex-wrap content-center justify-center">
        <section className="fixed top-0 left-0 right-0 py-3 flex justify-center">
          <Image
            className="relative top-0 left-0 right-0"
            src="/Logo.svg"
            alt="Next.js Logo"
            width={100}
            height={100}
            priority
          />
        </section>
        <div className="w-5/6 relative">
          <input className="bg-black left-20 right-20 h-20 w-full rounded-lg text-white px-8 text-lg"></input>
          <button className="absolute h-20 w-30 rounded-lg text-gray px-4 text-lg right-0">
            <Image
              className="relative top-0 left-0 right-0"
              src="/arrow-right.svg"
              alt="Search Arrow"
              width={40}
              height={30}
              priority
            />
          </button>
        </div>
      </div>
    </main>
  );
}
