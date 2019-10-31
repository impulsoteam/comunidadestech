import css from 'styled-jsx/css';
import { colors } from '/utils/variables';

export default css`
  .description {
    display: -webkit-box;
    font-family: 'Raleway', sans-serif;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .card {
    border-radius: 2px;
    height: 100%;

    a {
      color: ${colors.dark};
    }
  }

  .image {
    overflow: hidden;
  }

  .control {
    margin-bottom: 4px;
  }

  .card .media:not(:last-child) {
    margin: 0 0 8px;
    padding: 0;
  }

  .card-content {
    padding: 12px;

    .content {
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
    }

    .btn-tooltip {
      border: none;
      cursor: pointer;
    }

    .tooltip {
      background-color: #fbfbfb;
      border-radius: 5px;
      box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
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
        border: .75rem solid transparent;
        border-bottom-color: #fbfbfb;
        border-top: none;
        content: '';
        filter: drop-shadow(0 -0.0625rem 0.0625rem rgba(10, 10, 10, .1));
        height: 0;
        margin-bottom: -23px;
        position: absolute;
        width: 0;
        z-index: 3000;
      }
    }

    .title-tooltip {
      font-family: 'Raleway', sans-serif;
      font-weight: 600;
      min-height: 36px;
      line-height: 1.125;
    }
  }
`;
