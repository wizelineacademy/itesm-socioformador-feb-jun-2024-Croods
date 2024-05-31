"use client";
import React from "react";
import Image from "next/image";
import { navigateToPhase2 } from "@/app/actions/redirect";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import Header from "@/app/components/Header";

const P1_ResultsWrapper = (props: {
  children: JSX.Element[];
  query: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    // <div className="flex flex-row gap-4 mt-4 flex-wrap w-full justify-around">
    <div className="flex bg-backgroundLight dark:bg-backgroundDark">
      <div className="mx-auto px-6 max-w-6xl h-screen text-gray-600 flex flex-wrap content-center justify-start flex-col">
        <section className="relative top-0 left-0 right-0 py-3 flex justify-center">
          {/* <Image
            className="relative top-0 left-0 right-0"
            src={"light" === "light" ? "/Logo.svg" : "/LogoDark.svg"}
            alt="KnowX Logo"
            width={50}
            height={50}
            priority
          /> */}

          <Header isDashboard={true} />
        </section>

        <div className="w-full relative p-14 snap-start">
          <h1 className="text-5xl text-center text-black dark:text-white">
            Choose search items
          </h1>
        </div>
        <div className="h-[20rem] overflow-y-auto items-center justify-center p-3 pretty-scrollbar">
          <ul className="grid grid-cols-2 flex-wrap gap-8">{props.children}</ul>
        </div>
        <Button
          isLoading={isLoading}
          variant="bordered"
          color="default"
          className={`w-[200px] text-xl rounded-xl p-5 text-wrap text-black dark:text-white overflow-hidden mx-auto my-5 font-bold text-center`}
          onClick={() => {
            setIsLoading(true);
            navigateToPhase2(props.query);
          }}
        >
          {/* <div
            className="text-white text-xl font-bold text-center dark:text-black cursor-pointer"
            onClick={() => navigateToPhase2(props.query)}
          > */}
          {isLoading ? "" : "Next"}
          {/* </div> */}
        </Button>
      </div>
    </div>
  );
};

export default P1_ResultsWrapper;
