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
    console.log(avatar);
    return (
      <div className="manager-wrapper">
        <div className="manager-avatar">
          {avatar ? <img src={avatar} /> : 'not found'}
        </div>
        <div className="manager-info">
          <p>{name || 'not found'}</p>
          <p>{email}</p>
          <p>{invitation.status}</p>
        </div>
        <button type="button" onClick={() => removeManager(email)}>
          <i className="fas fa-trash-alt"></i> remover
        </button>
      </div>
    );
  };
  return renderCard();
}
