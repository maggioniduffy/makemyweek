import React from "react";

interface Props {
  children?: JSX.Element;
}
const Selector = ({ children }: Props) => {
  return (
    <div className="bg-white h-fit w-fit rounded-xl shadow shadow-xl p-4 flex mt-2 mb-6 flex-col place-items-center">
      {children}
    </div>
  );
};

export default Selector;
