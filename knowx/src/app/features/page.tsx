"use client"

import Image from "next/image";
import { useState } from "react";


export default function Features() {

    const [newFeature, setNewFeature] = useState<string>("");
    const [featuresList, setFeaturesList] = useState<string[]>(["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5", "Feature 6", "Feature 7"]); 
    const addNewFeature = () => {
        if (newFeature.trim() !== "") {
            //featuresList.push(newFeature);
            setFeaturesList([...featuresList, newFeature]);
            setNewFeature(""); // Clear input after adding the feature
        }
    };

    return (
        <main className="flex bg-backgroundLight">
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

                <div className="flex w-full items-center justify-center p-3 scroll-smooth">
                    <ul className="grid grid-cols-2 flex-wrap gap-8">
                        {featuresList.map((feature, index) => (
                            <button key={index} className="hover:bg-zinc-600 text-xl bg-black text-white rounded-xl py-3 px-8 text-wrap text-ellipsis overflow-hidden">
                                {feature}
                            </button>
                        ))}
                    </ul>
                </div>

                <div className="flex mt-5 w-full items-center justify-center ">
                    <input
                        name=""
                        className="bg-black rounded-lg text-white text-base py-3 text-center"
                        onChange={(e) => setNewFeature(e.target.value)}
                        value={newFeature}
                    ></input>
                    <button className="text-black text-4xl pl-4 pr-1" onClick={addNewFeature}>
                        +
                    </button>
                </div>
                

            </div>
        </main>

    )
}