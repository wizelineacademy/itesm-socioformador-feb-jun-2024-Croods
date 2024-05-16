"use client";
import React from "react";
import { P1_SearchResultProps } from "../../interfaces";
import { useState } from "react";
import { toggleSearchObject } from "@/app/actions/search";
import { SEARCH_VALUES_KEY } from "@/app/const/cookies";

const P1_SearchResult = (props: P1_SearchResultProps) => {
  return (
    <div
      key={`${props.index}`}
      className={`text-xl rounded-xl py-3 px-8 text-wrap text-ellipsis overflow-hidden ${
        !props.isFavorite
          ? "bg-black hover:bg-purple-300 transition duration-100 ease-in-out"
          : "bg-purple-500 transition duration-100 ease-in-out"
      }`}
      onClick={() => toggleSearchObject(props.content)}
    >
      <div className="text-white text-xl font-bold text-center">
        {props.content}
      </div>
    </div>
  );
};

export default P1_SearchResult;
