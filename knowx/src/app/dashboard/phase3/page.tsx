"use client"

// the path is http://localhost:3000/dashboard/phase3

import Image from "next/image";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

interface ServiceDetails {
    [key: string]: string;
}

interface FinalAnswer {
    [key: string]: ServiceDetails;
}
import jsonObject from './ejemplo.json';

const finalAnswer = jsonObject.finalAnswer as FinalAnswer;

export default function Phase3() {
    const { resolvedTheme } = useTheme();
    const [query, setQuery] = useState("");
    const [selectedSoftwareList, setSelectedSoftwareList] = useState<string[]>([]);

    const serviceNames = Object.keys(finalAnswer);
    const featureNames: string[] = [];

    serviceNames.slice(0,1).forEach(serviceName => {
        const serviceInfo = finalAnswer[serviceName];
        let featuresFound = 0;

        Object.entries(serviceInfo).forEach(([featureName, featureValue]) => {
            if (featureName !== "Description" && featuresFound < 2) {
                featureNames.push(featureName);
                featuresFound++;
            }
        });
    });

    const handleRowClick = (serviceName: string) => {
        setSelectedSoftwareList(prevList =>
            prevList.includes(serviceName)
                ? prevList.filter(name => name !== serviceName)
                : [...prevList, serviceName]
        );
    };

    return (
        <div className="flex flex-col flex-1 bg-backgroundLight rounded-xl h-screen">

            <div className="bg-gray-400 m-2">
                Here goes the header
            </div>
            
            <div className="flex flex-col space-y-8 m-5">
                <div className="flex items-center justify-center">
                    <input
                        name=""
                        className="bg-black rounded-2xl text-white text-md py-4 w-3/4 h-10 text-center shadow-lg"
                        onChange={(e) => setQuery(e.target.value)}
                        value="Enter your new search here..."
                    />
                    <button className="text-black text-4xl px-4">
                        <Image
                            className="relative top-0 left-0 right-0 text-black"
                            src="/arrow-right.svg"
                            alt="Search Arrow Right"
                            width={25}
                            height={20}
                            priority
                        />
                    </button>
                </div>

                <div className="flex flex-col items-center justify-center w-full h-full text-black ">
                    <div className="mt-5 flex overflow-hidden border-4 rounded-3xl border-black w-4/5 shadow-xl overflow-y-scroll no-scrollbar h-[25rem]">

                        <table className="table-auto w-full bg-white shadow-md">

                            <thead className="sticky top-0 bg-white">
                                <tr>
                                    <th className="px-8 py-4">Tool Name</th>
                                    <th className="px-8 py-4">{featureNames[0]}</th>
                                    <th className="px-8 py-4">{featureNames[1]}</th>
                                </tr>
                            </thead>

                            <tbody className="border-2">
                                {serviceNames.map((serviceName, index) => (
                                    <tr
                                        key={index}
                                        onClick={() => handleRowClick(serviceName)}
                                        className={`cursor-pointer ${selectedSoftwareList.includes(serviceName) ? 'bg-backgroundLight bg-opacity-30' : ''} text-center border-2`}
                                    >
                                        <td className="px-8 py-4">{serviceName}</td>
                                        <td className="px-8 py-4">{finalAnswer[serviceName][featureNames[0]]}</td>
                                        <td className="px-8 py-4">{finalAnswer[serviceName][featureNames[1]]}</td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>

                    <button className="bg-black text-white rounded-3xl m-8 py-2 px-8 hover:bg-neutral-800 border-2 border-black shadow-lg">
                        Compare
                    </button>

                </div>
            </div>
        </div>
    );
}
