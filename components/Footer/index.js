import React, { PureComponent } from 'react';
import styles from './styles';

export default class Footer extends PureComponent {
  render() {
    return (
      <footer className="footer">
        <div className="content has-text-centered">
          <p>
            <strong>Comunidades.tech</strong> é um projeto open source
            desenvolvido pela comunidade da <strong>Impulso.Network</strong>.
          </p>
        </div>
        <style jsx>{styles}</style>
      </footer>
    );
  }
}
