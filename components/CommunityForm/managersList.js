import React, { useState, useEffect } from 'react';
import { api, setHeader } from '../../utils/axios';
import { invitationStatus } from '../../utils/variables';

export default function ManagersList({
  managers: allManagers,
  removeManager,
  credentials,
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
    if (acceptedInvites.length === 0)
      return (
        <>
          <h2>Não há administradores cadastrados</h2>
        </>
      );
    return (
      <>
        <h2>Administradores</h2>
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
          <h2>Não há convites pendentes</h2>
        </>
      );
    return (
      <>
        <h2>Convites Pendentes</h2>
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
      </>
    );
  };
  const renderDeclinedInvites = () => {
    if (declinedInvites.length === 0) return;
    return (
      <>
        <h2>Convites Recusados</h2>
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
    const { email, name, avatar, invitation } = managerDetails;

    if (loading) return <p>loading</p>;

    return (
      <ul>
        <p>
          avatar: <span>{avatar ? 'avatar here' : 'not found'}</span>
        </p>
        <p>
          name: <span>{name || 'not found'}</span>
        </p>
        <p>
          email: <span>{email}</span>
        </p>
        <p>
          status: <span>{invitation.status}</span>
        </p>
        <p>
          sent in: <span>{JSON.stringify(invitation.in)}</span>
        </p>
        <button type="button" onClick={() => removeManager(email)}>
          remover
        </button>
      </ul>
    );
  };
  return renderCard();
}
