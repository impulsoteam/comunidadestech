import css from 'styled-jsx/css';
import { fonts, colors } from '/utils/variables';

export default css`
.menssage-content {
  align-items: center;
  background-color: ${colors.primary};
  background-image: url('/static/bg-stars.svg');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: row;
  float: left;
  justify-content: center;
  min-height: calc(100vh - 3.25rem);
  width: 100%;

  .msg-box {
    .title {
      color: ${colors.white};
      font-size: 48px;
      font-weight: bold;
      padding: 10px 0;
    }

    p {
      color: ${colors.white};
      font-size: 20px;
      line-height: 1.25;
    }

    a {
      color: ${colors.white};
      font-size: 20px;
      font-weight: bold;
      padding-top: 24px;
    }
  }
  @media only screen and (max-width: 1023px) {
    height: 100vh;
    padding-top: 120px;
    img { max-width: 90%; }
  }
}
`;
