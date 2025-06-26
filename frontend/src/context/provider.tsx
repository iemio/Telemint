import React from "react";
import RTQProvider from "./rtq-provider";

interface Props {
  children: React.ReactNode;
}

const Provider = ({ children }: Props) => {
  return <RTQProvider>{children}</RTQProvider>;
};

export default Provider;
