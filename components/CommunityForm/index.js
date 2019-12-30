import React, { useState } from 'react';

import { Formik, Form } from 'formik';

import BasicInfos from './basicInfo';
import Location from './location';
import People from './people';
import Links from './links';
import styles from './styles';

import { SignupSchema } from './utils';

const CommunityForm = ({ service, initialValues, loading, credentials }) => {
  const pageTitles = {
    BasicInfos: 'Informações básicas',
    Location: 'Localização',
    People: 'Membros e Administradores',
    Links: 'Links',
  };

  const [currentPage, setCurrentPage] = useState(Object.keys(pageTitles)[0]);

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
    const currentPosition = Object.keys(pageTitles).indexOf(currentPage);
    if (currentPage === lastTitle) {
      return (
        <>
          <button
            disabled={loading}
            className="button is-primary is-fullwidth is-large"
            type="submit"
          >
            {loading ? (
              <span>
                <i className="fa fa-spinner fa-spin"></i> Criar Comunidade
              </span>
            ) : (
              'Criar Comunidade'
            )}
          </button>
          <style jsx>{styles}</style>
        </>
      );
    } else {
      return (
        <>
          <button
            disabled={loading}
            className="button is-primary is-fullwidth is-large"
            type="button"
            onClick={() =>
              setCurrentPage(Object.keys(pageTitles)[currentPosition + 1])
            }
          >
            Continuar
          </button>
          <style jsx>{styles}</style>
        </>
      );
    }
  };

  console.log('a pagina', currentPage);
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
            <div className="columns">
              <div className="column is-6-tablet is-3-desktop is-offset-2-desktop menu-column">
                <ul>
                  {Object.keys(pageTitles).map((page) => (
                    <li
                      className={`page-title ${
                        page === currentPage ? 'is-active' : ''
                      }`}
                      key={page}
                      onClick={() => setCurrentPage(page)}
                    >
                      {pageTitles[page]}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="column is-6-tablet is-5-desktop content-column">
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
                <div>{renderButton()}</div>
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
