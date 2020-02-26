import css from 'styled-jsx/css'

import { colors } from '/utils/variables'

export default css`
  .related {
    margin-top: 40px;
    max-width: 936px;
    padding-bottom: 40px;
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
