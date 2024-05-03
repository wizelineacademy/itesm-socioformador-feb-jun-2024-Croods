"use client"

import Image from "next/image";
import { useState } from "react";
import { useTheme } from "next-themes";

// the path is http://localhost:3000/dashboard/phase3
export default function Phase3() {

    const { resolvedTheme } = useTheme();
    const [query, setQuery] = useState<string>("");

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleSidebarToggle = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex h-screen bg-white">
            
            <header>
                <title>Comparacion</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </header>

            <div className="flex flex-col fixed h-full overflow-auto bg-black w-64 rounded-r-3xl items-center justify-start p-10 space-y-4">

                <Image
                className="flex items-center justify-center w-20 h-20"
                src={resolvedTheme === "light" ? "/Logo.svg" : "/LogoDark.svg"}
                alt="KnowX Logo"
                width={50}
                height={50}
                priority
                />

                <h2 className="text-lg font-bold">
                    KnowX
                </h2>

            </div>

            <div className="flex flex-col flex-1 p-6 md:ml-64">
                <div className="flex flex-col text-black sm:ml-64 md:ml-0 space-y-8">

                    <div className="flex items-center justify-center">

                        <input
                            name=""
                            className="bg-black rounded-lg text-gray-400 text-md py-4 w-3/4 h-10 text-center"
                            onChange={(e) => setQuery(e.target.value)}
                            value= "Enter your new search here."
                        ></input>

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

                    <div className="flex flex-col items-center justify-center w-full h-full">

                        <h2 className="text-black w-3/4 font-bold text-2xl">
                            Tools Found
                        </h2>

                        <div className="mt-2 flex overflow-hidden border-4 rounded-3xl border-black w-4/5">
                            <table className="table-auto w-full bg-white">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2">Tool Name</th>
                                        <th className="px-4 py-2">Tool Description</th>
                                        <th className="px-4 py-2">Tool Link</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border px-4 py-2">1</td>
                                        <td className="border px-4 py-2">2</td>
                                        <td className="border px-4 py-2">3</td>
                                    </tr>
                                </tbody>
                            
                            </table>
                        </div>




                    </div>



                </div>
            </div>
        </div>
    );
}