import React, { Component } from 'react';
import styles from './styles';

class Card extends Component {
  render() {
    const { content } = this.props;
    return (
      <div className="card">
        <a href={content.link || '/'} target="_blank" rel="noopener">
          <div className="card-content">
            <div className="media">
              <div className="media-left">
                <figure className="image is-32x32">
                  <img src={content.logo} alt={content.name} />
                </figure>
              </div>
              <div className="media-content">
                <p className="title is-6">{content.name}</p>
                {content.city ? (
                  <p className="subtitle is-7">
                    {content.city}, {content.state}
                  </p>
                ) : (
                  <p className="subtitle is-7">Remota</p>
                )}
              </div>
            </div>

            <div className="content">
              <p className="description">{content.description}</p>
              <div className="control">
                <div className="tags has-addons">
                  <span className="tag is-dark">membros</span>
                  <span className="tag is-primary">{content.size}</span>
                </div>
              </div>
              <span className="tag is-dark">{content.primaryStack}</span>
            </div>
          </div>
        </a>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default Card;
