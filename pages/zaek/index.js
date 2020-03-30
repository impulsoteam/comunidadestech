import React from 'react'

import CommunityCardEasterEgg from '../../components/CommunityCardEasterEgg'
import CommunityHero from '../../components/CommunityHero'
import styles from '../../components/CommunityStyles/styles'

const Zaek = () => (
  <div>
    <CommunityHero />
    <CommunityCardEasterEgg
      community={{
        name: 'All Saints Bay',
        logo:
          'https://s3.sa-east-1.amazonaws.com/assets.comunidades.tech/all-saints-bay.jpg'
      }}
    />
    <style jsx>{styles}</style>
  </div>
)

export default Zaek
