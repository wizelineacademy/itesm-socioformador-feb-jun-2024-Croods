"use client";
import React from "react";

import { Button } from "@nextui-org/react";
import { navigateToCompare } from "@/app/actions/redirect";

const P3_CompareButton = () => {
  return (
    <Button
      variant="flat"
      color="success"
      className="w-[200px] rounded-xl my-5 mx-auto p-5"
      onClick={() => navigateToCompare()}
    >
      Compare
    </Button>
  );
};

export default P3_CompareButton;
