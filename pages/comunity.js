import React, { Component } from 'react';

import Header from 'components/Header/';
import Footer from 'components/Footer/';
import ComunityScreen from 'screens/Comunity';

class Index extends Component {
  render() {
    return (
      <>
        <Header />
        <ComunityScreen />
        <Footer />
      </>
    );
  }
}

export default Index;
