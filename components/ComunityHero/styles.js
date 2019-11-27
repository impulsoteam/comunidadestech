import css from 'styled-jsx/css';
import { colors } from '/utils/variables';

export default css`
  .hero-image {
    background: linear-gradient(
        to bottom,
        rgba(74, 74, 74, 0.6),
        rgba(140, 67, 255, 0.8)
      ),
      linear-gradient(to bottom, rgba(54, 54, 54, 0.5), rgba(54, 54, 54, 0.5)),
      url('/static/comunidades-tech-bg-evento-comunidade.jpg');
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 400px;
  }
`;
