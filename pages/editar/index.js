import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import cookies from 'next-cookies';
import { api, setHeader } from '../../utils/axios';

import styles from '../cadastrar/styles';
import CommunityForm from '../../components/CommunityForm';

const EditCommunity = ({ credentials, notify }) => {
  const [loading, setLoading] = useState(true);
  const [community, setCommunity] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await api.get(`community/name/${router.query.name}`);
      setCommunity(data.community);
      setLoading(false);
    };
    fetchData();
  }, []);

  const sendNotification = () => {
    toast.configure();
    toast.success(
      `Comunidade editada com sucesso!\n
    Em breve ela será republicada.`
    );
  };

  const editCommunity = async (community) => {
    setLoading(true);
    setHeader(credentials);
    await api.put(`/community/update/${community._id}`, community);
    sendNotification();
    notify();
    Router.push('/');
  };

  return (
    <div className="container">
      <div className="hero-body">
        <div className="columns is-centered">
          <div className="column has-text-centered">
            <h1 className="title is-size-1-desktop is-size-2-tablet is-size-3-mobile">
              Edite sua comunidade
            </h1>
            {!loading && (
              <CommunityForm
                credentials={credentials}
                loading={loading}
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
  const credentials = cookies(ctx).ctech_credentials || {};

  if (!credentials.token) {
    ctx.res.writeHead(302, {
      Location: '/',
    });
    ctx.res.end();
  }
};
export default EditCommunity;
