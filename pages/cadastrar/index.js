import React, { useState } from 'react'
import { toast } from 'react-toastify'
import cookies from 'next-cookies'
import Router from 'next/router'
import PropTypes from 'prop-types'
import CommunityForm from '../../components/CommunityForm'
import styles from '../../components/RegisterStyles/styles'
import { api, setHeader } from '../../utils/axios'

const RegisterCommunity = ({ credentials }) => {
  const [loading, setLoading] = useState(false)

  const getInitialValues = () => {
    const { _id, name, email } = credentials
    const logo = `${process.env.DEFAULT_LOGO}`
    
    return {
      name: '',
      slug: 'comunidades.tech/c/',
      model: 'online',
      location: {
        country: '',
        state: '',
        city: ''
      },
      links: [{ type: 'url', url: '' }],
      description: '',
      category: '',
      type: '',
      tags: '',
      globalProgram: {
        isParticipant: false,
        name: ''
      },
      members: '',
      logo,
      creator: {
        _id,
        name,
        email,
        rocketChat: ''
      },
      owner: '',
      managers: []
    }
  }

  const postCommunity = async (community) => {
    setLoading(true)
    setHeader(credentials)
    await api.post('/community/store', community)
    toast.success(
      `Comunidade cadastrada com sucesso!\n
    Em breve ela será publicada.`
    )
    Router.push('/')
  }

  return (
    <div className="container">
      <div className="hero-body">
        <div className="columns is-centered">
          <div className="column">
            <CommunityForm
              credentials={credentials}
              service={postCommunity}
              loading={loading}
              initialValues={getInitialValues()}
              type={'create'}
            />
          </div>
        </div>
      </div>

      <style jsx>{styles}</style>
    </div>
  )
}

RegisterCommunity.getInitialProps = async (ctx) => {
  const credentials = cookies(ctx).ctech_credentials || {}
  if (!credentials.token) {
    ctx.res.writeHead(302, {
      Location: '/sign-in'
    })
    ctx.res.end()
  }
}

RegisterCommunity.propTypes = {
  credentials: PropTypes.object
}

export default RegisterCommunity
