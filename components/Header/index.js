import React, { useState } from 'react'

import Cookies from 'js-cookie'
import Router from 'next/router'
import PropTypes from 'prop-types'

import styles from './styles'

const Header = ({ name, avatar, token }) => {
  const [isActive, setIsActive] = useState('')

  const logout = () => {
    Cookies.remove('ctech_credentials')
    Router.push('/')
  }

  const getCreateButton = () => (
    <>
      <div className="navbar-item is-hidden-touch">
        <div className="buttons">
          <a
            href="/"
            className="button btn-dark navbar-item"
            title="Página inicial"
          >
            Home
          </a>
          <a
            href="https://github.com/universoimpulso/comunidadestech"
            className="button btn-dark navbar-item"
            target="_blank"
            title="Contribua"
            rel="noopener noreferrer"
          >
            <img
              className="github-icon"
              src="/static/icons/github.svg"
              alt="Github"
              width="112"
            />
            <strong>Contribua</strong>
          </a>
          <a
            href={token ? '/cadastrar' : '/sign-in'}
            className="button is-primary is-outlined"
            title="Cadastre uma comunidade"
            rel="noopener noreferrer"
          >
            <strong>Cadastre uma comunidade</strong>
          </a>
        </div>
      </div>
      <div className="is-hidden-desktop">
        <a href="/" className="navbar-item" title="Página inicial">
          <img
            className="icons-menu"
            src="/static/icons/home.svg"
            alt="Página inicial"
            width="112"
          />
          Home
        </a>
        <a
          href={token ? '/cadastrar' : '/sign-in'}
          className="navbar-item"
          title="Cadastre uma comunidade"
          rel="noopener noreferrer"
        >
          <img
            className="icons-menu"
            src="/static/icons/edit.svg"
            alt="Cadastre comunidade"
            width="112"
          />
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
            className="icons-menu"
            src="/static/icons/github.svg"
            alt="Github"
            width="112"
          />
          <strong>Contribua</strong>
        </a>
      </div>
      <style jsx>{styles}</style>
    </>
  )

  const generateButtons = () => {
    if (!token) {
      return (
        <div id="ctech-navbar" className={`navbar-menu  ${isActive}`}>
          <div className="navbar-end">
            {getCreateButton()}
            <a
              href="/login"
              className="navbar-item is-hidden-desktop"
              title="Página de Login"
              rel="noopener noreferrer"
            >
              <img
                className="icons-menu"
                src="/static/icons/sign-in.svg"
                alt="Página de login"
                width="112"
              />
              Entrar
            </a>
            <div className="navbar-item is-hidden-touch">
              <div className="buttons">
                <a
                  href="/login"
                  className="button is-primary"
                  title="Página de Login"
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
                <img
                  className="icons-menu"
                  src="/static/icons/sign-out.svg"
                  alt="Sair"
                  width="112"
                />
                Sair
              </a>
            </div>
          </div>
          <a
            href="/dashboard"
            className="navbar-item is-hidden-desktop"
            title="Dashboard"
          >
            <img
              className="icons-menu"
              src="/static/icons/dashboard.svg"
              alt="Dashboard"
              width="112"
            />
            Dashboard
          </a>
          <a
            onClick={logout}
            className="navbar-item is-hidden-desktop"
            title="Sair"
          >
            <img
              className="icons-menu"
              src="/static/icons/sign-out.svg"
              alt="Sair"
              width="112"
            />
            Sair
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
