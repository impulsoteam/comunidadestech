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
`;
