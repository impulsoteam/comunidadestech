import React, { Component } from 'react';

class Menu extends Component {
  render() {
    const { list, selectedStack, select } = this.props;
    return (
      <aside className="menu">
        <p className="menu-label">Categorias</p>
        <ul className="menu-list">
          {list.map((item) => (
            <li>
              <a className="is-active" onClick={() => select(item.name)}>
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </aside>
    );
  }
}

export default Menu;
