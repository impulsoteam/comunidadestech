import React from 'react'

import PropTypes from 'prop-types'

import styles from './styles'

const PaginationMenu = ({ pageCount, setPageCount, totalCommunities }) => {
  const numberOfPages = Math.ceil(totalCommunities / 48)

  if (numberOfPages === 1) return null

  const counter = []
  for (let i = 0; i < numberOfPages; i++) {
    counter.push(i)
  }

  return (
    <div className="pagination-wrapper">
      {counter.length > 5
        ? <>
          <span onClick={() => pageCount > 0 && setPageCount(pageCount - 1)}>
            <i className="fas fa-chevron-left"></i>
          </span>
          <span
            className={pageCount === 0 && 'active'}
            onClick={() => setPageCount(0)}
          >
            1
          </span>
          {pageCount >= 3 && (
            <span>
              <i className="fas fa-ellipsis-h"></i>
            </span>
          )}
          {pageCount === 0 && (
            <>
              <span onClick={() => setPageCount(1)}>2</span>
              <span onClick={() => setPageCount(2)}>3</span>
            </>
          )}
          {pageCount === 1 && (
            <>
              <span className="active" onClick={() => setPageCount(1)}>
                2
              </span>
              <span onClick={() => setPageCount(2)}>3</span>
            </>
          )}
          {pageCount === 2 && (
            <>
              <span onClick={() => setPageCount(1)}>2</span>
              <span className="active" onClick={() => setPageCount(2)}>
                3
              </span>
              <span onClick={() => setPageCount(3)}>4</span>
            </>
          )}
          {pageCount > 2 && pageCount < numberOfPages - 2 && (
            <>
              <span onClick={() => setPageCount(pageCount - 1)}>
                {pageCount}
              </span>
              <span className="active" onClick={() => setPageCount(pageCount)}>
                {pageCount + 1}
              </span>
              <span onClick={() => setPageCount(pageCount + 1)}>
                {pageCount + 2}
              </span>
            </>
          )}
          {pageCount === numberOfPages - 2 && (
            <>
              <span onClick={() => setPageCount(pageCount - 1)}>
                {pageCount}
              </span>
              <span className="active" onClick={() => setPageCount(pageCount)}>
                {pageCount + 1}
              </span>
            </>
          )}
          {pageCount === numberOfPages - 1 && (
            <>
              <span onClick={() => setPageCount(pageCount - 2)}>
                {pageCount - 1}
              </span>
              <span onClick={() => setPageCount(pageCount - 1)}>
                {pageCount}
              </span>
            </>
          )}
          {pageCount <= numberOfPages - 4 && (
            <span>
              <i className="fas fa-ellipsis-h"></i>
            </span>
          )}
          <span
            className={pageCount === numberOfPages - 1 && 'active'}
            onClick={() => setPageCount(numberOfPages - 1)}
          >
            {numberOfPages}
          </span>
          <span
            onClick={() =>
              pageCount < numberOfPages - 1 && setPageCount(pageCount + 1)
            }
          >
            <i className="fas fa-chevron-right"></i>
          </span>
        </>
        : <>
          <span onClick={() => pageCount > 0 && setPageCount(pageCount - 1)}>
            <i className="fas fa-chevron-left"></i>
          </span>
          {counter.map((index) => (
            <span
              onClick={() => setPageCount(index)}
              key={index}
              className={pageCount === index && 'active'}
            >
              {index + 1}
            </span>
          ))}
          <span
            onClick={() =>
              pageCount < numberOfPages - 1 && setPageCount(pageCount + 1)
            }
          >
            <i className="fas fa-chevron-right"></i>
          </span>
        </>
      }
      <style jsx>{styles}</style>
    </div>
  )
}

PaginationMenu.propTypes = {
  setPageCount: PropTypes.func,
  pageCount: PropTypes.number,
  totalCommunities: PropTypes.number
}

export default PaginationMenu
