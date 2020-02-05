import css from 'styled-jsx/css'

import { colors } from '/utils/variables'

export default css`
  .manager-card {
    .card-content {
      padding: 0.75rem;
      .media {
        margin-bottom: 0;
        align-items: center;
        .subtitle {
          margin-top: -1.5rem;
        }
        .media-left {
          margin-right: 0.5rem;
          img {
            border-radius: 50%;
          }
        }
      }
    }
    button {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 0.75rem;
      border: none;
      background: transparent;
      padding: 0;
      font-weight: 600;
      cursor: pointer;
    }
  }

  .admin-title {
    color: ${colors.dark};
    font-weight: 600;
    margin: 1.25rem 0 0.75rem;
  }
`
