import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import cookies from 'next-cookies';
import { api, setHeader } from '../../utils/axios';

import styles from './styles';
import CommunityForm from '../../components/CommunityForm';

const EditCommunity = ({ token }) => {
  const [loading, setLoading] = useState(true);
  const [community, setComunity] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await api.get(`community/name/${router.query.name}`);
      setComunity(data.community);
      setLoading(false);
    };
    fetchData();
  }, []);
  const editCommunity = async (community) => {
    console.log('editando', community);
    setHeader(token);
    const { data } = await api.put(`/community/${comminuty._id}`, community);
    console.log('response', data);
  };

  return (
    <div className="container">
      <div className="hero-body">
        <div className="columns is-centered">
          <div className="column has-text-centered">
            <h1 className="title is-size-1-desktop is-size-2-tablet is-size-3-mobile">
              Edite sua comunidade
            </h1>
            <h2 className="subtitle is-size-4-desktop">textoaquitextoqui</h2>
            {!loading && (
              <CommunityForm
                token={token}
                service={editCommunity}
                initialValues={community}
              />
            )}
          </div>
        </div>
      </div>

      <style jsx>{styles}</style>
    </div>
  );
};

EditCommunity.getInitialProps = async (ctx) => {
  const { token } = cookies(ctx).ctech_token || {};

  if (!token) {
    ctx.res.writeHead(302, {
      Location: '/',
    });
    ctx.res.end();
  }
};
export default EditCommunity;
