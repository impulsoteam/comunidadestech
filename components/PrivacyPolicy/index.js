import React, { useState } from 'react'

import styles from './styles'

const PrivacyPolicy = () => {
  const [modal, setModal] = useState(true)

  const handleCloseModal = (state) => {
    setModal(state)
  }

  return (
    <>
      {modal
        ? <div className="modal">
          <div className="modal-content">
            <a className="close-modal" isActive={modal} onClick={() => handleCloseModal(false)}>
              <img src="/static/icons/ic-close.svg#default" />
            </a>
            <h2 className="title-modal">Proteção de dados</h2>
            <div className="modal-body">
              <p>
                <b>Que Dados coletamos e como nós coletamos?</b> <br/>
                Dados obtidos quando você se candidata a uma vaga: quando você se candidata a uma vaga para alocação em
                um de nossos clientes, coletamos dados adicionais sobre você, por meio de avaliações, testes, dinâmicas
                e feedbacks.
              </p>
              <p>
                <b>Como e por que utilizamos seus dados?</b> <br/>
                Quando você se candidata a uma vaga para alocação em um de nossos clientes, os seus dados nos auxiliam a
                traçar o seu perfil profissional. Isso nos permite encontrar as melhores oportunidades para você, tanto
                para geração de conteúdo quanto para a oferta de vagas do seu interesse. Esses dados são fundamentais
                para que realizemos estudos aprofundados de interesse de mercado e pessoal a todo momento,
                possibilitando que nosso serviço seja continuamente aprimorado e modernizado.
                <a href="https://impulso.network/privacidade" target="_blank" rel="noreferrer"> (Ler política completa)</a>
              </p>
              <div className="modal-buttons">
                <button title="Recusar" className="modal-btn" onClick={() => handleCloseModal(false)}>Recusar</button>
                <button title="Aceitar" className="modal-btn" onClick={() => handleCloseModal(false)}>Aceitar</button>
              </div>
            </div>
          </div>
          <style jsx>{styles}</style>
        </div>
        : null}
    </>
  )
}

export default PrivacyPolicy
