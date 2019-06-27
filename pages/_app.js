import App, { Container } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { withRouter } from 'next/router';
import 'styles/styles.scss';

class MyApp extends App {
  static async getInitialProps(props) {
    const { Component, ctx } = props;
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx });
    }
    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Head>
          <title>Comunidades.tech</title>
        </Head>
        <Component {...pageProps} />
      </Container>
    );
  }
}

export default withRouter(MyApp);
