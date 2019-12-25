import React from 'react';
import { Field, ErrorMessage } from 'formik';

import styles from './styles';

export default function Links({
  credentials,
  errors,
  touched,
  values,
  initialValues,
  setFieldValue,
  setFieldTouched,
}) {
  return (
    <>
      <label>
        Link da comunidade *
        <div className="input-wrapper">
          <i className="fas fa-link"></i>
          <Field name="url" className="input" />
        </div>
        <ErrorMessage name="url">
          {(msg) => <div className="form-error">{msg}</div>}
        </ErrorMessage>
      </label>
      <style jsx>{styles}</style>
    </>
  );
}
