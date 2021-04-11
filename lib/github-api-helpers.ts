import { gql } from '@apollo/client';
import { PageInfo } from './github-graphql-response.interface';

export const getUrl = (query: string, page: string = null) => {
  let output = `https://api.github.com/search/users?q=${query}`;
  if (page) output += `&page=${page}&per_page=10`;
  return output;
};

export const getCursor = (page: number) => {
  const end = (page - 1) * 10;
  const cursor = `cursor:${end}`;
  return Buffer.from(cursor).toString('base64');
};

export const getCurrentPage = (pageInfo: PageInfo) => {
  const { endCursor } = pageInfo;
  if (!endCursor) return 1;
  const cursor = Buffer.from(endCursor, 'base64').toString();
  const end = cursor.match(/\d+/)[0];
  return parseInt(end) / 10;
};

export const getPageQuantity = (count: number) => {
  let output = Math.floor(count / 10);
  if (count % 10 !== 0) output += 1;
  // Github API Limits only allow you to query the first 100 pages
  return output > 100 ? 100 : output;
};

export interface ApolloQueryVariables {
  searchQuery: string;
  cursor?: string;
}

export const APOLLO_QUERY = gql`
  query($searchQuery: String!, $cursor: String) {
    search(type: USER, first: 10, query: $searchQuery, after: $cursor) {
      userCount
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
      nodes {
        __typename
        ... on User {
          bio
          name
          avatarUrl
          company
          createdAt
          email
          location
          login
          url
          websiteUrl
          followers {
            totalCount
          }
          following {
            totalCount
          }
          gists {
            totalCount
          }
          organizations {
            totalCount
          }
          repositories {
            totalCount
          }
          topRepositories(first: 3, orderBy: { field: STARGAZERS, direction: DESC }) {
            nodes {
              name
              url
            }
          }
        }
      }
    }
  }
`;
