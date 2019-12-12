import css from 'styled-jsx/css';
import { colors } from '/utils/variables';

export default css`
  .container {
    padding-top: 2.375rem;
  }

  .menu-label {
    color: ${colors.dark};
  }

  .card-wrapper {
    margin-top: 20px;
  }

  .title {
    color: ${colors.dark};
    margin-bottom: 1.125rem;
  }

  .is-divider {
    margin: 2.375rem 0 1.875rem;
    border: 2px solid ${colors.wildSand};
  }
`;
