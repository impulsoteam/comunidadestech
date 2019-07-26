import css from 'styled-jsx/css';
import { colors } from '/utils/variables';

export default css`
  img {
    vertical-align: text-bottom;
  }

  p {
    font-size: 14px;
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
