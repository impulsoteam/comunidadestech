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
      font-size: 10px;
      font-weight: normal;
      line-height: 1;
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

  .links-wrapper {
    h5 {
      color: ${colors.primary};
      font-weight: 600;
      margin-top: 1.25rem;
    }

    .link-section {
      margin-bottom: 0.875rem;
      position: relative;

      label {
        left: 60px;
        margin: 0;
        position: absolute;
        top: 0;
        width: calc(100% - 68px);
      }

      .link-delete {
        background: red;
        border-radius: 50%;
        border: none;
        color: white;
        cursor: pointer;
        display: flex;
        font-size: 16px;
        font-weight: bold;
        height: 18px;
        justify-content: center;
        line-height: 1;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 18px;
      }
    }

    button.is-primary {
      float: right;
      font-weight: bold;
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
