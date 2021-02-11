import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useMe } from "../hooks/useMe";
import { HostHome } from "../pages/host/host-home";
import { ListenerHome } from "../pages/listener/listener-home";
import { NotFound } from "../pages/common/404";
import { UserRole } from "../__generated__/globalTypes";
import { Logout } from "../pages/common/logout";

const hostRoutes = [
  {
    path: "/",
    component: <HostHome />,
  },
  {
    path: "/login",
    component: <HostHome />,
  },
  {
    path: "/hosts",
    component: <HostHome />,
  },
  {
    path: "/search",
    component: <HostHome />,
  },
  {
    path: "/podcasts/:id",
    component: <HostHome />,
  },
  {
    path: "/my-profile",
    component: <HostHome />,
  },
];

const listenerRoutes = [
  {
    path: "/",
    component: <ListenerHome />,
  },
  {
    path: "/login",
    component: <ListenerHome />,
  },
  {
    path: "/listeners",
    component: <ListenerHome />,
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
    </Router>
  );
};
