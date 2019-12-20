import React from 'react';
import { toast } from 'react-toastify';
import Router from 'next/router';
import { api, setHeader } from '../../utils/axios';
import styles from './styles';

const CommunityCard = ({ canModify, community, credentials }) => {
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
  } = community;

  const sendNotification = (type) => {
    const types = {
      delete: 'Comunidade deletada com sucesso!',
      publish: 'Comunidade publicada com sucesso!',
    };
    toast.success(types[type]);
  };

  const deleteCommunity = async () => {
    setHeader(credentials);
    await api.delete(`/community/${_id}`);
    sendNotification('delete');
    Router.push('/');
  };

  const publishCommunity = async () => {
    setHeader(credentials);
    await api.put(`/community/publish/${_id}`, {
      status: 'published',
    });
    sendNotification('publish');
    Router.push(`/`);
  };

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
            <div className="options">
              {canModify && (
                <>
                  <a href={`/editar?name=${name}`} className="">
                    <i className="fas fa-edit"></i>editar
                  </a>
                  <a onClick={deleteCommunity} className="">
                    <i className="fas fa-trash-alt"></i>deletar
                  </a>
                </>
              )}
              {status === 'awaitingPublication' && credentials.isModerator && (
                <>
                  <a onClick={publishCommunity} className="button is-small">
                    <i className="fas fa-check-double"></i> publicar
                  </a>
                </>
              )}
            </div>
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
          </div>
          <div className="column">
            <p>{description}</p>
          </div>
        </div>
      </div>
      <style jsx>{styles}</style>
    </div>
  );
};

export default CommunityCard;
