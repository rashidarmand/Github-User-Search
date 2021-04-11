import { ChakraProvider } from '@chakra-ui/react';
import { css, Global } from '@emotion/react';
import theme from '@lib/theme';
import type { AppProps } from 'next/app';
import { FC } from 'react';
import { SearchProvider } from '@lib/search-context';
import { ScreenSizeProvider } from '@lib/screen-size-context';
import NProgress from 'nprogress';
import Router from 'next/router';
import 'nprogress/nprogress.css';

NProgress.configure({
  minimum: 0.3,
  easing: 'ease',
  speed: 800,
  showSpinner: true
});

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <ScreenSizeProvider>
        <SearchProvider>
          <Global
            styles={css`
              html {
                min-width: 320px;
                scroll-behavior: smooth;
              }
              #__next {
                display: flex;
                flex-direction: column;
                min-height: 100vh;
                background-color: #061427;
                color: white;
              }
            `}
          />
          <Component {...pageProps} />
        </SearchProvider>
      </ScreenSizeProvider>
    </ChakraProvider>
  );
};

export default MyApp;
