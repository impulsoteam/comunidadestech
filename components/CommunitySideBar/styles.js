import css from 'styled-jsx/css';
import { colors } from '/utils/variables';

export default css`
  .community-side-bar-wrapper {
    .head {
      padding: 0;

      .columns {
        margin: 0;
      }

      .logo {
        border-bottom: solid 2px ${colors.wildSand};
        padding-bottom: 1rem;

        .image {
          align-items: center;
          display: flex;
          height: 150px;
          margin: 0 auto;
          width: 150px;
        }
      }

      .info {
        flex-direction: column;
        padding-top: 1rem;

        h2 {
          color: ${colors.dark};
          font-size: 1.1rem;
          margin-bottom: 0.25rem;
        }

        p {
          font-size: 0.85rem;
          font-weight: 600;
          i {
            color: ${colors.primary};
            margin-right: 5px;
            text-align: center;
            width: 20px;
          }
        }
      }
    }
    .description {
      .tags {
        & > div:first-child {
          width: 100%;
        }

        .tag {
          font-size: 0.675rem;
          margin-bottom: 0.3rem;

          &:not(:last-child) {
            margin-bottom: 0;
            margin-right: 0.2rem;
          }
        }
      }

      p {
        font-size: 0.9rem;
        line-height: 1.4;
      }
    }

    .links {
      display: flex;
      margin: 0.75rem 0;

      i {
        color: ${colors.boulder};
      }

      a:not(:last-child) {
        margin-right: 1rem;
      }
    }

    .tag {
      font-size: 10px;
    }

    .btn-tooltip {
      border: none;
      cursor: pointer;
    }

    .tooltip {
      background-color: ${colors.softCloud};
      border-radius: 5px;
      box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1),
        0 0 0 1px rgba(10, 10, 10, 0.1);
      display: none;
      font-size: 1.25em;
      left: 0;
      padding: 20px;
      position: absolute;
      right: 0;
      width: 300px;
      z-index: 2000;
    }

    .open-tooltip:hover {
      .tooltip {
        display: block;
      }

      .btn-tooltip:after {
        border: 0.75rem solid transparent;
        border-bottom-color: ${colors.softCloud};
        border-top: none;
        content: '';
        filter: drop-shadow(0 -0.0625rem 0.0625rem rgba(10, 10, 10, 0.1));
        height: 0;
        margin-bottom: -23px;
        position: absolute;
        width: 0;
        z-index: 3000;
      }
    }

    .title-tooltip {
      font-weight: 600;
      min-height: 36px;
      line-height: 1.125;
    }
  }
`;
