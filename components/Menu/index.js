import React, { Component } from 'react';
import styles from './styles';

class Menu extends Component {
  render() {
    const { list, selectedStack, select } = this.props;
    return (
      <aside className="menu">
        <p className="menu-label">Categorias</p>
        <ul className="menu-list">
          {list.map((item) => (
            <li>
              <a
                className={item.name === selectedStack && 'is-active'}
                onClick={() => select(item.name)}
              >
                {item.name}
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
