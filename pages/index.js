import React from 'react';
import Cookies from 'js-cookie';
import HomeScreen from 'screens/Home';
import Header from 'components/Header/';
import Footer from 'components/Footer/';

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: Cookies.get('ctech_token'),
    };
  }

  render() {
    return (
      <div {...this.props}>
        <Header token={this.state.token} />
        <HomeScreen />
        <Footer />
      </div>
    );
  }
}
