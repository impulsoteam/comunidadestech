import React, { useState, useEffect } from 'react'
import ReactMap, { NavigationControl, Marker } from 'react-map-gl'

import { useRouter } from 'next/router'
import PropTypes from 'prop-types'

import Card from '../Card'
import CommunitySideBar from '../CommunitySideBar'
import styles from './styles'
const Map = ({ communities }) => {
  const router = useRouter()
  const [viewport, setViewport] = useState({
    latitude: -15.6634068,
    longitude: -58.6388463,
    zoom: 3.5,
    width: '100%',
    height: '100%',
  })
  const [communitySideBar, setCommunitySideBar] = useState({})
  const [mobileSideBar, setMobileSideBar] = useState(false)
  const [locations, setLocations] = useState([])
  const handleResetButton = () => {
    router.push({
      pathname: '/',
      query: {},
    })
  }
  const closeMobileSideBar = () => {
    setMobileSideBar(!mobileSideBar)
    handleResetButton()
  }
  const handleClickPin = (e) => {
    setMobileSideBar(!mobileSideBar)
    router.push({
      pathname: '/',
      query: { ...e.target.dataset, ...router.query },
    })
  }

  useEffect(() => {
    let locations = []
    communities.forEach((item) => {
      if (locations.filter((city) => city.state) !== item.location.state) {
        item.location.state &&
          locations.push({
            state: item.location.state,
            city: item.location.city,
            latitude: item.location.latitude,
            longitude: item.location.longitude,
          })
      }
    })
    locations.forEach((location) => {
      location.number = locations.filter(
        (item) => item.state === location.state && item.city === location.city
      ).length
    })
    locations = locations.filter(
      (elem, index, self) =>
        self.findIndex((item) => {
          return (
            item.city === elem.city &&
            item.number === elem.number &&
            elem.number > 1
          )
        }) === index
    )
    setLocations(locations)
  }, [communities])

  return (
    <div className="map-component-wrapper">
      <div className="map-wrapper">
        <ReactMap
          style={{ width: '100%' }}
          {...viewport}
          mapboxApiAccessToken={process.env.MAPBOX_TOKEN}
          mapStyle="mapbox://styles/impulso/ck5mh46rt392t1iqkpdpl7dx0"
          scrollZoom={false}
          onViewportChange={(viewport) => {
            setViewport(viewport)
          }}
        >
          {communities.map(
            (community) =>
              community.location.latitude &&
              (locations.filter(
                (location) =>
                  location.state === community.location.state &&
                  location.city === community.location.city
              ).length > 0 ? (
                <Marker
                  key={community._id}
                  latitude={community.location.latitude}
                  longitude={community.location.longitude}
                >
                  <button
                    className="marker-wrapper"
                    onClick={(e) => {
                      handleClickPin(e)
                    }}
                    data-state={community.location.state}
                    data-city={community.location.city}
                  >
                    <div className="marker-form"></div>
                    <div className="marker-content">
                      <span>
                        {
                          locations.filter(
                            (location) =>
                              location.state === community.location.state &&
                              location.city === community.location.city
                          )[0].number
                        }
                      </span>
                    </div>
                  </button>
                </Marker>
              ) : (
                <Marker
                  key={community._id}
                  latitude={community.location.latitude}
                  longitude={community.location.longitude}
                >
                  <button
                    className="marker-wrapper"
                    onClick={() => {
                      setCommunitySideBar(community)
                    }}
                    data-name={community.nameSearch}
                  >
                    <div className="marker-form"></div>
                    <div className="marker-content">
                      <img src={community.logo} alt={community.name} />
                    </div>{' '}
                  </button>
                </Marker>
              ))
          )}
          <div style={{ position: 'absolute', left: '10px', top: '10px' }}>
            <NavigationControl />
          </div>
          <div style={{ position: 'absolute', right: '10px', top: '10px' }}>
            <button
              onClick={() => handleResetButton()}
              className="button button-reset-map"
            >
              <span className="icon is-small">
                <i className="fas fa-sync-alt"></i>
              </span>
              <span>Resetar Mapa</span>
            </button>
          </div>
        </ReactMap>
      </div>
      <div className={`community-list ${mobileSideBar && 'mobile-sidebar'}`}>
        <div className="container">
          <div className="columns button-wrapper" onClick={closeMobileSideBar}>
            <div className="column is-12 " style={{ height: '2.75rem' }}>
              <div className="close-button">
                <i className="fas fa-chevron-right"></i>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="columns is-multiline card-wrapper">
                {communities.map((card) => (
                  <div className="column is-12" key={card.id}>
                    <Card
                      content={card}
                      miniPage
                      clickCommunity={() => setCommunitySideBar(card)}
                    />
                  </div>
                ))}
                <div className="column is-12">
                  <button
                    onClick={() => handleResetButton()}
                    className="button button-reset is-fullwidth"
                  >
                    <span className="icon is-small">
                      <i className="fas fa-sync-alt"></i>
                    </span>
                    <span>Resetar Filtro</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`community-side-bar ${communitySideBar.name &&
          ' is-active'}`}
      >
        {communitySideBar.name && (
          <>
            <CommunitySideBar community={communitySideBar} />
            <div
              className="close-button"
              onClick={() => setCommunitySideBar({})}
            >
              <i className="fas fa-chevron-right"></i>
            </div>
          </>
        )}
      </div>
      <style jsx>{styles}</style>
    </div>
  )
}

Map.propTypes = {
  communities: PropTypes.array,
}

export default Map
