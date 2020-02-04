import React from 'react'
import { ToastContainer } from 'react-toastify'

import cookies from 'next-cookies'
import App, { Container } from 'next/app'
import Head from 'next/head'
import { withRouter } from 'next/router'

import 'react-toastify/dist/ReactToastify.css'
import 'styles/styles.scss'

import Footer from '../components/Footer'
import Header from '../components/Header'

class MyApp extends App {
  static async getInitialProps ({ Component, ctx }) {
    let pageProps = {}
    const credentials = cookies(ctx).ctech_credentials || {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    return { pageProps, credentials, path: ctx.pathname }
  }

  renderPages() {
    const { Component, pageProps, credentials, path } = this.props;

    if (path === '/login')
      return <Component credentials={credentials} {...pageProps} />;

    if (path === '/_error') {
      return (
        <>
          <Header {...credentials} />
          <Component credentials={credentials} {...pageProps} />
        </>
      );
    }

    return (
      <>
        <Header {...credentials} />
        <Component credentials={credentials} {...pageProps} />
        <Footer />
      </>
    )
  }

  render () {
    return (
      <Container>
        <ToastContainer />
        <Head>
          <title>Comunidades.tech</title>
        </Head>
        {this.renderPages()}
      </Container>
    )
  }
}

export default withRouter(MyApp)
