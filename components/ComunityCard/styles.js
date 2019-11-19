import css from 'styled-jsx/css';
import { colors } from '/utils/variables';

export default css`
  .container {
    max-width: 936px;

    @media screen and (max-width: 1023px) {
      margin-left: 10px;
      margin-right: 10px;
    }
  }

  .head {
    background-color: ${colors.white};
    border-radius: 6px;
    box-shadow: 0 2px 26px 0 rgba(10, 10, 10, 0.1);
    margin-top: -120px;
  }

  .description {
    border-bottom: 2px solid ${colors.softCloud};
    margin-top: 40px;
    padding-bottom: 40px;
  }

  .image {
    min-width: 150px;
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
      color: ${colors.primary};
      margin-right: 8px;
      text-align: center;
      width: 20px;
    }
  }

  .button {
    align-self: flex-end;
    margin-top: auto;

    @media screen and (max-width: 768px) {
      align-self: flex-start;
      margin-top: 20px;
    }
  }
`;
