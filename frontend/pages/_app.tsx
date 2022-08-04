import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, Fragment } from 'react';
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Head from 'next/head';
import axios from "axios";
import theme from '../theme';
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { wrapper } from '../redux/store';
import { Layout } from '../components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { getViewerStart } from '../redux/auth/actions';

import { AppState } from '../redux/root-reducer';
function MyApp({ Component, pageProps }: AppProps) {
  const dispatch = useDispatch();
  useEffect(() => {
    setInterval(() => {
      const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null
      if (refreshToken) {
        const ref = async () => {
          const res = await axios.post("http://[::1]:3000/refresh",{refreshToken});
          localStorage.setItem("accessToken", res.data.accessToken);
        }
        ref()
      }

    }, 21600*60*60);
  }, []);
  const { viewer } = useSelector((state: AppState) => state.auth);
  useEffect(() => {
    if (viewer === undefined) {
      dispatch(getViewerStart());
    }
  }, [dispatch, viewer]);
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
