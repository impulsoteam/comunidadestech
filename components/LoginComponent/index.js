import React from 'react'

import styles from './styles'

export default function Login () {
  return (
    <div>
      <div className="left-login">
        <div className="container">
          <div className="columns is-centered">
            <div className="column has-text-centered">
              <a className="logo-ctech" href="/">
                <img
                  className="login-logo"
                  src="/static/ctech-logo.svg"
                  width="250"
                />
              </a>

              <div className="buttons">
                <a
                  href={`https://www.linkedin.com/oauth/v2/authorization?client_id=${process.env.LINKEDIN_API_KEY}&client_secret=${process.env.LINKEDIN_SECRET_KEY}&redirect_uri=${process.env.LINKEDIN_CALLBACK_URL}&response_type=code&scope=r_liteprofile%20r_emailaddress`}
                  className="button linkedin is-outlined"
                >
                  <span className="icon">
                    <i className="fab fa-linkedin-in" aria-hidden="true"></i>
                  </span>
                  <span>Login LinkedIn</span>
                </a>
                <a href="/auth/google" className="button google is-outlined">
                  <img
                    className="icon-img"
                    src="/static/google.svg"
                    width="20"
                  />
                  <span>Login Google</span>
                </a>
              </div>

              <p>
                Ao participar da Comunidades.tech você também faz parte da
                <a href="https://impulso.team/?referral=comunidadestech" target="blank">
                  <b> Impulso</b>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="right-login">
        <div className="footer-login">
          <div className="container">
            <div className="columns is-centered">
              <div className="column has-text-centered">
                <img
                  className="hero-img"
                  src="/static/hero-clean.svg"
                  width="450"
                />
              </div>
            </div>
          </div>
          <div className="content has-text-centered">
            <p>
              <b>Comunidades.tech</b> é um projeto open source desenvolvido pela
              comunidade da
              <a href="https://impulso.team/?referral=comunidadestech" target="blank">
                <b> Impulso</b>
              </a>
            </p>
          </div>
        </div>
      </div>
      <style jsx>{styles}</style>
    </div>
  )
}
