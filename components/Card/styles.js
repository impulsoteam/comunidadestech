import css from 'styled-jsx/css';

export default css`
  .description {
    font-family: 'Raleway', sans-serif;
    height: 36px;
    overflow: hidden;
  }

  .card {
    border-radius: 2px;
    height: 100%;
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
      margin: 4px 4px 4px 0;
    }
  }
`;
