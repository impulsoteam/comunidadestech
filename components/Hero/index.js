
import React from 'react'
import { useWindowSize } from 'react-use'

import styles from './styles'

const Hero = () => {
  const { width } = useWindowSize()
  const isMobile = !(width > 769)
  return (
    <div className="container component-wrapper is-fluid">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column has-text-centered">
              <h2 className="subtitle is-size-4-desktop">
                {!isMobile ? (
                  <>
                    Espaço de visibilidade e fortalecimento das comunidades de
                    tecnologia.
                  </>
                ) : (
                  <>Espaço das comunidades de tecnologia</>
                )}
              </h2>
            </div>
          </div>
        </div>
        <style jsx>{styles}</style>
      </div>
    </div>
  )
}

export default Hero
