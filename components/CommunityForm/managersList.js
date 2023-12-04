import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { api, setHeader } from '../../utils/axios'
import { invitationStatus } from '../../utils/variables'
import Divider from '../Divider'
import styles from './cardStyles'

function ManagersList({
  managers: allManagers,
  removeManager,
  credentials,
  pageType
}) {
  if (allManagers.length === 0) return

  const { sending, sent, declined, accepted } = invitationStatus

  const sendingInvites = allManagers.filter(
    ({ invitation }) => invitation.status === sending
  )

  const pendingInvites = allManagers.filter(
    ({ invitation }) => invitation.status === sent
  )

  const declinedInvites = allManagers.filter(
    ({ invitation }) => invitation.status === declined
  )

  const acceptedInvites = allManagers.filter(
    ({ invitation }) => invitation.status === accepted
  )

  const renderManagers = () => {
    if (acceptedInvites.length === 0 && pageType !== 'create') {

      return (
        <>
          <Divider dataContent="Não há administradores cadastrados" />
          <style jsx>{styles}</style>
        </>
      )
    }

    return (
      <>
        <Divider dataContent="Administradores" />
        {acceptedInvites.map((manager) => (
          <ManagerCard
            key={manager.email}
            {...{
              manager,
              removeManager,
              credentials
            }}
          />
        ))}
      </>
    )
  }

  const renderPendingInvites = () => {
    if (pendingInvites.length === 0) return

    return (
      <>
        <h5 className="admin-title">Convites Pendentes</h5>
        {pendingInvites.map((manager) => (
          <ManagerCard
            key={manager.email}
            {...{
              manager,
              removeManager,
              credentials
            }}
          />
        ))}
        <style jsx>{styles}</style>
      </>
    )
  }
  const renderDeclinedInvites = () => {
    if (declinedInvites.length === 0) return

    return (
      <>
        <h5 className="admin-title">Convites Recusados</h5>
        <style jsx>{styles}</style>
        {declinedInvites.map((manager) => (
          <ManagerCard
            key={manager.email}
            {...{
              manager,
              removeManager,
              credentials
            }}
          />
        ))}
      </>
    )
  }

  const renderSendingInvites = () => {
    if (sendingInvites.length === 0) return

    return (
      <>
        <h5 className="admin-title">Convites a Serem Enviados</h5>
        <style jsx>{styles}</style>
        {sendingInvites.map((manager) => (
          <ManagerCard
            key={manager.email}
            {...{
              manager,
              removeManager,
              credentials
            }}
          />
        ))}
      </>
    )
  }

  return (
    <>
      {renderManagers()}
      {renderPendingInvites()}
      {renderDeclinedInvites()}
      {renderSendingInvites()}
    </>
  )
}

function ManagerCard({ manager, removeManager, credentials }) {
  const [loading, setLoading] = useState(true)
  const [managerDetails, setManager] = useState({})

  useEffect(() => {
    const getManager = async () => {
      if (!manager.avatar) {
        setHeader(credentials)
        const { data: response } = await api.get(
          `/user/checkManager/${manager.email}`
        )

        manager.name = response.name
        manager.avatar = response.avatar
        manager._id = response._id
      }

      setManager(manager)
      setLoading(false)
    }

    getManager()
  }, [])

  const renderCard = () => {
    const { email, name, avatar } = managerDetails

    if (loading) {

      return (
        <div style={{ height: ' 45px' }}>
          <img
            src="/static/comunidades-tech-loader.gif"
            style={{ maxWidth: '30px', display: 'block', margin: '0 auto' }}
          />
        </div>
      )
    }

    return (
      <div className="manager-card card">
        <div className="card-content">
          <div className="media">
            <div className="media-left">
              <figure className="image is-32x32">
                <img
                  src={avatar}
                  alt={name}
                  onError={(img) => {
                    img.target.src = '../../static/default-user.png'
                  }}
                />
              </figure>
            </div>
            <div className="media-content">
              <p className="title is-7">{name}</p>
              <p className="subtitle is-7">{email}</p>
            </div>
          </div>
          <button type="button" onClick={() => removeManager(email)}>
            <i className="fas fa-trash-alt"></i> remover
          </button>
        </div>
        <style jsx>{styles}</style>
      </div>
    )
  }
  return renderCard()
}

ManagersList.propTypes = {
  removeManager: PropTypes.func,
  credentials: PropTypes.object,
  pageType: PropTypes.string,
  managers: PropTypes.array
}

export default ManagersList
