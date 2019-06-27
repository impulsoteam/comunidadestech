import React, { Component } from 'react';
import HomeScreen from 'screens/Home';
import Header from 'components/Header/';
import Footer from 'components/Footer/';

class Index extends Component {
  render() {
    return (
      <>
        <Header />
        <HomeScreen />
        <Footer />
      </>
    );
  }
}

export default Index;
