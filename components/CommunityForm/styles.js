import css from 'styled-jsx/css';
import { colors } from '/utils/variables';

export default css`
  .title {
    font-weight: 700;
  }
  .subtitle {
    font-family: 'Raleway', sans-serif;
    font-size: 20px !important;
    font-weight: 300;
    margin: 0 auto 20px;
    max-width: 400px;
  }

  .input-wrapper {
    i {
      bottom: 15px;
      color: ${colors.alto};
      font-size: 14px;
      left: 8px;
      position: absolute;
    }
  }

  label {
    :not(.radio-label) {
      color: ${colors.primary};
      display: inline-block;
      font-weight: 600;
      margin-top: 20px;
      position: relative;
      text-align: left;
      width: 100%;
    }

    .form-error {
      bottom: -12px;
      color: ${colors.chestnutRose};
      font-size: 13px;
      font-weight: normal;
      line-height: 0;
      position: absolute;
    }
  }

  fieldset {
    margin-top: 20px;

    legend {
      color: ${colors.primary};
      font-weight: 600;
    }
    .radio-group {
      display: flex;

      .radio-item {
        display: inline-block;
        margin-top: 18px;
        position: relative;
        width: 33%;

        :nth-child(2) {
          text-align: center;
        }

        :nth-child(3) {
          text-align: right;
        }

        input[type='radio'] {
          display: none;
        }

        label {
          color: ${colors.boulder};
          font-size: 14px;
          font-weight: bold;
        }

        label:before {
          background-color: transparent;
          border-radius: 11px;
          border: 2px solid ${colors.primary};
          content: ' ';
          display: inline-block;
          height: 14px;
          margin-right: 6px;
          position: relative;
          top: 1px;
          width: 14px;
        }

        input[type='radio']:checked + label:before {
          border-width: 5px;
        }
      }
    }
  }

  button.is-large {
    font-size: 16px;
    font-weight: bold;
    margin-top: 20px;
    padding: 20px 0;
  }

  .required-form {
    color: #363636;
    font-size: 14px;
    font-weight: bold;
    margin-top: 20px;
  }
`;
