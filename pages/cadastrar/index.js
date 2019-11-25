import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/scss/main.scss';

import Router from 'next/router';
import cookies from 'next-cookies';
import { api, setHeader } from '../../utils/axios';

import styles from './styles';
import CommunityForm from '../../components/CommunityForm';

const initialValues = {
  url: 'https://',
  location: {},
  globalProgram: {},
  creator: {},
  tags: [],
};
const RegisterCommunity = ({ token }) => {
  const postCommunity = async (community) => {
    const { name, email } = token;
    community.creator.name = name;
    community.creator.email = email;
    setHeader(token);
    await api.post('/community/store', community);
    toast.success(
      `Comunidade cadastrada com sucesso!\n
      Em breve ela será publicada.`
    );
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
              token={token}
              service={postCommunity}
              initialValues={initialValues}
            />
          </div>
        </div>
      </div>

      <style jsx>{styles}</style>
    </div>
  );
};

RegisterCommunity.getInitialProps = async (ctx) => {
  const { token } = cookies(ctx).ctech_token || {};
  if (!token) {
    ctx.res.writeHead(302, {
      Location: '/',
    });
    ctx.res.end();
  }
};
export default RegisterCommunity;
