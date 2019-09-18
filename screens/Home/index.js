import React, { PureComponent } from 'react';
import styles from './styles';
import Card from '/components/Card/';
import Hero from '/components/Hero/';
import Filter from '../../components/Filter';

//const API_HOST = 'https://www.mocky.io/v2/5d7a6029320000a9fc34ef49';
const API_HOST = 'https://api.sheety.co/82fac3dc-c252-4363-adfd-d9adcf477963';

export default class Home extends PureComponent {
  state = {
    list: [],
    loading: true,
    openModal: false,
    filteredList: [],
    selectedState: '',
    selectedCountry: '',
    selectedModel: 'Ambos',
    inputValue: '',
    selectionFemale: 'Todas',
    selectionMale: 'Todos',
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
        model: item['presencial,OnlineOuAmbos?'],
        link: item['linkPrincipal'],
        description: item['descriçãO'],
        category: item['categoria'],
        tags: item['tags'].toLowerCase().split(', '),
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
      selectedState: '',
      selectedCountry: '',
      selectedModel: 'Ambos',
      inputValue: '',
    });
  }

  handleModal = () => {
    this.setState({ openModal: !this.state.openModal });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    let selectedCountry = '';
    let selectedState = '';
    let filteredList = [];

    if (name === 'category') {
      value === 'Todas'
        ? (filteredList = this.state.list)
        : (filteredList = this.state.list.filter((item) =>
            item[name].includes(`${value}`)
          ));
      this.setState({ selectionFemale: value });
    }

    if (name === 'tags') {
      value === 'Todas'
        ? (filteredList = this.state.list)
        : (filteredList = this.state.list.filter((item) =>
            item[name].includes(`${value}`)
          ));
      this.setState({ selectionFemale: value });
    }

    if (name === 'model') {
      value === 'Ambos'
        ? (filteredList = this.state.list.filter((item) => {
            return (
              item[name] === 'Ambos' ||
              item[name] === 'Presencial' ||
              item[name] === 'Online'
            );
          }))
        : (filteredList = this.state.list.filter((item) =>
            item[name].includes(`${value}`)
          ));
      this.setState({ selectedModel: value });
    }

    if (name === 'country' || name === 'state' || name === 'city') {
      filteredList = this.state.list.filter((item) => item[name] === value);
      name === 'country' &&
        this.setState({ selectedCountry: value, selectionMale: value });
      name === 'state' && this.setState({ selectedState: value });
    }

    this.setState({ filteredList });
  };

  handleForm = (event) => {
    event.preventDefault();
    let filteredList = this.state.list.filter((item) => {
      return item['name'].includes(this.state.inputValue);
    });
    this.setState({
      filteredList,
    });
  };

  handleInput = (event) => {
    const { value } = event.target;
    let inputValue = '';
    inputValue = value;
    this.setState({ inputValue });
  };

  handleResetButton = () => {
    const filteredList = this.state.list;
    this.setState({
      filteredList,
      selectionFemale: 'Todas',
      selectedModel: 'Ambos',
      selectedState: '',
      selectedCountry: '',
      selectionMale: 'Todos',
      inputValue: '',
    });
  };

  location = (list) => {
    let location = { Brasil: {} };

    list.forEach((item) => {
      if (item.country) {
        location[item.country] = {};
      }
    });

    list.forEach((item) => {
      if (item.state) {
        location[item.country][item.state] = [];
      }
    });

    list.forEach((item) => {
      if (item.state) {
        location[item.country][item.state].push(`${item.city}`);
      }
    });

    return location;
  };

  tags = (list) => {
    let tags = [];
    list.forEach((comunity) => {
      tags = Array.from(new Set(tags.concat(comunity.tags)));
    });

    return tags;
  };

  render() {
    const {
      filteredList,
      list,
      selectedState,
      selectedCountry,
      selectedModel,
      selectionFemale,
      selectionMale,
      inputValue,
    } = this.state;

    return (
      <div>
        <Hero />
        <br />
        <div className="container">
          <Filter
            list={list}
            select={this.handleChange}
            reset={this.handleResetButton}
            formOk={this.handleForm}
            inputOk={this.handleInput}
            tags={this.tags(list)}
            location={this.location(list)}
            model={selectedModel}
            country={selectedCountry}
            state={selectedState}
            selectionFemale={selectionFemale}
            selectionMale={selectionMale}
            inputValue={inputValue}
          />
          <div className="columns">
            <div className="column">
              <div className="columns is-multiline card-wrapper">
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
