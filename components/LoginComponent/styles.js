import css from 'styled-jsx/css';
import { fonts, colors } from '/utils/variables';

export default css`
.left-login {
  display: flex;
  width: 35%;
  float: left;
  min-height: 100vh;
  padding: 0 70px;
  @media only screen and (max-width: 600px) {
    width: 100%;
    min-height: 80vh;
    padding: 20px;
  }

  .container {
    max-width: 100%;
    align-items: center;
    display: flex;
  }

  .buttons {
    padding: 45px 0;
    display: flex;
    justify-content: center;

    .button {
      min-width: 100%;
      height: 42px;
      border-radius: 4px;
      background-color: ${colors.white};
      font-size: 12px;
      font-weight: bold;
      border: none;

      .icon { font-size: 1rem; }
      .icon-img { padding-right: 5px; }

      &.linkedin {
        background-color: ${colors.linkedin};
        border: solid 1px ${colors.linkedin};
        color: ${colors.white};
      }

      &.google {
        background-color: ${colors.white};
        color: ${colors.boulder};
        border: solid 1px ${colors.gradientDark};
      }
    }
  }

  p {
    font-size: 16px;
    color: ${colors.boulder};
    line-height: 1.3;
    letter-spacing: normal;

    b, strong {
      color: ${colors.primary};
    }
  }
}

.right-login {
  width: 65%;
  background-color: ${colors.primary};
  color: ${colors.white};
  float: right;
  min-height: 100vh;
  background-image: url('/static/ballons.svg');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;

  .footer-login {
    width: 100%;
    align-self: flex-end;
  }

  .content {
    display: flex;
    padding: 0;
    background-color: transparent;
    min-width: 100%;
    min-height: 110px;
    align-items: center;
    justify-content: center;
    border-top: 3px solid ${colors.white};
    a {
      color: ${colors.white};
    }
  }

  @media only screen and (max-width: 600px) {
    width: 100%;
    min-height: 20vh;
    padding: 30px 0 0;
  }
}
`;
