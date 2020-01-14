import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Router from 'next/router';

import styles from './styles';

class Header extends Component {
  state = { isActive: '' };

  logout = () => {
    Cookies.remove('ctech_credentials');
    Router.push('/');
  };

  handleToggleMenu = () => {
    let isActive = this.state.isActive;
    this.setState({ isActive: isActive ? '' : 'is-active' });
  };

  generateButtons = ({ name, avatar, token, isModerator }) => {
    if (!token)
      return (
        <div
          id="ctech-navbar"
          className={`navbar-menu  ${this.state.isActive}`}
        >
          <div className="navbar-end">
            <a href={'/'} className="navbar-item">
              Home
            </a>
            <a
              href={`https://www.linkedin.com/oauth/v2/authorization?client_id=${process.env.LINKEDIN_API_KEY}&client_secret=${process.env.LINKEDIN_SECRET_KEY}&redirect_uri=${process.env.LINKEDIN_CALLBACK_URL}&response_type=code&scope=r_liteprofile%20r_emailaddress`}
              className="navbar-item is-hidden-desktop"
            >
              Login LinkedIn
            </a>
            <a href="/auth/google" className="navbar-item is-hidden-desktop">
              Login Google
            </a>

            <div className="navbar-item is-hidden-touch">
              <div className="buttons">
                <a
                  href={`https://www.linkedin.com/oauth/v2/authorization?client_id=${process.env.LINKEDIN_API_KEY}&client_secret=${process.env.LINKEDIN_SECRET_KEY}&redirect_uri=${process.env.LINKEDIN_CALLBACK_URL}&response_type=code&scope=r_liteprofile%20r_emailaddress`}
                  className="button is-primary is-outlined"
                >
                  <span className="icon">
                    <i className="fab fa-linkedin-in"></i>
                  </span>
                  <span>Login LinkedIn</span>
                </a>
                <a
                  href="/auth/google"
                  className="button is-primary is-outlined"
                >
                  <span className="icon">
                    <i className="fab fa-google"></i>
                  </span>
                  <span>Login Google</span>
                </a>
              </div>
            </div>
          </div>
          <style jsx>{styles}</style>
        </div>
      );

    return (
      <div id="ctech-navbar" className={`navbar-menu  ${this.state.isActive}`}>
        <div className="navbar-end">
          <a href={'/'} className="navbar-item">
            Home
          </a>

          <div className="navbar-item is-hidden-touch">
            <div className="buttons">
              <a href={'/cadastrar'} className="button is-primary is-outlined">
                <strong>Cadastre uma comunidade</strong>
              </a>
            </div>
          </div>

          <div className="navbar-item has-dropdown is-hoverable is-hidden-touch">
            <a className="navbar-link">
              <img className="profile-image" src={avatar} />
              {name.split(' ')[0]}
            </a>
            <div className="navbar-dropdown">
              <a href={'/dashboard'} className="navbar-item">
                Dashboard
              </a>
              <hr className="navbar-divider" />
              <a onClick={this.logout} className="navbar-item">
                <i className="fas fa-sign-out-alt"></i> Sair
              </a>
            </div>
          </div>
          <a href={'/cadastrar'} className="navbar-item is-hidden-desktop">
            Cadastrar comunidade
          </a>
          <a href={'/dashboard'} className="navbar-item is-hidden-desktop">
            Dashboard
          </a>
          <a onClick={this.logout} className="navbar-item is-hidden-desktop">
            <i className="fas fa-sign-out-alt"></i> Sair
          </a>
        </div>
        <style jsx>{styles}</style>
      </div>
    );
  };

  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <img
              className="navbar-logo"
              src="/static/ctech-logo.svg"
              width="112"
            />
          </a>

          <a
            role="button"
            className={`navbar-burger burger ${this.state.isActive}`}
            aria-label="menu"
            aria-expanded="false"
            data-target="ctech-navbar"
            onClick={this.handleToggleMenu}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        {this.generateButtons(this.props.credentials)}
        <style jsx>{styles}</style>
      </nav>
    );
  }
}

export default Header;
