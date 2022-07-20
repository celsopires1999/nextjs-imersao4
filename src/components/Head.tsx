import { NextPage } from "next";
import { default as NextHead } from "next/head";
import { ReactNode } from "react";

interface HeadTitleProps {
  title: string;
  children?: ReactNode;
}
export const Head: NextPage<HeadTitleProps> = (props) => {
  return (
    <NextHead>
      <title>{props.title} - FinCycle</title>
      {props.children}
    </NextHead>
  );
};
