import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Router, { useRouter } from 'next/router';
import { api, setHeader } from '../../utils/axios';
import styles from './styles';
import { ICONS } from '../../utils/icons';
import Divider from '../Divider';

const ReviewAndSave = ({ canModify, community, credentials }) => {
  const {
    _id,
    name,
    city,
    state,
    members,
    category,
    description,
    logo,
    tags,
    url,
    status,
    type,
    managers,
  } = community;

  return (
    <div className="wrapper">
      <div className="container head">
        <div className="back-button">
          <a href="/">
            <i className="fas fa-reply"></i> página inicial
          </a>
        </div>
        <div className="columns is-2 is-variable">
          <div className="column is-one-quarter-mobile is-one-quarter ">
            <figure className="image">
              {logo ? (
                <img src={logo} alt={name} />
              ) : (
                <img src="../../static/logo.svg" alt={name} />
              )}
            </figure>
          </div>
          <div className="column is-flex">
            <h2 className="title has-text-weight-bold is-size-2-desktop is-size-2-tablet is-size-3-mobile">
              {name}
            </h2>
            <p className="info">
              <i className="fas fa-map-marker-alt"></i>
              {city ? (
                <span>
                  {city}, {state}
                </span>
              ) : (
                <span>Remota</span>
              )}
            </p>
            <p className="info">
              <i className="fas fa-users"></i>
              <span>{members} Membros</span>
            </p>
          </div>
        </div>
      </div>
      <div className="container description">
        <div className="columns is-2 is-variable">
          <div className="column is-one-quarter">
            <div className="tags">
              <div>
                <span className="tag is-dark">{category}</span>
              </div>
              {type !== 'legacy' && (
                <div className="tags has-addons">
                  <span className="tag is-dark">tipo</span>
                  <span className="tag is-primary">{type}</span>
                </div>
              )}
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
            <div className="managers-wrapper">
              {community.managers.length > 0 && (
                <>
                  <h3>Administradores</h3>
                  {community.managers
                    .filter((manager) => manager.invitation.status === 'SENT')
                    .map((manager) => (
                      <div className="managers" key={manager._id}>
                        <img
                          src={manager.avatar}
                          alt={manager.name}
                          onError={(img) => {
                            img.target.src = '../../static/default-user.png';
                          }}
                        />
                        <span>{manager.name}</span>
                      </div>
                    ))}
                </>
              )}
            </div>
          </div>
          <div className="column">
            <p>{description}</p>
          </div>
        </div>
      </div>
      <div className="container links">
        <Divider dataContent="Links" />
        <div className="columns is-multiline is-mobile">
          {community.links.map((link) => (
            <div className="column is-half-mobile is-one-third-tablet is-one-quarter-desktop">
              <a href={link.url} target="_blank">
                <i className={`${ICONS[link.type]} fa-3x`}></i>
              </a>
            </div>
          ))}
        </div>
        <Divider />
      </div>
      <style jsx>{styles}</style>
    </div>
  );
};

export default ReviewAndSave;
