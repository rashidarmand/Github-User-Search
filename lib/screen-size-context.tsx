import { createContext, useContext } from 'react';
import { useBreakpointValue } from '@chakra-ui/react';

type ScreenSizes = {
  mediumAndUp: boolean;
  smallAndUp: boolean;
};

const ScreenSizeContext = createContext<ScreenSizes>(null);

export const useScreenSize = () => useContext(ScreenSizeContext);

export const ScreenSizeProvider = ({ children }) => {
  const currentBreakpoint = useBreakpointValue({ md: 'md', sm: 'sm', base: 'sm' });
  const mediumAndUp = currentBreakpoint === 'md';
  const smallAndUp = currentBreakpoint === 'sm';
  return <ScreenSizeContext.Provider value={{ mediumAndUp, smallAndUp }}>{children}</ScreenSizeContext.Provider>;
};
