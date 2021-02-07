import React from "react";
import { Helmet } from "react-helmet-async";
import { Header } from "../components/header";

export const Home = () => {
  return (
    <>
      <Helmet>
        <title>Host | Podcast</title>
      </Helmet>
      <Header />
      <h1>HOME Main</h1>
    </>
  );
};
