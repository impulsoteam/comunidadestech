import React, { Component } from 'react';
import styles from './styles';

class Menu extends Component {
  render() {
    const { list, selectedStack, select } = this.props;
    return (
      <aside className="menu">
        <p className="menu-label">Categorias</p>
        <ul className="menu-list">
          <li key="all">
            <a onClick={() => select('')}>
              <span className="column">Todas</span>
              <span className="tag is-primary column">
                {list.length > 0 && list.reduce((a, b) => a.value + b.value)}
              </span>
            </a>
          </li>
          {list.map((item, index) => (
            <li key={`${index}-${item.name}`}>
              <a
                className={item.name === selectedStack && 'is-active'}
                onClick={() => select(item.name)}
              >
                <span className="column">{item.name}</span>
                <span className="tag is-primary column">{item.value}</span>
              </a>
            </li>
          ))}
        </ul>
        <style jsx>{styles}</style>
      </aside>
    );
  }
}

export default Menu;
