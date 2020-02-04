import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

import cookies from 'next-cookies'
import Router, { useRouter } from 'next/router'
import PropTypes from 'prop-types'

import CommunityForm from '../../components/CommunityForm'
import { api, setHeader } from '../../utils/axios'
import styles from '../cadastrar/styles'

const EditCommunity = ({ credentials }) => {
  const [loading, setLoading] = useState(true)
  const [community, setCommunity] = useState([])
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await api.get(`community/slug/${router.query.slug}`)

      const managersEmails = data.community.managers.map(({ email }) => email)
      managersEmails.push(data.community.creator.email)
      managersEmails.push(data.community.owner)
      credentials.isModerator && managersEmails.push(credentials.email)
      if (!managersEmails.includes(credentials.email)) Router.push('/')

      setCommunity(data.community)
      setLoading(false)
    }
    fetchData()
  }, [])

  const editCommunity = async (community) => {
    setLoading(true)
    setHeader(credentials)
    await api.put(`/community/update/${community._id}`, community)
    toast.success(
      `Comunidade editada com sucesso!\n
    Em breve ela será republicada.`
    )
    Router.push('/')
  }

  return (
    <div className="container">
      <div className="hero-body">
        <div className="columns is-centered">
          <div className="column">
            {!loading && (
              <CommunityForm
                credentials={credentials}
                loading={loading}
                service={editCommunity}
                initialValues={community}
                type={'edit'}
              />
            )}
          </div>
        </div>
      </div>

      <style jsx>{styles}</style>
    </div>
  )
}

EditCommunity.getInitialProps = async (ctx) => {
  const credentials = cookies(ctx).ctech_credentials || {}

  if (!credentials.token) {
    ctx.res.writeHead(302, {
      Location: '/'
    })
    ctx.res.end()
  }
}

EditCommunity.propTypes = {
  credentials: PropTypes.object
}

export default EditCommunity
