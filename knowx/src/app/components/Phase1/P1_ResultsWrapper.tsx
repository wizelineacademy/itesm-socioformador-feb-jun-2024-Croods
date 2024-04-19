import React from "react";

const P1_ResultsWrapper = (props: { children: JSX.Element[] }) => {
  return (
    <div className="flex flex-row gap-4 mt-4 flex-wrap w-full justify-around">
      {props.children}
    </div>
  );
};

export default P1_ResultsWrapper;
