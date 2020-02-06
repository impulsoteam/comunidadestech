import React, { useState } from 'react'
import { useWindowSize } from 'react-use'

import Cookies from 'js-cookie'
import Router from 'next/router'
import PropTypes from 'prop-types'

import styles from './styles'

const Header = ({ name, avatar, token }) => {
  const [isActive, setIsActive] = useState('')
  const { width } = useWindowSize()
  const isMobile = !(width > 1023)

  const logout = () => {
    Cookies.remove('ctech_credentials')
    Router.push('/')
  }

  const getCreateButton = () => (
    <>
      {!isMobile ? (
        <div className="navbar-item is-hidden-touch">
          <div className="buttons">
            <a
              href={token ? '/cadastrar' : '/sign-in'}
              className="button is-primary is-outlined"
              title="Cadastre uma comunidade"
              rel="noopener noreferrer"
            >
              <strong>Cadastre uma comunidade</strong>
            </a>
            <a
              href="https://github.com/universoimpulso/comunidadestech"
              className="button btn-os"
              target="_blank"
              title="Contribua"
              rel="noopener noreferrer"
            >
              <img
                className="img-os"
                src="/static/github.svg"
                alt="Github"
              />
              <strong>Contribua</strong>
            </a>
          </div>
        </div>
      ) : (
        <div className="is-hidden-desktop">
          <a
            href={token ? '/cadastrar' : '/sign-in'}
            className="navbar-item"
            title="Cadastre uma comunidade"
            rel="noopener noreferrer"
          >
            Cadastre uma comunidade
          </a>
          <a
            href="https://github.com/universoimpulso/comunidadestech"
            className="navbar-item btn-os"
            target="_blank"
            title="Contribua"
            rel="noopener noreferrer"
          >
            <img
              className="img-os"
              src="/static/github.svg"
              alt="Github"
            />
            Contribua
          </a>
        </div>
      )}
      <style jsx>{styles}</style>
    </>
  )

  const generateButtons = () => {
    if (!token) {
      return (
        <div id="ctech-navbar" className={`navbar-menu  ${isActive}`}>
          <div className="navbar-end">
            <a href="/" className="navbar-item" title="Página inicial">
              Home
            </a>
            {getCreateButton()}
            <a
              href="/login"
              className="navbar-item is-hidden-desktop"
              title="Página de Login"
              rel="noopener noreferrer"
            >
              Entrar
            </a>
            <div className="navbar-item is-hidden-touch">
              <div className="buttons">
                <a
                  href="/login"
                  className="button is-primary" t
                  itle="Página de Login"
                  rel="noopener noreferrer"
                >
                  <strong>Entrar</strong>
                </a>
              </div>
            </div>
          </div>
          <style jsx>{styles}</style>
        </div>
      )
    }

    return (
      <div id="ctech-navbar" className={`navbar-menu  ${isActive}`}>
        <div className="navbar-end">
          <a href="/" className="navbar-item" title="Página inicial">
            Home
          </a>
          {getCreateButton()}
          <div className="navbar-item has-dropdown is-hoverable is-hidden-touch">
            <a className="navbar-link">
              <img className="profile-image" src={avatar} />
              {name.split(' ')[0]}
            </a>
            <div className="navbar-dropdown">
              <a href="/dashboard" className="navbar-item" title="Dashboard">
                Dashboard
              </a>
              <hr className="navbar-divider" />
              <a onClick={logout} className="navbar-item" title="Sair">
                <i className="fas fa-sign-out-alt"></i> Sair
              </a>
            </div>
          </div>
          <a href="/dashboard" className="navbar-item is-hidden-desktop" title="Dashboard">
            Dashboard
          </a>
          <a onClick={logout} className="navbar-item is-hidden-desktop" title="Sair">
            <i className="fas fa-sign-out-alt"></i> Sair
          </a>
        </div>
        <style jsx>{styles}</style>
      </div>
    )
  }

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="/" title="Comunidades.tech">
          <img
            className="navbar-logo"
            src="/static/ctech-logo.svg"
            alt="Comunidades.tech"
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
  )
}

Header.propTypes = {
  name: PropTypes.string,
  avatar: PropTypes.string,
  token: PropTypes.string
}

export default Header
