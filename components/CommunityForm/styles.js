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
      position: relative;
      margin-bottom: 0.875rem;

      label {
        position: absolute;
        margin: 0;
        width: calc(100% - 68px);
        top: 0;
        left: 60px;
      }

      .link-delete {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        width: 18px;
        height: 18px;
        background: red;
        border: none;
        color: white;
        border-radius: 50%;
        font-weight: bold;
        font-size: 16px;
        display: flex;
        justify-content: center;
        line-height: 1;
        cursor: pointer;
      }
    }

    button.is-primary {
      font-weight: bold;
      float: right;
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
