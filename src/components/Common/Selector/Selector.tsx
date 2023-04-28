import React from "react";

interface Props {
  children?: JSX.Element;
}
const Selector = ({ children }: Props) => {
  return (
    <div className="bg-white h-4/6 w-96 rounded-xl shadow shadow-xl p-4 flex flex-col place-items-center overflow-y-auto">
      {children}
    </div>
  );
};

export default Selector;
