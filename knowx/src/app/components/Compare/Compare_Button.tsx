"use client";
import React from "react";
import { Button } from "@nextui-org/react";
import { backToPhase3 } from "@/app/actions/redirect";

export const Compare_Button = () => {
  return (
    <Button
      variant="flat"
      color="success"
      className="w-[200px] rounded-xl my-5 mx-auto p-5"
      onClick={() => backToPhase3()}
    >
      {"Back"}
    </Button>
  );
};
