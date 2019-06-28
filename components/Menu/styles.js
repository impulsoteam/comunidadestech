import css from 'styled-jsx/css';
import { colors } from '/utils/variables';

export default css`
  .menu-label {
    color: ${colors.dark};
  }

  a {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }

  .tag {
    max-width: 28px;
  }
`;
