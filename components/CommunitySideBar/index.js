import React from 'react'

import PropTypes from 'prop-types'

import { ICONS } from '../../utils/icons'
import styles from './styles'

const CommunitySideBar = ({ community }) => {
  const {
    name,
    location,
    members,
    category,
    description,
    logo,
    tags,
    slug
  } = community

  return (
    <div className="community-side-bar-wrapper">
      <div className="container head">
        <div className="columns is-multiline">
          <div className="column is-12 logo">
            <figure className="image">
              {logo
                ? <img src={logo} alt={name} />
                : <img
                    src="../../static/logo.svg"
                    alt={name}
                    className="is-200x200"
                  />
              }
            </figure>
          </div>
          <div className="column is-flex info">
            <h2 className="title has-text-weight-bold ">{name}</h2>
            <p>
              <i className="fas fa-map-marker-alt"></i>
              {location.city
                ? <span>{location.city}, {location.state}</span>
                : <span>Remota</span>
              }
            </p>
            <p>
              <i className="fas fa-users"></i>
              <span>{members} Membros</span>
            </p>
          </div>
        </div>
      </div>
      <div className="container description">
        <div className="columns is-multiline">
          <div className="column is-12">
            <div className="tags">
              <div>
                <span className="tag is-dark">{category}</span>
              </div>
              <div>
                {tags &&
                  tags.slice(0, 5).map(
                    (tag, tagItemIndex) =>
                      tag.length <= 20 && (
                        <span key={tagItemIndex} className="tag is-primary">
                          {tag}
                        </span>
                      )
                  )}
                <div className="open-tooltip">
                  {tags.length > 5 && (
                    <button type="button" className="tag btn-tooltip">
                      <i className="fas fa-plus"></i>
                      &nbsp;Tags
                    </button>
                  )}
                  <span className="tooltip">
                    <div className="title-tooltip">Tags:</div>
                    {tags.slice(5).map(
                      (tag, tagItemIndex) =>
                        tag.length <= 20 && (
                          <span key={tagItemIndex} className="tag is-primary">
                            {tag}
                          </span>
                        )
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="column">
            <p>
              {description.slice(0, 110)}
              {description.length > 110 && <span>...</span>}
            </p>
          </div>
        </div>
      </div>
      <div className="container links">
        {community.links.map((link) => (
          <a key={link.type} href={link.url} target="_blank" rel="noopener noreferrer">
            <i className={`${ICONS[link.type]} fa-2x`}></i>
          </a>
        ))}
      </div>
      <div className="container">
        <a
          href={`/c/${slug}`}
          className="button is-primary has-text-weight-bold"
        >
          Mais informações
        </a>
      </div>
      <style jsx>{styles}</style>
    </div>
  )
}

CommunitySideBar.propTypes = {
  community: PropTypes.object
}

export default CommunitySideBar
