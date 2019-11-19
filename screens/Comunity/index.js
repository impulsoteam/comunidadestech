import React, { PureComponent } from 'react';
import styles from './styles';
import ComunityHero from '../../components/ComunityHero';
import ComunityCard from '../../components/ComunityCard';
import Card from '/components/Card/';

const API_HOST = 'https://api.sheety.co/6ae2d0d2-5f62-4e74-afb7-1696bca96d98';

export default class Comunity extends PureComponent {
  state = {
    list: [],
    filteredList: [],
  };

  normalize = (array) => {
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

  async componentDidMount() {
    await fetch(API_HOST)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ list: this.normalize(data) });
      });

    const filteredList = this.state.list.filter((item) => {
      return item.city == 'Uberlândia';
    });

    filteredList.sort((a, b) => (a.name > b.name ? 1 : -1));
    this.setState({ filteredList });
  }

  render() {
    const { filteredList } = this.state;

    return (
      <div>
        <ComunityHero />
        <ComunityCard />
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
  }
}
