import { Container } from "@mui/material";
import theme from "../utils/theme";
import { NextPage } from "next";
import { ReactNode } from "react";
import Navbar from "./Navbar";

interface PageProps {
  children: ReactNode;
}
export const Page: NextPage<PageProps> = (props) => {
  return (
    <>
      <Navbar />
      <Container style={{ paddingTop: theme.spacing(1) }}>
        {props.children}
      </Container>
    </>
  );
};
