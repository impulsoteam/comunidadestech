import React, { useState } from 'react';
import Cookies from 'js-cookie';
import Router from 'next/router';
import { useWindowSize } from 'react-use';

import styles from './styles';

const Header = ({ name, avatar, token }) => {
  const [isActive, setIsActive] = useState('');
  const { width } = useWindowSize();
  const isMobile = width > 1023 ? false : true;

  const logout = () => {
    Cookies.remove('ctech_credentials');
    Router.push('/');
  };

  const getCreateButton = () => (
    <>
      {!isMobile ? (
        <div className="navbar-item is-hidden-touch">
          <div className="buttons">
            <a
              href={token ? `/cadastrar` : `/sign-in`}
              className="button is-primary is-outlined"
            >
              <strong>Cadastre uma comunidade</strong>
            </a>
          </div>
        </div>
      ) : (
        <a
          href={token ? `/cadastrar` : `/sign-in`}
          className="navbar-item is-hidden-desktop"
        >
          Cadastre uma comunidade
        </a>
      )}
      <style jsx>{styles}</style>
    </>
  );

  const generateButtons = () => {
    if (!token)
      return (
        <div id="ctech-navbar" className={`navbar-menu  ${isActive}`}>
          <div className="navbar-end">
            <a href="/" className="navbar-item">
              Home
            </a>
            {getCreateButton()}
            <a href="/login" className="navbar-item is-hidden-desktop">
              Entrar
            </a>
            <div className="navbar-item is-hidden-touch">
              <div className="buttons">
                <a href="/login" className="button is-primary">
                  <strong>Entrar</strong>
                </a>
              </div>
            </div>
          </div>
          <style jsx>{styles}</style>
        </div>
      );

    return (
      <div id="ctech-navbar" className={`navbar-menu  ${isActive}`}>
        <div className="navbar-end">
          <a href="/" className="navbar-item">
            Home
          </a>
          {getCreateButton()}
          <div className="navbar-item has-dropdown is-hoverable is-hidden-touch">
            <a className="navbar-link">
              <img className="profile-image" src={avatar} />
              {name.split(' ')[0]}
            </a>
            <div className="navbar-dropdown">
              <a href="/dashboard" className="navbar-item">
                Dashboard
              </a>
              <hr className="navbar-divider" />
              <a onClick={logout} className="navbar-item">
                <i className="fas fa-sign-out-alt"></i> Sair
              </a>
            </div>
          </div>
          <a href="/dashboard" className="navbar-item is-hidden-desktop">
            Dashboard
          </a>
          <a onClick={logout} className="navbar-item is-hidden-desktop">
            <i className="fas fa-sign-out-alt"></i> Sair
          </a>
        </div>
        <style jsx>{styles}</style>
      </div>
    );
  };

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
          className={`navbar-burger burger ${isActive}`}
          aria-label="menu"
          aria-expanded="false"
          data-target="ctech-navbar"
          onClick={() => setIsActive(isActive ? '' : 'is-active')}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      {generateButtons()}
      <style jsx>{styles}</style>
    </nav>
  );
};

export default Header;
