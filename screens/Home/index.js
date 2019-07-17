import React, { PureComponent } from 'react';
import styles from './styles';
import Card from '/components/Card/';
import Hero from '/components/Hero/';
import Menu from '/components/Menu/';

const API_HOST = 'https://api.sheety.co/f29670ad-1584-4fc8-a946-db9474934c3a';

export default class Home extends PureComponent {
  state = {
    list: [],
    loading: true,
    openModal: false,
    filteredList: [],
    selectedStack: null,
    stacks: [],
  };

  normalize = (array) => {
    return array
      .filter((item) => item['status'] === 'PUBLICADO')
      .map((item, index) => ({
        id: `community-${index}`,
        city: item['emQualCidadeDoBrasil'],
        description: item['descrevaAComunidadeComUmaBreveFrase'],
        isPresential: item['HáEncontrosPresenciais?'] === 'TRUE',
        link: item['linkDaPrincipaláReaDeConteúDoDaComunidade'],
        logo: item['linkDaMarcaDaComunidade'],
        name: item['nomeDaComunidade'],
        primaryStack: item['principalTóPicoDaComunidade'],
        size: item['quantidadeAproximadaDeMembros'],
        state: item['emQualEstadoDoBrasil'],
      }));
  };

  async componentDidMount() {
    await fetch(API_HOST)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ list: this.normalize(data) });
      });
    const stacks = [];
    for (const item of this.state.list) {
      const index = stacks.findIndex(
        (stack) => stack.name === item.primaryStack
      );
      index >= 0
        ? (stacks[index] = {
            name: stacks[index].name,
            value: stacks[index].value + 1,
          })
        : stacks.push({
            name: item.primaryStack,
            value: 1,
          });
    }

    this.setState({
      loading: false,
      filteredList: this.state.list,
      stacks,
    });
  }

  handleStack = (stack) => {
    this.setState({
      selectedStack: stack,
      filteredList:
        stack === ''
          ? this.state.list
          : this.state.list.filter((item) => item.primaryStack === stack),
    });
  };

  handleModal = () => {
    this.setState({ openModal: !this.state.openModal });
  };

  render() {
    const { selectedStack, filteredList, stacks } = this.state;
    return (
      <div>
        <Hero />
        <br />
        <div className="container">
          <div className="columns">
            <div className="column is-one-quarter">
              <Menu
                list={stacks}
                select={this.handleStack}
                selected={selectedStack || 'Todas'}
                selectedStack={selectedStack}
              />
            </div>
            <div className="column">
              <h4 className="menu-label">{selectedStack || 'Todas'}</h4>
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
