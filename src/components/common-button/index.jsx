import React from "react";
import { Button } from "../ui/button";

const CommonButton = ({ onClick, text, type, disabled }) => {
  return (
    <Button
      // className="flex h-11 w-full Sjustify-center items-center px-5  bg-[#4051F3] font-extrabold text-white border-none rounded hover:bg-[#115cbe] hover:text-white "
      className="flex h-11 w-full justify-center items-center px-5 bg-gradient-to-tr from-[#3F3CF3] to-[#48C1F3] font-extrabold text-white border-none rounded hover:from-[#115cbe] hover:to-[#48C1F3] hover:text-white"
      type={type || "button"}
      disabled={disabled || false}
      onClick={onClick || null}
    >
      {text}
    </Button>
  );
};

export default CommonButton;
