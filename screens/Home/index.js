import React, { PureComponent } from 'react';
import styles from './styles';
import Card from '/components/Card/';
import Hero from '/components/Hero/';
import Menu from '/components/Menu/';
import Filter from '../../components/Filter';

const API_HOST = 'https://www.mocky.io/v2/5d7a6029320000a9fc34ef49';
// const API_HOST = 'https://api.sheety.co/82fac3dc-c252-4363-adfd-d9adcf477963';

export default class Home extends PureComponent {
  state = {
    list: [],
    loading: true,
    openModal: false,
    filteredList: [],
    title: '',
    selectedState: '',
    selectedCountry: '',
    selectedModel: 'Ambos',
    inputValue: '',
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

    let selectedModel = '';
    let selectedCountry = '';
    let selectedState = '';
    let filteredList =
      value === 'Todos' || value === 'Todas'
        ? (filteredList = this.state.list)
        : this.state.list.filter((item) => item[name] === value);

    if (name === 'tags') {
      filteredList = this.state.list.filter((item) => {
        return item[name].includes(`${value}`);
      });
    }

    if ((name === 'model') & (value === 'Ambos')) {
      selectedModel = value;
      filteredList = this.state.list.filter((item) => {
        return (
          item[name] === 'Ambos' ||
          item[name] === 'Presencial' ||
          item[name] === 'Online'
        );
      });
      this.setState({ selectedModel });
    } else {
      selectedModel = value;
      this.setState({ selectedModel });
    }

    if (name === 'state') {
      selectedState = value;
      this.setState({ selectedState });
    }

    if (name === 'country') {
      selectedCountry = value;
      this.setState({ selectedCountry });
    }

    this.setState({ filteredList, title: `${name}: ${value}` });
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
    this.setState({ filteredList });
  };

  render() {
    const {
      filteredList,
      title,
      list,
      selectedState,
      selectedCountry,
      selectedModel,
    } = this.state;

    let location = { Brasil: {} };
    let tags = [];

    const includeCountry = list.forEach((item) => {
      if (item.country) {
        location[`${item.country}`] = {};
      }
    });
    const includeStates = list.forEach((item) => {
      if (item.state) {
        location[`${item.country}`][`${item.state}`] = [];
      }
    });
    const includeCities = list.forEach((item) => {
      if (item.state) {
        location[`${item.country}`][`${item.state}`].push(`${item.city}`);
      }
    });

    const joinTags = list.forEach((comunity) => {
      tags = Array.from(new Set(tags.concat(comunity.tags)));
    });

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
            filteredList={filteredList}
            tags={tags}
            location={location}
            model={selectedModel}
            country={selectedCountry}
            state={selectedState}
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
