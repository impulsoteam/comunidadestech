import React, { PureComponent } from 'react';
import styles from './styles';
import LoginComponent from '/components/LoginComponent/';
import Router from 'next/router';
import loader from '../../static/comunidades-tech-loader.gif';

export default class Login extends PureComponent {

  render() {
    return (
      <LoginComponent />
    );
  }
}
