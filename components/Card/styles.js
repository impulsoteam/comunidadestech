import css from 'styled-jsx/css'

import { colors, fonts } from '/utils/variables'

export default css`
  .description {
    font-family: ${fonts.raleway};
  }

  .card {
    border-radius: 2px;
    cursor: pointer;
    height: 100%;
    
    a {
      color: ${colors.dark};
    }

    &:hover {
    scale:1.1;
    animation: ease-in-out;
    }
  }
  .image {
    overflow: hidden;

    img {
      height: 100%;
    }
  }

  .control {
    font-size: 12px;

    .has-addons {
      margin-bottom: 0;

      :not(:last-child) {
        margin-right: 5px;
      }
    }

    .tag {
      margin-bottom: 5px;
    }
  }

  .tags:not(.has-addons) {
    .tag {
      margin: 0 5px 5px 0;
    }
  }

  .community-tags {
    margin-top: 5px;
  }

  .card .media:not(:last-child) {
    margin: 0 0 8px;
    padding: 0;
  }

  .card-content {
    padding: 12px;

    .media {
      * {
        pointer-events: none;
      }
    }

    .content {
      /* overflow: hidden; */
      overflow-wrap: break-word;
      word-wrap: break-word;
      font-size: 12px;
      font-weight: 400;    
    }

    .media-left {
      margin-right: 8px;
    }

    img {
      border-radius: 2px;
    }

    .tag {
      font-size: 10px;

      &.gray-border {
        border: 1px solid ${colors.silverChalice};
        color: ${colors.dark};
      }
    }

    .btn-tooltip {
      border: none;
      cursor: pointer;
    }

    .tooltip {
      background-color: ${colors.softCloud};
      border-radius: 5px;
      box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1),
        0 0 0 1px rgba(10, 10, 10, 0.1);
      display: none;
      font-size: 1.25em;
      left: 0;
      padding: 20px;
      position: absolute;
      right: 0;
      width: 300px;
      z-index: 2000;
    }

    .open-tooltip:hover {
      .tooltip {
        display: block;
      }

      .btn-tooltip:after {
        border: 0.75rem solid transparent;
        border-bottom-color: ${colors.softCloud};
        border-top: none;
        content: '';
        filter: drop-shadow(0 -0.0625rem 0.0625rem rgba(10, 10, 10, 0.1));
        height: 0;
        margin-bottom: -23px;
        position: absolute;
        width: 0;
        z-index: 3000;
      }
    }

    .title-tooltip {
      font-family: ${fonts.raleway};
      font-weight: 600;
      min-height: 36px;
      line-height: 1.125;
    }
  }
`
