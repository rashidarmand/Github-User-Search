import Head from 'next/head';
import { Heading, Text, Box, Icon, Center, Stack } from '@chakra-ui/react';
import { FC } from 'react';
import { FaGithubAlt } from 'react-icons/fa';
import SearchInput from '@components/SearchInput';

const Home: FC = () => {
  return (
    <Center h="100vh" maxW="700px" marginX="auto">
      <Head>
        <title>Github User Search</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Stack p="10" backgroundColor="thisDotCo.blue.200" borderRadius="2xl">
        <Heading textAlign="center">
          <Icon as={FaGithubAlt} />
          <Box display="block">Github User Search</Box>
        </Heading>

        <Text textAlign="center" marginY="4">
          Find your favorite github users!
        </Text>

        <SearchInput />
      </Stack>
    </Center>
  );
};

export default Home;
