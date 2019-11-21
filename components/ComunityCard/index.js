import React, { Component } from 'react';
import styles from './styles';

class ComunityCard extends Component {
  render() {
    const {
      name,
      city,
      state,
      size,
      category,
      description,
      logo,
      tags,
      link,
    } = this.props;

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
                {logo ? (
                  <img src={logo} alt={name} />
                ) : (
                  <img src="../../static/ctech-small-logo.png" alt={name} />
                )}
              </figure>
            </div>
            <div className="column is-flex">
              <h2 className="title has-text-weight-bold is-size-2-desktop is-size-2-tablet is-size-3-mobile">
                {name}
              </h2>
              <p className="info">
                <i className="fas fa-map-marker-alt"></i>
                {city ? (
                  <span>
                    {city}, {state}
                  </span>
                ) : (
                  <span>Remota</span>
                )}
              </p>
              <p className="info">
                <i className="fas fa-users"></i>
                <span>{size} Membros</span>
              </p>
              <a href={link} className="button is-primary has-text-weight-bold">
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
                  <span className="tag is-dark">{category}</span>
                </div>
                <div>
                  {tags
                    ? tags.map((tag) => (
                        <span className="tag is-primary">{tag}</span>
                      ))
                    : null}
                </div>
              </div>
            </div>
            <div className="column">
              <p>{description}</p>
            </div>
          </div>
        </div>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default ComunityCard;
