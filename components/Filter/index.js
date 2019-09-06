import React, { Component } from 'react';
import styles from './styles';

class Filter extends Component {
  render() {
    const { list, selectedStack, select } = this.props;
    return (
      <div className="columns filter">
        <div className="column filter-box">
          <div className="filter-title">
            <h4 className=" menu-label">Filtrar</h4>
          </div>
          <div className="filter-options">
            <div className="filter-option-wrapper">
              <div className="filter-option">
                <div className="control has-icons-left">
                  <div className="select is-small">
                    <select>
                      <option value="" selected>
                        Categoria
                      </option>
                      {list.map((item, index) => (
                        <option
                          key={`${index}-${item.name}`}
                          onChange={() => select(item.name)}
                        >
                          {item.name}
                        </option>
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
              <div className="filter-option">
                <div className="control has-icons-left">
                  <div className="select is-small">
                    <select>
                      <option value="" selected>
                        Tag
                      </option>
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
              <div className="filter-option">
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
              <div className="filter-option">
                <div className="control has-icons-left">
                  <div className="select is-small">
                    <select>
                      <option value="" selected>
                        País
                      </option>
                      <option>Argentina</option>
                      <option>Brasil</option>
                      <option>Chile</option>
                    </select>
                  </div>
                  <span className="icon is-small is-left">
                    <i className="fas fa-globe"></i>
                  </span>
                </div>
              </div>
            </div>
            <div className="filter-option-wrapper">
              <div className="filter-option">
                <div className="control has-icons-left">
                  <div className="select is-small">
                    <select>
                      <option value="" selected>
                        Estado
                      </option>
                      <option>Bahia</option>
                      <option>Goiás</option>
                      <option>São Paulo</option>
                    </select>
                  </div>
                  <span className="icon is-small is-left">
                    <i className="fas fa-map"></i>
                  </span>
                </div>
              </div>
            </div>
            <div className="filter-option-wrapper">
              <div className="filter-option">
                <div className="control has-icons-left">
                  <div className="select is-small">
                    <select>
                      <option value="" selected>
                        Cidade
                      </option>
                      <option>Anápolis</option>
                      <option>Feira de Santana</option>
                      <option>Goiânia</option>
                      <option>São Paulo</option>
                    </select>
                  </div>
                  <span className="icon is-small is-left">
                    <i className="fas fa-map-marker-alt"></i>
                  </span>
                </div>
              </div>
            </div>
            <div className="filter-option-wrapper">
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
        </div>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default Filter;
