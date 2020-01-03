import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { useWindowSize } from 'react-use';

import BasicInfos from './basicInfo';
import Location from './location';
import People from './people';
import Links from './links';
import FormButton from './formButton';
import styles from './styles';

import { SignupSchema } from './utils';

const CommunityForm = ({ service, initialValues, loading, credentials }) => {
  const pageTitles = {
    BasicInfos: 'Informações básicas',
    Location: 'Localização',
    People: 'Membros e Administradores',
    Links: 'Links',
  };
  const { width } = useWindowSize();
  const isMobile = width > 768 ? false : true;

  const [currentPage, setCurrentPage] = useState(Object.keys(pageTitles)[0]);

  const renderPages = (props) => {
    if (isMobile) {
      return (
        <>
          <BasicInfos {...props} />
          <Location {...props} />
          <People {...props} />
          <Links {...props} />
        </>
      );
    }

    return {
      BasicInfos: <BasicInfos {...props} />,
      Location: <Location {...props} />,
      People: <People {...props} />,
      Links: <Links {...props} />,
    }[props.currentPage];
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
        dirty,
        touched,
        setErrors,
      }) => {
        return (
          <Form>
            <div className="columns">
              <div className="column is-6-tablet is-3-desktop is-offset-2-desktop menu-column">
                {!isMobile && (
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
                )}
              </div>
              <div className="column is-6-tablet is-5-desktop content-column">
                {renderPages({
                  currentPage,
                  errors,
                  touched,
                  values,
                  dirty,
                  initialValues,

                  credentials,
                  setFieldValue,
                  setFieldTouched,
                  setErrors,
                })}
                <p className="required-form">* Itens obrigatórios</p>
                <FormButton
                  {...{
                    errors,
                    touched,
                    values,
                    pageTitles,
                    currentPage,
                    setCurrentPage,
                    loading,
                  }}
                />
                {/* <div>{renderButton({ errors, touched, values })}</div> */}
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
