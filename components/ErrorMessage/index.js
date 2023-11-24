import React from 'react'
import styles from './styles'

export default function ErrorMessage() {

  return (
    <div className="error-message">
      <div className="error-box">
        <div className="container">
          <div className="columns is-centered">
            <div className="column has-text-centered">
              <img
                className="img-error"
                src="/static/404.svg"
                width="340"
              />
              <h1 className="title">Página não encontrada</h1>
              <p>O endereço que está procurando não existe, foi modificado ou tem acesso restrito.</p>
              <a href="/">
                voltar à página inicial
              </a>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{styles}</style>
    </div>
  )
}
