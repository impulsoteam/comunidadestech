import css from 'styled-jsx/css';
import { fonts, colors } from '/utils/variables';

export default css`
  .title {
    font-weight: 700;
  }
  .subtitle {
    font-family: ${fonts.raleway};
    font-size: 20px !important;
    font-weight: 300;
    margin: 0 auto 20px;
    max-width: 400px;
  }

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
      font-size: 10px;
      color: ${colors.chestnutRose};
      line-height: 1;
      position: absolute;
      bottom: -12px;
      font-weight: normal;
    }
  }

  button {
    margin-top: 20px;
  }

  .container {
    margin-bottom: 50px;
  }
`;
