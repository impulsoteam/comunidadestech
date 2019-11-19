import React, { Component } from 'react';
import styles from './styles';

class ComunityCard extends Component {
  render() {
    return (
      <div className="wrapper">
        <div className="container head">
          <div className="back-button">
            <a href="">
              <i className="fas fa-reply"></i> página inicial
            </a>
          </div>
          <div className="columns is-2 is-variable">
            <div className="column is-one-quarter-mobile is-one-quarter ">
              <figure className="image">
                <img src="https://via.placeholder.com/204" />
              </figure>
            </div>
            <div className="column is-flex">
              <h2 className="title has-text-weight-bold is-size-2-desktop is-size-2-tablet is-size-3-mobile">
                CocoaHeads Uberlândia
              </h2>
              <p className="info">
                <i className="fas fa-map-marker-alt"></i>
                <span>Uberlândia, MG</span>
              </p>
              <p className="info">
                <i className="fas fa-users"></i>
                <span>149 Membros</span>
              </p>
              <a href="#" className="button is-primary has-text-weight-bold">
                Participar da Comunidade
              </a>
            </div>
          </div>
        </div>
        <div className="container description">
          <div className="columns is-2 is-variable">
            <div className="column is-one-quarter">
              <div className="tags">
                <div>
                  <span className="tag is-dark">
                    Desenvolvimento de Software
                  </span>
                </div>
                <div>
                  <span className="tag is-primary">Data Engineering</span>
                  <span className="tag is-primary">Deep Learning</span>
                  <span className="tag is-primary">Startups</span>
                  <span className="tag is-primary">DevOps</span>
                  <span className="tag is-primary">Javascript</span>
                  <span className="tag is-primary">Kanban</span>
                </div>
              </div>
            </div>
            <div className="column">
              <p>
                Uma comunidade com foco em desenvolver ecossistema inovador e
                fomentar o empreendedorismo em Salvador a partir da colaboração.
                Essa será a principal missão da All Saints Bay, lançada numa
                noite de terça-feira, 12 de dezembro de 2017, na capital baiana,
                após um processo democrático de escolha da identidade.
              </p>
            </div>
          </div>
        </div>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default ComunityCard;
