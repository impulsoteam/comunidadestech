import React, { Component } from 'react';
import styles from './styles';

class MenssageComponent extends Component {
  render() {
    return (
      <div className="MenssageComponent">
        <div className="menssage-content">
          <div className="msg-box">
            <div className="container">
              <div className="columns is-centered">
                <div className="column has-text-centered">
                  <img
                    className="login-logo"
                    src="/static/404.svg"
                    width="340"
                      />
                  <h1 className="title">Página não encontrada</h1>
                  <p>O endereço que está procurando não existe, foi modificado ou tem acesso restrito.</p>
                  <a href="/">voltar à página inicial</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <style jsx>{styles}</style>
      </div>
      );
    }
  }

  export default MenssageComponent;
