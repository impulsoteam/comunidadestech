import css from 'styled-jsx/css';
import { colors } from '/utils/variables';

export default css`
  .counter-wrapper {
    display: flex;
    justify-content: center;
    padding-bottom: 2rem;
    background-color: ${colors.primary};
    margin-left: 0;
    margin-right: 0;

    .counter {
      display: flex;
      color: ${colors.white};

      :not(:last-child) {
        margin-right: 20px;
      }

      i {
        font-size: 1.25em;
        margin: 10px 5px 0 0;
      }

      .counter-info {
        display: flex;
        flex-direction: column;

        h2 {
          font-weight: 900;
          line-height: 1.1;
        }

        h5 {
          font-size: 0.8em;
          line-height: 1;
          text-transform: uppercase;

          span {
            font-size: 1.25em;
            font-weight: 900;
          }
        }
      }
    }
    @media screen and (max-width: 769px) {
      & {
        align-items: center;
        flex-direction: column;

        .counter {
          margin-bottom: 20px;
          margin-right: 0 !important;
          width: 160px;
        }
      }
    }
  }
`;
