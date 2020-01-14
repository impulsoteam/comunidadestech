import css from 'styled-jsx/css';
import { fonts, colors } from '/utils/variables';

export default css`
  label {
    display: inline-block;
    width: 100%;
    margin-top: 20px;
    font-weight: 600;
    position: relative;

    .input {
      background: ${colors.chestnutRose};
    }

    .form-error {
      font-size: 13px;
      color: ${colors.chestnutRose};
      line-height: 0;
      position: absolute;
      bottom: -12px;
      font-weight: normal;
    }
  }

  button {
    margin-top: 20px;
  }

  @media screen and (max-width: 769px) {
    .hero-body {
      padding-left: 0;
      padding-right: 0;

      .container {
        padding: 0;
      }
    }
  }
`;
