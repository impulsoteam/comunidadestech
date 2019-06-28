import React, { Component } from 'react';
import styles from './styles';

class Hero extends Component {
  render() {
    return (
      <div className="container">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              <div className="column has-text-centered">
                <h1 className="title is-spaced is-size-1-desktop is-size-2-tablet is-size-3-mobile">
                  Comunidades.tech
                </h1>
                <h2 className="subtitle is-size-4-desktop">
                  Espaço de visibilidade e fortalecimento das comunidades de
                  tecnologia.
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-foot has-text-centered">
          <div className="container">
            <img className="is-bottom" src="/static/hero.svg" alt="tech" />
          </div>
        </div>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default Hero;
