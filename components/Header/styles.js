import css from 'styled-jsx/css'

import { colors } from '/utils/variables'

export default css`
  .navbar {
    margin: 0 auto;
    max-width: 1280px;
    padding: 1.375rem 0;

    .navbar-burger span {
      height: 2px;
    }

    .navbar-menu.is-active {
      border-radius: 6px;
      border-top: solid 2px rgba(10, 10, 10, 0.1);
      margin-left: auto;
      margin-right: 10px;
      max-width: 400px;
      padding: 0;
      width: 90%;

      .navbar-item {
        border-top: solid 2px rgba(10, 10, 10, 0.1);
      }
    }
  }

  .navbar-item {
    font-weight: bold;

    .btn-dark {
      border: none;
    }

    .icons-menu {
      width: 18px;
      margin-right: 5px;
    }

    .github-icon {
      max-width: 1.75rem;
      margin-right: 8px;
    }

    &:hover,
    &.has-dropdown:hover .navbar-link {
      background-color: transparent;
      color: ${colors.primary};
    }

    & .navbar-link::after {
      border-color: ${colors.primary};
    }

    .navbar-logo {
      max-height: none;
      width: 180px;
    }

    .profile-image {
      border-radius: 50%;
      border: solid 1px #8c43ff;
      height: 50px;
      margin-right: 0.75rem;
      max-height: none;
      width: 50px;
    }

    .navbar-dropdown {
      border-radius: 6px;
      border-top: 2px solid rgba(10, 10, 10, 0.05);
      padding: 0;

      .navbar-item {
        padding: 1rem 1rem;

        :hover {
          color: ${colors.primary};
        }

        i {
          margin-right: 0.5rem;
        }
      }
      .navbar-divider {
        margin: 0;
      }
    }
  }
  @media screen and (max-width: 1023px) {
    .navbar {
      position: fixed;
      width: 100%;
      top: 0;

      .btn-os {
        align-items: center;
        display: flex;
      }
    }

    .navbar-menu.is-active {
      position: absolute;
      right: 0;
    }
  }
`
