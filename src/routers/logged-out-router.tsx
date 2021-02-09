import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NotFound } from "../pages/common/404";
import { CreateAccount } from "../pages/common/create-account";
import { Home } from "../pages/common/home";
import { Login } from "../pages/common/login";

const commonRoutes = [
  {
    path: "/",
    component: <Home />,
  },
  {
    path: "/login",
    component: <Login />,
  },
  {
    path: "/create-account",
    component: <CreateAccount />,
  },
];

export const LoggedOutRouter = () => {
  return (
    <Router>
      <Switch>
        {commonRoutes.map((route) => (
          <Route exact key={route.path} path={route.path}>
            {route.component}
          </Route>
        ))}
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};
