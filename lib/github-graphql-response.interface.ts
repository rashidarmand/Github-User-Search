export interface GithubGraphqlResponse {
  data: Data;
}

export interface Data {
  search: Search;
}

export interface Search {
  userCount: number;
  pageInfo: PageInfo;
  nodes: SearchNode[];
}

export interface SearchNode {
  __typename: string;
  bio: null | string;
  name: string;
  avatarUrl: string;
  company: null | string;
  createdAt: Date;
  email: string;
  location: null | string;
  login: string;
  url: string;
  websiteUrl: null | string;
  followers: Followers;
  following: Followers;
  gists: Followers;
  organizations: Followers;
  repositories: Followers;
  topRepositories: TopRepositories;
}

export interface Followers {
  totalCount: number;
}

export interface TopRepositories {
  nodes: TopRepositoriesNode[];
}

export interface TopRepositoriesNode {
  name: string;
  url: string;
}

export interface PageInfo {
  startCursor: string;
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
