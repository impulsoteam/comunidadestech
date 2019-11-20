import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from './styles';
import ComunityHero from '../../components/ComunityHero';
import ComunityCard from '../../components/ComunityCard';
import Card from '/components/Card/';

const API_HOST = 'https://api.sheety.co/6ae2d0d2-5f62-4e74-afb7-1696bca96d98';

const Comunity = () => {
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [comunity, setComunity] = useState([]);
  const router = useRouter();

  const normalize = (array) => {
    return array
      .filter((item) => item['status'] === 'PUBLICADO')
      .map((item, index) => ({
        id: `community-${index}`,
        name: item['nomeDaComunidade'],
        country: item['paíS'],
        state: item['estado'],
        city: item['cidade'],
        model: item['aComunidadeéPresencial,OnlineOuAmbos?'],
        link: item['linkPrincipal'],
        description: item['descriçãO'],
        category: item['categoria'],
        tags: item['tags'].split(', '),
        isGlobalProgram: item['pertenceAAlgumProgramaGlobal?'],
        globalProgram: item['qualProgramaGlobalSuaComunidadePertence?'],
        size: item['quantidadeDeMembros'],
        logo: item['logoDaComunidade'],
        networkID: item['seVocêéMembroDaImpulsoNetwork,InformeSeuId'],
        nameSearch: item['nomeDaComunidade'].toLowerCase(),
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
      const result = await axios(API_HOST);
      setComunity(filterComunity(normalize(result.data), router.query.name));
      setList(normalize(result.data));
    };
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredList(filterCity(list, comunity.city));
  }, [list, comunity]);

  console.log(filteredList);
  return (
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
  );
};

export default Comunity;
