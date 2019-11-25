import React, { Component } from 'react';
import styles from './styles';

class Card extends Component {
  render() {
    const { content } = this.props;
    return (
      <div className="card">
        <div className="card-content">
          <a href={`/comunidade?name=${content.name}`}>
            <div className="media">
              <div className="media-left">
                <figure className="image is-32x32">
                  {content.logo ? (
                    <img src={content.logo} alt={content.name} />
                  ) : (
                    <img
                      src="../../static/ctech-small-logo.png"
                      alt={content.name}
                    />
                  )}
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
          </a>
          <div className="content">
            <p className="description">{content.description}</p>
            <div className="control">
              <div className="tags has-addons">
                <span className="tag is-dark">membros</span>
                <span className="tag is-primary">{content.members}</span>
              </div>
            </div>
            <div className="control">
              <span className="tag is-dark">{content.category}</span>
            </div>
            <div className="tags">
              {content.tags.slice(0, 5).map(
                (tag, tag_element_index) =>
                  tag.length <= 20 && (
                    <span key={tag_element_index} className="tag is-primary">
                      {tag}
                    </span>
                  )
              )}
              <div className="open-tooltip">
                {content.tags.length > 5 && (
                  <button type="button" className="tag btn-tooltip">
                    <i className="fas fa-plus"></i>
                    &nbsp;Tags
                  </button>
                )}
                <span className="tooltip">
                  <div className="title-tooltip">Tags:</div>

                  {content.tags.splice(5).map(
                    (tag, tag_item_index) =>
                      tag.length <= 20 && (
                        <span key={tag_item_index} className="tag is-primary">
                          {tag}
                        </span>
                      )
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default Card;
