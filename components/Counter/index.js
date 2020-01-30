import React from 'react';
import styles from './styles';
import { useWindowSize } from 'react-use';

const Counter = ({ list }) => {
  const { width } = useWindowSize();
  const isMobile = width > 769 ? false : true;

  return (
    <div className="container counter-wrapper is-fluid">
      <div className="counter">
        {!isMobile && <i className="fas fa-laptop-code"></i>}
        <div className="counter-info">
          <h2 className="is-size-1-desktop is-size-2-tablet is-size-4-mobile">
            {list.length.toString().padStart(2, '0')}
          </h2>
          <h5 className="is-size-7-mobile">
            <span>Comunidades</span>
            {!isMobile && (
              <>
                <br /> cadastradas
              </>
            )}
          </h5>
        </div>
      </div>
      <div className="counter">
        {!isMobile && <i className="fas fa-map-marked-alt"></i>}
        <div className="counter-info">
          <h2 className="is-size-1-desktop is-size-2-tablet is-size-4-mobile">
            {
              [
                ...new Set(
                  list.map((item) => item.location.city).filter(Boolean)
                ),
              ].length
            }
          </h2>
          <h5 className="is-size-7-mobile">
            <span>Cidades</span>
            {!isMobile && (
              <>
                <br /> representadas
              </>
            )}
          </h5>
        </div>
      </div>
      <div className="counter">
        {!isMobile && <i className="fas fa-users"></i>}
        <div className="counter-info">
          <h2 className="is-size-1-desktop is-size-2-tablet is-size-4-mobile">
            {Object.values(list)
              .reduce((total, { members }) => total + members, 0)
              .toLocaleString('pt-BR')}
          </h2>
          <h5 className="is-size-7-mobile">
            <span>Membros</span>
            {!isMobile && (
              <>
                <br /> das comunidades
              </>
            )}
          </h5>
        </div>
      </div>
      <style jsx>{styles}</style>
    </div>
  );
};

export default Counter;
