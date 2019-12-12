import React, { useState, useEffect } from 'react';
import cookies from 'next-cookies';

import styles from './styles';
import { api, setHeader } from '../../utils/axios';
import Card from '../../components/Card';

const Dashboard = ({ credentials }) => {
  const [loading, setLoading] = useState(true);
  const [myCommunities, setMyCommunities] = useState([]);
  const [pendingCommunities, setPendingCommunities] = useState([]);

  useEffect(() => {
    const fetchMyCommunities = async () => {
      setHeader(credentials);
      const { data } = await api.get(`/community/owner`);
      setMyCommunities(data);
      setLoading(false);
    };
    const fetchPendingCommunities = async () => {
      setHeader(credentials);
      const { data } = await api.get(`/community/status/awaitingPublication`);
      setPendingCommunities(data);
      setLoading(false);
    };
    fetchMyCommunities();
    credentials.isModerator && fetchPendingCommunities();
  }, []);
  return (
    <div className="container head">
      {!loading && (
        <div className="columns">
          <div className="column">
            <h2 className="title is-size-6 is-uppercase has-text-centered-mobile">
              minhas comunidades
            </h2>
            <div className="columns is-multiline card-wrapper">
              {myCommunities.map((card) => (
                <div className="column is-one-quarter" key={card.id}>
                  <Card withOptions content={card} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="is-divider"></div>
      {pendingCommunities.length > 0 && (
        <div className="columns">
          <div className="column">
            <h2 className="title is-size-6 is-uppercase has-text-centered-mobile">
              comunidades pendentes
            </h2>
            <div className="columns is-multiline card-wrapper">
              {pendingCommunities.map((card) => (
                <div className="column is-one-quarter" key={card.id}>
                  <Card withOptions content={card} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <style jsx>{styles}</style>
    </div>
  );
};

Dashboard.getInitialProps = async (ctx) => {
  const credentials = cookies(ctx).ctech_credentials || {};
  if (!credentials.token) {
    ctx.res.writeHead(302, {
      Location: '/',
    });
    ctx.res.end();
  }
};

export default Dashboard;
