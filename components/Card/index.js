import React, { Component } from 'react';
import styles from './styles';

class Card extends Component {
  render() {
    const { content } = this.props;
    return (
      <div className="card">
        <div className="card-content">
          <div className="media">
            <div className="media-left">
              <figure className="image is-32x32">
                <img src={content.logo} alt="Placeholder image" />
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
            <p>
              <span className="tag is-black">javascript</span>
              <span className="tag is-gray">link</span>
            </p>
          </div>
        </div>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default Card;
