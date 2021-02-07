import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Footer } from "../components/footer";
import { useMe } from "../hooks/useMe";
import { Hosts } from "../pages/client/hosts";
import { Listeners } from "../pages/client/listeners";
import { NotFound } from "../pages/404";
import { UserRole } from "../__generated__/globalTypes";
import {Logout} from "../pages/logout";

const hostRoutes = [
  {
    path: "/",
    component: <Hosts />,
  },
  {
    path: "/login",
    component: <Hosts />,
  },
  {
    path: "/hosts",
    component: <Hosts />,
  },
];

const listenerRoutes = [
  {
    path: "/",
    component: <Listeners />,
  },
  {
    path: "/login",
    component: <Listeners />,
  },
  {
    path: "/listeners",
    component: <Listeners />,
  },
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
      <Switch>
        {data.me.role === UserRole.Host &&
          hostRoutes.map((route) => (
            <Route exact key={route.path} path={route.path}>
              {route.component}
            </Route>
          ))}
        {data.me.role === UserRole.Listener &&
          listenerRoutes.map((route) => (
            <Route exact key={route.path} path={route.path}>
              {route.component}
            </Route>
          ))}
        <Route path="/logout" exact>
          <Logout />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
};
