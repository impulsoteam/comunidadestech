import css from 'styled-jsx/css'

import { colors } from '/utils/variables'

export default css`
  .title {
    font-weight: 700;
  }
  .subtitle {
    font-family: 'Raleway', sans-serif;
    font-size: 20px !important;
    font-weight: 300;
    margin: 0 auto 10px;
    max-width: 400px;
  }

  .menu-column {
    border-right: solid 2px ${colors.silverChalice};
    padding-right: 20px;
  }

  .content-column {
    padding-left: 36px;
  }

  .image-error {
    color: ${colors.chestnutRose};
    font-size: 13px;
    font-weight: normal;
    line-height: 0;
  }

  .page-title {
    background: ${colors.white};
    border-radius: 4px;
    border: none;
    color: inherit;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    margin: 0;
    padding: 8px 14px;
    text-align: left;
    width: 100%;

    &.is-active {
      background-color: ${colors.primary};
      color: ${colors.white};
    }
    &:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }
  }

  li:first-of-type .page-title {
    margin-top: 20px;
  }

  .input-wrapper {
    i {
      bottom: 15px;
      color: ${colors.alto};
      font-size: 14px;
      left: 8px;
      position: absolute;
      z-index: 1;
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
    .form-warning {
      bottom: -12px;
      color: ${colors.turbo};
      font-size: 10px;
      font-weight: normal;
      line-height: 1;
      position: absolute;
    }
    .form-info {
      bottom: -12px;
      color: ${colors.emerald};
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

  .admin-title {
    color: ${colors.dark};
    font-weight: 600;
    margin-top: 1.25rem;
  }

  .links-wrapper {
    h5 {
      color: ${colors.primary};
      font-weight: 600;
      margin-top: 1.25rem;
    }

    .link-section {
      margin-bottom: 1.25rem;
      position: relative;

      label {
        left: 60px;
        margin: 0;
        position: absolute;
        top: 0;
        width: calc(100% - 68px);
      }

      .link-delete {
        background: ${colors.chestnutRose};
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

        &:disabled {
          background: ${colors.silverChalice};
          cursor: not-allowed;
        }
      }
    }

    .form-error {
      color: ${colors.chestnutRose};
      font-size: 10px;
      font-weight: normal;
      line-height: 1;
      margin-bottom: 1rem;
      margin-top: -1.25rem;
    }
  }

  button.is-primary {
    font-weight: bold;
  }

  button.is-large {
    font-size: 16px;
    font-weight: bold;
    margin-top: 20px;

    &:disabled {
      opacity: 1;
    }
  }

  .required-form {
    color: ${colors.dark};
    font-size: 14px;
    font-weight: bold;
    margin: 20px 0 10px;
  }
  .subscribe-button {
    color: ${colors.primary};
    font-size: 16px;
    font-weight: bold;
    border: 1px solid ${colors.primary};
    width: 70%;
    height: 28px;
    margin: 20px 0px;
    cursor: pointer;
  }

  @media screen and (max-width: 1023px) {
    .title {
      margin-top: 100px;
    }
  }

  .custom-logo-wrapper {
    margin: 10px 0;

    .image-wrapper {
      display: flex;
      justify-content: center;
      width: 100%;

      img {
        height: 120px;
        width: 120px;
      }
    }

    .modal {
      display: flex;
      justify-content: center;
      .modal-background {
        background-color: rgba(10, 10, 10, 0.45);
      }
      .modal-content {
        background: white;
        border-radius: 5px;
        color: white;
        font-size: 16px;
        font-weight: bold;

        .modal-title {
          align-items: center;
          background: ${colors.primary};
          display: flex;
          height: 48px;
          padding: 0px 20px;
        }

        .crop-wrapper {
          display: flex;
          justify-content: center;
        }

        .crop-controls {
          align-items: center;
          display: flex;
          height: 68px;
          justify-content: end;
          padding: 0px 20px;

          button {
            background: white;
            border-radius: 5px;
            border: 1px solid ${colors.primary};
            color: ${colors.primary};
            font-size: 16px;
            font-weight: bold;
            height: 70%;

            &:last-child {
              background: ${colors.primary};
              border: 1px solid ${colors.primary};
              color: white;
              margin-left: 8px;
            }
          }
        }
      }
    }

    .drag-button {
      align-items: center;
      border-radius: 5px;
      border: 1px solid ${colors.boulder};
      color: ${colors.boulder};
      cursor: pointer;
      display: flex;
      font-size: 16px;
      font-weight: bold;
      height: 50px;
      justify-content: center;
      margin: 15px 0;
      width: 99%;
    }
  }
`
