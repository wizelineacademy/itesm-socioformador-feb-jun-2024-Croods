import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-backgroundLight">
      <div className="mx-auto px-6 max-w-6xl h-screen text-gray-600 flex flex-wrap content-center justify-center">
        <section className="fixed top-0 left-0 right-0 py-3 flex justify-center">
          <Image
            className="relative top-0 left-0 right-0"
            src="/Logo.png"
            alt="Next.js Logo"
            width={100}
            height={100}
            priority
          />
        </section>
        <input className="bg-black left-20 right-20 h-20 w-5/6 rounded-lg text-white px-8 text-lg"></input>
      </div>
    </main>
  );
}
