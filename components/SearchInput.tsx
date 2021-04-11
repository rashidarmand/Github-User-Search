import { FC, useEffect, useState } from 'react';
import { Button, InputGroup, InputRightElement, Input, InputGroupProps } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useSearch } from '@lib/search-context';

const SearchInput: FC<{ styles?: InputGroupProps }> = ({ styles }) => {
  const router = useRouter();
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const { searchQuery, setSearchQuery } = useSearch();
  const handleChange = (event) => setSearchQuery(event.target.value);
  const handleClick = () => router.push(`/search/${searchQuery}`);
  const handleKeyUp = (event) => {
    if (searchQuery && event.keyCode === 13) {
      setIsDisabled(true);
      router.push(`/search/${searchQuery}`);
    }
  };
  useEffect(() => {
    router.events.on('routeChangeComplete', () => setIsDisabled(false));
    router.events.on('routeChangeError', () => setIsDisabled(false));
  }, []);

  return (
    <InputGroup size="md" maxWidth="700px" {...styles}>
      <Input
        isDisabled={isDisabled}
        pr="5.5rem"
        type="text"
        placeholder="Search for a github username..."
        value={searchQuery}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
      />
      <InputRightElement width="5rem">
        <Button
          isDisabled={isDisabled}
          h="1.5rem"
          backgroundColor="thisDotCo.red.100"
          size="sm"
          _hover={{}}
          onClick={handleClick}
        >
          Search
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchInput;
