"use client"

import Image from "next/image";
import { useState } from "react";
import { useTheme } from "next-themes";


export default function Features() {

    const [newFeature, setNewFeature] = useState<string>("");
    const [featuresList, setFeaturesList] = useState<string[]>(["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5", "Feature 6", "Feature 7", "Feature 8", "Feature 9", "Feature 10"]); 
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

    const addNewFeature = () => {
        if (newFeature.trim() !== "") {
            //featuresList.push(newFeature);
            setFeaturesList([...featuresList, newFeature]);
            setNewFeature(""); // Clear input after adding the feature
        }
    };

    const toggleFeature = (feature: string) => {
        const isSelected = selectedFeatures.includes(feature);
        if (isSelected) {
            setSelectedFeatures(selectedFeatures.filter((item) => item !== feature));
        } else {
            setSelectedFeatures([...selectedFeatures, feature]);
        }
    };

    const { resolvedTheme } = useTheme();

    return (
        <main className="flex bg-backgroundLight dark:bg-backgroundDark">
            <div className="mx-auto px-6 max-w-6xl h-screen text-gray-600 flex flex-wrap content-center justify-start flex-col">
                <section className="relative top-0 left-0 right-0 py-3 flex justify-center">
                <Image
                    className="relative top-0 left-0 right-0"
                    src={resolvedTheme === "light" ? "/Logo.svg" : "/LogoDark.svg"}
                    alt="KnowX Logo"
                    width={50}
                    height={50}
                    priority
                />
                </section>

                <div className="w-full relative p-14 snap-start">
                    <h1 className="text-5xl text-center text-black dark:text-white">Select your Favorites</h1>
                </div>

                <div className="scrollable-list items-center justify-center p-3">
                    <ul className="grid grid-cols-2 flex-wrap gap-8">
                        {featuresList.map((feature, index) => (
                            <button
                                key={index}
                                className={`text-xl rounded-xl py-3 px-8 text-wrap text-ellipsis overflow-hidden ${
                                    selectedFeatures.includes(feature)
                                        ? "bg-zinc-400 text-white dark:text-black"
                                        : "hover:bg-zinc-600 bg-backgroundDark dark:bg-backgroundLight text-white dark:text-black"
                                }`}
                                onClick={() => toggleFeature(feature)}
                            >
                                {feature}
                            </button>
                        ))}
                    </ul>
                </div>

                <div className="flex mt-5 w-full items-center justify-center ">
                    <input
                        name=""
                        className="bg-black dark:bg-backgroundLight rounded-lg text-white dark:text-black text-base py-3 text-center"
                        onChange={(e) => setNewFeature(e.target.value)}
                        value={newFeature}
                    ></input>
                    <button className="text-black dark:text-white text-4xl pl-4 pr-1" onClick={addNewFeature}>
                        +
                    </button>
                </div>
                

            </div>
        </main>

    )
}