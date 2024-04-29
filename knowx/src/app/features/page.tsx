"use client"

import Image from "next/image";
import { useState } from "react";

export default function Features() {

    const [newFeature, setNewFeature] = useState<string>("");

    return (
        <main className="bg-backgroundLight">
            <div className="mx-auto px-6 max-w-6xl h-screen text-gray-600 flex flex-wrap content-center justify-start flex-col">
                <section className="relative top-0 left-0 right-0 py-3 flex justify-center">
                    <Image
                        className="relative top-0 left-0 right-0"
                        src="/Logo.svg"
                        alt="Next.js Logo"
                        width={100}
                        height={100}
                        priority
                    />
                </section>

                <div className="w-full relative p-14">
                    <h1 className="text-5xl text-center text-black">Select your Favorites</h1>
                </div>

                <div className="flex w-full items-center justify-center p-3">
                    <ul className="grid grid-cols-2 flex-wrap gap-8">
                        
                        <button className="text-2xl bg-black text-white rounded-xl py-4 px-8 text-wrap text-ellipsis overflow-hidden">
                            Feature 1
                        </button>

                        <button className="text-2xl bg-black text-white rounded-xl py-4 px-8 text-wrap text-ellipsis overflow-hidden">
                            Feature 1
                        </button>

                        <button className="text-2xl bg-black text-white rounded-xl py-4 px-8 text-wrap text-ellipsis overflow-hidden">
                            Feature 1
                        </button>

                        <button className="text-2xl bg-black text-white rounded-xl py-4 px-8 text-wrap text-ellipsis overflow-hidden">
                            Feature 1
                        </button>

                        <button className="text-2xl bg-black text-white rounded-xl py-4 px-8 text-wrap text-ellipsis overflow-hidden">
                            Feature 1
                        </button>

                        <button className="text-2xl bg-black text-white rounded-xl py-4 px-8 text-wrap text-ellipsis overflow-hidden">
                            Feature 1
                        </button>

                        <button className="text-2xl bg-black text-white rounded-xl py-4 px-8 text-wrap text-ellipsis overflow-hidden">
                            Feature 1
                        </button>

                        <button className="text-2xl bg-black text-white rounded-xl py-4 px-8 text-wrap text-ellipsis overflow-hidden">
                            Feature 1
                        </button>

                    </ul>
                </div>

                <div className="flex mt-5 w-full items-center justify-center ">
                    <input
                        name=""
                        className="bg-black rounded-lg text-white text-lg py-4 text-center"
                        onChange={(e) => setNewFeature(e.target.value)}
                        value= "Add a new feature..."
                    ></input>
                    <button className="text-black text-4xl px-4"
                        onClick={() => setNewFeature(newFeature)}>
                            +
                    </button>
                </div>
                

            </div>
        </main>

    )
}