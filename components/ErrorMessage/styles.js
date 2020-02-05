import css from 'styled-jsx/css'

import { colors } from '/utils/variables'

export default css`
.error-message {
  align-items: center;
  background: url('/static/bg-stars.svg') center center/cover no-repeat;
  background-color: ${colors.primary};
  display: flex;
  flex-direction: row;
  float: left;
  justify-content: center;
  min-height: calc(100vh - 3.25rem);
  width: 100%;

  .error-box {
    max-width: 45%;
    .title {
      color: ${colors.white};
      font-size: 48px;
      font-weight: bold;
      padding: 0;
    }

    p {
      color: ${colors.white};
      font-size: 20px;
      line-height: 1.25;
      margin-bottom: 1.5rem;
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

    .img-error { max-width: 90%; }

    .error-box {
      max-width: 100%;
    }
  }
}
`
