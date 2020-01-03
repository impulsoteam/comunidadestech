import React, { useState } from 'react';
import moment from 'moment';
import { Field, ErrorMessage } from 'formik';

import ManagersList from './managersList';
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

  const { managerAlreadyListed, userNotSubscribed } = errorMessages;

  const validator = /\S+@\S+\.\S+/;
  const formatEmail = (email) => (email ? email.trim().toLowerCase() : '');
  const numberMask = createNumberMask({
    prefix: '',
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: '.',
    integerLimit: 6,
  });

  const checkManager = async (value) => {
    const isTouched = touched.manager;
    const email = formatEmail(value);
    const validEmail = validator.test(email);

    if (!validEmail) return setValidEmail(false);

    !isTouched && setFieldTouched('manager', true);
    setValidEmail(true);
    setHeader(credentials);
    const { data: subscribed } = await api.get(`/user/checkManager/${email}`);
    if (!subscribed) return userNotSubscribed;

    const managersEmails = values.managers.map(({ email }) => email);
    if (managersEmails.includes(value)) return managerAlreadyListed;
    setSubscribed(subscribed);
  };

  const addManager = async () => {
    const manager = subscribed;
    const status = invitationStatus.sent;

    manager.invitation = {
      status,
      in: moment().toDate(),
    };
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
      {managers.length !== 0 && (
        <ManagersList {...{ managers, removeManager, credentials }} />
      )}
      <h5 className="admin-title">Adicionar Administrador</h5>
      <label style={{ marginBottom: '1.25rem' }}>
        Email do administrador
        <div className="input-wrapper">
          <i className="fas fa-envelope"></i>
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
      </label>
      <div style={{ textAlign: 'right' }}>
        <button
          disabled={!!errors.manager || !isValidEmail}
          type="button"
          className="button is-primary is-outlined"
          onClick={() => addManager()}
        >
          + adicionar administrador
        </button>
      </div>
      <style jsx>{styles}</style>
    </>
  );
}
