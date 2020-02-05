import React from 'react'

import PropTypes from 'prop-types'

import styles from './styles'

const Divider = (props) => (
  <>
    <div
      className={'divider ' + (props.dataContent && 'content')}
      data-content={props.dataContent}
    ></div>
    <style jsx>{styles}</style>
  </>
)

Divider.propTypes = {
  dataContent: PropTypes.string
}

export default Divider
