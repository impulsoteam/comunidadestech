import React, { Component } from 'react';
import styles from './styles';

class Filter extends Component {
  render() {
    const { list, select, reset, filteredList } = this.props;

    const unify = (array, object) => {
      const item = [...new Set(array.map((x) => x[`${object}`]))].filter(
        (x) => x
      );
      return item;
    };
    return (
      <div className="columns filter">
        <div className="column filter-box">
          <div className="filter-title">
            <h4 className="filter-label">Filtro</h4>
          </div>
          <div className="filter-options">
            <div className="filter-option-wrapper">
              <div className="filter-label">Categoria</div>
              <div className="filter-option">
                <div className="control has-icons-left">
                  <div className="select is-small">
                    <select name="category" onChange={(event) => select(event)}>
                      <option>Todas</option>
                      {unify(list, 'category').map((item, index) => (
                        <option key={`${index}-${item}`}>{item}</option>
                      ))}
                    </select>
                  </div>
                  <span className="icon is-small is-left">
                    <i className="fas fa-list"></i>
                  </span>
                </div>
              </div>
            </div>
            <div className="filter-option-wrapper">
              <div className="filter-label">Tag</div>
              <div className="filter-option">
                <div className="control has-icons-left">
                  <div className="select is-small">
                    <select>
                      <option>Todas</option>
                      <option>Tag 1</option>
                      <option>Tag 2</option>
                    </select>
                  </div>
                  <span className="icon is-small is-left">
                    <i className="fas fa-tag"></i>
                  </span>
                </div>
              </div>
            </div>
            <div className="filter-option-wrapper">
              <div className="filter-label">Modelo</div>
              <div className="filter-option check">
                <label className="checkbox">
                  <input type="checkbox" />
                  Presencial
                </label>
                <label className="checkbox">
                  <input type="checkbox" />
                  Remoto
                </label>
              </div>
            </div>
            <div className="filter-option-wrapper">
              <div className="filter-label">País</div>
              <div className="filter-option">
                <div className="control has-icons-left">
                  <div className="select is-small">
                    <select name="country" onChange={(event) => select(event)}>
                      <option>{list.country || 'Todos'}</option>
                      {unify(list, 'country').map((item, index) => (
                        <option key={`${index}-${item}`}>{item}</option>
                      ))}
                    </select>
                  </div>
                  <span className="icon is-small is-left">
                    <i className="fas fa-globe"></i>
                  </span>
                </div>
              </div>
            </div>
            <div className="filter-option-wrapper">
              <div className="filter-label">Estado</div>
              <div className="filter-option">
                <div className="control has-icons-left">
                  <div className="select is-small">
                    <select name="state" onChange={(event) => select(event)}>
                      <option>{list.country || 'Todos'}</option>
                      {unify(list, 'state').map((item, index) => (
                        <option key={`${index}-${item}`}>{item}</option>
                      ))}
                    </select>
                  </div>
                  <span className="icon is-small is-left">
                    <i className="fas fa-map"></i>
                  </span>
                </div>
              </div>
            </div>
            <div className="filter-option-wrapper">
              <div className="filter-label">Cidade</div>
              <div className="filter-option">
                <div className="control has-icons-left">
                  <div className="select is-small">
                    <select name="city" onChange={(event) => select(event)}>
                      <option>Todas</option>
                      {unify(list, 'city').map((item, index) => (
                        <option key={`${index}-${item}`}>{item}</option>
                      ))}
                    </select>
                  </div>
                  <span className="icon is-small is-left">
                    <i className="fas fa-map-marker-alt"></i>
                  </span>
                </div>
              </div>
            </div>
            <div className="filter-option-wrapper filter-by-name">
              <div className="filter-label">Nome</div>
              <div className="filter-option">
                <div className="control has-icons-left">
                  <input
                    className="input is-small"
                    type="text"
                    placeholder="Nome da comunidade"
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-check-circle"></i>
                  </span>
                </div>
                <a className="button is-light is-small">OK</a>
              </div>
            </div>
          </div>
          <div className="reset-title">
            <div className="reset-label" onClick={(event) => reset(event)}>
              <i className="fa fa-refresh"></i> Resetar Filtro
            </div>
          </div>
        </div>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default Filter;
