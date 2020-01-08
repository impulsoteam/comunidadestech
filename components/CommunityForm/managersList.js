import React, { useState, useEffect } from 'react';
import loader from '../../static/comunidades-tech-loader.gif';
import { api, setHeader } from '../../utils/axios';
import { invitationStatus } from '../../utils/variables';
import Divider from '../Divider';

import styles from './cardStyles';

export default function ManagersList({
  managers: allManagers,
  removeManager,
  credentials,
  pageType,
}) {
  const pendingInvites = [];
  const declinedInvites = [];
  const acceptedInvites = [];
  for (const manager of allManagers) {
    if (allManagers.length === 0) return;

    const isPending = manager.invitation.status === invitationStatus.sent;
    const isDeclined = manager.invitation.status === invitationStatus.declined;

    if (isDeclined) {
      declinedInvites.push(manager);
      continue;
    }

    isPending ? pendingInvites.push(manager) : acceptedInvites.push(manager);
  }

  const renderManagers = () => {
    if (acceptedInvites.length === 0 && pageType !== 'create')
      return (
        <>
          <Divider dataContent="Não há administradores cadastrados" />
          <style jsx>{styles}</style>
        </>
      );
    return (
      <>
        <Divider dataContent="Administradores" />
        {acceptedInvites.map((manager) => (
          <ManagerCard
            key={manager.email}
            {...{
              manager,
              removeManager,
              credentials,
            }}
          />
        ))}
      </>
    );
  };

  const renderPendingInvites = () => {
    if (pendingInvites.length === 0)
      return (
        <>
          <h5 className="admin-title">Convites Pendentes</h5>
          <style jsx>{styles}</style>
        </>
      );
    return (
      <>
        <h5 className="admin-title">Convites Pendentes</h5>
        {pendingInvites.map((manager) => (
          <ManagerCard
            key={manager.email}
            {...{
              manager,
              removeManager,
              credentials,
            }}
          />
        ))}
        <style jsx>{styles}</style>
      </>
    );
  };
  const renderDeclinedInvites = () => {
    if (declinedInvites.length === 0) return;
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
              credentials,
            }}
          />
        ))}
      </>
    );
  };
  return (
    <>
      {renderManagers()}
      {renderPendingInvites()}
      {renderDeclinedInvites()}
    </>
  );
}

function ManagerCard({ manager, removeManager, credentials }) {
  const [loading, setLoading] = useState(true);
  const [managerDetails, setManager] = useState({});

  useEffect(() => {
    const getManager = async () => {
      if (!manager.avatar) {
        setHeader(credentials);
        const { data: response } = await api.get(
          `/user/checkManager/${manager.email}`
        );

        manager.name = response.name;
        manager.avatar = response.avatar;
        manager._id = response._id;
      }
      setManager(manager);
      setLoading(false);
    };
    getManager();
  }, []);

  const renderCard = () => {
    const { email, name, avatar } = managerDetails;

    if (loading)
      return (
        <div style={{ height: ' 45px' }}>
          <img
            src={loader}
            style={{ maxWidth: '30px', display: 'block', margin: '0 auto' }}
          />
        </div>
      );

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
                    img.target.src = '../../static/default-user.png';
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
    );
  };
  return renderCard();
}
