import css from 'styled-jsx/css';
import { colors } from '/utils/variables';

export default css`
  .divider {
    border-top: 0.125rem solid ${colors.wildSand};
    display: block;
    height: 0.125rem;
    margin: 2rem 0;
    position: relative;
    text-align: center;
  }

  .divider::after {
    background: #fff;
    color: ${colors.primary};
    content: attr(data-content);
    display: inline-block;
    font-size: 1rem;
    font-weight: bold;
    padding: 0 0.8rem;
    text-align: center;
    top: 0;
    transform: translateY(-55%);
  }

  .divider.content::after {
    padding: 0.4rem 0.8rem;
  }
`;
