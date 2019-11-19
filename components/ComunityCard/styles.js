import css from 'styled-jsx/css';

export default css`
  .container {
    max-width: 936px;
  }

  .head {
    background-color: #ffffff;
    border-radius: 6px;
    box-shadow: 0 2px 26px 0 rgba(10, 10, 10, 0.1);
    margin-top: -120px;
  }

  .description {
    border-bottom: 2px solid #f5f5f5;
    margin-top: 40px;
    padding-bottom: 40px;
  }

  .back-button {
    left: 0;
    position: absolute;
    top: -30px;

    a {
      color: white;

      i {
        transform: rotate(180deg) scaleX(-1) translateY(-3px);
      }
    }
  }
  .columns {
    padding: 12px;
  }

  .column.is-flex {
    flex-direction: column;
  }

  .title {
    margin-bottom: 10px;
  }

  .info {
    align-items: center;
    display: flex;

    i {
      color: #8c43ff;
      margin-right: 8px;
      text-align: center;
      width: 20px;
    }
  }

  .button {
    align-self: flex-end;
    margin-top: auto;
  }
`;
