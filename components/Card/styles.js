import css from 'styled-jsx/css';
import { colors } from '/utils/variables';

export default css`
  .description {
    font-family: 'Raleway', sans-serif;
    height: 36px;
    overflow: hidden;
  }

  .card {
    border-radius: 2px;
    height: 100%;

    a {
      color: ${colors.dark};
    }
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
  }
`;
