import React from 'react'
import { toast } from 'react-toastify'

import Router from 'next/router'
import PropTypes from 'prop-types'

import { api, setHeader } from '../../utils/axios'
import { ICONS } from '../../utils/icons'
import Divider from '../Divider'
import styles from './styles'

const CommunityCard = ({ canModify, community, credentials }) => {
  const {
    _id,
    name,
    slug,
    location,
    members,
    category,
    description,
    logo,
    tags,
    status,
    type,
    managers
  } = community

  const sendNotification = (type) => {
    const types = {
      delete: 'Comunidade deletada com sucesso!',
      publish: 'Comunidade publicada com sucesso!'
    }
    toast.success(types[type])
  }

  const deleteCommunity = async () => {
    setHeader(credentials)
    await api.delete(`/community/${_id}`)
    sendNotification('delete')
    Router.push('/')
  }

  const publishCommunity = async () => {
    setHeader(credentials)
    await api.put(`/community/publish/${_id}`, {
      status: 'published'
    })
    sendNotification('publish')
    Router.push('/')
  }

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
              {location.city ? (
                <span>
                  {location.city}, {location.state}
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
                  <a href={`/editar/${slug}`} className="">
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
                    (tag, index) =>
                      tag.length <= 20 && (
                        <span key={`tag-${index}`} className="tag gray">{tag}</span>
                      )
                  )
                  : null}
              </div>
            </div>
            <div className="managers-wrapper">
              <h3>Administradores</h3>
              {managers
                .filter((manager) => manager.invitation.status === 'ACCEPTED')
                .slice(0, 4)
                .map(
                  (manager) =>
                    manager.invitation.status && (
                      <div className="managers" key={manager._id}>
                        <img
                          src={manager.avatar}
                          alt={manager.name}
                          onError={(img) => {
                            img.target.src = '../../static/default-user.png'
                          }}
                        />
                        <span>{manager.name}</span>
                      </div>
                    )
                )}
              {managers.filter(
                (manager) => manager.invitation.status === 'ACCEPTED'
              ).length > 4 && (
                <div className="tooltip-toggle">
                  <div className="tooltip-button">
                    <span>
                      <i className="fas fa-plus"></i> mostrar mais
                    </span>
                  </div>
                  <div className="tooltip-wrapper">
                    {managers
                      .filter(
                        (manager) => manager.invitation.status === 'ACCEPTED'
                      )
                      .slice(4)
                      .map(
                        (manager) =>
                          manager.invitation.status && (
                            <div className="managers" key={manager._id}>
                              <img
                                src={manager.avatar}
                                alt={manager.name}
                                onError={(img) => {
                                  img.target.src =
                                    '../../static/default-user.png'
                                }}
                              />
                              <span>{manager.name}</span>
                            </div>
                          )
                      )}
                  </div>
                </div>
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
            <div key={link.type} className="column is-half-mobile is-one-third-tablet is-one-quarter-desktop">
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                <i className={`${ICONS[link.type]} fa-3x`}></i>
              </a>
            </div>
          ))}
        </div>
        <Divider />
      </div>
      <style jsx>{styles}</style>
    </div>
  )
}

CommunityCard.propTypes = {
  canModify: PropTypes.bool,
  community: PropTypes.object,
  credentials: PropTypes.object
}

export default CommunityCard
