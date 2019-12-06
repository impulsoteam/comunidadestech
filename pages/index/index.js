import React, { PureComponent } from 'react';
import styles from './styles';
import { api, setHeader } from '../../utils/axios';
import Card from '/components/Card/';
import Hero from '/components/Hero/';
import Filter from '../../components/Filter';
import Counter from '../../components/Counter';
import Router from 'next/router';
import loader from '../../static/comunidades-tech-loader.gif';
import { paramFilter, normalize } from '../../utils/index';
export default class Home extends PureComponent {
  state = {
    list: [],
    loading: true,
    openModal: false,
    multipleFilter: {},
    filteredMulti: [],
    searchURL: '',
    searchName: '',
  };

  async componentDidMount() {
    setHeader(this.props.credentials);
    const { data } = await api.get('/community/status/published');
    this.setState({ list: normalize(data) });

    const route = Router.router.query;
    let newFilter = this.state.multipleFilter;
    for (const prop in route) {
      newFilter[prop] = route[prop];
    }

    const filteredMulti = paramFilter(this.state.list, newFilter);

    this.setState({
      filteredMulti,
      multipleFilter: newFilter,
      loading: false,
    });
  }

  handleModal = () => {
    this.setState({ openModal: !this.state.openModal });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    let newFilter = this.state.multipleFilter;

    value === 'all'
      ? (newFilter[name] = '')
      : name === 'nameSearch'
      ? (newFilter[name] = value.toLowerCase())
      : (newFilter[name] = value);
    name === 'state' && (newFilter['city'] = '');
    this.setState({ multipleFilter: newFilter });
    const filteredMulti = paramFilter(this.state.list, newFilter);
    this.setState({ filteredMulti });

    let address = '/?';
    for (const prop in newFilter) {
      newFilter[prop] &&
        (address = `${address}${prop}=`) &&
        (address = `${address}${newFilter[prop]}&`);
    }
    const href = address.slice(0, -1);
    const as = href;
    Router.push(href, as, { shallow: true });
  };

  handleResetButton = () => {
    const href = '/';
    const as = href;
    Router.push(href, as, { shallow: true });

    this.setState({
      filteredMulti: this.state.list,
      multipleFilter: {},
    });
  };

  getPropertyList = (list) => {
    const propertyList = {
      tags: [],
      types: [],
      locations: {},
    };
    let { types, locations } = propertyList;

    list.forEach((item) => {
      item.type !== 'legacy' &&
        !types.includes(item.type) &&
        types.push(item.type);
      propertyList.tags = Array.from(
        new Set(propertyList.tags.concat(item.tags))
      );
      item.location.country && (locations[item.location.country] = {});
    });

    list.forEach((item) => {
      item.location.state &&
        (locations[item.location.country][item.location.state] = []);
    });

    list.forEach((item) => {
      item.location.state &&
        item.location.city !== null &&
        locations[item.location.country][item.location.state].push(
          item.location.city
        );
    });
    return propertyList;
  };

  render() {
    const { list, loading, filteredMulti, multipleFilter } = this.state;
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
                multipleFilter={multipleFilter}
                propertyList={this.getPropertyList(list)}
              />
              <div className="columns">
                <div className="column">
                  <div className="columns is-multiline card-wrapper">
                    {filteredMulti.map((card) => (
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
