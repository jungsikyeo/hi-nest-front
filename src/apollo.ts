import {
  ApolloClient,
  InMemoryCache,
  makeVar,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { LS_TOKEN } from "./constants";
import { WebSocketLink } from "@apollo/client/link/ws";

const token = localStorage.getItem(LS_TOKEN);
export const isLoggedInVar = makeVar(Boolean(token));
export const authTokenVar = makeVar(token);

/*
const wsLink = new WebSocketLink({
  uri:
    process.env.NODE_ENV === "production"
      ? "wss://nuber-eats-yjs-backend.herokuapp.com/graphql"
      : "ws://localhost:4000/graphql",
  options: {
    reconnection: true,
    connectionParams: {
      "x-jwt": authTokenVar() || "",
    },
  },
});
 */

const httpLink = createHttpLink({
  uri:
    process.env.NODE_ENV === "production"
      ? "https://nuber-eats-yjs-backend.herokuapp.com/graphql"
      : "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "x-jwt": authTokenVar() || "",
    },
  };
});

export const makeLogout = () => {
  localStorage.removeItem(LS_TOKEN);
  isLoggedInVar(false);
  authTokenVar(null);
};

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLoggedIn: {
            read() {
              return isLoggedInVar();
            },
          },
          token: {
            read() {
              return authTokenVar();
            },
          },
        },
      },
    },
  }),
});
