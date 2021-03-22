import css from 'styled-jsx/css'

import { colors } from '/utils/variables'

export default css`
  .modal {
    align-items: center;
    background: rgba(38, 38, 94, 0.4) none repeat scroll 0% 0%;
    box-align: center;
    box-pack: center;
    display: flex;
    justify-content: center;
    left: 0px;
    min-height: 100vh;
    position: fixed;
    top: 0px;
    width: 100vw;
    z-index: 99999;
  }

  .modal-content {
    background: white none repeat scroll 0% 0%;
    border-radius: 8px;
    box-shadow: rgba(38, 38, 94, 0.5) 0px 0px 50px 0px;
    display: flex;
    flex-direction: column;
    max-height: calc(-60px + 100vh);
    padding: 45px 0px;
    position: relative;
    width: 552px;

    @media (max-width: 768px) {
      margin: 0 10px;
      width: calc(100% - 20px);
    }
  }

  .close-modal {
    position: absolute;
    right: 15px;
    top: 15px;
  }

  .title-modal {
    border-bottom: 1px solid rgb(235, 235, 240);
    color: ${colors.primary};
    font-size: 18px;
    font-weight: 900;
    margin: -35px 0px 24px;
    padding-bottom: 15px;
    text-align: center;
  }

  .modal-body {
    font-size: 16px;
    line-height: 1.5;
    margin: 0px;
    overflow-y: auto;
    padding: 0px 73px;

    p {
      color: ${colors.boulder};
      font-size: 12px;
      margin: 0px 0px 8px;
      text-align: left;

      &:last-child {
        margin-top: 16px;
      }

      a {
        color: ${colors.boulder};
        cursor: pointer;
        text-decoration: underline;
      }

      &.center {
        text-align: center;
      }
    }

    @media (max-width: 768px) {
      padding: 0 15px;
    }
  }

  .modal-buttons {
    cursor: initial;
    display: flex;
    justify-content: right;
  }

  .modal-btn {
    text-align: center;
    border-radius: 30px;
    color: ${colors.white};
    cursor: pointer;
    display: flex;
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 3px;
    line-height: 26px;
    margin-top: 18px;
    padding: 5px 25px;

    &:first-child {
      background-color: ${colors.white};
      border: 1px solid ${colors.primary};
      color: ${colors.primary};
    }

    &:last-child {
      background-color: ${colors.primary};
      border: none;
      color: ${colors.white};
      margin-left: 16px;
    }
  }
`
