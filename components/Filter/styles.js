import css from 'styled-jsx/css';
import { colors } from '/utils/variables';

export default css`
  .filter {
    .filter-box {
      box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1),
        0 0 0 1px rgba(10, 10, 10, 0.1);
      border-radius: 4px;
      display: flex;
      padding: 0;
    }
    .filter-title {
      align-items: center;
      background-color: whitesmoke;
      display: flex;
      padding: 0.75rem;
    }

    .filter-label {
      background-color: whitesmoke;
      color: ${colors.boulder};
      font-size: 0.65em;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }

    .reset-title {
      align-items: center;
      background-color: ${colors.silverChalice};
      border-bottom-right-radius: 4px;
      border-top-right-radius: 4px;
      display: flex;
      padding: 0.75rem;
    }

    .reset-label {
      color: ${colors.white};
      font-size: 0.65em;
      font-weight: bold;
      letter-spacing: 0.05em;
      max-width: 75px;
      text-align: center;
      text-transform: uppercase;
    }

    .filter-options {
      align-items: stretch;
      display: flex;
      flex: 1;

      .filter-option-wrapper {
        align-items: stretch;
        border-left: solid 2px rgba(10, 10, 10, 0.1);
        display: flex;
        flex-direction: column;
        flex: 1;
        text-align: center;

        .filter-option {
          align-items: center;
          display: flex;
          justify-content: center;
          padding: 10px 10px;

          .control.has-icons-left .select select {
            max-width: 115px;
            padding-left: 1.75em;
          }

          .button {
            margin-left: 5px;
          }

          &.check {
            flex-direction: column;
            padding: 7px 10px;
          }
        }

        .checkbox {
          align-items: center;
          display: flex;
          font-size: 13px;

          input {
            margin-right: 3px;
          }
        }

        .checkbox:not(:last-of-type) {
          margin-bottom: 1px;
        }

        &.filter-by-name {
          flex: 1.8;
        }
      }

      .select:not(.is-multiple):not(.is-loading)::after {
        border-color: ${colors.primary};
      }

      select option:first-child {
        display: none;
      }
    }

    @media screen and (max-width: 1215px) {
      .filter-box {
        flex-wrap: wrap;

        .filter-title,
        .reset-title {
          flex-basis: 100%;
          justify-content: center;
        }

        .filter-title {
          border-bottom: solid 2px #e6e6e6;
        }

        .reset-title {
          border-top-right-radius: 0;
          border-bottom-left-radius: 4px;
        }

        .filter-options .filter-option-wrapper:first-of-type {
          border-left: none;
        }
      }
    }
    @media screen and (max-width: 1023px) {
      .filter-options {
        flex-wrap: wrap;

        .filter-option-wrapper:nth-of-type(-n + 6) {
          flex-basis: 25%;
          border-bottom: solid 2px #e6e6e6;
        }

        .filter-option-wrapper:last-of-type {
          flex-basis: 50%;
          border-bottom: solid 2px #e6e6e6;
        }
      }
    }
    @media screen and (max-width: 769px) {
      .filter-options .filter-option-wrapper:nth-of-type(-n + 6) {
        flex-basis: 50%;
      }
    }
  }
`;
