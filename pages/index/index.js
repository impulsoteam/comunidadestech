import React, { useState, useEffect } from 'react'

import Router, { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import queryString from 'query-string'

import Counter from '../../components/Counter'
import Filter from '../../components/Filter'
import styles from '../../components/HomeStyles/styles'
import Map from '../../components/Map'
import PaginationMenu from '../../components/PaginationMenu'
import { api, setHeader } from '../../utils/axios'
import { paramFilter, normalize } from '../../utils/index'

import Card from '/components/Card/'
import Hero from '/components/Hero/'

const Home = ({ credentials }) => {
  const router = useRouter()
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [multipleFilter, setMultipleFilter] = useState([])
  const [filteredMulti, setFilteredMulti] = useState([])
  const [pageList, setPageList] = useState([])
  const [pageView, setPageView] = useState('list')
  const [model, setModel] = useState('')
  const [mobileSideBar, setMobileSideBar] = useState(false)
  const [url, setUrl] = useState({})
  const [communitySideBar, setCommunitySideBar] = useState({})

  const [communitiesDetails, setCommunitiesDetails] = useState()
  const [totalCommunities, setTotalCommunities] = useState()
  const [query, setQuery] = useState({
    // name: 'golan',
    // status: 'published',
    // type: 'Meetup',
    // category: 'Desenvolvimento de software',
    // model: 'both',
    // tags: 'Back-end',
    // city: 'São Paulo',
    // state: 'SP',
    // country: 'Brasil',
  })
  const [pageCount, setPageCount] = useState(0)
  const [communities, setCommunities] = useState([])

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
          limit: pageView === 'map' ? 9999 : 20,
        })}`
      )

      setQuery(newQuery)
      setTotalCommunities(data.totalCommunities)
      setCommunities(data.communities)
      setLoading(false)
    }
    getList()
  }, [pageCount, router.query, pageView])

  const handleChange = (event) => {
    const { name, value } = event.target
    const newFilter = multipleFilter

    value === 'all' || value === 'both'
      ? (newFilter[name] = '')
      : name === 'nameSearch'
      ? (newFilter[name] = value.toLowerCase())
      : (newFilter[name] = value)
    name === 'state' && (newFilter.city = '')
    setMultipleFilter(newFilter)
    const filteredMulti = paramFilter(list, newFilter)
    setFilteredMulti(filteredMulti)
    setPageList(page(filteredMulti, 20))
    // setPageCount(0);

    let address = '/?'
    for (const prop in newFilter) {
      newFilter[prop] &&
        (address = `${address}${prop}=`) &&
        (address = `${address}${newFilter[prop]}&`)
    }
    const href = address.slice(0, -1)
    const as = href
    Router.push(href, as, { shallow: true })
  }

  const handleResetButton = () => {
    const href = '/'
    const as = href
    Router.push(href, as, { shallow: true })

    setFilteredMulti(list)
    setPageList(page(filteredMulti, 20))
    // setPageCount(0);
    setMultipleFilter({})
    setCommunitySideBar({})
    setUrl({})
    setModel('')
  }

  const handleClickPin = (e) => {
    const { city, state, name } = e.target.dataset
    let newFilter = multipleFilter

    if (city && state && !name) {
      newFilter.country
        ? delete newFilter.country &&
          delete newFilter.state &&
          delete newFilter.city
        : (newFilter = Object.assign(
            { country: 'Brasil', state, city },
            newFilter
          ))
      setMultipleFilter(newFilter)
      const filteredMulti = paramFilter(list, newFilter)
      setFilteredMulti(filteredMulti)
      setCommunitySideBar({})
      setMobileSideBar(!mobileSideBar)
    }

    if (name) {
      newFilter = { nameSearch: name }
      setCommunitySideBar(paramFilter(list, newFilter)[0])
    }

    let address = '/?'
    for (const prop in newFilter) {
      newFilter[prop] &&
        (address = `${address}${prop}=`) &&
        (address = `${address}${newFilter[prop]}&`)
    }
    const href = address.slice(0, -1)
    const as = href
    Router.push(href, as, { shallow: true })
  }

  const handleCloseSideBar = () => {
    setCommunitySideBar({})
  }

  const handleCloseMobileSideBar = () => {
    const newFilter = multipleFilter
    delete newFilter.country
    delete newFilter.state
    delete newFilter.city
    setMobileSideBar(false)
    setMultipleFilter(newFilter)
    setTimeout(() => {
      const newFilteredMulti = paramFilter(list, newFilter)
      setFilteredMulti(newFilteredMulti)
    }, 300)
  }

  const handleClickCommunity = (e) => {
    const { name } = e.target.dataset
    const newFilter = { nameSearch: name }
    const newCommunitySideBar = paramFilter(list, newFilter)[0]

    setCommunitySideBar(newCommunitySideBar)
  }

  const renderPage = () => {
    if (loading)
      return (
        <div>
          <img
            src="/static/comunidades-tech-loader.gif"
            style={{
              maxWidth: '100px',
              display: 'block',
              margin: '100px auto',
            }}
          />
        </div>
      )

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
        <Map
          list={communities}
          clickPin={handleClickPin}
          clickCommunity={handleClickCommunity}
          communitySideBar={communitySideBar}
          closeSideBar={handleCloseSideBar}
          closeMobileSideBar={handleCloseMobileSideBar}
          reset={handleResetButton}
          mobileSideBar={mobileSideBar}
        />
      </div>
    )

    return (
      <div>
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
  credentials: PropTypes.object,
}

export default Home
