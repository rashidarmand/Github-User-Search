import { FC, useState, useEffect } from 'react';
import { ButtonProps, useBreakpointValue } from '@chakra-ui/react';
import { Paginator, Container, Previous, Next, PageGroup } from 'chakra-paginator';
import { useRouter } from 'next/router';
import { useScreenSize } from '@lib/screen-size-context';

const Pagination: FC<{ page: number; pageQuantity: number; query: string }> = ({ page, pageQuantity, query }) => {
  const router = useRouter();
  const { smallAndUp } = useScreenSize();
  // react hooks
  const [currentPage, setCurrentPage] = useState<number>(page);
  const [isPaginatorDisabled, setIsPaginatorDisabled] = useState<boolean>(false);
  useEffect(() => {
    router.events.on('routeChangeComplete', () => setIsPaginatorDisabled(false));
    router.events.on('routeChangeError', () => setIsPaginatorDisabled(false));
    return () => {
      router.events.off('routeChangeComplete', () => setIsPaginatorDisabled(false));
      router.events.off('routeChangeError', () => setIsPaginatorDisabled(false));
    };
  }, []);

  // constants
  const outerLimit = 2;
  const innerLimit = 2;

  // styles
  const baseStyles: ButtonProps = {
    minWidth: 7,
    fontSize: 'sm'
  };

  const normalStyles: ButtonProps = {
    ...baseStyles,
    _hover: {
      bg: 'thisDotCo.blue.300'
    },
    bg: 'thisDotCo.blue.100'
  };

  const activeStyles: ButtonProps = {
    ...baseStyles,
    _hover: {
      bg: 'thisDotCo.blue.300'
    },
    bg: 'thisDotCo.red.100'
  };

  const separatorStyles: ButtonProps = {
    w: 7,
    bg: 'thisDotCo.blue.100',
    pointerEvents: 'none'
  };

  const nextAndPreviousStyles: ButtonProps = {
    _hover: {
      bg: 'thisDotCo.blue.300'
    },
    bg: 'thisDotCo.blue.100'
  };

  // handlers
  const handlePageChange = (nextPage: number) => {
    setCurrentPage(nextPage);
    setIsPaginatorDisabled(true);
    router.push(`/search/${query}?page=${nextPage}`);
  };

  return (
    <Paginator
      isDisabled={isPaginatorDisabled}
      activeStyles={activeStyles}
      innerLimit={innerLimit}
      currentPage={currentPage}
      outerLimit={outerLimit}
      normalStyles={normalStyles}
      separatorStyles={separatorStyles}
      pagesQuantity={pageQuantity}
      onPageChange={handlePageChange}
    >
      <Container
        align="center"
        direction={smallAndUp ? 'column' : 'row'}
        gridGap="3"
        justify="space-between"
        w="full"
        p={4}
        wrap="wrap"
      >
        <Previous {...nextAndPreviousStyles}>Previous</Previous>
        <PageGroup isInline align="center" />
        <Next {...nextAndPreviousStyles}>Next</Next>
      </Container>
    </Paginator>
  );
};

export default Pagination;
