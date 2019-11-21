import React, { useState, useEffect } from 'react';
import { api } from '../../utils/axios';
import { useRouter } from 'next/router';
import styles from './styles';
import ComunityHero from '../../components/ComunityHero';
import ComunityCard from '../../components/ComunityCard';
import Card from '/components/Card/';

const Comunity = () => {
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [comunity, setComunity] = useState([]);
  const router = useRouter();

  const normalize = (array) => {
    return array.map((item, index) => ({
      id: `community-${index}`,
      name: item.name,
      country:
        item.location.country !== 'legacy' ? item.location.country : null,
      state: item.location.state !== 'legacy' ? item.location.state : null,
      city: item.location.city !== 'legacy' ? item.location.city : null,
      model:
        (item.model === 'both' && 'Ambos') ||
        (item.model === 'presential' && 'Presencial') ||
        (item.model === 'online' && 'Online'),
      link: item.url,
      description: item.description,
      category: item.category,
      tags: item.tags,
      isGlobalProgram: item.globalProgram.isParticipant,
      size: item.members,
      logo: item.logo !== 'legacy' ? item.logo : null,
      nameSearch: item.name.toLowerCase(),
    }));
  };

  const filterCity = (array, city) => {
    const list = array.filter((item) => {
      return item.city == city;
    });
    list.sort((a, b) => (a.name > b.name ? 1 : -1));
    return list;
  };

  const filterComunity = (array, name) => {
    return array.find((item) => item.name === name);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await api.get('/community/getAll');
      filterComunity(normalize(data), router.query.name)
        ? setComunity(filterComunity(normalize(data), router.query.name))
        : setComunity(null);
      setList(normalize(data));
    };
    fetchData();
  }, []);

  useEffect(() => {
    comunity && setFilteredList(filterCity(list, comunity.city));
  }, [list, comunity]);

  return (
    <>
      {comunity ? (
        <div>
          <ComunityHero />
          <ComunityCard
            name={comunity.name}
            state={comunity.state}
            city={comunity.city}
            size={comunity.size}
            category={comunity.category}
            description={comunity.description}
            logo={comunity.logo}
            tags={comunity.tags}
            link={comunity.link}
          />
          <div className="container related">
            <div className="columns">
              <div className="column isfull">
                <h3 className="title is-5">COMUNIDADES RELACIONADAS</h3>
              </div>
            </div>
            <div className="columns is-2 is-variable is-multiline">
              {filteredList.slice(0, 3).map((card) => (
                <div className="column is-one-third" key={card.id}>
                  <Card content={card} />
                </div>
              ))}
            </div>
          </div>
          <style jsx>{styles}</style>
        </div>
      ) : (
        <div className="container">
          <h1>404 - Comunidade não existe!</h1>
        </div>
      )}
    </>
  );
};

export default Comunity;
