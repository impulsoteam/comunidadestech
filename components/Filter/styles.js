import css from 'styled-jsx/css'

import { colors } from '/utils/variables'

export default css`
  #filter {
    margin-bottom: 30px;
  }

  .filter-wrapper {
    align-items: center;
    border-bottom: solid 2px ${colors.wildSand};
    display: flex;
    justify-content: space-around;
    margin: 0;
    padding: 1rem 0.75rem;
  }

  .filter-box {
    display: flex;
    justify-content: center;
    padding: 0.75rem 0.125rem;

    .filter-title-wrapper {
      align-items: center;
      display: flex;
      height: 34px;

      .filter-title {
        font-size: 0.875rem;
        font-weight: bold;
        margin-right: 0.5rem;
      }
    }

    .filter-options {
      display: flex;

      .filter-option-wrapper {
        :not(:last-child) {
          margin-right: 0.25rem;
        }
        select,
        input {
          display: flex;
          color: ${colors.boulder};
          font-weight: bold;
          height: 35px;
          padding-left: 1.5rem;
          width: 7.125rem;

          &::placeholder {
            color: ${colors.boulder};
            opacity: 1;
          }
        }

        input {
          width: 10.625rem;
        }

        .select:not(.is-multiple):not(.is-loading)::after {
          border-color: ${colors.primary};
          top: 63%;
        }

        .icon {
          top: 10%;
        }
      }
    }
    .unique-button button {
      height: 34px;
      margin-left: 0.5rem;

      &.button-reset {
        background-color: ${colors.chestnutRose};
        color: ${colors.white};

        &:hover {
          background-color: ${colors.white};
          border: solid 1px;
          color: ${colors.chestnutRose};
        }
      }

      span:not(.icon) {
        font-size: 10px;
        font-weight: bold;
        line-height: 1;
        text-align: left;
        text-transform: uppercase;
      }
    }
  }

  .toggle-box-wrapper {
    button {
      font-weight: bold;
      height: 34px;

      &.active {
        background-color: ${colors.primary};
        border-color: ${colors.primary};
        color: ${colors.white};
      }
    }
    span,
    i {
      pointer-events: none;
    }
  }

  .more-filter {
    display: none;
    padding-top: 1.5rem;

    &.is-active {
      display: flex;
      justify-content: center;
    }
  }

  @media screen and (min-width: 1024px) {
    .more-filter {
      justify-content: flex-start;
      padding-left: 65px;
    }
  }

  @media screen and (max-width: 769px) {
    .filter-wrapper {
      border-top: solid 2px ${colors.wildSand};
      padding: 0.25rem 0.75rem;
    }

    .more-filter.filter-box {
      flex-direction: column;
      padding-top: 0.75rem;

      .filter-options {
        flex-direction: column;

        .filter-option-wrapper {
          margin: 0 0.25rem 0.75rem;

          .select,
          select,
          input {
            width: 100%;
            
            font-size: 16px;
            &:not(.is-multiple):not(.is-loading)::after {
              top: 50%;
            }
          }
          select,
          input {
            padding-left: 1.7rem;
          }
        }
      }

      .unique-button {
        margin: 0 0.25rem;

        &:not(:last-child) {
          margin-bottom: 0.5rem;

          button {
            background-color: ${colors.primary};

            &:hover {
              color: ${colors.primary};
            }
          }
        }

        .button-reset {
          margin: 0;
          width: 100%;
        }
      }
    }
  }
`
