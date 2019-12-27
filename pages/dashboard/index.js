import React, { useState, useEffect } from 'react';
import cookies from 'next-cookies';

import styles from './styles';
import loader from '../../static/comunidades-tech-loader.gif';
import { api, setHeader } from '../../utils/axios';
import Card from '../../components/Card';

export default function Dashboard({ credentials }) {
  const [loading, setLoading] = useState(true);
  const [myCommunities, setMyCommunities] = useState([]);
  const [pendingCommunities, setPendingCommunities] = useState([]);
  const [pendingInvites, setPendingInvites] = useState([]);

  useEffect(() => {
    const fetchMyCommunities = async () => {
      setHeader(credentials);
      const { data } = await api.get(`/community/owner`);
      setMyCommunities(data);
    };
    const fetchPendingCommunities = async () => {
      setHeader(credentials);
      const { data } = await api.get(`/community/status/awaitingPublication`);
      setPendingCommunities(data);
    };
    const fetchPendingInvitations = async () => {
      setHeader(credentials);
      const { data } = await api.get(`/user/invitations`);
      setPendingInvites(data);
    };
    fetchMyCommunities();
    fetchPendingInvitations();
    credentials.isModerator && fetchPendingCommunities();
    setLoading(false);
  }, []);

  const sendResponse = async ({ accept, communityId }) => {
    setHeader(credentials);
    const { data } = await api.put(`/community/invitation`, {
      accept,
      communityId,
    });

    if (data.success) {
      setHeader(credentials);
      const { data } = await api.get(`/user/invitations`);
      setPendingInvites(data);
    }
  };

  const renderDashboard = () => {
    if (loading)
      return (
        <div className="container head">
          <img
            src={loader}
            style={{ maxWidth: '100px', display: 'block', margin: '30px auto' }}
          />
        </div>
      );
    return (
      <div className="container head">
        {pendingInvites.length > 0 && (
          <div className="columns">
            <div className="column">
              <h2 className="title is-size-6 is-uppercase has-text-centered-mobile">
                Você é um administrador dessa comunidade?
              </h2>
              <h2 className="title is-size-6 is-uppercase has-text-centered-mobile">
                minhas comunidades
              </h2>
              <div className="columns is-multiline card-wrapper">
                {pendingInvites.map((invite) => (
                  <div id={invite._id}>
                    <p>
                      community name: <span>{invite.name}</span>
                    </p>
                    <p>
                      community logo:<span>{invite.logo}</span>
                    </p>
                    <button
                      onClick={() =>
                        sendResponse({ accept: true, communityId: invite._id })
                      }
                    >
                      sim
                    </button>
                    <button
                      onClick={() =>
                        sendResponse({ accept: false, communityId: invite._id })
                      }
                    >
                      nao
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
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

  return renderDashboard();
}

Dashboard.getInitialProps = async (ctx) => {
  const credentials = cookies(ctx).ctech_credentials || {};
  if (!credentials.token) {
    ctx.res.writeHead(302, {
      Location: '/',
    });
    ctx.res.end();
  }
};
