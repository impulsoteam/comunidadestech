import css from 'styled-jsx/css';
import { fonts, colors } from '/utils/variables';

export default css`
.left-login {
  display: flex;
  float: left;
  min-height: 100vh;
  padding: 0 70px;
  width: 35%;

  @media only screen and (max-width: 600px) {
    min-height: 80vh;
    padding: 20px;
    width: 100%;
  }

  .container {
    align-items: center;
    display: flex;
    max-width: 100%;
  }

  .buttons {
    display: flex;
    justify-content: center;
    padding: 45px 0;

    .button {
      background-color: ${colors.white};
      border-radius: 4px;
      font-size: 12px;
      font-weight: bold;
      height: 42px;
      min-width: 100%;
      .icon { font-size: 1rem; }
      .icon-img { padding-right: 5px; }

      &:not(:last-child):not(.is-fullwidth) {
        margin-right: 0;
      }

      &.linkedin {
        background-color: ${colors.linkedin};
        border: solid 1px ${colors.linkedin};
        color: ${colors.white};
      }

      &.google {
        background-color: ${colors.white};
        border: solid 1px ${colors.gradientDark};
        color: ${colors.boulder};
      }
    }
  }

  p {
    color: ${colors.boulder};
    font-size: 16px;
    letter-spacing: normal;
    line-height: 1.3;

    b, strong {
      color: ${colors.primary};
    }
  }
}

.right-login {
  background-color: ${colors.primary};
  background-image: url('/static/ballons.svg');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  color: ${colors.white};
  display: flex;
  float: right;
  min-height: 100vh;
  width: 65%;

  .footer-login {
    align-self: flex-end;
    width: 100%;
  }

  .content {
    align-items: center;
    background-color: transparent;
    border-top: 3px solid ${colors.white};
    display: flex;
    justify-content: center;
    min-width: 100%;
    min-height: 110px;
    padding: 0;

    a { color: ${colors.white}; }
  }

  @media only screen and (max-width: 600px) {
    min-height: 20vh;
    padding: 30px 0 0;
    width: 100%;
  }
}
`;
