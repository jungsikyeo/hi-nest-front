import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NotFound } from "../pages/404";
import { CreateAccount } from "../pages/create-account";
import { Home } from "../pages/home";
import { Login } from "../pages/login";
import { Footer } from "../components/footer";

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
