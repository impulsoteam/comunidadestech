import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Router from 'next/router';
import GoogleLogin from 'react-google-login';

import styles from './styles';

class Header extends Component {
  handleSuccess = async (code) => {
    console.log('handleSuccess', code);
  };

  handleFailure = (error) => {
    console.log(error);
  };

  logout = () => {
    Cookies.remove('ctech_token');
    Router.push('/');
  };
  generateButtons = ({ name, avatar, email, token }) => {
    if (!token)
      return (
        <>
          <GoogleLogin
            clientId={process.env.GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={(response) => this.handleSuccess(response)}
            onFailure={(response) => this.handleFailure(response)}
          />
          <a
            href={`https://www.linkedin.com/oauth/v2/authorization?client_id=${process.env.LINKEDIN_API_KEY}&client_secret=${process.env.LINKEDIN_SECRET_KEY}&redirect_uri=${process.env.LINKEDIN_CALLBACK_URL}&response_type=code&scope=r_liteprofile%20r_emailaddress%20w_member_social`}
          >
            Login Linkedin
          </a>
        </>
      );

    return (
      <>
        <p>Ola{name}</p>
        <button>
          <a href={'/'}>Home</a>
        </button>
        <button>
          <a href={'/cadastro'}>Cadastro </a>
        </button>
        <button>
          <a href={'/comunidade'}>Comunidade </a>
        </button>
        <p className="control">
          <a
            className="button is-primary"
            href="https://impulsowork.typeform.com/to/uy9Pf9"
            target="_blank"
            rel="noopener"
            title="Cadastre uma comunidade"
          >
            <strong className="is-hidden-mobile">
              Cadastre uma comunidade
            </strong>
            <strong className="is-hidden-tablet is-hidden-desktop">
              Cadastre
            </strong>
          </a>
        </p>
        <button onClick={this.logout}>
          <a>logout </a>
        </button>
      </>
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
                  src="/static/logo.svg"
                  alt="comunidades.tech"
                  className="logo"
                />
              </a>
            </div>
            <div className="navbar-menu column">
              <div className="navbar-end is-flex-touch">
                <div className="navbar-item">
                  <div className="field is-grouped is-grouped-multiline">
                    {this.generateButtons(this.props.token)}
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
