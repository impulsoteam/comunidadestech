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
    transition: all 0.3s;
  }

  .tag {
    max-width: 28px;
  }

  .is-active > .tag.is-primary {
    background-color: white;
    color: #8c43ff;
    font-weight: bold;
    transition: all 0.8s;
  }
`;
