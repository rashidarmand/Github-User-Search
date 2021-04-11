import { SearchNode } from '@lib/github-graphql-response.interface';
import { FC } from 'react';
import {
  ListItem,
  Box,
  Stack,
  Link,
  OrderedList,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Wrap,
  WrapItem,
  Avatar,
  Heading,
  Text,
  Icon,
  LinkBox,
  LinkOverlay
} from '@chakra-ui/react';
import { FaBuilding } from 'react-icons/fa';
import { MdEmail, MdLocationOn, MdComputer } from 'react-icons/md';
import { IoMdStats } from 'react-icons/io';
import { BiCodeAlt } from 'react-icons/bi';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { formatNumber } from '@utils/helpers';
import { useScreenSize } from '@lib/screen-size-context';
import { getUrl } from '@lib/github-api-helpers';

const SearchResult: FC<{ node: SearchNode }> = ({ node }) => {
  const { mediumAndUp } = useScreenSize();

  return (
    <ListItem backgroundColor="thisDotCo.blue.100" p="5" borderRadius="xl">
      <Stack direction={mediumAndUp ? 'row' : 'column'}>
        <LinkBox
          d="flex"
          flexDirection="column"
          gridGap="2"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          width={mediumAndUp ? '200px' : '100%'}
        >
          <LinkOverlay href={getUrl(node.login)} isExternal>
            <Avatar name={node.name || node.login} src={node.avatarUrl} size="lg" />
          </LinkOverlay>
          {node.name && <Box>{node.name}</Box>}
          {node.location && (
            <Box paddingX="2">
              <Icon as={MdLocationOn} /> {node.location}
            </Box>
          )}
          {node.company && (
            <Box paddingX="2">
              <Icon as={FaBuilding} /> {node.company}
            </Box>
          )}
        </LinkBox>

        <Box
          pl={mediumAndUp ? '4' : '0'}
          pt={!mediumAndUp ? '2' : '0'}
          borderLeft={mediumAndUp ? '1px solid white' : 'none'}
          borderTop={!mediumAndUp ? '1px solid white' : 'none'}
          display="grid"
          alignItems="center"
          marginX="auto !important"
          maxWidth="550px"
          width="100%"
        >
          <Heading size="md">{node.login}</Heading>
          {node.bio && <Text>{node.bio}</Text>}

          <Wrap py="2">
            {node.email && (
              <WrapItem flexGrow={1}>
                <Box>
                  <Icon as={MdEmail} /> {node.email}
                </Box>
              </WrapItem>
            )}
            {node.websiteUrl && (
              <WrapItem flexGrow={1}>
                <Box>
                  <Icon as={MdComputer} /> {node.websiteUrl}
                </Box>
              </WrapItem>
            )}
          </Wrap>

          <Accordion allowToggle allowMultiple>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <Icon as={IoMdStats} mr="2" />
                    Stats
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} backgroundColor="thisDotCo.blue.200">
                <StatGroup>
                  <Stat>
                    <StatLabel>Followers</StatLabel>
                    <StatNumber>{formatNumber(node.followers?.totalCount)}</StatNumber>
                  </Stat>

                  <Stat>
                    <StatLabel>Following</StatLabel>
                    <StatNumber>{formatNumber(node.following?.totalCount)}</StatNumber>
                  </Stat>
                </StatGroup>

                <StatGroup>
                  <Stat>
                    <StatLabel>Organizations</StatLabel>
                    <StatNumber>{formatNumber(node.organizations?.totalCount)}</StatNumber>
                  </Stat>

                  <Stat>
                    <StatLabel>Repositories</StatLabel>
                    <StatNumber>{formatNumber(node.repositories?.totalCount)}</StatNumber>
                  </Stat>
                </StatGroup>

                <StatGroup>
                  <Stat>
                    <StatLabel>Gists</StatLabel>
                    <StatNumber>{formatNumber(node.gists?.totalCount)}</StatNumber>
                  </Stat>
                </StatGroup>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <Icon as={BiCodeAlt} mr="2" />
                    Top Repositories
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} backgroundColor="thisDotCo.blue.200">
                <OrderedList>
                  {node.topRepositories?.nodes.map((trNode) => (
                    <ListItem key={trNode.url}>
                      <Link href={trNode.url} isExternal>
                        {trNode.name} <ExternalLinkIcon mx="2px" />
                      </Link>
                    </ListItem>
                  ))}
                </OrderedList>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>
      </Stack>
    </ListItem>
  );
};

export default SearchResult;
