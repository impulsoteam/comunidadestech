import css from 'styled-jsx/css';
import { colors } from '/utils/variables';

export default css`
  .filter-wrapper {
    margin: 0;
    padding: 1rem 0.75rem;
    border-bottom: solid 2px ${colors.wildSand};
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .filter-box {
    display: flex;
    padding: 0.75rem 0.125rem;
    justify-content: center;

    .filter-title-wrapper {
      height: 34px;
      display: flex;
      align-items: center;

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
          width: 7.125rem;
          font-weight: bold;
          color: ${colors.boulder};
          height: 34px;
          padding-left: 1.2rem;

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
      margin-left: 0.5rem;
      height: 34px;

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
        font-weight: bold;
        text-transform: uppercase;
        font-size: 10px;
        text-align: left;
        line-height: 1;
      }
    }
  }

  .toggle-box-wrapper {
    button {
      font-weight: bold;
      height: 34px;

      &.active {
        background-color: ${colors.primary};
        color: ${colors.white};
        border-color: ${colors.primary};
      }
    }
  }

  .more-filter {
    display: none;

    &.is-active {
      display: flex;
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
      margin-top: 100px;
    }
    .more-filter {
      flex-direction: column;

      .filter-options {
        flex-direction: column;

        .filter-option-wrapper {
          margin: 0 0.25rem 0.75rem;

          .select,
          select,
          input {
            width: 100%;
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
          width: 100%;
          margin: 0;
        }
      }
    }
  }
`;
