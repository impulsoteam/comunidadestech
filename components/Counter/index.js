import React, { Component } from 'react';
import styles from './styles';

class Counter extends Component {
  render() {
    const { list } = this.props;
    return (
      <div className="container counter-wrapper">
        <div className="counter">
          <i className="fas fa-laptop-code"></i>
          <div className="counter-info">
            <h2 className="is-size-1-desktop is-size-2-tablet is-size-3-mobile">
              {list.length.toString().padStart(2, '0')}
            </h2>
            <h5>
              <span>Comunidades</span>
              <br />
              cadastradas
            </h5>
          </div>
        </div>
        <div className="counter">
          <i className="fas fa-map-marked-alt"></i>
          <div className="counter-info">
            <h2 className="is-size-1-desktop is-size-2-tablet is-size-3-mobile">
              {
                [...new Set(list.map((item) => item.city).filter(Boolean))]
                  .length
              }
            </h2>
            <h5>
              <span>Cidades</span>
              <br />
              representadas
            </h5>
          </div>
        </div>
        <div className="counter">
          <i className="fas fa-users"></i>
          <div className="counter-info">
            <h2 className="is-size-1-desktop is-size-2-tablet is-size-3-mobile">
              {Object.values(list).reduce(
                (total, { members }) => total + members,
                0
              )}
            </h2>
            <h5>
              <span>Membros</span>
              <br />
              das comunidades
            </h5>
          </div>
        </div>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default Counter;
