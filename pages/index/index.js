import React, { useState, useEffect } from 'react'

import Router from 'next/router'
import PropTypes from 'prop-types'

import Counter from '../../components/Counter'
import Filter from '../../components/Filter'
import styles from '../../components/HomeStyles/styles'
import Map from '../../components/Map'
import PaginationMenu from '../../components/PaginationMenu'
import { api, setHeader } from '../../utils/axios'
import { paramFilter, normalize, page } from '../../utils/index'

import Card from '/components/Card/'
import Hero from '/components/Hero/'

const Home = ({ credentials }) => {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [multipleFilter, setMultipleFilter] = useState([])
  const [filteredMulti, setFilteredMulti] = useState([])
  const [pageList, setPageList] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [pageOptions, setPageOptions] = useState('')
  const [model, setModel] = useState('')
  const [mobileSideBar, setMobileSideBar] = useState(false)
  const [url, setUrl] = useState({})
  const [communitySideBar, setCommunitySideBar] = useState({})

  useEffect(() => {
    const getList = async () => {
      setHeader(credentials)
      const { data } = await api.get('/community/status/published')
      setList(normalize(data))

      const route = Router.router.query
      const newFilter = multipleFilter
      for (const prop in route) {
        newFilter[prop] = route[prop]
      }

      const filteredMulti = paramFilter(normalize(data), newFilter)

      const url = Router.router.query
      const model = url.model

      setFilteredMulti(filteredMulti)
      setPageList(page(filteredMulti, 20))
      setMultipleFilter(newFilter)
      setPageCount(0)
      setLoading(false)
      setPageOptions('list')
      setCommunitySideBar({})
      setUrl(url)
      setModel(model)
      setMobileSideBar(false)
    }
    getList()
  }, [])

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
    setPageCount(0)

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
    setPageCount(0)
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

  const handlePageOptions = (e) => {
    const { value } = e.target
    setPageOptions(value)
  }

  const paramsHandler = (event) => {
    const { name, value } = event.target
    const newUrl = url
    let newModel = model
    name === 'model' && (newModel = value)
    value === 'all' ? (newUrl[name] = '') : (newUrl[name] = value)
    setUrl(newUrl)
    setModel(newModel)
  }

  const getPropertyList = (list) => {
    const propertyList = {
      tags: [],
      types: [],
      locations: {}
    }
    const { types, locations } = propertyList

    list.forEach((item) => {
      item.type !== 'legacy' &&
        !types.includes(item.type) &&
        types.push(item.type)
      propertyList.tags = Array.from(
        new Set(propertyList.tags.concat(item.tags))
      )
      item.location.country && (locations[item.location.country] = {})
    })

    list.forEach((item) => {
      item.location.state &&
        (locations[item.location.country][item.location.state] = [])
    })

    list.forEach((item) => {
      item.location.state &&
        item.location.city !== null &&
        locations[item.location.country][item.location.state].push(
          item.location.city
        )
    })
    return propertyList
  }

  return (
    <>
      {!loading ? (
        <div>
          <Hero />
          <Counter list={list} />
          <Filter
            list={list}
            select={handleChange}
            reset={handleResetButton}
            multipleFilter={multipleFilter}
            propertyList={getPropertyList(list)}
            pageOptions={handlePageOptions}
            pageSelected={pageOptions}
            url={url}
            model={model}
            paramsHandler={paramsHandler}
          />
          {pageOptions === 'list' && (
            <div
              className="container"
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <div className="columns">
                <div className="column">
                  <div className="columns is-multiline card-wrapper">
                    {pageList[pageCount].map((card, index) => (
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
                numberOfPages={pageList.length}
              />
            </div>
          )}{' '}
          {pageOptions === 'map' && (
            <div className="container is-fluid map-container">
              <Map
                list={filteredMulti}
                clickPin={handleClickPin}
                clickCommunity={handleClickCommunity}
                communitySideBar={communitySideBar}
                closeSideBar={handleCloseSideBar}
                closeMobileSideBar={handleCloseMobileSideBar}
                reset={handleResetButton}
                mobileSideBar={mobileSideBar}
              />
            </div>
          )}
          <style jsx>{styles}</style>
        </div>
      ) : (
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
      )}
    </>
  )
}

Home.propTypes = {
  credentials: PropTypes.object
}

export default Home
