import React, { useState, useEffect } from 'react';
import { api } from '../../utils/axios';
import { useRouter } from 'next/router';
import styles from './styles';
import CommunityHero from '../../components/ComunityHero';
import CommunityCard from '../../components/ComunityCard';
import Card from '../../components/Card';
import loader from '../../static/comunidades-tech-loader.gif';

const Community = ({ credentials }) => {
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [community, setCommunity] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await api.get(`community/name/${router.query.name}`);
      setCommunity(data.community);
      setRelated(data.related);
      setLoading(false);
    };
    fetchData();
  }, []);

  const checkCredentials = () => {
    const { isModerator, _id } = credentials;
    const { creator } = community;
    if (isModerator) return true;
    if (creator._id && creator._id === _id) return true;
    return false;
  };

  return (
    <>
      {!loading ? (
        <>
          {community ? (
            <div>
              <CommunityHero />
              <CommunityCard
                canModify={checkCredentials()}
                community={community}
                credentials={credentials}
                type={community.type}
              />
              <div className="container related">
                <div className="columns">
                  <div className="column isfull">
                    <h3 className="title is-5">COMUNIDADES RELACIONADAS</h3>
                  </div>
                </div>
                <div className="columns is-2 is-variable is-multiline">
                  {related.map((card) => (
                    <div className="column is-one-third" key={card.id}>
                      <Card content={card} />
                    </div>
                  ))}
                </div>
              </div>
              <style jsx>{styles}</style>
            </div>
          ) : (
            <div>
              <CommunityHero />
              <div className="container">
                <h2>Essa comunidade não existe!</h2>
              </div>
            </div>
          )}
        </>
      ) : (
        <div>
          <CommunityHero />
          <img
            src={loader}
            style={{ maxWidth: '100px', display: 'block', margin: '30px auto' }}
          />
        </div>
      )}
    </>
  );
};

Community.getInitialProps = async (ctx) => {
  if (!ctx.query.name) {
    ctx.res.writeHead(302, {
      Location: '/',
    });
    ctx.res.end();
  }
};

export default Community;
