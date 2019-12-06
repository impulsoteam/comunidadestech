import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Router from 'next/router';

import styles from './styles';

class Header extends Component {
  logout = () => {
    Cookies.remove('ctech_credentials');
    Router.push('/');
  };
  generateButtons = ({ name, avatar, token, isModerator }) => {
    if (!token)
      return (
        <div className="top-menu">
          <p className="control">
            <a
              className="button is-primary"
              href={`https://www.linkedin.com/oauth/v2/authorization?client_id=${process.env.LINKEDIN_API_KEY}&client_secret=${process.env.LINKEDIN_SECRET_KEY}&redirect_uri=${process.env.LINKEDIN_CALLBACK_URL}&response_type=code&scope=r_liteprofile%20r_emailaddress%20w_member_social`}
            >
              <strong>Login Linkedin</strong>
            </a>
            <a className="button is-primary" href="/auth/google">
              <strong>Login Google</strong>
            </a>
          </p>
          <style jsx>{styles}</style>
        </div>
      );

    return (
      <div className="top-menu">
        <p className="control">
          <a
            className="button is-primary is-hidden-touch"
            href={'/'}
            title="Home"
          >
            <strong>Home</strong>
          </a>
          <a
            className="button is-primary is-hidden-desktop is-small is-hidden-mobile"
            href={'/'}
            title="Home"
          >
            <strong>Home</strong>
          </a>
          {isModerator && (
            <>
              <a
                className="button is-primary is-hidden-touch"
                href={'/dashboard'}
                title="Dashboard"
              >
                <strong>Dashboard</strong>
              </a>
              <a
                className="button is-primary is-hidden-desktop is-small"
                href={'/dashboard'}
                title="Dashboard"
              >
                <strong>Dashboard</strong>
              </a>
            </>
          )}
          <a
            className="button is-primary is-hidden-touch"
            href={'/cadastrar'}
            title="Cadastre uma comunidade"
          >
            <strong>Cadastre uma comunidade</strong>
          </a>
          <a
            className="button is-primary is-hidden-desktop is-small"
            href={'/cadastrar'}
            title="Cadastre uma comunidade"
          >
            <strong>Cadastre</strong>
          </a>
        </p>
        <div className="profile-wrapper">
          <img src={avatar} />
          <p className="is-hidden-mobile">{name.split(' ')[0]}</p>
          <button className="button is-primary is-small" onClick={this.logout}>
            <strong>Logout</strong>
          </button>
        </div>
        <style jsx>{styles}</style>
      </div>
    );
  };

  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="container">
          <div className="container columns is-vcentered is-flex-mobile">
            <div className="navbar-brand column">
              <a className="navbar-item" href="/">
                <img
                  src="/static/ctech-logo.svg"
                  alt="comunidades.tech"
                  className="logo is-hidden-mobile"
                />
                <img
                  src="/static/logo.svg"
                  alt="comunidades.tech"
                  className="logo is-hidden-tablet is-hidden-desktop"
                />
              </a>
            </div>
            <div className="navbar-menu column">
              <div className="navbar-end is-flex-touch">
                <div className="navbar-item">
                  <div className="field is-grouped is-grouped-multiline">
                    {this.generateButtons(this.props.credentials)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <style jsx>{styles}</style>
      </nav>
    );
  }
}

export default Header;
