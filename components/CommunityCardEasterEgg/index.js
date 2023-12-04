import React from 'react'

import styles from '../CommunityCard/styles'

const CommunityCard = () => {

  return (
    <div className="wrapper">
      <div className="container head">
        <div className="back-button">
          <a href="/">
            <i className="fas fa-reply"></i> página inicial
          </a>
        </div>
        <div className="columns is-2 is-variable">
          <div className="column is-one-quarter-mobile is-one-quarter ">
            <figure className="image">
              <img src="../../static/coelho-pascal.jpg" alt={name} />
            </figure>
          </div>
          <div className="column is-flex">
            <h2 className="title has-text-weight-bold is-size-2-desktop is-size-2-tablet is-size-3-mobile">
              Caçadores de Easter Eggs Sêniores
            </h2>
            <p className="info">
              <i className="fas fa-map-marker-alt"></i>
              <span>Coelhândia</span>
            </p>
            <p className="info">
              <i className="fas fa-users"></i>
              <span>30k Membros</span>
            </p>
          </div>
        </div>
      </div>

      <div className="container description">
        <div className="columns is-2 is-variable">
          <div className="column is-one-quarter">
            <div className="tags">
              <div>
                <span className="tag is-dark">Easter Eggs</span>
              </div>
              <div>
                <span className="tag is-primary">Páscoa</span>
                <span className="tag is-primary">Surpresa</span>
              </div>
            </div>
          </div>
          <div className="column">
            <p>
              Você encontrou o Easter Egg do site, e agora você faz parte do
              grupo de <b>Caçadores de Easter Eggs Sêniores</b> do Comunidades
              Tech! Com isso, você tem direito a recompensas! Para descobrir e
              resgatar sua recompensa, entre em contato conosco através{' '}
              <b>
                <a
                  href="https://impulsowork.typeform.com/to/NUubrf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  desse formulário
                </a>
              </b>
              !
            </p>
          </div>
        </div>
      </div>

      <style jsx>{styles}</style>
    </div>
  )
}

export default CommunityCard
