import React, { useState, useEffect } from 'react';
import { api, setHeader } from '../../utils/axios';

export default function ManagersList(props) {
  return (
    <>
      <h2>Administradores</h2>
      {props.managers.map((manager) => (
        <ManagerCard key={manager.email} {...{ ...props, manager }} />
      ))}
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
