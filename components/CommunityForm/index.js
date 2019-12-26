import React, { useState } from 'react';
import { Formik, Form } from 'formik';

import { SignupSchema } from './utils';
import BasicInfos from './basicInfo';
import Location from './location';
import People from './people';
import Links from './links';
import styles from './styles';

const CommunityForm = ({ service, initialValues, loading, credentials }) => {
  const [currentPage, setCurrentPage] = useState(Object.keys(pageTitles)[0]);

  const pageTitles = {
    BasicInfos: 'Informações básicas',
    Location: 'Localização',
    People: 'Membros e Administradores',
    Links: 'Links',
  };

  const renderPages = (props) => {
    return {
      BasicInfos: <BasicInfos {...props} />,
      Location: <Location {...props} />,
      People: <People {...props} />,
      Links: <Links {...props} />,
    }[props.currentPage];
  };

  const renderButton = () => {
    const titles = Object.keys(pageTitles);
    const lastTitle = titles[titles.length - 1];
    if (currentPage === lastTitle)
      return (
        <button
          disabled={loading}
          className="button is-primary is-fullwidth is-large"
          type="submit"
        >
          {loading ? (
            <span>
              <i className="fa fa-spinner fa-spin"></i> Cadastrar Comunidade
            </span>
          ) : (
            'Cadastrar Comunidade'
          )}
        </button>
      );
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SignupSchema}
      onSubmit={(values) => {
        if (typeof values.members === 'string')
          values.members = parseInt(values.members.replace('.', ''));
        service(values);
      }}
    >
      {({
        values,
        setFieldValue,
        setFieldTouched,
        errors,
        touched,
        setErrors,
      }) => {
        return (
          <Form>
            <div>
              {Object.keys(pageTitles).map((page) => (
                <p
                  className="title is-7"
                  key={page}
                  onClick={() => setCurrentPage(page)}
                >
                  {pageTitles[page]}
                </p>
              ))}
            </div>
            <div className="columns">
              <div className="column is-6-tablet is-offset-3-tablet is-4-desktop is-offset-4-desktop">
                {renderPages({
                  currentPage,
                  errors,
                  touched,
                  values,
                  initialValues,
                  credentials,
                  setFieldValue,
                  setFieldTouched,
                  setErrors,
                })}

                <p className="required-form">* Itens obrigatórios</p>
              </div>
            </div>
            <div className="columns">
              <div className="column is-6-tablet is-offset-3-tablet is-4-desktop is-offset-4-desktop">
                {renderButton()}
              </div>
            </div>
            <style jsx>{styles}</style>
          </Form>
        );
      }}
    </Formik>
  );
};

CommunityForm.getInitialProps = async (ctx) => {
  const credentials = cookies(ctx).ctech_credentials || {};
  return { ...credentials };
};

export default CommunityForm;
