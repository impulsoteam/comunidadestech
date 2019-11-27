import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/scss/main.scss';

import Router from 'next/router';
import cookies from 'next-cookies';
import { api, setHeader } from '../../utils/axios';

import styles from './styles';
import CommunityForm from '../../components/CommunityForm';

const RegisterCommunity = ({ credentials }) => {
  const sendNotification = () => {
    toast.configure();
    toast.success(
      `Comunidade cadastrada com sucesso!\n
    Em breve ela será publicada.`
    );
  };

  const getInitialValues = () => {
    const { _id, name, email } = credentials;
    return {
      url: 'https://',
      location: {},
      globalProgram: {},
      creator: {
        _id,
        name,
        email,
      },
      tags: [],
    };
  };

  const postCommunity = async (community) => {
    setHeader(credentials);
    await api.post('/community/store', community);
    sendNotification();
    Router.push('/');
  };

  return (
    <div className="container">
      <div className="hero-body">
        <div className="columns is-centered">
          <div className="column has-text-centered">
            <h1 className="title is-size-1-desktop is-size-2-tablet is-size-3-mobile">
              Cadastre sua comunidade
            </h1>
            <h2 className="subtitle is-size-4-desktop">
              Preencha o formulário e tenha sua comunidade publicada no nosso
              diretório!
            </h2>
          </div>
        </div>
        <div className="columns is-centered">
          <div className="column">
            <CommunityForm
              credentials={credentials}
              service={postCommunity}
              initialValues={getInitialValues()}
            />
          </div>
        </div>
      </div>

      <style jsx>{styles}</style>
    </div>
  );
};

RegisterCommunity.getInitialProps = async (ctx) => {
  const credentials = cookies(ctx).ctech_credentials || {};
  if (!credentials.token) {
    ctx.res.writeHead(302, {
      Location: '/',
    });
    ctx.res.end();
  }
};
export default RegisterCommunity;
