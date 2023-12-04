import React, { Component } from 'react'
import styles from './styles'

class CommunityHero extends Component {
  
  render () {
    return (
      <>
        <section className="hero hero-image">
          <div className="hero-body">
            <div className="container"></div>
          </div>
          <style jsx>{styles}</style>
        </section>
      </>
    )
  }
}

export default CommunityHero
