import React, { PureComponent } from 'react'

import styles from './styles'

export default class Footer extends PureComponent {
  render () {
    return (
      <div>
        <div className="hero-foot has-text-centered">
          <div className="container">
            <img className="is-bottom" src="/static/hero.svg" alt="tech" />
          </div>
        </div>
        <footer className="footer">
          <div className="content has-text-centered">
            <p>
              <strong>Comunidades.tech</strong> é um projeto open source
              desenvolvido pela comunidade da{' '}
              <strong>
                <a href="https://impulso.link/comunidades-tech" target="_blank" rel="noopener noreferrer">
                  Impulso.Network
                </a>
              </strong>
              .
            </p>
          </div>
        </footer>
        <style jsx>{styles}</style>
      </div>
    )
  }
}
