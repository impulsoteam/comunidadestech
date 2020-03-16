import css from 'styled-jsx/css'

import { colors } from '/utils/variables'

export default css`
  .pagination-wrapper {
    display: flex;
    margin-left: auto;

    span {
      align-items: center;
      border-radius: 4px;
      border: solid 2px ${colors.gradientDark};
      color: ${colors.boulder};
      cursor: pointer;
      display: flex;
      font-weight: bold;
      height: 34px;
      justify-content: center;
      width: 34px;

      &:not(:last-child) {
        margin-right: 2px;
      }

      &:hover {
        border-color: ${colors.primary};
        color: ${colors.primary};
      }

      &.active {
        background: ${colors.primary};
        border-color: ${colors.primary};
        color: white;
      }
    }
  }
`
