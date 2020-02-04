import css from 'styled-jsx/css'

import { colors } from '/utils/variables'

export default css`
  .wrapper {
    margin-top: 60px;
  }

  .container {
    max-width: 936px;

    @media screen and (max-width: 1023px) {
      margin-left: 10px;
      margin-right: 10px;
    }
  }

  .head {
    background-color: ${colors.white};
    border-radius: 6px;
    box-shadow: 0 2px 26px 0 rgba(10, 10, 10, 0.1);
    margin-top: -120px;
  }

  .description {
    margin-top: 40px;
    padding-bottom: 20px;
  }

  .image {
    min-width: 150px;
  }

  .back-button {
    left: 0;
    position: absolute;
    top: -30px;

    a {
      color: white;

      i {
        transform: rotate(180deg) scaleX(-1) translateY(-3px);
      }
    }
  }
  .columns {
    padding: 12px;
  }

  .column.is-flex {
    flex-direction: column;
  }

  .title {
    margin-bottom: 10px;
  }

  .info {
    align-items: center;
    display: flex;

    i {
      color: ${colors.primary};
      margin-right: 8px;
      text-align: center;
      width: 20px;
    }
  }

  .tags > div {
    width: 100%;
  }

  .managers-wrapper {
    position: relative;

    h3 {
      font-weight: 600;
      margin-bottom: 0.75rem;
    }

    .managers {
      display: flex;
      align-items: center;
      margin-bottom: 0.5rem;

      img {
        border-radius: 50%;
        margin-right: 0.5rem;
        width: 36px;
      }

      span {
        font-size: 0.875rem;
      }
    }
  }

  .links {
    max-width: 936px;

    .columns {
      justify-content: center;

      .column {
        padding: 1.5rem 0.75rem;
        text-align: center;

        a {
          color: ${colors.boulder};

          &:hover {
            color: ${colors.primary};
          }
        }
      }
    }
  }
`
