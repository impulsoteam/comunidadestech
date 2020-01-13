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
  }
`;
