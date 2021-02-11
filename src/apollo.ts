import {
  ApolloClient,
  InMemoryCache,
  makeVar,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { LS_TOKEN } from "./constants";

const token = localStorage.getItem(LS_TOKEN);
export const isLoggedInVar = makeVar(Boolean(token));
export const authTokenVar = makeVar(token);

const httpLink = createHttpLink({
  //uri: "https://nuber-eats-yjs-backend.herokuapp.com/graphql"
  uri: "https://7ytk5.sse.codesandbox.io/graphql",
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
