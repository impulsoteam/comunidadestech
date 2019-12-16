import css from 'styled-jsx/css';
import { fonts } from '/utils/variables';

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

  .hero-body {
    padding: 0 1.5rem 1rem;
  }

  @media screen and (max-width: 1023px) {
    .title {
      margin-top: 100px;
    }
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
