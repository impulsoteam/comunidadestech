import css from 'styled-jsx/css';

export default css`
  .navbar {
    padding: 1.2rem 0;
    box-shadow: none;
    z-index: auto;
  }
  .navbar-item {
    min-width: 80px;
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
`;
