"use client"

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
//console.log(jsonObject.primaryBright);


const finalAnswer = jsonObject.finalAnswer as FinalAnswer;

// the path is http://localhost:3000/dashboard/phase3
export default function Phase3() {

    const { resolvedTheme } = useTheme();
    const [query, setQuery] = useState("");
    //const [softwareList, setSoftwareList] = useState([]);
    //const [selectedFeatureList, setSelectedFeatureList] = useState([]);

    const serviceNames = Object.keys(finalAnswer);

    /*
    serviceNames.slice(0,1).forEach(serviceName => {
        const serviceInfo = finalAnswer[serviceName];
        console.log(`Información de ${serviceName}:`, serviceInfo);
      
        // Si quieres imprimir cada característica:
        Object.entries(serviceInfo).forEach(([featureName, featureValue]) => {
          console.log(`${featureName}: ${featureValue}`);
        });
    });
    */
    const featureNames: string[] = [];

    serviceNames.slice(0,1).forEach(serviceName => {
        const serviceInfo = finalAnswer[serviceName];
      
        // Contador para seguir la cantidad de características encontradas
        let featuresFound = 0;
    
        // Iterar sobre las entradas de cada objeto de información del servicio
        Object.entries(serviceInfo).forEach(([featureName, featureValue]) => {
            // Verificar si la característica actual no es "description" y aún no se han encontrado dos características
            if (featureName !== "Description" && featuresFound < 2) {
                console.log(`${featureName}: ${featureValue}`);
                featureNames.push(featureName);
                featuresFound++;
            }
        });
    });
     
    
    console.log(`prueba2`)

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleSidebarToggle = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };


    return (
        <div className="flex h-screen bg-white border-solid border-4 border-black rounded-2xl">
            
            <header>
                <title>Comparacion</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </header>

            <div className="flex flex-col fixed h-full overflow-auto bg-black w-48 rounded-r-3xl items-center justify-start p-10 space-y-4">

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

            <div className="flex flex-col flex-1 p-6 md:ml-48">
                <div className="flex flex-col text-black sm:ml-48 md:ml-0 space-y-8">

                    <div className="flex items-center justify-center">

                        <input
                            name=""
                            className="bg-black rounded-2xl text-gray-400 text-md py-4 w-3/4 h-10 text-center"
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
                                        <th className="px-4 py-2">{featureNames[0]}</th>
                                        <th className="px-4 py-2">{featureNames[1]}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {serviceNames.map((serviceName, index) => (
                                        <tr key={index}>
                                            <td className="border px-4 py-2">{serviceName}</td>
                                            <td className="border px-4 py-2">{finalAnswer[serviceName][featureNames[0]]}</td>
                                            <td className="border px-4 py-2">{finalAnswer[serviceName][featureNames[1]]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>




                    </div>



                </div>
            </div>
        </div>
    );
}