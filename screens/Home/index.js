import React, { PureComponent } from 'react';
import styles from './styles';
import Card from '/components/Card/';
import Hero from '/components/Hero/';
import Menu from '/components/Menu/';
import Filter from '../../components/Filter';

// const API_HOST = 'https://www.mocky.io/v2/5d775b0f32000010d7297efe';
const API_HOST = 'https://api.sheety.co/82fac3dc-c252-4363-adfd-d9adcf477963';

export default class Home extends PureComponent {
  state = {
    list: [],
    loading: true,
    openModal: false,
    filteredList: [],
    title: '',
  };

  normalize = (array) => {
    return array
      .filter((item) => item['status'] === 'PUBLICADO')
      .map((item, index) => ({
        id: `community-${index}`,
        name: item['nomeDaComunidade'],
        location: {
          model: item['presencial,OnlineOuAmbos?'],
          country: item['paíS'],
          state: item['estado'],
          city: item['cidade'],
        },
        link: item['linkPrincipal'],
        description: item['descriçãO'],
        category: item['categoria'],
        tags: item['tags'].split(','),
        globalProgram: item['pertenceAAlgumProgramaGlobal?SeSim,Qual?'],
        size: item['quantidadeDeMembros'],
        logo: item['logoDaComunidade'],
        networkID: item['seVocêéMembroDaImpulsoNetwork,InformeSeuId'],
      }));
  };

  async componentDidMount() {
    await fetch(API_HOST)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ list: this.normalize(data) });
      });

    this.setState({
      loading: false,
      filteredList: this.state.list,
    });
  }

  handleModal = () => {
    this.setState({ openModal: !this.state.openModal });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    const filteredList = this.state.list.filter((item) => item[name] === value);
    this.setState({ filteredList, title: `${name}: ${value}` });
  };

  handleResetButton = () => {
    const filteredList = this.state.list;
    this.setState({ filteredList });
  };

  render() {
    const { filteredList, title, list } = this.state;

    return (
      <div>
        <Hero />
        <br />
        <div className="container">
          <Filter
            list={list}
            select={this.handleChange}
            reset={this.handleResetButton}
            filteredList={filteredList}
          />
          <div className="columns">
            <div className="column">
              <h4 className="menu-label">{title || 'Todas'}</h4>
              <div className="columns is-multiline">
                {filteredList.map((card) => (
                  <div className="column is-one-quarter" key={card.id}>
                    <Card content={card} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <style jsx>{styles}</style>
        </div>
      </div>
    );
  }
}
