import css from 'styled-jsx/css';
import { colors } from '/utils/variables';

export default css`
  .filter {
    .filter-box {
      box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1),
        0 0 0 1px rgba(10, 10, 10, 0.1);
      border-radius: 4px;
      padding: 0;
      display: flex;
    }
    .filter-title {
      padding: 0.75rem;
      background-color: whitesmoke;
    }
    .filter-options {
      display: flex;
      align-items: stretch;

      .filter-option-wrapper {
        padding: 0 0.6rem;
        display: flex;

        :not(:last-of-type) {
          border-right: solid 2px rgba(10, 10, 10, 0.1);
        }

        .filter-option {
          display: flex;
          align-items: center;

          .control.has-icons-left .select select {
            padding-left: 1.75em;
            max-width: 115px;
          }

          .button {
            margin-left: 5px;
          }
        }

        .checkbox {
          display: flex;
          font-size: 13px;

          input {
            margin-right: 3px;
          }
        }

        .checkbox:not(:last-of-type) {
          margin-right: 5px;
        }
      }

      .select:not(.is-multiple):not(.is-loading)::after {
        border-color: ${colors.primary};
      }

      select option:first-child {
        display: none;
      }
    }
  }
`;
