import React, { useState, useEffect } from 'react'

import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import queryString from 'query-string'

import Counter from '../../components/Counter'
import EasterEggLoader from '../../components/EasterEggLoader'
import Filter from '../../components/Filter'
import styles from '../../components/HomeStyles/styles'
import Map from '../../components/Map'
import PaginationMenu from '../../components/PaginationMenu'
import { api, setHeader } from '../../utils/axios'
import useKonamiCode from '../../utils/use-konami-code'

import Card from '/components/Card/'
import Hero from '/components/Hero/'

const Home = ({ credentials }) => {
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [pageView, setPageView] = useState('list')
  const [communitiesDetails, setCommunitiesDetails] = useState()
  const [totalCommunities, setTotalCommunities] = useState()
  const [query, setQuery] = useState({})
  const [pageCount, setPageCount] = useState(0)
  const [communities, setCommunities] = useState([])
  const [easterEgg, setEasterEgg] = useState(false)
  useKonamiCode(() => setEasterEgg(true))

  useEffect(() => {
    const getList = async () => {
      setHeader(credentials)

      if (!communities.length) {
        const { data: communitiesDetails } = await api.get(
          '/community/communitiesDetails'
        )
        setCommunitiesDetails(communitiesDetails)
      }

      const newQuery = router.query ? queryString.stringify(router.query) : ''
      const page = newQuery !== query ? 0 : pageCount
      const { data } = await api.get(
        `/community/status/published?${queryString.stringify({
          ...router.query,
          page,
          limit: pageView === 'map' ? 9999 : 48
        })}`
      )
      setQuery(newQuery)
      setTotalCommunities(data.totalCommunities)
      setCommunities(data.communities)
      setLoading(false)
    }
    getList()
  }, [pageCount, router.query, pageView])

  easterEgg && useRouter().push('/zaek', '/', { shallow: true })

  const renderPage = () => {
    if (loading) {
      return (
        <div>
          <img
            src="/static/comunidades-tech-loader.gif"
            style={{
              maxWidth: '100px',
              display: 'block',
              margin: '100px auto'
            }}
          />
        </div>
      )
    }

    const list = (
      <div
        className="container"
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <div className="columns">
          <div className="column">
            <div className="columns is-multiline card-wrapper">
              {communities.map((card) => (
                <div className="column is-one-quarter" key={card._id}>
                  <Card content={card} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <PaginationMenu
          pageCount={pageCount}
          setPageCount={setPageCount}
          totalCommunities={totalCommunities}
        />
      </div>
    )

    const map = (
      <div className="container is-fluid map-container">
        <Map {...{ communities }} />
      </div>
    )

    return (
      <div>
        {easterEgg && <EasterEggLoader />}
        <Hero />
        <Counter {...communitiesDetails} />
        <Filter {...{ pageView, setPageView }} />
        {pageView === 'list' ? list : map}
        <style jsx>{styles}</style>
      </div>
    )
  }

  return renderPage()
}

Home.propTypes = {
  credentials: PropTypes.object
}

export default Home
