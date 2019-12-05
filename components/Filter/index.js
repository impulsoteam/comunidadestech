import React, { Component } from 'react';
import styles from './styles';
import { STATES } from '../../utils/states';
import Router from 'next/router';

class Filter extends Component {
  state = {
    url: {},
  };

  unify = (array, object) => {
    const item = [...new Set(array.map((x) => x[`${object}`]))].filter(
      (x) => x
    );
    return item;
  };

  componentDidMount() {
    const url = Router.router.query;
    this.setState({
      url,
    });
  }

  paramsHandler = (event) => {
    const { name, value } = event.target;
    const newUrl = this.state.url;
    value === 'all' ? (newUrl[name] = '') : (newUrl[name] = value);
    this.setState({
      url: newUrl,
    });
  };

  resetHandler = () => {
    this.setState({ url: {} });
  };

  render() {
    const { list, select, reset, location, tags, multipleFilter } = this.props;
    console.log("minha location", location);
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
                    <select
                      value={
                        this.state.url.category
                          ? this.state.url.category
                          : multipleFilter.category
                      }
                      name="category"
                      onChange={(event) => {
                        select(event);
                        this.paramsHandler(event);
                      }}
                    >
                      <option value="all">Todas</option>
                      {this.unify(list, 'category').map((item, index) => (
                        <option value={item} key={`${index}-${item}`}>
                          {item}
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
              <div className="filter-label">Tag</div>
              <div className="filter-option">
                <div className="control has-icons-left">
                  <div className="select is-small">
                    <select
                      value={
                        this.state.url.tags
                          ? this.state.url.tags
                          : multipleFilter.tags
                      }
                      name="tags"
                      onChange={(event) => {
                        select(event);
                        this.paramsHandler(event);
                      }}
                    >
                      <option value="all">Todas</option>
                      {tags.sort().map(
                        (tag, index) =>
                          tag.length <= 20 && (
                            <option value={tag} key={`${index}-${tag}`}>
                              {tag}
                            </option>
                          )
                      )}
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
              <div className="filter-option">
                <div className="control has-icons-left">
                  <div className="select is-small">
                    <select
                      value={
                        this.state.url.model
                          ? this.state.url.model
                          : multipleFilter.model
                      }
                      name="model"
                      onChange={(event) => {
                        select(event);
                        this.paramsHandler(event);
                      }}
                    >
                      <option value="all">Ambos</option>
                      <option value="presential">Presencial</option>
                      <option value="online">Online</option>
                    </select>
                  </div>
                  <span className="icon is-small is-left">
                    <i className="fas fa-tag"></i>
                  </span>
                </div>
              </div>
            </div>
            <div className="filter-option-wrapper">
              <div className="filter-label">País</div>
              <div className="filter-option">
                <div className="control has-icons-left">
                  <div className="select is-small">
                    {(multipleFilter.model === 'Online' && (
                      <select disabled title="Selecione um modelo diferente">
                        <option value="all">Todos</option>
                      </select>
                    )) || (
                      <select
                        value={
                          this.state.url.country
                            ? this.state.url.country
                            : multipleFilter.country
                        }
                        name="country"
                        onChange={(event) => {
                          select(event);
                          this.paramsHandler(event);
                        }}
                      >
                        <option value="all">Todos</option>
                        {(multipleFilter.model !== 'Online' &&
                          Object.keys(location).map((item, index) => (
                            <option value={item} key={`${index}-${item}`}>
                              {item}
                            </option>
                          ))) || <option>Selecione um modelo diferente</option>}
                      </select>
                    )}
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
                    {(!location[multipleFilter.country] && (
                      <select disabled title="Selecione um país">
                        <option value="all">Todos</option>
                      </select>
                    )) || (
                      <select
                        name="state"
                        value={
                          this.state.url.state
                            ? this.state.url.state
                            : multipleFilter.state
                        }
                        onChange={(event) => {
                          select(event);
                          this.paramsHandler(event);
                        }}
                      >
                        <option value="all">Todos</option>
                        {(location[multipleFilter.country] &&
                          Object.keys(location[multipleFilter.country])
                            .sort()
                            .map((item, index) => (
                              <option key={`${index}-${item}`} value={item}>
                                {STATES[item]}
                              </option>
                            ))) || <option>Selecione um país</option>}
                      </select>
                    )}
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
                    {(!location['Brasil'][multipleFilter.state] && (
                      <select disabled title="Selecione um estado">
                        <option value="all">Todos</option>
                      </select>
                    )) || (
                      <select
                        name="city"
                        value={
                          this.state.url.city
                            ? this.state.url.city
                            : multipleFilter.city
                        }
                        onChange={(event) => {
                          select(event);
                          this.paramsHandler(event);
                        }}
                      >
                        <option value="all">Todos</option>
                        {(location['Brasil'][multipleFilter.state] &&
                          [
                            ...new Set(
                              location['Brasil'][multipleFilter.state]
                            ),
                          ].map((item, index) => (
                            <option key={`${index}-${item}`}>{item}</option>
                          ))) || <option>Selecione um estado</option>}
                      </select>
                    )}
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
                <form>
                  <div className="control has-icons-left">
                    <input
                      name="nameSearch"
                      onChange={(event) => {
                        select(event);
                        this.paramsHandler(event);
                      }}
                      className="input is-small"
                      type="text"
                      placeholder="Nome da comunidade"
                      value={
                        this.state.url.nameSearch
                          ? this.state.url.nameSearch
                          : multipleFilter.nameSearch
                      }
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-check-circle"></i>
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="reset-title">
            <div
              className="reset-label"
              onClick={(event) => {
                reset(event);
                this.resetHandler();
              }}
            >
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
