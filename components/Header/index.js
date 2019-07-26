import React, { Component } from 'react';
import styles from './styles';

class Header extends Component {
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
            <div clasName="navbar-menu column">
              <div className="navbar-end is-flex-touch">
                <a
                  className="navbar-item is-flex-touch is-vcentered"
                  href="https://github.com/universoimpulso/comunidadestech"
                  target="_blank"
                  rel="noopener"
                >
                  <img
                    src="/static/github.png"
                    alt="Github"
                    className="github  is-vcentered"
                  />
                </a>
                <div className="navbar-item">
                  <div className="field is-grouped is-grouped-multiline">
                    <p className="control">
                      <a
                        className="button is-primary"
                        href="https://impulsowork.typeform.com/to/Ke2sdP"
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
