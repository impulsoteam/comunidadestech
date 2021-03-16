import css from 'styled-jsx/css'

import { colors } from '/utils/variables'

export default css`
  .cookies-policy {
    background: rgba(139, 77, 251, 0.8);
    bottom: 0;
    left: 0;
    padding: 20px;
    position: fixed;
    right: 0;
  }

  .cookies-info {
    align-items: center;
    color: ${colors.white};
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 0;
    margin-top: 0;
    font-size: 14px;
  }

  .cookies-link {
    color: ${colors.white};
    margin:  0 5px;
    text-decoration: underline;
  }

  .cookies-btn {
    background: ${colors.white};
    border-radius: 6px;
    color: ${colors.primary};
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 2px;
    line-height: 24px;
    margin: 0px 10px;
    padding: 4px 25px;
    text-transform: capitalize;

    &:hover {
      background: ${colors.primary};
      color: ${colors.white};
    }
  }
`
