import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';

const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql'
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: 'bearer ' + (process.env.GITHUB_API_TOKEN || '')
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink) as any,
  cache: new InMemoryCache()
});

export default client;
