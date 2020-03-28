import React from 'react'
import { useWindowSize } from 'react-use'

import PropTypes from 'prop-types'

import styles from './styles'

const Counter = ({ communities, cities, members }) => {
  const { width } = useWindowSize()
  const isMobile = !(width > 769)

  return (
    <div className="container counter-wrapper is-fluid">
      <div className="counter">
        {!isMobile && <i className="fas fa-laptop-code"></i>}
        <div className="counter-info">
          <h2 className="is-size-1-desktop is-size-2-tablet is-size-4-mobile">
            {communities}
          </h2>
          <h5 className="is-size-7-mobile">
            <span>Comunidades</span>
            {!isMobile && (
              <>
                <br /> cadastradas
              </>
            )}
          </h5>
        </div>
      </div>
      <div className="counter">
        {!isMobile && <i className="fas fa-map-marked-alt"></i>}
        <div className="counter-info">
          <h2 className="is-size-1-desktop is-size-2-tablet is-size-4-mobile">
            {cities}
          </h2>
          <h5 className="is-size-7-mobile">
            <span>Cidades</span>
            {!isMobile && (
              <>
                <br /> representadas
              </>
            )}
          </h5>
        </div>
      </div>
      <div className="counter">
        {!isMobile && <i className="fas fa-users"></i>}
        <div className="counter-info">
          <h2 className="is-size-1-desktop is-size-2-tablet is-size-4-mobile">
            {members.toLocaleString('pt-BR')}
          </h2>
          <h5 className="is-size-7-mobile">
            <span>Membros</span>
            {!isMobile && (
              <>
                <br /> das comunidades
              </>
            )}
          </h5>
        </div>
      </div>
      <style jsx>{styles}</style>
    </div>
  )
}

Counter.propTypes = {
  communities: PropTypes.number,
  cities: PropTypes.number,
  members: PropTypes.number
}

export default Counter
