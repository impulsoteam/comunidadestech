import React, { Component } from 'react';
import styles from './styles';

class Hero extends Component {
  render() {
    return (
      <div className="container component-wrapper is-fluid is-hidden-mobile">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              <div className="column has-text-centered">
                <h2 className="subtitle is-size-4-desktop">
                  Espaço de visibilidade e fortalecimento das comunidades de
                  tecnologia.
                </h2>
              </div>
            </div>
          </div>
        </div>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default Hero;
