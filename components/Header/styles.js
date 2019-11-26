import css from 'styled-jsx/css';

export default css`
  .navbar-brand {
    @media screen and (max-width: 768px) {
      padding: 0;
    }
  }
  .navbar {
    padding: 1.2rem 0;
    box-shadow: none;
    z-index: auto;
  }
  .navbar-item {
    min-width: 80px;

    @media screen and (max-width: 768px) {
      padding: 0;
    }
  }
  .logo {
    min-height: 48px;
  }
  a[href*='github'] {
    align-items: center;
    display: flex;
    justify-content: center;
    min-width: 20px;
  }
  .github {
    height: 32px;
  }

  .navbar-menu {
    box-shadow: none;
  }

  .navbar-end {
    justify-content: flex-end;
  }

  .top-menu {
    display: flex;
    align-items: center;

    .control > .button {
      margin-right: 10px;

      &:last-child {
        margin-right: 20px;
      }

      @media screen and (max-width: 768px) {
        margin-right: 3px;

        &:last-child {
          margin-right: 8px;
        }
      }
    }
  }

  .profile-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }

    p {
      font-size: 12px;
      font-weight: bold;
      line-height: 1.1;
    }

    button {
      max-height: 18px;
      margin-top: 3px;

      strong {
        line-height: 0;
      }
    }
  }
`;
