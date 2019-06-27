import React, { Component } from 'react';
import styles from './styles';

class Card extends Component {
  render() {
    return (
      <div className="card">
        <div className="card-content">
          <div className="media">
            <div className="media-left">
              <figure className="image is-32x32">
                <img
                  src="https://s3-us-west-2.amazonaws.com/anchor-generated-image-bank/production/podcast_uploaded_nologo/1072610/1072610-1555548885021-b7eaae0dd2903.jpg"
                  alt="Placeholder image"
                />
              </figure>
            </div>
            <div className="media-content">
              <p className="title is-6">Podtag</p>
              <p className="subtitle is-7">Goiânia, GO</p>
            </div>
          </div>

          <div className="content">
            <p className="description">
              A comunidade do podcast Podtag com 800 membros
            </p>
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
