import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, Fragment } from 'react';
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Head from 'next/head';
import theme from '../theme';
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { wrapper } from '../redux/store';
import { Layout } from '../components/Layout';
import { ThemeProvider, createTheme } from '@mui/material/styles';
function MyApp({ Component, pageProps }: AppProps) {
  console.log("🚀 ~ file: _app.tsx ~ line 13 ~ MyApp ~ pageProps", pageProps)
  console.log("🚀 ~ file: _app.tsx ~ line 13 ~ MyApp ~ Component", Component)
  return <Fragment>
    <Head>
      <meta name="theme-color" content={theme.palette.primary.main} />
      <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      <link rel="icon" href="/favicon.ico" />
      <title>My App</title>
    </Head>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Component {...pageProps} />
        <ToastContainer />
      </Layout>
    </ThemeProvider>
  </Fragment>
}


export default wrapper.withRedux(MyApp);
