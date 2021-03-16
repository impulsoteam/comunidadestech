import React, { useState } from 'react'

import styles from './styles'

const CookiesPolicy = () => {
  const [cookiesMessage, setCookiesMessage] = useState(true)

  const showCookies = (state) => {
    setCookiesMessage(state)
  }

  return (
    <>
      {cookiesMessage
        ? <div className="cookies-policy">
          <p className="cookies-info">
            Nós usamos cookies para melhorar sua experiência de uso no site.  Ao aceitar, você concorda com nossa
            <a
              className="cookies-link"
              href="https://impulso.network/privacidade"
              target="_blank"
              rel="noreferrer"
              title="Política de Privacidade"
            >
              Política de Privacidade
            </a>
            <a
              className="cookies-btn"
              title="Aceitar"
              onClick={() => showCookies(false)}
            >
              Aceitar
            </a>
          </p>
          <style jsx>{styles}</style>
        </div>
        : null}
    </>
  )
}

export default CookiesPolicy
