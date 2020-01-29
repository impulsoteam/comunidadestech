import css from 'styled-jsx/css';
import { fonts, colors } from '/utils/variables';

export default css`
  .component-wrapper {
    background-color: ${colors.primary};
    padding-top: 25px;
    margin-left: 0;
    margin-right: 0;
  }

  .title {
    font-weight: 700;
  }

  .subtitle {
    font-family: ${fonts.raleway};
    font-size: 20px !important;
    font-weight: bold;
    color: ${colors.white};
    margin: 0 auto;
  }

  .hero-body {
    padding: 0 1.5rem 1rem;
  }

  @media screen and (max-width: 1023px) {
    .subtitle {
      margin-top: 100px;
    }
  }

  @media screen and (max-width: 769px) {
    .subtitle {
      margin-top: 95px;
    }

    .hero-body {
      padding-left: 0;
      padding-right: 0;

      .container {
        padding: 0;
      }
    }
  }
`;
