"use client"
import React from "react"
import Image from "next/image"
import { navigateToPhase2 } from "@/app/actions/redirect"
import { Button } from "@nextui-org/react"
import { useState } from "react"
import Header from "@/app/components/Header"

const P1_ResultsWrapper = (props: {
  children: JSX.Element[]
  query: string
}) => {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className=" bg-backgroundLight dark:bg-backgroundDark">
      <Header isDashboard={true}>
        <div className="flex flex-col">
          <div className="relative w-full snap-start p-14">
            <h1 className="text-center text-5xl text-black dark:text-white">
              Choose search items
            </h1>
          </div>
          <div className="pretty-scrollbar h-[20rem] items-center justify-center overflow-y-auto p-3">
            <ul className="grid grid-cols-2 flex-wrap gap-8">
              {props.children}
            </ul>
          </div>
          <Button
            isLoading={isLoading}
            variant="bordered"
            color="default"
            className={`mx-auto my-5 w-[200px] overflow-hidden text-wrap rounded-xl p-5 text-center text-xl font-bold text-black dark:text-white`}
            onClick={() => {
              setIsLoading(true)
              navigateToPhase2(props.query)
            }}
          >
            {/* <div
            className="text-white text-xl font-bold text-center dark:text-black cursor-pointer"
            onClick={() => navigateToPhase2(props.query)}
          > */}
            {isLoading ? "" : "Next"}
          </Button>
        </div>
      </Header>
    </div>
  )
}

export default P1_ResultsWrapper
