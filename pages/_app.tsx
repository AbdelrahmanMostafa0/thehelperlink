// react
import React, { useEffect } from 'react';

// nextjs
import type { AppProps } from 'next/app';
import Script from 'next/script';
import Head from 'next/head';
import { useRouter } from 'next/router';

// global css
import '@styles/globals.css';

import 'flowbite/dist/flowbite.css';

// layout
import Layout from '@src/layout';

// react-toastify
import { ToastContainer } from 'react-toastify';

// i18next
import { appWithTranslation } from 'next-i18next';
import nextI18NextConfig from '../next-i18next.config.js';

// react-query
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';

// hoc
import { withAuth } from '@src/hoc/withAuth';

// google analytics
import * as gtag from '@src/gtag';

function App({ Component, pageProps }: AppProps<{ forceLogout: boolean; dehydratedState: any }>) {
  const queryClient = React.useRef(new QueryClient());
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: any) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    // @ts-ignore
    if (router.pathname === '/_error' || pageProps.statusCode === 404) {
      router.push('/not-found');
    }
  }, [router]);

  return (
    <>
      <Head>
        <meta name="description" content="The Helper Link" />
        <meta name="theme-color" content="#fff" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, maximum-scale=1, width=device-width"
        />
        <link rel="apple-touch-icon" sizes="57x57" href="/fav-icons/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/fav-icons/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/fav-icons/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/fav-icons/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/fav-icons/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/fav-icons/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/fav-icons/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/fav-icons/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/fav-icons/apple-icon-180x180.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/fav-icons/android-icon-192x192.png"
        />
        <link rel="icon" type="image/png" sizes="32x32" href="/fav-icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/fav-icons/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/fav-icons/favicon-16x16.png" />
        <link rel="manifest" href="/fav-icons/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/fav-icons/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" />

        <Script
          strategy="afterInteractive"
          async
          dangerouslySetInnerHTML={{
            __html: `
             window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config',${process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID});
          `,
          }}
        />
        <Script
          strategy="afterInteractive"
          id="google-analytics"
          async
          dangerouslySetInnerHTML={{
            __html: `
             window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', ${process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID_DEV});
          `,
          }}
        />
      </Head>
      <Script
        strategy="afterInteractive"
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID}`}></Script>
      <Script
        strategy="afterInteractive"
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID_DEV}`}
      />

      <QueryClientProvider client={queryClient.current}>
        <Hydrate state={pageProps.dehydratedState}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Hydrate>
      </QueryClientProvider>
      {/* <ToastContainer closeButton={false} /> */}
    </>
  );
}

export default withAuth(appWithTranslation(React.memo(App), nextI18NextConfig));
