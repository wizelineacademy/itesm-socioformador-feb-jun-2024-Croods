"use client"
import React from "react"
import { navigateToPhase2 } from "@/app/actions/redirect"
import Header from "@/app/components/Header"

const P1_ResultsWrapper = (props: {
  children: JSX.Element[]
  query: string
}) => {
  return (
    <div className="bg-backgroundLight dark:bg-backgroundDark">
      <Header isDashboard={true}>
        <div className="flex flex-col items-center justify-center text-center">
          <div className="relative w-full snap-start pb-14">
            <h1 className="text-center text-5xl text-black dark:text-white">
              Choose search items
            </h1>
          </div>
          <div className="pretty-scrollbar h-[20rem] items-center justify-center overflow-y-auto p-3">
            <ul className="grid grid-cols-2 flex-wrap gap-8">
              {props.children}
            </ul>
          </div>
          <div
            className={`mx-auto mt-5 w-[200px] overflow-hidden text-ellipsis text-wrap rounded-xl bg-black px-3 py-3 text-xl transition duration-100 ease-in-out hover:bg-purple-300 dark:bg-backgroundLight dark:text-black`}
          >
            <button
              className="cursor-pointer text-center text-xl font-bold text-white dark:text-black"
              onClick={() => navigateToPhase2(props.query)}
              onKeyDown={() => navigateToPhase2(props.query)}
            >
              Search
            </button>
          </div>
        </div>
      </Header>
    </div>
  )
}

export default P1_ResultsWrapper
