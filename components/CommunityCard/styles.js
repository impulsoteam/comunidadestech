import css from 'styled-jsx/css'

import { colors } from '/utils/variables'

export default css`
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

  .column-description{
    overflow-wrap: break-word;
    word-wrap: break-word;
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
  .options {
    align-items: center;
    align-self: end;
    display: flex;
    justify-content: end;
    margin-top: auto;
    width: 50%;

    a {
      font-weight: bold;
      font-size: 0.75rem;
      margin-left: 4px;
      color: ${colors.dark};

      &:not(last-child) {
        margin-right: 10px;
      }

      &:hover {
        color: ${colors.primary};
      }

      &.button {
        background-color: ${colors.primary};
        border-color: ${colors.primary};
        border-radius: 4px;
        color: ${colors.white};

        &:hover {
          background-color: ${colors.white};
          color: ${colors.primary};
        }
      }

      i {
        margin-right: 5px;
      }
    }
    @media screen and (max-width: 768px) {
      margin-top: 1rem;
      width: 100%;
    }
  }
  .tags > div {
    width: 100%;

    .tag.gray {
      background: ${colors.silverChalice};
      color: ${colors.dark};
    }
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

    .tooltip-wrapper {
      background: ${colors.white};
      border-radius: 4px;
      border: solid 1px rgba(10, 10, 10, 0.1);
      padding: 10px 0 0 10px;
      position: absolute;
      width: 100%;
      z-index: 1;
      display: none;
    }

    .tooltip-button {
      font-size: 12px;
      text-align: center;
      background: ${colors.wildSand};
      padding: 4px;
      cursor: pointer;

      span {
        line-height: 1;
      }
    }

    .tooltip-toggle:hover .tooltip-wrapper {
      display: initial;
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
