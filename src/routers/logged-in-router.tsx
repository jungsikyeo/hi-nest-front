import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import { Header } from "../components/header";
import { useMe } from "../hooks/useMe";
import { Hosts } from "../pages/client/hosts";
import { Listeners } from "../pages/client/listeners";

const ClientRoutes = [
  <Route path="/hosts" exact>
    <Hosts />
  </Route>,
  <Route path="/listeners" exact>
    <Listeners />
  </Route>
];

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();
  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">Loading...</span>
      </div>
    );
  }
  return (
    <Router>
      <Header />
      <Switch>
        {data.me.role === "Listener" && ClientRoutes}
        <Redirect to="/listeners" />
        {data.me.role === "Host" && ClientRoutes}
        <Redirect to="/hosts" />
      </Switch>
    </Router>
  );
};
