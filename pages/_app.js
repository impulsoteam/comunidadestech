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
    const credentials = cookies(ctx).ctech_credentials || {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps, credentials };
  }

  render() {
    const { Component, pageProps, credentials } = this.props;
    return (
      <Container>
        <ToastContainer />
        <Head>
          <title>Comunidades.tech</title>
        </Head>
        <Header credentials={credentials} />
        <Component credentials={credentials} {...pageProps} />
        <Footer />
      </Container>
    );
  }
}

export default withRouter(MyApp);
