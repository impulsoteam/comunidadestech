import App, { Container } from 'next/app';
import Head from 'next/head';
import cookies from 'next-cookies';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import { withRouter } from 'next/router';
import 'styles/styles.scss';

import Header from '../components/Header';
import Footer from '../components/Footer';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    const token = cookies(ctx).ctech_token || {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps, token };
  }

  render() {
    const { Component, pageProps, token } = this.props;
    return (
      <Container>
        <ToastContainer />
        <Head>
          <title>Comunidades.tech</title>
        </Head>
        <Header token={token} />
        <Component token={token} {...pageProps} />
        <Footer />
      </Container>
    );
  }
}

export default withRouter(MyApp);
