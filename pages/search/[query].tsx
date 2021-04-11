import { FC } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import apolloClient from '@lib/apollo-client';
import {
  ApolloQueryVariables,
  APOLLO_QUERY,
  getCurrentPage,
  getPageQuantity,
  getCursor
} from '@lib/github-api-helpers';
import { Center, Heading, Divider, Text, Stack, Box } from '@chakra-ui/react';
import SearchResultsList from '@components/SearchResultsList';
import Pagination from '@components/Pagination';
import Navigation from '@components/Navigation';
import { formatNumber } from '@utils/helpers';
import { GithubGraphqlResponse } from '@lib/github-graphql-response.interface';
import { useScreenSize } from '@lib/screen-size-context';

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { query, page } = context.query;

    let variables: ApolloQueryVariables = { searchQuery: query as string };
    if (page && parseInt(page as string) > 1) {
      const cursor = getCursor(parseInt(page as string));
      variables = { ...variables, cursor };
    }
    const results = await apolloClient.query({ query: APOLLO_QUERY, variables });

    return {
      props: { results }
    };
  } catch (err) {
    return {
      props: {
        error: err?.message
      }
    };
  }
};

const SearchTerm: FC<{ results: GithubGraphqlResponse; error?: string }> = ({ results, error }) => {
  if (error) {
    return (
      <Center h="100vh">
        <Heading mt="4" textAlign="center">
          An Error Occured: {error}
        </Heading>
      </Center>
    );
  }
  const { nodes, pageInfo, userCount } = results?.data.search;
  const router = useRouter();
  const searchQuery = router.query.query as string;
  const currentPage = getCurrentPage(pageInfo);
  const pageQuantity = getPageQuantity(userCount);
  const { smallAndUp } = useScreenSize();
  return (
    <Stack>
      <Navigation />
      <Center
        borderRadius="3xl"
        flexGrow={1}
        flexDir="column"
        maxW="900px"
        width="100%"
        margin="2rem auto !important"
        px={smallAndUp ? '4' : '10'}
        paddingBottom="18"
        backgroundColor="thisDotCo.blue.200"
      >
        <Heading mt="4" textAlign="center">
          {formatNumber(userCount)} results found for "{searchQuery}"
          {pageQuantity > 1 && (
            <Text fontSize="xl">
              Page{' '}
              <Box as="span" color="thisDotCo.red.100">
                {currentPage}
              </Box>{' '}
              of {pageQuantity}
            </Text>
          )}
        </Heading>

        <Divider marginBottom="7" marginTop="4" />

        <SearchResultsList nodes={nodes} />

        {userCount > 10 && <Pagination page={currentPage} pageQuantity={pageQuantity} query={searchQuery} />}
      </Center>
    </Stack>
  );
};

export default SearchTerm;
