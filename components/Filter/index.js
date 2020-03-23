import React, { useState } from 'react'

import { useRouter } from 'next/router'
import PropTypes from 'prop-types'

import { STATES } from '../../utils/states'
import { countries, states, cities } from '../CommunityForm/locationOptions'
import { CATEGORIES, TYPES, TAGS, MODEL } from '../CommunityForm/utils'
import styles from './styles'

const Filter = ({ pageView, setPageView }) => {
  const [moreFilters, setMoreFilters] = useState(true)
  const [name, setName] = useState('')

  const router = useRouter()

  const handleChange = ({ name, value }) => {
    const { query } = router
    const isDefaultName = name === 'name' && value === ''
    const isDefaultValue = value === 'all' && name !== 'name'
    if (isDefaultName || isDefaultValue) {
      delete query[name]
      return router.push({ pathname: '/', query })
    }

    router.push({ pathname: '/', query: { ...query, [name]: value } })
  }

  const resetFilter = () => {
    document.getElementById('filter').reset()
    router.push('/')
  }

  const isDisabled = (type) => {
    const { query } = router
    if (type === 'state') {
      if (
        query.model === 'online' ||
        query.model === 'all' ||
        query.country !== 'Brasil'
      )
        return true

      return false
    }
    if (type === 'city') return !query.state
  }

  const renderMoreFilters = () => (
    <>
      <div className="control has-icons-left filter-option-wrapper is-hidden-touch is-hidden-desktop-only is-hidden-widescreen-only">
        <div className="select is-small">
          <select
            name="model"
            value={router.query.model || 'all'}
            onChange={({ target }) => {
              if (target.value === 'online' || target.value === 'all') {
                delete router.query.country
                delete router.query.state
                delete router.query.city
              }
              handleChange(event.target)
            }}
          >
            <option value="all">Modelo</option>
            {MODEL.map(({ label, value }) => (
              <option
                value={value}
                key={value}
                default={router.query.model === value}
              >
                {label}
              </option>
            ))}
          </select>
        </div>
        <span className="icon is-small is-left">
          <i className="fas fa-tag"></i>
        </span>
      </div>
      <div className="control has-icons-left filter-option-wrapper is-hidden-touch is-hidden-desktop-only is-hidden-widescreen-only">
        <div className="select is-small">
          <select
            name="country"
            value={router.query.country || 'all'}
            onChange={({ target }) => {
              if (target.value !== 'Brasil') {
                delete router.query.state
                delete router.query.city
              }
              handleChange(event.target)
            }}
          >
            <option value="all">País</option>
            {countries.map(({ label, value }) => (
              <option value={value} key={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <span className="icon is-small is-left">
          <i className="fas fa-globe"></i>
        </span>
      </div>
      <div className="control has-icons-left filter-option-wrapper is-hidden-touch is-hidden-desktop-only is-hidden-widescreen-only">
        <div className="select is-small">
          <select
            disabled={isDisabled('state')}
            name="state"
            value={router.query.state || 'all'}
            onChange={({ target }) => {
              if (target.value !== 'all') delete router.query.city
              handleChange(target)
            }}
          >
            <option value="all">Estado</option>
            {states.map(({ label, value }) => (
              <option value={value} key={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <span className="icon is-small is-left">
          <i className="fas fa-map"></i>
        </span>
      </div>
      <div className="control has-icons-left filter-option-wrapper is-hidden-touch is-hidden-desktop-only is-hidden-widescreen-only">
        <div className="select is-small">
          <select
            name="city"
            value={router.query.city || 'all'}
            onChange={({ target }) => handleChange(target)}
            disabled={isDisabled('city')}
          >
            <option value="all">Cidade</option>
            {cities
              .filter(({ state }) => state === router.query.state)
              .map(({ label, value }) => (
                <option value={value} key={value}>
                  {label}
                </option>
              ))}
          </select>
        </div>
        <span className="icon is-small is-left">
          <i className="fas fa-map-marker-alt"></i>
        </span>
      </div>
    </>
  )

  const renderDefaultFilter = () => {
    return (
      <form id="filter">
        <div className="container is-fluid filter-wrapper">
          <div className="filter-box">
            <div className="filter-title-wrapper is-hidden-mobile">
              <h4 className="filter-title">Filtros</h4>
            </div>
            <div className="filter-options is-hidden-mobile">
              <div className="control has-icons-left filter-option-wrapper">
                <div className="select is-small">
                  <select
                    name="category"
                    value={router.query.category || 'all'}
                    onChange={(event) => handleChange(event.target)}
                  >
                    <option value="all">Categoria</option>
                    {CATEGORIES.map(({ label, value }) => (
                      <option value={value} key={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
                <span className="icon is-small is-left">
                  <i className="fas fa-list"></i>
                </span>
              </div>
              <div className="control has-icons-left filter-option-wrapper is-hidden-touch">
                <div className="select is-small">
                  <select
                    name="type"
                    value={router.query.type || 'all'}
                    onChange={(event) => handleChange(event.target)}
                  >
                    <option value="all">Tipo</option>
                    {TYPES.map(({ label, value }) => (
                      <option value={value} key={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
                <span className="icon is-small is-left">
                  <i className="fas fa-tag"></i>
                </span>
              </div>
              <div className="control has-icons-left filter-option-wrapper">
                <div className="select is-small">
                  <select
                    name="tags"
                    value={router.query.tags || 'all'}
                    onChange={(event) => handleChange(event.target)}
                  >
                    <option value="all">Tags</option>
                    {TAGS.map(({ label, value }) => (
                      <option value={value} key={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
                <span className="icon is-small is-left">
                  <i className="fas fa-tag"></i>
                </span>
              </div>

              <div className="filter-option-wrapper filter-by-name is-hidden-touch">
                <div className="control has-icons-left">
                  <input
                    name="name"
                    onChange={(event) => {
                      setName(event.target.value)
                      handleChange(event.target)
                    }}
                    className="input is-small"
                    type="text"
                    placeholder="Nome da comunidade"
                    value={router.query.name || name}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-check-circle"></i>
                  </span>
                </div>
              </div>
            </div>
            <div className="filter-toggle-wrapper is-hidden-tablet unique-button">
              <button
                type="button"
                onClick={() => setMoreFilters(!moreFilters)}
                className="button"
              >
                <span className="icon is-small">
                  <i className="fas fa-filter"></i>
                </span>
                <span>Filtrar</span>
              </button>
            </div>
            <div className="filter-toggle-wrapper is-hidden-fullhd is-hidden-mobile unique-button">
              <button
                onClick={() => setMoreFilters(!moreFilters)}
                className="button"
                type="button"
              >
                <span className="icon is-small">
                  <i className="fas fa-filter"></i>
                </span>
                <span>
                  Mais
                  <br />
                  Filtros
                </span>
              </button>
            </div>
            <div className="reset-wrapper unique-button is-hidden-mobile">
              <button
                type="button"
                onClick={() => resetFilter()}
                className="button button-reset"
              >
                <span className="icon is-small">
                  <i className="fas fa-sync-alt"></i>
                </span>
                <span>
                  Resetar
                  <br />
                  Filtro
                </span>
              </button>
            </div>
          </div>
          <div className="toggle-box-wrapper">
            <div className="field has-addons">
              <p className="control">
                <button
                  type="button"
                  value="list"
                  className={`button ${pageView === 'list' && ' active'}`}
                  onClick={({ target }) => {
                    setPageView(target.value)
                  }}
                >
                  <span className="icon is-small">
                    <i className="fas fa-list"></i>
                  </span>
                  <span>Lista</span>
                </button>
              </p>
              <p className="control">
                <button
                  className={`button ${pageView === 'map' && ' active'}`}
                  type="button"
                  value="map"
                  onClick={({ target }) => {
                    setPageView(target.value)
                  }}
                >
                  <span className="icon is-small">
                    <i className="fas fa-map"></i>
                  </span>
                  <span>Mapa</span>
                </button>
              </p>
            </div>
          </div>
        </div>
        {moreFilters && renderMoreFilters()}

        <style jsx>{styles}</style>
      </form>
    )
  }
  return renderDefaultFilter()
  return (
    <>
      <div className={`filter-box more-filter  ${isActive}`}>
        <div className="filter-options">
          <div className="control has-icons-left filter-option-wrapper is-hidden-tablet">
            <div className="select is-small">
              <select
                value={
                  multipleFilter.category ? multipleFilter.category : 'all'
                }
                name="category"
                onChange={(event) => {
                  select(event)
                  paramsHandler(event)
                }}
              >
                <option value="all">Categoria</option>
                {unify(list, 'category').map((item, index) => (
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
          <div className="control has-icons-left filter-option-wrapper is-hidden-desktop">
            <div className="select is-small">
              <select
                value={multipleFilter.type ? multipleFilter.type : 'all'}
                name="type"
                onChange={(event) => {
                  select(event)
                  paramsHandler(event)
                }}
              >
                <option value="all">Tipo</option>
                {propertyList.types.sort().map(
                  (type, index) =>
                    type.length <= 20 && (
                      <option value={type} key={`${index}-${type}`}>
                        {type}
                      </option>
                    )
                )}
              </select>
            </div>
            <span className="icon is-small is-left">
              <i className="fas fa-tag"></i>
            </span>
          </div>
          <div className="control has-icons-left filter-option-wrapper is-hidden-tablet">
            <div className="select is-small">
              <select
                value={multipleFilter.tags ? multipleFilter.tags : 'all'}
                name="tags"
                onChange={(event) => {
                  select(event)
                  paramsHandler(event)
                }}
              >
                <option value="all">Tags</option>
                {propertyList.tags.sort().map(
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
          <div className="control has-icons-left filter-option-wrapper">
            <div className="select is-small">
              <select
                value={model || 'all'}
                name="model"
                onChange={(event) => {
                  select(event)
                  paramsHandler(event)
                }}
              >
                <option value="all">Modelo</option>
                <option value="both">Ambos</option>
                <option value="presential">Presencial</option>
                <option value="online">Online</option>
              </select>
            </div>
            <span className="icon is-small is-left">
              <i className="fas fa-tag"></i>
            </span>
          </div>
          <div className="control has-icons-left filter-option-wrapper">
            <div className="select is-small">
              {
                <select
                  value={
                    multipleFilter.country ? multipleFilter.country : 'all'
                  }
                  name="country"
                  onChange={(event) => {
                    select(event)
                    paramsHandler(event)
                  }}
                >
                  <option value="all">País</option>
                  {multipleFilter.model !== 'Online' &&
                    Object.keys(propertyList.locations).map((item, index) => (
                      <option value={item} key={`${index}-${item}`}>
                        {item}
                      </option>
                    ))}
                </select>
              }
            </div>
            <span className="icon is-small is-left">
              <i className="fas fa-globe"></i>
            </span>
          </div>
          <div className="control has-icons-left filter-option-wrapper">
            <div className="select is-small">
              {(!propertyList.locations[multipleFilter.country] && (
                <select disabled title="Selecione um país">
                  <option value="all">Estado</option>
                </select>
              )) || (
                <select
                  name="state"
                  value={multipleFilter.state ? multipleFilter.state : 'all'}
                  onChange={(event) => {
                    select(event)
                    paramsHandler(event)
                  }}
                >
                  <option value="all">Estado</option>
                  {(propertyList.locations[multipleFilter.country] &&
                    Object.keys(propertyList.locations[multipleFilter.country])
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
          <div className="control has-icons-left filter-option-wrapper">
            <div className="select is-small">
              {(!propertyList.locations.Brasil[multipleFilter.state] && (
                <select disabled title="Selecione um estado">
                  <option value="all">Cidade</option>
                </select>
              )) || (
                <select
                  name="city"
                  value={multipleFilter.city ? multipleFilter.city : 'all'}
                  onChange={(event) => {
                    select(event)
                    paramsHandler(event)
                  }}
                >
                  <option value="all">Cidade</option>
                  {(propertyList.locations.Brasil[multipleFilter.state] &&
                    [
                      ...new Set(
                        propertyList.locations.Brasil[multipleFilter.state]
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
          <div className="filter-option-wrapper filter-by-name is-hidden-desktop">
            <form>
              <div className="control has-icons-left">
                <input
                  name="nameSearch"
                  onChange={(event) => {
                    select(event)
                    paramsHandler(event)
                  }}
                  className="input is-small"
                  type="text"
                  placeholder="Nome da comunidade"
                  value={
                    url.nameSearch ? url.nameSearch : multipleFilter.nameSearch
                  }
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-check-circle"></i>
                </span>
              </div>
            </form>
          </div>
        </div>
        <div className="unique-button is-hidden-tablet">
          <button onClick={handleMoreFilter} className="button button-reset">
            <span>Filtrar</span>
          </button>
        </div>
        <div className="unique-button is-hidden-tablet">
          <button
            onClick={(event) => {
              reset(event)
              handleMoreFilter('reset')
            }}
            className="button button-reset"
          >
            <span className="icon is-small">
              <i className="fas fa-sync-alt"></i>
            </span>
            <span>Resetar Filtro</span>
          </button>
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  )
}

Filter.propTypes = {
  setPageView: PropTypes.func,
  pageView: PropTypes.string,
}

export default Filter
