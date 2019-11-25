import React, { PureComponent } from 'react';
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
export default class Register extends PureComponent {
  postCommunity = async (community) => {
    const { name, email } = this.props.token;
    community.creator.name = name;
    community.creator.email = email;
    setHeader(this.props.token);
    const { data } = await api.post('/community/store', community);
  };
  render() {
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
              <CommunityForm
                token={this.props.token}
                service={this.postCommunity}
                initialValues={initialValues}
              />
            </div>
          </div>
        </div>

        <style jsx>{styles}</style>
      </div>
    );
  }
}

Register.getInitialProps = async (ctx) => {
  const { token } = cookies(ctx).ctech_token || {};
  if (!token) {
    ctx.res.writeHead(302, {
      Location: '/',
    });
    ctx.res.end();
  }
};
