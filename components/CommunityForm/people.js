import React, { useState } from 'react';
import { Field, ErrorMessage } from 'formik';

import ManagerCard from './managerCard';
import { invitationStatus } from '../../utils/variables';
import { api, setHeader } from '../../utils/axios';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

import styles from './styles';
import { errorMessages } from './utils';

export default function People({
  credentials,
  errors,
  setErrors,
  touched,
  values,
  initialValues,
  setFieldValue,
  setFieldTouched,
}) {
  const [subscribed, setSubscribed] = useState({});
  const [managers, setManagers] = useState(values.managers);
  const [isValidEmail, setValidEmail] = useState(false);

  const {
    managerAlreadyListed,
    invalidEmail,
    userSubscribed,
    userNotSubscribed,
  } = errorMessages;

  const validator = /\S+@\S+\.\S+/;
  const formatEmail = (email) => (email ? email.trim().toLowerCase() : '');
  const numberMask = createNumberMask({
    prefix: '',
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: '.',
    integerLimit: 6,
  });

  const checkManager = async (value) => {
    const email = formatEmail(value);
    const validEmail = validator.test(email);

    if (!validEmail) return setValidEmail(false);
    setValidEmail(true);
    setHeader(credentials);
    const { data: subscribed } = await api.get(`/user/checkManager/${email}`);
    setSubscribed(subscribed || { email });
    const managersEmails = values.managers.map(({ email }) => email);
    return managersEmails.includes(value) ? managerAlreadyListed : null;
  };

  const addManager = async () => {
    const manager = subscribed;
    manager.status = invitationStatus.awaiting;
    values.managers.push(manager);

    setFieldValue('manager', '');
    setFieldTouched('manager', false, false);
    setErrors({ manager: '' });
  };

  const removeManager = (email) => {
    const managers = values.managers.filter(
      (manager) => manager.email !== email
    );
    values.managers = managers;
    setManagers(values.managers);
  };

  const renderNote = () => {
    if (isValidEmail && !subscribed.name)
      return <div className="form-warning">{userNotSubscribed}</div>;

    if (isValidEmail && subscribed.name && !errors.manager)
      return <div className="form-info">{userSubscribed}</div>;
  };

  return (
    <>
      <label>
        Quantidade de Membros *
        <div className="input-wrapper">
          <i className="fas fa-users fa-fw"></i>
          <Field name="members" type="number">
            {({ field }) => (
              <MaskedInput
                {...field}
                mask={numberMask}
                className="input"
                placeholder="Digite a quantidade de membros"
              />
            )}
          </Field>
        </div>
        <ErrorMessage name="members">
          {(msg) => <div className="form-error">{msg}</div>}
        </ErrorMessage>
      </label>

      <label>
        Informe um e-mail da liderança *
        <div className="input-wrapper">
          <i className="fas fa-envelope"></i>
          <Field name="owner" className="input" placeholder="Digite o email" />
        </div>
        <ErrorMessage name="owner">
          {(msg) => <div className="form-error">{msg}</div>}
        </ErrorMessage>
      </label>
      <h2 className="is-size-4-desktop">Administradores</h2>
      <ManagerCard managers={managers} removeManager={removeManager} />
      <h2 className="is-size-4-desktop">Cadastrar Administrador</h2>
      <label>
        Email do administrador
        <div className="input-wrapper">
          <Field
            name="manager"
            onBlur={() => setFieldTouched('manager', true)}
            validate={checkManager}
            className="input is-medium"
            placeholder="Digite o email do administrador"
          />
        </div>
        <ErrorMessage name="manager">
          {(msg) => <div className="form-error">{msg}</div>}
        </ErrorMessage>
        {renderNote()}
      </label>
      <button
        disabled={!!errors.manager || !isValidEmail}
        type="button"
        className="subscribe-button"
        onClick={() => addManager()}
      >
        + adicionar administrador
      </button>
      <style jsx>{styles}</style>
    </>
  );
}
