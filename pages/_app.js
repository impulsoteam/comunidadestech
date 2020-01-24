import App, { Container } from 'next/app';
import Head from 'next/head';
import cookies from 'next-cookies';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
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

  renderPages() {
    const { Component, pageProps, credentials } = this.props;
    console.log('nome do comp', Component.name);
    console.log('pageProps', pageProps);
    if (Component.name === 'Login' || Component.name === 'w')
      return <Component credentials={credentials} {...pageProps} />;
    return (
      <>
        <Header credentials={credentials} />
        <Component credentials={credentials} {...pageProps} />
        <Footer />
      </>
    );
  }

  render() {
    return (
      <Container>
        <ToastContainer />
        <Head>
          <title>Comunidades.tech</title>
        </Head>
        {this.renderPages()}
      </Container>
    );
  }
}

export default withRouter(MyApp);
