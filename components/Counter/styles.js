import css from 'styled-jsx/css';

export default css`
  .counter-wrapper {
    display: flex;
    justify-content: center;
    margin-bottom: 50px;

    .counter {
      display: flex;
      :not(:last-child) {
        margin-right: 20px;
      }

      i {
        font-size: 1.25em;
        margin: 5px 10px 0 0;
        opacity: 0.8;
      }

      .counter-info {
        display: flex;
        flex-direction: column;

        h2 {
          font-weight: 900;
          line-height: 0.9;
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
