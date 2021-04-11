import { useRouter } from 'next/router';
import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

const SearchContext = createContext<{ searchQuery: string; setSearchQuery: Dispatch<SetStateAction<string>> }>(null);

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
  const router = useRouter();
  const { query } = router.query;
  const [searchQuery, setSearchQuery] = useState<string>((query as string) || '');
  return <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>{children}</SearchContext.Provider>;
};
