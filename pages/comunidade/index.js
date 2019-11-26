import React, { useState, useEffect } from 'react';
import { api } from '../../utils/axios';
import { useRouter } from 'next/router';
import styles from './styles';
import ComunityHero from '../../components/ComunityHero';
import ComunityCard from '../../components/ComunityCard';
import Card from '../../components/Card';
import loader from '../../static/comunidades-tech-loader.gif';

const Comunity = ({ token }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comunity, setComunity] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const postCommunity = async (community) => {
        setTimeout(async () => {
          const { name, email } = token;
          community.creator.name = name;
          community.creator.email = email;
          setHeader(token);
          await api.post('/community/store', community);
          toast.success(
            `😎 Comunidade cadastrada com sucesso!\n
        Em breve ela será publicada.`
          );
          Router.push('/');
        }, 10000);
      };
      const { data } = await api.get(`community/name/${router.query.name}`);
      setComunity(data.community);
      setList(data.related);
      setLoading(false);
    };
    fetchData();
  }, []);
  const checkCredentials = () => {
    const { isModerator, _id } = token;
    const { creator } = comunity;
    if (isModerator) return true;
    if (creator._id && creator._id === _id) return true;
    return false;
  };

  console.log('comuni', comunity);
  return (
    <>
      {!loading ? (
        <>
          {comunity ? (
            <div>
              <ComunityHero />
              <ComunityCard
                community={comunity}
                canModify={checkCredentials()}
                _id={comunity._id}
                name={comunity.name}
                state={comunity.location.state}
                city={
                  comunity.location.city === 'legacy'
                    ? null
                    : comunity.location.city
                }
                size={comunity.members}
                category={comunity.category}
                description={comunity.description}
                logo={comunity.logo === 'legacy' ? null : comunity.logo}
                tags={comunity.tags}
                link={comunity.url}
                token={token}
                status={comunity.status}
              />
              <div className="container related">
                <div className="columns">
                  <div className="column isfull">
                    <h3 className="title is-5">COMUNIDADES RELACIONADAS</h3>
                  </div>
                </div>
                <div className="columns is-2 is-variable is-multiline">
                  {list.map((card) => (
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
              <ComunityHero />
              <div className="container">
                <h2>Essa comunidade não existe!</h2>
              </div>
            </div>
          )}
        </>
      ) : (
        <div>
          <ComunityHero />
          <img
            src={loader}
            style={{ maxWidth: '100px', display: 'block', margin: '30px auto' }}
          />
        </div>
      )}
    </>
  );
};

Comunity.getInitialProps = async (ctx) => {
  if (!ctx.query.name) {
    ctx.res.writeHead(302, {
      Location: '/',
    });
    ctx.res.end();
  }
};

export default Comunity;
