import css from 'styled-jsx/css';
import { colors } from '/utils/variables';

export default css`
  .filter-wrapper {
    align-items: center;
    border-bottom: solid 2px ${colors.wildSand};
    display: flex;
    justify-content: space-between;
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
          color: ${colors.boulder};
          font-weight: bold;
          height: 34px;
          padding-left: 1.2rem;
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
  }

  .more-filter {
    display: none;
    padding-top: 1.5rem;

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
      padding-top: 0.75rem;

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
          margin: 0;
          width: 100%;
        }
      }
    }
  }
`;
