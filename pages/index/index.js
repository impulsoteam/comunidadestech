import React, { PureComponent } from 'react';
import styles from './styles';
import { api, setHeader } from '../../utils/axios';
import Card from '/components/Card/';
import Hero from '/components/Hero/';
import Filter from '../../components/Filter';
import Counter from '../../components/Counter';
import Router from 'next/router';
import { urlRegex, pairsRegex } from '../../utils/urlRegex';
import loader from '../../static/comunidades-tech-loader.gif';
export default class Home extends PureComponent {
  state = {
    list: [],
    loading: true,
    openModal: false,
    filteredList: [],
    selectedCity: '',
    selectedState: '',
    selectedCountry: '',
    selectedModel: 'Ambos',
    inputValue: '',
    selectionFemale: 'Todas',
    selectionMale: 'Todos',
    searchURL: '',
    searchName: '',
  };

  normalize = (array) => {
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
      members: item.members,
      logo: item.logo !== 'legacy' ? item.logo : null,
      nameSearch: item.name.toLowerCase(),
    }));
  };

  async componentDidMount() {
    setHeader(this.props.token);
    const { data } = await api.get('/community/status/published');
    this.setState({ list: this.normalize(data) });
    this.setState({
      loading: false,
      filteredList: this.state.list,
    });

    const param = Object.keys(Router.router.query)[0];
    const value = Router.router.query[[param]];
    const stateParam = Object.keys(Router.router.query)[1];
    const stateValue = Router.router.query[[stateParam]];
    const cityParam = Object.keys(Router.router.query)[2];
    const cityValue = Router.router.query[[cityParam]];

    if (param && value) {
      if (param === 'country') {
        this.setState({
          selectedCountry: value,
          selectionMale: value,
          selectionFemale: 'Todas',
        });
        if (stateParam) {
          const filteredList = this.state.list.filter(
            (item) => item['state'] === stateValue
          );
          this.setState({ selectedState: stateValue, filteredList });

          if (cityParam) {
            const filteredList = this.state.list.filter(
              (item) => item['city'] === cityValue
            );
            this.setState({ selectedCity: cityValue, filteredList });
          }
        }
      } else {
        const filteredList = this.state.list.filter((item) =>
          item[param].includes(`${value}`)
        );
        this.setState({ filteredList });
      }
    }
    let currentURL = window.location.href.match(urlRegex);
    let currentParams = currentURL ? pairsRegex.exec(currentURL)[2] : '';

    this.setState({ searchURL: currentParams });

    if (
      window.location.href.match(urlRegex) &&
      window.location.href.match(urlRegex)[0].substring(0, 2) == '?='
    ) {
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
      this.setState({ selectionFemale: value, inputValue: '' });
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
      this.setState({
        selectedModel: value,
        selectionFemale: 'Todas',
        inputValue: '',
      });
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
      name === 'state' &&
        this.setState({ selectedState: value, inputValue: '' });

      const hrefCountry = name === 'country' ? `/?${name}=${value}` : '';
      const hrefState =
        name === 'state'
          ? `/?country=${this.state.selectedCountry}&state=${value}`
          : '';
      const hrefCity =
        name === 'city'
          ? `/?country=${this.state.selectedCountry}&state=${this.state.selectedState}&city=${value}`
          : '';
      const href = hrefCountry + hrefState + hrefCity;
      const as = href;
      Router.push(href, as, { shallow: true });
    }

    this.setState({ filteredList, inputValue: '' });
  };

  handleInput = (event) => {
    const { value } = event.target;
    let inputValue = '';
    inputValue = value.toLowerCase();

    const href = `/?${name}=${value}`;
    const as = href;
    Router.push(href, as, { shallow: true });

    let filteredList = this.state.list.filter((item) => {
      return item['nameSearch'].includes(this.state.inputValue);
    });

    this.setState({ inputValue, filteredList });
  };

  handleInputFocus = () => {
    const name = this.inputValue;
    this.setState({
      filteredList: this.state.list,
      selectionFemale: 'Todas',
      selectedModel: 'Ambos',
      selectedState: '',
      selectedCity: '',
      selectedCountry: '',
      selectionMale: 'Todos',
      inputValue: name,
    });
  };

  handleResetButton = () => {
    this.setState({
      filteredList: this.state.list,
      selectionFemale: 'Todas',
      selectedModel: 'Ambos',
      selectedState: '',
      selectedCity: '',
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
      selectedCity,
      selectedState,
      selectedCountry,
      selectedModel,
      selectionFemale,
      selectionMale,
      inputValue,
      loading,
    } = this.state;

    filteredList.sort((a, b) => (a.name > b.name ? 1 : -1));
    return (
      <>
        {!loading ? (
          <div>
            <Hero />
            <Counter list={list} />
            <br />
            <div className="container">
              <Filter
                list={list}
                select={this.handleChange}
                reset={this.handleResetButton}
                inputOk={this.handleInput}
                tags={this.tags(list)}
                location={this.location(list)}
                model={selectedModel}
                country={selectedCountry}
                state={selectedState}
                city={selectedCity}
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
        ) : (
          <div>
            <img
              src={loader}
              style={{
                maxWidth: '100px',
                display: 'block',
                margin: '30px auto',
              }}
            />
          </div>
        )}
      </>
    );
  }
}
