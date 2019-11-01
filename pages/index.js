import React from 'react';
import HomeScreen from 'screens/Home';
import Header from 'components/Header/';
import Footer from 'components/Footer/';
import { authInitialProps } from '../services/auth';

export default function Index(props) {
  console.log('index', props);
  return (
    <div {...props}>
      <Header />
      <HomeScreen />
      <Footer />
    </div>
  );
}

Index.getInitialProps = authInitialProps();
