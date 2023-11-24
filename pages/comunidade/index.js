import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { api } from '../../utils/axios'
import Card from '../../components/Card'
import CommunityCard from '../../components/CommunityCard'
import CommunityHero from '../../components/CommunityHero'
import styles from '../../components/CommunityStyles/styles'

const Community = ({ credentials }) => {
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [community, setCommunity] = useState([])
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await api.get(`community/slug/${router.query.slug}`)
      const managers = data.community.managers

      if (managers[0]) {
        for (const manager of managers) {
          const { data: response } = await api.get(
            `/user/checkManager/${manager.email}`
          )
          manager.name = response.name
          manager.avatar = response.avatar
        }
      }
      data.community.managers = managers
      setCommunity(data.community)
      setRelated(data.related)
      setLoading(false)
    }

    fetchData()
  }, [])

  const checkCredentials = () => {
    const { isModerator, _id } = credentials
    const { creator } = community

    if (isModerator) return true
    if (creator._id && creator._id === _id) return true

    return false
  }

  return (
    <>
      {!loading
        ? <>
          {community
            ? <div>
              <CommunityHero />
              <CommunityCard
                canModify={checkCredentials()}
                community={community}
                credentials={credentials}
                type={community.type}
              />
              <div className="container related">
                <div className="columns">
                  <div className="column isfull">
                    <h3 className="title is-5">COMUNIDADES RELACIONADAS</h3>
                  </div>
                </div>
                <div className="columns is-2 is-variable is-multiline">
                  {related.map((card) => (
                    <div className="column is-one-third " key={card._id}>
                      <Card content={card} />
                    </div>
                  ))}
                </div>
              </div>
              <style jsx>{styles}</style>
            </div>
            : <div>
              <CommunityHero />
              <div className="container">
                <h2>Essa comunidade não existe!</h2>
              </div>
            </div>
          }
        </>
        : <div>
          <CommunityHero />
          <img
            src="/static/comunidades-tech-loader.gif"
            style={{ maxWidth: '100px', display: 'block', margin: '30px auto' }}
          />
        </div>
      }
    </>
  )
}

Community.getInitialProps = async (ctx) => {
  if (!ctx.query.slug) {
    ctx.res.writeHead(302, {
      Location: '/'
    })
    ctx.res.end()
  }
}

Community.propTypes = {
  credentials: PropTypes.object
}

export default Community
