import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";
import { createApolloProvider } from "@vue/apollo-option";

const httpLink = createHttpLink({
  uri: `${import.meta.env.VITE_SERVER_URI}/graphql`,
});

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
  onError: (e) => {
    console.error("Apollo client error:", e);
  },
});

const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
});

export { apolloClient, apolloProvider };
