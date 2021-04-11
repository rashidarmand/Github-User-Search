import { FC } from 'react';
import { Flex, Icon, Link } from '@chakra-ui/react';
import SearchInput from '@components/SearchInput';
import { FaHome } from 'react-icons/fa';
import NextLink from 'next/link';
const Navigation: FC = () => {
  const searchInputStyles = {
    maxWidth: '350px'
  };
  return (
    <Flex p="6" backgroundColor="thisDotCo.blue.200" alignItems="center">
      <NextLink href="/">
        <Link>
          <Icon w={8} h={8} marginRight="5" as={FaHome} />
        </Link>
      </NextLink>
      <SearchInput styles={searchInputStyles} />
    </Flex>
  );
};

export default Navigation;
