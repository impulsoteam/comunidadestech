import React from 'react';

export default function ManagerCard({ managers, removeManager }) {
  return managers.map(({ avatar, name, email, status }) => (
    <>
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
        status: <span>{status}</span>
      </p>
      <button type="button" onClick={() => removeManager(email)}>
        remover
      </button>
    </>
  ));
}
