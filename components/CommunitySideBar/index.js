import React from 'react';
import styles from './styles';
import { ICONS } from '../../utils/icons';
import Divider from '../Divider';

const CommunitySideBar = ({ community }) => {
  const {
    name,
    location,
    state,
    members,
    category,
    description,
    logo,
    tags,
  } = community;

  return (
    <div className="community-side-bar-wrapper">
      <div className="container head">
        <div className="columns is-multiline">
          <div className="column is-12 logo">
            <figure className="image">
              {logo ? (
                <img src={logo} alt={name} />
              ) : (
                <img
                  src="../../static/logo.svg"
                  alt={name}
                  className="is-200x200"
                />
              )}
            </figure>
          </div>
          <div className="column is-flex info">
            <h2 className="title has-text-weight-bold ">{name}</h2>
            <p>
              <i className="fas fa-map-marker-alt"></i>
              {location.city ? (
                <span>
                  {location.city}, {location.state}
                </span>
              ) : (
                <span>Remota</span>
              )}
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
                {tags
                  ? tags.map(
                      (tag) =>
                        tag.length <= 20 && (
                          <span className="tag is-primary">{tag}</span>
                        )
                    )
                  : null}
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
          <a href={link.url} target="_blank">
            <i className={`${ICONS[link.type]} fa-2x`}></i>
          </a>
        ))}
      </div>
      <div className="container">
        <a
          href={`/comunidade?name=${name}`}
          className="button is-primary has-text-weight-bold"
        >
          Mais informações
        </a>
      </div>
      <style jsx>{styles}</style>
    </div>
  );
};

export default CommunitySideBar;
