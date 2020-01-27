import css from 'styled-jsx/css';
import { colors } from '/utils/variables';

export default css`
  .map-component-wrapper {
    display: flex;
    height: 70vh;
    min-height: 520px;

    .map-wrapper {
      width: 80%;

      .marker-wrapper {
        background: transparent;
        border: none;
        display: inline-block;
        position: relative;
        cursor: pointer;

        .marker-form {
          background: ${colors.primary};
          border-radius: 50% 50% 50% 0;
          height: 40px;
          transform: rotate(-45deg);
          width: 40px;

          &::after {
            background: ${colors.white};
            border-radius: 50%;
            content: '';
            display: block;
            height: 32px;
            margin: 4px 0 0 4px;
            position: absolute;
            width: 32px;
          }
        }

        .marker-content {
          align-items: center;
          display: flex;
          height: 32px;
          justify-content: center;
          left: 50%;
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 32px;

          img {
            border-radius: 50%;
          }

          span {
            color: ${colors.primary};
            font-size: 0.875rem;
            font-weight: bold;
            padding-bottom: 3px;
          }
        }

        * {
          pointer-events: none;
        }
      }
    }

    .community-list {
      box-shadow: -7px 0px 20px -10px rgba(0, 0, 0, 0.4);
      max-height: 100%;
      overflow-y: scroll;
      width: 20%;
      z-index: 1;

      .container {
        max-width: calc(100% - 4px);
        padding: 10px;
      }

      .button-reset {
        background-color: ${colors.chestnutRose};
        color: ${colors.white};

        &:hover {
          background-color: ${colors.white};
          border: solid 1px;
          color: ${colors.chestnutRose};
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

    .community-side-bar {
      background: white;
      box-shadow: -7px 0px 20px -10px rgba(0, 0, 0, 0.4);
      height: 100%;
      min-width: 360px;
      position: absolute;
      right: -50%;
      transition: all 0.5s;
      width: 30%;
      z-index: 2;

      &.is-active {
        right: 0;
      }
    }
    .close-button {
      align-items: center;
      background: ${colors.dark};
      border-radius: 50%;
      color: ${colors.white};
      display: flex;
      height: 1.5rem;
      justify-content: center;
      margin: 0.75rem;
      padding-left: 1px;
      position: absolute;
      top: 0;
      width: 1.5rem;
    }

    .button-wrapper {
      display: none;
    }
  }

  @media screen and (max-width: 1280px) {
    .map-component-wrapper {
      .map-wrapper {
        width: 70%;
      }

      .community-list {
        width: 30%;
      }
    }
  }

  @media screen and (max-width: 768px) {
    .map-component-wrapper {
      min-height: 600px;
      .map-wrapper {
        width: 100%;
      }

      .community-list {
        background: ${colors.white};
        height: 100%;
        overflow-x: hidden;
        position: absolute;
        right: -81%;
        transition: all 0.3s;
        width: 80%;

        .container {
          padding: 4px;
        }

        &.mobile-sidebar {
          right: 0;
        }

        .button-wrapper {
          display: flex;
        }
      }

      .community-side-bar {
        min-width: 0;
        right: -110%;
        width: 90%;
      }
    }
  }
`;
