import React, { Component } from 'react';
import { LinkedIn } from 'react-linkedin-login-oauth2';

import { linkedinLogin } from '../../services/auth';
import styles from './styles';

class Header extends Component {
  handleSuccess = async ({ code }) => {
    await linkedinLogin(code);
  };

  handleFailure = (error) => {
    console.log(error);
  };
  render() {
    const { user = {} } = this.props;
    console.log('header', this.props);
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
                    {user.name ? (
                      <>
                        <button>
                          <a href={'/'}>Home</a>
                        </button>
                        <button>
                          <a href={'/dashboard'}>Dashboard </a>
                        </button>
                        <button>
                          <a href={'/cadastro'}>Cadastro </a>
                        </button>
                        <button>
                          <a>logout </a>
                        </button>
                      </>
                    ) : (
                      <>
                        <button>
                          <a
                            // href={'/cadastro'}
                            onClick={() => console.log(this.props)}
                          >
                            Cadastro{' '}
                          </a>
                        </button>
                        <LinkedIn
                          clientId="771l7h8iwbwuay"
                          onFailure={this.handleFailure}
                          onSuccess={this.handleSuccess}
                          redirectUri="http://localhost:3000/linkedin"
                          scope="r_emailaddress r_liteprofile"
                          renderElement={({ onClick, disabled }) => (
                            <button onClick={onClick} disabled={disabled}>
                              login
                            </button>
                          )}
                        />
                      </>
                    )}

                    {/* <p className="control">
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
                    </p> */}
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
