import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    thisDotCo: {
      blue: {
        100: '#122641',
        200: '#0B1A2F',
        300: '#061427'
      },
      red: {
        100: '#E35854'
      }
    }
  },
  fonts: {
    heading: "'Nunito Sans', sans-serif",
    body: "'Lato', sans-serif"
  },
  fontWeights: {
    normal: 400,
    medium: 600,
    bold: 700
  }
});

export default theme;
