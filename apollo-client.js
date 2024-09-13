import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";
import { getCookie } from "@/utils/cookie";
import { onError } from "@apollo/client/link/error";
import { createApolloProvider } from "@vue/apollo-option";

// Retrieve tokens from cookies
const accessToken = getCookie("access_token");
const refreshToken = getCookie("refresh_token");

// Middleware for attaching tokens to headers
const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
      "x-refresh-token": refreshToken || "",
    },
  });

  return forward(operation);
});

// HTTP link to the GraphQL server
const httpLink = createHttpLink({
  uri: `${import.meta.env.VITE_APP_SERVER_URI}/graphql`,
});

// Error handling for Apollo Client
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

// Apollo Client setup
const apolloClient = new ApolloClient({
  link: ApolloLink.from([errorLink, authMiddleware, httpLink]),
  cache: new InMemoryCache(),
});

// Apollo Provider for Vue
const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
});

export { apolloClient, apolloProvider };
