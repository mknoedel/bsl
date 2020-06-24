import React from 'react';
import Head from 'next/head';
import { useEffect } from "react"
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../utils/theme';
import { AppProps } from 'next/app'
// import { AppContext } from 'next/app'
// import App from 'next/app'
// import nextCookie from 'next-cookies' // We can uninstall this if we don't want SS auth. Really small size so leaving it for now.

const MyApp = (props: AppProps) => {
  const { Component, pageProps } = props

  useEffect(() => { 
    // Remove the server-side injected CSS b/c materialJS generates classnames different everytime,
    // so server classnames and client class names will be different. Lickily this is fast.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles?.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, [])
  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </React.Fragment>
  )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   const { ctx } = appContext;
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   // only run on server-side, user should be auth'd if on client-side
//   if (typeof window === 'undefined') {
//     const { tokenName } = nextCookie(ctx);

//     // if a token was found, try to do SSA
//     if (tokenName) {
//       try {
//         const headers: HeadersInit = {
//           'Content-Type': 'application/json',
//            'Authorization': JSON.stringify({ token: tokenName })
//         };
//         const result = await fetch('/api/validate', { headers });
//         return { ...result, ...appProps };
//       } catch (e) {
//         // let exceptions fail silently
//         // could be invalid token, just let client-side deal with that
//       }
//     }
//   }
//   return { ...appProps };
// }

export default MyApp
