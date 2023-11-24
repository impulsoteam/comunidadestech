import css from 'styled-jsx/css'

import { colors } from '/utils/variables'

export default css`
  img {
    vertical-align: text-bottom;
  }

  p {
    font-size: 14px;
  }

  .container {
    opacity: 0.2;
    z-index: -2;
  }

  .hero-foot {
    margin-top: -120px;
    border-bottom: 3px solid ${colors.primary};
    border-radius: 1px;

    img {
      max-width: 650px;
      width: 100%;
    }
  }

  a {
    color: initial;
  }

  .footer {
    background-color: ${colors.white};
  }
`
