import css from 'styled-jsx/css';
import { colors } from '/utils/variables';

export default css`
  .subtitle {
    font-family: 'Raleway', sans-serif;
    font-size: 20px !important;
    font-weight: 300;
  }

  .hero-foot {
    margin-top: 32px;
    border-bottom: 3px solid ${colors.primary};
    border-radius: 1px;

    img {
      max-width: 100%;
      width: 650px;
    }
  }
`;
