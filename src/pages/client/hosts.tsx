import React from "react";
import { Header } from "../../components/header";
import { Helmet } from "react-helmet-async";

export const Hosts = () => {
  return (
    <>
      <Helmet>
        <title>Host | Podcast</title>
      </Helmet>
      <Header />
      <h1>Host Main</h1>
    </>
  );
};
