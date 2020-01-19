import React, { useState, useEffect } from 'react';
import Card from '../Card';
import ReactMap, { NavigationControl, Marker } from 'react-map-gl';
import styles from './styles';
import CommunitySideBar from '../CommunitySideBar';

const Map = ({
  list,
  clickPin,
  clickCommunity,
  communitySideBar,
  closeSideBar,
  closeMobileSideBar,
  reset,
  mobileSideBar,
}) => {
  const [viewport, setViewport] = useState({
    latitude: -15.6634068,
    longitude: -58.6388463,
    zoom: 3.5,
    width: '100%',
    height: '100%',
  });
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    let locations = [];
    list.forEach((item) => {
      if (locations.filter((city) => city.state) !== item.location.state)
        item.location.state &&
          locations.push({
            state: item.location.state,
            city: item.location.city,
            latitude: item.location.latitude,
            longitude: item.location.longitude,
          });
    });
    locations.forEach((location) => {
      location.number = locations.filter(
        (item) => item.state === location.state && item.city === location.city
      ).length;
    });
    locations = locations.filter(
      (elem, index, self) =>
        self.findIndex((item) => {
          return (
            item.city === elem.city &&
            item.number === elem.number &&
            elem.number > 1
          );
        }) === index
    );
    setLocations(locations);
  }, [list]);

  return (
    <div className="map-component-wrapper">
      <div className="map-wrapper">
        <ReactMap
          style={{ width: '100%' }}
          {...viewport}
          mapboxApiAccessToken="pk.eyJ1IjoidGhlbGVvYWQiLCJhIjoiY2s1NDVwM2hkMGZ6ZzNncWt1dzBzZnZudSJ9.nfMovVhu68L-bZj4WE9Mpg"
          mapStyle="mapbox://styles/theleoad/ck54752un51f91dlkif9somna"
          scrollZoom={false}
          onViewportChange={(viewport) => {
            setViewport(viewport);
          }}
        >
          {list.map(
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
                      clickPin(e);
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
                    onClick={(e) => {
                      clickPin(e);
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
              onClick={(event) => {
                reset(event);
              }}
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
      <div className={`community-list ${mobileSideBar && `mobile-sidebar`}`}>
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
                {list.map((card) => (
                  <div className="column is-12" key={card.id}>
                    <Card
                      content={card}
                      miniPage
                      clickCommunity={clickCommunity}
                    />
                  </div>
                ))}
                <div className="column is-12">
                  <button
                    onClick={(event) => {
                      reset(event);
                    }}
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
            <div className="close-button" onClick={closeSideBar}>
              <i className="fas fa-chevron-right"></i>
            </div>
          </>
        )}
      </div>
      <style jsx>{styles}</style>
    </div>
  );
};

export default Map;
