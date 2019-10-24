import React, { PureComponent } from 'react';
import styles from './styles';
import Card from '/components/Card/';
import Hero from '/components/Hero/';
import Filter from '../../components/Filter';
import Counter from '../../components/Counter';
import { throws } from 'assert';
import Router, { useRouter } from 'next/router';
import { urlRegex, pairsRegex } from '../../utils/urlRegex';

const API_HOST = 'https://api.sheety.co/6ae2d0d2-5f62-4e74-afb7-1696bca96d98';

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
    searchURL: '',
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

    const param = Object.keys(Router.router.query)[0];
    const value = Router.router.query[[param]];
    if (param && value) {
      const filteredList = this.state.list.filter((item) =>
        item[param].includes(`${value}`)
      );
      this.setState({ filteredList });
    }
    let currentURL = window.location.href.match(urlRegex);
    let currentParams = currentURL ? pairsRegex.exec(currentURL)[2] : '';

    this.setState({ searchURL: currentParams });

    if (window.location.href.match(urlRegex) && window.location.href.match(urlRegex)[0].substring(0, 2) == '?=') {
      let filteredList = this.state.list.filter((item) => {
        return item['name'].includes(currentParams);
      });
      this.setState({ filteredList, inputValue: currentParams });
    }
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
      const href = `/?${name}=${value}`;
      const as = href;
      Router.push(href, as, { shallow: true });
      this.setState({ selectionFemale: value });
    }

    if (name === 'tags') {
      value === 'Todas'
        ? (filteredList = this.state.list)
        : (filteredList = this.state.list.filter((item) =>
            item[name].includes(`${value}`)
          ));
      const href = `/?${name}=${value}`;
      const as = href;
      Router.push(href, as, { shallow: true });
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
      const href = `/?${name}=${value}`;
      const as = href;
      Router.push(href, as, { shallow: true });
      this.setState({ selectedModel: value, selectionFemale: 'Todas' });
    }

    if (name === 'country' || name === 'state' || name === 'city') {
      filteredList = this.state.list.filter((item) => item[name] === value);

      if (value === 'Todas' || value === 'Todos')
        filteredList = this.state.list;

      name === 'country' &&
        this.setState({
          selectedCountry: value,
          selectionMale: value,
          selectionFemale: 'Todas',
        });
      name === 'state' && this.setState({ selectedState: value });
    }

    this.setState({ filteredList });
  };

  handleInput = (event) => {
    const { value } = event.target;
    let inputValue = '';
    inputValue = value;
    const href = `/?${name}=${value}`;
    const as = href;
    Router.push(href, as, { shallow: true });

    let filteredList = this.state.list.filter((item) => {
      return item['name'].includes(this.state.inputValue);
    });

    this.setState({ inputValue, filteredList });
  };

  handleInputFocus = () => {
    this.setState({
      filteredList: this.state.list,
      selectionFemale: 'Todas',
      selectedModel: 'Ambos',
      selectedState: '',
      selectedCountry: '',
      selectionMale: 'Todos',
      inputValue: '',
    });
  };

  handleResetButton = () => {
    this.setState({
      filteredList: this.state.list,
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
      if (item.state && item.city !== null) {
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

    filteredList.sort((a, b) => (a.name > b.name ? 1 : -1));

    return (
      <div>
        <Hero />
        <Counter list={list} />
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
            focus={this.handleInputFocus}
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
