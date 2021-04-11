import { FC } from 'react';
import SearchResult from './SearchResult';
import { List } from '@chakra-ui/react';
import { SearchNode } from '@lib/github-graphql-response.interface';

const SearchResultsList: FC<{ nodes: SearchNode[] }> = ({ nodes }) => {
  return (
    <List spacing="5" paddingBottom="5" width="100%">
      {nodes.map((node) => (
        <SearchResult key={node.login} node={node} />
      ))}
    </List>
  );
};

export default SearchResultsList;
